import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { BenefitGrid, RelatedLinks } from "@/components/Sections";
import { CaseStudyStrip } from "@/components/CaseStudyStrip";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { softwareLd } from "@/lib/jsonld";
import { products, pricing } from "@/content/products";
import { marketplace } from "@/config/site";
import { niches, influencerFaqs } from "@/content/influencer";
import { cities } from "@/content/cities";

const p = products.influencer;
export const metadata = buildMetadata({ title: p.metaTitle, description: p.metaDescription, path: p.path });

export default async function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: p.short, path: p.path }]} />
      <Hero eyebrow="Adtrafix Match" h1={p.h1} lead={p.lead} primary={{ href: marketplace.brandSignup, label: "Join as a brand" }} secondary={{ href: marketplace.creatorSignup, label: "Join as a creator" }} />
      <RelatedLinks heading="Two ways to use the marketplace" links={[
        { label: "For brands — hire creators", path: `${p.path}/for-brands`, note: "Find, brief and pay creators." },
        { label: "For influencers — get campaigns", path: `${p.path}/for-influencers`, note: "Free profile, brand briefs, reliable payouts." },
      ]} />
      <RelatedLinks heading="Browse creators by niche" links={niches.map((n) => ({ label: `${n.name} influencers`, path: `${p.path}/niches/${n.slug}` }))} />
      <RelatedLinks heading="Creators by city" links={cities.map((c) => ({ label: `Influencers in ${c.name}`, path: `${p.path}/in/${c.slug}` }))} />
      <CaseStudyStrip service="influencer" heading="Results our clients see" />
      <Faq faqs={influencerFaqs} />
      <Cta href="/contact?service=influencer" label="Get a managed campaign" sub="Want us to plan and run the campaign for you? Tell us your goal." />
      <JsonLd data={softwareLd({ name: p.name, description: p.metaDescription, path: p.path, fromPrice: pricing[1].from })} />
    </>
  );
}
