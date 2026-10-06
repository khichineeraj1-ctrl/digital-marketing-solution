import Link from "next/link";
import { getPublishedCaseStudies } from "@/lib/caseStudies";
import { CaseStudyCard } from "./CaseStudyCards";
import type { CsService } from "@/content/caseStudies";

export async function CaseStudyStrip({ service, heading = "Client success stories" }: { service?: CsService; heading?: string }) {
  const all = await getPublishedCaseStudies();
  const list = (service ? all.filter((c) => c.services.includes(service)) : all).slice(0, 3);
  if (!list.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="cs-strip-h">
      <div className="flex items-end justify-between gap-4">
        <h2 id="cs-strip-h" className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
        <Link href="/case-studies" className="tap font-semibold text-brand-700 underline">All client successes</Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">{list.map((c) => <CaseStudyCard key={c.slug} c={c} />)}</div>
    </section>
  );
}
