import { metaFor, getOverride } from "@/lib/overrides";
import { CustomBlocks } from "@/components/CustomBlocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { BenefitGrid, RelatedLinks } from "@/components/Sections";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { serviceLd } from "@/lib/jsonld";
import { products } from "@/content/products";

export const revalidate = 60;

const PATH = "/social-media-management";
const NAME = "Social Media Management";
const TITLE = "Social Media Management Services in India | Adtrafix";
const DESC = "Social media management in India: strategy, content, community and reporting for Instagram, Facebook, LinkedIn and YouTube, led by experts and sped up by AI.";
const CTA = "/contact?service=other";

export const generateMetadata = () => metaFor({ title: TITLE, description: DESC, path: PATH });

const process = [
  ["Audit", "We review your channels, audience and competitors to see what is working and where the gaps are."],
  ["Plan", "A content strategy and monthly calendar tied to your goals: awareness, leads or sales."],
  ["Publish", "Posts, reels and stories created, scheduled and published, with community replies handled."],
  ["Report", "Monthly reporting on reach, engagement and leads, with clear next steps."],
];

const included = [
  { title: "Strategy and content calendar", body: "A channel-by-channel plan and a monthly calendar built around your brand, audience and offers." },
  { title: "Creative and copy", body: "Posts, carousels, reels and stories designed and written for each platform." },
  { title: "Community management", body: "Comments and messages answered promptly and in your brand voice." },
  { title: "Reporting that matters", body: "Reach, engagement and leads in plain language, not just vanity numbers." },
];

const faqs = [
  { q: "Which platforms do you manage?", a: "Instagram, Facebook, LinkedIn and YouTube. We recommend the channels where your customers actually spend time instead of being everywhere." },
  { q: "Do you create the content or only schedule it?", a: "Both. We plan, create, schedule and publish the content, and handle comments and messages, so you are not left to produce it yourself." },
  { q: "Can you also run paid campaigns and creator collaborations?", a: "Yes. We can amplify your best posts with Google and Meta ads and bring in creators through Adtrafix Match, so organic, paid and creator work support each other." },
  { q: "How do you measure results?", a: "We agree goals up front, such as reach, engagement, enquiries or sales, and report on them every month with recommendations for the next one." },
  { q: "Do you work with local and multi-location businesses?", a: "Yes. We pair social media with Google Business Profile management so every location is visible both on social and in local search." },
];

export default async function Page() {
  const ov = await getOverride(PATH);
  return (
    <>
      <Breadcrumbs trail={[{ name: NAME, path: PATH }]} />
      <Hero eyebrow="Social that builds your brand" h1={ov?.h1 ?? "Social Media Management Services"} lead={ov?.lead ?? "Strategy, content and community for your brand on Instagram, Facebook, LinkedIn and YouTube. Strategist-led, AI-assisted, reported every month."} primary={{ href: CTA, label: "Talk to an expert" }} secondary={{ href: "/case-studies", label: "See client results" }} />
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="proc-h">
        <h2 id="proc-h" className="text-3xl font-bold tracking-tight">How we work</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {process.map(([t, d], i) => (
            <li key={t} className="reveal lift rounded-3xl border border-slate-200 bg-white p-6"><span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 font-bold text-white">{i + 1}</span><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-2 text-muted">{d}</p></li>
          ))}
        </ol>
      </section>
      <BenefitGrid heading="What's included" items={included} />
      <RelatedLinks heading="Grow beyond organic posts" links={[
        { label: products.influencer.short, path: products.influencer.path, note: "Hire creators by niche and city" },
        { label: products.ads.short, path: products.ads.path, note: "Promote your best content with Google and Meta ads" },
        { label: products.gbp.short, path: products.gbp.path, note: "Be found in local search too" },
        { label: products.seo.short, path: products.seo.path, note: "Turn content into organic traffic" },
      ]} />
      {ov?.blocks?.length ? <CustomBlocks blocks={ov.blocks} /> : null}
      <Faq faqs={ov?.faqs?.length ? ov.faqs : faqs} />
      <Cta href={CTA} label="Talk to an expert" />
      <JsonLd data={serviceLd({ name: NAME, description: DESC, path: PATH })} />
    </>
  );
}
