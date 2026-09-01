# NOMAD — Quiet Kyoto

NOMAD is a travel-experience frontend concept for Kyoto, built as a small modular application rather than a collection of independent HTML pages.

## Active frontend

The active application lives under `src/`. There is one entrypoint and one application state boundary.

```text
nomad-quiet-kyoto/
├── index.html              # only frontend entrypoint
├── package.json
├── playwright.config.js
├── src/
│   ├── app/                # bootstrap, router, application shell
│   ├── pages/              # route-level screens
│   ├── widgets/            # large reusable UI blocks
│   ├── features/           # user scenarios
│   ├── entities/           # domain models/data
│   ├── shared/             # storage, pure helpers, shared UI
│   └── styles/             # presentation layer
├── tests/
│   ├── unit/
│   └── e2e/
├── docs/
└── legacy/                 # preserved historical standalone prototypes
```

## Routing

The application uses one client-side hash router. Supported routes:

- `#home`
- `#explore`
- `#eat`
- `#trip`
- `#place/<place-id>`
- `#food/<food-id>`

There are no separate active `map.html`, `food.html`, `place.html` or `trip.html` entrypoints.

## State

Trip state is owned by the application layer and persisted through one storage adapter. Pages, widgets and features must not access `localStorage` directly.

## Development

```bash
cd nomad-quiet-kyoto
python3 -m http.server 4173
```

Open `http://localhost:4173/nomad-quiet-kyoto/`.

## QA

```bash
npm test
npm run e2e
npm run qa
```

## Architecture rules

1. `app` composes the system; it does not contain business rules.
2. `pages` compose features/widgets for a route.
3. `features` implement user scenarios.
4. `entities` own domain data and domain operations.
5. `shared` is reusable and must not import from pages/features/widgets.
6. No active code imports from `legacy/`.
7. One canonical runtime only.
