# 🐢🌳 PRD Generator — Trees & Turtles Edition

A dope web app that generates copy-paste-ready Product Requirements Documents using **trees local to your area** (via geolocation) and **random turtle facts**.

## Quick Start

```bash
cd prd-generator-app
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Features

- **Geolocation Detection** — auto-detects your region and shows native trees
- **Manual Region Picker** — choose from 9 regions worldwide
- **Random Turtle Facts** — 30 curated facts with categories
- **One-Click Copy** — clipboard support for Markdown and plain text
- **Fully Offline** — no API calls, all data is local
- **Dark Mode** — looks clean out of the box
- **Mobile Responsive** — works on any screen size

## Stack

- Vanilla HTML / CSS / JS (ES Modules)
- No build step required
- Browser Geolocation API
- Clipboard API

## Project Structure

```
src/
├── index.html
├── css/styles.css
├── js/
│   ├── app.js          — Main entry point
│   ├── trees.js        — Tree data + region detection
│   ├── turtleFacts.js  — Random turtle fact engine
│   └── prdGenerator.js — Markdown + HTML PRD generation
├── components/
│   ├── copyButton.js   — Clipboard utilities
│   ├── locationPicker.js — Geolocation wrapper
│   └── prdTemplate.js  — Template context builder
└── data/
    ├── trees.json      — 45 trees across 9 regions
    └── turtleFacts.json — 30 turtle facts
```
