/**
 * Single source of truth for brand + URLs. Rename the brand here — nothing else is hard-coded.
 */
export const site = {
  name: "Reachly", // PLACEHOLDER brand — change me
  legalName: "Reachly Technologies Pvt. Ltd.",
  tagline: "Strategy from experts. Speed from AI.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com").replace(/\/$/, ""),
  locale: "en-IN",
  // Each product is its own platform; this site only links to them.
  apps: {
    creators: (process.env.NEXT_PUBLIC_CREATOR_APP_URL ?? "https://creators.example.com").replace(/\/$/, ""),
    ads: (process.env.NEXT_PUBLIC_ADS_APP_URL ?? "https://ads.example.com").replace(/\/$/, ""),
  },
  // Business Profile has NO login: clients add this Google account as a manager of their profile.
  gbpManagerEmail: process.env.NEXT_PUBLIC_GBP_MANAGER_EMAIL ?? "profiles@example.com",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? "").replace(/\D/g, ""), // digits with country code, e.g. 919876543210
  country: "IN",
  currency: "INR",
  email: "hello@example.com",
  twitter: "@reachly",
  social: [] as string[], // sameAs URLs for Organization schema (LinkedIn, X, YouTube…)
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "1",
} as const;

/** Influencer marketplace: one platform, one login for both brands and creators. */
export const marketplace = {
  login: `${site.apps.creators}/login`,
  brandSignup: `${site.apps.creators}/signup?role=brand`,
  creatorSignup: `${site.apps.creators}/signup?role=creator`,
} as const;

export const SEO_LIMITS = {
  titleMax: 60,
  titleMin: 20,
  descMax: 160,
  descMin: 70,
} as const;
