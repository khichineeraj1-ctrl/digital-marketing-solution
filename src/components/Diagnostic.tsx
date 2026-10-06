"use client";
import { useState } from "react";
import { Pill } from "./Pill";

type Svc = "gbp" | "seo" | "ads" | "influencer" | "other";
const Q1 = [
  { v: "found", l: "Customers can't find us when they search" },
  { v: "cost", l: "Our leads cost too much" },
  { v: "brand", l: "People don't know or trust our brand yet" },
  { v: "start", l: "I'm not sure where to start" },
];
const Q2 = [
  { v: "local", l: "Customers visit our location(s)" },
  { v: "online", l: "We sell or generate leads online" },
];
const RESULT: Record<Svc, { title: string; why: string; next: string[] }> = {
  gbp: { title: "Start with your Google Business Profile", why: "Local customers decide from the map and reviews. Fixing and managing your profile is the fastest, lowest-cost way to be found.", next: ["Share manager access to your profile", "We audit and fix the gaps", "Add local SEO once the base is strong"] },
  seo: { title: "Start with an SEO strategy", why: "Online demand starts with search. A technical and content plan builds traffic that keeps compounding.", next: ["Technical and competitor audit", "Intent-led content roadmap", "Reporting tied to leads"] },
  ads: { title: "Start by fixing your paid media", why: "When leads cost too much, the answer is usually structure, tracking and budget control, not simply more spend.", next: ["Account and tracking review", "City or segment level targets", "Automation rules to stop waste"] },
  influencer: { title: "Start with a creator-led campaign", why: "Trust is built faster through creators your audience already follows, especially for new or consumer brands.", next: ["Shortlist creators by niche and city", "Brief, approve and track every post", "Repeat what sells"] },
  other: { title: "Start with a growth consultation", why: "When priorities are unclear, a short strategy session across search, social and paid saves months of guesswork.", next: ["30-minute conversation", "Free audit of your current presence", "A prioritised plan"] },
};

export function Diagnostic() {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const need2 = q1 === "found";
  const done = q1 && (!need2 || q2);
  const svc: Svc | null = !done ? null : q1 === "cost" ? "ads" : q1 === "brand" ? "influencer" : q1 === "start" ? "other" : q2 === "local" ? "gbp" : "seo";
  const r = svc ? RESULT[svc] : null;
  const opt = (on: boolean) => `rounded-2xl border px-5 py-3.5 text-left font-semibold transition ${on ? "border-brand-700 bg-brand-700 text-white shadow" : "border-slate-200 bg-white hover:border-brand-500 hover:bg-brand-50"}`;

  return (
    <section id="diagnostic" className="scroll-mt-24 px-4 py-16" aria-labelledby="diag-h">
      <div className="mx-auto grid max-w-6xl items-start gap-10 rounded-[2rem] bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">Quick diagnostic</p>
          <h2 id="diag-h" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Where should you start?</h2>
          <p className="mt-4 text-lg text-muted">Answer two quick questions and get a starting point. It&apos;s a conversation starter: a strategist will refine it with you.</p>
        </div>
        <div>
          <p className="font-bold">1. What&apos;s holding growth back?</p>
          <div className="mt-3 grid gap-2.5">{Q1.map((o) => <button key={o.v} type="button" aria-pressed={q1 === o.v} onClick={() => { setQ1(o.v); setQ2(null); }} className={opt(q1 === o.v)}>{o.l}</button>)}</div>
          {need2 && (
            <>
              <p className="mt-6 font-bold">2. How do customers buy from you?</p>
              <div className="mt-3 grid gap-2.5">{Q2.map((o) => <button key={o.v} type="button" aria-pressed={q2 === o.v} onClick={() => setQ2(o.v)} className={opt(q2 === o.v)}>{o.l}</button>)}</div>
            </>
          )}
          {r && svc && (
            <div role="status" className="mt-8 rounded-3xl bg-brand-700 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-lime">Suggested starting point</p>
              <h3 className="mt-2 text-2xl font-bold">{r.title}</h3>
              <p className="mt-2 text-brand-100">{r.why}</p>
              <ol className="mt-4 space-y-1.5 text-sm">{r.next.map((n, i) => <li key={n} className="flex gap-2"><b className="text-lime">{i + 1}.</b>{n}</li>)}</ol>
              <div className="mt-6"><Pill href={`/contact?service=${svc}`} className="!bg-white !text-brand-700 hover:!bg-lime">Talk to a strategist</Pill></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
