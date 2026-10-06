import { Faq } from "@/components/Faq";
import { metaFor, getOverride } from "@/lib/overrides";
import { CustomBlocks } from "@/components/CustomBlocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { Cta } from "@/components/Cta";
import { CaseStudyCard } from "@/components/CaseStudyCards";
import { CaseStudyFilter } from "@/components/CaseStudyFilter";
import { getPublishedCaseStudies } from "@/lib/caseStudies";

export const revalidate = 60;

export const generateMetadata = () => metaFor({
  title: "Client Success Stories and Case Studies",
  description: "See how brands grew with Google Business Profile management, influencer campaigns and Google and Meta ads. Real results, methods and numbers.",
  path: "/case-studies",
});

export default async function Page() {
  const ov = await getOverride("/case-studies");
  const all = await getPublishedCaseStudies();
  const [first, ...rest] = all;
  return (
    <>
      <Breadcrumbs trail={[{ name: "Client Successes", path: "/case-studies" }]} />
      <Hero h1={ov?.h1 ?? "Client Successes"} lead={ov?.lead ?? "How growing brands get found, get leads and get results with our products and teams."} />
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-4">
        {all.length === 0 ? <p className="text-center text-muted">Case studies are coming soon.</p> : (
          <CaseStudyFilter>
            <div className="mt-8 space-y-6">
              {first && <div data-svc={first.services.join(" ")}><CaseStudyCard c={first} featured level={2} /></div>}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((c) => <div key={c.slug} data-svc={c.services.join(" ")}><CaseStudyCard c={c} level={2} /></div>)}
              </div>
            </div>
          </CaseStudyFilter>
        )}
      </section>
      {ov?.blocks?.length ? <CustomBlocks blocks={ov.blocks} /> : null}
      {ov?.faqs?.length ? <Faq faqs={ov.faqs} /> : null}
      <Cta sub="Tell us your goal and we'll show you what's possible for your business." />
    </>
  );
}
