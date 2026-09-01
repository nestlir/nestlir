# ADR-001: Single Canonical Runtime

**Status:** Accepted

## Context

The project previously accumulated independent HTML pages and flat JavaScript/CSS files. That made routing, state and styling diverge between pages.

## Decision

NOMAD uses one active browser entrypoint:

```text
index.html
  ↓
app/main.js
  ↓
application + shell + router
  ↓
route pages
```

Historical standalone implementations remain in `legacy/` and must never be imported by active runtime code.

## Consequences

- Navigation has one routing contract.
- Shared trip state has one owner.
- Image fallback and lifecycle cleanup can be handled at the shell boundary.
- CSS can be separated by responsibility instead of copied page by page.
