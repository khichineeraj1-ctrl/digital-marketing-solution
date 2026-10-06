"use client";
import { useEffect, useRef } from "react";

/**
 * Footer column: always open on desktop, tap-to-expand accordion on phones.
 * Server HTML ships with `open`, so every link is present for crawlers and no-JS visitors.
 */
export function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => { if (ref.current) ref.current.open = mq.matches; };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return (
    <details ref={ref} open className="group border-b border-slate-200 lg:border-0">
      <summary
        onClick={(e) => { if (window.matchMedia("(min-width: 1024px)").matches) e.preventDefault(); }}
        className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold text-ink marker:hidden lg:cursor-default lg:min-h-0 lg:py-0"
      >
        <h2>{title}</h2>
        <svg className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180 lg:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
      </summary>
      {children}
    </details>
  );
}
