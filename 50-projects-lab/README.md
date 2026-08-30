# 50+ Projects Lab

A professional **frontend portfolio/showcase** that turns Brad Traversy's *50 Projects in 50 Days* collection into one searchable, interactive experience.

## ✨ What was built

This is not just a list of links. The showcase provides:

- **51 indexed projects** in one unified interface
- 🔎 Live search by project name and skill area
- 🗂 Category filtering
- ↕️ Original-order and alphabetical sorting
- 🖥 Embedded project viewer with fallback actions
- 🔗 Direct navigation to the original demo and source code
- ⭐ Favorites persisted with `localStorage`
- 📱 Responsive layout for desktop and mobile
- 📊 Visible collection/progress status

## Live

Production deployment:

https://50-projects-lab.vercel.app

## Local development

```bash
git clone https://github.com/nestlir/nestlir.git
cd nestlir/50-projects-lab
```

The project is dependency-free:

```bash
npx serve .
```

Then open the local URL printed by the server.

## Project structure

```
50-projects-lab/
├── index.html       # Showcase UI and interaction layer
├── PROJECTS.json    # Catalog of all 51 projects
└── README.md
```

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage
- Vercel

## Navigation logic

Each project exposes three paths:

1. **Preview** — attempts to open the original demo inside the built-in viewer.
2. **Open demo** — opens the original live project in a new tab.
3. **View source** — opens the corresponding source directory in GitHub.

This makes the showcase useful even when an external demo blocks iframe embedding.

## Credits

The original exercises, ideas and source projects belong to Brad Traversy's **50 Projects in 50 Days** collection:

https://github.com/bradtraversy/50projects50days

This repository contains a separate portfolio/showcase interface and preserves navigation back to the original work.

## License note

The original repository is distributed under the MIT License. Applicable attribution and license requirements should be preserved when reusing original source code.
