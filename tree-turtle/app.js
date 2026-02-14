/* =====================================================
   TreeTurtle — app.js
   Pure vibes. No PRD. Just trees and turtles.
   ===================================================== */

(async function () {
  'use strict';

  // ── Load data ─────────────────────────────────────────
  const [treeData, turtleData] = await Promise.all([
    fetch('data/trees.json').then(r => r.json()),
    fetch('data/turtleFacts.json').then(r => r.json()),
  ]);

  // ── DOM ───────────────────────────────────────────────
  const $ = s => document.querySelector(s);
  const hero           = $('#hero');
  const startBtn       = $('#startBtn');
  const hint           = $('#hint');
  const app            = $('#app');
  const locDot         = $('#locDot');
  const locText        = $('#locText');
  const changeRegionBtn = $('#changeRegionBtn');
  const pickerOverlay  = $('#pickerOverlay');
  const pickerGrid     = $('#pickerGrid');
  const pickerClose    = $('#pickerClose');
  const treesSubtitle  = $('#treesSubtitle');
  const treesGrid      = $('#treesGrid');
  const factsList      = $('#factsList');
  const shuffleBtn     = $('#shuffleBtn');
  const ticker         = $('#ticker');
  const tickerTrack    = $('#tickerTrack');
  const toast          = $('#toast');

  // ── State ─────────────────────────────────────────────
  let currentRegion = null;

  // ── Region metadata ───────────────────────────────────
  const regionVibes = {
    california:    { emoji: '🌴', vibe: 'palm trees & good energy' },
    northeast_us:  { emoji: '🍁', vibe: 'cozy fall bestie vibes' },
    southeast_us:  { emoji: '🌸', vibe: 'sweet tea & magnolias' },
    midwest_us:    { emoji: '🌾', vibe: 'heartland main character' },
    southwest_us:  { emoji: '🌵', vibe: 'desert sunset aesthetic' },
    northwest_us:  { emoji: '🌲', vibe: 'cottagecore x rainforest' },
    europe_west:   { emoji: '⚓', vibe: 'old world dark academia' },
    tropics:       { emoji: '🥥', vibe: 'island arc unlocked' },
    default:       { emoji: '🌍', vibe: 'main planet energy' },
  };

  // ── Build region picker ───────────────────────────────
  Object.entries(treeData.regions).forEach(([key, region]) => {
    const rv = regionVibes[key] || regionVibes.default;
    const btn = document.createElement('button');
    btn.className = 'picker-btn';
    btn.innerHTML = `${rv.emoji} ${region.label}`;
    btn.addEventListener('click', () => {
      loadRegion(key);
      closePicker();
    });
    pickerGrid.appendChild(btn);
  });

  // ── Start button — request geolocation ────────────────
  startBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      hint.textContent = 'your browser said no to geolocation 😭 pick a region below';
      hint.classList.add('error');
      showApp('default');
      return;
    }

    startBtn.innerHTML = '<span>detecting…</span>';
    startBtn.disabled = true;
    hint.textContent = 'asking your browser rn hold on';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const region = geoToRegion(pos.coords.latitude, pos.coords.longitude);
        showApp(region);
      },
      () => {
        hint.textContent = 'no location? no stress — pick a region instead 👇';
        hint.classList.add('error');
        showApp('default');
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  });

  // ── Show the app ──────────────────────────────────────
  function showApp(regionKey) {
    hero.style.display = 'none';
    app.style.display = '';
    ticker.style.display = '';
    loadRegion(regionKey);
    window.scrollTo({ top: 0 });
  }

  // ── Load a region ─────────────────────────────────────
  function loadRegion(regionKey) {
    currentRegion = regionKey;
    const region = treeData.regions[regionKey] || treeData.regions.default;
    const rv = regionVibes[regionKey] || regionVibes.default;

    // Update location bar
    locDot.classList.add('on');
    locText.textContent = `${rv.emoji} ${region.label}`;

    // Subtitle
    treesSubtitle.textContent = rv.vibe;

    // Render trees
    renderTrees(region.trees);

    // Render facts
    renderFacts();

    // Ticker
    buildTicker();
  }

  // ── Render tree cards ─────────────────────────────────
  function renderTrees(trees) {
    treesGrid.innerHTML = '';
    trees.forEach(t => {
      const card = document.createElement('div');
      card.className = 'tree-card';
      card.innerHTML = `
        <div class="tree-top">
          <span class="tree-emoji">${t.emoji}</span>
          <div>
            <div class="tree-name">${esc(t.name)}</div>
            <div class="tree-sci">${esc(t.scientific)}</div>
          </div>
        </div>
        <div class="tree-fact-label">fun fact</div>
        <div class="tree-fact">${esc(t.fun_fact)}</div>
      `;
      treesGrid.appendChild(card);
    });
  }

  // ── Render turtle facts ───────────────────────────────
  function renderFacts(count = 5) {
    factsList.innerHTML = '';
    const chosen = shuffle([...turtleData.facts]).slice(0, count);
    chosen.forEach(f => {
      const card = document.createElement('div');
      card.className = 'fact-card';
      card.innerHTML = `
        <div class="fact-emoji">${f.emoji}</div>
        <div class="fact-text">${esc(f.fact)}</div>
        <span class="fact-cat">${esc(f.category)}</span>
      `;
      factsList.appendChild(card);
    });
  }

  // ── Shuffle button ────────────────────────────────────
  shuffleBtn.addEventListener('click', () => {
    renderFacts(5);
    shuffleBtn.textContent = 'sheeeesh 🔥';
    setTimeout(() => { shuffleBtn.textContent = 'shuffle 🔀'; }, 1200);
  });

  // ── Region picker open/close ──────────────────────────
  changeRegionBtn.addEventListener('click', () => {
    pickerOverlay.style.display = '';
  });
  pickerClose.addEventListener('click', closePicker);
  pickerOverlay.addEventListener('click', (e) => {
    if (e.target === pickerOverlay) closePicker();
  });
  function closePicker() {
    pickerOverlay.style.display = 'none';
  }

  // ── Ticker ────────────────────────────────────────────
  function buildTicker() {
    const snippets = shuffle([...turtleData.facts]).slice(0, 8);
    const html = snippets.map(f => `<span>${f.emoji} ${esc(f.fact)}</span>`).join('');
    tickerTrack.innerHTML = html + html; // seamless loop
  }

  // ── Helpers ───────────────────────────────────────────
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function geoToRegion(lat, lon) {
    if (lat >= 24 && lat <= 49 && lon >= -125 && lon <= -66) {
      if (lon >= -124.5 && lon <= -114 && lat >= 32 && lat <= 42) return 'california';
      if (lon >= -125 && lon <= -116 && lat >= 42 && lat <= 49)  return 'northwest_us';
      if (lon >= -115 && lon <= -103 && lat >= 24 && lat <= 37)  return 'southwest_us';
      if (lon >= -80 && lon <= -66 && lat >= 39 && lat <= 49)    return 'northeast_us';
      if (lon >= -92 && lon <= -75 && lat >= 24 && lat <= 39)    return 'southeast_us';
      if (lon >= -104 && lon <= -80 && lat >= 36 && lat <= 49)   return 'midwest_us';
      return 'default';
    }
    if (lat >= 36 && lat <= 60 && lon >= -10 && lon <= 20) return 'europe_west';
    if (lat >= -23.5 && lat <= 23.5) return 'tropics';
    return 'default';
  }

})();
