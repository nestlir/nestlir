# NESTLIR — Portfolio Magazine

A fullscreen, eight-page digital magazine for Anastasia's Fullstack / Frontend engineering portfolio. The issue combines an editorial fashion-illustration identity with evidence-led project notes.

## Experience
- Desktop: fullscreen cover composition, then readable two-page editorial spreads.
- Mobile: one page at a time, with reflowed layouts rather than a scaled desktop spread.
- Navigate by arrow buttons, keyboard arrows, the contents page, progress segments or horizontal swipe.
- Direct page URLs use `#page-N`; browser history follows page changes.
- RU / EN interface, accessible controls, reduced-motion support and print / Save as PDF stylesheet.
- Contact form validates in the browser and prepares a mailto draft; it does not pretend to send through a backend.

## Issue 01
1. Cover
2. Contents and author note
3. Tools of the trade
4. DataVac — team project, limited frontend contribution in the vaccination module
5. Furniture Store — AI-assisted independent experiment
6. Educational assignments: Web Larek, Stellar Burger, Mesto, Blog Customizer and Оно тебе надо
7. Working approach: discovery → design → implementation → quality gates → delivery
8. Correspondence

Project attribution is explicit. DataVac is not presented as solo work; Furniture Store is marked AI-assisted; educational assignments are not described as commercial client work.

## Design source
See `design-system/` for art direction, character sheet, editorial storyboard, UI kit, grid, motion, accessibility and token specifications. Original local illustrations and line icons live in `assets/magazine/`. The approved portrait cover artwork is hosted on the owner's durable Picsart CDN and is referenced by the asset manifest.

## Run locally
From the repository root:
```bash
python -m http.server 4173
```
Open `http://localhost:4173/portfolio/`.

## QA
Run the static release check from the repository root:
```bash
node portfolio/smoke-test.mjs
```

The site is dependency-free static HTML, CSS and JavaScript; the existing GitHub Pages workflow can continue serving `portfolio/`.

## Engineering principles

The portfolio presents technologies evidenced by the project repository separately from broader engineering practices. It does not claim every tool in external AI-agent catalogues as personal experience.

- Product discovery and clear contribution boundaries.
- Interface architecture, responsive behaviour and accessibility.
- API and data-flow awareness across frontend/backend boundaries.
- Test planning, security-aware changes, performance and documentation.
- Human review of AI-assisted work and explicit attribution.

The contact form is intentionally a validated `mailto:` draft. GitHub Pages is static hosting; no backend form submission or database is implied.
