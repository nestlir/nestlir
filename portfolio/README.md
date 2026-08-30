# Anastasia — Full-stack Developer Portfolio

**Cinematic full-stack portfolio / product engineering / visual playground**

A personal portfolio that presents the full product path: **UI → API → DATA → AUTH → TEST → DEPLOY**.

## Information architecture

1. **Hero** — Full-stack Developer positioning.
2. **Stack** — UI/UX, frontend, backend, data, infrastructure and AI.
3. **Selected Work** — projects with the actual area of responsibility highlighted.
4. **Case Studies** — Understand → Build → Ship.
5. **Engineering** — API contracts, validation, state, authentication, data mapping, testing, Docker and deployment.
6. **Experience** — practical work across UI, API and product logic.
7. **Contact** — GitHub and direct contact CTA.

## Languages

The portfolio supports **RU / EN / JP** without a page reload. The selected language is stored in `localStorage`, and project cards plus modal case studies use the same localized data model.

## Selected projects

- **DataVac** — Next.js, TypeScript, API integration, payments, PDF and E2E.
- **Furniture Store** — responsive product UI, SEO and seller-dashboard MVP.
- **Story OS** — Python, Telegram, SQLite, OpenAI and product architecture.
- **Multimodal AI** — React, Python, Redis, Docker/Kubernetes and AI integrations.
- **Stellar Burger** — React, Redux, API and application UI.
- **Web Larek** — TypeScript, Express, MongoDB and e-commerce flows.
- **Mesto** — React, REST API and interface decomposition.
- **Blog Customizer** — React, TypeScript, forms and reusable UI.
- **Оно тебе надо** — semantic HTML, CSS and responsive editorial layout.

Each card exposes the technology stack and the concrete contribution described by the portfolio data. Repository links open the corresponding GitHub project.

## Visual direction

The visual language combines editorial typography, cinematic pacing, photography, stickers, SVG markers, Japanese graphic references, grain and controlled chaos. Decorative elements are kept separate from the content and navigation layer.

## Stack

HTML5 · CSS3 · Vanilla JavaScript · responsive design · GitHub Actions · GitHub Pages

## Structure

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

## Interactions

- RU / EN / JP language switcher;
- project filtering;
- project detail modal;
- light / dark theme;
- `MAKE IT WEIRD` visual mode;
- responsive mobile navigation;
- scroll progress and cinematic marquee;
- keyboard Escape handling for menus and modals;
- reduced-motion support.

## Run locally

From the repository root:

```bash
python -m http.server 4173
```

Open:

```text
http://localhost:4173/portfolio/
```

## Deployment

GitHub Pages is configured by `.github/workflows/portfolio-pages.yml`, which publishes the `portfolio/` directory after changes reach `main`.

## Live site

[Open the portfolio](https://nestlir.github.io/nestlir/portfolio/)

## Related views

- [Frontend portfolio](https://nestlir.github.io/nestlir/portfolio/frontend/)
- [50 Projects Lab](https://50-projects-lab.vercel.app/)
- [Repository](https://github.com/nestlir/nestlir)

## Design principle

**Character without noise. Engineering without the black box.**

The goal is to show visual taste, product thinking and the ability to move from an interface to a working production-oriented system without hiding the engineering behind decorative presentation.
