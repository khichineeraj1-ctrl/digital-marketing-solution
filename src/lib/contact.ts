import { products } from "@/content/products";

/** Pre-select the right service on the enquiry form from the page the visitor is on. */
export function contactFor(path: string): string {
  const svc = path.startsWith(products.gbp.path) ? "gbp" : path.startsWith(products.influencer.path) ? "influencer" : path.startsWith(products.ads.path) ? "ads" : path.startsWith(products.seo.path) ? "seo" : "";
  return svc ? `/contact?service=${svc}` : "/contact";
}
