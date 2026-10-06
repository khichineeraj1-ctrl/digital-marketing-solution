import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: { absolute: "Page not found" }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-muted">That page does not exist or has moved. Try one of these instead:</p>
      <ul className="mt-6 space-y-2 font-medium text-brand-700">
        <li><Link href="/google-business-profile-management">Google Business Profile management</Link></li>
        <li><Link href="/influencer-marketplace">Influencer marketplace</Link></li>
        <li><Link href="/ads-management">Google Ads &amp; Meta Ads management</Link></li>
      </ul>
    </section>
  );
}
