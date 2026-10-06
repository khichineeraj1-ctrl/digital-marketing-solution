import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { getPublishedPosts } from "@/lib/posts";
import { readMins } from "@/lib/posts";

export const metadata = buildMetadata({
  title: "Local SEO, Ads & Influencer Marketing Blog",
  description: "Practical guides on Google Business Profile, local SEO, Google Ads, Meta Ads and influencer marketing for Indian businesses and agencies.",
  path: "/blog",
});

export default async function Page() {
  const sorted = await getPublishedPosts();
  return (
    <>
      <Breadcrumbs trail={[{ name: "Blog", path: "/blog" }]} />
      <Hero h1="Growth Guides and Resources" lead="Playbooks for local SEO, paid ads and influencer marketing." />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
        {sorted.map((p) => (
          <article key={p.slug} className="rounded-2xl border border-slate-200 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{p.category}</p>
            <h2 className="mt-2 text-xl font-bold"><Link href={`/blog/${p.slug}`} className="hover:text-brand-700">{p.title}</Link></h2>
            <p className="mt-2 text-muted">{p.description}</p>
            <p className="mt-3 text-sm text-muted"><time dateTime={p.published}>{new Date(p.published).toLocaleDateString("en-IN", { dateStyle: "medium" })}</time> · {readMins(p.bodyMd)} min read</p>
          </article>
        ))}
      </section>
    </>
  );
}
