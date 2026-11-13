# NESTLIR — Portfolio Magazine

A React + TypeScript engineering portfolio with an editorial magazine identity.

## Experience
- Responsive editorial landing page preserving the Atelier Narrative art direction.
- Project catalogue with category filters and full-text search.
- Detailed case-study dialogs: context, decisions, role, contribution boundaries and evidence.
- Interactive architecture map that distinguishes implemented static layers from future API / database boundaries.
- Separate quality sections for testing, security and performance.
- RU / EN interface, keyboard-accessible navigation, reduced-motion support.
- Contact opens a validated email draft. There is no server-side submission or message storage.

## Stack
React 19 · TypeScript · Vite · Vitest · Playwright · GitHub Pages

## Run locally
```bash
cd portfolio
npm install
npm run dev
```

## Checks
```bash
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

## Structure
- `src/data/projects.ts` — evidence-led project content.
- `src/data/filterProjects.ts` — pure catalogue filtering.
- `src/components/` — case studies, project catalogue, architecture and quality modules.
- `src/i18n.ts` — RU / EN copy.
- `e2e/` — desktop and mobile browser journeys.
- `design-system/` — art direction, grid, UI, accessibility and release specifications.
- `assets/` — original illustrations and icons.

The architecture map describes the portfolio's intended boundaries; it does not claim an active backend or database. Contact stays on mailto until a separately hosted API is deliberately selected.
