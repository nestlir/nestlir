# Grid and Responsive System

## Desktop
- Reader fills `100vw × 100dvh`.
- Header and navigation occupy a compact overlay band.
- Book uses a bounded aspect ratio and scales to available width and height; no large empty surround.
- Two pages share a single spread container with a subtle paper gutter.
- Each page has 6 internal editorial columns; outside margins are generous.
- Content max width follows the page area rather than viewport width.

## Tablet (<= 980px)
- Reduce paper outer margin and page padding.
- Preserve two-page spread while each page remains readable.
- When either page becomes too narrow for body copy, switch to one page per view.

## Mobile (<= 700px)
- One page visible at a time.
- Reader uses safe-area insets and `100dvh` with `100svh` fallback.
- Four-column internal grid; 18–22px side margins.
- Navigation and folio controls stay within thumb reach.
- All content reflows; no scaled-down desktop spread and no horizontal scrolling.

## Typography scale
- Cover masthead: clamp(3.3rem, 11vw, 10rem).
- Display heading: clamp(2.1rem, 4vw, 4rem).
- Section heading: clamp(1.5rem, 2.4vw, 2.4rem).
- Body: 15–17px desktop, minimum 15px mobile.
- Metadata: 10–12px with ample letter spacing; never use tiny text for essential instructions.

## Spacing
Base rhythm: 4px; working steps: 8, 12, 16, 24, 32, 48, 64. Use larger editorial whitespace selectively, with consistent alignments across pages.