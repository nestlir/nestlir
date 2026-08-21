# Anastasia — Dual Portfolio

One GitHub project, two deliberately different portfolio experiences.

## 1. Frontend edition

`/frontend/`

The original visual/frontend direction: dopamine colors, editorial typography, photography, stickers, anime/pop-culture references, playful motion and cinematic project popups. It is designed to show frontend craft, UX/UI thinking, product sense and personality.

## 2. Full-stack edition

`/`

The engineering-first version. It emphasizes the complete product path:

`UI → API → DATA → AUTH → TEST → DEPLOY`

It shows architecture, API integration, data, AI, deployment and the actual responsibility held on each project.

## Shared principles

- two real pages, one deployable project;
- direct navigation between editions;
- image-led project cards with case popups;
- clear repository links;
- responsive behavior;
- keyboard interactions and reduced-motion support;
- decorative elements never block interaction;
- project claims reflect the actual contribution.

## Folder organization

```text
portfolio/
├── index.html                 # Full-stack edition
├── app.js
├── app.css
├── responsive.css
├── favicon.svg
├── frontend/                  # Frontend edition
│   ├── index.html
│   ├── frontend.css
│   ├── frontend.js
│   └── README.md
├── assets/
├── CODE_REVIEW.md
├── ARCHITECTURE.md
└── README.md
```

## Deploy

GitHub Actions publishes `portfolio/` as the Pages artifact. That means the resulting site is:

- Full-stack: `https://nestlir.github.io/nestlir/`
- Frontend: `https://nestlir.github.io/nestlir/frontend/`

No special build step or SPA routing is required.

## Local development

From the repository root:

```bash
python -m http.server 4173
```

Then open:

- `http://localhost:4173/portfolio/`
- `http://localhost:4173/portfolio/frontend/`
