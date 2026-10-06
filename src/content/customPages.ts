import { oldSiteRedirects } from "./redirects";

export const BLOCK_TYPES = [
  { value: "richtext", label: "Text section", help: "## Heading, blank line between paragraphs, '- ' for bullets" },
  { value: "cards", label: "Feature cards", help: "One per line: Title | Description" },
  { value: "steps", label: "Numbered steps", help: "One per line: Title | Description" },
  { value: "faq", label: "FAQ (adds FAQ schema)", help: "One per line: Question | Answer" },
  { value: "links", label: "Internal links", help: "One per line: Label | /path" },
  { value: "cases", label: "Client success stories", help: "Shows published case studies for the chosen service" },
  { value: "cta", label: "Call to action", help: "Heading + button label; sends visitors to the enquiry form" },
] as const;
export type BlockType = (typeof BLOCK_TYPES)[number]["value"];

export type CustomBlock = { id: string; type: BlockType; heading: string; text: string; service: string };

export type CustomPage = {
  id: string;
  path: string; // no leading slash, 1–2 segments, e.g. "seo-services-in-noida"
  title: string; // H1
  eyebrow: string;
  lead: string;
  ctaService: string; // "" | gbp | seo | influencer | ads | other
  ctaLabel: string;
  metaTitle: string;
  description: string;
  blocks: CustomBlock[];
  noindex: boolean;
  status: "draft" | "published";
  published: string;
  modified: string;
};

/** First URL segments owned by code or redirects. A custom page can never use these. */
export const RESERVED_FIRST_SEGMENTS = [
  "admin", "api", "authors", "ads-management", "about", "blog", "case-studies", "contact", "google-business-profile-management",
  "influencer-marketplace", "pricing", "privacy", "terms", "seo-services", "thank-you", "sitemap.xml", "robots.txt", "icon.svg", "opengraph-image",
  "login", "signup", "_next", "favicon.ico",
  // redirect sources in next.config.ts
  ...oldSiteRedirects.map((r) => r.source.split("/")[1]),
  "gmb", "google-my-business", "google-my-business-management", "influencers", "ads", "adwords", "google-ads-management", "meta-ads-management", "seo", "seo-company",
] as const;
