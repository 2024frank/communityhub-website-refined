# October 2 transcript acceptance matrix — refined website audit

Target supplied by the user: `2024frank/communityhub-website-refined`, commit `655e1a2`. This defines acceptance, not a claim that the commit meets it. No website files were changed by this extraction.

Authority: fresh reread of the ENTIRE original transcript, 11:01:51–12:31:43, all 2,492 lines. Later decisions override earlier suggestions. `CH Website Prototype/tasks/261002_website/tasks.json` was consulted second and has the discrepancies listed below. Priorities are editorial execution priorities, not a ranking approved by the meeting.

## Highest-priority contract: one appearance must carry one meaning

John’s requirement is not merely “make buttons consistent on the homepage.” At **11:39:05–11:40:30** he rejects the same-looking controls taking a visitor to another page in one place and switching local content in another. At **11:49:06–11:49:23** he asks that the website “doesn't use a different approach on every page to how you're navigating.” Apply the control audit to **every applicable route**, including product pages.

| Control class | Acceptance throughout the site | Failure example |
|---|---|---|
| Page navigation / CTA | Consistent visual treatment and predictable placement for the same purpose. Homepage product summaries have one Learn more below their description. | Local tabs/category selectors styled identically to leave-page CTAs; redundant See-product/full-size homepage links. |
| Local tabs, menus, categories/context selectors | Distinct local-navigation treatment and a clear selected state. Retain useful product-page interaction. | Tabs masquerade as destination buttons or selected coloring changes meaning between locations. |
| Carousel previous/next | Same side-arrow pattern for comparable rotators; change examples within the active product. | Arbitrary pill buttons in one place and CTA buttons in another for the same operation; carousel silently changes products. |
| Pause/play | Recognizable pause icon within a circle; visible state and action clear. | Two unexplained bare lines or inconsistent comparable controls. |
| Section down navigation | Centered circle around down arrow, with matching stroke weight, wherever this navigation pattern occurs. | Far-right circle on first screen and bare centered arrow on later screens. |

Derived QA: inspect equivalent controls across all applicable routes at desktop and phone sizes, including focus, hover, selected and disabled states where meaningful. Verify keyboard activation and actual destination. These are implementation checks, not transcript quotes. Do not invent a blanket all-green-button rule, identical-width rule or a ban on useful product-page tabs.

## Prioritized acceptance matrix

P0: central consistency and final homepage contract. P1: required supporting content/assets/polish. P2: coordination/handoff; this audit is not authorized to send or deploy by the transcript itself.

### P0 · OCT2-12 · Separate page-navigation controls from local carousel navigation

**Scope/status:** Shared UI controls; confirmed consistency rule; one earlier color issue already fixed.

Do not use identical CTA-looking buttons both to navigate to a different page and to switch a local example. Use side arrows for homepage example rotators and one consistent Learn more CTA for the product page. For any retained product-page local menus, give them distinct menu/tab semantics and a clear selected state.

**Exact transcript evidence:**
- **11:21:43–11:21:53, John Petersen (he):** “I guess you changed these. Okay.”
- **11:39:05–11:39:21, John Petersen (he):** “using the same looking buttons for 2 different purposes”
- **11:40:08–11:40:24, John Petersen (he):** “these particular kinds of buttons like this should never be used as internal navigation within one location within a page”

**Acceptance checks derived from the request:**
- A local example switch is visually distinguishable from a link that navigates away.
- Homepage example selection uses the agreed carousel pattern rather than location buttons.
- Selected/unselected styling has one consistent meaning.
- Recheck the initial slider issue rather than assuming it remains broken: the group says it had already been fixed.

### P0 · OCT2-15 · Use one consistently labeled Learn more link below each product description

**Scope/status:** Homepage product navigation; final agreement; supersedes earlier title-only/caption-link proposals.

Keep a single Learn more control under the main explanatory copy for each product. Its destination is that product’s page. Remove redundant “See [product]”, “Open full size”, and external/source links from homepage preview captions or separate buttons. Product titles and icons should no longer be the only discoverable route.

**Exact transcript evidence:**
- **12:06:56–12:07:12, John Petersen (he):** “underneath the text for this, it says learn more, but it would not say see digital signage.”
- **12:07:12–12:07:24, John Petersen (he):** “You would not have a thousand different links and things.”
- **12:07:28–12:07:30, Kwaku(he/him):** “That makes sense.”
- **12:07:36–12:07:39, Madeleine Faubert:** “below the text.”
- **12:10:28–12:10:38, John Petersen (he):** “there is no open full size or anything like that. There's just the learn more button underneath the left.”

**Acceptance checks derived from the request:**
- Each homepage product description has exactly one clear product-page CTA labeled Learn more.
- Its destination matches the product currently described, including the three Engage products.
- No extra homepage full-size/source links or duplicate See-product buttons compete with it.
- Do not implement the earlier title-only-link plan as the final decision.
- Keep external full-size access on relevant product pages where useful; the final removal discussion concerns the homepage.

**Chronology:**
- 11:33:57: John permits links inside legends.
- 11:53:20–12:00:35: John proposes title/icon as the only product link; Madeleine repeatedly objects.
- 12:06:56–12:07:54: John accepts a consistent Learn more under the copy; Kwaku and Madeleine agree.
- 12:10:28–12:10:43: Final recap removes open-full-size links and confirms Learn more as the only route.

### P0 · OCT2-14 · Make the homepage a passive introduction with a consistent rotating-preview pattern

