import type { Metadata } from "next";
import { site, SEO_LIMITS } from "@/config/site";

export type SeoInput = {
  title: string; // without brand suffix
  description: string;
  path: string; // "/x/y" — canonical path, no trailing slash
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Brand suffix only when it keeps the full title ≤ 60 chars. */
export function fullTitle(title: string): string {
  const withBrand = `${title} | ${site.name}`;
  return withBrand.length <= SEO_LIMITS.titleMax ? withBrand : title;
}

const OG_IMAGE = () => [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: site.tagline }];

export function buildMetadata(i: SeoInput): Metadata {
  const url = absoluteUrl(i.path);
  const title = fullTitle(i.title);
  const noindex = i.noindex || site.noindex;

  if (process.env.NODE_ENV !== "production") {
    if (title.length > SEO_LIMITS.titleMax) console.warn(`[seo] title too long (${title.length}) ${i.path}`);
    if (i.description.length > SEO_LIMITS.descMax) console.warn(`[seo] description too long (${i.description.length}) ${i.path}`);
  }

  return {
    title: { absolute: title },
    description: i.description,
    keywords: i.keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type: i.type ?? "website",
      url,
      title,
      description: i.description,
      siteName: site.name,
      images: OG_IMAGE(),
      locale: site.locale.replace("-", "_"),
      ...(i.type === "article" ? { publishedTime: i.publishedTime, modifiedTime: i.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description: i.description, site: site.twitter, images: [absoluteUrl("/opengraph-image")] },
  };
}
