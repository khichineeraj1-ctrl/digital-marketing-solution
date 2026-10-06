import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/config/site";

export const metadata = buildMetadata({ title: "Privacy Policy", description: "How we collect, use and protect personal data when you use our Google Business Profile, influencer marketplace and ads management products.", path: "/privacy" });

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Privacy Policy", path: "/privacy" }]} />
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <div className="mt-6 space-y-4 text-muted"><p>PLACEHOLDER — replace with your counsel-approved privacy policy (DPDP Act 2023 compliant) before launch.</p></div>
      </section>
    </>
  );
}