**Scope/status:** Homepage overall; final agreed principle, with Building Dashboard exception.

Visitors should understand the basics by scrolling and observing. Remove product interaction burdens from homepage previews, retain optional side-arrow navigation, and automatically rotate through examples within each product to show varied contexts. Deeper interaction belongs on product pages. Building Dashboard keeps its explicitly discussed inner-scroll exception.

**Exact transcript evidence:**
- **11:55:44–11:56:00, John Petersen (he):** “there's way way too much noise on these pages”
- **11:56:00–11:56:11, John Petersen (he):** “anything to learn about the, you know, basics. Get the basic explanation of of our products.”
- **11:56:29–11:56:47, John Petersen (he):** “everything in this section will consistently have a slider”
- **11:58:51–11:59:07, John Petersen (he):** “the experience on the homepage other than scrolling is passive.”
- **12:16:09–12:16:25, John Petersen (he):** “Everything has a rotator with content going by.”

**Acceptance checks derived from the request:**
- A visitor can understand every product’s main explanation without selecting filters or manipulating a controller.
- Each product preview follows a recurring pattern of optional side arrows, automatic examples, appropriate title and optional caption.
- Remove redundant toolbars and context/category controls from homepage demonstrations.
- Preserve diverse actual use cases; do not reduce everything to one generic sample.
- Treat internal Building Dashboard scrolling as the recorded exception rather than claiming the homepage has no interaction at all.

**Chronology:**
- Madeleine proposes no homepage product interaction starting 11:37:38.
- John’s initial compromise retains caption links and explores title-only product links.
- By 11:58:51 all agree on a passive experience with optional carousel arrows.
- 12:11:36–12:17:39 retains Building Dashboard inner scrolling as an exception; this should not be erased by the broader rule.

### P0 · OCT2-18 · Keep carousel rotation within the active product

**Scope/status:** Homepage scroll and slider behavior; confirmed.

Horizontal arrows/automatic rotation show examples belonging to the currently selected product. Vertical scrolling advances to the next product section. For example, Digital Signage’s carousel must not automatically become Phone App; scrolling moves to Phone App.

**Exact transcript evidence:**
- **12:08:32–12:08:36, Madeleine Faubert:** “when you scroll, it'll advance to the phone app.”
- **12:08:36–12:08:51, John Petersen (he):** “the sliders are completely within whatever's highlighted here.”
- **12:08:45–12:08:46, Madeleine Faubert:** “Yep.”

**Acceptance checks derived from the request:**
- While Digital Signage is active, every automatic or arrow-selected slide is a signage example.
- The same product-scoped rule holds for Phone App, Web Embeddables and other applications.
- Vertical section navigation changes the active product and its complete explanation.
- Submenu highlighting always matches the content currently shown.

### P0 · OCT2-17 · Restore product headings and reuse the established product icons

**Scope/status:** Homepage explanatory copy, especially Engage; confirmed.

Above every product description, show the product’s actual title and its existing Products-menu icon. Ensure Digital Signage, Phone App and Web Embeddables each have the correct title, icon and explanatory copy when active. Preserve title/copy coverage in Voices, Calendar, Building Dashboard and other applications.

**Exact transcript evidence:**
- **12:01:59–12:02:07, Madeleine Faubert:** “make sure that there's digital signage over the main copy.”
- **12:02:09–12:02:25, John Petersen (he):** “This is phone app digital signage web embeddables. So I think those titles all need to be at the top.”
- **12:03:22–12:03:33, John Petersen (he):** “it would have an icon representing that particular thing.”
- **12:03:35–12:03:45, John Petersen (he):** “You'd be using these same icons. You'd be using the same titles”
- **12:05:41–12:05:57, John Petersen (he):** “The digital signage wants to be a title above the text explaining the digital signage.”

**Acceptance checks derived from the request:**
- Every product explanation has a visible, correct heading above its paragraph.
- Icons match the existing Products overview/menu assets rather than invented substitutes.
- Switching among Engage subsections updates title, icon, description and Learn more destination together.
- No interaction depends solely on clicking a title; use the final Learn more agreement.

### P0 · OCT2-16 · Simplify section labels and visually connect them to their submenu

**Scope/status:** Homepage section headings; confirmed.

Use “Engage”, “Educate”, and “Motivate and empower” without “To”. Add a right-pointing arrow in the same typographic style immediately after the section heading, pointing toward the related product submenu. Keep the conceptual sequence engage → educate → motivate/empower.

**Exact transcript evidence:**
- **11:41:43–11:41:46, John Petersen (he):** “I think we should just say engage.”
- **11:42:09–11:42:24, John Petersen (he):** “it should just be engage, educate, motivate, empower.”
- **11:42:43–11:43:01, John Petersen (he):** “same font, same size, font, just part of that motivate and empower. It's just an arrow in that text”
- **12:04:35–12:04:45, John Petersen (he):** “not to engage, engage with an arrow going to the right, pointing at those things.”

**Acceptance checks derived from the request:**
- No heading retains the unnecessary To prefix.
- The arrow belongs to the heading typography, not a new styled button.
- The visual relationship between each section label and its relevant submenu is clear.
- At narrow widths, adapt the layout without leaving the arrow pointing away from the associated controls.

### P0 · OCT2-13 · Align visual titles, images and captions consistently

**Scope/status:** Homepage product previews and image/caption components; confirmed.

