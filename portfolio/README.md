# NESTLIR — Illustrated Digital Atlas

Personal portfolio for Anastasia, focused on interface development and honest project context. The site is a single responsive experience in Russian and English.

## Experience

- Editorial atlas identity with locally drawn SVG illustration and a matching monogram favicon.
- One project catalog with filters for team, AI-assisted and educational work.
- Project details are rendered with DOM nodes and text content.
- Language and theme preferences are stored safely when browser storage is available.
- Keyboard-accessible filter and theme states, skip link, live result count, mobile navigation and reduced-motion support.
- No remote photography. Display fonts are requested from Google Fonts; system fallbacks are defined. For a fully self-hosted/offline build, bundle the required WOFF2 files locally.

## Project attribution

- **DataVac** — team product; contribution is limited to frontend tasks in the vaccination module.
- **Furniture Store** — AI-assisted experiment guided by the author's brief.
- **Web Larek, Stellar Burger, Mesto, Blog Customizer, Оно тебе надо** — educational assignments.

Archived projects without confirmed personal contribution are omitted.

## Files

- `index.html` — unified page and content structure.
- `app.js` — bilingual copy, project data, filters and accessible controls.
- `app.css`, `responsive.css` — visual system and responsive layouts.
- `assets/atlas-map.svg` — original local hero illustration.
- Project card media are marked 4:3 asset placeholders (`data-asset-slot`); replace only with approved authentic project captures.
- `frontend/index.html` — compatibility redirect to the single portfolio.
- `smoke-test.mjs` — static release checks.

## Run locally

From the repository root, run `python -m http.server 4173` and open `http://localhost:4173/portfolio/`.

## Deployment

The portfolio is published with the repository's GitHub Pages workflow at [nestlir.github.io/nestlir/portfolio](https://nestlir.github.io/nestlir/portfolio/).

## Design principle

**Character without noise. Experience without inflated claims.**
