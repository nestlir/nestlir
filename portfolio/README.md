# Anastasia — Interactive Portfolio

**Dopamine landing / frontend portfolio / visual playground**

Интерактивный персональный сайт-портфолио, собранный как небольшой digital-experience, а не как стандартное резюме на странице.

## Visual concept

**Много воздуха + сладкий хаос + editorial typography + cinematic pacing.**

Визуальный язык смешивает pastel-среду, кремовые поверхности, яркие candy-акценты, японские графические мотивы, doodles, мемный микрокопирайтинг, pop-culture/anime настроение и «вкусные» визуальные метафоры.

При этом декоративность подчинена продуктовой логике: контент остаётся читаемым, навигация — понятной, а интерактивность — функциональной.

## Interactions

- project filtering: All / Frontend / Product / Full-stack / AI;
- animated project modal cards;
- light / dark theme;
- **MAKE IT WEIRD** chaos mode;
- cursor glow;
- magnetic CTA buttons;
- 3D tilt interaction on skill cards;
- animated marquee;
- floating stickers;
- orbiting visual elements;
- scroll progress indicator;
- responsive mobile composition;
- keyboard Escape support for modals.

## Selected work

DataVac · Furniture Store · Story OS · Multimodal AI · Stellar Burger · Web Larek · Mesto · Blog Customizer · Оно тебе надо.

## Stack

HTML5 · CSS3 · Vanilla JavaScript · responsive design · GitHub Actions · GitHub Pages

## Run locally

```bash
python -m http.server 4173
```

Откройте `http://localhost:4173/portfolio/`.

## Deploy

`.github/workflows/portfolio-pages.yml` автоматически собирает содержимое `portfolio/` и публикует его через GitHub Pages после изменений в этой папке.

## Structure

```text
portfolio/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Design principle

**Character without noise.**

Сайт может быть странным, ярким и запоминающимся, но пользователь всегда должен понимать, где он находится, что можно сделать и зачем ему нажимать дальше.
