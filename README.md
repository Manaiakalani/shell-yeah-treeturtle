# 🐢🌳 TreeTurtle — Nature Hits Different

> **trees near you. turtle facts that slap. that's it. that's the repo.**

Two web apps celebrating local trees and turtle facts — because nature is lowkey fire and you deserve to know what's growing outside your window (and that turtles can breathe through their butts).

![Vanilla JS](https://img.shields.io/badge/vanilla-JS-F7DF1E?logo=javascript&logoColor=000)
![No Framework](https://img.shields.io/badge/framework-none_needed-22d68a)
![Turtles](https://img.shields.io/badge/turtles-30_facts-00b894)
![Trees](https://img.shields.io/badge/trees-45_species-55efc4)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## What's Inside

This repo contains **two standalone web apps** that share the same curated datasets of trees (45 species across 9 regions) and turtle facts (30 facts across 10 categories):

### 🌲 PRD Generator (`prd-generator-app/`)

A tool that generates **copy-paste-ready Product Requirements Documents** using trees local to your geographic area and random turtle facts. Built for anyone who wants a professional-looking PRD with a side of nature education.

**Features:**
- 📍 Auto-detects your region via Browser Geolocation API
- 🗺️ Manual region picker (9 regions worldwide)
- 📋 One-click copy as Markdown or plain text
- 🎚️ Configurable number of trees (1–5) and turtle facts (1–10)
- 🌙 Dark mode by default
- 📱 Fully responsive

### 🐢 TreeTurtle Explorer (`tree-turtle/`)

A Gen Z–styled nature explorer that surfaces local trees and turtle facts in a visually stunning interface. No PRD generation — just pure vibes.

**Features:**
- 🎨 Animated orbs, film grain overlay, and card entrance animations
- 🔀 Shuffle button for fresh turtle facts
- 📍 Geolocation-based region detection
- 🎠 Live ticker of scrolling turtle facts
- 🌿 Region-specific "vibes" and emoji theming

---

## Quick Start

### Run Locally (No Build Step)

```bash
# PRD Generator
cd prd-generator-app
npm install
npm run dev
# → http://localhost:3000

# TreeTurtle Explorer (just open the file or use any static server)
cd tree-turtle
npx serve . -p 3001
# → http://localhost:3001
```

### Run with Docker

```bash
# Build the image
docker build -t treeturtle .

# Run on port 8080
docker run -p 8080:80 treeturtle
```

Then visit:
- **PRD Generator** → [http://localhost:8080/prd-generator/](http://localhost:8080/prd-generator/)
- **TreeTurtle Explorer** → [http://localhost:8080/explorer/](http://localhost:8080/explorer/)

---

## Project Structure

```
.
├── README.md
├── Dockerfile
├── .dockerignore
├── package.json
│
├── prd-generator-app/          # PRD Generator (ES Modules)
│   ├── package.json
│   └── src/
│       ├── index.html
│       ├── css/
│       │   └── styles.css      # Dark theme, responsive layout
│       ├── js/
│       │   ├── app.js          # Main entry point & DOM wiring
│       │   ├── prdGenerator.js # Markdown + HTML PRD generation
│       │   ├── trees.js        # Tree data loader & region detection
│       │   ├── turtleFacts.js  # Random turtle fact engine
│       │   └── utils.js        # Shared utilities (shuffle, escapeHtml)
│       ├── components/
│       │   ├── copyButton.js   # Clipboard API with fallback
│       │   ├── locationPicker.js # Geolocation wrapper
│       │   └── prdTemplate.js  # Template context builder
│       └── data/
│           ├── trees.json      # 45 trees across 9 regions
│           └── turtleFacts.json # 30 turtle facts
│
└── tree-turtle/                # TreeTurtle Explorer (IIFE, single file)
    ├── index.html
    ├── styles.css              # Gen Z aesthetic CSS
    ├── app.js                  # Self-contained app logic
    └── data/
        ├── trees.json
        └── turtleFacts.json
```

---

## Data

### 🌳 Trees — 9 Regions, 45 Species

| Region | Example Species |
|--------|----------------|
| Northeastern US | Sugar Maple, Eastern White Pine, Red Oak |
| Southeastern US | Live Oak, Bald Cypress, Southern Magnolia |
| Midwestern US | Bur Oak, Black Walnut, American Elm |
| Southwestern US | Joshua Tree, Palo Verde, Mesquite |
| Northwestern US | Douglas Fir, Western Red Cedar, Sitka Spruce |
| California | Coast Redwood, Giant Sequoia, Monterey Cypress |
| Western Europe | English Oak, European Beech, Silver Birch |
| Tropical Regions | Banyan Tree, Coconut Palm, Kapok |
| Global Favorites | Ginkgo, Baobab, Rainbow Eucalyptus |

### 🐢 Turtle Facts — 30 Facts, 10 Categories

Categories: `anatomy` · `ability` · `biology` · `history` · `trivia` · `longevity` · `geography` · `conservation` · `culture`

> _"Some turtles can breathe through their butts. Seriously. It's called cloacal respiration."_ — this app

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Vanilla HTML / CSS / JavaScript (ES Modules) |
| Geolocation | Browser Geolocation API |
| Clipboard | Clipboard API with `execCommand` fallback |
| Data | Static JSON — no API calls, fully offline |
| Fonts | Inter, Space Grotesk, Syne, JetBrains Mono (Google Fonts) |
| Serving | Any static file server / nginx (Docker) |

**Zero dependencies.** No React. No webpack. No node_modules. Just vibes.

---

## How Geolocation Works

1. Browser requests GPS/network location (stays on-device, no data sent anywhere)
2. Lat/lon is mapped to one of 9 regions using simple coordinate bounding boxes
3. If denied or unavailable, users pick a region manually
4. Location is cached for 5 minutes to avoid repeated prompts

---

## Contributing

PRs welcome! Some ideas:

- 🗺️ Add more regions (Asia, Africa, South America, Oceania)
- 🌳 Add more tree species per region
- 🐢 Add more turtle facts (the world needs them)
- 🌐 Multi-language support
- 📸 AR tree identification
- 🏆 Gamification / achievement badges

---

## License

MIT — do whatever you want, just don't harm any turtles. 🐢✨
