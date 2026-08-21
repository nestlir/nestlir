# Portfolio Code Review

## Scope

Review of the static portfolio in `portfolio/`: HTML structure, visual system, project cards and modal, RU/EN/JP localization, theme switching, mobile navigation, interaction code and responsive behavior.

## Findings and actions

### High priority — fixed

- **Hero CTA localization:** the CTA is rendered through `data-i18n-html`, so the arrow is a real `<span>` instead of escaped markup. This prevents `<span>↗</span>` from appearing as text.
- **Project presentation:** cards retain the image-led editorial layout and open a dedicated project modal with image, stack, localized description and repository CTA.
- **Mobile navigation:** the menu has an explicit open state, overlay stacking context, close control, anchor handling and scroll locking.
- **Theme/filter contrast:** filter controls have explicit light/dark colors instead of relying on inherited text color.
- **End-card layering:** `THANK YOU FOR WATCHING` is kept below the contact actions so it cannot intercept or visually cover the links.

### Medium priority — improved

- Added visible focus states for keyboard users.
- Disabled the custom cursor on coarse/touch pointers.
- Added reduced-motion handling for users who request it.
- Added editorial frame markers, project badges, image overlays and a visual `PROJECT / VIEW` label without changing the project data model.
- Kept decorative stickers and visual objects pointer-transparent so they do not block interaction.

## Architecture notes

The project is intentionally framework-free: HTML provides the document structure, CSS owns the visual system, and `script.js` owns project data, localization, filtering, modal behavior and interactions.

The current codebase contains compatibility layers (`fixes.css`, `overrides.css`, `repair.js`) created during visual iteration. They are useful for a static portfolio, but a future cleanup should consolidate these layers into the primary stylesheet and remove duplicate selectors once the design is frozen.

## Localization review

Supported locales: **RU / EN / JP**. Locale state is persisted in `localStorage`. Project descriptions and modal content are localized from the same project data object, which avoids duplicating card markup for each language.

Recommended next step: move all remaining hard-coded UI strings (for example some decorative labels and accessibility labels) into the translation dictionary if complete localization is required.

## Project popup review

The popup is a good portfolio pattern because it keeps the grid compact while providing a richer case-study surface on demand. It should remain image-first and include:

1. project image;
2. project number/frame marker;
3. title;
4. technology tags;
5. concise engineering/product contribution;
6. repository CTA;
7. keyboard Escape and backdrop close.

## Remaining technical debt

- `script.js` is large for a static page because translations and project data are embedded in one file.
- Some visual CSS is duplicated between `styles.css`, `overrides.css` and `fixes.css`.
- External Unsplash images are runtime dependencies; for a production portfolio, optimized local/WebP assets would make the site more reliable and faster.
- A lightweight automated check for broken internal anchors and external project URLs would be useful before deployment.

## Verdict

**Portfolio-ready with minor technical debt.** The visual direction is intentionally expressive, while the core interaction model remains understandable: browse → filter → open project → inspect → visit repository. The main remaining improvement is consolidation rather than adding more layers of code.
