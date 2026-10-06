import { Breadcrumbs } from "./Breadcrumbs";
import { Hero } from "./Hero";
import { BenefitGrid, BulletList, RelatedLinks, type LinkItem } from "./Sections";
import { Faq } from "./Faq";
import { Cta } from "./Cta";
import { JsonLd } from "./JsonLd";
import { serviceLd } from "@/lib/jsonld";
import type { Feature, Industry, Faq as FaqT } from "@/content/types";
import type { City } from "@/content/cities";

import { contactFor } from "@/lib/contact";

type Trail = { name: string; path: string }[];

export function FeatureTemplate({ f, path, trail, related, eyebrow }: { f: Feature; path: string; trail: Trail; related: LinkItem[]; eyebrow: string }) {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <Hero eyebrow={eyebrow} h1={f.h1} lead={f.intro} primary={{ href: contactFor(path), label: "Talk to an expert" }} secondary={{ href: "/pricing", label: "View pricing" }} />
      <BenefitGrid heading={`What you get with ${f.name.toLowerCase()}`} items={f.benefits} />
      <RelatedLinks heading="Explore more" links={related} />
      <Faq faqs={f.faqs} />
      <Cta />
      <JsonLd data={serviceLd({ name: f.h1, description: f.metaDescription, path })} />
    </>
  );
}

export function IndustryTemplate({ i, product, path, trail, related, h1, lead, eyebrow }: {
  i: Industry; product: string; path: string; trail: Trail; related: LinkItem[]; h1: string; lead: string; eyebrow: string;
}) {
  const faqs: FaqT[] = [i.faq];
  return (
    <>
      <Breadcrumbs trail={trail} />
      <Hero eyebrow={eyebrow} h1={h1} lead={lead} primary={{ href: contactFor(path), label: "Talk to an expert" }} />
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-2xl font-bold tracking-tight">How customers find {i.name}</h2>
        <p className="mt-3 text-muted">In this category, {i.searchIntent}. {product} helps {i.name} show up and convert at that moment.</p>
      </section>
      <BulletList heading={`Common challenges for ${i.name}`} items={i.pains} />
      <BulletList heading="What works" items={i.tactics} />
      <RelatedLinks heading="Explore more" links={related} />
      <Faq faqs={faqs} />
      <Cta />
      <JsonLd data={serviceLd({ name: h1, description: lead, path })} />
    </>
  );
}

export function CityTemplate({ c, note, path, trail, h1, lead, eyebrow, what, related, faqs, areaWord }: {
  c: City; note: string; path: string; trail: Trail; h1: string; lead: string; eyebrow: string; what: string; related: LinkItem[]; faqs: FaqT[]; areaWord: string;
}) {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <Hero eyebrow={eyebrow} h1={h1} lead={lead} primary={{ href: contactFor(path), label: "Talk to an expert" }} />
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-2xl font-bold tracking-tight">{what}</h2>
        <p className="mt-3 text-muted">{note}</p>
        <p className="mt-3 text-muted">Popular {areaWord} in {c.name}, {c.state} include {c.areas.slice(0, -1).join(", ")} and {c.areas.at(-1)}.</p>
      </section>
      <RelatedLinks heading="Explore more" links={related} />
      <Faq faqs={faqs} />
      <Cta />
      <JsonLd data={serviceLd({ name: h1, description: lead, path, area: c.name })} />
    </>
  );
}
