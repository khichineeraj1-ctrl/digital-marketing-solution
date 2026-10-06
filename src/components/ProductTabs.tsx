"use client";
import { useState } from "react";
import { Pill } from "./Pill";

type Tab = { key: string; name: string; lead: string; path: string; points: string[] };

/** All panels stay in the DOM (hidden attr) so search engines read every product. */
export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].key);
  return (
    <div>
      {/* phones + tablets: one swipeable row of pills bleeding to the screen edges; desktop (lg+): centred capsule */}
      <div className="-mx-4 lg:mx-0">
        <div role="tablist" aria-label="Products"
          className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-4 pb-1 lg:mx-auto lg:w-fit lg:max-w-full lg:snap-none lg:flex-wrap lg:justify-center lg:overflow-visible lg:rounded-full lg:bg-white lg:p-1.5 lg:shadow-sm">
          {tabs.map((t) => (
            <button key={t.key} role="tab" id={`tab-${t.key}`} aria-selected={active === t.key} aria-controls={`panel-${t.key}`}
              onClick={(e) => { setActive(t.key); e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); }}
              className={`shrink-0 snap-center whitespace-nowrap rounded-full border px-5 py-3 text-sm font-semibold transition-all lg:border-transparent ${active === t.key ? "border-brand-700 bg-brand-700 text-white shadow" : "border-slate-200 bg-white text-brand-700 hover:bg-brand-50 lg:bg-transparent"}`}>
              {t.name}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((t) => (
        <div key={t.key} role="tabpanel" id={`panel-${t.key}`} aria-labelledby={`tab-${t.key}`} hidden={active !== t.key}
          className="mx-auto mt-8 grid max-w-5xl items-center gap-8 rounded-[2rem] bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">{t.name}</h3>
            <p className="mt-4 text-lg text-muted">{t.lead}</p>
            <div className="mt-8"><Pill href={t.path}>Explore this service</Pill></div>
          </div>
          <ul className="space-y-3">
            {t.points.map((p) => <li key={p} className="flex gap-3 rounded-xl bg-brand-50 p-4"><span aria-hidden className="text-brand-500">✓</span>{p}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
