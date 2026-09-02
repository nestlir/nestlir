# MOMOHA — Sakura Street Food

Production-like static frontend + lightweight Node API.

## Screen map

`Hero → Menu → Kitchen → News → Visit → Footer`

Primary task flow: `Menu → Quick Order → Cart → Contact → POST /api/orders → Confirmation`.

## UX audit

| Criterion | Status | Main finding |
|---|---|---|
| Usability | 🟢 | Clear primary CTA, card-level add actions, multi-item cart and checkout flow |
| Accessibility / WCAG 2.2 | 🟡 | Skip link, semantic landmarks, labels, focus states, reduced motion and 44px controls; automated axe/manual audit should still be run before a formal conformance claim |
| Visual hierarchy | 🟢 | Strong display typography, high-contrast CTA and consistent section rhythm |
| Consistency | 🟢 | Shared pink/blush/ink tokens, common radii and interaction states |
| Responsiveness | 🟢 | Desktop/tablet/mobile grids and compact checkout layout |
| Brand | 🟢 | Sakura pink, Japanese accents, supplied artwork and playful editorial composition |

WCAG 2.2 is the current W3C recommendation; this project targets the practical AA baseline rather than claiming formal conformance without manual review.

## Local

Frontend: `python -m http.server 4173` then open `/suwenku/`.

API: `npm start` inside `suwenku/` (default `http://localhost:8787`).

The static frontend uses `/api` by default. For a separately hosted API, define `window.MOMOHA_API_URL` before `app.js`.

## API

- `GET /api/health`
- `GET /api/menu`
- `GET /api/orders` — internal/admin use only; protect with auth before public deployment
- `POST /api/orders`

Orders are persisted to `api/data/orders.json`, written atomically and capped at 500 records.

## Deployment

The frontend is published by the repository Pages workflow. The API is containerized with `Dockerfile` and can be deployed using the included `render.yaml` blueprint. Set `CORS_ORIGIN` to the exact frontend origin in production.

The API is intentionally lightweight and has no database. For a real restaurant, replace the JSON store with PostgreSQL/managed storage and add authentication, order status management, email/SMS notifications and payment integration.

## CI

`.github/workflows/suwenku-ci.yml` runs Node unit/integration tests, an API smoke/e2e flow, and static frontend contract checks on pushes/PRs affecting `suwenku`.
