import type { NextConfig } from "next";
import path from "node:path";
import { oldSiteRedirects } from "./src/content/redirects";

// If the site's canonical host is "www.example.com", also answer for the bare "example.com" and send it to www,
// keeping the path. Old-site URLs go straight to their final page in one hop.
const siteHost = (() => { try { return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "").host; } catch { return ""; } })();
const wwwHost = siteHost.startsWith("www.") ? siteHost : "";
const bareHost = wwwHost.replace(/^www\./, "");
const bareToWww = wwwHost
  ? [
      ...oldSiteRedirects.map((r) => ({ source: r.source, has: [{ type: "host" as const, value: bareHost }], destination: `https://${wwwHost}${r.destination}`, permanent: true })),
      { source: "/google-my-business", has: [{ type: "host" as const, value: bareHost }], destination: `https://${wwwHost}/google-business-profile-management`, permanent: true },
      { source: "/:path*", has: [{ type: "host" as const, value: bareHost }], destination: `https://${wwwHost}/:path*`, permanent: true },
    ]
  : [];

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(process.cwd()),
  poweredByHeader: false,
  trailingSlash: false, // one canonical form: no trailing slash
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" }, // browsers ignore this over plain http, so it is safe locally
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    // Old/likely-linked URLs → canonical slugs (301). Extend as URLs change; never delete.
    return [
      ...bareToWww,
      ...oldSiteRedirects.map((r) => ({ ...r, permanent: true })),
      { source: "/gmb", destination: "/google-business-profile-management", permanent: true },
      { source: "/google-my-business", destination: "/google-business-profile-management", permanent: true },
      { source: "/google-my-business-management", destination: "/google-business-profile-management", permanent: true },
      { source: "/influencers", destination: "/influencer-marketplace", permanent: true },
      { source: "/ads", destination: "/ads-management", permanent: true },
      { source: "/adwords", destination: "/ads-management/google-ads", permanent: true },
      { source: "/google-ads-management", destination: "/ads-management/google-ads", permanent: true },
      { source: "/meta-ads-management", destination: "/ads-management/meta-ads", permanent: true },
      { source: "/seo", destination: "/seo-services", permanent: true },
      { source: "/seo-company", destination: "/seo-services", permanent: true },
      { source: "/seo-services/:seg(features|for|in)", destination: "/seo-services", permanent: true },
      { source: "/signup", destination: "/contact", permanent: true },
      // Bare intermediate segments have no page of their own → send to the hub instead of a 404.
      { source: "/google-business-profile-management/:seg(features|for|in)", destination: "/google-business-profile-management", permanent: true },
      { source: "/influencer-marketplace/:seg(niches|in)", destination: "/influencer-marketplace", permanent: true },
      { source: "/ads-management/:seg(features|for)", destination: "/ads-management", permanent: true },
    ];
  },
};

export default nextConfig;
