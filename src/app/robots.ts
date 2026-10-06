import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (site.noindex) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/thank-you"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
