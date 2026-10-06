import { Faq } from "@/components/Faq";
import { metaFor, getOverride } from "@/lib/overrides";
import { CustomBlocks } from "@/components/CustomBlocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { AiHumanSplit } from "@/components/AiHumanSplit";
import { Cta } from "@/components/Cta";
import { RelatedLinks } from "@/components/Sections";
import { site } from "@/config/site";

export const revalidate = 60;

export const generateMetadata = () => metaFor({
  title: "About Us: A Consultative Growth Partner",
  description: "We pair senior strategists with AI-powered platforms to grow brands through search, Google Business Profile, influencers and paid media across India.",
  path: "/about",
});

const beliefs = [
  { t: "Diagnose before you prescribe", d: "Most growth problems are mis-diagnosed. We start with the evidence, not a standard package." },
  { t: "AI for speed, people for judgement", d: "Automation does the monitoring, drafting and pacing. Experienced strategists make the decisions that shape your brand." },
  { t: "Accountable to outcomes", d: "We report in leads, sales and cost per result, and we are clear about what is and is not within our control." },
];

export default async function Page() {
  const ov = await getOverride("/about");
  return (
    <>
      <Breadcrumbs trail={[{ name: "About Us", path: "/about" }]} />
      <Hero h1={ov?.h1 ?? "A consultative growth partner for the AI era"} lead={ov?.lead ?? `${site.name} combines senior strategists with our own AI-powered platforms, so ambitious brands get expert thinking and the speed to act on it.`} primary={{ href: "/contact", label: "Book a consultation" }} />
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="beliefs-h">
        <h2 id="beliefs-h" className="text-3xl font-bold tracking-tight">What we believe</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {beliefs.map((b) => <div key={b.t} className="reveal lift rounded-3xl border border-slate-200 bg-white p-7"><h3 className="text-xl font-bold">{b.t}</h3><p className="mt-3 text-muted">{b.d}</p></div>)}
        </div>
      </section>
      <AiHumanSplit />
      <RelatedLinks heading="What we do" links={[
        { label: "SEO services", path: "/seo-services" },
        { label: "Google Business Profile management", path: "/google-business-profile-management" },
        { label: "Influencer marketplace", path: "/influencer-marketplace" },
        { label: "Google & Meta Ads management", path: "/ads-management" },
        { label: "Client successes", path: "/case-studies" },
      ]} />
      {ov?.blocks?.length ? <CustomBlocks blocks={ov.blocks} /> : null}
      {ov?.faqs?.length ? <Faq faqs={ov.faqs} /> : null}
      <Cta />
    </>
  );
}
