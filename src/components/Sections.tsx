import Link from "next/link";
import type { Benefit } from "@/content/types";

export function BenefitGrid({ heading, items }: { heading: string; items: Benefit[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map((b) => (
          <div key={b.title} className="reveal lift rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="mt-2 text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BulletList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((t) => (
          <li key={t} className="reveal rounded-xl bg-white p-4 text-muted shadow-sm">{t}</li>
        ))}
      </ul>
    </section>
  );
}

export type LinkItem = { label: string; path: string; note?: string };

/** Crawlable internal links (descriptive anchor text) — the backbone of topical authority. */
export function RelatedLinks({ heading, links }: { heading: string; links: LinkItem[] }) {
  if (!links.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-10" aria-label={heading}>
      <h2 className="text-xl font-bold tracking-tight">{heading}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {links.map((l) => (
          <li key={l.path}>
            <Link href={l.path} className="lift group block rounded-xl border border-slate-200 bg-white p-4 font-medium text-brand-700">
              {l.label} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
              {l.note && <span className="mt-1 block text-sm font-normal text-muted">{l.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
