# NOMAD — Quiet Kyoto

NOMAD is a modular travel-experience application for Kyoto. The active runtime is a single client-side application with one entrypoint, one router and a separate backend API boundary.

## Active architecture

```text
nomad-quiet-kyoto/
├── index.html
├── package.json
├── playwright.config.js
│
├── app/                    # bootstrap, router, shell, route registry
├── pages/                  # route-level renderers
├── entities/               # Place, Food and Trip domain models
├── shared/
│   ├── api/                # HTTP client
│   ├── lib/                # pure calculations
│   └── storage/            # browser persistence adapter
├── styles/
│   ├── base.css            # tokens and global reset
│   ├── layout.css          # grids and geometry
│   ├── components.css      # reusable UI components
│   ├── nomad.css           # page composition and typography
│   └── responsive.css      # viewport overrides
│
├── backend/
│   ├── src/
│   │   ├── api/            # HTTP transport
│   │   ├── application/    # use cases
│   │   ├── domain/         # repository/domain contracts
│   │   └── infrastructure/ # repository implementations
│   └── test/
│
├── tests/
│   ├── unit/
│   └── e2e/
├── docs/
└── legacy/                 # historical prototypes, never imported by runtime
```

## Dependency direction

```text
pages
  ↓
app / application state
  ↓
entities + shared
  ↓
HTTP API client
  ↓
backend API
  ↓
application services
  ↓
repositories
```

The browser pages never call `localStorage` or backend internals directly.

## Routes

- `#home`
- `#explore`
- `#eat`
- `#trip`
- `#place/<place-id>`
- `#food/<food-id>`

Invalid routes safely fall back to Home. Invalid detail IDs render an explicit not-found state.

## Images

All active images use a stable media box with controlled `object-fit`. The application shell installs one fallback for failed image requests so a broken remote image does not collapse the layout.

## Local development

Terminal 1:

```bash
cd nomad-quiet-kyoto
npm run serve
```

Terminal 2:

```bash
cd nomad-quiet-kyoto/backend
npm start
```

Open:

```text
http://127.0.0.1:4173/
```

The frontend uses the local API at:

```text
http://127.0.0.1:8787/api
```

For static hosting where no API exists, the application keeps its offline local-storage fallback.

## QA

```bash
npm test
npm run test:backend
npm run e2e
npm run qa
```

The E2E suite starts both the frontend and backend and checks navigation, detail pages, add/remove flows, persistence, image geometry and mobile navigation.

## Architecture rules

1. One active frontend runtime.
2. No active imports from `legacy/`.
3. Geometry belongs in `layout.css`; reusable controls in `components.css`; page composition in `nomad.css`.
4. Pages do not access browser storage directly.
5. API transport is isolated in `shared/api/`.
6. Backend HTTP routes do not contain domain rules.
7. Backend application services return structured success/error results.
