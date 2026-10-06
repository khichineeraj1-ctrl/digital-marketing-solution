"use client";
import { useState } from "react";

const steps = [
  { k: "Diagnose", t: "Find where growth is hiding", d: "Senior consultants audit your presence, data and competitors before recommending anything.", out: ["Opportunity map across search, social and paid", "Competitor and demand gaps", "A clear view of what to fix first"] },
  { k: "Design", t: "Build a plan around your goals", d: "A channel plan and measurement framework tied to your targets and budget, not a generic package.", out: ["Prioritised roadmap with owners", "Budget split and expected ranges", "Success metrics agreed up front"] },
  { k: "Deploy", t: "Run it with specialists and AI", d: "Our teams and platforms execute: profiles, SEO, creators and ads, with automated safeguards.", out: ["Live work from day one", "Automation for monitoring and pacing", "Human review on everything customer-facing"] },
  { k: "Decide", t: "Learn, then double down", d: "Regular reviews in plain language: what worked, what to stop, and where to invest next.", out: ["Reporting on leads and revenue", "Recommendations, not just dashboards", "Quarterly strategy refresh"] },
];

export function Approach() {
  const [a, setA] = useState(0);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="approach-h">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">How we work</p>
        <h2 id="approach-h" className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Consult first. Then build.</h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-5">
        <div role="tablist" aria-label="Our approach" className="flex gap-2 overflow-x-auto md:col-span-2 md:flex-col">
          {steps.map((s, i) => (
            <button key={s.k} role="tab" id={`ap-tab-${i}`} aria-selected={a === i} aria-controls={`ap-panel-${i}`} onClick={() => setA(i)} onMouseEnter={() => setA(i)}
              className={`flex shrink-0 items-center gap-4 rounded-2xl border px-5 py-4 text-left transition md:shrink ${a === i ? "border-brand-700 bg-brand-700 text-white shadow-lg" : "border-slate-200 bg-white hover:border-brand-500"}`}>
              <span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${a === i ? "bg-lime text-brand-700" : "bg-brand-50 text-brand-700"}`}>{i + 1}</span>
              <span className="text-lg font-bold">{s.k}</span>
            </button>
          ))}
        </div>
        <div className="md:col-span-3">
          {steps.map((s, i) => (
            <div key={s.k} role="tabpanel" id={`ap-panel-${i}`} aria-labelledby={`ap-tab-${i}`} hidden={a !== i} className="h-full rounded-3xl bg-white p-8 shadow-sm md:p-10">
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{s.t}</h3>
              <p className="mt-3 text-lg text-muted">{s.d}</p>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-brand-500">What you get</p>
              <ul className="mt-3 space-y-2">{s.out.map((o) => <li key={o} className="flex gap-3 rounded-xl bg-brand-50 px-4 py-3"><span aria-hidden className="text-brand-500">✓</span>{o}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
