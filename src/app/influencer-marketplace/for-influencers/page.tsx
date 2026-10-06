import { metaFor, getOverride } from "@/lib/overrides";
import { CustomBlocks } from "@/components/CustomBlocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { BenefitGrid, RelatedLinks } from "@/components/Sections";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { marketplace } from "@/config/site";
import { products } from "@/content/products";
import { forCreatorsBenefits, influencerFaqs } from "@/content/influencer";

export const revalidate = 60;

const path = `${products.influencer.path}/for-influencers`;
export const generateMetadata = () => metaFor({
  title: "Join as an Influencer and Get Brand Campaigns",
  description: "Sign up free as a creator, build a media kit and receive paid campaign briefs from brands in your niche and city. Get paid reliably on delivery.",
  path,
});

export default async function Page() {
  const ov = await getOverride("/influencer-marketplace/for-influencers");
  return (
    <>
      <Breadcrumbs trail={[{ name: products.influencer.short, path: products.influencer.path }, { name: "For influencers", path }]} />
      <Hero eyebrow="For creators" h1={ov?.h1 ?? "Sign Up as an Influencer and Start Getting Campaigns"} lead={ov?.lead ?? "Free to join. Brands in your niche and city find you, send briefs, and pay on delivery."} primary={{ href: marketplace.creatorSignup, label: "Join the creator platform" }} secondary={{ href: marketplace.login, label: "Creator log in" }} />
      <BenefitGrid heading="Why creators join" items={forCreatorsBenefits} />
      <RelatedLinks heading="Learn more" links={[
        { label: "How to run an influencer campaign", path: "/blog/how-to-run-an-influencer-campaign" },
        { label: "Brands: hire influencers", path: `${products.influencer.path}/for-brands` },
      ]} />
      {ov?.blocks?.length ? <CustomBlocks blocks={ov.blocks} /> : null}
      <Faq faqs={ov?.faqs?.length ? ov.faqs : influencerFaqs} />
      <Cta href={marketplace.creatorSignup} label="Join the creator platform" sub="Free to join on our creator platform. Brands send you campaigns directly." />
    </>
  );
}
