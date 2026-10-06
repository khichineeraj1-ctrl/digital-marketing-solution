import type { Feature, Industry } from "./types";
import { assertSlugs } from "@/lib/slug";

export const gbpFeatures: Feature[] = [
  {
    slug: "review-management",
    name: "Review management",
    h1: "Google Review Management Software for Multi-Location Businesses",
    metaTitle: "Google Review Management Software",
    metaDescription: "Collect, monitor and reply to Google reviews for every location, handled for you. Policy-safe review requests, tone-matched replies and rating alerts.",
    intro: "Reviews are the strongest local ranking and conversion signal you control. Share access and every location's reviews are monitored and answered for you, and ask for feedback in a way that stays inside Google's policies.",
    benefits: [
      { title: "Every location covered", body: "New reviews across all your profiles are monitored and answered promptly, with escalation to the right manager when a complaint needs a human." },
      { title: "Reply templates with guardrails", body: "Start from tone-matched templates for praise and complaints, then personalise before publishing." },
      { title: "Policy-safe review requests", body: "Share a direct review link by SMS, WhatsApp or QR. No review gating and no incentives — both violate Google's policy." },
      { title: "Alerts on low ratings", body: "Get notified when a 1–2 star review lands so you can respond while the customer is still reachable." },
    ],
    faqs: [
      { q: "Can I reply to Google reviews for all my locations at once?", a: "Yes. Once you give manager access to your profiles, replies for every location are handled for you, with complaints escalated to the right branch manager." },
      { q: "Is it allowed to offer a discount for a Google review?", a: "No. Google's policy prohibits offering incentives in exchange for reviews, and selectively asking only happy customers (review gating) is also not allowed." },
    ],
  },
  {
    slug: "post-scheduling",
    name: "Post scheduling",
    h1: "Google Business Profile Post Scheduler",
    metaTitle: "Google Business Profile Post Scheduler",
    metaDescription: "Schedule offers, updates and event posts to one or hundreds of Google Business Profiles. Keep every location active without daily manual work.",
    intro: "Active profiles give customers a reason to choose you. Plan a month of updates, offers and events once, and publish them to the right locations automatically.",
    benefits: [
      { title: "Bulk and per-location posts", body: "Publish one campaign to every outlet or tailor the offer and photo per city." },
      { title: "Calendar view", body: "See what is going live this week across all locations and spot gaps before customers do." },
      { title: "Reusable offer templates", body: "Save festive, seasonal and product-launch formats so a new post takes minutes." },
    ],
    faqs: [
      { q: "How often should a business post on Google Business Profile?", a: "A steady weekly cadence is a sensible baseline. Consistency matters more than volume, and posts should reflect real offers, events or updates." },
    ],
  },
  {
    slug: "multi-location-management",
    name: "Multi-location management",
    h1: "Multi-Location Google Business Profile Management",
    metaTitle: "Multi-Location Google Business Profile Tool",
    metaDescription: "Manage hundreds of Google Business Profiles in bulk — hours, categories, photos, attributes and access — with roles, approvals and audit logs.",
    intro: "Franchises and chains lose customers to wrong hours, duplicate listings and unclaimed profiles. Bring every location under one roof with bulk edits, role-based access and a full audit trail.",
    benefits: [
      { title: "Bulk edits", body: "Update holiday hours, phone numbers or categories across selected locations in a single action." },
      { title: "Roles and approvals", body: "Give store managers limited access and route sensitive changes through an approver." },
      { title: "Duplicate and suspension alerts", body: "Spot duplicate listings or status changes early, before they hurt visibility." },
    ],
    faqs: [
      { q: "How many locations can I manage?", a: "From a single outlet to several hundred. Plans scale per location, so you only pay for the profiles you manage." },
    ],
  },
  {
    slug: "local-seo-audit",
    name: "Local SEO audit",
    h1: "Google Business Profile Audit and Local SEO Checker",
    metaTitle: "Google Business Profile Audit Tool",
    metaDescription: "Audit any Google Business Profile for missing categories, thin descriptions, photo gaps and review issues, with a prioritised fix list.",
    intro: "Find out exactly what is holding a profile back. The audit scores completeness, category choice, photos, reviews and activity, then lists fixes in the order they are likely to matter.",
    benefits: [
      { title: "Completeness score", body: "Checks name, address, hours, categories, services, attributes, description and photos." },
      { title: "Competitor comparison", body: "Benchmark against the businesses ranking above you in the local pack." },
      { title: "Prioritised fix list", body: "Quick wins first, so a small team can act on it the same day." },
    ],
    faqs: [
      { q: "What makes a Google Business Profile rank higher?", a: "Google describes local ranking as driven by relevance, distance and prominence. You can improve relevance and prominence with accurate categories, complete information, photos and a steady flow of genuine reviews." },
    ],
  },
  {
    slug: "performance-insights",
    name: "Performance insights",
    h1: "Google Business Profile Insights and Reporting",
    metaTitle: "Google Business Profile Insights & Reports",
    metaDescription: "Track calls, direction requests, website clicks and search queries for every location, and send white-label monthly reports to clients.",
    intro: "Prove what the profile is delivering. See calls, direction requests, website clicks and the searches that surfaced each location, then export reports clients actually read.",
    benefits: [
      { title: "Calls, directions, clicks", body: "Track the actions that turn into revenue, by location and by month." },
      { title: "Search terms", body: "See which queries surfaced your profile so content and categories can follow demand." },
      { title: "White-label reports", body: "Agencies can schedule branded PDF reports for each client." },
    ],
    faqs: [
      { q: "Can agencies send reports under their own brand?", a: "Yes. Reports can carry your logo and be scheduled monthly for each client." },
    ],
  },
  {
    slug: "listing-sync",
    name: "Listing and NAP sync",
    h1: "Local Listing Sync for Consistent Business Information",
    metaTitle: "Local Listing & NAP Consistency Tool",
    metaDescription: "Keep your business name, address and phone consistent across Google and major directories, and fix mismatches before they confuse customers.",
    intro: "Inconsistent name, address and phone details confuse both customers and search engines. Keep one verified source of truth and push corrections where they are needed.",
    benefits: [
      { title: "Single source of truth", body: "Edit once and keep location data consistent everywhere you publish it." },
      { title: "Mismatch detection", body: "Flag differing phone numbers or addresses so they can be corrected." },
    ],
    faqs: [
      { q: "What is NAP consistency?", a: "NAP stands for name, address and phone number. Using the same details everywhere helps customers and search engines trust that the listings refer to the same business." },
    ],
  },
];