Use a coherent left edge for each visual’s title, image/embed and caption. Left-align multi-line captions to the visual’s own left edge, rather than to an unrelated column while the image is centered. Titles above visuals identify the context; explanatory legends go below when needed.

**Exact transcript evidence:**
- **11:23:05–11:23:09, John Petersen (he):** “against the left-hand edge of the photograph.”
- **11:33:41–11:33:57, John Petersen (he):** “when we have graphics that need some sort of explanation for themselves, have it as a legend below.”
- **11:45:19–11:45:38, John Petersen (he):** “left justify everything. So everything's lined up”

**Acceptance checks derived from the request:**
- Across slides with different image sizes, captions begin at the corresponding image/embed left edge.
- A visual title is aligned with that visual and is plain text, not a misleading context-navigation button.
- Explanatory paragraphs and multi-line captions do not switch unpredictably between centered and left-aligned text.
- Do not force a caption onto a self-explanatory Voices preview: the final discussion explicitly allows no legend there.

### P0 · OCT2-19 · Turn homepage Community Voices into curated rotating examples

**Scope/status:** Homepage Community Voices; confirmed pattern; exact content roster remains to select.

Remove the MidTown/GLSC/Oberlin context buttons and category filters from the homepage. Rotate through real, prefiltered examples from different communities and categories, with a changing plain title and appropriate community/category logo. Retain side arrows and auto-advance; the preview can omit a legend if the title explains it. Keep interactive filters on the product page.

**Exact transcript evidence:**
- **11:52:08–11:52:16, Madeleine Faubert:** “categories of community voices. It should really just be the visual demonstration and a link to learn more.”
- **11:52:32–11:52:47, John Petersen (he):** “They're sliders with little arrows on either side”
- **11:58:00–11:58:15, John Petersen (he):** “I want people to understand. We have different community voices in different communities.”
- **11:59:07–11:59:27, John Petersen (he):** “the heading again is Midtown Cleveland. It probably has the Midtown logo”
- **11:59:27–11:59:47, John Petersen (he):** “it doesn't have buttons that let you interact with it.”
- **11:59:47–12:00:01, John Petersen (he):** “I don't think it even needs a legend for this.”

**Acceptance checks derived from the request:**
- Homepage has no community selector buttons or category filter buttons.
- Rotating content includes more than one community and shows meaningful category variety.
- Each slide’s title/logo accurately identifies the filtered content currently on screen.
- Manual side arrows and automatic rotation follow the shared preview pattern.
- Treat eight positions, Story of MidTown, and Northeast Ohio Climate Action as example curation suggestions, not a finalized list or verified source URL.
- Keep one Learn more CTA under the explanatory copy.

### P0 · OCT2-20 · Replace homepage Stories controller interaction with varied story previews

**Scope/status:** Homepage Stories; confirmed.

Remove the live phone controller and institution selector buttons from the homepage. Show a rotating selection of real stories, including different institutions and subjects. Titles and optional captions identify both institutional context and the particular story. Use side arrows and auto-rotation; keep the working controller on the product page.

**Exact transcript evidence:**
- **12:09:28–12:09:45, John Petersen (he):** “You're not going to have a controller, but you are going to have a title on the top”
- **12:09:45–12:10:00, John Petersen (he):** “telling you where you are, what story”
- **12:10:00–12:10:16, John Petersen (he):** “what the institutional context is for it, and what the story is.”
- **12:10:17–12:10:28, John Petersen (he):** “it wouldn't have the Oberlin or Cleveland on the top, but you'd see Oberlin and Cleveland because they would cycle.”
- **12:16:48–12:17:03, John Petersen (he):** “We've got a bunch of different stories that are really different.”

**Acceptance checks derived from the request:**
- No live Stories controller or institution-switch button row remains on the homepage.
- At least multiple real institutional contexts and story topics are represented.
- Titles/captions distinguish examples such as Oberlin carbon neutrality/heating-cooling and GLSC Lake Erie rather than unlabeled slides.
- Suggested MidTown/community and City of Oberlin climate-plan stories are verified from their true sources before inclusion.
- The sole product navigation is Learn more below the explanatory copy.

### P0 · OCT2-22 · Remove unrelated navigation from Building Dashboard embeds

**Scope/status:** Building Dashboard preview; confirmed.

Remove the embedded left-hand navigation column/buttons that lead to other dashboard components, so the preview focuses on Building Dashboard and gains usable width. Keep the actual dashboard’s relevant institutional identity; John specifically mentions Oberlin College remaining on the right.

**Exact transcript evidence:**
- **11:25:01–11:25:14, John Petersen (he):** “taking out that left hand column. So you make it wider.”
- **11:25:21–11:25:38, John Petersen (he):** “that whole thing on the left was gone, and Oberlin College was still on the right.”
- **11:34:30–11:34:45, John Petersen (he):** “get rid of that like internal set of buttons within this, because this is only showing you building dashboard.”

**Acceptance checks derived from the request:**
- The embedded Building Dashboard does not expose unrelated application navigation.
- Its content gains the available width without losing building/institution identity or essential data controls.
- Use an appropriate source route/configuration rather than hiding data content by arbitrary cropping.
- Verify the exact column/buttons against the recording before modifying an upstream source.

### P0 · OCT2-23 · Make Building Dashboard’s inner scroll obvious and explain it below

**Scope/status:** Homepage Building Dashboard; confirmed final exception to passive-only principle.

