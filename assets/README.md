# Visual assets

This directory is reserved for portfolio-owned visual assets.

## Structure

- `stickers/` — decorative stickers and badges
- `icons/` — interface and technology icons
- `photos/` — project and editorial photography
- `markers/` — frame labels, stamps and visual punctuation

External project imagery currently uses remote URLs so the GitHub Pages build stays lightweight. When final licensed images are selected, place optimized WebP/AVIF files in the corresponding folders and update the project data in `script.js`.

## Rules

- Prefer SVG for icons and stickers.
- Prefer WebP/AVIF for photographs.
- Keep decorative assets separate from content assets.
- Add meaningful `alt` text to informative images; mark purely decorative assets `aria-hidden="true"`.
- Do not use visual elements as substitutes for project information or navigation.
