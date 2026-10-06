import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/config/site";
import { Pill } from "@/components/Pill";

export const metadata: Metadata = { title: { absolute: "Thanks, we've got your details" }, robots: { index: false, follow: false } };

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  if (next === "gbp") {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20">
        <h1 className="text-4xl font-bold tracking-tight">One last step: share access</h1>
        <p className="mt-4 text-lg text-muted">Add our Google account as a <b>Manager</b> of your Business Profile. We never need your password, and you can remove access at any time.</p>
        <ol className="mt-8 list-decimal space-y-4 rounded-3xl bg-white p-8 pl-12 shadow-sm">
          <li>Open your profile on Google (search your business name while signed in, or visit <a className="text-brand-700 underline" href="https://business.google.com" target="_blank" rel="noopener">business.google.com</a>).</li>
          <li>Go to <b>Profile settings → People and access → Add</b>.</li>
          <li>{site.gbpManagerEmail ? <>Enter <b className="select-all rounded bg-brand-50 px-2 py-0.5">{site.gbpManagerEmail}</b> and choose the role <b>Manager</b>.</> : <>We will email you the Google account to invite, and the role to choose: <b>Manager</b>.</>}</li>
          <li>Send the invite. We accept it, pull in your profile data and start optimising.</li>
        </ol>
        <p className="mt-6 text-muted">Stuck? Reply to our email or {site.whatsapp ? <a className="text-brand-700 underline" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">message us on WhatsApp</a> : "contact us"} and we&apos;ll walk you through it.</p>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Thanks, we&apos;ve got your enquiry</h1>
      <p className="mt-4 text-lg text-muted">An expert will reach out within one working day. Want to talk sooner?</p>
      <div className="mt-8 flex flex-col items-center gap-4">
        {site.bookingUrl && <Pill href={site.bookingUrl}>Book a 15-minute call</Pill>}
        {site.whatsapp && <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="pill-ghost">Chat on WhatsApp ↗</a>}
        <Link href="/blog" className="text-brand-700 underline">Read our growth guides while you wait</Link>
      </div>
    </section>
  );
}
