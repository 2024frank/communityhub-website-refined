# Community Hub — October 2 Story of Dashboard revision

## Candidate

The bounded final source and rendered review is accepted. Known local defects identified during review are closed; the external and device limits below remain explicit.

This handoff refines the supplied Astro/TypeScript source. It contains 35 content pages and three legacy redirects. All 597 supplied public files remain byte-for-byte unchanged; 33 separately named files add the approved product photo, source-extracted workflow and evidence elements, the video’s first-frame poster, and local fonts/licenses.

The source was reviewed through an owner-only private hosted preview. It has not been publicly deployed. The original uploaded source and prior reconstruction remain separate from this handoff.

## Automated verification

On October 2, the production candidate passed:

- Astro/TypeScript: 0 errors and 0 warnings, with 7 informational hints
- Production build: 38 HTML outputs
- Node unit tests: 141 passed, 0 failed
- Route, local asset, fragment, privacy and original-copy contracts: 11 passed
- Browser test fixtures: 26 TypeScript bundles and 47 stylesheets compiled
- Browser-suite syntax: 30 Python modules and 334 embedded JavaScript snippets checked

The automated browser suite itself was not executed in this environment. Historical migration-parity checks require an optional reference checkout absent from the supplied archive; that evidence has not been invented.

The exact built files are hashed in `docs/refinement-20261002/final-build-manifest.json`. This candidate was built at 2026-10-02 15:31:53 UTC. The final owner-only preview is version 20, source commit `e8e6654ea415a1f2894822f0f2181b6dd1090ae9`. Its `index.html` SHA-256 is `fb41a8a8ada4925f3342bd55bba9322d67026ce7e08ee606582a0b6140442d2a`.

## Actual hosted review

The review covered every content route with a desktop scene walk to the ending/footer and every route’s initial narrow view. Changed scenes and high-risk interactions were then retested. These are observed browser checks, not a claim of exhaustive coverage of every external application state.

The browser review included the combined video-and-people opening, remaining-time carousel pause/resume, centered identity animation, scene navigation, actual public product embeds, phone walkthrough, lesson search/grade filters/PDF links, menus, FAQs, selected partner pages, native application controls and local loading recovery. Whole source presentation slides remain in the dedicated source viewer; marketing pages use the relevant individual evidence elements. The Data Hub platform component retains the accepted slide-10 explanation. At the owner’s later request, Products #how now displays the complete original 31-slide Story of Dashboard presentation from the official Environmental Dashboard site. Local source frames are unchanged, including all authored explanatory strips.

The narrow review used resized desktop Chrome at approximately 388 × 606 CSS pixels and 125% browser zoom. The final fit retakes include the Who We Are next control, Citywide, the College orb map, and the Research, Neighborhoods, Phone App and Web Embeddables openings. Community Voices’ complete display and category row fit together at 1173 × 757 CSS pixels with no inner scrolling. A larger 1342 × 934 display-filling browser window was also checked; this is not a claim of a separate browser fullscreen-mode test. Physical phones, touch hardware, Safari and Firefox were not tested.

The Products-only revision was independently checked in actual desktop, short-laptop and narrow browser views. First, middle and final original frames, previous/next buttons, left/right keys, endpoint behavior, full-size image, official-source link and page continuation pass. V20’s final narrow correction uses the full available slide width; complete caption, 44px controls and source link remain inside a 390 × 606 CSS-pixel viewport. The title and controls do not move between slides.

Official live deck identity was verified: `StoryOfDashboard_200121`, 31 slides, linked at https://environmentaldashboard.org/story-of-dashboard. Four representative source frames were visually compared with the local originals. All 31 local slide images decode correctly and remain byte-identical to the supplied archive. See `docs/refinement-20261002/original-story-revision.md`.

The broad initial website review remains relevant to unchanged routes. This revision did not repeat every earlier page capture. V19 supplies the complete new-viewer interaction checks; V20 changes only its image-height cap and adds the final narrow fit proof. The older `final-copy-delta.json` is historical evidence of the initial V18 handoff, not the scope of this later revision.

## Remaining external and coverage limits

- Public dashboards, controllers, calendars, Community Voices and lesson PDFs need internet access and remain controlled by their source hosts. A successful iframe load event does not prove upstream application health; recovery links are retained.
- The YouTube player and original source watch page both remained buffering in the review browser. Local loading controls, preserved captions and player sizing were verified; actual remote playback is unconfirmed.
- Original slide text remains part of the authored 960×720 source images. A full-size image action is provided for closer reading; physical-device legibility at every possible screen size is not claimed.
- Narrow portrait Community Voices keeps its full photograph and quote in a deliberately scrollable region; they cannot all fit simultaneously with every category in a short phone-height viewport without making the content unreadable. Native dashboards also retain their own internal scrolling.
- Contact/email preparation was reviewed without sending a message. Delivery is not claimed.
- No separate cold-cache trace was recorded for every route, and no exhaustive keyboard traversal of every link or all narrow continuation frames is claimed.

## Use the source

Both ZIP files are required. Extract them into the same folder, merging their `community-hub-source/` directory. Read `HANDOFF.md`, then run `python3 verify-source.py` before installing dependencies. Use Node 22.12 or newer, `npm ci`, `npm run build`, and `npm run preview -- --port 4327`.

The ZIP integrity check verifies all included files and exact checksums. It does not replace the build and interaction evidence above.
