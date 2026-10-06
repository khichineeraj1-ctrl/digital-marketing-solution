import Link from "next/link";
import { products } from "@/content/products";
import { ArtGbp, ArtInfluencer } from "./ProductArt";
import { RailDots } from "./RailDots";

const platforms = [
  { key: "gbp", name: "GBP OS", by: "by Adtrafix", tagline: "Your Google Business Profile, run for you.", path: products.gbp.path, grad: "from-emerald-100 via-teal-50 to-white", accent: "text-emerald-700", art: <ArtGbp /> },
  { key: "match", name: "Adtrafix Match", by: "", tagline: "Brands and creators, matched in minutes.", path: products.influencer.path, grad: "from-pink-100 via-rose-50 to-white", accent: "text-pink-700", art: <ArtInfluencer /> },
];

/** Big hero banner: our two named platforms, shown instead of paragraphs of copy. */
export function ProductBanner() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-8 sm:pt-10 lg:pb-8 lg:pt-6">
      <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-brand-700/70">Our platforms</p>
      <div className="-mx-4 sm:mx-0">
        <ul id="platform-rail" className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-3 sm:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
          {platforms.map((p) => (
            <li key={p.key} className="group relative w-[86%] shrink-0 snap-center sm:w-[62%] lg:w-auto">
              <article className={`lift flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br ${p.grad} shadow-xl shadow-brand-700/10 lg:flex-row-reverse lg:items-center`}>
                <div className="grid place-items-center px-6 pt-8 transition-transform duration-500 group-hover:scale-105 lg:w-1/2 lg:p-5" aria-hidden><div className="scale-105 lg:scale-100">{p.art}</div></div>
                <div className="p-6 lg:w-1/2 lg:p-6 xl:p-7">
                  <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-3xl xl:text-4xl">
                    <Link href={p.path} className="after:absolute after:inset-0 after:content-['']">{p.name}{p.by && <span className="mt-0.5 block text-base font-semibold text-muted sm:text-lg">{p.by}</span>}</Link>
                  </h2>
                  <p className={`mt-3 font-medium ${p.accent}`}>{p.tagline}</p>
                  <span aria-hidden className="mt-5 inline-flex lg:mt-4 items-center gap-2 font-semibold text-brand-700">Explore <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-700 text-white transition-transform group-hover:translate-x-1">→</span></span>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <RailDots railId="platform-rail" count={platforms.length} />
      </div>
    </div>
  );
}
