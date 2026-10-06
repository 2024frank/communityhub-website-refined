# Engage column order

Kwaku confirmed with the Web Embeddables screenshot that Engage should match the other product chapters: icon, heading, original description and Learn more on the left; photograph or live preview with its context and caption on the right. No new copy or CTA was requested.

Removed the five Engage-only reversal declarations in pages_home_delivery.css. All three tabs now inherit the common text-first layout and the existing responsive reading sequence. This fixes the source of the inconsistency rather than adding another override.

Research: W3C Meaningful Sequence (https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) and Consistent Navigation (https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html). Avoid visual order that contradicts the reading order, alternating column positions between comparable products, separating a caption from its media, and changing content while correcting layout.

Built October 3, 2026 at 01:22:13: all38 pages built, all11 contract tests passed, git diff --check passed. Development preview initially retained its cached imported CSS; touching the stylesheet entrypoint invalidated that cache without a content change.

Desktop1440x900: visually checked Digital Signage, Phone App and Web Embeddables. Copy occupies x84–545 and media x617–1356; complete original descriptions and captions remain visible. Screenshots in workspace output/oct2-refined-audit/screenshots: engage-text-left-signage-desktop.png and engage-text-left-web-desktop.png. On390x844, selecting Web Embeddables exposed its description and Learn more as the existing first mobile scene; resizing the live shared browser also exposed existing scene restoration instability, so no claim is made that swipe/restoration issues are fixed.

Local only; no commit, push or deployment.
