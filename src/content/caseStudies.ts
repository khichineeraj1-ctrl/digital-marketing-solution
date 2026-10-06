export const CS_SERVICES = [
  { value: "gbp", label: "Google Business Profile" },
  { value: "influencer", label: "Influencer Marketing" },
  { value: "seo", label: "SEO" },
  { value: "ads", label: "Google & Meta Ads" },
] as const;
export type CsService = (typeof CS_SERVICES)[number]["value"];

export type Metric = { value: string; label: string };
export type CaseStudy = {
  slug: string; client: string; industry: string; city: string; services: CsService[];
  title: string; metaTitle: string; description: string; summary: string; duration: string;
  challengeMd: string; solutionMd: string; resultsMd: string; metrics: Metric[];
  quote?: { text: string; name: string; role: string };
  status: "draft" | "published";
  sample: boolean; // illustrative content: noindex, not in sitemap, shows a banner
  published: string; modified: string;
};

/** Illustrative layout samples only — NOT real clients or results. Replace via /admin/case-studies. */
export const seedCaseStudies: CaseStudy[] = [
  {
    slug: "sample-restaurant-chain-business-profile-footfall",
    client: "Sample Restaurant Chain", industry: "Restaurants", city: "Pune", services: ["gbp"],
    title: "How a restaurant chain turned local search into more walk-ins",
    metaTitle: "Restaurant Chain Case Study: Local Search Growth",
    description: "How a multi-outlet restaurant chain used Google Business Profile management to lift direction requests and reviews across every outlet.",
    summary: "Centralised profile, review and post management across all outlets.", duration: "6 months",
    challengeMd: "Each outlet had its own half-finished profile. Hours were wrong during festivals, reviews went unanswered for weeks, and photos were years old.\n\nThe team had no way to see which outlets were falling behind.",
    solutionMd: "## Cleaned up every profile\n\nWe audited all outlets, fixed categories, pins and hours, and set special hours for every festival in advance.\n\n## Made reviews a daily routine\n\n- One inbox for every outlet's reviews\n- Reply templates matched to the brand's tone\n- QR codes on bills linking straight to the review form",
    resultsMd: "Outlets that were once invisible in the map pack began appearing for 'near me' searches, and managers now see a monthly scorecard for their own outlet.",
    metrics: [{ value: "+64%", label: "Direction requests" }, { value: "2.1x", label: "Review volume" }, { value: "4.2 → 4.6", label: "Average rating" }],
    quote: { text: "We finally know which outlets need attention each week.", name: "Sample Name", role: "Head of Marketing" },
    status: "published", sample: true, published: "2026-09-01", modified: "2026-10-01",
  },
  {
    slug: "sample-auto-dealer-group-meta-ads-lead-cost",
    client: "Sample Auto Dealer Group", industry: "Automotive", city: "Multiple cities", services: ["ads"],
    title: "Cutting cost per lead across 15 city campaigns for a dealer group",
    metaTitle: "Auto Dealer Case Study: Lower Cost per Lead",
    description: "How a dealer group lowered cost per lead by cloning winning Meta and Google campaigns city by city, with budget caps and automated pauses.",
    summary: "City-wise targets, automated rules and cross-channel reporting.", duration: "4 months",
    challengeMd: "Campaigns were built by hand for each city. Some overspent, others stalled, and nobody could compare Google and Meta results on the same basis.",
    solutionMd: "## Cloned what already worked\n\nWe duplicated the best-performing campaign into new cities with the right location, catalogue and creative for each.\n\n## Put guardrails around spend\n\n- Monthly lead targets and budgets per city\n- Automatic pauses when cost per lead stayed above target\n- One report for Google and Meta",
    resultsMd: "The team now launches a new city in a day instead of a week, and budget moves to the cities that are actually delivering leads.",
    metrics: [{ value: "-38%", label: "Cost per lead" }, { value: "3.1x", label: "Lead volume" }, { value: "15", label: "Cities live" }],
    status: "published", sample: true, published: "2026-09-10", modified: "2026-10-01",
  },
  {
    slug: "sample-beauty-brand-influencer-campaign-roas",
    client: "Sample Beauty Brand", industry: "Beauty", city: "Mumbai", services: ["influencer"],
    title: "A creator-led launch that paid back its media budget",
    metaTitle: "Beauty Brand Case Study: Influencer Launch ROAS",
    description: "How a beauty brand launched a new product with city-matched creators, trackable offer codes and approvals handled in one place.",
    summary: "Matched creators by niche and city, tracked every code and link.", duration: "8 weeks",
    challengeMd: "The brand had worked with influencers before but could not tell which creators drove sales, and briefs and payments were scattered across chats.",
    solutionMd: "## Chose creators for fit, not follower count\n\nWe shortlisted creators by niche, audience city and past brand work.\n\n## Made every creator trackable\n\n- A unique code and link per creator\n- Drafts approved before posting\n- Payments released on delivery",
    resultsMd: "The brand could see exactly which creators and formats sold product, and repeated the winners in the next campaign.",
    metrics: [{ value: "3.4x", label: "Return on ad spend" }, { value: "42", label: "Creators" }, { value: "5.8M", label: "Reach" }],
    status: "published", sample: true, published: "2026-09-18", modified: "2026-10-01",
  },
  {
    slug: "sample-b2b-saas-company-seo-organic-demos",
    client: "Sample B2B SaaS Company", industry: "B2B & SaaS", city: "Bengaluru", services: ["seo"],
    title: "Growing organic demo requests for a B2B SaaS company",
    metaTitle: "B2B SaaS Case Study: Organic Demo Growth",
    description: "How a B2B SaaS company grew organic demo requests by fixing technical issues, building problem-led content and earning relevant links.",
    summary: "Technical fixes, intent-led content and digital PR tied to demo requests.", duration: "9 months",
    challengeMd: "Traffic was mostly branded searches. Product pages competed with each other, the blog answered questions nobody was asking, and the team could not link SEO to pipeline.",
    solutionMd: "## Fixed the foundations\n\nWe resolved crawl and duplicate-page issues and improved page speed on the pages that matter most.\n\n## Built content around buyer problems\n\n- Problem-led guides mapped to the buying journey\n- Comparison and alternative pages\n- Original research that earned links from relevant publications",
    resultsMd: "Organic search became a measurable source of demo requests, and reporting now ties each content cluster to pipeline in the CRM.",
    metrics: [{ value: "3.2x", label: "Organic demo requests" }, { value: "+118%", label: "Non-brand traffic" }, { value: "41", label: "Relevant links earned" }],
    status: "published", sample: true, published: "2026-09-25", modified: "2026-10-01",
  },
];
