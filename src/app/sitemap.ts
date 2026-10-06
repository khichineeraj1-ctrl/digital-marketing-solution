import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  return (await allRoutes()).map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.lastModified ? new Date(r.lastModified) : now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
