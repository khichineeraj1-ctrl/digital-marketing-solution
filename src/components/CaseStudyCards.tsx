import Link from "next/link";
import { CS_SERVICES, type CaseStudy } from "@/content/caseStudies";
import { logoUrl } from "@/lib/logoPath";

const GRADS = [
  "linear-gradient(135deg,#0b0b45,#4545e0)",
  "linear-gradient(135deg,#0b3b45,#2bb5a0)",
  "linear-gradient(135deg,#2a1068,#c04fd8)",
  "linear-gradient(135deg,#0b0b45,#7ab800)",
];
const hash = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);
export const gradFor = (slug: string) => GRADS[hash(slug) % GRADS.length];
export const svcLabel = (v: string) => CS_SERVICES.find((s) => s.value === v)?.label ?? v;

export function Cover({ c, className = "", large = false }: { c: CaseStudy; className?: string; large?: boolean }) {
  const logo = logoUrl(c.logo);
  return (
    <div aria-hidden className={`relative grid place-items-center overflow-hidden ${className}`} style={{ background: gradFor(c.slug) }}>
      <div className="orb orb-a -right-10 -top-10 h-48 w-48" style={{ background: "radial-gradient(circle,#b6f542,transparent 70%)", opacity: 0.45 }} />
      {logo ? (
        // Same white tile and padding for every client, so logos of any shape look consistent.
        <span className={`relative overflow-hidden bg-white shadow-xl shadow-black/20 ${large ? "h-44 w-64 rounded-3xl" : "h-28 w-44 rounded-2xl"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-contain ${large ? "p-6" : "p-4"}`} />
        </span>
      ) : (
        <span className="relative text-6xl font-extrabold tracking-tight text-white/90">{c.client.replace(/^Sample /, "").split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
      )}
    </div>
  );
}

export function CaseStudyCard({ c, featured = false, level = 3 }: { c: CaseStudy; featured?: boolean; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <article className={`reveal lift group overflow-hidden rounded-3xl border border-slate-200 bg-white ${featured ? "md:grid md:grid-cols-2" : ""}`}>
      <Link href={`/case-studies/${c.slug}`} tabIndex={-1} aria-hidden="true" className="block">
        <Cover c={c} large={featured} className={featured ? "h-64 md:h-full md:min-h-[22rem]" : "h-48"} />
      </Link>
      <div className={`flex flex-col ${featured ? "justify-center p-8 md:p-12" : "p-6"}`}>
        <span className="w-fit rounded-full bg-brand-700 px-3 py-1 text-sm font-semibold text-white">{c.client}</span>
        <H className={`mt-4 font-bold leading-tight tracking-tight ${featured ? "text-3xl md:text-4xl" : "text-xl"}`}>
          <Link href={`/case-studies/${c.slug}`}>{c.title}</Link>
        </H>
        <p className="mt-3 text-muted">{c.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-brand-700">
          {c.services.map((s) => <li key={s} className="rounded-full bg-brand-50 px-3 py-1">{svcLabel(s)}</li>)}
        </ul>
        {c.metrics[0] && <p className="mt-5 text-sm text-muted"><b className="text-2xl text-ink">{c.metrics[0].value}</b> {c.metrics[0].label}</p>}
        <Link href={`/case-studies/${c.slug}`} className="tap mt-5 inline-block font-semibold text-brand-700">Read the story <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span></Link>
      </div>
    </article>
  );
}
