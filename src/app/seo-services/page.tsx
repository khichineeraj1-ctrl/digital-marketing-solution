import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { BenefitGrid, RelatedLinks } from "@/components/Sections";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { CaseStudyStrip } from "@/components/CaseStudyStrip";
import { serviceLd } from "@/lib/jsonld";
import { products, seoFaqs } from "@/content/products";
import { seoFeatures, seoIndustries } from "@/content/seo";
import { cities } from "@/content/cities";

const p = products.seo;
export const metadata = buildMetadata({ title: p.metaTitle, description: p.metaDescription, path: p.path });

const process = [
  ["Audit", "We review technical health, content, links and competitors to find the biggest opportunities."],
  ["Strategy", "A prioritised roadmap tied to your goals: leads, sales or local visibility."],
  ["Execute", "Fixes, content and link building delivered by a dedicated team, month after month."],
  ["Report", "Clear monthly reporting on traffic, leads and revenue, not vanity rankings."],
];

export default async function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: p.short, path: p.path }]} />
      <Hero eyebrow="SEO that compounds" h1={p.h1} lead={p.lead} primary={{ href: "/contact?service=seo", label: p.cta }} secondary={{ href: "/case-studies", label: "See client results" }} />
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="proc-h">
        <h2 id="proc-h" className="text-3xl font-bold tracking-tight">How we work</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {process.map(([t, d], i) => (
            <li key={t} className="reveal lift rounded-3xl border border-slate-200 bg-white p-6"><span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 font-bold text-white">{i + 1}</span><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-2 text-muted">{d}</p></li>
          ))}
        </ol>
      </section>
      <BenefitGrid heading="What's included" items={seoFeatures.slice(0, 4).map((f) => ({ title: f.name, body: f.metaDescription }))} />
      <RelatedLinks heading="SEO services" links={seoFeatures.map((f) => ({ label: f.name, path: `${p.path}/features/${f.slug}` }))} />
      <RelatedLinks heading="SEO for your industry" links={seoIndustries.map((i) => ({ label: `SEO for ${i.title}`, path: `${p.path}/for/${i.slug}` }))} />
      <RelatedLinks heading="SEO services across India" links={cities.map((c) => ({ label: `SEO services in ${c.name}`, path: `${p.path}/in/${c.slug}` }))} />
      <CaseStudyStrip service="seo" heading="SEO results our clients see" />
      <Faq faqs={seoFaqs} />
      <Cta href="/contact?service=seo" label={p.cta} />
      <JsonLd data={serviceLd({ name: p.name, description: p.metaDescription, path: p.path })} />
    </>
  );
}
