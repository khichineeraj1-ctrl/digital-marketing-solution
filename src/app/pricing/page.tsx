import Link from "next/link";
import { metaFor, getOverride } from "@/lib/overrides";
import { CustomBlocks } from "@/components/CustomBlocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { products } from "@/content/products";
import { getPricingConfig, priceText } from "@/lib/pricing";
import { site } from "@/config/site";

export const revalidate = 60;

export const generateMetadata = () => metaFor({
  title: "Pricing: GBP OS, Adtrafix Match, SEO and Ads",
  description: "Custom pricing for GBP OS by Adtrafix, the Adtrafix Match influencer marketplace, SEO services and ads management. Get a quote that fits your goals.",
  path: "/pricing",
});

const faqs = [
  { q: "How is pricing decided?", a: "It depends on your goals, the number of locations or channels and the scope of work. Tell us what you need and we will send a custom quote." },
  { q: "Are quotes in Indian rupees?", a: "Yes. Quotes are in INR and GST is added where applicable." },
  { q: "Can I change or stop the service later?", a: "Terms are agreed with you up front in your quote, including how to change the scope or end the service." },
];

export default async function Page() {
  const [ov, cfg] = await Promise.all([getOverride("/pricing"), getPricingConfig()]);
  const pricing = cfg.plans, show = cfg.showPrices;
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pricing.map((p, i) => ({
      "@type": "ListItem", position: i + 1,
      item: { "@type": "Product", name: p.name, ...(show ? { offers: { "@type": "Offer", price: String(p.from), priceCurrency: site.currency } } : {}) },
    })),
  };
  return (
    <>
      <Breadcrumbs trail={[{ name: "Pricing", path: "/pricing" }]} />
      <Hero h1={ov?.h1 ?? "Pricing Built Around Your Goals"} lead={ov?.lead ?? "Pick one product or use all four. Every engagement is scoped to your goals, so you only pay for what you need."} />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2 lg:grid-cols-4">
        {pricing.map((p) => (
          <div key={p.name} className="flex flex-col rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold">{p.name}</h2>
            <p className="mt-4 text-3xl font-bold">{show ? priceText(p) : "Custom quote"}</p>
            <p className="text-sm text-muted">{show ? p.unit : "Tailored to your goals and scale"}</p>
            <ul className="mt-5 flex-1 space-y-2 text-muted">{p.points.map((x) => <li key={x}>✓ {x}</li>)}</ul>
            <Link href={`${products[p.product as keyof typeof products].path}`} className="tap mt-6 font-semibold text-brand-700 hover:underline">See details →</Link>
            <Link href={`/contact?service=${p.product}`} className="mt-3 rounded-full bg-brand-700 px-4 py-2.5 text-center font-semibold text-white hover:bg-brand-500">Get a quote</Link>
          </div>
        ))}
      </section>
      {ov?.blocks?.length ? <CustomBlocks blocks={ov.blocks} /> : null}
      <Faq faqs={ov?.faqs?.length ? ov.faqs : faqs} />
      <Cta />
      <JsonLd data={ld} />
    </>
  );
}
