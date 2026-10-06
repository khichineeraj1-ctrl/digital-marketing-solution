import Link from "next/link";
import { getPublishedCustomPages } from "@/lib/customPages";
import { MobileNav } from "./MobileNav";
import { site, marketplace } from "@/config/site";
import { products } from "@/content/products";
import { gbpFeatures } from "@/content/gbp";
import { adsFeatures, adsPlatforms } from "@/content/ads";
import { seoFeatures } from "@/content/seo";
import { niches } from "@/content/influencer";
import { cities } from "@/content/cities";
import { paths } from "@/lib/routes";

type Item = { label: string; path: string; desc?: string };
const menus: { label: string; items: Item[] }[] = [
  { label: "Products", items: [
    { label: products.gbp.short, path: products.gbp.path, desc: "Reviews, posts and insights for every location" },
    { label: products.influencer.short, path: products.influencer.path, desc: "Hire creators or get brand campaigns" },
    { label: products.seo.short, path: products.seo.path, desc: "Technical, content and link building SEO" },
    { label: products.ads.short, path: products.ads.path, desc: "Google Ads and Meta Ads in one workspace" },
  ] },
  { label: "Solutions", items: [
    { label: "Restaurants", path: "/google-business-profile-management/for/restaurants", desc: "Fill tables from local search" },
    { label: "Clinics & Doctors", path: "/google-business-profile-management/for/clinics-and-doctors", desc: "Get found by patients nearby" },
    { label: "Real Estate", path: "/ads-management/for/real-estate", desc: "Lower cost per qualified lead" },
    { label: "B2B & SaaS", path: "/seo-services/for/b2b-and-saas", desc: "Organic demand that fills the pipeline" },
    { label: "Automotive", path: "/ads-management/for/automotive", desc: "Catalogue and search campaigns" },
    { label: "E-commerce", path: "/ads-management/for/e-commerce", desc: "Shopping and retargeting ads" },
  ] },
  { label: "Resources", items: [
    { label: "Blog", path: "/blog", desc: "Guides on local SEO, ads and creators" },
    { label: "Pricing", path: "/pricing", desc: "Simple plans for every product" },
    { label: "Our experts", path: "/authors", desc: "The people behind our guides" },
    { label: "About", path: "/about", desc: "Who we are" },
  ] },
];

const logins = [
  { label: "Influencer Marketplace", desc: "Brands and creators log in here", href: marketplace.login },
  { label: "Ads Management OS", desc: "Google and Meta ads", href: site.apps.ads ? `${site.apps.ads}/login` : "" },
].filter((l) => l.href);
const joins = [
  { label: "Join as brand", href: marketplace.brandSignup },
  { label: "Join as creator", href: marketplace.creatorSignup },
].filter((j) => j.href);

const Chevron = () => (
  <svg className="chev h-4 w-4 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
);

