# Anastasia — Frontend Portfolio

Вторая версия личного портфолио: более яркая и визуальная, с акцентом на frontend, UX/UI, product thinking и editorial design.

## Concept

**Dopamine landing · editorial typography · sweet chaos · cinematic details.**

Визуальная система использует много воздуха, candy-palette, фотографии, стикеры, frame-маркеры, doodle-линии, паттерны и pop-culture настроение.

## Information architecture

1. Hero — Frontend positioning.
2. Selected Work — image-led project cards.
3. Skill Tree — Frontend / UX / API / Quality.
4. Contact — прямой CTA и переход в Full-stack edition.

## Project popup

Каждая карточка открывает popup с:

- большой фотографией;
- frame marker;
- названием проекта;
- ролью и зоной ответственности;
- стеком;
- кратким engineering summary;
- системной схемой UI → API → DATA → SHIP;
- ссылкой на исходный репозиторий.

## Editions

- **Frontend edition:** `/portfolio/frontend/`
- **Full-stack edition:** `/portfolio/`

Переключение доступно в верхнем меню и в CTA.

## Stack

HTML5 · CSS3 · Vanilla JavaScript · Responsive CSS · GitHub Pages

## Run locally

```bash
python -m http.server 4173
```

Откройте `http://localhost:4173/portfolio/frontend/`.

## Visual assets

Файлы относятся к frontend-версии и не изменяют общую архитектуру full-stack портфолио. При финальной production-подготовке фотографии рекомендуется заменить на локальные лицензированные WebP/AVIF assets.
