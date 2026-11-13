# Interaction and Motion

## Reader controls
- Previous / next page buttons.
- Left / right arrow keyboard support.
- Home / End to cover / final page.
- Pointer and touch swipe with minimum gesture distance.
- Table of contents jumps to a section.
- Page counter and eight-segment progress state.
- Browser hash reflects the current page so deep links and Back remain useful.
- Reader can be navigated without animation.

## Motion language
Page transition: short 260–360ms ease-out; restrained horizontal or page-turn movement. Avoid 3D flip effects that reduce legibility or cause motion sickness. Buttons use 120–180ms color/outline transitions. No endless auto-playing carousel.

## Reduced motion
Respect `prefers-reduced-motion: reduce`: switch off page-turn movement, ticker / parallax and decorative animation. Maintain instant state change and all content.

## Touch / pointer
Ignore swipe when the gesture starts on a link, button, input or scrollable text panel. Use touch-action intentionally and retain visible previous / next controls.

## Print / PDF
A print stylesheet expands all eight pages into a sequence of paper pages, hides interactive reader controls and preserves links and page numbers. Browser Save as PDF is the first supported export target.