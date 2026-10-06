import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { BulletList, RelatedLinks } from "@/components/Sections";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { serviceLd } from "@/lib/jsonld";
import { niches, getNiche } from "@/content/influencer";
import { marketplace } from "@/config/site";
import { products } from "@/content/products";

const base = products.influencer.path;
type P = { params: Promise<{ niche: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => niches.map((n) => ({ niche: n.slug }));

const titleOf = (n: string) => `${n} Influencers in India: Hire Creators`;
const descOf = (n: string, blurb: string) => `Hire verified ${n.toLowerCase()} influencers by city and platform. ${blurb}`.slice(0, 160);

export async function generateMetadata({ params }: P) {
  const n = getNiche((await params).niche);
  if (!n) return {};
  return buildMetadata({ title: titleOf(n.name), description: descOf(n.name, n.blurb), path: `${base}/niches/${n.slug}` });
}

export default async function Page({ params }: P) {
  const n = getNiche((await params).niche);
  if (!n) notFound();
  const path = `${base}/niches/${n.slug}`;
  return (
    <>
      <Breadcrumbs trail={[{ name: products.influencer.short, path: base }, { name: `${n.name} influencers`, path }]} />
      <Hero eyebrow="Browse by niche" h1={`${n.name} Influencers in India`} lead={n.blurb} primary={{ href: marketplace.brandSignup, label: `Find ${n.name.toLowerCase()} creators` }} secondary={{ href: marketplace.creatorSignup, label: "I'm a creator" }} />
      <BulletList heading="Popular formats" items={n.formats} />
      <BulletList heading="Works well for" items={n.goodFor} />
      <RelatedLinks heading="Other niches" links={niches.filter((x) => x.slug !== n.slug).slice(0, 6).map((x) => ({ label: `${x.name} influencers`, path: `${base}/niches/${x.slug}` }))} />
      <Faq faqs={[n.faq]} />
      <Cta href="/contact?service=influencer" label="Start a campaign" />
      <JsonLd data={serviceLd({ name: titleOf(n.name), description: n.blurb, path })} />
    </>
  );
}
