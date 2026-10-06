import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { IndustryTemplate } from "@/components/templates";
import { adsIndustries, adsFeatures } from "@/content/ads";
import { products } from "@/content/products";

const base = products.ads.path;
type P = { params: Promise<{ industry: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => adsIndustries.map((i) => ({ industry: i.slug }));

const titleOf = (t: string) => `Google Ads & Meta Ads Management for ${t}`;
const descOf = (name: string) => `Run Google Ads and Meta Ads for ${name} from one platform. Set budgets by city, automate rules and track cost per lead.`;

export async function generateMetadata({ params }: P) {
  const { industry } = await params;
  const i = adsIndustries.find((x) => x.slug === industry);
  if (!i) return {};
  return buildMetadata({ title: titleOf(i.title), description: descOf(i.name), path: `${base}/for/${i.slug}` });
}

export default async function Page({ params }: P) {
  const { industry } = await params;
  const i = adsIndustries.find((x) => x.slug === industry);
  if (!i) notFound();
  const path = `${base}/for/${i.slug}`;
  return (
    <IndustryTemplate
      i={i} path={path} product="Our ads platform" eyebrow="By industry"
      h1={titleOf(i.title)} lead={descOf(i.name)}
      trail={[{ name: products.ads.short, path: base }, { name: i.title, path }]}
      related={[
        ...adsFeatures.slice(0, 3).map((f) => ({ label: f.name, path: `${base}/features/${f.slug}` })),
        { label: "Google Business Profile management", path: products.gbp.path },
      ]}
    />
  );
}
