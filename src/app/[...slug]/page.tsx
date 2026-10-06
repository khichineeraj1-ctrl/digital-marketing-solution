import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { CustomBlocks } from "@/components/CustomBlocks";
import { JsonLd } from "@/components/JsonLd";
import { Cta } from "@/components/Cta";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/config/site";
import { getPublishedCustomPage, getPublishedCustomPages } from "@/lib/customPages";

type P = { params: Promise<{ slug: string[] }> };

// Pages created in /admin/pages. Code-defined routes always win, so this only receives unmatched URLs.
export const generateStaticParams = async () => (await getPublishedCustomPages()).map((p) => ({ slug: p.path.split("/") }));

export async function generateMetadata({ params }: P) {
  const { slug } = await params;
  const p = await getPublishedCustomPage(slug.join("/"));
  if (!p) return { title: { absolute: "Page not found" }, robots: { index: false, follow: true } };
  return buildMetadata({ title: p.metaTitle, description: p.description, path: `/${p.path}`, noindex: p.noindex });
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const p = await getPublishedCustomPage(slug.join("/"));
  if (!p) notFound();
  const path = `/${p.path}`;
  const hasCta = p.blocks.some((b) => b.type === "cta");
  const ctaHref = `/contact${p.ctaService ? `?service=${p.ctaService}` : ""}`;
  const webPage = { "@context": "https://schema.org", "@type": "WebPage", name: p.title, description: p.description, url: absoluteUrl(path), dateModified: p.modified, isPartOf: { "@id": `${site.url}#website` }, publisher: { "@id": `${site.url}#organization` } };
  return (
    <>
      <Breadcrumbs trail={[{ name: p.title, path }]} />
      <Hero eyebrow={p.eyebrow || undefined} h1={p.title} lead={p.lead} primary={{ href: ctaHref, label: p.ctaLabel || "Book a consultation" }} />
      <CustomBlocks blocks={p.blocks} />
      {!hasCta && <Cta href={ctaHref} label={p.ctaLabel || "Book a consultation"} />}
      <JsonLd data={webPage} />
    </>
  );
}
