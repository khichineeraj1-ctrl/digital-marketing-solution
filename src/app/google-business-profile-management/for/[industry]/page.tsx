import { notFound } from "next/navigation";
import { metaFor, getOverride } from "@/lib/overrides";
import { IndustryTemplate } from "@/components/templates";
import { gbpIndustries, gbpFeatures } from "@/content/gbp";
import { products } from "@/content/products";

export const revalidate = 60;

const base = products.gbp.path;
type P = { params: Promise<{ industry: string }> };

export const generateStaticParams = () => gbpIndustries.map((i) => ({ industry: i.slug }));

const titleOf = (t: string) => `Google Business Profile Management for ${t}`;
const descOf = (name: string) => `Win more local customers for your ${name}: manage reviews, posts, photos and insights for every Business Profile in one place.`;

export async function generateMetadata({ params }: P) {
  const { industry } = await params;
  const i = gbpIndustries.find((x) => x.slug === industry);
  if (!i) return {};
  return metaFor({ title: titleOf(i.title), description: descOf(i.name), path: `${base}/for/${i.slug}` });
}

export default async function Page({ params }: P) {
  const { industry } = await params;
  const i = gbpIndustries.find((x) => x.slug === industry);
  if (!i) notFound();
  const path = `${base}/for/${i.slug}`;
  return (
    <IndustryTemplate
      i={i} path={path} product="Google Business Profile management" eyebrow="By industry"
      h1={titleOf(i.title)} lead={descOf(i.name)}
      trail={[{ name: products.gbp.short, path: base }, { name: i.title, path }]}
      related={[
        ...gbpFeatures.slice(0, 3).map((f) => ({ label: f.name, path: `${base}/features/${f.slug}` })),
        { label: `Ads management for ${i.title}`, path: products.ads.path },
      ]}
    />
  );
}
