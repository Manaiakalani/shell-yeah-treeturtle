// app.js — Main application entry point

import { detectRegion, getTreesForRegion } from './trees.js';
import { getRandomTurtleFacts } from './turtleFacts.js';
import { generatePrdMarkdown, generatePrdHtml } from './prdGenerator.js';
import { copyToClipboard } from '../components/copyButton.js';
import { getUserLocation } from '../components/locationPicker.js';
import { buildTemplateContext } from '../components/prdTemplate.js';

// ——— DOM refs ———
const detectLocationBtn = document.getElementById('detectLocationBtn');
const regionSelect = document.getElementById('regionSelect');
const turtleCountSlider = document.getElementById('turtleCount');
const treeCountSlider = document.getElementById('treeCount');
const turtleCountDisplay = document.getElementById('turtleCountDisplay');
const treeCountDisplay = document.getElementById('treeCountDisplay');
const generateBtn = document.getElementById('generateBtn');
const outputSection = document.getElementById('outputSection');
const prdPreview = document.getElementById('prdPreview');
const copyMdBtn = document.getElementById('copyMdBtn');
const copyTextBtn = document.getElementById('copyTextBtn');
const copyToast = document.getElementById('copyToast');
const locationStatus = document.getElementById('locationStatus');
const statusText = locationStatus.querySelector('.status-text');
const currentYear = document.getElementById('currentYear');

// ——— State ———
let detectedRegion = null;
let lastMarkdown = '';
let lastPlainText = '';

// ——— Init ———
currentYear.textContent = new Date().getFullYear();

// Slider displays
turtleCountSlider.addEventListener('input', () => {
  turtleCountDisplay.textContent = turtleCountSlider.value;
});
treeCountSlider.addEventListener('input', () => {
  treeCountDisplay.textContent = treeCountSlider.value;
});

// ——— Geolocation ———
detectLocationBtn.addEventListener('click', async () => {
  detectLocationBtn.disabled = true;
  detectLocationBtn.textContent = '🔄 Detecting...';
  locationStatus.className = 'location-status';
  statusText.textContent = 'Requesting location...';

  try {
    const { lat, lon } = await getUserLocation();
    detectedRegion = detectRegion(lat, lon);
    regionSelect.value = detectedRegion;

    locationStatus.classList.add('active');
    statusText.textContent = `Detected: ${regionSelect.options[regionSelect.selectedIndex]?.text || detectedRegion} (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
  } catch (err) {
    locationStatus.classList.add('error');
    statusText.textContent = err.message;
    detectedRegion = null;
  } finally {
    detectLocationBtn.disabled = false;
    detectLocationBtn.textContent = '📍 Detect My Location';
  }
});

// Manual region also updates detected
regionSelect.addEventListener('change', () => {
  if (regionSelect.value) {
    detectedRegion = regionSelect.value;
    locationStatus.className = 'location-status active';
    statusText.textContent = `Region: ${regionSelect.options[regionSelect.selectedIndex].text}`;
  }
});

// ——— Generate PRD ———
generateBtn.addEventListener('click', async () => {
  const regionKey = regionSelect.value || detectedRegion || 'default';
  const turtleCount = parseInt(turtleCountSlider.value, 10);
  const treeCount = parseInt(treeCountSlider.value, 10);

  generateBtn.textContent = '🔄 Generating...';
  generateBtn.disabled = true;

  try {
    // Get data
    const { label: regionLabel, trees } = await getTreesForRegion(regionKey, treeCount);
    const turtleFacts = await getRandomTurtleFacts(turtleCount);

    // Build context
    const ctx = buildTemplateContext({ regionLabel, trees, turtleFacts });

    // Generate both formats
    lastMarkdown = generatePrdMarkdown(ctx);
    lastPlainText = lastMarkdown
      .replace(/^#{1,3} /gm, '')
      .replace(/\*\*/g, '')
      .replace(/_([^_]+)_/g, '$1')
      .replace(/^> /gm, '  ')
      .replace(/^\| .+$/gm, (line) => line.replace(/\|/g, '  ').trim());

    // Render HTML preview
    const html = generatePrdHtml(ctx);
    prdPreview.innerHTML = html;

    // Show output
    outputSection.style.display = 'block';
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Fun generate animation
    generateBtn.textContent = '✅ Generated!';
    generateBtn.disabled = false;
    setTimeout(() => {
      generateBtn.textContent = '⚡ Generate PRD';
    }, 1500);
  } catch (err) {
    console.error('Generation error:', err);
    generateBtn.textContent = '⚡ Generate PRD';
    generateBtn.disabled = false;
  }
});

// ——— Copy handlers ———
copyMdBtn.addEventListener('click', () => {
  if (lastMarkdown) copyToClipboard(lastMarkdown, copyToast);
});

copyTextBtn.addEventListener('click', () => {
  if (lastPlainText) copyToClipboard(lastPlainText, copyToast);
});
