import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/config/site";

export const metadata = buildMetadata({ title: "Terms of Service", description: "The terms that apply when you use our Google Business Profile, influencer marketplace and ads management products and services in India.", path: "/terms" });

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Terms of Service", path: "/terms" }]} />
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <div className="mt-6 space-y-4 text-muted"><p>PLACEHOLDER — replace with your counsel-approved terms before launch.</p></div>
      </section>
    </>
  );
}
