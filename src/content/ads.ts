import type { Feature, Industry } from "./types";
import { assertSlugs } from "@/lib/slug";

export const adsPlatforms = [
  {
    slug: "google-ads",
    name: "Google Ads",
    h1: "Google Ads Management Software for Agencies and Brands",
    metaTitle: "Google Ads Management Software",
    metaDescription: "Manage Google Ads campaigns, budgets, search terms and conversions across accounts from one workspace, with automation rules and clear reporting.",
    intro: "Run Search, Performance Max, Display and YouTube campaigns from a single operating system. Spot wasted spend, adjust budgets in bulk and report across accounts without exporting spreadsheets.",
    benefits: [
      { title: "Multi-account workspace", body: "Connect every client or brand account and switch between them instantly." },
      { title: "Search-term and negative keyword tools", body: "Find irrelevant queries and add negatives in bulk to protect budget." },
      { title: "Budget pacing and alerts", body: "Get warned when a campaign is under- or over-pacing against its monthly budget." },
      { title: "Conversion tracking checks", body: "Detect broken tags and missing conversion actions before they distort bidding." },
    ],
    faqs: [
      { q: "Is AdWords the same as Google Ads?", a: "Yes. Google AdWords was renamed Google Ads in 2018. Everything formerly done in AdWords is managed in Google Ads." },
      { q: "Can I manage multiple Google Ads accounts together?", a: "Yes. Connect accounts through your manager account and manage budgets, rules and reports for all of them in one workspace." },
    ],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    h1: "Meta Ads Management Software for Facebook and Instagram",
    metaTitle: "Meta Ads Management Software",
    metaDescription: "Launch, optimise and report on Facebook and Instagram ad campaigns across ad accounts. Bulk creatives, audience tools and automated budget rules.",
    intro: "Create, duplicate and optimise Facebook and Instagram campaigns at scale. Bulk-launch creatives and audiences, automate pauses and budget shifts, and see Meta performance next to Google in one view.",
    benefits: [
      { title: "Bulk campaign launch", body: "Duplicate winning campaigns into new cities or audiences without rebuilding them by hand." },
      { title: "Creative testing", body: "Compare creatives by cost per result and fatigue so winners get budget." },
      { title: "Automated rules", body: "Pause high-CPL ad sets or scale winners automatically within limits you set." },
      { title: "Lead and catalogue campaigns", body: "Manage lead forms, catalogue and conversion campaigns in one place." },
    ],
    faqs: [
      { q: "Is Facebook Ads Manager the same as Meta Ads?", a: "Meta Ads covers advertising on Facebook, Instagram, Messenger and the Audience Network. Ads Manager is Meta's own tool for running them." },
      { q: "Can I run Meta ads for several cities from one account?", a: "Yes. Campaigns can be duplicated per city with location, budget and creative resolved for each one." },
    ],
  },
] as const;

