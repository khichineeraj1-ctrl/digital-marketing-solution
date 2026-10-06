import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { CityTemplate } from "@/components/templates";
import { cities, getCity } from "@/content/cities";
import { seoFeatures } from "@/content/seo";
import { products } from "@/content/products";

const base = products.seo.path;
type P = { params: Promise<{ city: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ city: c.slug }));

const titleOf = (n: string) => `SEO Services in ${n}`;
const descOf = (n: string) => `Hire an SEO team for your ${n} business: technical audits, content, local SEO and link building that bring organic leads, with transparent reporting.`;

export async function generateMetadata({ params }: P) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  return buildMetadata({ title: titleOf(c.name), description: descOf(c.name), path: `${base}/in/${c.slug}` });
}

export default async function Page({ params }: P) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  const path = `${base}/in/${c.slug}`;
  return (
    <CityTemplate
      c={c} note={c.seoNote} path={path} eyebrow={c.state} h1={titleOf(c.name)} lead={descOf(c.name)}
      what={`Search in ${c.name}`} areaWord="areas to build local pages for"
      trail={[{ name: products.seo.short, path: base }, { name: c.name, path }]}
      related={[
        ...seoFeatures.slice(0, 3).map((f) => ({ label: f.name, path: `${base}/features/${f.slug}` })),
        { label: `Google Business Profile management in ${c.name}`, path: `${products.gbp.path}/in/${c.slug}` },
      ]}
      faqs={[
        { q: `How much do SEO services cost in ${c.name}?`, a: "It depends on your site, competition and goals. We scope a plan after an audit so you know what is included and what results to expect." },
        { q: `How long before SEO works for a ${c.name} business?`, a: "Technical fixes can help within weeks, but competitive keywords usually take three to six months or more. SEO builds over time." },
      ]}
    />
  );
}
