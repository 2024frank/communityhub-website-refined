# Phone layout and section navigation

Updated October 3, 2026, for the local preview at `http://127.0.0.1:4390/`.

## Accepted behavior

- Keep complete source descriptions. Text precedes media on phones; desktop retains text left and media right.
- Keep section-by-section swipes. The phone uses the shared gesture controller, including momentum handling, reverse gestures, reading stops inside long sections, and product-boundary navigation. Continuous document scrolling was tried and removed following the user's clarification.
- Keep one global circular Next section button. It uses the shared controller and gets its own 76px phone surface, with content clearance at final reading stops. It hides for open navigation/overlays and at the end of the page.
- The category arrow explains the relationship between a chapter and its products. It points down toward the complete tab grid on phones; desktop retains its horizontal arrangement.

## Changes

`home_mobile.css` supplies a consistent phone composition at widths up to 699px: two-column product tabs, bounded wrapping titles, downward category arrows, readable full descriptions, media directly after copy, and no artificially separated full-screen copy/media blocks. Who we are has a natural content height, eliminating its empty tail before Engage. `pages_home7_eng.ts` retains tablet sequencing and desktop staging.

`meeting_embeds.ts` lets the native Harkness dashboard reflow at the phone viewport width with no transform scaling. Wider screens retain the existing overview. The source's origin-checked resize messages continue to determine its full scrollable height. The phone dashboard viewport is 360–540px tall; Flash remains beside its real scroll control and dismisses after inner scrolling.

The See it live picker minimum width is bounded by the viewport. At 320px the open picker is 272px wide and stays inside the page.

## Verification of final code

- Astro check: 0 errors, 0 warnings, 7 existing hints.
- Production build: 38 routes.
- Unit tests: 251 passed. These include production wheel/touch handlers at 375px and 440px, momentum rejection, fresh gestures, reversal, nested scrolling, global Next, and product resizing.
- Site contracts: 11 passed, including source-copy and route/link preservation.
- `git diff --check`: clean.
- Final `dist/index.html` SHA-256: `96667c0952a816a529a6b222dfde9f94473d964391541d5495199d3d6eba0f82`.

Rendered browser checks covered 320, 390 and 440px: all three homepage chapter headings, all product choices, mobile menu, the live picker, loaded Stories display/controller, Harkness text/controls/inner scrolling, and a desktop regression view. Independent visual review is recorded in `output/oct2-refined-audit/mobile-homepage-review.md` outside the repository.

Final section-controller browser proof at 440px: consecutive downward gestures selected Digital Signage → Phone App → Web Embeddables at the same section position; reversing selected Phone App. Two explicit Next activations then reached Educate. A Building Dashboard gesture advanced from page offset 2223 to 2510 while retaining the same product. Dashboard PageDown moved its inner scroll to 457.5 and retained Educate. Real touch contact/momentum cases were verified by production-handler tests, not physical-device testing.

## Source-dependent limitation

The live Harkness application itself still renders its final portfolio legend and treemap labels poorly at narrow widths. Native source text/controls and the complete scroll range are now accessible, but this does not establish that every chart inside that separately hosted application is responsive. The lower-chart capture is retained as a follow-up finding, not represented as a full responsive pass.

## Research and review basis

[W3C Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [responsive web design basics](https://web.dev/articles/responsive-web-design-basics) informed the phone layout. The rejected patterns were miniature desktop text, clipped product choices, arrows pointing away from their choices, empty viewport-height tails, controls overlapping the global action, and unrequested continuous scrolling.

All changes remain local; nothing was pushed or deployed in this pass.
