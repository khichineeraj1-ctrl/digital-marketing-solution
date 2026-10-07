import type { Faq } from "./types";

export const products = {
  gbp: {
    key: "gbp",
    name: "GBP OS by Adtrafix",
    short: "GBP OS by Adtrafix",
    path: "/google-business-profile-management",
    h1: "Google Business Profile Management Software",
    metaTitle: "Google Business Profile Management Services | GBP OS",
    metaDescription: "GBP OS by Adtrafix manages your Google Business Profile: review replies, posts, photos and insights for every location. Share access and we do the rest.",
    lead: "Share access to your profile and we run the rest: audit, optimisation, review replies, posts and reporting for every location.",
    cta: "Get a free profile audit",
  },
  influencer: {
    key: "influencer",
    name: "Adtrafix Match",
    short: "Adtrafix Match",
    path: "/influencer-marketplace",
    h1: "Influencer Marketplace for Brands and Creators in India",
    metaTitle: "Influencer Marketing Marketplace India | Adtrafix Match",
    metaDescription: "Adtrafix Match is an influencer marketing marketplace for brands and creators in India. Find verified creators by niche and city and pay only on delivery.",
    lead: "Brands find verified creators by niche and city. Creators sign up free and start receiving campaigns.",
    cta: "Hire influencers",
  },
  seo: {
    key: "seo",
    name: "SEO Services",
    short: "SEO Services",
    path: "/seo-services",
    h1: "SEO Services in India for Brands That Want Organic Growth",
    metaTitle: "SEO Services for Brands in India",
    metaDescription: "Technical SEO, content, link building and local SEO from an expert team. Grow organic traffic and leads with transparent, lead-focused reporting.",
    lead: "Technical fixes, content and authority building that compound, reported in leads and revenue, not just rankings.",
    cta: "Get a free SEO audit",
  },
  ads: {
    key: "ads",
    name: "Google Ads & Meta Ads Management",
    short: "Ads Management OS",
    path: "/ads-management",
    h1: "Google Ads and Meta Ads Management Platform",
    metaTitle: "Google Ads & Meta Ads Management Platform",
    metaDescription: "One operating system to launch, optimise and report on Google Ads and Meta campaigns. Automation rules, budget pacing and cross-channel reporting.",
    lead: "Launch, optimise and report on Google and Meta campaigns from one operating system.",
    cta: "Get a free ads audit",
  },
} as const;

export const gbpFaqs: Faq[] = [
  { q: "What is Google Business Profile?", a: "Google Business Profile — previously called Google My Business — is the free listing that controls how your business appears in Google Search and Maps." },
  { q: "Is this the same as Google My Business?", a: "Yes. Google renamed Google My Business to Google Business Profile in 2021. This platform manages those same profiles." },
  { q: "Do I need to log in to a new tool?", a: "No. You add our Google account as a Manager on your Business Profile and we handle everything from there. There is no separate login to learn." },
  { q: "What access do you need?", a: "Manager access to your Business Profile, granted from the profile's People and access settings. We never ask for your Google password, and Manager access cannot transfer ownership or delete the profile." },
  { q: "Can I remove your access later?", a: "Yes. You stay the owner and can remove us from People and access at any time." },
  { q: "How quickly can you start?", a: "Once you share access, we pull your profile data, run an audit and start optimising, typically within a working day." },
];

export const seoFaqs: Faq[] = [
  { q: "How long does SEO take to work?", a: "Technical fixes can help within weeks, but meaningful growth in competitive areas usually takes three to six months or longer. SEO compounds over time." },
  { q: "Can you guarantee first-page rankings?", a: "No honest agency can. Search engines control rankings. We commit to a clear plan, transparent reporting and measurable goals such as organic traffic, leads and revenue." },
  { q: "What is included in an SEO engagement?", a: "A technical audit and fixes, keyword and content strategy, on-page optimisation, link building and monthly reporting, scoped to your goals." },
  { q: "Do you work with local and multi-location businesses?", a: "Yes. We combine website SEO with Google Business Profile management so every location can be found by nearby customers." },
];

export const adsFaqs: Faq[] = [
  { q: "Which ad platforms are supported?", a: "Google Ads (formerly AdWords) and Meta Ads for Facebook and Instagram." },
  { q: "Do I need to move my existing campaigns?", a: "No. Connect your existing ad accounts and your campaigns appear as they are." },
  { q: "Can agencies manage client accounts?", a: "Yes. Connect many ad accounts, control access by role, and send white-label reports." },
  { q: "Will automation spend more than my budget?", a: "No. Rules run within the daily and monthly caps you define." },
];

export const pricing = [
  // PLACEHOLDER PRICES — replace with real plans before launch.
  { product: "gbp", name: "GBP OS by Adtrafix", from: 999, unit: "per location / month", points: ["Review replies handled for you", "Post scheduler", "Insights and monthly reports", "Local SEO audit"] },
  { product: "influencer", name: "Adtrafix Match", from: 0, unit: "free for creators; brands pay per campaign", points: ["Free creator profile and media kit", "Brand discovery by niche and city", "Briefs, approvals, protected payments"] },
  { product: "seo", name: "SEO Services", from: 29999, unit: "per month, scoped to your goals", points: ["Technical audit and fixes", "Content strategy and on-page SEO", "Link building and digital PR", "Monthly reporting on leads"] },
  { product: "ads", name: "Ads Management OS", from: 4999, unit: "per month", points: ["Google Ads and Meta Ads", "Automation rules and budget pacing", "Cross-channel reporting", "Unlimited ad accounts"] },
] as const;