Retain the internal scroll for Building Dashboard, make its right-side scrollbar visibly apparent from the initial view, and put a concise explanatory legend underneath. Name the institution/building, not just Harkness. Remove the noisy instruction line above the embed and remove separate homepage full-size links per the later CTA decision.

**Exact transcript evidence:**
- **11:26:14–11:26:31, John Petersen (he):** “if there's an inner scroll, the inner scroll should be more obvious that you can use it”
- **11:27:02–11:27:17, John Petersen (he):** “what you need is the scroll bar on the right that you can just pull down”
- **11:32:06–11:32:13, John Petersen (he):** “Use the scroll bar at the right to navigate through that”
- **11:31:50–11:32:06, John Petersen (he):** “It needs to say Oberlin College's Harkness co-op dashboard.”
- **11:33:41–11:33:57, John Petersen (he):** “have it as a legend below.”
- **12:11:45–12:11:50, John Petersen (he):** “you need to have an internal scroll in this one. Only this one, none of the others.”

**Acceptance checks derived from the request:**
- The initial preview visibly communicates that content extends below, using a persistent or otherwise unmistakable right scrollbar.
- A concise lower caption tells visitors how to scroll and names the current institutional/building context.
- Scrolling reaches the meaningful visualizations rather than ending at a clipped header/photo.
- Do not require outer-page scroll to drive cross-origin inner content: that approach was discussed and accepted as unavailable in the meeting.
- Do not retain above-embed instructions or an extra Open full size homepage control.
- Avoid an auto-rotation interrupting someone reading or scrolling; this is a QA risk raised by Madeleine, with no exact pause timing settled.

**Chronology:**
- 11:23:43–11:26:14: External scroll driving embedded content is discussed; Kwaku says unavailable and John accepts.
- 11:27:34–11:30:59: Above-versus-below instruction placement debated; John settles on a below-visual legend.
- 12:11:45: Building Dashboard is the explicit inner-scroll exception.
- 12:14:47: Madeleine raises rotation while scrolling as an unresolved usability hazard.

### P0 · OCT2-24 · Rotate Building Dashboard through several approved client contexts

**Scope/status:** Homepage Building Dashboard; John’s final direction; Madeleine’s redundancy concern remains recorded.

Use the same arrow/auto-rotation pattern to show selected Building Dashboard examples from varied contexts: Harkness/college, whole campus, public schools, GLSC, and City of Oberlin/water use are proposed. Every example retains the same inner-scroll presentation and identifying title/caption. Do not add Hamilton until it permits public display.

**Exact transcript evidence:**
- **12:10:49–12:11:05, John Petersen (he):** “we have only hardness again. Lose the stuff on the left”
- **12:11:05–12:11:15, John Petersen (he):** “right now we don't have Hamilton because they don't want us to do Hamilton.”
- **12:12:50–12:13:06, John Petersen (he):** “I think it wants to cycle through other buildings”
- **12:13:06–12:13:25, John Petersen (he):** “We've got Harkness, we've got the whole campus, we've got, um, Great Lakes Science Center”
- **12:13:25–12:13:42, John Petersen (he):** “We have the city of Oberlin. We have Oberlin public schools.”
- **12:15:34–12:15:53, John Petersen (he):** “this would work for my public schools. This would work for my city. This would work for individual building.”

**Acceptance checks derived from the request:**
- Choose and verify real public dashboard URLs for a small representative selection of the named contexts.
- Keep the title/caption, institution, data display and inner-scroll state synchronized with the active dashboard.
- Use consistent left/right controls across examples.
- Exclude Hamilton unless separate current permission is established; no permission is supplied in this transcript.
- Do not force exactly five examples: John changes the count while brainstorming.
- Check that rotation does not disorient an active reader; explicit timing and pause rules were not decided.

**Chronology:**
- 12:12:39: Madeleine suggests keeping only Harkness with inner scroll.
- 12:12:50–12:17:39: John insists on multiple building contexts to communicate breadth; this is the last detailed direction.
- Madeleine’s concerns about redundancy and rotation while scrolling are not silently resolved by the transcript.

### P0 · OCT2-26 · Apply the agreed homepage pattern to Calendar, Citywide and remaining product previews

**Scope/status:** Homepage remaining product sections; confirmed global consistency; product-specific details not discussed.

Audit all remaining homepage product previews against the same reduced-interaction model: product title/icon/copy, product-scoped rotating examples, aligned contextual titles/captions when needed, side arrows, and one Learn more link. The final discussion says only Building Dashboard has inner scrolling; do not simply retain the October 1 interactive-calendar plan without reconciling it.

**Exact transcript evidence:**
- **12:05:12–12:05:26, John Petersen (he):** “the community calendar does have a title. Okay, it has a title above it.”
- **12:11:45–12:11:50, John Petersen (he):** “Only this one, none of the others.”
- **12:16:25–12:16:32, John Petersen (he):** “Every single page has that consistency.”

**Acceptance checks derived from the request:**
- Inventory every homepage product section, including Community Calendar and Citywide Dashboard, and check all shared decisions.
- Remove unnecessary homepage inner-scrolling or product controls outside the recorded Building Dashboard exception.
- Preserve deeper live interaction on the product destination.
- Use truthful examples and avoid pretending the transcript specified a new calendar/citywide source URL or exact content roster.

### P1 · OCT2-10 · Match the live Stories controller and display dimensions

**Scope/status:** Product pages with paired Stories display/controller; confirmed; homepage controller later removed.

