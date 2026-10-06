import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { profilePageLd } from "@/lib/jsonld";
import { getPublishedAuthors, getPublishedAuthor, postsBy } from "@/lib/authors";
import { mdToBlocks } from "@/lib/posts";

type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = async () => (await getPublishedAuthors()).map((a) => ({ slug: a.slug }));

const descOf = (a: { name: string; role: string; bio: string }) => {
  const d = `${a.name}, ${a.role}. ${a.bio.split(/\n{2,}/)[0]}`.replace(/\s+/g, " ");
  return d.length > 158 ? `${d.slice(0, 155).trimEnd()}…` : d;
};

export async function generateMetadata({ params }: P) {
  const { slug } = await params;
  const a = await getPublishedAuthor(slug);
  if (!a) return {};
  const t = a.type === "person" ? `${a.name}: ${a.role}` : `${a.name}: Articles and Expertise`;
  return buildMetadata({ title: t.length > 52 ? `${a.name} | Author Profile` : t, description: descOf(a), path: `/authors/${a.slug}`, noindex: a.sample });
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const a = await getPublishedAuthor(slug);
  if (!a) notFound();
  const path = `/authors/${a.slug}`;
  const posts = await postsBy(a.slug);
  const sameAs = [a.links.linkedin, a.links.x, a.links.website].filter(Boolean);
  const link = (href: string, label: string) => href && <li><a href={href} target="_blank" rel="me noopener nofollow" className="pill-ghost !px-4 !py-2 text-sm">{label} ↗</a></li>;
  return (
    <>
      <Breadcrumbs trail={[{ name: "Our Experts", path: "/authors" }, { name: a.name, path }]} />
      {a.sample && <p role="note" className="mx-auto mt-4 max-w-6xl rounded-xl bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900">Sample profile for layout preview, not a real person. It is hidden from search engines and never used as an article byline.</p>}
      <article className="mx-auto max-w-4xl px-4 py-10">
        <header className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <AuthorAvatar a={a} size={112} />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500">{a.type === "person" ? "Author" : "Editorial"}</p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">{a.name}</h1>
            <p className="mt-1 text-lg text-muted">{a.role}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{link(a.links.linkedin, "LinkedIn")}{link(a.links.x, "X")}{link(a.links.website, "Website")}</ul>
          </div>
        </header>

        <div className="mt-10 space-y-4 text-lg leading-relaxed text-muted">
          {mdToBlocks(a.bio).map((b, i) => ("text" in b ? <p key={i}>{b.text}</p> : null))}
        </div>

        {a.expertise.length > 0 && (
          <section className="mt-10" aria-labelledby="exp-h">
            <h2 id="exp-h" className="text-2xl font-bold tracking-tight">Areas of expertise</h2>
            <ul className="mt-4 flex flex-wrap gap-2">{a.expertise.map((e) => <li key={e} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">{e}</li>)}</ul>
          </section>
        )}
        {a.credentials.length > 0 && (
          <section className="mt-10" aria-labelledby="cred-h">
            <h2 id="cred-h" className="text-2xl font-bold tracking-tight">Experience and credentials</h2>
            <ul className="mt-4 space-y-2">{a.credentials.map((c) => <li key={c} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm"><span aria-hidden className="text-brand-500">✓</span>{c}</li>)}</ul>
          </section>
        )}

        <section className="mt-12" aria-labelledby="posts-h">
          <h2 id="posts-h" className="text-2xl font-bold tracking-tight">Articles by {a.name}</h2>
          {posts.length === 0 ? <p className="mt-4 text-muted">No published articles yet.</p> : (
            <ul className="mt-4 space-y-3">
              {posts.map((p) => (
                <li key={p.slug}><Link href={`/blog/${p.slug}`} className="lift block rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-500">{p.category}</span>
                  <span className="mt-1 block text-lg font-bold">{p.title}</span>
                  <span className="mt-1 block text-sm text-muted"><time dateTime={p.published}>{p.published}</time></span>
                </Link></li>
              ))}
            </ul>
          )}
        </section>
      </article>
      <Cta />
      <JsonLd data={profilePageLd({ name: a.name, path, type: a.type, jobTitle: a.role, description: descOf(a), image: a.photoUrl || undefined, sameAs: sameAs.length ? sameAs : undefined, knowsAbout: a.expertise, modified: a.modified, published: a.published })} />
    </>
  );
}
