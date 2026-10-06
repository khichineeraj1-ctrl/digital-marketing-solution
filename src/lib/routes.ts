import { gbpFeatures, gbpIndustries } from "@/content/gbp";
import { niches } from "@/content/influencer";
import { seoFeatures, seoIndustries } from "@/content/seo";
import { adsPlatforms, adsFeatures, adsIndustries } from "@/content/ads";
import { cities } from "@/content/cities";
import { getPublishedPosts } from "@/lib/posts";
import { getPublishedCustomPages } from "@/lib/customPages";
import { getIndexableAuthors } from "@/lib/authors";
import { getIndexableCaseStudies } from "@/lib/caseStudies";

export type RouteEntry = {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  lastModified?: string;
};

const GBP = "/google-business-profile-management";
const INF = "/influencer-marketplace";
const ADS = "/ads-management";
const SEO = "/seo-services";

/**
 * Every indexable URL on the site. Sitemap, internal-link blocks and the SEO audit
 * all read from here, so a page can never exist without being listed (or vice versa).
 */
export async function allRoutes(): Promise<RouteEntry[]> {
  const r: RouteEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: GBP, priority: 0.9, changeFrequency: "weekly" },
    { path: INF, priority: 0.9, changeFrequency: "weekly" },
    { path: ADS, priority: 0.9, changeFrequency: "weekly" },
    { path: SEO, priority: 0.9, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "weekly" },
    { path: "/authors", priority: 0.5, changeFrequency: "monthly" },
    { path: "/about", priority: 0.4, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: `${INF}/for-brands`, priority: 0.8, changeFrequency: "monthly" },
    { path: `${INF}/for-influencers`, priority: 0.8, changeFrequency: "monthly" },
  ];
  r.push({ path: `${GBP}/get-started`, priority: 0.7, changeFrequency: "monthly" });
  for (const f of gbpFeatures) r.push({ path: `${GBP}/features/${f.slug}`, priority: 0.7, changeFrequency: "monthly" });
  for (const i of gbpIndustries) r.push({ path: `${GBP}/for/${i.slug}`, priority: 0.6, changeFrequency: "monthly" });
  for (const c of cities) r.push({ path: `${GBP}/in/${c.slug}`, priority: 0.6, changeFrequency: "monthly" });

  for (const f of seoFeatures) r.push({ path: `${SEO}/features/${f.slug}`, priority: 0.7, changeFrequency: "monthly" });
  for (const i of seoIndustries) r.push({ path: `${SEO}/for/${i.slug}`, priority: 0.6, changeFrequency: "monthly" });
  for (const c of cities) r.push({ path: `${SEO}/in/${c.slug}`, priority: 0.6, changeFrequency: "monthly" });

  for (const n of niches) r.push({ path: `${INF}/niches/${n.slug}`, priority: 0.7, changeFrequency: "monthly" });
  for (const c of cities) r.push({ path: `${INF}/in/${c.slug}`, priority: 0.6, changeFrequency: "monthly" });

  for (const p of adsPlatforms) r.push({ path: `${ADS}/${p.slug}`, priority: 0.8, changeFrequency: "monthly" });
  for (const f of adsFeatures) r.push({ path: `${ADS}/features/${f.slug}`, priority: 0.7, changeFrequency: "monthly" });
  for (const i of adsIndustries) r.push({ path: `${ADS}/for/${i.slug}`, priority: 0.6, changeFrequency: "monthly" });

  for (const c of await getIndexableCaseStudies()) r.push({ path: `/case-studies/${c.slug}`, priority: 0.7, changeFrequency: "monthly", lastModified: c.modified });
  for (const c of await getPublishedCustomPages()) if (!c.noindex) r.push({ path: `/${c.path}`, priority: 0.6, changeFrequency: "monthly", lastModified: c.modified });
  for (const a of await getIndexableAuthors()) r.push({ path: `/authors/${a.slug}`, priority: 0.5, changeFrequency: "monthly", lastModified: a.modified });
  for (const p of await getPublishedPosts()) r.push({ path: `/blog/${p.slug}`, priority: 0.6, changeFrequency: "monthly", lastModified: p.modified });
  return r;
}

export const paths = { GBP, INF, ADS, SEO };
