# Magazine Wireframes

These wireframes describe the actual static HTML structure implemented in `index.html`. They are intentionally content-first; colors, typography and illustrations are applied by the magazine design system.

## Desktop cover (one full-screen opening spread)
```text
┌────────────────────────────────────────────────────────────────────┐
│ NESTLIR / ISSUE 01           COVER   STACK   WORK   CONTACT   RU EN │
├────────────────────────────────┬───────────────────────────────────┤
│                                │ ISSUE / EDITION                    │
│                                │                                   │
│       CHARACTER ART            │  Editorial headline                │
│       (full-height crop)       │  Role / positioning                 │
│                                │  Short introduction                 │
│                                │                                   │
│                                │  Role / focus metadata              │
│                                │  Continue reading                   │
├────────────────────────────────┴───────────────────────────────────┤
│ PROGRESS                                PAGE COUNTER    PRINT / PDF │
└────────────────────────────────────────────────────────────────────┘
```

## Desktop content spread
```text
┌────────────────────────────────┬───────────────────────────────────┐
│ PAGE LABEL / ISSUE             │ PAGE LABEL / ISSUE                 │
│                                │                                   │
│ Display heading                │ Display heading                    │
│ Contents / project context     │ Stack / illustration / proof       │
│ Editorial body copy            │ Diagram / tags / repository link   │
│ Callout / attribution note     │ Caption / folio                    │
│                                │                                   │
│ 02                 NESTLIR      │ 03                 NESTLIR         │
└────────────────────────────────┴───────────────────────────────────┘
```

## Mobile page
```text
┌──────────────────────────────┐
│ NESTLIR         RU EN   MENU │
├──────────────────────────────┤
│ PAGE LABEL             ISSUE │
│                              │
│ Display heading              │
│ Short description            │
│ Main illustration / content  │
│ Details / links / tags       │
│                              │
│ FOLIO                        │
├──────────────────────────────┤
│ PROGRESS       03 / 08       │
└──────────────────────────────┘
```

## Interaction map
- Header section links and the contents list call the same page-navigation function.
- Desktop targets normalize to the first page of a two-page spread (2, 4, 6).
- Mobile targets open the exact requested page (1–8).
- Previous / next controls, progress segments, keyboard arrows and pointer swipes use the same state.
- The page hash is updated so a direct link can open a particular section.
- Print mode expands the hidden pages into a paginated document and suppresses reader-only controls.