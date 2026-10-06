import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { CityTemplate } from "@/components/templates";
import { cities, getCity } from "@/content/cities";
import { gbpFeatures } from "@/content/gbp";
import { products } from "@/content/products";

const base = products.gbp.path;
type P = { params: Promise<{ city: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ city: c.slug }));

const titleOf = (n: string) => `Google Business Profile Management in ${n}`;
const descOf = (n: string) => `Manage reviews, posts and insights for your ${n} locations. Software for businesses and agencies to rank in local search and Google Maps.`;

export async function generateMetadata({ params }: P) {
  const c = getCity((await params).city);
  if (!c) return {};
  return buildMetadata({ title: titleOf(c.name), description: descOf(c.name), path: `${base}/in/${c.slug}` });
}

export default async function Page({ params }: P) {
  const c = getCity((await params).city);
  if (!c) notFound();
  const path = `${base}/in/${c.slug}`;
  return (
    <CityTemplate
      c={c} note={c.note} path={path} eyebrow={c.state} h1={titleOf(c.name)} lead={descOf(c.name)}
      what={`Local search in ${c.name}`} areaWord="areas to target"
      trail={[{ name: products.gbp.short, path: base }, { name: c.name, path }]}
      related={[
        ...gbpFeatures.slice(0, 3).map((f) => ({ label: f.name, path: `${base}/features/${f.slug}` })),
        { label: `Influencer marketing in ${c.name}`, path: `${products.influencer.path}/in/${c.slug}` },
      ]}
      faqs={[
        { q: `Can you manage several ${c.name} outlets together?`, a: `Yes. Give us manager access to each ${c.name} location and we keep hours accurate, reply to reviews and publish posts for all of them.` },
        { q: `How do I rank higher in ${c.name} on Google Maps?`, a: "Complete every profile field, choose accurate categories, add fresh photos, publish posts and collect genuine reviews. Google ranks local results on relevance, distance and prominence." },
      ]}
    />
  );
}
