import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "./EnquiryForm";
import { SERVICES } from "@/content/enquiry";
import { site, marketplace } from "@/config/site";

// ?service= only pre-selects the dropdown: all variants share one canonical URL.
export const metadata = buildMetadata({
  title: "Get a Free Audit: Contact Our Growth Team",
  description: "Tell us about your business and get a free audit of your Google Business Profile, ads or influencer plan. An expert replies within one working day.",
  path: "/contact",
});

const entry = [
  { name: "Influencer Marketplace", note: "Brands and creators: log in or join.", href: marketplace.login },
  { name: "Ads Management OS", note: "Existing customer? Open your workspace.", href: `${site.apps.ads}/login` },
];

export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const initial = SERVICES.some((s) => s.value === service) ? service! : null;
  return (
    <>
      <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Talk to a growth strategist</h1>
          <p className="mt-4 text-lg text-muted">Share a few details and a senior strategist will review your presence and reply within one working day with a free audit and a clear recommendation.</p>
          <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-brand-700/5 sm:p-8"><EnquiryForm initialService={initial} /></div>
        </div>
        <aside className="space-y-6 md:col-span-2">
          <div className="rounded-3xl bg-brand-700 p-6 text-white">
            <h2 className="text-lg font-bold">What happens next</h2>
            <ol className="mt-4 space-y-4">
              {[["We review your answers", "An expert studies your business and goals."], ["You get a free audit", "Specific, actionable findings, not a generic pitch."], ["We plan with you", "A clear scope and cost. No obligation."]].map(([t, d], i) => (
                <li key={t} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-sm font-bold">{i + 1}</span><span><b>{t}</b><span className="block text-sm text-brand-100">{d}</span></span></li>
              ))}
            </ol>
            <p className="mt-5 rounded-xl bg-white/10 p-3 text-sm">Reply within <b>one working day</b>.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Already a customer?</h2>
            <p className="mt-1 text-sm text-muted">Go straight to your product.</p>
            <p className="mt-3 rounded-xl bg-brand-50 p-3 text-sm text-muted"><b className="text-ink">Business Profile customer?</b> There is no login. <a className="text-brand-700 underline" href="/google-business-profile-management/get-started">Share access to your profile</a> and we manage it for you.</p>
            <ul className="mt-4 space-y-3">
              {entry.map((e) => (
                <li key={e.name}><a href={e.href} target="_blank" rel="noopener nofollow" className="lift block rounded-xl border border-slate-200 p-4"><span className="font-semibold">{e.name} ↗</span><span className="block text-sm text-muted">{e.note}</span></a></li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Prefer email?</h2>
            <p className="mt-2 text-muted"><a className="text-brand-700 underline" href={`mailto:${site.email}`}>{site.email}</a></p>
            {site.whatsapp && <p className="mt-2"><a className="font-semibold text-brand-700 underline" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">Chat on WhatsApp ↗</a></p>}
          </div>
        </aside>
      </section>
    </>
  );
}
