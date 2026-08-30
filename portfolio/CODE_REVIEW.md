# Portfolio Code Review — current architecture

## Scope

Review of `portfolio/` after consolidating the public portfolio into two connected views:

- **Full-stack portfolio** — `portfolio/`
- **Frontend portfolio** — `portfolio/frontend/`

The review covers semantic structure, project data, localization, modal behavior, theme switching, filters, mobile navigation, accessibility, responsive behavior and deployment.

## Current architecture

```text
portfolio/
├── index.html
├── app.js
├── i18n.js
├── ui-controller.js
├── shared-ui.js
├── app.css
├── responsive.css
├── favicon.svg
├── favicon.png
├── assets/
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   └── quality-fixes.css
├── smoke-test.mjs
└── README.md
```

The full-stack and frontend views share UI utilities and localization infrastructure where appropriate while keeping their own project presentation logic.

## Portfolio behavior

- project cards expose technology stack and contribution scope;
- project details open in a modal;
- RU / EN / JP language switching is persisted in `localStorage`;
- light and dark themes are supported;
- mobile navigation has explicit open/close state;
- Escape closes supported overlays;
- reduced-motion preferences are respected;
- decorative elements are separated from actionable navigation.

## Positioning

The full-stack view communicates work across UI, APIs, data, integrations, deployment and architecture without claiming that every listed project is entirely backend-owned.

The frontend view focuses more strongly on interface engineering, product UX and visual systems.

## Deployment

`.github/workflows/portfolio-pages.yml` runs the portfolio smoke test and publishes `portfolio/` to GitHub Pages after changes reach `main`.

## Remaining considerations

- Remote Unsplash images remain a runtime dependency; a stricter production release should self-host licensed WebP/AVIF assets.
- External repository links should continue to be periodically checked.
- If the portfolio grows significantly, the current data model can be migrated to a framework without changing the information architecture.

## Verdict

**Ready for portfolio use, with the documentation and public links aligned to the current repository structure.**
