# Anastasia — Interactive Portfolio

**Dopamine landing / frontend portfolio / visual playground**

Интерактивный персональный сайт-портфолио, собранный как небольшой digital-experience, а не как стандартное резюме.

## Visual concept

**Много воздуха + сладкий хаос + editorial typography + cinematic pacing.**

Визуальный язык смешивает pastel-среду, кремовые поверхности, candy-акценты, японские графические мотивы, doodles, мемный микрокопирайтинг, anime/pop-culture настроение, фотографии, стикеры и кинематографичные frame-маркеры.

## Languages

Переключатель **RU / EN / JP** работает без перезагрузки страницы и сохраняет выбранный язык в `localStorage`.

## Interactions

- project filtering: All / Frontend / Product / Full-stack / AI;
- project popup cards with project image, tags, description and repository CTA;
- light / dark theme;
- dark cinematic Hero-art palette;
- **MAKE IT WEIRD** controlled chaos mode;
- cursor glow + visible cursor dot on dark backgrounds;
- magnetic CTA buttons;
- 3D tilt interaction on skill cards;
- animated marquee;
- floating stickers and cultural references;
- orbiting visual elements;
- scroll progress indicator;
- responsive mobile menu with section switching;
- keyboard Escape support for modals;
- SVG favicon.

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

`.github/workflows/portfolio-pages.yml` автоматически собирает содержимое `portfolio/` и публикует его через GitHub Pages после push в `main`.

## Contact links

GitHub now points to the public profile: `https://github.com/nestlir`.

The Telegram destination is intentionally kept as a single configurable link in `index.html` until the exact public handle is confirmed; no guessed Telegram account is introduced.

## Structure

```text
portfolio/
├── index.html
├── styles.css
├── script.js
├── favicon.svg
└── README.md
```

## Design principle

**Character without noise.**

Сайт может быть странным, ярким и запоминающимся, но пользователь всегда должен понимать, где он находится, что можно сделать и зачем ему нажимать дальше.
