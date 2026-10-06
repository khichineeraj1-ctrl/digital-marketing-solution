import type { Feature, Industry } from "./types";
import { assertSlugs } from "@/lib/slug";

export const seoFeatures: Feature[] = [
  {
    slug: "technical-seo",
    name: "Technical SEO",
    h1: "Technical SEO Services: Crawlability, Speed and Indexing",
    metaTitle: "Technical SEO Services",
    metaDescription: "Fix the crawling, indexing, speed and structure issues that hold a site back. Technical SEO audits and fixes for sites of every size, with clear priorities.",
    intro: "Great content cannot rank if search engines cannot crawl, render and index it. We find the technical problems that quietly cap your organic traffic and fix them in order of impact.",
    benefits: [
      { title: "Crawl and index health", body: "Find blocked pages, redirect chains, duplicate URLs and wasted crawl budget, then fix what stops important pages being indexed." },
      { title: "Core Web Vitals and speed", body: "Improve loading, interactivity and layout stability so pages feel fast on real mobile connections." },
      { title: "Structured data", body: "Add and validate schema so pages are eligible for rich results such as FAQs, products and reviews." },
      { title: "Site architecture", body: "Clean URL structure, internal linking and navigation so authority flows to the pages that earn revenue." },
    ],
    faqs: [
      { q: "How do I know if my site has technical SEO problems?", a: "Common signs are pages missing from Google's index, slow mobile pages, duplicate or thin URLs, and traffic that stays flat despite new content. A technical audit confirms the cause." },
      { q: "Do you need developer access?", a: "Most fixes need a developer. We hand over clear, prioritised tickets and can work with your team or implement changes directly if you give us access." },
    ],
  },
  {
    slug: "content-and-on-page-seo",
    name: "Content and on-page SEO",
    h1: "Content and On-Page SEO Services That Match Search Intent",
    metaTitle: "Content & On-Page SEO Services",
    metaDescription: "Keyword research, content strategy and on-page optimisation built around what your customers actually search for, written to rank and to convert.",
    intro: "Rankings come from pages that answer the search better than anyone else. We map keywords to intent, plan the content that fills your gaps, and optimise every page so it can compete.",
    benefits: [
      { title: "Intent-led keyword research", body: "Group keywords by what people want to do, then choose the ones that bring leads rather than just visits." },
      { title: "Content roadmap", body: "A prioritised plan of new pages and updates, based on your competitors' gaps and your own best opportunities." },
      { title: "On-page optimisation", body: "Titles, headings, internal links and copy tuned for each target query without keyword stuffing." },
      { title: "Refresh what already ranks", body: "Update ageing pages that are close to page one, often the fastest route to extra traffic." },
    ],
    faqs: [
      { q: "How much content do we need?", a: "Quality and coverage matter more than volume. We start with the pages closest to revenue and expand from there." },
      { q: "Do you write the content?", a: "Yes. Writers work from a detailed brief and your subject experts review it so the content is accurate and sounds like you." },
    ],
  },
  {
    slug: "link-building",
    name: "Link building and digital PR",
    h1: "Link Building and Digital PR Services",
    metaTitle: "Link Building & Digital PR Services",
    metaDescription: "Earn relevant, high-quality links through digital PR, partnerships and useful content. No spammy networks, no link schemes that risk penalties.",
    intro: "Links remain one of the strongest signals of authority. We earn them the sustainable way, with newsworthy content, genuine partnerships and outreach to relevant publications, and we avoid anything that breaks Google's spam policies.",
    benefits: [
      { title: "Relevance over volume", body: "A few links from respected, relevant sites beat hundreds from low-quality directories." },
      { title: "Digital PR campaigns", body: "Data stories, expert commentary and tools that journalists and bloggers want to reference." },
      { title: "Link profile clean-up", body: "Review your existing links and address risky patterns before they cause problems." },
    ],
    faqs: [
      { q: "Do you buy links?", a: "No. Paid links and link networks violate Google's spam policies and can lead to ranking loss. We earn links through outreach and useful content." },
      { q: "How long does link building take to show results?", a: "Authority builds gradually. Expect several months of consistent effort before the impact on competitive keywords is clear." },
    ],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    h1: "Local SEO Services for Multi-Location Businesses",
    metaTitle: "Local SEO Services in India",
    metaDescription: "Rank in the map pack and local results for every location: Google Business Profile management, local landing pages, citations and review growth.",
    intro: "Local searches turn into calls and visits quickly. We combine Google Business Profile management, location pages and consistent listings so each outlet appears when nearby customers search.",
    benefits: [
      { title: "Google Business Profile management", body: "Profiles optimised, reviews answered and posts published for every location." },
      { title: "Location landing pages", body: "Unique, useful pages for each outlet or city, not copy-and-paste doorway pages." },
      { title: "Consistent listings", body: "Matching name, address and phone details across the places customers look." },
    ],
    faqs: [
      { q: "Is local SEO different from regular SEO?", a: "They overlap, but local SEO adds proximity and Google Business Profile signals. A strong website helps, and so does a well-managed profile." },
    ],
  },
  {
    slug: "ecommerce-seo",
    name: "E-commerce SEO",
    h1: "E-commerce SEO Services for Online Stores",
    metaTitle: "E-commerce SEO Services",
    metaDescription: "Grow organic revenue with category and product page optimisation, faceted navigation fixes, structured data and content that supports buyers.",
    intro: "Online stores win with well-structured categories, fast pages and product data search engines understand. We optimise the whole catalogue, not just the home page.",
    benefits: [
      { title: "Category and product pages", body: "Optimise the pages that carry buying intent, with unique copy, clear specifications and internal links." },
      { title: "Faceted navigation and duplicates", body: "Control filter and parameter URLs so crawl budget goes to pages worth ranking." },
      { title: "Product and review schema", body: "Eligibility for rich results with price, availability and ratings." },
      { title: "Seasonal planning", body: "Prepare pages ahead of sale and festival peaks, when search demand spikes." },
    ],
    faqs: [
      { q: "Which platforms do you work with?", a: "We work with the common e-commerce platforms and custom builds. Your platform affects what can be changed, and we plan around it." },
    ],
  },
  {
    slug: "seo-audit",
    name: "SEO audit",
    h1: "SEO Audit Services: Find What Is Holding Your Site Back",
    metaTitle: "Professional SEO Audit Services",
    metaDescription: "A thorough SEO audit covering technical health, content, links and competitors, with a prioritised action plan your team can start on immediately.",
    intro: "An audit shows where you stand and what to fix first. We review technical health, content, authority and competitors, then deliver a plan ranked by likely impact and effort.",
    benefits: [
      { title: "Full-site review", body: "Technical, content, links and local signals assessed together." },
      { title: "Competitor gap analysis", body: "See which keywords and pages competitors win that you do not." },
      { title: "Prioritised action plan", body: "Quick wins first, with owners and effort so work can begin straight away." },
    ],
    faqs: [
      { q: "What do I get from an SEO audit?", a: "A written report with findings and a prioritised plan, plus a walkthrough call so your team understands what to do and why." },
      { q: "Can SEO results be guaranteed?", a: "No one can honestly guarantee rankings, because search engines control them. We commit to the work, transparent reporting and measurable goals such as traffic and leads." },
    ],
  },
];

