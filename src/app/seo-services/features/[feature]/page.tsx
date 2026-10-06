import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { FeatureTemplate } from "@/components/templates";
import { seoFeatures } from "@/content/seo";
import { products } from "@/content/products";

const base = products.seo.path;
type P = { params: Promise<{ feature: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => seoFeatures.map((f) => ({ feature: f.slug }));

export async function generateMetadata({ params }: P) {
  const { feature } = await params;
  const f = seoFeatures.find((x) => x.slug === feature);
  if (!f) return {};
  return buildMetadata({ title: f.metaTitle, description: f.metaDescription, path: `${base}/features/${f.slug}` });
}

export default async function Page({ params }: P) {
  const { feature } = await params;
  const f = seoFeatures.find((x) => x.slug === feature);
  if (!f) notFound();
  const path = `${base}/features/${f.slug}`;
  return (
    <FeatureTemplate
      f={f} path={path} eyebrow="SEO Services"
      trail={[{ name: products.seo.short, path: base }, { name: f.name, path }]}
      related={[
        ...seoFeatures.filter((x) => x.slug !== f.slug).slice(0, 4).map((x) => ({ label: x.name, path: `${base}/features/${x.slug}` })),
        { label: "Google Business Profile management", path: products.gbp.path },
        { label: "SEO audit checklist", path: "/blog/seo-audit-checklist" },
      ]}
    />
  );
}