In product-page embeds, enlarge the phone controller to roughly the display height, using the normal paired presentation and matching color scheme. Make the controller legible rather than a tiny pixelated-looking panel.

**Exact transcript evidence:**
- **11:18:35–11:18:42, Madeleine Faubert:** “the controller should be the same color scheme.”
- **11:18:42–11:18:46, Madeleine Faubert:** “should be the same height as the screen.”
- **11:18:45–11:18:48, John Petersen (he):** “Yeah, just as we normally use it.”
- **11:19:15–11:19:24, John Petersen (he):** “wherever we have it embedded, it's the same height.”
- **11:37:03–11:37:14, John Petersen (he):** “you've got the controller larger than the screen. In the other places, you have the controller smaller than the screen”

**Acceptance checks derived from the request:**
- Desktop display and phone controller have consistent paired heights and readable controls.
- Check every retained product-page pairing; avoid larger-than-screen in one place and smaller-than-screen in another.
- The controller actually changes the paired display.
- Apply responsive layout thoughtfully; the meeting does not mandate equal heights after mobile stacking.
- Do not reintroduce a controller on the homepage, where OCT2-20 supersedes this.

### P1 · OCT2-11 · Label retained phone controllers as working interactions

**Scope/status:** Product Stories / digital signage demonstrations; confirmed; homepage exclusion applies.

Add a short invitation such as “Try the controller. It works!” so visitors know the live phone is functional. Explain briefly that choosing content on the phone changes the display if needed; do not let it look like a screenshot.

**Exact transcript evidence:**
- **11:19:26–11:19:42, John Petersen (he):** “a heading on it like that lets you know you can use the controller”
- **11:19:42–11:19:52, John Petersen (he):** “it looks like a screenshot. I wouldn't know, looking at this, that I could actually do something with it”
- **11:20:15–11:20:32, John Petersen (he):** “try the controller. It works. Exclamation point would be a simple way to do it.”

**Acceptance checks derived from the request:**
- A short, obvious invitation appears alongside or above each retained interactive controller.
- The stated action works and the display responds to a selection.
- Avoid multiple redundant instructions; preserve the clear paired layout.
- Keep the instruction off homepage previews once their live controller is removed.

### P1 · OCT2-05 · Make the pause control recognizable

**Scope/status:** Homepage carousel / testimonial controls; confirmed.

Put the pause bars inside a small visible circle so they read as a control. A different color was suggested as an optional improvement. Preserve the side arrows John likes.

**Exact transcript evidence:**
- **11:10:40–11:10:52, John Petersen (he):** “that should be in like a circle or something, because I think it's really unclear what it is”
- **11:10:52–11:11:08, John Petersen (he):** “maybe a little bit different color. I do. I do like the arrows on either side.”

**Acceptance checks derived from the request:**
- The control is visibly a pause/play button rather than two unexplained lines.
- Pause and resume are keyboard accessible and have an accessible name matching the current action.
- Visual treatment fits the neighboring side arrows without turning every horizontal arrow into a circled button.

### P1 · OCT2-06 · Standardize down-arrow position and stroke

**Scope/status:** Homepage section navigation; confirmed.

Keep each down-navigation arrow centered at the bottom and surrounded by a circle, including the first page. Match the circle stroke visually to the arrow; it is too thin. Left/right arrows do not need circles.

**Exact transcript evidence:**
- **11:11:15–11:11:30, John Petersen (he):** “it should always stay in the middle and have a circle around it.”
- **11:11:34–11:11:49, John Petersen (he):** “a little bit thicker outer circle to match the the thickness of the line.”
- **11:11:52–11:12:09, John Petersen (he):** “the density of the down arrow and the circle want to be the same.”

**Acceptance checks derived from the request:**
- The first screen and subsequent screens use the same centered down control position.
- Circle and arrow look equally weighted across changing backgrounds.
- The control advances one section and remains visible and usable at narrow widths.

### P1 · OCT2-03 · Equalize the opening statement’s type size

**Scope/status:** Homepage opening statement; confirmed.

Make “It has never been more important” the same size as the rest of the statement. Madeleine explicitly questions the smaller text and John agrees it is unexplained.

**Exact transcript evidence:**
- **11:08:49–11:09:00, Madeleine Faubert:** “the text, it has never been more important, is smaller.”
- **11:09:08–11:09:12, Madeleine Faubert:** “that should all be the same size.”
- **11:09:11–11:09:16, John Petersen (he):** “Yeah, I think actually, in the original, too.”

**Acceptance checks derived from the request:**
- Compare all parts of the statement at desktop and narrow widths; no phrase is accidentally smaller.
- Keep the copy itself intact and avoid overflow or unintended line spacing changes.

### P1 · OCT2-04 · Test green emphasis for “act locally” and “think globally”

**Scope/status:** Homepage opening statement; conditional visual test.

Try the original green emphasis on the two phrases, matching the settled post-animation state, while assessing legibility over the trees. John explicitly raises contrast uncertainty and Kwaku offers to test.

**Exact transcript evidence:**
- **11:09:34–11:09:45, John Petersen (he):** “we have the act locally and think globally in green to sort of highlight those 2 things”
- **11:09:53–11:10:00, John Petersen (he):** “maybe the grain doesn't work on top of the green trees”
- **11:09:59–11:10:03, Kwaku(he/him):** “I can try and see if it looks good or not.”

**Acceptance checks derived from the request:**
- Compare the proposed green phrases against the tree/video background and final resting state.
- Retain the green treatment only if the words remain readable; document if a contrast adjustment is necessary.
- Do not treat this as an unconditional demand for green over every background.

