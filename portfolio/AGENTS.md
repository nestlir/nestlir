# Agent instructions — portfolio

## Product intent
Preserve NESTLIR's editorial / Atelier Narrative identity while making the work legible as an engineering portfolio. Do not turn it into a generic SaaS landing page.

## Architecture constraints
- Use React + TypeScript for application code. Do not reintroduce a parallel vanilla-JS application.
- Keep UI modules in `src/components`, typed project facts in `src/data/projects.ts`, pure filtering in `src/data/filterProjects.ts`, and translations in `src/i18n.ts` / `src/data/projectCopy.ts`.
- Keep state close to the component that owns it. Add a global state library only when a real cross-feature requirement exists.
- The portfolio is static on GitHub Pages. Do not add API calls, database assumptions or server features without an explicit architecture decision.
- Do not replace the current mailto contact action with a fake client-side submission. A real form requires a separate backend, validation, abuse controls, privacy and deployment decisions.

## Evidence and attribution
- Every project claim must be supported by its repository, README, architecture notes or explicitly supplied material.
- Keep team contributions distinct from sole ownership.
- Label educational work and experiments accurately.
- Never invent user counts, performance improvements, revenue, adoption or delivery metrics. If a result is not measured, describe the implemented capability instead.
- Preserve source links in case studies.

## UI and accessibility
- Maintain the responsive grid at 320px, 360px, tablet and desktop widths.
- Avoid horizontal overflow; use minmax(0, 1fr), flexible gaps and content-aware sizing.
- Keep keyboard focus visible. Dialogs must support Escape and restore focus.
- Respect prefers-reduced-motion and provide meaningful labels for controls.
- Keep RU and EN content aligned when adding visible copy.

## Required checks
Run from `portfolio/`:
- `npm test`
- `npm run build`
- `npm run test:e2e`

Update `ARCHITECTURE.md` when changing module boundaries, data flow, persistence or deployment.
