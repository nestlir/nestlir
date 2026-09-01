# NOMAD architecture

## Target architecture

The project is currently a browser-native prototype. The canonical runtime is intentionally kept self-contained while the domain boundaries are established for the future Next.js migration.

```text
canonical runtime
├── UI shell
├── feature interactions
├── domain data
└── persistence adapter
```

## Dependency direction

```text
UI → application/domain → persistence
```

The inverse direction is forbidden. UI must not implement storage rules, and persistence must not know about DOM elements.

## State

Only one canonical trip state is used by the active prototype. Place and food selections are persisted together. Future Next.js migration should move server data to TanStack Query and keep Zustand restricted to UI-only state.

## Migration path

```text
v3 canonical vanilla prototype
        ↓
TypeScript domain modules
        ↓
Next.js App Router
        ↓
FSD: app / pages / widgets / features / entities / shared
```

## Performance principles

- Keep hero media optimized and avoid eager loading below the fold.
- Prefer normal document flow for layout; use absolute positioning only for decorative overlays and map pins.
- Avoid rerendering the entire page for local interactions in the future React implementation.
- Load expensive interactive modules lazily when they become real application features.
