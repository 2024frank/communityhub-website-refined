# Community Hub — October 2 source handoff

## Candidate

The bounded final source and rendered review is accepted. Known local defects identified during review are closed; the external and device limits below remain explicit.

This handoff refines the supplied Astro/TypeScript source. It contains 35 content pages and three legacy redirects. All 597 supplied public files remain byte-for-byte unchanged; 33 separately named files add the approved product photo, source-extracted workflow and evidence elements, the video’s first-frame poster, and local fonts/licenses.

The source was reviewed through an owner-only private hosted preview. It has not been publicly deployed. The original uploaded source and prior reconstruction remain separate from this handoff.

## Automated verification

On October 2, the production candidate passed:

- Astro/TypeScript: 0 errors and 0 warnings, with 7 informational hints
- Production build: 38 HTML outputs
- Node unit tests: 136 passed, 0 failed
- Route, local asset, fragment, privacy and original-copy contracts: 11 passed
- Browser test fixtures: 26 TypeScript bundles and 46 stylesheets compiled
- Browser-suite syntax: 30 Python modules and 334 embedded JavaScript snippets checked

The automated browser suite itself was not executed in this environment. Historical migration-parity checks require an optional reference checkout absent from the supplied archive; that evidence has not been invented.

The exact built files are hashed in `docs/refinement-20261002/final-build-manifest.json`. This candidate was built at 2026-10-02 14:07:02 UTC. The final owner-only preview is version 18, source commit `b8a92cd5011b2ef0036e17b4873d61d6331f8a53`. Its `index.html` SHA-256 is `2203d16c41b96d75cf765ed5d4f93d8a11a1e9bbd680c980b75672045ca36284`.

## Actual hosted review

The review covered every content route with a desktop scene walk to the ending/footer and every route’s initial narrow view. Changed scenes and high-risk interactions were then retested. These are observed browser checks, not a claim of exhaustive coverage of every external application state.

The browser review included the combined video-and-people opening, remaining-time carousel pause/resume, centered identity animation, scene navigation, actual public product embeds, phone walkthrough, lesson search/grade filters/PDF links, menus, FAQs, selected partner pages, native application controls and local loading recovery. Whole source presentation slides remain in the dedicated source viewer; marketing pages use the relevant individual evidence elements. The Products and Data Hub platform component reconstructs slide 10’s actual data-source, Hub, applications and delivery sequence from its extracted artwork, with a truthful real-product phone image in place of the source’s generic WhatsApp placeholder.

The narrow review used resized desktop Chrome at approximately 388 × 606 CSS pixels and 125% browser zoom. The final fit retakes include the Who We Are next control, Citywide, the College orb map, and the Research, Neighborhoods, Phone App and Web Embeddables openings. Community Voices’ complete display and category row fit together at 1173 × 757 CSS pixels with no inner scrolling. A larger 1342 × 934 display-filling browser window was also checked; this is not a claim of a separate browser fullscreen-mode test. Physical phones, touch hardware, Safari and Firefox were not tested.

The final narrow animation check shows the complete caption and both visible, keyboard-focused 44px arrow controls within the 606px viewport. Next, previous, replay, pause behavior and continuation were checked. The Products mega-menu stays within the normal desktop viewport, and the narrow See it live toolbar retains a single 44px row.

Version 17 supplied the final visual/control evidence. The delivered version adds only the grammar correction “brings” to “bring” in the Products and Data Hub caption: the two affected HTML files were byte-compared after that replacement, and the other 673 production files are byte-identical. `final-copy-delta.json` records this scope. Source checks were rerun on the delivered build.

## Remaining external and coverage limits

- Public dashboards, controllers, calendars, Community Voices and lesson PDFs need internet access and remain controlled by their source hosts. A successful iframe load event does not prove upstream application health; recovery links are retained.
- The YouTube player and original source watch page both remained buffering in the review browser. Local loading controls, preserved captions and player sizing were verified; actual remote playback is unconfirmed.
- Narrow portrait Community Voices keeps its full photograph and quote in a deliberately scrollable region; they cannot all fit simultaneously with every category in a short phone-height viewport without making the content unreadable. Native dashboards also retain their own internal scrolling.
- Contact/email preparation was reviewed without sending a message. Delivery is not claimed.
- No separate cold-cache trace was recorded for every route, and no exhaustive keyboard traversal of every link or all narrow continuation frames is claimed.

## Use the source

Both ZIP files are required. Extract them into the same folder, merging their `community-hub-source/` directory. Read `HANDOFF.md`, then run `python3 verify-source.py` before installing dependencies. Use Node 22.12 or newer, `npm ci`, `npm run build`, and `npm run preview -- --port 4327`.

The ZIP integrity check verifies all included files and exact checksums. It does not replace the build and interaction evidence above.
