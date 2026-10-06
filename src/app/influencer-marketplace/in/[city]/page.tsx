import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { CityTemplate } from "@/components/templates";
import { cities, getCity } from "@/content/cities";
import { niches } from "@/content/influencer";
import { products } from "@/content/products";

const base = products.influencer.path;
type P = { params: Promise<{ city: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ city: c.slug }));

const titleOf = (n: string) => `Influencer Marketing in ${n}: Hire Local Creators`;
const descOf = (n: string) => `Find verified ${n} influencers for store launches, restaurants, clinics and brands. Filter by niche, run local campaigns and pay on delivery.`;

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
      c={c} note={c.creatorNote} path={path} eyebrow={c.state} h1={`Influencer Marketing in ${c.name}`} lead={descOf(c.name)}
      what={`Why work with ${c.name} creators`} areaWord="neighbourhoods for hyperlocal campaigns"
      trail={[{ name: products.influencer.short, path: base }, { name: c.name, path }]}
      related={[
        ...niches.slice(0, 4).map((n) => ({ label: `${n.name} influencers`, path: `${base}/niches/${n.slug}` })),
        { label: `Google Business Profile management in ${c.name}`, path: `${products.gbp.path}/in/${c.slug}` },
      ]}
      faqs={[
        { q: `How do I find influencers in ${c.name}?`, a: `Filter the marketplace by city and niche, review each creator's audience location and past work, then send a brief to shortlisted creators.` },
        { q: "Can creators help drive store visits?", a: "Yes. Pair local creators with a trackable offer code or booking link to measure visits and orders from each creator." },
      ]}
    />
  );
}
