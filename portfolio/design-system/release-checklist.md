# Release Checklist — Issue 01

Legend: **Implemented** means present in source; **Partial** means a working fallback exists but a production service or final export is not configured; **Manual QA** means it needs a real browser/device pass before public release.

## 1. Visual identity
- [x] Favicon SVG and browser icon
- [~] App / Apple touch icon — SVG supplied; PNG-specific iOS validation remains
- [x] Art direction and moodboard-equivalent art direction brief
- [x] Typography system and CSS tokens
- [x] Color system and CSS tokens
- [x] Illustration style guide and character identity sheet
- [x] Character reference and approved cover artwork
- [x] Illustration library with project vignettes and cover art
- [x] Graphic assets: paper grain, botanical ornament, monogram and outline icons

## 2. Design system
- [x] UI Kit specification
- [x] Design tokens
- [x] Reusable page / button / label / tag / navigation classes
- [x] Component interaction states and visible focus treatment
- [x] Grid system for spread and mobile layouts
- [x] Spacing scale
- [x] Icon set
- [x] Guidelines and provenance notes

## 3. Magazine system
- [x] Editorial cover
- [x] Eight-page storyboard
- [x] Page templates
- [x] Desktop two-page spreads
- [x] Magazine layout system
- [x] Page folios
- [x] Interactive contents
- [x] Content hierarchy

## 4. UX and interaction
- [x] Content-first page structure / wireframes
- [x] Interactive reader prototype
- [x] Section navigation
- [x] Previous / next page interaction
- [x] Keyboard and pointer / touch navigation
- [x] Progress indicator and page counter
- [x] Restrained motion with reduced-motion handling
- [x] Hover, focus, active, disabled, validation and status states

## 5. Mockups and states
- [x] Fullscreen desktop composition
- [x] Tablet layout rules
- [x] Mobile single-page reader
- [x] All eight page compositions
- [x] Project case templates for DataVac and Furniture Store
- [x] 404 page
- [x] Contact form validation and status feedback

## 6. Technical delivery
- [x] Responsive specification
- [x] Accessibility specification and semantic controls
- [x] SEO description and Open Graph metadata
- [x] Lazy loading for secondary illustrations; no remote font runtime dependency
- [~] Contact integration — validated mailto draft, no backend form service
- [ ] Analytics — intentionally not enabled until a provider and consent approach are selected
- [ ] Cross-browser manual verification
- [x] Print stylesheet / browser Save as PDF

## 7. Quality assurance
- [x] Static smoke-test covers structure, content attribution and key interactions
- [ ] Visual QA in real desktop and mobile browsers
- [ ] Responsive QA on physical devices
- [ ] Interaction QA with keyboard, mouse and touch
- [ ] Accessibility audit with assistive technology
- [ ] Performance audit with real network / Lighthouse data
- [x] Content verification against the repository's existing project attribution

## Before public release
1. Replace any remaining placeholder or sample details with final wording confirmed by the owner.
2. Run `node portfolio/smoke-test.mjs` from repository root (CI does this on the portfolio Pages workflow).
3. Test at 1440px, 1024px, 768px, 390px and 360px.
4. Review the portrait crop and confirm the external cover-art CDN asset remains available.
5. Decide whether a backend form and analytics provider are wanted.