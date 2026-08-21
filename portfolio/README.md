# Anastasia — Interactive Portfolio

Интерактивный персональный сайт-портфолио frontend developer.

## Концепция

Визуальный язык сочетает editorial web design, японские графические мотивы, мягкую pastel-палитру, сетку, ботанические элементы и типографику. Вместо буквального повторения референсов дизайн использует их настроение как основу для собственной системы.

## Что внутри

- responsive single-page portfolio;
- hero section с CTA;
- selected projects;
- фильтрация проектов по направлениям;
- интерактивные project modal cards;
- dark/light theme toggle;
- skills и engineering approach;
- experience timeline;
- contact section;
- accessibility-friendly semantic HTML;
- отсутствие внешнего JS framework — сайт максимально лёгкий.

## Selected work

DataVac · Furniture Store · Story OS · Multimodal AI · Stellar Burger · Web Larek · Mesto · Blog Customizer · Оно тебе надо.

## Стек

HTML5 · CSS3 · Vanilla JavaScript · responsive design · GitHub Pages

## Локальный запуск

Откройте `index.html` или запустите любой статический HTTP server из папки `portfolio`.

```bash
python -m http.server 4173
```

Затем откройте `http://localhost:4173`.

## Структура

```text
portfolio/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Примечание

Сайт намеренно не зависит от backend: данные проектов хранятся в `script.js`, а ссылки ведут на реальные GitHub-репозитории. Это делает портфолио пригодным для GitHub Pages и не раскрывает секреты.