### P1 · OCT2-21 · Use real contextual photographs in the Engage previews

**Scope/status:** Homepage Digital Signage / Phone App / Web Embeddables; confirmed direction; precise asset roster open.

Use photos/screenshots showing people engaging with the phone app and physical screens in different real locations. Rotate examples separately within each Engage product. Captions describe the pictured interaction/location and the main copy explains that product.

**Exact transcript evidence:**
- **12:01:25–12:01:40, John Petersen (he):** “screenshots of people engaging with, um, the phone app. It would have pictures of our different screens in different locations.”
- **12:01:40–12:01:51, John Petersen (he):** “the little text underneath would be just descriptions of those things”
- **12:08:36–12:08:51, John Petersen (he):** “everything scrolling by is like images of digital signage”
- **12:08:51–12:08:58, John Petersen (he):** “little descriptions of where this thing is.”

**Acceptance checks derived from the request:**
- Digital Signage shows real screens in multiple locations; Phone App shows actual phone use/engagement.
- Each asset belongs to the active product and carries an accurate short caption where needed.
- Use original high-resolution imagery under OCT2-08/09, not grainy transcript screenshots as final website assets.
- Web Embeddables follows the same pattern with truthful web-use examples; the meeting does not give a definitive asset list.

### P1 · OCT2-25 · Use Data Hub previews to show varied data visualizations

**Scope/status:** Homepage Data Hub; confirmed supporting direction; exact examples not selected.

Let Data Hub’s rotating previews show data visualizations, while Building Dashboard’s previews show the full building/dashboard context. This distinction is John’s reason not to replace the Building Dashboard previews with only charts.

**Exact transcript evidence:**
- **12:12:14–12:12:30, John Petersen (he):** “We have data hub, which is where I think you cycle through the data visualizations”
- **12:12:30–12:12:41, John Petersen (he):** “the building dashboard one wants to have like dashboards for individual buildings.”

**Acceptance checks derived from the request:**
- Data Hub examples demonstrate actual supported visualizations with accurate labels.
- Building Dashboard retains building/institution context rather than duplicating only those data charts.
- Use the shared passive-preview and Learn more pattern.
- Record source URLs for each chosen visualization; none are specified in this passage.

### P1 · OCT2-01 · Embed the existing Story of Dashboard Google Slides presentation

**Scope/status:** About / platform explanation; confirmed; placement partly open.

Integrate the existing Story of Dashboard presentation as a real Google Slides embed. Reuse its already updated platform diagram rather than rebuilding an equivalent asset. It can open at the diagram when used to explain that section; let viewers advance and allow the original slideshow to auto-advance. Determine the coherent site location for the full story.

**Exact transcript evidence:**
- **11:04:55–11:05:13, John Petersen (he):** “which we definitely want integrated onto the site”
- **11:05:43–11:06:00, John Petersen (he):** “it would definitely make it easier to edit in the future”
- **11:06:15–11:06:32, John Petersen (he):** “this definitely wants to be someplace on the site, just as an embedded Google slideshow.”
- **11:06:59–11:07:05, Kwaku(he/him):** “replace that one with this, because it has all of them in there.”
- **11:07:03–11:07:17, John Petersen (he):** “Yeah, yeah.”
- **11:07:32–11:07:50, John Petersen (he):** “It lands on this it lands on that first, st and then cycles back to the 1st slide or something like that.”
- **11:08:22–11:08:33, John Petersen (he):** “there's no point in us recreating stuff that exists elsewhere”

**Acceptance checks derived from the request:**
- Use the presentation John shares, with the actual Google Slides URL recorded; do not substitute a similarly named deck.
- Confirm the embed is readable, advances manually and automatically as the source supports, and remains editable through Google Slides.
- Where the platform diagram is the point of the section, show the relevant existing slide first; record the chosen slide ID.
- Keep the full Story of Dashboard accessible in a deliberate site location; exact navigation placement needs a design choice.

**Chronology:**
- 11:06:37: John first says not to replace because he thinks the shown deck is older.
- 11:06:53–11:07:17: He discovers the newer diagram is already present and agrees to replacement.
- The earlier no-replacement statement is superseded. The exact placement of the full presentation remains unspecified.

### P1 · OCT2-02 · Preserve the diagram’s directional flow and readable narration

**Scope/status:** Platform explanation; conditional polish; preferred replacement in OCT2-01.

If any custom version or surrounding treatment remains, make arrows visibly point from each source, align connector lines, and enlarge the narration at the bottom. The source slideshow’s bottom text box is the example; do not create a duplicate custom diagram solely to perform this task.

**Exact transcript evidence:**
- **11:03:47–11:04:05, John Petersen (he):** “more clearly arrows pointing from where from the sources”
- **11:03:47–11:04:05, John Petersen (he):** “they're not all lined up in terms of lines”
- **11:04:05–11:04:15, John Petersen (he):** “that label on the bottom describing what's happening. I think maybe that should be a larger text.”
- **11:07:03–11:07:17, John Petersen (he):** “a box at the bottom, which is sort of the narration of what's going on”

**Acceptance checks derived from the request:**
- Source-to-process direction is obvious without explaining it.
- Connectors align with their source labels and do not float off-center.
- Narrative text is comfortably legible at the actual embed size.
- If OCT2-01 replaces the custom diagram fully, verify the embedded result against these concerns rather than recreating it.

