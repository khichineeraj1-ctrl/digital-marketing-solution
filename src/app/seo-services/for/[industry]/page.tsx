import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { IndustryTemplate } from "@/components/templates";
import { seoIndustries, seoFeatures } from "@/content/seo";
import { products } from "@/content/products";

const base = products.seo.path;
type P = { params: Promise<{ industry: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => seoIndustries.map((i) => ({ industry: i.slug }));

const titleOf = (t: string) => `SEO Services for ${t}`;
const descOf = (name: string) => `Grow organic traffic and enquiries for ${name} with technical SEO, content and links, reported in leads.`;

export async function generateMetadata({ params }: P) {
  const { industry } = await params;
  const i = seoIndustries.find((x) => x.slug === industry);
  if (!i) return {};
  return buildMetadata({ title: titleOf(i.title), description: descOf(i.name), path: `${base}/for/${i.slug}` });
}

export default async function Page({ params }: P) {
  const { industry } = await params;
  const i = seoIndustries.find((x) => x.slug === industry);
  if (!i) notFound();
  const path = `${base}/for/${i.slug}`;
  return (
    <IndustryTemplate
      i={i} path={path} product="Our SEO team" eyebrow="By industry"
      h1={titleOf(i.title)} lead={descOf(i.name)}
      trail={[{ name: products.seo.short, path: base }, { name: i.title, path }]}
      related={[
        ...seoFeatures.slice(0, 3).map((f) => ({ label: f.name, path: `${base}/features/${f.slug}` })),
        { label: "Google & Meta Ads management", path: products.ads.path },
      ]}
    />
  );
}
