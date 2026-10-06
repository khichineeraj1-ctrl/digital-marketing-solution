"use client";
import { useState } from "react";
import { CS_SERVICES } from "@/content/caseStudies";

/** Chips set data-filter on the wrapper; cards carry data-svc and hide via CSS. All stories stay in the HTML (crawlable). */
export function CaseStudyFilter({ children }: { children: React.ReactNode }) {
  const [f, setF] = useState<string>("all");
  const chip = (v: string, label: string) => (
    <button key={v} onClick={() => setF(v)} aria-pressed={f === v}
      className={`rounded-full px-5 py-3 text-sm font-semibold transition ${f === v ? "bg-brand-700 text-white" : "bg-white text-brand-700 hover:bg-brand-50"}`}>{label}</button>
  );
  return (
    <div data-filter={f}>
      <div className="flex flex-wrap justify-center gap-2 pt-2" role="group" aria-label="Filter by service">{chip("all", "All")}{CS_SERVICES.map((s) => chip(s.value, s.label))}</div>
      {children}
    </div>
  );
}
