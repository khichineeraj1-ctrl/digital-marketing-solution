export const SERVICES = [
  { value: "gbp", label: "Google Business Profile management" },
  { value: "influencer", label: "Influencer marketing campaign" },
  { value: "seo", label: "SEO services" },
  { value: "ads", label: "Google Ads & Meta Ads management" },
  { value: "other", label: "Something else / not sure" },
] as const;

export const BUDGETS = [
  { value: "lt-50k", label: "Under ₹50,000 / month" },
  { value: "50k-2l", label: "₹50,000 – ₹2 lakh / month" },
  { value: "2l-10l", label: "₹2 – 10 lakh / month" },
  { value: "10l-plus", label: "₹10 lakh+ / month" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const LOCATIONS = [
  { value: "1", label: "1 location" },
  { value: "2-10", label: "2 – 10" },
  { value: "11-50", label: "11 – 50" },
  { value: "50-plus", label: "50+" },
] as const;

export const HIGH_VALUE_BUDGETS: string[] = ["2l-10l", "10l-plus"];
export const HIGH_VALUE_LOCATIONS: string[] = ["11-50", "50-plus"];

// ───────── service-specific questions (single source of truth: form, API validation, admin display) ─────────
export type Opt = { value: string; label: string; high?: boolean };
export type Field = { key: string; label: string; kind: "single" | "multi" | "text"; options?: readonly Opt[]; required?: boolean; placeholder?: string; hint?: string };
export type ServiceKey = (typeof SERVICES)[number]["value"];

export const SERVICE_META: Record<ServiceKey, { blurb: string; icon: "pin" | "spark" | "chart" | "chat" | "search"; title: string }> = {
  gbp: { title: "Google Business Profile", blurb: "Rank higher on Maps and Search, reviews and posts handled for you", icon: "pin" },
  influencer: { title: "Influencer campaign", blurb: "Hire the right creators by niche and city, tracked end to end", icon: "spark" },
  seo: { title: "SEO services", blurb: "Rank higher on Google and turn organic traffic into leads", icon: "search" },
  ads: { title: "Google & Meta Ads", blurb: "Lower cost per lead with managed campaigns and automation", icon: "chart" },
  other: { title: "Something else", blurb: "Not sure yet? Tell us your goal and we'll point you right", icon: "chat" },
};

export const SERVICE_FIELDS: Record<ServiceKey, Field[]> = {
  gbp: [
    { key: "locations", label: "How many business locations?", kind: "single", required: true, options: [
      { value: "1", label: "1" }, { value: "2-10", label: "2 – 10" }, { value: "11-50", label: "11 – 50", high: true }, { value: "50-plus", label: "50+", high: true }] },
    { key: "profile_status", label: "Is your profile claimed and verified?", kind: "single", required: true, options: [
      { value: "yes", label: "Yes, we manage it" }, { value: "no", label: "Not yet" }, { value: "unsure", label: "Not sure" }] },
    { key: "goals", label: "What do you want most?", kind: "multi", options: [
      { value: "calls", label: "More calls & directions" }, { value: "reviews", label: "More / better reviews" }, { value: "rank", label: "Rank higher locally" },
      { value: "fix", label: "Fix wrong info / duplicates" }, { value: "multi", label: "Manage many outlets" }] },
    { key: "areas", label: "City / areas you serve", kind: "text", placeholder: "e.g. Pune, Mumbai" },
  ],
  influencer: [
    { key: "goal", label: "What's the campaign goal?", kind: "single", required: true, options: [
      { value: "awareness", label: "Brand awareness" }, { value: "sales", label: "Sales" }, { value: "footfall", label: "Store visits" }, { value: "installs", label: "App installs" }, { value: "launch", label: "Product launch" }] },
    { key: "platforms", label: "Which platforms?", kind: "multi", options: [
      { value: "instagram", label: "Instagram" }, { value: "youtube", label: "YouTube" }, { value: "facebook", label: "Facebook" }, { value: "linkedin", label: "LinkedIn" }, { value: "other", label: "Other" }] },
    { key: "campaign_budget", label: "Total campaign budget", kind: "single", required: true, options: [
      { value: "lt-1l", label: "Under ₹1 lakh" }, { value: "1l-5l", label: "₹1 – 5 lakh" }, { value: "5l-20l", label: "₹5 – 20 lakh", high: true }, { value: "20l-plus", label: "₹20 lakh+", high: true }, { value: "unsure", label: "Not sure" }] },
    { key: "niche", label: "Category / niche", kind: "text", placeholder: "e.g. skincare, restaurants, fashion" },
    { key: "cities", label: "Target cities", kind: "text", placeholder: "e.g. Delhi, Bengaluru, or pan-India" },
    { key: "timeline", label: "When do you want to start?", kind: "single", options: [
      { value: "asap", label: "ASAP" }, { value: "1m", label: "Within a month" }, { value: "2-3m", label: "In 2–3 months" }, { value: "planning", label: "Just planning" }] },
  ],
  ads: [
    { key: "platforms", label: "Which platforms?", kind: "multi", required: true, options: [
      { value: "google", label: "Google Ads" }, { value: "meta", label: "Meta (Facebook / Instagram)" }, { value: "youtube", label: "YouTube" }] },
    { key: "ad_spend", label: "Monthly ad spend", kind: "single", required: true, options: [
      { value: "lt-50k", label: "Under ₹50,000" }, { value: "50k-2l", label: "₹50,000 – 2 lakh" }, { value: "2l-10l", label: "₹2 – 10 lakh", high: true }, { value: "10l-plus", label: "₹10 lakh+", high: true }, { value: "unsure", label: "Not sure" }] },
    { key: "goal", label: "Main goal", kind: "single", required: true, options: [
      { value: "leads", label: "Leads" }, { value: "sales", label: "Online sales" }, { value: "calls", label: "Calls / walk-ins" }, { value: "installs", label: "App installs" }, { value: "awareness", label: "Awareness" }] },
    { key: "running", label: "Are you running ads today?", kind: "single", options: [
      { value: "agency", label: "Yes, with an agency" }, { value: "inhouse", label: "Yes, in-house" }, { value: "no", label: "Not yet" }] },
    { key: "website", label: "Website or app link", kind: "text", placeholder: "https://" },
  ],
  seo: [
    { key: "website", label: "Your website", kind: "text", required: true, placeholder: "https://" },
    { key: "goal", label: "Main goal", kind: "single", required: true, options: [
      { value: "traffic", label: "More organic traffic" }, { value: "leads", label: "More leads / enquiries" }, { value: "sales", label: "Online sales" }, { value: "local", label: "Local visibility" }, { value: "recover", label: "Recover a traffic drop" }] },
    { key: "site_type", label: "What kind of site is it?", kind: "single", options: [
      { value: "business", label: "Business / lead-gen" }, { value: "ecommerce", label: "E-commerce" }, { value: "b2b", label: "B2B / SaaS" }, { value: "local", label: "Multi-location / local" }, { value: "publisher", label: "Content / publisher" }] },
    { key: "focus", label: "Where do you need help?", kind: "multi", options: [
      { value: "technical", label: "Technical SEO" }, { value: "content", label: "Content & on-page" }, { value: "links", label: "Link building" }, { value: "local", label: "Local SEO" }, { value: "ecommerce", label: "E-commerce SEO" }] },
    { key: "seo_budget", label: "Monthly SEO budget", kind: "single", required: true, options: [
      { value: "lt-30k", label: "Under ₹30,000" }, { value: "30k-1l", label: "₹30,000 – 1 lakh" }, { value: "1l-3l", label: "₹1 – 3 lakh", high: true }, { value: "3l-plus", label: "₹3 lakh+", high: true }, { value: "unsure", label: "Not sure" }] },
    { key: "current", label: "Who does your SEO today?", kind: "single", options: [
      { value: "none", label: "Nobody yet" }, { value: "agency", label: "An agency" }, { value: "inhouse", label: "In-house team" }] },
  ],
  other: [],
};

export function isHighValue(service: string, details: Record<string, string | string[]> = {}): boolean {
  const fields = SERVICE_FIELDS[service as ServiceKey] ?? [];
  return fields.some((f) => {
    const v = details[f.key];
    const picked = Array.isArray(v) ? v : v ? [v] : [];
    return f.options?.some((o) => o.high && picked.includes(o.value));
  });
}

/** Human-readable answers for admin + CSV. Falls back to legacy top-level fields on older records. */
export function describeDetails(l: { service: string; details?: Record<string, string | string[]>; locations?: string; budget?: string; city?: string }): { label: string; value: string }[] {
  const out: { label: string; value: string }[] = [];
  const fields = SERVICE_FIELDS[l.service as ServiceKey] ?? [];
  for (const f of fields) {
    const v = l.details?.[f.key];
    const vals = Array.isArray(v) ? v : v ? [v] : [];
    if (!vals.length) continue;
    out.push({ label: f.label.replace(/\?$/, ""), value: vals.map((x) => f.options?.find((o) => o.value === x)?.label ?? x).join(", ") });
  }
  if (!l.details) {
    if (l.locations) out.push({ label: "Locations", value: LOCATIONS.find((x) => x.value === l.locations)?.label ?? l.locations });
    if (l.budget) out.push({ label: "Budget", value: BUDGETS.find((x) => x.value === l.budget)?.label ?? l.budget });
  }
  return out;
}
