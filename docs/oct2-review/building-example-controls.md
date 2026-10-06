# Homepage preview controls

Kwaku rejected the outer previous/next/play row beneath the homepage demonstrations, then rejected its replacement Example dropdown and explicitly requested removal of all of those dropdowns. Every homepage preview now omits both kinds of outer controls. Actual product controls inside the live dashboards are retained.

Digital Signage, Stories and Community Voices photos retain their twelve-second loop, temporary hover/focus holds, visibility gating and reduced-motion behavior. A wheel, touch or scroll event no longer permanently stops an automatic photo preview that has no resume control. The single Phone App photo stays static. Manual live previews remain fixed on their initial context; their source alternatives are retained, but there is no outer homepage selection UI. Destination links lead to the product pages.

Research: [NN/G minimalist design guidance](https://www.nngroup.com/articles/aesthetic-minimalist-design/) informed removing redundant controls; [W3C carousel guidance](https://www.w3.org/WAI/tutorials/carousels/) informed readable timing and preserving motion preferences. Kwaku's explicit control-removal request determines the final interface.

Patterns avoided: replacing rejected buttons with another unsolicited control, duplicating playback around a live dashboard, accidentally freezing a loop with no way to resume, and changing native controls inside the embedded application.

Verified build: October 3, 02:01:04, 38 routes. Homepage SHA-256 `a9168adb0c7510910d1301d3c215db285e62de28e4b0d24e9e77d5c00a871ce8`. Astro: zero errors/warnings, seven existing hints. All 231 unit tests and 11 site contracts passed. Four control-free loop regressions were reproduced before repair; all 30 gallery timing tests now pass.

Live browser verification: no added choice/previous/next/play controls across homepage preview DOM; Digital Signage advanced automatically from Dave's Market to Hotel at Oberlin. Desktop and 390 by 844 phone screenshots show title, photo and full caption without the dropdown. Phone viewport restored after inspection. Evidence: `../../../output/oct2-refined-audit/screenshots/signage-no-extra-controls-desktop.png` and `signage-no-extra-controls-mobile.png`. Independent visitor review recorded in the output audit folder. Local changes only, not pushed or deployed.
