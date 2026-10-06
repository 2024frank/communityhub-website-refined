# Current Community Hub redesign brief

Kwaku's explicit October 4 direction supersedes historical visual prescriptions in older project notes: create your own coherent design and component implementation. Take responsibility for purposeful feature decisions. The existing website and research are sources for truthful content, real media, product behavior and lessons learned; they are not a visual template to imitate or a mandate to keep the old styling architecture.

Use the project skill at `.agents/skills/communityhub-project-guide/SKILL.md` (machine-local original: `/Users/kwaku/.gemini/config/skills/communityhub-project-guide/SKILL.md`). It routes to the original copy, eight meetings, John Petersen's feedback, brand/media, product demos and verification resources.

## Design and control contract

- Prioritize clarity, consistency, responsiveness and freedom from distraction. Make routine design decisions without asking Kwaku to choose every detail. Each visible feature must serve a visitor need.
- Establish shared tokens and components for the redesigned surfaces. Replace obsolete conflicting owners within the affected scope rather than stacking more high-specificity overrides on the old look.
- Give controls of the same role the same appearance and behavior. If a button role uses a gray background, consistently use that treatment for that role. Define primary/secondary states deliberately and reuse them; do not invent a different button on each section.
- Text links use a consistent underline, spacing, color and hover/focus treatment. A control must not randomly change from a filled button to an underlined link in another context. Keep navigation links semantically links and in-page actions semantically buttons as appropriate; appearance must make their behavior predictable.
- Decorative boxes and labels must not masquerade as clickable controls. Remove competing or duplicate actions and avoid feature clutter.
- Treat video composition separately at laptop and phone sizes. A laptop should receive an appropriately wide layout; a phone should receive a deliberate responsive layout. Inspect the intrinsic ratio, container dimensions, crop, poster/loading/fallback, overlays and controls. A smaller landscape source alone is not a phone layout. Keep essential content visible and avoid distortion or excessive darkening.
- Keep original factual claims, quotations and attributions truthful, real media authentic, and native product behavior meaningful. Do not invent testimonials, statistics, product capabilities or filler slogans.

## Story and section contract

Kwaku's latest October 4 clarification: the page must tell one connected story. Every section needs a clear purpose, must follow meaningfully from what came before, and must prepare the visitor for the next section or a useful destination. Choose the sequence yourself from the real content and visitor needs.

- Define the one visitor question each section answers, the information or demonstration needed to answer it, and the next step it makes understandable. The reader should know why this section is here and why the next step follows.
- Include exactly what belongs to that purpose: relevant explanation, evidence, media and necessary controls. Relocate unrelated material to its proper section or destination; remove newly generated filler and repeated pitches. Retain essential source facts and context so brevity does not leave gaps. Do not silently discard original content merely to simplify a layout.
- Keep the heading, copy, visuals, examples, captions and action about the same subject. A section is not a container for unrelated features or a standalone design exercise.
- Make transitions work through meaning, sequence and consistent interaction. Do not manufacture connecting slogans or add a button to every section. When an action exists, its label, surrounding explanation and real destination must agree.
- Review the page as a continuous visitor journey, including phone reading order, rather than approving isolated attractive screenshots. Remove duplication, abrupt topic changes, missing explanations and competing destinations. For the current header/hero pass, check its promise and handoff into the next existing section; do not redesign later sections before their approval stage.

## Current workflow

Work in this checkout; verify the actual preview belongs to it (currently `http://127.0.0.1:4390/`). The sibling previews on 4327 and 4330 are other projects. Inspect the current render because the rejected 2:15 PM screenshot is a historical baseline.

Build and verify the current header/hero first, then show Kwaku actual laptop and phone evidence and wait for section approval. Shared controls touched in this step need regression coverage in their other contexts, but this is not approval to redesign the rest of the site at once. Preserve keyboard access, reduced motion, native embedded controls, honest data/error states and safe-area handling.

Codex is supervising the work at Kwaku's request. Treat consolidated review feedback as actionable evidence, make the corrections, and show the tested result. Do not report a pass based only on old screenshots, filenames, static source checks or an iframe load event. Keep the review bounded and avoid repeated aesthetic redesign loops after a direction is accepted. This local task does not authorize publishing or deployment.
