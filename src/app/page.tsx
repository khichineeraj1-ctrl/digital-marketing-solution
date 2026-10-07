import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { metaFor, getOverride } from "@/lib/overrides";
import { CustomBlocks } from "@/components/CustomBlocks";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { site } from "@/config/site";
import { CaseStudyStrip } from "@/components/CaseStudyStrip";
import { ProductBanner } from "@/components/ProductBanner";
import { AiHumanSplit } from "@/components/AiHumanSplit";
import { Approach } from "@/components/Approach";
import { Diagnostic } from "@/components/Diagnostic";
import { PerspectivesStrip } from "@/components/PerspectivesStrip";
import { ServiceShowcase } from "@/components/ServiceShowcase";

export const revalidate = 60;


export const generateMetadata = () => metaFor({
  title: "Digital Marketing Solutions in India",
  description: "Full-service digital marketing solutions in India: Google Business Profile, SEO, influencer marketing and Google & Meta ads. Strategist-led, AI-powered.",
  path: "/",
});

const faqs = [
  { q: `What is ${site.name}?`, a: "A growth partner with four offerings: Google Business Profile management, SEO services, an influencer marketplace for brands and creators, and an operating system for Google Ads and Meta Ads." },
  { q: "Who is it for?", a: "Growing brands, multi-location businesses, agencies, and creators who want brand campaigns." },
  { q: "Can I use only one service?", a: "Yes. Each service works on its own, and they work even better together." },
];

export default async function Home() {
  const ov = await getOverride("/");
  return (
    <>
      <Hero
        big
        eyebrow="Digital marketing solutions for the AI era"
        h1={ov?.h1 ?? "Strategy from experts. Speed from AI."}
        lead={ov?.lead ?? "Senior strategists plus AI-powered platforms for search, social and paid."}
        primary={{ href: "/contact", label: "Book a growth consultation" }}
        secondary={{ href: "#diagnostic", label: "Take the 2-minute diagnostic" }}
        visual={<ProductBanner />}
      />
      <AiHumanSplit />
      <Approach />
      <ServiceShowcase />
      <Diagnostic />
      <CaseStudyStrip />
      <PerspectivesStrip />
      <section className="mx-auto max-w-3xl px-4 pb-6 text-muted">
        <p>{site.name} is built for Indian businesses, brands and creators. <Link href="/about" className="text-brand-700 underline">Learn about us</Link> or read our <Link href="/blog" className="text-brand-700 underline">growth guides</Link>.</p>
      </section>
      {ov?.blocks?.length ? <CustomBlocks blocks={ov.blocks} /> : null}
      <Faq faqs={ov?.faqs?.length ? ov.faqs : faqs} />
      <Cta />
      <JsonLd data={[organizationLd(), websiteLd()]} />
    </>
  );
}
