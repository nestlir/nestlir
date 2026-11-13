# Accessibility, SEO and Performance

## Accessibility
- Semantic main, nav, article / section landmarks.
- Skip-to-content / skip-to-magazine link.
- Every icon-only control has an accessible name.
- Reader announces current page politely.
- Focus indicator visible on all interactive elements.
- Keyboard controls do not trap focus.
- Page navigation works without drag or swipe.
- Text contrast targets WCAG AA.
- Decorative SVGs are hidden from assistive technology; informative artwork has descriptive alt text.
- Reduced motion is respected.
- Mobile text remains readable without zoom.

## SEO and social
- Unique title and description.
- Canonical URL and Open Graph title / description / image.
- Theme color and touch icon.
- Semantic text remains in HTML rather than being baked into images.
- Project repositories are crawlable links.

## Performance
- One hero illustration loads eagerly; project artwork loads lazily.
- SVG decoration is inline or local and compact.
- Images use explicit width / height or aspect ratio.
- Avoid remote font dependency; use a curated system serif / sans / mono fallback stack.
- Do not preload every page asset.
- Keep JS dependency-free unless the repository requires a dependency for page-turn behavior.

## Browser checks
Test desktop Chromium / Firefox / Safari and mobile Safari / Chrome layouts, including narrow 360px screens, reduced motion and keyboard-only operation.