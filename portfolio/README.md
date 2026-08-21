# Anastasia — Dual Portfolio System

Two professional portfolio experiences live in the same GitHub project.

## Portfolio A — Colorful

`/portfolio/colorful/`

The expressive version: dopamine landing, candy colors, editorial typography, photography, stickers, anime/pop-culture references and cinematic project popups. It emphasizes visual/frontend/product craft.

## Portfolio B — Full-stack

`/portfolio/`

The engineering-first version: **UI → API → DATA → AUTH → TEST → DEPLOY**. It emphasizes architecture, APIs, data, AI, deployment and the actual responsibility held on each project.

## Shared principles

- RU / EN / JP where the experience requires it;
- image-led project cards with popup case views;
- clear repository links;
- responsive behavior;
- accessible keyboard interactions;
- reduced-motion support;
- decorative elements never block interaction;
- project claims must reflect the actual contribution.

## Folder organization

```text
portfolio/
├── index.html                 # B: Full-stack
├── app.js
├── app.css
├── responsive.css
├── favicon.svg
├── CODE_REVIEW.md
├── ARCHITECTURE.md
├── README.md
├── colorful/                  # A: Colorful
│   ├── index.html
│   ├── colorful.css
│   ├── colorful.js
│   └── README.md
└── assets/
    ├── icons/
    ├── stickers/
    ├── markers/
    └── README.md
```

## Deploy

GitHub Actions publishes the primary Full-stack portfolio at the site root and the Colorful variant at `/colorful/`.

## Local development

```bash
python -m http.server 4173
```

- Full-stack: `http://localhost:4173/portfolio/`
- Colorful: `http://localhost:4173/portfolio/colorful/`

## Live

- Full-stack: `https://nestlir.github.io/nestlir/`
- Colorful: `https://nestlir.github.io/nestlir/colorful/`
