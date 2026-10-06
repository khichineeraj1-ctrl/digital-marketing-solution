import Link from "next/link";
import { products } from "@/content/products";
import { RailDots } from "./RailDots";
import { ArtGbp, ArtSeo, ArtInfluencer, ArtAds } from "./ProductArt";

const services = [
  { key: "gbp", title: "GBP OS by Adtrafix", line: "Get found on Maps. Reviews handled for you.", tags: ["Reviews", "Posts", "Reports"], path: products.gbp.path, grad: "from-emerald-100 via-teal-50 to-white", art: <ArtGbp /> },
  { key: "seo", title: "SEO Services", line: "Rank higher, then turn traffic into leads.", tags: ["Technical", "Content", "Links"], path: products.seo.path, grad: "from-indigo-100 via-violet-50 to-white", art: <ArtSeo /> },
  { key: "influencer", title: "Adtrafix Match", line: "Creators matched by niche and city.", tags: ["Brands", "Creators", "Payouts"], path: products.influencer.path, grad: "from-pink-100 via-rose-50 to-white", art: <ArtInfluencer /> },
  { key: "ads", title: "Google & Meta Ads", line: "Lower cost per lead, with smart automation.", tags: ["Google", "Meta", "Reporting"], path: products.ads.path, grad: "from-orange-100 via-amber-50 to-white", art: <ArtAds /> },
];

export function ServiceShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="services-h">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">What we do</p>
        <h2 id="services-h" className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Four ways we drive growth</h2>
      </div>
      <div className="mt-10 -mx-4 sm:mx-0">
        <ul id="service-rail" className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {services.map((s) => (
            <li key={s.key} className="reveal group relative w-[78%] shrink-0 snap-center sm:w-[44%] lg:w-auto">
              <article className="lift flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <div className={`grid h-52 place-items-center overflow-hidden bg-gradient-to-br ${s.grad} transition-transform duration-500 group-hover:scale-[1.04]`} aria-hidden>{s.art}</div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-bold leading-tight"><Link href={s.path} className="after:absolute after:inset-0 after:content-['']">{s.title}</Link></h3>
                  <p className="mt-1.5 text-muted">{s.line}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">{s.tags.map((t) => <li key={t} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{t}</li>)}</ul>
                  <span aria-hidden className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-700">Explore <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-700 text-white transition-transform group-hover:translate-x-1">→</span></span>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <RailDots railId="service-rail" count={services.length} />
      </div>
    </section>
  );
}
