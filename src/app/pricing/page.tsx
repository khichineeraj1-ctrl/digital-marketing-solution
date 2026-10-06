import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { pricing, products } from "@/content/products";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: "Pricing for Business Profile, Influencer & Ads Tools",
  description: "Simple pricing for Google Business Profile management, the influencer marketplace and the ads management OS. Start free and scale per location or account.",
  path: "/pricing",
});

const faqs = [
  { q: "Is there a free trial?", a: "Yes. You can create an account and try each product before choosing a plan." },
  { q: "Are prices in Indian rupees?", a: "Yes, all prices are in INR and GST is added where applicable." },
  { q: "Can I cancel any time?", a: "Yes. Plans are monthly and can be cancelled from your account at any time." },
];

export default function Page() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pricing.map((p, i) => ({
      "@type": "ListItem", position: i + 1,
      item: { "@type": "Product", name: p.name, offers: { "@type": "Offer", price: String(p.from), priceCurrency: site.currency } },
    })),
  };
  return (
    <>
      <Breadcrumbs trail={[{ name: "Pricing", path: "/pricing" }]} />
      <Hero h1="Simple, Transparent Pricing" lead="Pick one product or use all three. Start free — upgrade when you grow." />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        {pricing.map((p) => (
          <div key={p.name} className="flex flex-col rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold">{p.name}</h2>
            <p className="mt-4 text-3xl font-bold">{p.from === 0 ? "Free" : `₹${p.from.toLocaleString("en-IN")}`}</p>
            <p className="text-sm text-muted">{p.unit}</p>
            <ul className="mt-5 flex-1 space-y-2 text-muted">{p.points.map((x) => <li key={x}>✓ {x}</li>)}</ul>
            <Link href={`${products[p.product].path}`} className="tap mt-6 font-semibold text-brand-700 hover:underline">See details →</Link>
            <Link href={`/contact?service=${p.product}`} className="mt-3 rounded-full bg-brand-700 px-4 py-2.5 text-center font-semibold text-white hover:bg-brand-500">Get a quote</Link>
          </div>
        ))}
      </section>
      <Faq faqs={faqs} />
      <Cta />
      <JsonLd data={ld} />
    </>
  );
}