export const adsFeatures: Feature[] = [
  {
    slug: "campaign-automation",
    name: "Campaign automation",
    h1: "Ad Campaign Automation Rules for Google and Meta",
    metaTitle: "Ad Campaign Automation Software",
    metaDescription: "Automate budget shifts, pauses and alerts across Google Ads and Meta Ads with transparent rules you control and a full change history.",
    intro: "Replace daily spreadsheet checks with rules that watch cost per lead, pacing and spend. Every automated change is logged so you can see what happened and why.",
    benefits: [
      { title: "Rules you can read", body: "Plain-language conditions such as 'pause if cost per lead exceeds target for 3 days'." },
      { title: "Guardrails", body: "Set maximum budget changes and require approval for large moves." },
      { title: "Complete audit log", body: "Every change records who or what made it, when and on which campaign." },
    ],
    faqs: [{ q: "Can automation overspend my budget?", a: "Rules operate within caps you define, and daily and monthly limits are enforced before any change is applied." }],
  },
  {
    slug: "cross-channel-reporting",
    name: "Cross-channel reporting",
    h1: "Google Ads and Meta Ads Reporting in One Dashboard",
    metaTitle: "Google & Meta Ads Reporting Dashboard",
    metaDescription: "See spend, leads, cost per lead and ROAS for Google Ads and Meta Ads side by side, and send scheduled white-label client reports.",
    intro: "Stop stitching exports together. Compare channels on the same metrics, break results down by city or campaign, and deliver scheduled reports to clients or leadership.",
    benefits: [
      { title: "One set of metrics", body: "Spend, leads, CPL and ROAS defined consistently across both platforms." },
      { title: "Breakdowns", body: "Slice by city, campaign, creative or date range." },
      { title: "Scheduled reports", body: "Email PDF or link reports automatically each week or month." },
    ],
    faqs: [{ q: "Can I white-label reports for clients?", a: "Yes. Add your logo and colours, and schedule delivery to each client." }],
  },
  {
    slug: "budget-management",
    name: "Budget management",
    h1: "Ad Budget Management and Pacing Tool",
    metaTitle: "Ad Budget Management & Pacing Tool",
    metaDescription: "Set monthly budgets and lead targets per city or campaign, track pacing daily and stop overspend across Google Ads and Meta Ads.",
    intro: "Set a target and a budget, then let the platform hold both. Daily pacing shows which campaigns are ahead or behind, and caps stop spend once a target is met.",
    benefits: [
      { title: "Targets per city or campaign", body: "Define leads and spend limits at the level you manage them." },
      { title: "Daily pacing", body: "Know by mid-month whether you will land on budget." },
      { title: "Automatic stops", body: "Pause campaigns that hit their cap so money is not wasted." },
    ],
    faqs: [{ q: "Does it work with monthly budgets?", a: "Yes. Monthly budgets are split into daily pacing and compared with actual spend each day." }],
  },
  {
    slug: "creative-testing",
    name: "Creative testing",
    h1: "Ad Creative Testing and Performance Analysis",
    metaTitle: "Ad Creative Testing Software",
    metaDescription: "Compare ad creatives by cost per result, CTR and fatigue across Meta and Google, and shift budget towards the ones that actually convert.",
    intro: "Know which creative works and when it tires. Compare variants on the metric that matters to you, and roll winners out across campaigns.",
    benefits: [
      { title: "Side-by-side comparison", body: "Rank creatives by CPL, CTR or ROAS over the same period." },
      { title: "Fatigue signals", body: "Spot falling CTR and rising frequency before results slip." },
    ],
    faqs: [{ q: "How long should I test a creative?", a: "Let each variant gather enough conversions to compare fairly rather than judging on a day or two of data." }],
  },
  {
    slug: "audience-management",
    name: "Audience management",
    h1: "Custom Audience and Retargeting Management",
    metaTitle: "Ad Audience & Retargeting Management",
    metaDescription: "Build and sync customer lists, lookalike and retargeting audiences across Meta and Google, with consent-aware handling of customer data.",
    intro: "Create, refresh and exclude audiences without manual uploads. Keep customer lists synced and handle personal data in line with consent requirements.",
    benefits: [
      { title: "List sync", body: "Keep customer and lead lists up to date in each ad platform." },
      { title: "Exclusions", body: "Exclude existing customers and converted leads to stop wasting spend." },
    ],
    faqs: [{ q: "Is customer data uploaded securely?", a: "Lists are hashed before upload to the ad platforms, and you control which lists are synced." }],
  },
  {
    slug: "lead-tracking",
    name: "Lead tracking",
    h1: "Lead Tracking and Cost per Lead Reporting",
    metaTitle: "Lead Tracking & Cost Per Lead Reports",
    metaDescription: "Bring Meta lead forms and Google conversions into one place and track true cost per lead and lead quality by city, campaign and creative.",
    intro: "Spend means little without leads. Pull leads from forms and conversions into one view, and see cost per lead by campaign, city and creative.",
    benefits: [
      { title: "Unified lead view", body: "Meta lead forms and Google conversions in a single table." },
      { title: "True CPL", body: "Cost per lead calculated from actual leads received." },
    ],
    faqs: [{ q: "Can I send leads to my CRM?", a: "Yes. Leads can be pushed to your CRM or a webhook as they arrive." }],
  },
];

