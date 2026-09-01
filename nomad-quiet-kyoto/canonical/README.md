# NOMAD — Canonical application

This is the single active implementation of NOMAD / Quiet Kyoto.

## Run

From this directory:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

## Architecture

```text
app/
  application.js        composition root
entities/
  place/                place domain data and selectors
  food/                 food domain data and selectors
  trip/                 trip state and domain mutations
features/
  archive/              archive interactions
  place-detail/         place drawer/details
  map/                  map selection
  food-explorer/        food selection
  itinerary/            My Trip interactions
shared/
  lib/                  pure utilities
  storage/              persistence adapter
  ui/                   reusable DOM primitives
styles/                 global tokens and page styles

index.html              public entrypoint
main.js                 application bootstrap
```

## Rules

- `entities` never depend on `features`, `widgets`, or `app`.
- `features` depend only on `entities` and `shared`.
- `shared` never imports upward.
- UI modules do not access `localStorage` directly.
- Domain modules do not manipulate the DOM.
- `main.js` is the composition root.
