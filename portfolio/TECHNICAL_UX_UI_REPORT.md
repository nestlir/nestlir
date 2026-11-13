# NESTLIR Portfolio — Technical & UX/UI Review

**Date:** 13 November 2026  
**Scope:** `portfolio/` static frontend and its GitHub Pages deployment contract  
**Base branch:** `main`  
**Review branch:** `fix/portfolio-ux-accessibility-report`

## Executive summary

The portfolio has a coherent editorial/cartographic identity, a clear bilingual structure and unusually careful project attribution. The reviewed implementation is a compact static site with no application framework or server-side runtime.

This pass addresses the verified source-level defects below and documents the remaining validation gaps. A browser-based visual pass, real screen-reader testing, computed contrast audit, mobile viewport inspection and deployment smoke test remain necessary before calling the redesign release-ready.

## Changes made in this branch

1. **Language switching no longer destroys decorative child elements.** The hero CTA translation is scoped to its label span, and the archive heading translation is scoped separately from its decorative period.
2. **Mobile menu close behavior is centralized.** Selecting a menu link now calls the same `setMenu(false)` path used by Escape and the menu control, keeping hidden state, `aria-expanded`, body scroll lock and focus return in sync.
3. **Documentation now accurately describes font loading.** The page requests DM Mono, DM Sans and Playfair Display from Google Fonts; system fallbacks exist, but this is not a fully offline/no-remote-font experience.
4. **Static regression tests were expanded.** Added checks for scoped translation wrappers, preservation of decorative spans, shared menu close handler and honest font dependency documentation.

## Findings and severity

| ID | Priority | Area | Finding | Resolution / remaining action |
|---|---|---|---|---|
| UX-01 | P1 | RU/EN switching; hero CTA and archive heading | Replacing parent `textContent` erased nested arrow and heading punctuation. | Fixed by moving `data-i18n` onto dedicated text spans. |
| UX-02 | P1 | Mobile navigation | Link-close path duplicated only part of `setMenu` state handling. | Fixed by routing link selection through `setMenu(false)`. |
| DOC-01 | P2 | README / CODE_REVIEW | Documentation claimed no remote font dependency while CSS imported Google Fonts. | Fixed wording; consider self-hosting fonts if privacy/offline/performance requirements demand it. |
| A11Y-01 | P2 | Ticker marquee | The animated ticker repeats decorative phrases and can create noisy/redundant reading for assistive technology. | Needs browser + screen-reader validation; consider `aria-hidden="true"` if it carries no unique information. |
| QA-01 | P1 | Test strategy | Existing release checks were source/static checks, not actual browser interaction tests. | Added static regression guards; still add Playwright coverage for language, filters, theme, keyboard and storage failures. |
| QA-02 | P1 | Responsive layout | Breakpoints are present at 1000/700/360px, but 701–1000px header fit and actual device-width behavior have not been visually verified. | Browser QA required at 1440, 1024, 768, 390 and 320 CSS px. |
| A11Y-02 | P1 | Contrast / target size | CSS uses muted text and compact 8–10px field labels. No computed contrast or hit-target measurement was run in a browser. | Verify WCAG 2.2 AA contrast and target-size exceptions/requirements; enlarge interactive targets where needed. |

## UX/UI assessment

### Strengths
- One primary information architecture: hero → selected work → principles → about → contact.
- Clear differentiation between team contribution, AI-assisted work and educational assignments.
- Two language states and theme state are exposed through button semantics.
- Skip link, live project count, focus-visible outline and reduced-motion CSS are present.
- Local SVG hero illustration supports the distinct visual identity without relying on remote photography.

### Recommended next design iteration
- Make each project card more decision-useful: add a concise role, task, personal contribution, tools and a visible “case study / repository” distinction. Keep only confirmed claims.
- Give project cards a consistent action hierarchy: primary “View project” and secondary “Source / repository” only when a case study exists.
- Add a compact “What I did” block to DataVac and Furniture Store to explain individual scope without overstating team/AI work.
- Replace or supplement decorative abstract card art with authentic project screenshots only when supplied and approved.
- On mobile, ensure project filters remain easy to scan and horizontally scrollable controls show a clear affordance.
- Consider reducing hero copy width and letting the main CTA remain visually dominant at tablet widths.
- Add visible hover, focus, active and disabled behavior documentation to the design system.

### Proposed responsive QA matrix
- 1440×900 desktop: hero balance, three-column archive, sticky header.
- 1024×768 laptop/tablet landscape: header controls must not collide or wrap unexpectedly.
- 768×1024 tablet: navigation density, two-column cards, about-section balance.
- 390×844 mobile: menu open/close, single-column cards, readable CTA.
- 320×700 compact mobile: language controls, filters, long titles and contact action.

## Technical recommendations

1. Add Playwright end-to-end tests for RU↔EN switch (including decorative span preservation), menu open/close via button/link/Escape, filter aria-pressed state, theme persistence and storage exceptions.
2. Add automated accessibility checks (axe-core) to a real browser run, then manually verify keyboard flow and screen-reader announcements.
3. Measure actual contrast ratios from computed styles in both light and dark themes. Do not infer contrast from source colors alone.
4. Decide whether Google Fonts are an intentional external dependency. If not, self-host licensed WOFF2 files and add `font-display: swap`.
5. Add visual regression screenshots for desktop/tablet/mobile after the visual direction is finalized.
6. Check deployment output at the public Pages URL after merge; the current review did not independently certify the deployed build.

