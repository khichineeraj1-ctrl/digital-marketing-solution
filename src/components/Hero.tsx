import { Orbs } from "./Orbs";
import { Pill, PillGhost } from "./Pill";

export function Hero({ eyebrow, h1, lead, primary, secondary, big = false, visual, mobileLead }: {
  eyebrow?: string; h1: string; lead: string; big?: boolean;
  primary?: { href: string; label: string }; secondary?: { href: string; label: string }; visual?: React.ReactNode; mobileLead?: string;
}) {
  return (
    <header className={`relative isolate overflow-hidden ${big ? "" : "mb-4"}`}>
      <Orbs />
      <div className={`relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center ${big ? "pb-4 pt-10 sm:pt-20 md:pt-32" : "py-10 md:py-24"}`}>
        {eyebrow && <p className="rounded-full border border-brand-700/20 bg-white/60 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur sm:px-4 sm:text-sm">{eyebrow}</p>}
        <h1 className={`mt-4 font-bold leading-[1.08] sm:mt-5 tracking-tight ${big ? "text-[2.5rem] sm:text-6xl md:text-7xl" : "text-[2rem] sm:text-4xl md:text-6xl"}`}>{h1}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:mt-6 sm:text-lg md:text-xl">{mobileLead ? <><span className="sm:hidden">{mobileLead}</span><span className="hidden sm:inline">{lead}</span></> : lead}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          {primary && <Pill href={primary.href}>{primary.label}</Pill>}
          {secondary && <PillGhost href={secondary.href}>{secondary.label}</PillGhost>}
        </div>
      </div>
      {visual}
    </header>
  );
}
