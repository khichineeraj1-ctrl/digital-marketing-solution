import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GbpConnectForm } from "./GbpConnectForm";
import { products } from "@/content/products";

const path = `${products.gbp.path}/get-started`;
export const metadata = buildMetadata({
  title: "Connect Your Google Business Profile",
  description: "Share manager access to your Google Business Profile and we handle the rest: audit, optimisation, review replies, posts and reporting. No new login needed.",
  path,
});

const steps = [
  { t: "Tell us which profile", d: "Share the Google account email that manages your profile. Never your password." },
  { t: "Add us as a Manager", d: "A 30-second step in Google Business Profile settings. You stay the owner and can remove access any time." },
  { t: "We take it from there", d: "We pull your profile data, audit it and start optimising: reviews, posts, photos and information." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: products.gbp.short, path: products.gbp.path }, { name: "Get started", path }]} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Connect your Google Business Profile</h1>
          <p className="mt-4 text-lg text-muted">No new software to learn and no extra login. Give us manager access to your profile and we run the entire show.</p>
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm md:p-8"><GbpConnectForm /></div>
        </div>
        <aside className="md:col-span-2">
          <h2 className="text-xl font-bold">How it works</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((s, i) => (
              <li key={s.t} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-700 font-bold text-white">{i + 1}</span>
                <span><b>{s.t}</b><span className="block text-muted">{s.d}</span></span>
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-2xl bg-brand-50 p-5 text-sm text-muted"><b className="text-ink">Safe by design.</b> Manager access can&apos;t transfer ownership or delete your profile, and you can revoke it from Google at any time.</p>
        </aside>
      </section>
    </>
  );
}
