import { metaFor, getOverride } from "@/lib/overrides";
import { CustomBlocks } from "@/components/CustomBlocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { BenefitGrid, RelatedLinks } from "@/components/Sections";
import { CaseStudyStrip } from "@/components/CaseStudyStrip";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { softwareLd } from "@/lib/jsonld";
import { products, adsFaqs, pricing } from "@/content/products";
import { site } from "@/config/site";
import { adsPlatforms, adsFeatures, adsIndustries } from "@/content/ads";

export const revalidate = 60;

const p = products.ads;
export const generateMetadata = () => metaFor({ title: p.metaTitle, description: p.metaDescription, path: p.path });

export default async function Page() {
  const ov = await getOverride("/ads-management");
  return (
    <>
      <Breadcrumbs trail={[{ name: p.short, path: p.path }]} />
      <Hero eyebrow="Formerly AdWords + Facebook Ads" h1={ov?.h1 ?? p.h1} lead={ov?.lead ?? p.lead} primary={{ href: "/contact?service=ads", label: p.cta }} secondary={{ href: site.apps.ads, label: "Open the app" }} />
      <RelatedLinks heading="Platforms" links={adsPlatforms.map((x) => ({ label: `${x.name} management`, path: `${p.path}/${x.slug}`, note: x.metaDescription }))} />
      <BenefitGrid heading="Built for performance teams" items={adsFeatures.slice(0, 4).map((f) => ({ title: f.name, body: f.metaDescription }))} />
      <RelatedLinks heading="Features" links={adsFeatures.map((f) => ({ label: f.name, path: `${p.path}/features/${f.slug}` }))} />
      <RelatedLinks heading="By industry" links={adsIndustries.map((i) => ({ label: `Ads for ${i.title}`, path: `${p.path}/for/${i.slug}` }))} />
      <CaseStudyStrip service="ads" heading="Results our clients see" />
      {ov?.blocks?.length ? <CustomBlocks blocks={ov.blocks} /> : null}
      <Faq faqs={ov?.faqs?.length ? ov.faqs : adsFaqs} />
      <Cta href="/contact?service=ads" label={p.cta} />
      <JsonLd data={softwareLd({ name: p.name, description: p.metaDescription, path: p.path, fromPrice: pricing[2].from })} />
    </>
  );
}
