import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedLinks } from "@/components/Sections";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { articleLd } from "@/lib/jsonld";
import { getPublishedPosts, getPublishedPost, mdToBlocks, readMins } from "@/lib/posts";
import { authorForPost } from "@/lib/authors";
import { AuthorBox } from "@/components/AuthorBox";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import Link from "next/link";

export const revalidate = 60;

type P = { params: Promise<{ slug: string }> };
// New/edited posts from the admin render on demand and are revalidated on save.
export const generateStaticParams = async () => (await getPublishedPosts()).map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: P) {
  const p = await getPublishedPost((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.metaTitle, description: p.description, path: `/blog/${p.slug}`, type: "article", publishedTime: p.published, modifiedTime: p.modified });
}

export default async function Page({ params }: P) {
  const p = await getPublishedPost((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const author = await authorForPost(p);
  const sameAs = [author.links.linkedin, author.links.x, author.links.website].filter(Boolean);
  return (
    <>
      <Breadcrumbs trail={[{ name: "Blog", path: "/blog" }, { name: p.title, path }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{p.category}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{p.title}</h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
          <AuthorAvatar a={author} size={40} />
          <p>
            <span>By <Link href={`/authors/${author.slug}`} rel="author" className="font-semibold text-ink hover:underline">{author.name}</Link>{author.type === "person" && <>, {author.role}</>}</span><br />
            Published <time dateTime={p.published}>{p.published}</time> · Updated <time dateTime={p.modified}>{p.modified}</time> · {readMins(p.bodyMd)} min read
          </p>
        </div>
        <div className="mt-8 space-y-4 text-lg leading-relaxed">
          {mdToBlocks(p.bodyMd).map((b, i) =>
            "items" in b ? <ul key={i} className="list-disc space-y-2 pl-6 text-muted">{b.items.map((x) => <li key={x}>{x}</li>)}</ul>
            : b.t === "h2" ? <h2 key={i} className="pt-4 text-2xl font-bold">{b.text}</h2>
            : b.t === "h3" ? <h3 key={i} className="pt-2 text-xl font-bold">{b.text}</h3>
            : <p key={i} className="text-muted">{b.text}</p>,
          )}
        </div>
      </article>
      <AuthorBox a={author} />
      <RelatedLinks heading="Related" links={p.related} />
      <Cta />
      <JsonLd data={articleLd({ title: p.title, description: p.description, path, published: p.published, modified: p.modified, author: { name: author.name, path: `/authors/${author.slug}`, type: author.type, jobTitle: author.role, sameAs: sameAs.length ? sameAs : undefined } })} />
    </>
  );
}
