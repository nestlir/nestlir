# Anastasia — Full-stack Developer Portfolio

**Cinematic full-stack portfolio / product engineering / visual playground**

Профессиональный персональный сайт, который показывает не только frontend, но и полный путь продукта: UI → API → DATA → AUTH → TEST → DEPLOY.

## Information architecture

1. **Hero** — Full-stack Developer positioning.
2. **Stack** — UI/UX, frontend, backend, data, infrastructure, AI.
3. **Selected Work** — проекты и реальная зона ответственности.
4. **Case Studies** — Understand → Build → Ship.
5. **Engineering** — API contracts, validation, state, authentication, mapping, testing, Docker, deployment.
6. **Experience** — практический intersection UI / API / product logic.
7. **Contact** — GitHub and direct contact CTA.

## Visual direction

**Много воздуха + сладкий хаос + editorial typography + cinematic pacing.**

Визуальный язык использует фотографии, stickers, SVG-маркеры, film frames, японские графические мотивы, grain, candy accents, мемные microcopy и controlled chaos. Декоративный слой не должен мешать навигации или содержанию.

## Languages

**RU / EN / JP** без перезагрузки страницы. Выбранный язык сохраняется в `localStorage`. Проекты, роли, вклад и popup-кейсы используют единый локализованный data model.

## Project cards

Каждая карточка показывает:

- изображение и cinematic frame;
- тип проекта;
- технологии;
- краткое описание;
- **реальную зону ответственности разработчика**.

По клику открывается popup с крупной фотографией, ролью, стеком, описанием вклада, схемой `UI → API → DATA → SHIP` и ссылкой на репозиторий.

## Stack

HTML5 · CSS3 · Vanilla JavaScript · responsive design · GitHub Actions · GitHub Pages

## Structure

```text
portfolio/
├── index.html
├── app.js
├── app.css
├── responsive.css
├── favicon.svg
├── assets/
│   ├── icons/
│   ├── stickers/
│   ├── markers/
│   └── README.md
├── README.md
└── CODE_REVIEW.md
```

## Visual assets

SVG assets are stored locally for reusable icons and markers. Photography is currently loaded from remote image URLs to keep the static repository lightweight; production optimization should migrate licensed images to WebP/AVIF in `assets/photos/`.

## Interactions

- RU / EN / JP switcher;
- project filtering;
- image-led project popup;
- light / dark theme;
- `MAKE IT WEIRD` controlled chaos mode;
- responsive fullscreen mobile navigation;
- scroll progress;
- cinematic marquee;
- decorative stickers and markers;
- keyboard Escape for menu/modal;
- reduced-motion support.

## Run locally

```bash
python -m http.server 4173
```

Open `http://localhost:4173/portfolio/`.

## Deploy

`.github/workflows/portfolio-pages.yml` publishes `portfolio/` through GitHub Pages after changes reach `main`.

## Live site

`https://nestlir.github.io/nestlir/#projects`

## Design principle

**Character without noise. Engineering without the black box.**

Сайт должен одновременно демонстрировать визуальный вкус, product thinking и способность довести систему от интерфейса до production.

<!-- pages-trigger: 2295c09c2576016c3e89ab97f36e47d91567b980 -->
