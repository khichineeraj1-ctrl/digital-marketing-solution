import Link from "next/link";
import { getPublishedCustomPages } from "@/lib/customPages";
import { FooterCol } from "./FooterCol";
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
    { label: products.gbp.short, path: products.gbp.path, desc: "Google Business Profile, run for you" },
    { label: products.influencer.short, path: products.influencer.path, desc: "Influencer marketplace for brands and creators" },
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
  { label: "Adtrafix Match", desc: "Brands and creators log in here", href: marketplace.login },
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:py-4">
          <Link href="/" className="tap text-[1.375rem] font-extrabold leading-none tracking-tight text-brand-700 sm:text-2xl">{site.name}</Link>
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
          <div className="flex items-center gap-2 text-sm font-semibold max-sm:gap-2.5">
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
            <Link href="/contact" className="tap rounded-full bg-brand-700 px-3.5 py-2 text-[13px] text-white transition hover:bg-brand-500 sm:px-6 sm:py-3 sm:text-sm">Book a call</Link>
            <MobileNav menus={menus} logins={logins.map((l) => ({ label: l.label, desc: l.desc, href: l.href }))} joins={joins} />
          </div>
        </div>
      </div>
    </>
  );
}

function Col({ title, links }: { title: string; links: { label: string; path: string }[] }) {
  return (
    <FooterCol title={title}>
      <ul className="space-y-1 pb-4 text-sm text-muted lg:mt-3 lg:space-y-2 lg:pb-0">
        {links.filter((l) => l.path).map((l) => (
          <li key={l.path}>
            {l.path.startsWith("http")
              ? <a href={l.path} target="_blank" rel="noopener nofollow" className="block py-1.5 hover:text-brand-700 hover:underline lg:py-0">{l.label} ↗</a>
              : <Link href={l.path} className="block py-1.5 hover:text-brand-700 hover:underline lg:py-0">{l.label}</Link>}
          </li>
        ))}
      </ul>
    </FooterCol>
  );
}

export async function Footer() {
  const more = (await getPublishedCustomPages()).filter((c) => !c.noindex).slice(0, 16);
  const { GBP, INF, ADS, SEO } = paths;
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      {/* brand + call to action */}
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <p className="text-2xl font-extrabold tracking-tight text-brand-700">{site.name}</p>
          <p className="mt-2 text-muted">{site.tagline} Local search, SEO, creators and paid media for growing brands.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/contact" className="rounded-full bg-brand-700 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-brand-500">Book a consultation</Link>
          <a href={`mailto:${site.email}`} className="text-center font-medium text-brand-700 underline sm:px-2">{site.email}</a>
        </div>
      </div>

      {/* link columns: accordions on phones, open columns on desktop */}
      <div className="mx-auto max-w-6xl border-t border-slate-200 px-4 py-2 lg:grid lg:grid-cols-6 lg:gap-8 lg:py-10">
        <Col title="GBP OS" links={[{ label: "Overview", path: GBP }, ...gbpFeatures.slice(0, 5).map((f) => ({ label: f.name, path: `${GBP}/features/${f.slug}` }))]} />
        <Col title="SEO" links={[{ label: "Overview", path: SEO }, ...seoFeatures.slice(0, 5).map((f) => ({ label: f.name, path: `${SEO}/features/${f.slug}` }))]} />
        <Col title="Adtrafix Match" links={[{ label: "Marketplace", path: INF }, { label: "For brands", path: `${INF}/for-brands` }, { label: "For creators", path: `${INF}/for-influencers` }, ...niches.slice(0, 4).map((n) => ({ label: `${n.name} influencers`, path: `${INF}/niches/${n.slug}` }))]} />
        <Col title="Ads" links={[{ label: "Overview", path: ADS }, ...adsPlatforms.map((p) => ({ label: `${p.name} management`, path: `${ADS}/${p.slug}` })), ...adsFeatures.slice(0, 3).map((f) => ({ label: f.name, path: `${ADS}/features/${f.slug}` }))]} />
        <Col title="Cities" links={cities.slice(0, 7).map((c) => ({ label: `SEO services in ${c.name}`, path: `${SEO}/in/${c.slug}` }))} />
        <Col title="Company" links={[{ label: "About", path: "/about" }, { label: "Our experts", path: "/authors" }, { label: "Pricing", path: "/pricing" }, { label: "Client successes", path: "/case-studies" }, { label: "Blog", path: "/blog" }, { label: "Contact", path: "/contact" }]} />
      </div>

      {more.length > 0 && (
        <nav aria-label="More pages" className="mx-auto max-w-6xl border-t border-slate-200 px-4 py-6">
          <h2 className="text-sm font-semibold text-ink">More pages</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            {more.map((c) => <li key={c.id}><Link href={`/${c.path}`} className="block py-1.5 hover:text-brand-700 hover:underline">{c.title}</Link></li>)}
          </ul>
        </nav>
      )}

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName} All rights reserved.</p>
          <ul className="flex gap-5"><li><Link href="/privacy" className="block py-1.5 hover:underline">Privacy</Link></li><li><Link href="/terms" className="block py-1.5 hover:underline">Terms</Link></li></ul>
        </div>
      </div>
    </footer>
  );
}
