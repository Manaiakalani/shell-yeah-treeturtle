// trees.js — Handles tree data loading and region detection from geolocation

import { shuffle } from './utils.js';

let treeData = null;

async function loadTreeData() {
  if (treeData) return treeData;
  const resp = await fetch('./data/trees.json');
  treeData = await resp.json();
  return treeData;
}

// Pre-load on import
loadTreeData();

/**
 * Map rough lat/lon to a region key
 */
export function detectRegion(lat, lon) {
  // North America
  if (lat >= 24 && lat <= 49 && lon >= -125 && lon <= -66) {
    // California
    if (lon >= -124.5 && lon <= -114 && lat >= 32 && lat <= 42) return 'california';
    // Northwest
    if (lon >= -125 && lon <= -116 && lat >= 42 && lat <= 49) return 'northwest_us';
    // Southwest
    if (lon >= -115 && lon <= -103 && lat >= 24 && lat <= 37) return 'southwest_us';
    // Northeast
    if (lon >= -80 && lon <= -66 && lat >= 39 && lat <= 49) return 'northeast_us';
    // Southeast
    if (lon >= -92 && lon <= -75 && lat >= 24 && lat <= 39) return 'southeast_us';
    // Midwest
    if (lon >= -104 && lon <= -80 && lat >= 36 && lat <= 49) return 'midwest_us';
    // Fallback NA
    return 'default';
  }

  // Western Europe
  if (lat >= 36 && lat <= 60 && lon >= -10 && lon <= 20) return 'europe_west';

  // Tropics
  if (lat >= -23.5 && lat <= 23.5) return 'tropics';

  return 'default';
}

/**
 * Get trees for a specific region
 */
export async function getTreesForRegion(regionKey, count = 3) {
  const data = await loadTreeData();
  const region = data.regions[regionKey] || data.regions['default'];
  const trees = shuffle(region.trees);
  return {
    label: region.label,
    trees: trees.slice(0, Math.min(count, trees.length)),
  };
}

/**
 * Get all available region keys
 */
export async function getRegionKeys() {
  const data = await loadTreeData();
  return Object.keys(data.regions);
}
