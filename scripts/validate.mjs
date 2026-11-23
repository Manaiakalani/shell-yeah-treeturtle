// Validate JSON datasets and local files referenced by HTML.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(rel) {
  const abs = path.join(root, rel);
  let text;
  try {
    text = readFileSync(abs, 'utf8');
  } catch (err) {
    fail(`Cannot read ${rel}: ${err.message}`);
    return null;
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    fail(`Invalid JSON in ${rel}: ${err.message}`);
    return null;
  }
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stable(value[key])]),
    );
  }
  return value;
}

const jsonFiles = [
  'prd-generator-app/package.json',
  'prd-generator-app/src/data/trees.json',
  'prd-generator-app/src/data/turtleFacts.json',
  'tree-turtle/data/trees.json',
  'tree-turtle/data/turtleFacts.json',
];

for (const rel of jsonFiles) {
  const data = readJson(rel);
  if (data !== null) console.log(`json ok ${rel}`);
}

const requiredRegions = [
  'northeast_us',
  'southeast_us',
  'midwest_us',
  'southwest_us',
  'northwest_us',
  'california',
  'europe_west',
  'tropics',
  'default',
];

const treeFields = ['name', 'scientific', 'fun_fact', 'emoji'];
const factFields = ['fact', 'category', 'emoji'];
const dataDirs = ['prd-generator-app/src/data', 'tree-turtle/data'];
const treesByDir = new Map();
const factsByDir = new Map();

for (const dir of dataDirs) {
  const trees = readJson(`${dir}/trees.json`);
  const facts = readJson(`${dir}/turtleFacts.json`);
  if (!trees || !facts) continue;

  treesByDir.set(dir, trees);
  factsByDir.set(dir, facts);

  if (!trees.regions || typeof trees.regions !== 'object' || Array.isArray(trees.regions)) {
    fail(`${dir}/trees.json is missing a regions object`);
    continue;
  }

  for (const key of requiredRegions) {
    const region = trees.regions[key];
    if (!region) {
      fail(`${dir}/trees.json is missing region ${key}`);
      continue;
    }
    if (typeof region.label !== 'string' || region.label.trim() === '') {
      fail(`${dir}/trees.json region ${key} is missing a label`);
    }
    if (!Array.isArray(region.trees) || region.trees.length === 0) {
      fail(`${dir}/trees.json region ${key} has no trees`);
      continue;
    }
    region.trees.forEach((tree, index) => {
      for (const field of treeFields) {
        if (typeof tree[field] !== 'string' || tree[field].trim() === '') {
          fail(`${dir}/trees.json region ${key} tree ${index} is missing ${field}`);
        }
      }
    });
  }

  if (!Array.isArray(facts.facts) || facts.facts.length === 0) {
    fail(`${dir}/turtleFacts.json has no facts`);
    continue;
  }
  facts.facts.forEach((fact, index) => {
    for (const field of factFields) {
      if (typeof fact[field] !== 'string' || fact[field].trim() === '') {
        fail(`${dir}/turtleFacts.json fact ${index} is missing ${field}`);
      }
    }
  });

  const treeCount = Object.values(trees.regions).reduce(
    (sum, region) => sum + (Array.isArray(region.trees) ? region.trees.length : 0),
    0,
  );
  console.log(`${dir}: ${Object.keys(trees.regions).length} regions, ${treeCount} trees, ${facts.facts.length} facts`);
}

const treesPayloads = [...treesByDir.values()].map((value) => JSON.stringify(stable(value)));
if (treesPayloads.length === dataDirs.length && new Set(treesPayloads).size !== 1) {
  fail('Tree datasets differ between prd-generator-app and tree-turtle');
}

const factPayloads = [...factsByDir.values()].map((value) => JSON.stringify(stable(value)));
if (factPayloads.length === dataDirs.length && new Set(factPayloads).size !== 1) {
  fail('Turtle fact datasets differ between prd-generator-app and tree-turtle');
}

const htmlFiles = [
  'prd-generator-app/src/index.html',
  'tree-turtle/index.html',
];
const refRe = /\b(?:src|href)\s*=\s*["']([^"']+)["']/gi;

for (const rel of htmlFiles) {
  const abs = path.join(root, rel);
  let html;
  try {
    html = readFileSync(abs, 'utf8');
  } catch (err) {
    fail(`Cannot read ${rel}: ${err.message}`);
    continue;
  }
  if (!/<!doctype html>/i.test(html)) fail(`${rel} is missing a doctype`);
  if (!/<html[\s>]/i.test(html) || !/<\/html>/i.test(html)) fail(`${rel} is missing html tags`);
  if (!/<title>[\s\S]*?<\/title>/i.test(html)) fail(`${rel} is missing a title`);
  if (!/<body[\s>]/i.test(html) || !/<\/body>/i.test(html)) fail(`${rel} is missing body tags`);

  const dir = path.dirname(abs);
  for (const match of html.matchAll(refRe)) {
    const url = match[1];
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|data:)/i.test(url)) continue;
    const target = path.resolve(dir, url.split(/[?#]/, 1)[0]);
    const display = path.relative(root, target);
    if (!existsSync(target)) fail(`${rel} references missing file ${display}`);
    else console.log(`${rel} -> ${display}`);
  }
}

if (errors.length > 0) {
  for (const message of errors) console.error(message);
  process.exit(1);
}

console.log('validation passed');
