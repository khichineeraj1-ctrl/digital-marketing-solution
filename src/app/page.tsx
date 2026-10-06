import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { site } from "@/config/site";
import { CaseStudyStrip } from "@/components/CaseStudyStrip";
import { Horizon } from "@/components/Horizon";
import { AiHumanSplit } from "@/components/AiHumanSplit";
import { Approach } from "@/components/Approach";
import { Diagnostic } from "@/components/Diagnostic";
import { PerspectivesStrip } from "@/components/PerspectivesStrip";
import { ServiceShowcase } from "@/components/ServiceShowcase";


export const metadata = buildMetadata({
  title: "Consultative Growth Partner for the AI Era",
  description: "Senior strategists plus AI-powered platforms for SEO, Google Business Profile, influencer marketing and Google and Meta ads. Book a growth consultation.",
  path: "/",
});

const faqs = [
  { q: `What is ${site.name}?`, a: "A growth partner with four offerings: Google Business Profile management, SEO services, an influencer marketplace for brands and creators, and an operating system for Google Ads and Meta Ads." },
  { q: "Who is it for?", a: "Growing brands, multi-location businesses, agencies, and creators who want brand campaigns." },
  { q: "Can I use only one service?", a: "Yes. Each service works on its own, and they work even better together." },
];

export default function Home() {
  return (
    <>
      <Hero
        big
        eyebrow="Consultative growth partner for the AI era"
        h1="Strategy from experts. Speed from AI."
        mobileLead="Senior strategists plus AI-powered platforms for search, social and paid. Clear plans, measurable results."
        lead="Senior consultants diagnose what is holding your growth back. Our AI-powered platforms and specialist teams do the heavy lifting across search, social and paid, so you get clarity, speed and results you can measure."
        primary={{ href: "/contact", label: "Book a growth consultation" }}
        secondary={{ href: "#diagnostic", label: "Take the 2-minute diagnostic" }}
        visual={<Horizon />}
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
      <Faq faqs={faqs} />
      <Cta />
      <JsonLd data={[organizationLd(), websiteLd()]} />
    </>
  );
}
