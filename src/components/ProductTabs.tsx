"use client";
import { useState } from "react";
import { Pill } from "./Pill";

type Tab = { key: string; name: string; lead: string; path: string; points: string[] };

/** All panels stay in the DOM (hidden attr) so search engines read every product. */
export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].key);
  return (
    <div>
      <div role="tablist" aria-label="Products" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-full bg-white p-1.5 shadow-sm">
        {tabs.map((t) => (
          <button key={t.key} role="tab" id={`tab-${t.key}`} aria-selected={active === t.key} aria-controls={`panel-${t.key}`}
            onClick={() => setActive(t.key)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all ${active === t.key ? "bg-brand-700 text-white shadow" : "text-brand-700 hover:bg-brand-50"}`}>
            {t.name}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.key} role="tabpanel" id={`panel-${t.key}`} aria-labelledby={`tab-${t.key}`} hidden={active !== t.key}
          className="mx-auto mt-8 grid max-w-5xl items-center gap-8 rounded-[2rem] bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">{t.name}</h3>
            <p className="mt-4 text-lg text-muted">{t.lead}</p>
            <div className="mt-8"><Pill href={t.path}>Explore {t.name}</Pill></div>
          </div>
          <ul className="space-y-3">
            {t.points.map((p) => <li key={p} className="flex gap-3 rounded-xl bg-brand-50 p-4"><span aria-hidden className="text-brand-500">✓</span>{p}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
