import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { FeatureTemplate } from "@/components/templates";
import { gbpFeatures } from "@/content/gbp";
import { products } from "@/content/products";

const base = products.gbp.path;
type P = { params: Promise<{ feature: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => gbpFeatures.map((f) => ({ feature: f.slug }));

export async function generateMetadata({ params }: P) {
  const { feature } = await params;
  const f = gbpFeatures.find((x) => x.slug === feature);
  if (!f) return {};
  return buildMetadata({ title: f.metaTitle, description: f.metaDescription, path: `${base}/features/${f.slug}` });
}

export default async function Page({ params }: P) {
  const { feature } = await params;
  const f = gbpFeatures.find((x) => x.slug === feature);
  if (!f) notFound();
  const path = `${base}/features/${f.slug}`;
  return (
    <FeatureTemplate
      f={f} path={path} eyebrow="Google Business Profile"
      trail={[{ name: products.gbp.short, path: base }, { name: f.name, path }]}
      related={[
        ...gbpFeatures.filter((x) => x.slug !== f.slug).slice(0, 4).map((x) => ({ label: x.name, path: `${base}/features/${x.slug}` })),
        { label: "Google Ads & Meta Ads management", path: products.ads.path },
      ]}
    />
  );
}
