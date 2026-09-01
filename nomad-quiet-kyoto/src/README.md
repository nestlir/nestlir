# NOMAD typed core

The `src/` directory is the migration boundary between the original vanilla DOM application and the future Next.js/TypeScript implementation.

## Rules

- `domain.ts` contains data contracts only.
- `repository.ts` owns persistence-safe access to static entities and trip storage.
- `trip-summary.ts` contains pure derived-state calculations.
- `trip-store.ts` exposes a small stateful application API to UI adapters.
- UI code must not know the `localStorage` key or mutate persisted JSON directly.

The browser UI can progressively migrate to this layer without changing the visual design or the user-facing behavior.