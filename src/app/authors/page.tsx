import Link from "next/link";
import { Faq } from "@/components/Faq";
import { metaFor, getOverride } from "@/lib/overrides";
import { CustomBlocks } from "@/components/CustomBlocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { Cta } from "@/components/Cta";
import { getPublishedAuthors } from "@/lib/authors";

export const revalidate = 60;

export const generateMetadata = () => metaFor({
  title: "Our Experts and Authors",
  description: "Meet the strategists and specialists behind our guides on SEO, Google Business Profile, influencer marketing and paid media, and see what they know.",
  path: "/authors",
});

export default async function Page() {
  const ov = await getOverride("/authors");
  const authors = await getPublishedAuthors();
  return (
    <>
      <Breadcrumbs trail={[{ name: "Our Experts", path: "/authors" }]} />
      <Hero h1={ov?.h1 ?? "Meet our experts"} lead={ov?.lead ?? "The people behind our guides and strategies: who they are, what they know, and what they have written."} />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-14 md:grid-cols-2 lg:grid-cols-3">
        {authors.map((a) => (
          <article key={a.slug} className="reveal lift group rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-4"><AuthorAvatar a={a} size={64} /><div><h2 className="text-xl font-bold"><Link href={`/authors/${a.slug}`}>{a.name}</Link></h2><p className="text-sm text-muted">{a.role}</p></div></div>
            <p className="mt-4 line-clamp-3 text-muted">{a.bio.split(/\n{2,}/)[0]}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-brand-700">{a.expertise.slice(0, 4).map((e) => <li key={e} className="rounded-full bg-brand-50 px-3 py-1">{e}</li>)}</ul>
            {a.sample && <p className="mt-3 text-xs font-semibold text-amber-700">Sample profile</p>}
          </article>
        ))}
      </section>
      {ov?.blocks?.length ? <CustomBlocks blocks={ov.blocks} /> : null}
      {ov?.faqs?.length ? <Faq faqs={ov.faqs} /> : null}
      <Cta />
    </>
  );
}
