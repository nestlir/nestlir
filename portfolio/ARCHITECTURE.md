# Portfolio architecture

The repository contains **two intentionally different portfolio pages in one deployable project**.

```text
portfolio/
├── index.html                 # Full-stack / engineering edition
├── app.js                     # Full-stack data, i18n and interactions
├── app.css                    # Full-stack visual system
├── responsive.css             # Full-stack responsive layer
├── favicon.svg
├── frontend/                  # Original Frontend / visual edition
│   ├── index.html
│   ├── frontend.css
│   ├── frontend.js
│   └── README.md
├── assets/
├── README.md
├── ARCHITECTURE.md
└── CODE_REVIEW.md
```

## Page A — Frontend edition

Route: `/frontend/`

This is the original colorful direction: editorial typography, dopamine palette, photography, stickers, playful motion, anime/pop-culture references and cinematic project popups. Its job is to demonstrate frontend craft, visual thinking, product UI and personality.

The page is independent: its CSS and JavaScript are loaded only by the Frontend page.

## Page B — Full-stack edition

Route: `/`

This is the primary engineering portfolio. It keeps the earlier information architecture:

`Hero → Stack → Selected Work → Case Studies → Engineering → Experience → Contact`

Its visual language is more restrained and system-oriented, while still retaining the same editorial character. Project data, localization, filters, modal case views, theme switching and mobile navigation remain in the Full-stack application layer.

## Navigation contract

- Full-stack header/footer → `./frontend/`
- Frontend header/footer → `../`
- No cross-page dependency on JavaScript state.
- No Frontend stylesheet is loaded by the Full-stack page.
- No Full-stack stylesheet is loaded by the Frontend page.
- Both pages are deployed together by the same GitHub Pages workflow.

## Refactoring rules

1. Keep each page's visual system isolated.
2. Keep project data in JavaScript rather than duplicating cards in HTML.
3. Keep behavior in JavaScript and presentation in CSS.
4. Do not hide a separate page inside the other page as a section.
5. Use relative links so the project works under the GitHub Pages repository path.
6. Decorative elements never capture pointer events or become required for navigation.
7. Project claims must reflect the actual contribution.
8. Informative images need meaningful alt text; decorative elements use `aria-hidden`.
9. Keep responsive rules close to the page's own visual system.
