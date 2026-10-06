# Harkness dashboard scroll guide

Implemented locally on October 3, 2026, following Kwaku's request to demonstrate the squirrel pointing at the inner dashboard scroll immediately on entry.

The three homepage Building Dashboard examples retain their real iframe content and building headings. A persistent scrollbar controls the existing parent scroll viewport. Flash uses the original supplied SVG illustration in a separate layout column (a separate row on phone widths). His arm aims at the actual thumb and gestures once. The automatic cue says “Scroll here to explore” on each dashboard scene entry and remains until the visitor scrolls inside the dashboard. After one brief arm gesture, Flash stays still. Reduced motion skips the arm gesture and fade. There is no replay button or duplicate scrolling instruction below the dashboard, following Kwaku's correction.

The six-second lifetime completion caused Kwaku to miss the cue, and returning to the dashboard could not show it again. The revised lifecycle removes the expiry: actual inner scrolling dismisses the cue for that visit, and leaving the scene rearms it for the next entry. Temporary iframe fitting, document visibility and geometry updates must not consume the introduction or restart its gesture.

The scrollbar supports pointer dragging, track clicking, Arrow keys, Page keys, Home, End and Space. Wheel input on the rail uses the existing homepage gesture owner, retaining momentum within the dashboard and allowing a fresh gesture to leave at its boundary. Native scrolling remains available without JavaScript enhancement.

## Design evidence and patterns avoided

Consulted the W3C [slider interaction pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) for directional keyboard conventions and [Animation from Interactions guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) for restrained motion and motion preferences. The real control uses scrollbar semantics, a named controlled region and a synchronized percentage value.

Avoided a decorative fake scrollbar, an overlay covering live data, repeated looping mascot motion, focus theft on entry, and rebuilding the remote dashboard as a mockup. Preserved the accepted left-copy/right-media layout.

For the simplification, consulted [NN/G's minimalist design guidance](https://www.nngroup.com/articles/aesthetic-minimalist-design/) and the W3C motion source above. Avoided a second call to action just to reveal guidance, duplicate instructions and consuming the cue during a temporary startup layout.

## Verification

- Astro check: zero errors and warnings; seven existing hints. Final build at 01:37:52 generated 38 routes.
- Full unit suite: 220 passed. Site contracts: 11 passed. After the final replay-focus repair, all 34 focused geometry and navigation tests passed again.
- Chrome with the live Harkness dashboard: dragging moved the inner offset from 0 to 748.5 pixels without changing the outer page offset. Wheel input over the rail moved it from 0 to 389.5 pixels, again without moving the page. Home reset the dashboard to zero. Replay retained focus on the scrollbar.
- Desktop screenshot: `../../../output/oct2-refined-audit/screenshots/harkness-flash-scroll-desktop.png`.
- Phone-width screenshot: `../../../output/oct2-refined-audit/screenshots/harkness-flash-scroll-mobile.png`. Confirmed separate cue row, 44-pixel rail and no overlap with caption or controls. The in-app browser left the remote iframe blank, so this is layout evidence only; live-data proof is the Chrome desktop capture. Phone touch behavior is not independently verified.
- Independent visitor review accepted desktop clarity and phone cue placement. Its wheel-on-rail finding was repaired and covered by four navigation regression cases. Review: `../../../output/oct2-refined-audit/scroll-cue-review.md`.

Local changes only; no deployment or push.

## User correction verified at 01:42:32

Build: 38 routes; homepage SHA-256 `5787e8ff06a336d9d6d5c9f816d6ff4f4c237e35177833756dc1b594afd8d6dd`. Astro check had zero errors and warnings, seven existing hints. All 34 focused scrollbar and navigation tests passed.

Current screenshots supersede the earlier captures: `../../../output/oct2-refined-audit/screenshots/harkness-auto-cue-desktop.png` and `../../../output/oct2-refined-audit/screenshots/harkness-auto-cue-mobile.png`. Both show the automatic cue without clicking a hint button. Building identity remains above the preview. Desktop shows real Harkness data; phone remains layout-only evidence because of the in-app browser's blank remote iframe. The previous replay behavior and screenshot references in the initial verification record are historical, not current behavior.

## Missing cue correction (October 3, after 02:02)

Reproduced in the actual browser: first entry showed the cue; after six seconds it vanished; navigating to Engage and back to Educate left it absent. Correct the lifetime completion behavior while retaining the working native scrollbar and the absence of Show hint or gallery controls. Verification for this correction follows below.

Verified correction build at 02:05:45: 38 routes, homepage SHA-256 `0e43c87f1e1a2d9222d1f4ec06bab82cd3e248fc5fb0f981980b693d7c7b91f2`. Astro zero errors/warnings, seven existing hints; all 237 unit tests and 11 site contracts passed. The new production-controller tests cover persistent display, inner-scroll dismissal, scene re-entry, inactive scrolling, hidden tabs, fitting and reduced motion.

Chrome with real Harkness content confirmed the cue remains after the previous six-second timeout, ArrowDown on the actual scrollbar changes the inner offset from 0 to 40 and hides the cue, and navigating out to Engage then back to Educate shows it again. Home reset the inner offset before the return. Final browser inspection still showed cue opacity 1. Desktop evidence: `../../../output/oct2-refined-audit/screenshots/harkness-persistent-cue-desktop.png`; dismissal evidence: `harkness-cue-after-inner-scroll.png`; phone layout evidence: `harkness-persistent-cue-mobile.png`. Phone 390 by 844 uses a separate cue row without overlap; the remote iframe is blank in IAB, so Chrome supplies live-data evidence. Viewport reset after verification.
