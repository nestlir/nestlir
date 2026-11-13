# NESTLIR — Portfolio Magazine

A React + TypeScript engineering portfolio with an editorial magazine identity.

## Experience
- Responsive editorial landing page preserving the Atelier Narrative art direction.
- Searchable project catalogue with category filters.
- Ten evidence-led project entries, including DataVac, NOMAD, MOMOHA and 50 Projects Lab.
- Detailed case studies: context, architecture/data flow, decisions, contribution boundaries, outcomes and source links.
- Interactive target architecture map for the portfolio itself.
- Separate testing, security and performance demonstrations.
- RU / EN interface, keyboard-accessible navigation, dialog focus restoration and reduced-motion support.
- Contact opens an email draft. There is no server-side submission or message storage.

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
npx playwright install chromium firefox webkit
npm run test:e2e
```

## Structure
- `src/data/projects.ts` — canonical, typed project facts.
- `src/data/projectCopy.ts` — RU project content.
- `src/data/filterProjects.ts` — pure catalogue filtering.
- `src/components/` — case studies, project catalogue, architecture and quality modules.
- `src/i18n.ts` — RU / EN interface copy.
- `e2e/` — desktop and mobile browser journeys.
- `ARCHITECTURE.md` — module boundaries, data flow, ADRs and future API requirements.
- `AGENTS.md` — coding, attribution and quality rules for future agent work.
- `SECURITY.md` — security boundaries and future contact API requirements.
- `design-system/` — original art direction, grid, UI, accessibility and release specifications.
- `assets/` — original illustrations and icons.

The architecture map describes the portfolio's intended boundaries; it does not claim an active backend or database. Contact stays on mailto until a separately hosted API is deliberately selected.
