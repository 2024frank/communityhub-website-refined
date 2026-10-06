# Rapid swipes and purposeful controls

Kwaku reported that a second two-finger trackpad swipe was ignored unless the reader waited, then requested removal of unclear outer previous/next/play controls and buttons that merely advance the page. Digital Signage photographs should still loop by default.

## Diagnosis and scroll change

The old WheelGesture retained page ownership until 260 milliseconds passed with no wheel events, including subpixel inertia. A deliberate same-direction swipe arriving during that momentum was unconditionally consumed. Reproduced five failures before editing: rapid downward and upward strokes, a gentle renewed stroke, entering the dashboard, and leaving its inner edge.

The controller now recognizes sustained renewed input after the previous burst decays. It requires two substantial renewed samples after a measured decline, retaining the quiet-gap fallback and the existing direction-reversal behavior. Initial acceleration, small rebounds and isolated outliers still belong to their existing gesture. The original event timestamps remain authoritative, preserving handling of events queued during a slow layout.

This is a heuristic: WheelEvent has no physical finger-contact/end signal. Very gentle strokes or strokes with no detectable decline still use the quiet-gap fallback. Synthetic event checks do not establish how every physical trackpad feels.

Primary references: [MDN wheel event](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event) and [W3C Wheel Events](https://w3c.github.io/uievents/split/wheel-events.html). Patterns avoided: a shorter arbitrary cooldown that lets momentum skip scenes, interpreting every amplitude spike as a new swipe, using dispatch time for queued events, and swallowing nested dashboard scrolling.

## Control cleanup

Removed generated homepage chapter/scene arrows and floating arrows on interior routes. Retained the event-list sizing function that shares their former module. Removed hero arrow/Explore scene-advance controls and obsolete focus bookkeeping. Wheel, touch, keyboard navigation and meaningful destination links remain.

The three tests that specifically required the removed generated arrows were retired. An existing homepage scroll instruction assertion was updated to the already-approved “Scroll here to explore” cue; the old sentence had explicitly been removed at Kwaku's request.

Latest correction: Kwaku also rejected the replacement Example selectors and requested removing all of them. Every homepage preview now has no outer selector or previous/next/play row. Manual live previews hold their initial context; photos retain twelve-second loops and temporary hover/focus holds. Native embedded application controls remain. See building-example-controls.md for the updated build and evidence.

## Prior combined verification (before the subsequent dropdown removal)

- Build at 01:53:49: 38 routes, homepage SHA-256 `9890da0aa3209957d772ddf08da2a0857c19c9fd9344824f78d7c431127c6cdb`.
- Astro check: zero errors and warnings, seven existing hints. All 227 unit tests and 11 site contracts passed.
- Browser fixture: seven timed synthetic WheelEvent cases passed using the actual bundled navigation controller. Renewed up/down and gentle strokes move twice; continuous inertia, initial acceleration, an isolated outlier and the recorded sparse 239ms stream move once. This is browser event verification, not a physical trackpad recording.
- Live homepage: Digital Signage automatically changed from Dave's Market to Hotel at Oberlin without user input. The named selector opened the Great Lakes Science Center workshop. Zero generated page arrows and zero old homepage preview button rows remained in the DOM.
- Phone at 390 by 844: PageDown reached the demonstration without a page-advance button; image, full caption and native selector stayed separate. Temporary viewport override was reset.
- Independent visitor review accepted the desktop and phone render and the visible seven-case browser results. Evidence: `../../../output/oct2-refined-audit/screenshots/signage-purposeful-controls-desktop.png`, `signage-purposeful-controls-mobile.png`, and `rapid-swipes-browser-qa.png` in the same folder.
- Existing Python browser-test expectations were updated for removed arrow controls, but that external browser suite was not run in this session. UI verification used the available CUA browser interface.

Local changes only, not pushed or deployed. Physical two-finger feel remains for Kwaku to check in the refreshed preview.

## Latest dropdown removal verification

Build 02:01:04, homepage SHA-256 `a9168adb0c7510910d1301d3c215db285e62de28e4b0d24e9e77d5c00a871ce8`: 38 routes, zero errors/warnings, 231 unit tests and 11 contracts passed. Desktop and phone screenshots named `signage-no-extra-controls-*` supersede the selector screenshots above. Actual photo advance and zero homepage outer controls confirmed in the browser.
