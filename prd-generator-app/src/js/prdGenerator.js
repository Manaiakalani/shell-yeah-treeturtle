// prdGenerator.js — Generates the PRD content in Markdown and HTML formats

// Re-export escapeHtml as esc for internal use
import { escapeHtml as esc } from './utils.js';

/**
 * Generate PRD as Markdown string
 */
export function generatePrdMarkdown({ regionLabel, trees, turtleFacts, appName, date }) {
  let md = '';

  md += `# 🐢🌳 Product Requirements Document\n`;
  md += `## ${appName}\n\n`;
  md += `**Date:** ${date}\n`;
  md += `**Region:** ${regionLabel}\n`;
  md += `**Status:** Draft — Generated with vibes\n\n`;
  md += `---\n\n`;

  // Overview
  md += `## 1. Overview\n\n`;
  md += `This PRD outlines the requirements for **${appName}**, a web application that connects users `;
  md += `with the natural world by showcasing trees native to their geographic area alongside `;
  md += `fascinating turtle facts. The app aims to spark curiosity about local ecosystems while `;
  md += `delivering a delightful, shareable user experience.\n\n`;

  // Problem Statement
  md += `## 2. Problem Statement\n\n`;
  md += `Most people walk past dozens of trees every day without knowing their names, their history, `;
  md += `or that turtles can literally breathe through their butts. We're fixing that.\n\n`;

  // Goals
  md += `## 3. Goals & Success Metrics\n\n`;
  md += `| Goal | Metric | Target |\n`;
  md += `|------|--------|--------|\n`;
  md += `| Educate users about local trees | Trees identified per session | ≥ 3 |\n`;
  md += `| Deliver turtle joy | Turtle facts shared | ≥ 1 per visit |\n`;
  md += `| Drive engagement | Avg. session duration | > 2 min |\n`;
  md += `| Enable sharing | Copy-to-clipboard usage | > 40% of sessions |\n\n`;

  // User Personas
  md += `## 4. User Personas\n\n`;
  md += `**🌿 Nature-Curious Newcomer** — Wants to learn what trees surround them but doesn't know where to start.\n\n`;
  md += `**🐢 Turtle Enthusiast** — Already loves turtles, craves new facts to share at parties.\n\n`;
  md += `**📋 PRD Collector** — Appreciates a well-structured document and wants to copy-paste sections for their own projects.\n\n`;

  // Trees section
  md += `---\n\n`;
  md += `## 5. Local Trees — ${regionLabel}\n\n`;
  md += `The following trees are native to or commonly found in the **${regionLabel}** region:\n\n`;

  trees.forEach((tree, i) => {
    md += `### ${tree.emoji} ${tree.name}\n`;
    md += `- **Scientific Name:** _${tree.scientific}_\n`;
    md += `- **Fun Fact:** ${tree.fun_fact}\n\n`;
  });

  // Turtle facts section
  md += `---\n\n`;
  md += `## 6. Turtle Facts Integration\n\n`;
  md += `Each session surfaces random turtle facts to keep users engaged and slightly amazed:\n\n`;

  turtleFacts.forEach((tf, i) => {
    md += `> ${tf.emoji} **${tf.fact}**\n>\n> _Category: ${tf.category}_\n\n`;
  });

  // Technical Requirements
  md += `---\n\n`;
  md += `## 7. Technical Requirements\n\n`;
  md += `| Component | Requirement |\n`;
  md += `|-----------|-------------|\n`;
  md += `| Frontend | Vanilla HTML/CSS/JS, no framework needed |\n`;
  md += `| Geolocation | Browser Geolocation API |\n`;
  md += `| Data | Static JSON datasets for trees & turtle facts |\n`;
  md += `| Copy/Paste | Clipboard API with Markdown + plaintext support |\n`;
  md += `| Hosting | Any static host (Netlify, Vercel, GitHub Pages) |\n`;
  md += `| Performance | < 1s load time, no external API dependencies |\n\n`;

  // User Flow
  md += `## 8. User Flow\n\n`;
  md += `1. User opens the app\n`;
  md += `2. App requests geolocation (or user picks a region manually)\n`;
  md += `3. Trees for detected region are displayed with facts\n`;
  md += `4. Random turtle facts are sprinkled throughout\n`;
  md += `5. User clicks "Copy" and pastes the instant PRD wherever they want\n`;
  md += `6. User becomes marginally more knowledgeable about nature 🌍\n\n`;

  // Future Features
  md += `## 9. Future Considerations\n\n`;
  md += `- 🗺️ Interactive map showing tree locations\n`;
  md += `- 📸 AR tree identification via camera\n`;
  md += `- 🐢 Daily turtle fact notifications\n`;
  md += `- 🏆 "Tree Spotter" achievement badges\n`;
  md += `- 🌐 Multi-language support\n`;
  md += `- 📊 Analytics dashboard for most-viewed trees\n\n`;

  // Sign-off
  md += `---\n\n`;
  md += `_This PRD was auto-generated with local tree data and turtle facts. `;
  md += `No turtles were harmed in the making of this document._ 🐢✨\n`;

  return md;
}

