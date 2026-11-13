# NESTLIR — Full-Stack Engineering Portfolio

A React + TypeScript portfolio combining the original Atelier Narrative editorial identity with inspectable engineering evidence.

**Direction:** Hybrid Editorial × Technical  
**Positioning:** Balanced Full-Stack Developer  
**Live portfolio:** https://nestlir.github.io/nestlir/portfolio/

## Product experience

- Editorial landing page with a clear Full-Stack positioning.
- Project catalogue with category, full-text, technology and sorting filters.
- Shareable catalogue state through URL query parameters.
- Evidence-led project case studies with context, contribution boundaries, architecture, decisions, outcomes and source links.
- Interactive architecture model for the portfolio itself.
- Separate quality demonstrations for testing, security and performance.
- RU / EN interface, keyboard-accessible navigation, dialog focus restoration and reduced-motion support.
- Contact opens an email draft. There is no server-side submission or message storage.

## Featured work

- **NOMAD — Quiet Kyoto:** modular frontend/backend architecture and repository boundaries.
- **MOMOHA:** static frontend with a lightweight Node API and order workflow.
- **DataVac:** team product with a documented frontend contribution and REST API integration.
- **50 Projects Lab:** 30 browser demos and 13 C/C++ systems projects.

Educational projects and experiments remain available but are distinguished from team product work.

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
- `src/data/filterProjects.ts` — pure catalogue filtering and URL state parsing.
- `src/components/` — case studies, project catalogue, architecture and quality modules.
- `src/i18n.ts` — RU / EN interface copy.
- `e2e/` — desktop and mobile browser journeys.
- `ARCHITECTURE.md` — module boundaries, data flow, decisions and future API requirements.
- `PORTFOLIO_ROADMAP.md` — product direction, information architecture and phased delivery plan.
- `AGENTS.md` — coding, attribution and quality rules for future agent work.
- `SECURITY.md` — security boundaries and future contact API requirements.
- `design-system/` — original art direction, grid, UI, accessibility and release specifications.
- `assets/` — original illustrations and icons.

The architecture map describes the portfolio's intended boundaries; it does not claim an active backend or database. Contact stays on mailto until a separately hosted API is deliberately selected.