export function Header() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-2">Skip to content</a>
      <div className="sticky top-0 z-40 bg-[#f6f6f8]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="tap text-xl font-extrabold sm:text-2xl tracking-tight text-brand-700">{site.name}</Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 text-[15px] font-medium lg:flex">
            {menus.map((m) => (
              <div key={m.label} className="menu relative">
                <button type="button" className="flex items-center gap-1.5 rounded-full px-4 py-2 hover:bg-white" aria-haspopup="true">{m.label}<Chevron /></button>
                <div className="menu-panel absolute left-0 top-full z-50 w-80 pt-2">
                  <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    {m.items.map((it) => (
                      <li key={it.path}>
                        <Link href={it.path} className="block rounded-xl px-4 py-3 hover:bg-brand-50">
                          <span className="font-semibold">{it.label}</span>
                          {it.desc && <span className="block text-sm font-normal text-muted">{it.desc}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <Link href="/case-studies" className="rounded-full px-4 py-2 hover:bg-white">Client Successes</Link>
            <Link href="/pricing" className="rounded-full px-4 py-2 hover:bg-white">Pricing</Link>
          </nav>
          <div className="flex items-center gap-2 text-sm font-semibold">
            {logins.length > 0 && <div className="menu relative hidden lg:block">
              <button type="button" aria-haspopup="true" className="flex items-center gap-1.5 rounded-full border border-brand-700/30 px-5 py-2.5 hover:bg-white">Log in<Chevron /></button>
              <div className="menu-panel absolute right-0 top-full z-50 w-72 pt-2">
                <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  {logins.map((l) => (
                    <li key={l.label}><a href={l.href} target="_blank" rel="noopener nofollow" className="block rounded-xl px-4 py-3 hover:bg-brand-50"><span className="font-semibold">{l.label} ↗</span><span className="block text-sm font-normal text-muted">{l.desc}</span></a></li>
                  ))}
                  {joins.length > 0 && <li className="mt-1 grid grid-cols-2 gap-2">
                    {joins.map((j) => <a key={j.label} href={j.href} target="_blank" rel="noopener nofollow" className="rounded-xl bg-brand-50 px-3 py-2.5 text-center font-semibold text-brand-700">{j.label} ↗</a>)}
                  </li>}
                  <li><Link href="/google-business-profile-management/get-started" className="mt-1 block rounded-xl px-4 py-3 text-sm text-muted hover:bg-brand-50"><b className="text-ink">Business Profile?</b> No login needed — share access instead →</Link></li>
                </ul>
              </div>
            </div>}
            <Link href="/contact" className="rounded-full bg-brand-700 px-4 py-3 text-white transition hover:bg-brand-500 sm:px-6">Book a call</Link>
            <MobileNav menus={menus} logins={logins.map((l) => ({ label: l.label, desc: l.desc, href: l.href }))} joins={joins} />
          </div>
        </div>
      </div>
    </>
  );
}

function Col({ title, links }: { title: string; links: { label: string; path: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {links.filter((l) => l.path).map((l) => <li key={l.path}>{l.path.startsWith("http") ? <a href={l.path} target="_blank" rel="noopener nofollow" className="hover:text-brand-700 hover:underline">{l.label} ↗</a> : <Link href={l.path} className="hover:text-brand-700 hover:underline">{l.label}</Link>}</li>)}
      </ul>
    </div>
  );
}

export async function Footer() {
  const more = (await getPublishedCustomPages()).filter((c) => !c.noindex).slice(0, 16);
  const { GBP, INF, ADS, SEO } = paths;
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <Col title="Business Profile" links={[{ label: "Overview", path: GBP }, ...gbpFeatures.slice(0, 5).map((f) => ({ label: f.name, path: `${GBP}/features/${f.slug}` }))]} />
        <Col title="Influencers" links={[{ label: "Marketplace", path: INF }, { label: "For brands", path: `${INF}/for-brands` }, { label: "For creators", path: `${INF}/for-influencers` }, { label: "Brand & creator login", path: marketplace.login }, ...niches.slice(0, 4).map((n) => ({ label: `${n.name} influencers`, path: `${INF}/niches/${n.slug}` }))]} />
        <Col title="Ads" links={[{ label: "Overview", path: ADS }, ...adsPlatforms.map((p) => ({ label: `${p.name} management`, path: `${ADS}/${p.slug}` })), ...adsFeatures.slice(0, 3).map((f) => ({ label: f.name, path: `${ADS}/features/${f.slug}` }))]} />
        <Col title="SEO" links={[{ label: "Overview", path: SEO }, ...seoFeatures.slice(0, 5).map((f) => ({ label: f.name, path: `${SEO}/features/${f.slug}` }))]} />
        <Col title="Cities" links={cities.slice(0, 7).map((c) => ({ label: `SEO services in ${c.name}`, path: `${SEO}/in/${c.slug}` }))} />
        <Col title="Company" links={[{ label: "About", path: "/about" }, { label: "Our experts", path: "/authors" }, { label: "Pricing", path: "/pricing" }, { label: "Client successes", path: "/case-studies" }, { label: "Blog", path: "/blog" }, { label: "Contact", path: "/contact" }, { label: "Privacy", path: "/privacy" }, { label: "Terms", path: "/terms" }]} />
      </div>
      {more.length > 0 && (
        <nav aria-label="More pages" className="mx-auto max-w-6xl border-t border-slate-200 px-4 py-6">
          <h2 className="text-sm font-semibold text-ink">More pages</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {more.map((c) => <li key={c.id}><Link href={`/${c.path}`} className="hover:text-brand-700 hover:underline">{c.title}</Link></li>)}
          </ul>
        </nav>
      )}
      <div className="border-t border-slate-200 py-5 text-center text-xs text-muted">© {new Date().getFullYear()} {site.legalName}</div>
    </footer>
  );
}
