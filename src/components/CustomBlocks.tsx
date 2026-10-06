import Link from "next/link";
import { BenefitGrid, RelatedLinks } from "./Sections";
import { Faq } from "./Faq";
import { Cta } from "./Cta";
import { CaseStudyStrip } from "./CaseStudyStrip";
import { mdToBlocks } from "@/lib/posts";
import { pairs } from "@/lib/blocks";
import type { CustomBlock } from "@/content/customPages";
import type { CsService } from "@/content/caseStudies";

export function CustomBlocks({ blocks }: { blocks: CustomBlock[] }) {
  return (
    <>
      {blocks.map((b) => {
        switch (b.type) {
          case "richtext":
            return (
              <section key={b.id} className="mx-auto max-w-3xl space-y-4 px-4 py-8 text-lg leading-relaxed">
                {b.heading && <h2 className="text-3xl font-bold tracking-tight">{b.heading}</h2>}
                {mdToBlocks(b.text).map((x, i) =>
                  "items" in x ? <ul key={i} className="list-disc space-y-2 pl-6 text-muted">{x.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  : x.t === "h2" ? <h3 key={i} className="pt-2 text-2xl font-bold">{x.text}</h3>
                  : <p key={i} className="text-muted">{x.text}</p>)}
              </section>
            );
          case "cards":
            return <BenefitGrid key={b.id} heading={b.heading || "What you get"} items={pairs(b.text).map(([title, body]) => ({ title, body }))} />;
          case "steps":
            return (
              <section key={b.id} className="mx-auto max-w-6xl px-4 py-10">
                {b.heading && <h2 className="text-3xl font-bold tracking-tight">{b.heading}</h2>}
                <ol className="mt-8 grid gap-6 md:grid-cols-3">
                  {pairs(b.text).map(([t, d], i) => <li key={t} className="reveal lift rounded-3xl border border-slate-200 bg-white p-6"><span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 font-bold text-white">{i + 1}</span><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-2 text-muted">{d}</p></li>)}
                </ol>
              </section>
            );
          case "faq":
            return <Faq key={b.id} heading={b.heading || undefined} faqs={pairs(b.text).map(([q, a]) => ({ q, a }))} />;
          case "links":
            return <RelatedLinks key={b.id} heading={b.heading || "Explore more"} links={pairs(b.text).map(([label, path]) => ({ label, path }))} />;
          case "cases":
            return <CaseStudyStrip key={b.id} service={(b.service || undefined) as CsService | undefined} heading={b.heading || "Client success stories"} />;
          case "cta":
            return <Cta key={b.id} href={`/contact${b.service ? `?service=${b.service}` : ""}`} label={b.text || "Book a consultation"} sub={b.heading || undefined} />;
        }
      })}
    </>
  );
}
