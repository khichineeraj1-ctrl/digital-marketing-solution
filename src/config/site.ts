/**
 * Single source of truth for brand + URLs. Rename the brand here — nothing else is hard-coded.
 */
/** Returns a clean https origin, or "" when the value is missing, a placeholder like "<your app>", or not a valid URL. */
const cleanUrl = (v: string | undefined): string => {
  if (!v || /[<>\s]/.test(v)) return "";
  try { const u = new URL(v); return /^https?:$/.test(u.protocol) ? v.replace(/\/$/, "") : ""; } catch { return ""; }
};
const cleanEmail = (v: string | undefined): string => (v && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v) ? v : "");

export const site = {
  name: "Adtrafix",
  legalName: "Adtrafix Media Solutions LLP",
  tagline: "Strategy from experts. Speed from AI.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com").replace(/\/$/, ""),
  locale: "en-IN",
  // Each product is its own platform; this site only links to them.
  apps: {
    creators: cleanUrl(process.env.NEXT_PUBLIC_CREATOR_APP_URL),
    ads: cleanUrl(process.env.NEXT_PUBLIC_ADS_APP_URL),
  },
  // Business Profile has NO login: clients add this Google account as a manager of their profile.
  gbpManagerEmail: cleanEmail(process.env.NEXT_PUBLIC_GBP_MANAGER_EMAIL),
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? "").replace(/\D/g, ""), // digits with country code, e.g. 919876543210
  country: "IN",
  currency: "INR",
  email: "conversation@adtrafix.com",
  phone: "+91 99904 43367",
  address: { locality: "Gurugram", region: "Haryana", country: "IN" },
  twitter: "@adtrafix",
  social: ["https://www.linkedin.com/company/adtrafix", "https://twitter.com/adtrafix", "https://www.facebook.com/adtrafix"] as string[], // sameAs URLs for Organization schema
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "1",
} as const;

/** Influencer marketplace: one platform, one login for both brands and creators. */
export const marketplace = {
  login: site.apps.creators ? `${site.apps.creators}/login` : "",
  brandSignup: site.apps.creators ? `${site.apps.creators}/signup?role=brand` : "",
  creatorSignup: site.apps.creators ? `${site.apps.creators}/signup?role=creator` : "",
} as const;

export const SEO_LIMITS = {
  titleMax: 60,
  titleMin: 20,
  descMax: 160,
  descMin: 70,
} as const;
