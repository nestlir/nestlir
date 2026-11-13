# Portfolio architecture

## Runtime model

The portfolio is a static React application built with Vite and published under the GitHub Pages path `/nestlir/portfolio/`. It does not require a runtime server, database or API.

```text
Browser
  └─ React App shell
      ├─ Navigation + locale state
      ├─ ProjectCatalog
      │   ├─ URL query state (category / q / technology / sort)
      │   └─ filterProjects() → typed project data
      ├─ CaseStudy (lazy-loaded)
      │   └─ context / architecture / decisions / contribution / outcomes / evidence
      ├─ EngineeringCenter (six evidence-backed capability areas)\n      │   └─ project case-study links\n      ├─ ArchitectureMap (interactive target model)
      └─ QualityCards
          ├─ test strategy
          ├─ security boundaries
          └─ performance budgets
```

## Module boundaries

| Module | Responsibility | State / dependency |
|---|---|---|
| `App.tsx` | App shell, locale, mobile menu, case hash | React state; no global store |
| `ProjectCatalog.tsx` | Search, category, technology and sort filters | Local state synchronized to URL query parameters |\n| `EngineeringCenter.tsx` | Six capability areas with project-backed evidence and case-study actions | Locale copy + `onOpen` callback into App case-study state |
| `filterProjects.ts` | Pure filtering, sorting and URL state parsing/serialization | No React or browser dependency |
| `projects.ts` | Canonical typed project facts | Static TypeScript data |
| `projectCopy.ts` | RU project-content localization | Project IDs |
| `CaseStudy.tsx` | Detailed case presentation and dialog lifecycle | Lazy-loaded on demand |
| `ArchitectureMap.tsx` | Interactive architecture explanation | Local selected-node state |
| `QualityCards.tsx` | Quality practices and inspectable examples | Static copy |
| `i18n.ts` | RU / EN interface copy | Locale key |

## State and navigation

- Locale and mobile-menu visibility are ephemeral React state.
- Catalogue category, search, technology and sort are local component state reflected in URL query parameters.
- Invalid category, technology and sort query values are ignored and fall back to safe defaults.
- The catalogue uses `history.replaceState` so typing does not create a browser-history entry for every keystroke.
- Opening a case writes its stable ID to the URL hash, so a case can be linked directly.
- Project content is curated and versioned with the code. No database is used.
- The contact action is `mailto:`; the portfolio does not receive or store messages.

## Architecture boundaries

The interactive map describes the portfolio's target design. The frontend and typed content modules are implemented. An API and database are not part of this static portfolio runtime.

If a server-side contact form is approved later, introduce it as a separate service:
1. Define a versioned request/response contract and server-side schema validation.
2. Keep provider credentials only in server-side environment variables.
3. Add rate limiting, abuse protection, origin policy and safe error handling.
4. Define data retention, deletion and privacy disclosure before storing contact messages.
5. Add API integration tests and an end-to-end submission test before enabling the form.

## Quality gates

1. `npm test` — pure filtering, URL state parsing/serialization and project-data invariants.
2. `npm run build` — strict TypeScript check, production build and aggregate JS/CSS budgets.
3. `npm run test:e2e` — Chromium, Firefox and WebKit desktop; Chromium and WebKit mobile profiles.
4. GitHub Actions runs the portfolio checks before Pages deployment and retains the existing SUWENKU checks.

## Architecture decisions

- **React + TypeScript:** explicit component and data contracts for a growing portfolio.
- **Vite + static Pages:** keep hosting simple; do not add a server solely to render portfolio content.
- **Typed source data:** project facts are reviewed with code and do not require runtime CMS/database complexity.
- **Lazy case studies:** defer detailed case content until a visitor opens a project.
- **URL-backed catalogue state:** filters can be shared and restored without introducing a database or global state library.
- **mailto for now:** no message-processing backend is introduced without a deliberate hosting and privacy decision.
