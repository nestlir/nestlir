# NOMAD — Quiet Kyoto

NOMAD is a quiet luxury / editorial travel experience for Kyoto. The project is intentionally built as a modular frontend prototype with a clear path to a future Next.js + TypeScript implementation.

## Canonical frontend

The only active implementation is:

```text
nomad-quiet-kyoto/
├── index.html
├── app/
├── pages/
├── features/
├── entities/
├── widgets/
├── shared/
├── assets/
├── styles/
├── tests/
└── docs/
```

Historical experiments are preserved under `legacy/` and are not application entrypoints.

## Run locally

```bash
cd nomad-quiet-kyoto
python3 -m http.server 4173
```

Open:

`http://localhost:4173/`

Do not open old `v1`, `v2`, or `v3` files directly for active development.

## Product flow

```text
Home
  → Archive
  → Place detail
  → Explore
  → Eat
  → My Trip
```

All trip state is managed by one application store and one persistence key. UI modules do not own persistence or business calculations.

## Architecture rules

1. `app` composes the application and owns routing/bootstrap only.
2. `pages` compose screens and coordinate features/widgets.
3. `features` implement user actions and scenarios.
4. `entities` contain domain data and pure business rules.
5. `widgets` contain reusable large UI blocks.
6. `shared` contains infrastructure, utilities, storage, and reusable UI primitives.
7. Dependencies must point inward/downward; no circular dependencies.
8. No page or widget may create its own trip store or storage key.
9. Legacy code is preserved for reference and regression comparison only.
