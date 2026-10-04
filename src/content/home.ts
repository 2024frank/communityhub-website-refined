import { voicesPreview, buildingPreview, storiesPreview, dataHubPreview, citywidePreview, calendarPreview, previewGallery } from "./home-previews";
import { PRODUCTS } from "./catalog";
import { renderPlatformExplanation } from "./platform_explanation";
/** Homepage executive summary: place, people, mission and three product chapters. */
import type { SiteContext } from "../lib/site";

type Links = readonly (readonly [href: string, label: string])[];
type Pairs = readonly (readonly [string, string])[];
type ProductPanels = readonly (readonly [
  name: string,
  text: string,
  extra: string,
  links: Links,
  media: string,
])[];

export function register(H: SiteContext): void {
  const ARR = H.ARR;
  // The hero plays forward once; the browser controller owns its end-frame hold.
  const hero = `<section class="hv full" aria-label="Community Hub: our place and people"><div class="hv-film" aria-label="Drone video zooming from high above down to downtown Oberlin, Ohio">
  <div class="hv-media">
    <div class="hv-stills" aria-hidden="true" data-hv-stills><i class="on" style="background-image:url(assets/hero-first-frame.jpg)"></i></div>
    <video class="hv-vid" muted playsinline preload="metadata" poster="assets/hero-first-frame.jpg" aria-hidden="true" data-hv-vid>
      <source src="assets/hero-ch-fwd.mp4" type="video/mp4" media="(min-width: 900px)">
      <source src="assets/hero-ch-fwd-720.mp4" type="video/mp4">
    </video>
  </div>
  <div class="hv-scrim" aria-hidden="true"></div>
  <div class="wrap hv-copy">
    <h1 class="hv-h"><span class="hv-premise">It has never been more important</span> <span class="hv-l">to <em>act locally</em> while <em>thinking globally</em></span></h1>
  </div>
  <div class="hv-skip"><span class="hv-prog" aria-hidden="true"><i data-hv-prog></i></span><button class="sec-next" type="button" data-hv-skip aria-label="Skip the video"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
  <a class="hv-next" href="dashboards.html">See it live</a>
</div></section>`;
  const why = renderPlatformExplanation(ARR);
  const signs: Pairs = [
    [
      "eng-sign-daves.jpg",
      "Above the checkout at Dave's Market in MidTown Cleveland, with a code to control the screen by phone",
    ] as const,
    ["hotel-oberlin-sign.jpg", "A lobby sign at the Hotel at Oberlin"] as const,
    [
      "kids-citywide-screen.jpg",
      "Students at a Citywide Dashboard screen in an Oberlin school hallway",
    ] as const,
    [
      "glsc-workshop.jpg",
      "A workshop at the Great Lakes Science Center, Cleveland",
    ] as const,
    [
      "glsc-exhibit.jpg",
      "A screen and touch kiosk at the Great Lakes Science Center, Cleveland",
    ] as const,
    [
      "carbon-neutral-science-center-original.jpeg",
      "The Carbon Neutral Stories exhibit at Oberlin College's Science Center",
    ] as const,
  ];
  const ctl_html = previewGallery("Phone App", [
    {image: "phone-person-water-display.jpg", alt: "A visitor holds the phone controller beside a large display showing Water Use", context: "Phone App · Choosing what appears on a shared display", readableText: "Using a phone to choose what appears on a shared display."},
    {image: "eng-ctl-midtown.jpg", alt: "The MidTown Community Dashboard Screen Controller on a phone, listing Community Calendar, Jobs Board, Community Voices and more", context: "Phone App · MidTown Cleveland controller", readableText: "Visitors pick what the MidTown screen shows from the controller on their own phone."},
    {image: "eng-ctl-story.jpg", alt: "Hands holding a phone showing the Carbon Neutral Stories controller with topics from Heating and Cooling to Live Data", context: "Phone App · Carbon Neutral Stories controller", readableText: "At Oberlin College, the phone chooses which Carbon Neutral Stories topic appears on the exhibit screen."},
  ]);
  const installationNames = ["Dave's Market · MidTown Cleveland", "Hotel at Oberlin", "Oberlin City Schools", "Great Lakes Science Center · Workshop", "Great Lakes Science Center · Exhibit", "Oberlin College · Carbon Neutral Stories"];
  const sign_media = previewGallery("Digital Signage", signs.map(([image, alt], index) => ({image, alt, context: installationNames[index], readableText: alt})));
  const emb_media = calendarPreview("Web Embeddables", false);
  const live = {
    "data-dashboard": buildingPreview(),
    "the-hub": dataHubPreview(),
    "community-calendar": calendarPreview("Community Calendar", false),
    "community-voices": voicesPreview(),
    stories: storiesPreview(),
  };
  // Each product is its own panel inside the section's horizontal story rail.
  function group(
    sid: string,
    head: string,
    tone: string,
    label: string,
    items: ProductPanels,
  ): string {
    const n = items.length;
    const tabs = items
      .map(
        (it, i) =>
          `<button type="button" role="tab" data-eng-tab aria-selected="${i === 0 ? "true" : "false"}">${it[0]}</button>`,
      )
      .join("");
    const controls = `<div class="eng-tabs" role="tablist" aria-label="${label}">${tabs}</div>`;
    function links(go: Links): string {
      return go.slice(0, 1)
        .map(
          ([u], i) =>
            `<a class="pc-a${i ? " pc-a2" : ""}" href="${u}">Learn more ${ARR}</a>`,
        )
        .join("");
    }
    const panels = items
      .map(
        ([
          name,
          text,
          extra,
          go,
          media,
        ]) => `<article class="eng-p" data-eng-panel aria-label="${name}">
      <div class="eng-copy" data-eng-context><div class="product-identity"><img class="product-identity-icon" src="assets/${PRODUCTS.find(product => product.name === name)?.icon || "icon-ch.png"}" alt="" width="48" height="48"><h3>${name}</h3></div>${text ? `<p>${text}</p>` : ""}${extra}<p class="eng-go">${links(go)}</p></div>
      <div class="eng-media" data-eng-view>${media}</div>
    </article>`,
      )
      .join("");
    const snaps = Array.from({ length: n - 1 }, (_, index) => index + 1)
      .map(
        (k) => `<i class="eng-snap" style="--k:${k}" aria-hidden="true"></i>`,
      )
      .join("");
    return `<section class="eng tone-${tone}" id="${sid}" data-i="0" data-nofit style="--n:${n}" aria-labelledby="${sid}-h">
  ${snaps}
  <div class="eng-stage">
    <div class="wrap"><div class="chapter-heading"><h2 class="h2 eng-label" id="${sid}-h">${head}</h2><span class="chapter-connector" aria-hidden="true">→</span>${controls}</div>
    <div class="eng-panels story-rail" data-story-rail role="region" aria-label="${label}" tabindex="0">${panels}</div>
  </div></div>
</section>`;
  }
  const engage = group("engage", "Engage", "lime", "Ways we engage", [
    [
      "Digital Signage",
      "Easy to use interactive digital signage makes it simple for multiple stakeholders to post and update content that connects community members with both organization and location-specific and community-wide information and events",
      "",
      [["digital-signage.html", "See Digital Signage"] as const],
      sign_media,
    ] as const,
    [
      "Phone App",
      "Our phone application is easily customized to meet the communication goals of each community. Viewers can directly access content that interests them on their phone and can also control current content displayed on the digital sign nearest to them by scanning a QR code",
      "",
      [["phone-app.html", "See the Phone App"] as const],
      ctl_html,
    ] as const,
    [
      "Web Embeddables",
      "CH content, such as community calendars, real-time data visualizations, and navigable dashboards can be easily customized and embedded into the websites of any partner organization",
      "",
      [["web-embeddables.html", "See Web Embeddables"] as const],
      emb_media,
    ] as const,
  ]);
  const untitled = (html: string) => html.replace(/<h4\b[^>]*>[\s\S]*?<\/h4>/g, "");
  function plain(text: string, media: string): string {
    return `<article class="eng-p home-plain"><div class="eng-copy"><p>${text}</p></div><div class="eng-media">${media}</div></article>`;
  }
  function named(name: string, text: string, href: string, media: string): string {
    const icon = PRODUCTS.find(product => product.name === name)?.icon || "icon-ch.png";
    return `<article class="eng-p" aria-label="${name}"><div class="eng-copy"><div class="product-identity"><img class="product-identity-icon" src="assets/${icon}" alt="" width="48" height="48"><h3>${name}</h3></div><p>${text}</p><p class="eng-go"><a class="pc-a" href="${href}">Learn more ${ARR}</a></p></div><div class="eng-media">${media}</div></article>`;
  }
  const educate = `<section class="home-stop" id="products" aria-labelledby="products-h">
  <div class="wrap"><h2 class="h2" id="products-h">Educate</h2>
    ${plain("Technology to monitor, display and compare real-time resource use in schools, businesses and public facilities.", untitled(live["data-dashboard"]))}
    ${plain("Animated display of energy and water use and environmental conditions for entire organizations and communities.", untitled(citywidePreview()))}
    ${named("Data Hub", "Data Hub is a powerful and intuitive package of online data visualization tools. Data Hub makes it easy for managers, educators, students and communicators to translate real-time data acquired from a variety of sources into compelling visualizations that are easily understood and can be shared on websites and digital signage to tell stories of impact and opportunity.", "the-hub.html", live["the-hub"])}
    ${named("Stories", "Illustrated stories explain how local systems work, starting with nine from Oberlin College's Sustainable Infrastructure Program. They play on screens, phones and the web.", "stories.html", live["stories"])}
  </div>
</section>`;
  const products = educate +
    group(
      "motivate",
      "Motivate and Empower",
      "green",
      "Ways we motivate and empower",
      [
        [
          "Community Voices",
          "Community Voices combines images and words drawn from the full diversity of a community to celebrate and cultivate thought and actions that advance ecological, economic, and social resilience. Community Hub’s unique software makes it easy to build, manage, organize and customize content into powerful messages for display on digital signage, phone apps, and websites.",
          `<p>images and words drawn from the full diversity of a community</p>`,
          [
            ["community-voices.html", "See Community Voices"] as const,
          ],
          live["community-voices"],
        ] as const,
        [
          "Community Calendar",
          "Engaged residents who can easily share information and are encouraged to participate are critical to community vibrancy and resilience. Our calendar application is a unique crowd-sourced venue that makes it easy for organizations and community members to share and promote events and announcements within organizations, neighborhoods, and whole cities.",
          "",
          [["community-calendar.html", "See the Community Calendar"] as const],
          live["community-calendar"],
        ] as const,
      ],
    );
  const seeLive = `<section class="home-stop home-see-live" id="see-live"><div class="wrap"><a class="pc-a" href="dashboards.html">See it live</a></div></section>`;
  const gaps = [1, 2, 3].map((n) => `<section class="home-gap home-gap-${n}" aria-hidden="true"></section>`).join("");
  const body = hero + why + engage + products + seeLive + gaps;
  const html_out = H.page(
    "index",
    "Community Hub",
    "Community Hub is a community-centered communication platform. Our software connects people with their community and the natural systems upon which we depend, on screens, phones and websites for neighborhoods, cities, museums, campuses and schools.",
    body,
    {
      current: "index",
      jsonld: H.ORG_LD,
      full_title: "Community Hub | Act locally, think globally",
    },
  );
  H.write_page("index", html_out);
}