export const gbpIndustries: Industry[] = [
  { slug: "restaurants", name: "restaurants", title: "Restaurants", searchIntent: "diners search 'best biryani near me' or 'restaurants open now' and choose from the map pack within seconds", pains: ["Menu, hours and photos go stale quickly", "Unanswered reviews push diners to competitors", "Each outlet needs its own accurate profile"], tactics: ["Post weekly specials and festival menus", "Reply to every review within a day", "Add dish-level photos and keep special hours current"], faq: { q: "How do restaurants get more Google reviews?", a: "Ask at the moment of a good experience with a QR code on the bill or table, and share a direct review link. Never offer a discount or gift in return." } },
  { slug: "clinics-and-doctors", name: "clinics and doctors", title: "Clinics & Doctors", searchIntent: "patients search for a specialist 'near me' and compare ratings before booking", pains: ["Strict need for accurate specialties and timings", "Negative reviews need careful, privacy-safe replies", "Appointment links are missing or broken"], tactics: ["Choose precise primary and secondary categories", "Add an appointment link and service list", "Reply without sharing any patient detail"], faq: { q: "Can doctors reply to reviews without breaching privacy?", a: "Yes — keep replies general, never confirm someone was a patient or mention treatment, and invite them to contact the clinic directly." } },
  { slug: "salons-and-spas", name: "salons and spas", title: "Salons & Spas", searchIntent: "customers search 'salon near me' and pick on photos, ratings and price signals", pains: ["Photo-led decisions need fresh visuals", "Staff turnover makes services outdated", "Walk-in demand depends on live hours"], tactics: ["Upload before/after and ambience photos regularly", "List services with prices", "Post festive and bridal season offers"], faq: { q: "How many photos should a salon profile have?", a: "There is no fixed number, but profiles with a steady supply of recent, real photos of work and premises tend to earn more engagement than sparse ones." } },
  { slug: "real-estate", name: "real estate agencies and developers", title: "Real Estate", searchIntent: "buyers search 'property dealers in [area]' and 'new projects near me' and call from the profile", pains: ["Site-office and project locations are confusing", "Leads depend on call and direction taps", "Fake or competitor reviews need handling"], tactics: ["Create separate profiles for staffed site offices", "Post project launches and possession updates", "Track calls and direction requests per project"], faq: { q: "Can a real estate project have its own Google Business Profile?", a: "Only if it has a staffed location customers can visit during stated hours. Unstaffed or virtual locations are not eligible." } },
  { slug: "car-dealerships", name: "car dealerships and service centres", title: "Car Dealerships", searchIntent: "buyers search 'car showroom near me' and 'car service centre near me' and call or navigate straight from Google", pains: ["Sales and service need separate, accurate profiles", "Multiple showrooms across cities", "Review replies must reflect brand tone"], tactics: ["Separate sales and service categories and hours", "Post new-model arrivals and service camps", "Centralise review replies across showrooms"], faq: { q: "Should a showroom and its service centre share a profile?", a: "If they are separate departments with different hours, Google allows separate profiles for each; choose categories that match what each location does." } },
  { slug: "gyms-and-fitness", name: "gyms and fitness studios", title: "Gyms & Fitness", searchIntent: "people search 'gym near me' and 'yoga classes near me' and visit after checking photos and reviews", pains: ["Class timetables change often", "New-year and summer spikes need fresh offers", "Trial bookings are not tracked"], tactics: ["Keep class timings and trial links current", "Post transformation stories with consent", "Run seasonal membership offers"], faq: { q: "Can a gym add a free-trial booking link?", a: "Yes, a booking or website link can point to a free-trial page, and calls and clicks can be tracked in performance reports." } },
  { slug: "hotels-and-hospitality", name: "hotels and hospitality", title: "Hotels & Hospitality", searchIntent: "travellers search 'hotels near [place]' and compare rating, photos and price before booking", pains: ["Review volume spans many platforms", "Seasonal pricing and amenity updates", "Booking links must stay accurate"], tactics: ["Keep amenities and photos fresh each season", "Reply to every review in the guest's language", "Post events and packages"], faq: { q: "Does replying to reviews help hotels?", a: "Responding shows prospective guests that management is attentive, and it gives you a chance to address concerns publicly." } },
  { slug: "retail-and-showrooms", name: "retail stores and showrooms", title: "Retail & Showrooms", searchIntent: "shoppers search 'store near me', 'open now' and product names before heading out", pains: ["Stock and offer changes are constant", "Many outlets with inconsistent details", "Festival-season hours are missed"], tactics: ["Set special hours for every holiday", "Post sales and new arrivals", "Add product listings where eligible"], faq: { q: "How do retailers show festival opening hours?", a: "Use the special hours setting for each location ahead of the festival so customers see correct timings in search and maps." } },
];

assertSlugs("gbp feature", gbpFeatures.map((f) => f.slug));
assertSlugs("gbp industry", gbpIndustries.map((i) => i.slug));