export const adsIndustries: Industry[] = [
  { slug: "real-estate", name: "real estate", title: "Real Estate", searchIntent: "buyers compare projects on Google and discover launches on Instagram and Facebook", pains: ["High cost per qualified lead", "Many projects and cities to budget", "Lead quality varies by campaign"], tactics: ["Search ads for high-intent project queries", "Meta lead forms for launches", "City-level budget caps"], faq: { q: "Which works better for real estate leads, Google or Meta?", a: "Google captures people already searching for properties, while Meta builds awareness and fills launch pipelines. Most advertisers run both and compare cost per qualified lead." } },
  { slug: "automotive", name: "automotive dealers", title: "Automotive", searchIntent: "shoppers search models on Google and browse inventory through catalogue ads on Facebook and Instagram", pains: ["Inventory changes daily", "Dozens of city campaigns", "Hard to compare channels"], tactics: ["Catalogue ads synced to inventory", "Search ads for model and service queries", "City-wise targets"], faq: { q: "What are catalogue ads?", a: "Catalogue ads automatically show products from your feed — such as cars or listings — to people most likely to be interested." } },
  { slug: "healthcare", name: "healthcare providers", title: "Healthcare", searchIntent: "patients search symptoms and specialists on Google before booking", pains: ["Strict ad policy on health claims", "Local targeting matters", "Appointment tracking is patchy"], tactics: ["Local search campaigns by specialty", "Policy-compliant creatives", "Call and booking conversion tracking"], faq: { q: "Are there restrictions on healthcare ads?", a: "Yes. Both Google and Meta restrict certain health claims and personalised health targeting, so creatives and audiences must follow each platform's policy." } },
  { slug: "education", name: "education and coaching institutes", title: "Education", searchIntent: "students and parents research courses on Google and respond to admissions campaigns on Meta", pains: ["Strong seasonality around admissions", "Lead follow-up speed", "Many courses and centres"], tactics: ["Course-specific search campaigns", "Instagram lead forms for admissions", "Budget front-loaded around deadlines"], faq: { q: "When should institutes increase ad spend?", a: "Ahead of admission and exam-result windows, when search demand is highest; pace budgets around those dates." } },
  { slug: "e-commerce", name: "e-commerce brands", title: "E-commerce", searchIntent: "shoppers search products on Google Shopping and discover brands through Instagram and Facebook", pains: ["Return on ad spend varies by product", "Creative fatigue", "Catalogue feed errors"], tactics: ["Shopping and Performance Max campaigns", "Dynamic retargeting on Meta", "Creative rotation by fatigue"], faq: { q: "What ROAS should an e-commerce brand target?", a: "It depends on margin. Work back from gross margin to your break-even ROAS and set targets above that." } },
  { slug: "restaurants", name: "restaurants and cafes", title: "Restaurants", searchIntent: "diners search nearby on Google and discover offers on Instagram", pains: ["Small budgets", "Hyperlocal targeting", "Hard to attribute footfall"], tactics: ["Radius targeting around each outlet", "Offer-led Reels ads", "Store-visit and call tracking"], faq: { q: "How small a budget can a restaurant start with?", a: "Start small with one outlet and one offer, measure calls, direction requests and redemptions, then scale what works." } },
];

assertSlugs("ads platform", adsPlatforms.map((p) => p.slug));
assertSlugs("ads feature", adsFeatures.map((f) => f.slug));
assertSlugs("ads industry", adsIndustries.map((i) => i.slug));
