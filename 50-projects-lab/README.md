# 50+ Projects Lab

A unified **frontend portfolio and interactive project archive** built around the 50 Projects in 50 Days collection.

## Live

urlProduction deploymenthttps://50-projects-lab.vercel.app

## What the application includes

- **51 projects** indexed in one application
- Search and category filtering
- Interactive project viewer
- Previous / next navigation across the collection
- Random-project navigation
- Responsive portfolio layout
- Individual project route structure under `projects/`
- Direct links to the original source collection
- Vanilla HTML, CSS and JavaScript — no framework required

## Architecture

```text
50-projects-lab/
├── index.html          # Portfolio shell
├── app.js              # Catalog + demo engine
├── site.js             # Shared project manifest
├── PROJECTS.json       # Project metadata
├── projects/           # Individual project routes
│   ├── 01-expanding-cards/
│   ├── 02-progress-steps/
│   └── ...
└── README.md
```

## Run locally

```bash
git clone https://github.com/nestlir/nestlir.git
cd nestlir/50-projects-lab
npx serve .
```

Then open the local address printed by the server.

## Project navigation

The portfolio is designed as:

```text
Portfolio
   ↓
Project
   ↓
Interactive Demo
   ↓
Previous / Next / Random
```

## Credits and attribution

The original exercises and source implementations are based on Brad Traversy's **50 Projects in 50 Days** collection.

Original repository:

urlbradtraversy/50projects50dayshttps://github.com/bradtraversy/50projects50days

This project adds a separate portfolio architecture, unified catalog, navigation layer and presentation system. Any reuse of original source code must retain the applicable attribution and MIT license requirements.