### P1 · OCT2-07 · Retain the communication-network diagram on an appropriate About page

**Scope/status:** About / CommunityHub page; confirmed preservation; precise placement open.

Keep the cleaner homepage treatment that removed the communication-network graphic, but do not discard that graphic. Move it to the CommunityHub/About context; an image/text rotator there is a possibility.

**Exact transcript evidence:**
- **11:12:53–11:13:04, John Petersen (he):** “I actually do like it gone from that page”
- **11:13:16–11:13:29, Madeleine Faubert:** “I don't think that that makes sense. These are, when you say to engage, these are all like applications or mediums in which our content is displayed.”
- **11:14:13–11:14:20, John Petersen (he):** “that communication diagram could be on the community hub page. I just don't think we should totally lose it.”
- **11:14:20–11:14:37, John Petersen (he):** “Maybe it could be on the about us page”

**Acceptance checks derived from the request:**
- The diagram remains in the site’s content inventory and appears in a relevant explanatory context.
- Do not add it as an Engage product/medium slide: that proposal was rejected.
- Preserve the reduced clutter of the page from which it was removed.
- Record the chosen About/CommunityHub destination; meeting did not conclusively name a route.

**Chronology:**
- 11:13:04: John suggests putting it among Engage slides.
- 11:13:16: Madeleine rejects that because Engage contains media/applications; John accepts.
- 11:14:13–11:14:46: CommunityHub/About is the proposed new home.

### P1 · OCT2-08 · Replace the pixelated photograph with its original high-resolution image

**Scope/status:** Photo shown during About / product review; confirmed; original deck shared in meeting.

Retrieve the original photograph from the presentation John shares instead of using a screenshot of a slide. Export/copy the image asset itself, not the whole slide. Access initially fails, but John grants it and Kwaku confirms the high-resolution original is visible.

**Exact transcript evidence:**
- **11:14:46–11:14:51, John Petersen (he):** “this again looks so pixelated, that photo”
- **11:15:04–11:15:06, Kwaku(he/him):** “It's from a screenshot.”
- **11:16:31–11:16:47, John Petersen (he):** “one place you can grab that photo that was low resolution, what I just pasted in here”
- **11:17:12–11:17:14, John Petersen (he):** “All right, you do now.”
- **11:17:26–11:17:29, Kwaku(he/him):** “This is very high resolution.”
- **11:17:42–11:17:48, Madeleine Faubert:** “that's gonna save the entire slide”

**Acceptance checks derived from the request:**
- Identify the exact image and deck/slide from the recording, rather than assuming it is the earlier missing October 1 asset.
- Save the actual image at its available native resolution, without slide UI, surrounding text or unintended crop.
- Replace the screenshot wherever that same photo is used; inspect it at its displayed size.
- Verify current access live before calling it blocked: access was granted during this meeting.

### P1 · OCT2-09 · Record source URLs and slide numbers for extracted assets

**Scope/status:** Asset sourcing workflow; confirmed.

Keep a traceable source record for presentation imagery, including the presentation link, slide number/ID and image identity, so temporary screenshots can later be replaced with originals.

**Exact transcript evidence:**
- **11:16:16–11:16:31, John Petersen (he):** “Report what the slide number is. You're grabbing it from, so you can go back and get high res.”
- **11:16:31–11:16:47, John Petersen (he):** “make sure that you've got the track record that lets you go back and get the high-quality stuff later”

**Acceptance checks derived from the request:**
- Each newly extracted presentation image has a source presentation URL and slide reference.
- The original asset and any temporary screenshot are clearly distinguished.
- A reviewer can return to the source without searching the recording again.

### P2 · OCT2-27 · Review the revised website with Madeleine before the conference audience arrives

**Scope/status:** Review / release workflow; confirmed offer and near-term timing; no message sent by this extraction.

Prepare a reviewable link after simplifying the site and request Madeleine’s feedback that evening or the next morning. The stated first audience is Sunday; John says he has no further review time. Prioritize less noise and leave uncertain additions out.

**Exact transcript evidence:**
- **12:22:32–12:22:42, John Petersen (he):** “Sunday is the first time people would start looking at it.”
- **12:22:48–12:23:00, John Petersen (he):** “if in doubt, you know. leave it out.”
- **12:22:59–12:23:14, Madeleine Faubert:** “send me the link on like this evening or tomorrow morning”
- **12:25:59–12:26:09, Madeleine Faubert:** “if I don't respond quick, you can always reach out to me via text.”

**Acceptance checks derived from the request:**
- Create a reviewable preview with the final decisions implemented and unresolved points explicitly listed.
- Check desktop and phone readability, carousel behavior, CTA destinations, image quality and the Building Dashboard exception before review.
- Offer Madeleine the preview through the agreed workflow when the user separately authorizes sending; this extraction sends nothing.
- Interpret evening/tomorrow/Sunday relative to the meeting date, October 2, 2026: Oct2 evening, Oct3 morning, Oct4 audience.

### P2 · OCT2-28 · Resolve exactly which hosting/domain/authentication access is missing

**Scope/status:** Deployment handoff / access; confirmed follow-up; actual current blocker must be verified.

Clarify the precise missing access with Gaurav, copying John as requested in the meeting. Distinguish existing DigitalOcean access from domain-manager and Firebase/authentication access. John thought access had already been supplied, so give a concrete list of what is missing rather than a general request.

