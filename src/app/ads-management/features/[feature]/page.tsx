import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { FeatureTemplate } from "@/components/templates";
import { adsFeatures, adsPlatforms } from "@/content/ads";
import { products } from "@/content/products";

const base = products.ads.path;
type P = { params: Promise<{ feature: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => adsFeatures.map((f) => ({ feature: f.slug }));

export async function generateMetadata({ params }: P) {
  const { feature } = await params;
  const f = adsFeatures.find((x) => x.slug === feature);
  if (!f) return {};
  return buildMetadata({ title: f.metaTitle, description: f.metaDescription, path: `${base}/features/${f.slug}` });
}

export default async function Page({ params }: P) {
  const { feature } = await params;
  const f = adsFeatures.find((x) => x.slug === feature);
  if (!f) notFound();
  const path = `${base}/features/${f.slug}`;
  return (
    <FeatureTemplate
      f={f} path={path} eyebrow="Ads Management OS"
      trail={[{ name: products.ads.short, path: base }, { name: f.name, path }]}
      related={[
        ...adsPlatforms.map((p) => ({ label: `${p.name} management`, path: `${base}/${p.slug}` })),
        ...adsFeatures.filter((x) => x.slug !== f.slug).slice(0, 3).map((x) => ({ label: x.name, path: `${base}/features/${x.slug}` })),
      ]}
    />
  );
}
