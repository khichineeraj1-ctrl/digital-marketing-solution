import { assertSlugs } from "@/lib/slug";

export const CATEGORIES = ["Local SEO", "SEO", "Ads", "Influencers"] as const;
export type Block = { t: "h2" | "h3" | "p"; text: string } | { t: "ul"; items: string[] };
export type Post = {
  slug: string;
  title: string; // H1
  metaTitle: string;
  description: string;
  published: string; // ISO date
  modified: string;
  author: string;
  readMins: number;
  category: "Local SEO" | "SEO" | "Ads" | "Influencers";
  related: { label: string; path: string }[];
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "google-business-profile-optimization-checklist",
    title: "Google Business Profile Optimisation: A 12-Point Checklist",
    metaTitle: "Google Business Profile Optimisation Checklist",
    description: "A practical 12-point checklist to optimise your Google Business Profile — categories, photos, reviews, posts and more — so you show up in local results.",
    published: "2026-09-01",
    modified: "2026-10-01",
    author: "Editorial Team",
    readMins: 6,
    category: "Local SEO",
    related: [
      { label: "Google Business Profile management software", path: "/google-business-profile-management" },
      { label: "Run a free local SEO audit", path: "/google-business-profile-management/features/local-seo-audit" },
    ],
    body: [
      { t: "p", text: "Google says local results are ranked mainly on relevance, distance and prominence. You cannot change distance, but you control the rest. Use this checklist on every location you manage." },
      { t: "h2", text: "Get the basics exactly right" },
      { t: "ul", items: ["Use your real-world business name — no keywords or taglines added (it risks suspension).", "Pick the most specific primary category, then add only relevant secondary ones.", "Add a precise address and pin, service areas if you travel to customers, and a local phone number.", "Set regular hours and special hours for every holiday and festival."] },
      { t: "h2", text: "Show what you actually do" },
      { t: "ul", items: ["List services or products with short descriptions (and prices where sensible).", "Write a clear business description in natural language, without stuffing keywords.", "Add attributes that apply, such as wheelchair access or online appointments.", "Link to a booking or enquiry page, not just your home page."] },
      { t: "h2", text: "Build trust and activity" },
      { t: "ul", items: ["Upload real, recent photos of the premises, team, products and work every month.", "Ask happy customers for reviews with a direct link, and never offer incentives or filter who you ask.", "Reply to every review — good and bad — politely and promptly.", "Publish a post weekly: offers, events or updates."] },
      { t: "p", text: "Finish by checking performance monthly: calls, direction requests and website clicks tell you whether changes are working. Doing this by hand for many locations is slow, which is where a multi-location tool pays for itself." },
    ],
  },
  {
    slug: "google-ads-vs-meta-ads",
    title: "Google Ads vs Meta Ads: Where Should You Spend First?",
    metaTitle: "Google Ads vs Meta Ads: Where to Spend First",
    description: "Google Ads captures demand that already exists; Meta Ads creates it. Learn how to split your first budget between them based on your business model.",
    published: "2026-09-10",
    modified: "2026-10-01",
    author: "Editorial Team",
    readMins: 5,
    category: "Ads",
    related: [
      { label: "Google Ads management", path: "/ads-management/google-ads" },
      { label: "Meta Ads management", path: "/ads-management/meta-ads" },
    ],
    body: [
      { t: "p", text: "The simplest way to think about it: Google Ads reaches people who are searching for something now, while Meta Ads reaches people who might want it but are not looking yet." },
      { t: "h2", text: "When Google Ads usually comes first" },
      { t: "ul", items: ["People already search for what you sell (emergency services, clinics, 'near me' queries).", "You have a clear page to send them to and a way to track calls or forms.", "Your margin supports paying for clicks on competitive keywords."] },
      { t: "h2", text: "When Meta Ads usually comes first" },
      { t: "ul", items: ["Your product is visual or impulse-driven, or people do not know to search for it.", "You are launching something new and need awareness.", "You want to retarget visitors and past customers cheaply."] },
      { t: "h2", text: "A sensible starting split" },
      { t: "p", text: "Many local businesses start with most of the budget on Google search for high-intent queries and a smaller share on Meta for offers and retargeting, then shift based on cost per lead after a few weeks of data. Measure both on the same metric — cost per qualified lead — not clicks." },
    ],
  },
  {
    slug: "how-to-run-an-influencer-campaign",
    title: "How to Run an Influencer Campaign, from Brief to Payout",
    metaTitle: "How to Run an Influencer Campaign Step by Step",
    description: "A step-by-step guide to planning an influencer campaign: setting goals, choosing creators, writing briefs, tracking results and paying creators fairly.",
    published: "2026-09-18",
    modified: "2026-10-01",
    author: "Editorial Team",
    readMins: 6,
    category: "Influencers",
    related: [
      { label: "Influencer marketplace for brands", path: "/influencer-marketplace/for-brands" },
      { label: "Join as a creator", path: "/influencer-marketplace/for-influencers" },
    ],
    body: [
      { t: "p", text: "Good influencer campaigns are planned like any other performance channel: a goal, a budget, a trackable link and a clear report at the end." },
      { t: "h2", text: "1. Set one goal" },
      { t: "p", text: "Pick awareness, traffic, store visits or sales. The goal decides the creator type, the format and how you measure." },
      { t: "h2", text: "2. Choose creators who fit, not just who are big" },
      { t: "ul", items: ["Match niche and audience city to your customer.", "Check recent posts for genuine comments, not only likes.", "Review past brand collaborations for quality and disclosure."] },
      { t: "h2", text: "3. Write a brief that leaves room for creativity" },
      { t: "p", text: "Cover the objective, key message, deliverables, dates, mandatory disclosure and do-nots. Avoid scripting every line; audiences trust creators who sound like themselves." },
      { t: "h2", text: "4. Track and pay" },
      { t: "ul", items: ["Give each creator a unique link or offer code.", "Approve drafts before publishing.", "Pay on delivery, ideally through a protected-payment flow."] },
    ],
  },
  {
    slug: "how-to-get-more-google-reviews",
    title: "How to Get More Google Reviews Without Breaking the Rules",
    metaTitle: "How to Get More Google Reviews (Policy-Safe)",
    description: "Practical, policy-safe ways to get more Google reviews: the right moment to ask, QR codes and links, reply habits, and what Google does not allow.",
    published: "2026-09-24",
    modified: "2026-10-01",
    author: "Editorial Team",
    readMins: 4,
    category: "Local SEO",
    related: [
      { label: "Google review management software", path: "/google-business-profile-management/features/review-management" },
    ],
    body: [
      { t: "p", text: "Reviews influence both whether people choose you and how prominently you appear locally. The goal is a steady flow of honest reviews, not a one-time burst." },
      { t: "h2", text: "Ask at the right moment" },
      { t: "p", text: "Ask right after a positive interaction: after a delivered order, a completed appointment or a handed-over keys. Make it effortless with a direct review link or a QR code on the bill, counter or table." },
      { t: "h2", text: "Make it a habit" },
      { t: "ul", items: ["Add the link to receipts, SMS and WhatsApp follow-ups.", "Train staff to mention it naturally.", "Reply to every review so customers see you listen."] },
      { t: "h2", text: "What Google does not allow" },
      { t: "ul", items: ["Offering discounts, gifts or payment in exchange for reviews.", "Only asking customers likely to be positive (review gating).", "Posting fake reviews or reviewing your own business."] },
      { t: "p", text: "Violations can lead to reviews being removed or profiles being restricted, so build the process around honest, easy feedback." },
    ],
  },

  {
    slug: "seo-audit-checklist",
    title: "SEO Audit Checklist: What to Check First",
    metaTitle: "SEO Audit Checklist: What to Check First",
    description: "A practical SEO audit checklist covering indexing, speed, content, links and tracking, so you know what to fix first and why it matters.",
    published: "2026-09-30",
    modified: "2026-10-01",
    author: "Editorial Team",
    readMins: 5,
    category: "SEO",
    related: [
      { label: "SEO audit service", path: "/seo-services/features/seo-audit" },
      { label: "Technical SEO services", path: "/seo-services/features/technical-seo" },
    ],
    body: [
      { t: "p", text: "An audit is only useful if it ends in a ranked list of actions. Work through these areas in order, because problems higher up the list make everything below less effective." },
      { t: "h2", text: "1. Can search engines find and index your pages?" },
      { t: "ul", items: ["Check Google Search Console's page indexing report for important pages that are excluded.", "Make sure robots.txt and noindex tags are not blocking pages you want to rank.", "Submit an up-to-date XML sitemap and fix redirect chains and broken links."] },
      { t: "h2", text: "2. Is the site fast and usable on mobile?" },
      { t: "p", text: "Most searches happen on phones. Test your key templates for loading speed, layout shifts and tap-friendly design, and fix the slowest pages that carry the most traffic or revenue." },
      { t: "h2", text: "3. Does each page match search intent?" },
      { t: "ul", items: ["Give every target page one clear topic and a unique title and meta description.", "Check that the page type matches the query: guide, product, comparison or local page.", "Merge or remove thin and duplicate pages."] },
      { t: "h2", text: "4. Do you have authority and good internal links?" },
      { t: "p", text: "Review who links to you and which pages earn those links. Then link internally from strong pages to the ones you need to rank, using descriptive anchor text." },
      { t: "h2", text: "5. Can you measure the results?" },
      { t: "p", text: "Set up Search Console and analytics, track leads or sales from organic search, and review progress monthly. If you cannot connect SEO to revenue, the work is hard to defend." },
    ],
  },
];

assertSlugs("post", posts.map((p) => p.slug));
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
