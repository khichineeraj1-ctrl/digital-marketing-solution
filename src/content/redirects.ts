/**
 * 301 redirects from the previous adtrafix.com site, so existing Google rankings and backlinks carry over.
 * Never delete an entry. Add new ones whenever a URL changes.
 */
export const oldSiteRedirects: { source: string; destination: string }[] = [
  { source: "/google-ads", destination: "/ads-management/google-ads" },
  { source: "/meta-ads", destination: "/ads-management/meta-ads" },
  { source: "/ai-performance-marketing", destination: "/ads-management" },
  { source: "/privacy-policy", destination: "/privacy" },
  { source: "/terms-of-service", destination: "/terms" },
  { source: "/gmb-management-services", destination: "/google-business-profile-management" },
  { source: "/gmb-management-pricing", destination: "/pricing" },
  { source: "/local-listing-management", destination: "/google-business-profile-management/features/listing-sync" },
  { source: "/multi-location-gmb-management", destination: "/google-business-profile-management/features/multi-location-management" },
  { source: "/white-label-gmb-management", destination: "/google-business-profile-management/features/performance-insights" },
  { source: "/blog-google-business-profile-manager", destination: "/blog/google-business-profile-manager" },
  { source: "/blog-gmb-management-services-cost", destination: "/blog/gmb-management-services-cost-india" },
  { source: "/blog-manage-multiple-gmb-accounts", destination: "/blog/manage-multiple-gmb-accounts" },
  { source: "/blog-google-business-profile-management-2026", destination: "/blog/google-business-profile-management-2026" },
  { source: "/blog-semrush-vs-gmb-agency", destination: "/blog/semrush-listing-management-vs-gmb-agency" },
  { source: "/blog-local-listing-management-rankings", destination: "/blog/local-listing-management-google-rankings" },
  // /google-my-business → hub is already in next.config.ts; /seo-services and /google-business-profile-management keep their URLs.
];
