import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { products } from "@/content/products";
import { site } from "@/config/site";
import { CaseStudyStrip } from "@/components/CaseStudyStrip";
import { Horizon } from "@/components/Horizon";
import { AiHumanSplit } from "@/components/AiHumanSplit";
import { Approach } from "@/components/Approach";
import { Diagnostic } from "@/components/Diagnostic";
import { PerspectivesStrip } from "@/components/PerspectivesStrip";
import { ProductTabs } from "@/components/ProductTabs";

const pick = (p: { key: string; name: string; lead: string; path: string }) => ({ key: p.key, name: p.name, lead: p.lead, path: p.path });

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
  const list = [products.gbp, products.seo, products.influencer, products.ads];
  return (
    <>
      <Hero
        big
        eyebrow="Consultative growth partner for the AI era"
        h1="Strategy from experts. Speed from AI."
        lead="Senior consultants diagnose what is holding your growth back. Our AI-powered platforms and specialist teams do the heavy lifting across search, social and paid, so you get clarity, speed and results you can measure."
        primary={{ href: "/contact", label: "Book a growth consultation" }}
        secondary={{ href: "#diagnostic", label: "Take the 2-minute diagnostic" }}
        visual={<Horizon />}
      />
      <AiHumanSplit />
      <Approach />
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="products-h">
        <h2 id="products-h" className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Four ways we drive growth</h2>
        <ProductTabs tabs={[
          { ...pick(products.gbp), points: ["We reply to every review in your brand voice", "Weekly posts published for every location", "Share access — no new login to manage", "Audit and fix profile gaps"] },
          { ...pick(products.seo), points: ["Technical audits and fixes", "Content and on-page strategy", "Link building and digital PR", "Reporting tied to leads"] },
          { ...pick(products.influencer), points: ["Find verified creators by niche and city", "Briefs, approvals and protected payments", "Creators sign up free and get campaigns", "Track reach and link clicks"] },
          { ...pick(products.ads), points: ["Google Ads and Meta Ads in one workspace", "Automation rules with budget guardrails", "City-wise targets and daily pacing", "Cross-channel reporting"] },
        ]} />
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-6" aria-label="Product overview">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <article key={p.key} className="reveal lift group flex flex-col rounded-3xl border border-slate-200 bg-white p-7">
              <h3 className="text-xl font-bold"><Link href={p.path}>{p.name}</Link></h3>
              <p className="mt-3 flex-1 text-muted">{p.lead}</p>
              <Link href={p.path} className="mt-6 font-semibold text-brand-700">Learn more <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span></Link>
            </article>
          ))}
        </div>
      </section>
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
