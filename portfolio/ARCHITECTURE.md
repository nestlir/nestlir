# Portfolio architecture

The repository contains two intentionally different portfolio experiences.

```text
portfolio/
├── index.html                 # Portfolio B — Full-stack / engineering
├── app.js                     # Full-stack data + interactions + i18n
├── app.css                    # Full-stack visual system
├── responsive.css             # Full-stack responsive layer
├── favicon.svg
├── README.md
├── CODE_REVIEW.md
├── ARCHITECTURE.md
│
├── colorful/                  # Portfolio A — expressive visual/frontend
│   ├── index.html
│   ├── colorful.css
│   ├── colorful.js
│   └── README.md
│
└── assets/
    ├── icons/
    ├── stickers/
    ├── markers/
    └── README.md
```

## Portfolio A — Colorful

Use when the goal is to demonstrate visual direction, frontend craft, product/UI thinking and personality.

Route: `/portfolio/colorful/`

## Portfolio B — Full-stack

Use as the primary professional portfolio. It emphasizes architecture, APIs, data, engineering, deployment and the actual scope of work on each project.

Route: `/portfolio/`

## Rules

1. Keep project data in JavaScript data structures rather than duplicating HTML cards.
2. Keep visual styles separate from behavior.
3. Keep responsive rules in a dedicated stylesheet for Portfolio B.
4. Decorative assets must never capture pointer events or become required for navigation.
5. Informative images need meaningful alt text; decorative images use `aria-hidden`.
6. Do not claim backend ownership for projects where the actual contribution was frontend/API integration.
7. Every project popup should expose: role, stack, contribution, project context and repository.
8. New visual experiments belong in `assets/` or the Colorful variant, not as emergency overrides in the production Full-stack stylesheet.