export const seoIndustries: Industry[] = [
  { slug: "real-estate", name: "real estate developers and brokers", title: "Real Estate", searchIntent: "buyers research projects, localities and prices on Google for weeks before enquiring", pains: ["Many near-identical project and locality pages", "Heavy competition from portals", "Leads depend on ranking for location-led queries"], tactics: ["Locality and project pages with genuinely unique content", "Schema and fast mobile pages for listings", "Content on buying guides, prices and legal checks"], faq: { q: "How can a developer compete with property portals in search?", a: "Target specific project, locality and long-tail queries with detailed, original pages, since portals tend to rely on templates. Strong local signals and reviews help too." } },
  { slug: "healthcare", name: "clinics, hospitals and healthcare brands", title: "Healthcare", searchIntent: "patients search symptoms, doctors and treatments, and trust sources that show real expertise", pains: ["High bar for accuracy and trust", "Treatment pages that are thin or copied", "Local and condition searches compete with directories"], tactics: ["Doctor-reviewed treatment and condition pages", "Doctor profiles and clear credentials", "Local SEO for every clinic location"], faq: { q: "Why does healthcare content need extra care for SEO?", a: "Google holds health content to a higher standard for expertise and trust, so pages should be accurate, reviewed by qualified professionals and clearly sourced." } },
  { slug: "education", name: "colleges, schools and coaching institutes", title: "Education", searchIntent: "students and parents compare courses, fees and results, with demand peaking around admissions", pains: ["Strong seasonality", "Hundreds of course and city pages", "Competition from aggregators"], tactics: ["Course pages with fees, eligibility and outcomes", "Content timed ahead of admission and result seasons", "Structured data for courses and events"], faq: { q: "When should institutes start SEO for admissions?", a: "Months before the season, because new pages and links take time to gain traction. Updating existing pages before peak demand also helps." } },
  { slug: "ecommerce", name: "online stores and D2C brands", title: "E-commerce", searchIntent: "shoppers search for products, comparisons and 'best' lists before they buy", pains: ["Duplicate and thin product pages", "Filter URLs wasting crawl budget", "Dependence on paid ads for traffic"], tactics: ["Category page optimisation and clean faceted navigation", "Product and review schema", "Buying guides that capture early research"], faq: { q: "Can SEO reduce our dependence on paid ads?", a: "Over time, yes. Organic traffic compounds, so it can lower blended acquisition cost, though it takes months to build and works best alongside paid channels." } },
  { slug: "automotive", name: "car dealers and automotive brands", title: "Automotive", searchIntent: "buyers research models, prices, variants and nearby dealers before visiting a showroom", pains: ["Model and variant pages that duplicate each other", "Portal competition for price and comparison searches", "Many dealer locations to promote"], tactics: ["Model, variant and comparison content with unique value", "Dealer location pages tied to Business Profiles", "Fast mobile pages and structured data for inventory"], faq: { q: "How should a dealership use local SEO?", a: "Keep each showroom's Google Business Profile accurate and active, build dedicated location pages, and gather genuine reviews for every outlet." } },
  { slug: "b2b-and-saas", name: "B2B and SaaS companies", title: "B2B & SaaS", searchIntent: "buyers research problems, compare tools and evaluate vendors long before they talk to sales", pains: ["Long sales cycles make attribution hard", "Competitive, high-cost keywords", "Content that informs but does not convert"], tactics: ["Problem-led content mapped to the buying journey", "Comparison and alternative pages", "Link building through original data and expert content"], faq: { q: "How do you measure SEO for long B2B sales cycles?", a: "Track organic leads and pipeline in your CRM, not just traffic. We tie content and landing pages to demo requests and qualified opportunities." } },
];

assertSlugs("seo feature", seoFeatures.map((f) => f.slug));
assertSlugs("seo industry", seoIndustries.map((i) => i.slug));
