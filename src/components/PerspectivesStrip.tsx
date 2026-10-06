import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export async function PerspectivesStrip() {
  const posts = (await getPublishedPosts()).slice(0, 3);
  if (!posts.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="persp-h">
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-widest text-brand-500">Perspectives</p><h2 id="persp-h" className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Thinking from our strategists</h2></div>
        <Link href="/blog" className="font-semibold text-brand-700 underline">All perspectives</Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.slug} className="reveal lift group rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500">{p.category}</p>
            <h3 className="mt-3 text-xl font-bold leading-snug"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
            <p className="mt-3 line-clamp-3 text-muted">{p.description}</p>
            <Link href={`/blog/${p.slug}`} className="mt-5 inline-block font-semibold text-brand-700">Read <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
