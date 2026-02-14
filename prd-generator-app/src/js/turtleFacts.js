// turtleFacts.js — Serves up random turtle facts

import { shuffle } from './utils.js';

let factData = null;

async function loadFactData() {
  if (factData) return factData;
  const resp = await fetch('./data/turtleFacts.json');
  factData = await resp.json();
  return factData;
}

// Pre-load on import
loadFactData();

/**
 * Get N random, non-repeating turtle facts
 */
export async function getRandomTurtleFacts(count = 3) {
  const data = await loadFactData();
  const all = shuffle(data.facts);
  return all.slice(0, Math.min(count, all.length));
}

/**
 * Get all unique categories
 */
export async function getCategories() {
  const data = await loadFactData();
  return [...new Set(data.facts.map(f => f.category))];
}
