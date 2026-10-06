import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { RelatedLinks } from "@/components/Sections";
import { Cover, CaseStudyCard, svcLabel } from "@/components/CaseStudyCards";
import { articleLd } from "@/lib/jsonld";
import { getPublishedCaseStudies, getPublishedCaseStudy } from "@/lib/caseStudies";
import { mdToBlocks } from "@/lib/posts";
import { site } from "@/config/site";
import { products } from "@/content/products";
import type { Block } from "@/content/blog";

type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = async () => (await getPublishedCaseStudies()).map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: P) {
  const { slug } = await params;
  const c = await getPublishedCaseStudy(slug);
  if (!c) return {};
  return buildMetadata({ title: c.metaTitle, description: c.description, path: `/case-studies/${c.slug}`, type: "article", publishedTime: c.published, modifiedTime: c.modified, noindex: c.sample });
}

const Blocks = ({ md }: { md: string }) => (
  <div className="space-y-4 text-lg leading-relaxed">
    {mdToBlocks(md).map((b: Block, i) =>
      "items" in b ? <ul key={i} className="list-disc space-y-2 pl-6 text-muted">{b.items.map((x) => <li key={x}>{x}</li>)}</ul>
      : b.t === "h2" ? <h3 key={i} className="pt-2 text-xl font-bold">{b.text}</h3>
      : b.t === "h3" ? <h4 key={i} className="pt-1 text-lg font-bold">{b.text}</h4>
      : <p key={i} className="text-muted">{b.text}</p>)}
  </div>
);

const SVC_PATH = { gbp: products.gbp.path, influencer: products.influencer.path, ads: products.ads.path, seo: products.seo.path } as const;

export default async function Page({ params }: P) {
  const { slug } = await params;
  const c = await getPublishedCaseStudy(slug);
  if (!c) notFound();
  const path = `/case-studies/${c.slug}`;
  const more = (await getPublishedCaseStudies()).filter((x) => x.slug !== c.slug).slice(0, 3);
  return (
    <>
      <Breadcrumbs trail={[{ name: "Client Successes", path: "/case-studies" }, { name: c.client, path }]} />
      {c.sample && <p role="note" className="mx-auto mt-4 max-w-6xl rounded-xl bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900">Sample content for layout preview — this is not a real client or real results. It is hidden from search engines.</p>}
      <article>
        <header className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2">
          <Cover c={c} className="h-64 rounded-3xl md:h-96" />
          <div>
            <span className="rounded-full bg-brand-700 px-3 py-1 text-sm font-semibold text-white">{c.client}</span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">{c.title}</h1>
            <p className="mt-4 text-lg text-muted">{c.summary}</p>
            <dl className="mt-6 grid grid-cols-3 gap-4 text-sm">
              <div><dt className="text-muted">Industry</dt><dd className="font-semibold">{c.industry}</dd></div>
              <div><dt className="text-muted">Location</dt><dd className="font-semibold">{c.city}</dd></div>
              <div><dt className="text-muted">Duration</dt><dd className="font-semibold">{c.duration}</dd></div>
            </dl>
          </div>
        </header>

        {c.metrics.length > 0 && (
          <section aria-label="Results at a glance" className="mx-auto max-w-6xl px-4">
            <div className="grid gap-4 rounded-3xl bg-brand-700 p-8 text-white sm:grid-cols-3">
              {c.metrics.map((m) => <div key={m.label} className="reveal"><p className="text-4xl font-extrabold md:text-5xl">{m.value}</p><p className="mt-1 text-brand-100">{m.label}</p></div>)}
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl space-y-12 px-4 py-14">
          <section><h2 className="mb-4 text-3xl font-bold tracking-tight">The challenge</h2><Blocks md={c.challengeMd} /></section>
          <section><h2 className="mb-4 text-3xl font-bold tracking-tight">What we did</h2><Blocks md={c.solutionMd} /></section>
          <section><h2 className="mb-4 text-3xl font-bold tracking-tight">The results</h2><Blocks md={c.resultsMd} /></section>
          {c.quote?.text && (
            <figure className="rounded-3xl bg-white p-8 shadow-sm">
              <blockquote className="text-2xl font-semibold leading-snug">“{c.quote.text}”</blockquote>
              <figcaption className="mt-4 text-muted">{c.quote.name}, {c.quote.role}, {c.client}</figcaption>
            </figure>
          )}
        </div>
      </article>

      <RelatedLinks heading="Services used in this project" links={c.services.map((s) => ({ label: svcLabel(s), path: SVC_PATH[s], note: "See how it works" }))} />
      {more.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-bold tracking-tight">More client successes</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">{more.map((m) => <CaseStudyCard key={m.slug} c={m} />)}</div>
        </section>
      )}
      <Cta href={`/contact?service=${c.services[0] ?? ""}`} label="Get results like this" />
      <JsonLd data={articleLd({ title: c.title, description: c.description, path, published: c.published, modified: c.modified, author: { name: site.name, type: "organization" } })} />
    </>
  );
}
