# Portfolio redesign notes

## Scope

The portfolio is a single RU/EN experience under the Illustrated Digital Atlas direction. The former frontend route redirects to the unified catalog.

## Design and behavior

- Warm cartographic palette, editorial serif headlines, restrained field labels, original local SVG map art and a monogram favicon.
- Responsive project archive with working filters for team, AI-assisted and educational origins.
- Theme and language controls; menu, filters and state communicate via ARIA.
- Safe storage fallbacks, external links use `noopener noreferrer`, and dynamic project text uses `textContent`.
- Reduced-motion support, skip navigation and a live project count.
- No remote project photography or font runtime dependency.

## Content accuracy

- DataVac is presented as team work with a limited contribution in its vaccination frontend module.
- Furniture Store is marked AI-assisted and described as directed through a brief.
- Confirmed educational assignments remain clearly labeled.
- Story OS and Multimodal AI are omitted from the public portfolio because personal contributions were not confirmed.

## Release checks

`smoke-test.mjs` checks the unified page structure, project filters, safe rendering, storage fallbacks, ARIA state and legacy redirect. The site still needs a visual browser pass at mobile and desktop widths before public release.
