/** The latest user revision keeps only the original Who We Are composition.
 * Its existing hands/product motif is the single animation focal point.
 */
export const COMMUNITY_HUB_MISSION = 'Community Hub is a community-centered communication platform, with tools to gather data and put it on display. With them, organizations, neighborhoods and cities engage, educate, motivate and empower their communities, building connection and resilience in a rapidly changing environment.';

/** The optional arrow is the site's trusted shared SVG, supplied by home.ts. */
export function renderPlatformExplanation(aboutArrow = ''): string {
  return `<section class="why identity-explanation" id="problem" data-nofit data-communication-sequence data-identity-explanation data-stable-start data-sequence-phase="complete" aria-labelledby="why-h">
  <div class="wrap why-grid">
    <div class="why-copy" data-identity-content data-story-scene data-stable-start>
      <h2 class="h2 why-sol" id="why-h">Who we are</h2>
      <div class="roll on" data-roll role="img" aria-label="The Community Hub hands">
        <img src="assets/ro-cv.png" alt="" style="--k:-2" width="120" height="120"><img src="assets/ro-cwd.png" alt="" style="--k:-1" width="120" height="120"><img class="roll-c" src="assets/ro-ch.png" alt="" width="132" height="131"><img src="assets/ro-bd.png" alt="" style="--k:1" width="120" height="120"><img src="assets/ro-cal.png" alt="" style="--k:2" width="120" height="120">
      </div>
      <p>${COMMUNITY_HUB_MISSION}</p>
      <a class="pc-a why-a" href="about.html">More about Community Hub ${aboutArrow}</a>
      <p class="why-designed">Communication platform designed to:</p>
      <ul class="why-aims">
        <li>Accelerate positive economic, social and environmental development,</li>
        <li>Enhance connection among organizations,</li>
        <li>Situate individual decision-making in a community context,</li>
        <li>Strengthen individuals' sense of connectedness and belonging,</li>
        <li>Share and celebrates pro-community thought and action,</li>
        <li>Promote individual & environmental health and climate resilience,</li>
        <li>Engages, educates, motivates & empowers community!</li>
      </ul>
    </div>
  </div>
</section>`;
}