/**
 * Generate PRD as styled HTML for preview
 */
export function generatePrdHtml({ regionLabel, trees, turtleFacts, appName, date }) {
  let html = '';

  html += `<h1>🐢🌳 Product Requirements Document</h1>`;
  html += `<h2>${esc(appName)}</h2>`;
  html += `<p><span class="meta-tag">📅 ${esc(date)}</span> <span class="meta-tag">📍 ${esc(regionLabel)}</span> <span class="meta-tag">📝 Draft</span></p>`;
  html += `<hr class="section-divider" />`;

  html += `<h2>1. Overview</h2>`;
  html += `<p>This PRD outlines the requirements for <strong>${esc(appName)}</strong>, a web application that connects users with the natural world by showcasing trees native to their geographic area alongside fascinating turtle facts. The app aims to spark curiosity about local ecosystems while delivering a delightful, shareable user experience.</p>`;

  html += `<h2>2. Problem Statement</h2>`;
  html += `<p>Most people walk past dozens of trees every day without knowing their names, their history, or that turtles can literally breathe through their butts. We're fixing that.</p>`;

  html += `<h2>3. Goals &amp; Success Metrics</h2>`;
  html += `<table style="width:100%;border-collapse:collapse;margin:12px 0;">`;
  html += `<tr><th style="text-align:left;padding:6px;border-bottom:1px solid var(--border);">Goal</th><th style="text-align:left;padding:6px;border-bottom:1px solid var(--border);">Metric</th><th style="text-align:left;padding:6px;border-bottom:1px solid var(--border);">Target</th></tr>`;
  html += `<tr><td style="padding:6px;">Educate users about local trees</td><td style="padding:6px;">Trees identified per session</td><td style="padding:6px;">≥ 3</td></tr>`;
  html += `<tr><td style="padding:6px;">Deliver turtle joy</td><td style="padding:6px;">Turtle facts shared</td><td style="padding:6px;">≥ 1 per visit</td></tr>`;
  html += `<tr><td style="padding:6px;">Drive engagement</td><td style="padding:6px;">Avg. session duration</td><td style="padding:6px;">&gt; 2 min</td></tr>`;
  html += `<tr><td style="padding:6px;">Enable sharing</td><td style="padding:6px;">Copy-to-clipboard usage</td><td style="padding:6px;">&gt; 40% of sessions</td></tr>`;
  html += `</table>`;

  html += `<h2>4. User Personas</h2>`;
  html += `<p>🌿 <strong>Nature-Curious Newcomer</strong> — Wants to learn what trees surround them but doesn't know where to start.</p>`;
  html += `<p>🐢 <strong>Turtle Enthusiast</strong> — Already loves turtles, craves new facts to share at parties.</p>`;
  html += `<p>📋 <strong>PRD Collector</strong> — Appreciates a well-structured document and wants to copy-paste sections for their own projects.</p>`;

  html += `<hr class="section-divider" />`;
  html += `<h2>5. Local Trees — ${esc(regionLabel)}</h2>`;
  html += `<p>The following trees are native to or commonly found in the <strong>${esc(regionLabel)}</strong> region:</p>`;

  trees.forEach(tree => {
    html += `<div class="tree-card">`;
    html += `<h3>${tree.emoji} ${esc(tree.name)}</h3>`;
    html += `<p><strong>Scientific Name:</strong> <em>${esc(tree.scientific)}</em></p>`;
    html += `<p><strong>Fun Fact:</strong> ${esc(tree.fun_fact)}</p>`;
    html += `</div>`;
  });

  html += `<hr class="section-divider" />`;
  html += `<h2>6. Turtle Facts Integration</h2>`;
  html += `<p>Each session surfaces random turtle facts to keep users engaged and slightly amazed:</p>`;

  turtleFacts.forEach(tf => {
    html += `<div class="turtle-fact">`;
    html += `<p>${tf.emoji} <strong>${esc(tf.fact)}</strong></p>`;
    html += `<p><span class="meta-tag">${esc(tf.category)}</span></p>`;
    html += `</div>`;
  });

  html += `<hr class="section-divider" />`;
  html += `<h2>7. Technical Requirements</h2>`;
  html += `<table style="width:100%;border-collapse:collapse;margin:12px 0;">`;
  html += `<tr><th style="text-align:left;padding:6px;border-bottom:1px solid var(--border);">Component</th><th style="text-align:left;padding:6px;border-bottom:1px solid var(--border);">Requirement</th></tr>`;
  html += `<tr><td style="padding:6px;">Frontend</td><td style="padding:6px;">Vanilla HTML/CSS/JS, no framework needed</td></tr>`;
  html += `<tr><td style="padding:6px;">Geolocation</td><td style="padding:6px;">Browser Geolocation API</td></tr>`;
  html += `<tr><td style="padding:6px;">Data</td><td style="padding:6px;">Static JSON datasets for trees &amp; turtle facts</td></tr>`;
  html += `<tr><td style="padding:6px;">Copy/Paste</td><td style="padding:6px;">Clipboard API with Markdown + plaintext support</td></tr>`;
  html += `<tr><td style="padding:6px;">Hosting</td><td style="padding:6px;">Any static host (Netlify, Vercel, GitHub Pages)</td></tr>`;
  html += `<tr><td style="padding:6px;">Performance</td><td style="padding:6px;">&lt; 1s load time, no external API dependencies</td></tr>`;
  html += `</table>`;

  html += `<h2>8. User Flow</h2>`;
  html += `<ol>`;
  html += `<li>User opens the app</li>`;
  html += `<li>App requests geolocation (or user picks a region manually)</li>`;
  html += `<li>Trees for detected region are displayed with facts</li>`;
  html += `<li>Random turtle facts are sprinkled throughout</li>`;
  html += `<li>User clicks "Copy" and pastes the instant PRD wherever they want</li>`;
  html += `<li>User becomes marginally more knowledgeable about nature 🌍</li>`;
  html += `</ol>`;

  html += `<h2>9. Future Considerations</h2>`;
  html += `<ul>`;
  html += `<li>🗺️ Interactive map showing tree locations</li>`;
  html += `<li>📸 AR tree identification via camera</li>`;
  html += `<li>🐢 Daily turtle fact notifications</li>`;
  html += `<li>🏆 "Tree Spotter" achievement badges</li>`;
  html += `<li>🌐 Multi-language support</li>`;
  html += `<li>📊 Analytics dashboard for most-viewed trees</li>`;
  html += `</ul>`;

  html += `<hr class="section-divider" />`;
  html += `<p style="color:var(--text-dim);font-style:italic;">This PRD was auto-generated with local tree data and turtle facts. No turtles were harmed in the making of this document. 🐢✨</p>`;

  return html;
}
