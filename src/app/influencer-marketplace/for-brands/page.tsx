import { metaFor, getOverride } from "@/lib/overrides";
import { CustomBlocks } from "@/components/CustomBlocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { BenefitGrid, RelatedLinks } from "@/components/Sections";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { marketplace } from "@/config/site";
import { products } from "@/content/products";
import { forBrandsBenefits, influencerFaqs, niches } from "@/content/influencer";

export const revalidate = 60;

const path = `${products.influencer.path}/for-brands`;
export const generateMetadata = () => metaFor({
  title: "Hire Influencers for Your Brand in India",
  description: "Find verified influencers by niche and city, send briefs, approve content and pay on delivery. Run influencer campaigns without agency overhead.",
  path,
});

export default async function Page() {
  const ov = await getOverride("/influencer-marketplace/for-brands");
  return (
    <>
      <Breadcrumbs trail={[{ name: products.influencer.short, path: products.influencer.path }, { name: "For brands", path }]} />
      <Hero eyebrow="For brands" h1={ov?.h1 ?? "Hire Influencers and Run Campaigns Your Way"} lead={ov?.lead ?? "Discover verified creators, manage briefs and approvals, and pay only when content is delivered."} primary={{ href: marketplace.brandSignup, label: "Join as a brand" }} secondary={{ href: marketplace.login, label: "Brand log in" }} />
      <BenefitGrid heading="Why brands use the marketplace" items={forBrandsBenefits} />
      <RelatedLinks heading="Find creators by niche" links={niches.map((n) => ({ label: `${n.name} influencers`, path: `${products.influencer.path}/niches/${n.slug}` }))} />
      {ov?.blocks?.length ? <CustomBlocks blocks={ov.blocks} /> : null}
      <Faq faqs={ov?.faqs?.length ? ov.faqs : influencerFaqs} />
      <Cta href="/contact?service=influencer" label="Get a managed campaign" sub="Prefer a done-for-you campaign? Our team plans and runs it." />
    </>
  );
}
