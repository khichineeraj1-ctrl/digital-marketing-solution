import { JsonLd } from "./JsonLd";
import { faqLd, type Faq as FaqT } from "@/lib/jsonld";

/** Native <details> keeps answers in the HTML (crawlable) with zero JS. */
export function Faq({ faqs, heading = "Frequently asked questions" }: { faqs: FaqT[]; heading?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="mx-auto max-w-3xl px-4 py-14" aria-labelledby="faq-h">
      <h2 id="faq-h" className="text-2xl font-bold tracking-tight">{heading}</h2>
      <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 transition-colors open:bg-brand-50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">{f.q}<span aria-hidden className="text-xl transition-transform group-open:rotate-45">+</span></summary>
            <p className="mt-3 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(faqs)} />
    </section>
  );
}