**Exact transcript evidence:**
- **12:24:09–12:24:29, John Petersen (he):** “Here's what I need.”
- **12:24:58–12:25:04, John Petersen (he):** “copy me to send to Gaurav”
- **12:25:05–12:25:16, Tanaka Ndove:** “just make sure you're also specific”
- **12:25:30–12:25:40, Kwaku(he/him):** “I know I have access to DigitalOcean, and that is not what I was asking about. I was asking about Firebase for authentication and all that.”
- **12:25:40–12:25:50, John Petersen (he):** “I'm actually going to send an email to Gaurav right now.”

**Acceptance checks derived from the request:**
- Inventory the actual hosting/deployment route and required roles before assuming DNS or Firebase is necessarily needed for the static site.
- List confirmed access and each precise missing capability.
- Keep domain cutover and product authentication requirements distinct.
- Record any reply from Gaurav before marking access resolved.
- Treat the transcript as an action-item source, not authorization for this extraction to email or expose credentials.

### P2 · OCT2-29 · Prepare and validate the communityhub.cloud deployment handoff early

**Scope/status:** Deployment handoff; meeting request; not an instruction to deploy during task extraction.

Prepare the production build/handoff and resolve hosting problems before the Sunday audience. John asks to port while finishing the site, but Kwaku reports missing access and a possible ZIP handoff. The task requires a working deployment route and validation, not an assumption that it is already live.

**Exact transcript evidence:**
- **12:23:13–12:23:29, John Petersen (he):** “when you go to communityhub.cloud, you're seeing this.”
- **12:23:29–12:23:46, Kwaku(he/him):** “I have to send them a zip or something.”
- **12:23:46–12:23:58, John Petersen (he):** “go ahead and port it while you're working on it.”
- **12:24:40–12:24:58, John Petersen (he):** “we don't want to get to a situation where you develop something and it's not actually, it can't actually go up.”

**Acceptance checks derived from the request:**
- Produce a concrete build or handoff package using the verified production hosting method.
- Resolve access and operational blockers from OCT2-28 before changing the live domain.
- Validate the final served domain, routes, assets and core interactions after an authorized cutover.
- Keep packaged, delivered, deployed and verified states distinct.
- No deployment is performed or implied by this transcript-extraction task.

## Corrections to the secondary task list

1. **“Nothing interactive” on homepage is too absolute.** Optional arrows remain, and Building Dashboard explicitly retains its inner scroll at 12:11:45. Product-page interactions remain useful.
2. **“Any link goes inside the legend” is superseded.** Final agreement: one Learn more below MAIN COPY (12:06:56–12:07:54), then no homepage Open full size (12:10:28–12:10:43).
3. **Legends are not mandatory everywhere.** John explicitly permits none for Voices at 11:57:14–11:57:30 and 11:59:47–12:00:01.
4. **“Do not replace the diagram” misses the reversal.** John first thinks the deck older (11:06:37), discovers the updated diagram (11:06:53), and agrees to Kwaku’s replacement proposal (11:06:59–11:07:17). Reuse source rather than a redundant recreation.
5. **Two graphics were conflated.** Platform-flow diagram polish (11:03) and removed communication-network graphic relocation (11:13) are separate discussions. Preserve the latter in About/CommunityHub; do not use that move to retain a duplicate custom platform diagram.
6. **Real story/source connections do not authorize extra homepage CTAs.** Retain source Google Slides connections for actual content and product experience; respect the later one-Learn-more homepage decision.
7. **Outline styling and a different pause color were suggestions.** Final firm requirements are consistent Learn more controls with one purpose and recognizable circled pause controls. Do not turn this into an unsupported exact color/width mandate.
8. **Do not import unrelated scope.** Green Edge Fund/indoor-air pilot, script-writing, transport and personal discussion are not website fixes.

## Unresolved points to preserve

- **Building Dashboard carousel while reading:** John’s last direction is multiple contexts. Madeleine’s concern that rotation interrupts inner scrolling (12:14:47–12:15:18) is not answered with an interval or pause rule. Treat considerate pause/resume as an implementation decision to test, not as a quoted specification.
- **Exact carousel roster:** suggested eight Voices positions/five dashboards are examples, not fixed counts. Verify actual sources; Hamilton explicitly excluded until permission.
- **Placement:** full Story of Dashboard and relocated communication-network graphic need coherent destinations, but exact routes were not settled.
- **Contrast:** green phrases over trees require visual judgment.
- **Photo access:** denied initially, granted at 11:17:12, high-resolution original visible afterward. Verify current access before retaining a blocker.

## Previously verified recording references

- Story of Dashboard host: https://environmentaldashboard.org/story-of-dashboard. Updated platform diagram is embedded slide14 (local evidence frame000310.jpg).
- Original replacement image: **251024 AASHE - OC C-Neutral - Leveraging Learning Opportunities**, slide55, **C-Neutral exhibit @ Science Center**. This is the three-person carbon-neutral exhibit photo, not the previous meeting’s phone-user photo. Its exact deck URL was not visible in the reviewed frames.
- Asset IDs above come from earlier direct frame review. This reread makes no new live-source availability claim.

## Verification boundary

This matrix is the original-source acceptance standard, not an implementation pass/fail result. Main audit must inspect the supplied repository/commit and visibly test changes against it. No messages to CJ, other people, deployment or website edits were performed by this extraction.

Transcript SHA-256: `0cfc04b82b042688b3c19ec9186005156a03a5a11cd757c2110ada92fde2a366`.