## Validation status

- Source-level fixes: applied in this branch.
- JavaScript syntax check: part of the repository workflow and local smoke test.
- Static smoke test: expanded in this change; must be run in CI after PR creation.
- Browser interaction / visual testing: not run in this environment.
- WCAG contrast / Lighthouse: not run; no numerical compliance claim is made.
- GitHub Pages deployment: pending PR merge and successful Actions run.

## Release recommendation

**Do not merge as a final visual redesign yet.** The current branch is a targeted correctness and documentation patch. Treat it as the stabilization step; complete the responsive browser pass, accessibility audit and project-content review before the next design release.

## Source files reviewed

- `portfolio/index.html`
- `portfolio/app.js`
- `portfolio/app.css`
- `portfolio/responsive.css`
- `portfolio/smoke-test.mjs`
- `portfolio/README.md`
- `portfolio/CODE_REVIEW.md`
- GitHub Pages workflow (previous audit; deployment must be revalidated on PR)


## Follow-up audit and implementation — 13 November 2026

### New adaptive layout

The page now uses an editorial atlas composition while retaining the existing section order and confirmed project copy:

- The hero remains the cover moment: large serif statement, existing atlas map, issue stamp and coordinates.
- The portfolio archive reads as a project index. DataVac receives the featured two-column case-study spread on wide screens; remaining cards follow in a compact three-column grid.
- Tablet widths keep the featured case full-width and use a two-column project grid. Mobile collapses every case to a single vertical card, with filters remaining horizontally scannable.
- Each project image area is an explicit dashed 4:3 placeholder with a stable `data-asset-slot` identifier. These are layout scaffolds only; no images were generated or added.
- Existing RU/EN, light/dark themes, project filters, team/AI/study labels and repository links remain in the page.

### Additional findings and changes

| ID | Priority | Finding | Resolution / remaining action |
|---|---|---|---|
| A11Y-01 | P2 | Repeating ticker text had a redundant accessible label and could be read as content. | Marked the purely decorative ticker `aria-hidden="true"`; verify announcement behavior with a screen reader in browser QA. |
| UX-03 | P1 | The portfolio lacked a clear editorial focal project and its media areas were abstract decorations rather than asset-ready layout slots. | DataVac gets featured placement; project visuals now have labeled 4:3 placeholders and stable IDs. |
| UX-04 | P2 | Compact controls could fall short of comfortable touch sizing. | Main theme/menu controls and project filters now have 44px minimum targets. Language choices have 32px height and 38px width; enlarge further if device QA identifies misses. |
| QA-03 | P1 | Existing static checks did not guard new layout and ticker semantics. | Added static assertions for decorative ticker hiding, asset slot IDs, ratio labels, feature placement and mobile rules. |

### Revised UX/UI scorecard (source review)

| Criterion | Status | Assessment |
|---|---|---|
| Usability | Yellow | Information hierarchy and DataVac focal point are clearer. Actual task completion and navigation behavior still need browser testing. |
| Accessibility | Yellow | Decorative ticker is hidden, focus and reduced-motion rules exist, and primary controls have larger targets. Contrast, screen reader, zoom and touch behavior are unmeasured. |
| Visual hierarchy | Green / source-level | Cover, feature case, archive cards and supporting editorial sections have distinct roles. Visual rendering has not been observed in a browser. |
| Consistency | Green / source-level | Shared palette, serif/sans/mono roles, card patterns and RU/EN attribution remain consistent in source. |
| Responsiveness | Yellow | Explicit desktop/tablet/mobile composition is defined; no viewport screenshots or browser checks were available. |
| Brand | Green / source-level | NESTLIR illustrated digital atlas direction and warm cartographic palette remain intact. |

### Test and review status for this follow-up

- The previous branch's static smoke-test assertions remain and were extended.
- No local checkout/browser runtime was available through the connected repository workspace, so this follow-up's smoke test has **not** been represented as locally executed.
- GitHub Actions must run against the updated PR commit to provide an execution result.
- Browser screenshots, visual comparison, screen-reader testing, computed WCAG contrast, Lighthouse and real-device responsive QA remain **not run**.
- No visual QA result or contrast compliance claim is made in this report.
- Authorship and project provenance remain conservative: DataVac is a team product, Furniture Store is AI-assisted, and the remaining listed work is marked educational.

### Next priorities

1. **P1 — Browser regression:** run Playwright for language/decorative child preservation, filters, theme persistence, menu button/link/Escape and storage failures.
2. **P1 — Responsive visual review:** inspect 1440, 1024, 768, 390 and 320 CSS px, including 200% zoom and long localized copy.
3. **P1 — Accessibility:** run axe, calculate computed contrast in both themes, and manually check keyboard/screen-reader output and touch targets.
4. **P1 — Real project media:** replace each placeholder only with approved authentic screenshots; start with DataVac module screens and clearly caption team context.
5. **P2 — Offline typography:** decide whether to self-host licensed WOFF2 files or keep Google Fonts as an explicit remote dependency.
6. **P2 — Case study depth:** add verified role, problem, decisions and outcome details where source material supports them.

