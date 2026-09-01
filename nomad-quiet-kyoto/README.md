# NOMAD — Quiet Kyoto

Canonical frontend prototype for the NOMAD travel product concept.

## Structure

```text
nomad-quiet-kyoto/
├── README.md
├── v3/                 # current canonical runtime
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── legacy/             # historical iterations; do not use for active development
│   ├── v1/
│   └── v2/
└── docs/
    └── architecture.md
```

## Canonical version

Use `v3/` for active development and visual QA. Older iterations are preserved under `legacy/` and are not entrypoints.

## Run locally

```bash
cd nomad-quiet-kyoto/v3
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

## Product flow

Home → Archive → Place detail → Explore → Eat → My Trip.

All interactive state in the canonical prototype is kept in one localStorage record: `nomad-v3-trip`.

## Refactoring rules

1. One canonical runtime only.
2. No feature may create its own trip state or storage key.
3. UI modules must not own persistence logic.
4. New features must consume the shared domain/data contract.
5. Keep legacy iterations untouched unless a migration explicitly requires changes.
