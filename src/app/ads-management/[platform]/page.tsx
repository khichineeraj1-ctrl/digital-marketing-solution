import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { FeatureTemplate } from "@/components/templates";
import { adsPlatforms, adsFeatures } from "@/content/ads";
import { products } from "@/content/products";

const base = products.ads.path;
type P = { params: Promise<{ platform: string }> };
const find = (s: string) => adsPlatforms.find((x) => x.slug === s);

export const dynamicParams = false;
// Reserved sibling segments (features, for) are static folders, so they never reach this route.
export const generateStaticParams = () => adsPlatforms.map((p) => ({ platform: p.slug }));

export async function generateMetadata({ params }: P) {
  const p = find((await params).platform);
  if (!p) return {};
  return buildMetadata({ title: p.metaTitle, description: p.metaDescription, path: `${base}/${p.slug}` });
}

export default async function Page({ params }: P) {
  const p = find((await params).platform);
  if (!p) notFound();
  const path = `${base}/${p.slug}`;
  const other = adsPlatforms.find((x) => x.slug !== p.slug)!;
  return (
    <FeatureTemplate
      f={{ ...p, name: p.name, benefits: [...p.benefits], faqs: [...p.faqs] }} path={path} eyebrow="Ads Management OS"
      trail={[{ name: products.ads.short, path: base }, { name: p.name, path }]}
      related={[
        { label: `${other.name} management`, path: `${base}/${other.slug}` },
        ...adsFeatures.slice(0, 3).map((f) => ({ label: f.name, path: `${base}/features/${f.slug}` })),
        { label: "Google Ads vs Meta Ads: where to spend first", path: "/blog/google-ads-vs-meta-ads" },
      ]}
    />
  );
}
