import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { BenefitGrid, RelatedLinks } from "@/components/Sections";
import { CaseStudyStrip } from "@/components/CaseStudyStrip";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { softwareLd } from "@/lib/jsonld";
import { products, gbpFaqs, pricing } from "@/content/products";
import { gbpFeatures, gbpIndustries } from "@/content/gbp";
import { cities } from "@/content/cities";

const p = products.gbp;
export const metadata = buildMetadata({ title: p.metaTitle, description: p.metaDescription, path: p.path });

export default async function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: p.short, path: p.path }]} />
      <Hero eyebrow="Formerly Google My Business" h1={p.h1} lead={p.lead} primary={{ href: "/contact?service=gbp", label: p.cta }} secondary={{ href: `${p.path}/get-started`, label: "Connect your profile" }} />
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="how-h">
        <h2 id="how-h" className="text-3xl font-bold tracking-tight">Share access. We run the rest.</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {[["1", "Share your profile email", "Tell us which Google account manages your Business Profile. Never your password."], ["2", "Add us as a Manager", "A 30-second step in Google settings. You stay the owner and can remove access any time."], ["3", "We optimise continuously", "We audit, fix and keep improving: reviews, posts, photos, information and monthly reporting."]].map(([n, t, d]) => (
            <li key={n} className="reveal lift rounded-3xl border border-slate-200 bg-white p-7"><span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 font-bold text-white">{n}</span><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-2 text-muted">{d}</p></li>
          ))}
        </ol>
      </section>
      <BenefitGrid heading="Everything to run your local presence" items={gbpFeatures.slice(0, 4).map((f) => ({ title: f.name, body: f.metaDescription }))} />
      <RelatedLinks heading="Features" links={gbpFeatures.map((f) => ({ label: f.name, path: `${p.path}/features/${f.slug}` }))} />
      <RelatedLinks heading="Built for your industry" links={gbpIndustries.map((i) => ({ label: `For ${i.title}`, path: `${p.path}/for/${i.slug}` }))} />
      <RelatedLinks heading="Available across India" links={cities.map((c) => ({ label: `Profile management in ${c.name}`, path: `${p.path}/in/${c.slug}` }))} />
      <CaseStudyStrip service="gbp" heading="Results our clients see" />
      <RelatedLinks heading="Pair it with" links={[{ label: "Local SEO services", path: "/seo-services/features/local-seo", note: "Rank your website alongside your profile" }, { label: "SEO services", path: "/seo-services" }]} />
      <Faq faqs={gbpFaqs} />
      <Cta href="/contact?service=gbp" label={p.cta} />
      <JsonLd data={softwareLd({ name: p.name, description: p.metaDescription, path: p.path, fromPrice: pricing[0].from })} />
    </>
  );
}
