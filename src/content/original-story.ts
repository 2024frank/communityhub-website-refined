/** The actual published presentation linked by Environmental Dashboard. */
export const STORY_SOURCE = 'https://environmentaldashboard.org/story-of-dashboard';
export const STORY_DECK = 'https://docs.google.com/presentation/d/e/2PACX-1vQfRVKa9JNw8GIXMMFZYf0XpjAwswzrJftYMBl7cBu-cJpzIgNcjBZo1X1jjMBrgofuabYMISCxdDLs';
export function originalStory(id = "how", heading = "Story of Dashboard", level: "h1" | "h2" = "h2"): string {
  return `<section class="original-story original-presentation" id="${id}" data-original-story data-nofit data-stable-start aria-labelledby="${id}-h"><div class="wrap" data-story-scene="all">
    <${level} class="${level}" id="${id}-h">${heading}</${level}>
    <div class="original-presentation-frame"><iframe data-original-presentation data-defer-src="${STORY_DECK}/embed?start=true&amp;loop=false&amp;delayms=9000" title="Original Story of Dashboard presentation" loading="lazy" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
  </div></section>`;
}
