# Full-stack portfolio

## Concept

A separate engineering-first visual identity from the Frontend edition.

**Visual language:** dark systems canvas, terminal logs, grid/monospace metadata, cyan + lime accent colors, technical markers, editorial serif headings, and cinematic project imagery.

## Information architecture

`Hero → Stack → Selected Work → Case Studies → Engineering → Experience → Contact`

## Project presentation

Each project shows:

- project image;
- category;
- actual contribution / scope;
- stack;
- concise result/context;
- case popup with `UI → API → DATA → SHIP` system map;
- repository link.

## Navigation

The Full-stack page links to `./frontend/` as the Frontend edition. The Frontend page links back to `../`.

## Technical structure

- `index.html` — Full-stack page markup;
- `fullstack-design.css` — Full-stack-only visual system;
- `fullstack.js` — projects, filters, modal, mobile menu, language state and cursor;
- `frontend/` remains a separate independent page.

The Full-stack page intentionally does not load the Frontend page's CSS or JavaScript.