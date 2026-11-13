# NESTLIR — Full-Stack Portfolio Roadmap

**Product direction:** Hybrid Editorial × Technical  
**Positioning:** Balanced Full-Stack Developer portfolio  
**Runtime:** React 19, TypeScript, Vite, Vitest, Playwright, GitHub Pages

This document is the implementation baseline for the next portfolio iteration. It deliberately evolves the existing application instead of replacing it.

## Product principles

1. Preserve the NESTLIR / Atelier Narrative visual identity and original artwork.
2. Make the engineering evidence as easy to inspect as the editorial presentation.
3. Treat the repository as the source of truth for project claims.
4. Distinguish personal contribution, team contribution, educational work and experiments.
5. Never invent metrics, production capabilities, databases, API services or professional experience.
6. Keep the portfolio static unless a separately justified backend requirement is approved.
7. Do not introduce an AI tools catalogue or AI Specialist Library.

## Target information architecture

| Route / section | Purpose | Key content |
|---|---|---|
| Home | Positioning and first impression | Hero, featured projects, engineering overview, contact CTA |
| Projects | Project discovery | Search, category, technology and sort filters |
| Project case study | Technical evidence | Context, role, contribution, architecture, decisions, tests, outcomes, limitations |
| Engineering | Capability map | Frontend, backend, APIs, data, testing, security, delivery |
| About | Professional narrative | Development principles, approach, learning focus |
| Resume | Recruiter-friendly summary | Skills, selected work, verified education and PDF when supplied |
| Contact | Professional contact | Email draft, GitHub, Telegram |

The current application is a single-page React experience with section anchors and case-study dialogs. Route-level pages are a target evolution, not an assumption that routing already exists. Introduce routing only after verifying GitHub Pages base-path and fallback behavior.

## Featured project hierarchy

1. **NOMAD — Quiet Kyoto:** primary full-stack architecture case.
2. **MOMOHA:** frontend-to-API order flow and delivery setup.
3. **DataVac:** team product and documented frontend/API contribution.
4. **50 Projects Lab:** multi-project runtime, systems work and QA.
5. Learning and experiments remain available but visually secondary.

## Engineering evidence standard

Every capability statement should link to at least one of:
- a source repository or source file;
- a test or CI workflow;
- an architecture document;
- a working demo;
- a documented contribution record.

Do not show a technology as used in a project unless the project source supports it. Keep planned architecture visibly separate from implemented architecture.

## Current implementation baseline

- React 19 + TypeScript + Vite.
- Typed project data in `src/data/projects.ts`.
- RU copy in `src/data/projectCopy.ts`; interface translations in `src/i18n.ts`.
- Search and category filters in `src/components/ProjectCatalog.tsx`.
- EngineeringCenter with six evidence-backed areas (Frontend, Backend, APIs, Data, Testing & Quality, DevOps & Delivery).\n- Architecture and quality modules in `src/components/`.
- Vitest unit tests and Playwright cross-browser E2E.
- Static GitHub Pages deployment under `/nestlir/portfolio/`.
- Contact currently uses `mailto:`; no message API or database exists.

## Delivery phases

### Phase 0 — Audit and baseline
- Inspect all existing pages, components, styles, design assets, tests and workflows.
- Record current behavior and preserve the current public URL.
- Identify content claims that need stronger source evidence.
- Do not delete unrelated repository projects or workflows.

### Phase 1 — Portfolio foundation
- Establish reusable layout and design tokens.
- Improve navigation and section hierarchy.
- Make catalog state shareable through URL parameters.
- Keep RU/EN copy aligned.
- Verify direct-load and GitHub Pages base-path behavior.

### Phase 2 — Core experience
- Build the Home, Projects, Engineering, About, Resume and Contact experiences.
- Add route-level navigation only when static-hosting behavior is verified.
- Keep the editorial art direction while using technical layouts for evidence.

### Phase 3 — Evidence-led case studies
- Expand NOMAD, MOMOHA, DataVac and 50 Projects Lab.
- Inspect source repositories before adding code-level claims.
- Add architecture diagrams and source/test links.
- Add explicit contribution and limitation sections.

### Phase 4 — Engineering center
- Organize Frontend, Backend, APIs, Data, Testing, Security and DevOps evidence.
- Link each claim to a project, test, source file or workflow.
- Avoid decorative skill percentages.

### Phase 5 — Quality and release
- Accessibility review against WCAG 2.2 AA target.
- Responsive checks at 320px, 360px, tablet and desktop.
- SEO and metadata audit.
- Cross-browser E2E, production build and bundle budgets.
- Verify deployment and live routes.

## Acceptance gates

- Existing catalog, case dialogs, language switch and mobile navigation continue to work.
- Catalog filters can be combined and restored from URL query parameters.
- Empty states and reset behavior are accessible.
- Every featured project has a clear role and contribution boundary.
- Architecture diagrams reflect source code, not aspirations.
- No fake contact submission, backend, database or metrics.
- Unit, build and E2E checks pass.
- Existing SUWENKU, labs and systems workflows remain intact.
- Documentation matches the deployed implementation.
