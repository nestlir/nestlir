# NOMAD v2

Modular vanilla implementation of the Quiet Kyoto experience.

## Architecture

```text
app → pages → features → entities → shared
```

- `app/` — application entry HTML.
- `pages/` — page composition.
- `features/` — user-facing interactions.
- `entities/` — domain models and invariants.
- `shared/` — persistence and state infrastructure.
- `tests/` — runtime and domain smoke checks.

## Local run

Because the implementation uses native ES modules, serve this directory over HTTP rather than opening HTML directly from `file://`.

```bash
cd nomad-quiet-kyoto/v2
python3 -m http.server 4173
```

Open `http://localhost:4173/app/`.

## Runtime import check

From this directory:

```bash
node tests/runtime-check.mjs
```

The check imports every critical v2 module and fails fast on broken relative imports or module evaluation errors.

## Refactoring rule

`v2` is the canonical refactoring target. Legacy prototype pages remain untouched until regression coverage proves that functionality can be removed safely.
