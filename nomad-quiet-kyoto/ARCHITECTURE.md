# NOMAD — Architecture

## Canonical runtime

The active implementation lives in `src/`. Historical experiments are kept under `legacy/` and must not be imported by production code.

## Dependency direction

```text
app → widgets → features → entities → shared
```

- `app`: composition, routing, global providers.
- `widgets`: large page sections and shells.
- `features`: user scenarios and interactions.
- `entities`: domain models and domain rules.
- `shared`: UI primitives, storage adapters, pure utilities, configuration.

Reverse imports are forbidden. A feature never imports another feature. Entities never import UI. Shared never imports upper layers.

## Routing

The vanilla implementation uses a single application entrypoint and client-side route state. The target Next.js implementation will map these routes to App Router segments without changing domain contracts.

## State

Server data belongs in a data/query layer in the Next.js version. Zustand is reserved for UI state. Local trip state in the vanilla prototype is an adapter concern and must not leak into domain entities.
