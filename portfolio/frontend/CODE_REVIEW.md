# Portfolio Code Review — dual-page refactor

## Executive result

The portfolio is intentionally split into two independent pages inside one GitHub Pages project:

- `/` — Full-stack / engineering portfolio;
- `/frontend/` — original Frontend / visual portfolio.

The previous implementation mixed these responsibilities by loading `frontend.css` and `frontend.js` into the Full-stack page and by adding a Frontend section to a page that was supposed to be a separate experience. That is now removed.

## Problems found

### 1. Wrong information architecture

The Full-stack page contained a `#frontend` section and the Frontend assets were injected into the Full-stack document. This made the two concepts compete for the same page and defeated the intended dual-portfolio structure.

**Fix:** Frontend is now a real `/frontend/` page. The Full-stack page has only a navigation link to it.

### 2. Duplicate Frontend implementations

The repository contained both `portfolio/colorful/` and `portfolio/frontend/`, with two different colorful implementations. This created ambiguity over which version was canonical.

**Fix:** the original `colorful` implementation is restored as the canonical `portfolio/frontend/` edition. The duplicate implementation is removed.

### 3. Fragile page switching

The previous Full-stack header pointed to `#frontend`, while the desired behavior is a page-to-page transition.

**Fix:**

- Full-stack → `./frontend/`
- Frontend → `../`

These relative URLs work under the repository's GitHub Pages path as well as in local static hosting.

### 4. Unnecessary CSS/JS coupling

The Full-stack page previously loaded a Frontend stylesheet and script even when the Frontend section was being rendered inside the page.

**Fix:** each page owns its own CSS and JavaScript. The Full-stack page loads `app.css`, `responsive.css` and `app.js`; the Frontend page loads only its own `frontend.css` and `frontend.js`.

### 5. Deployment structure

The GitHub Pages workflow was carrying a special-case copy operation for the old `colorful/` route.

**Fix:** the workflow now publishes the entire `portfolio/` directory as-is. A folder is a page; no route-specific copying is needed.

## Full-stack architecture retained

The engineering edition keeps the established structure:

1. Hero — Full-stack positioning.
2. Stack — UI, frontend, backend, data, infrastructure and AI.
3. Selected Work — project cards with actual responsibility.
4. Case Studies — Understand → Build → Ship.
5. Engineering — API contracts, validation, state, auth, mapping, testing, Docker and deployment.
6. Experience — UI/API/product intersection.
7. Contact — direct CTA and GitHub.

Project data, RU/EN/JP localization, filters, modal case views, theme switching, chaos mode, mobile navigation and scroll progress remain in `app.js`.

## Frontend architecture restored

The Frontend edition preserves the original visual concept:

- `Digital products with a pulse.` hero;
- dopamine/candy palette;
- editorial serif typography;
- photography and film-frame markers;
- stickers and Japanese visual references;
- marquee;
- project filters;
- cinematic project modal;
- light/dark theme;
- RU/EN switch;
- playful but controlled motion.

## Accessibility and resilience

- semantic navigation;
- keyboard Escape support for modal;
- `aria-hidden` for decorative layers;
- responsive layouts;
- `prefers-reduced-motion` support;
- decorative elements do not capture pointer input;
- informative images have alt text.

## Remaining technical note

Project photography still uses remote Unsplash URLs. For a strict production launch, these should eventually be replaced with optimized local WebP/AVIF assets with confirmed licensing.

## Verdict

**Architecture corrected: two independent portfolio pages, one repository, one GitHub Pages deployment.**
