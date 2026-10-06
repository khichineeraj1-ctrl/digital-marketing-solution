"use client";
import { useEffect, useState } from "react";

/** Progress dots for a horizontally scrolling rail (phones/tablets only). */
export function RailDots({ railId, count }: { railId: string; count: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const rail = document.getElementById(railId);
    if (!rail) return;
    const onScroll = () => {
      const first = rail.children[0] as HTMLElement | undefined;
      if (!first) return;
      const step = first.getBoundingClientRect().width + 16;
      setI(Math.min(count - 1, Math.max(0, Math.round(rail.scrollLeft / step))));
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, [railId, count]);
  const go = (n: number) => {
    const rail = document.getElementById(railId);
    const el = rail?.children[n] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };
  return (
    <div className="mt-5 flex justify-center gap-2 lg:hidden" role="group" aria-label="Choose a service">
      {Array.from({ length: count }).map((_, n) => (
        <button key={n} type="button" onClick={() => go(n)} aria-label={`Show service ${n + 1} of ${count}`} aria-current={i === n}
          className="tap grid h-6 w-6 place-items-center"><span className={`block h-2 rounded-full transition-all ${i === n ? "w-6 bg-brand-700" : "w-2 bg-slate-300"}`} /></button>
      ))}
    </div>
  );
}
