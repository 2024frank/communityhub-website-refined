# Destination action consistency, October 3

Kwaku reported that the green testimonial destination actions and plain “More about Community Hub” link communicated the same function with different styling. The latest correction is the authority for this refinement.

## Change

A shared destination_actions.css layer gives standalone destination links the same pine background, white 16px bold Lato label, 4px corners, 10px by 18px padding, minimum 44px target, darker hover and visible keyboard outline. Existing class families cover product, testimonial, demo, source and case-study actions. Explicit destination-action markers identify standalone links that previously shared hand-link with inline prose. Native URLs, link targets and content remain unchanged. Inline prose, directory rows and local selectors retain their distinct roles. Mobile header visibility remains controlled by its existing breakpoint.

## Design evidence

Read W3C Link Pattern (https://www.w3.org/WAI/ARIA/apg/patterns/link/) and Button Pattern (https://www.w3.org/WAI/ARIA/apg/patterns/button/). Preserve native anchor semantics while communicating repeated destination actions consistently. Avoid mixed plain/filled/outlined treatments for the same purpose, blanket anchor styling, and fixed-width long labels that overflow phones. The existing pale surface and pine palette remain authoritative.

## Verification

Final build: October 3 at 01:15:50, local checkout based on 655e1a2. All 38 routes built and all 11 site contracts passed. git diff --check passed. The Impeccable detector hook is enabled; no separate manual detector run was added.

Actual browser review covered 1440 by 900 desktop and 390 by 844 phone views: homepage About action, testimonial action, Learn more action, and Teacher toolkit external lesson-search action. Computed homepage destination values match: rgb(36,75,56) background, white labels, 16px bold type, 4px corners and minimum 44px target. Long lesson-search label wraps to two lines without horizontal overflow; document and viewport are both 390px. It remains reachable by keyboard. Local product tabs and grade filters remain distinct. Clicking More about Community Hub opens about.html; clicking Learn more opens digital-signage.html.

Evidence: ../../../output/oct2-refined-audit/screenshots/cta-who-we-are-desktop.png, cta-who-we-are-mobile.png, cta-testimonial-mobile.png, cta-learn-more-desktop.png and cta-resources-mobile.png. Independent visitor critique passed after reviewing the final captures and is recorded in output/oct2-refined-audit/cta-consistency-audit.md in the workspace root. Source inventory covered all 38 routes; visual review covered representative views, not all 38 pages.

Changes remain local and unpublished. Earlier reported swipe timing/restoration behavior is a separate unresolved review item.
