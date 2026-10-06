import { Orbs } from "./Orbs";
import { Pill, PillGhost } from "./Pill";

export function Hero({ eyebrow, h1, lead, primary, secondary, big = false, visual }: {
  eyebrow?: string; h1: string; lead: string; big?: boolean;
  primary?: { href: string; label: string }; secondary?: { href: string; label: string }; visual?: React.ReactNode;
}) {
  return (
    <header className={`relative isolate overflow-hidden ${big ? "" : "mb-4"}`}>
      <Orbs />
      <div className={`relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center ${big ? "pb-6 pt-20 md:pt-32" : "py-12 md:py-24"}`}>
        {eyebrow && <p className="rounded-full border border-brand-700/20 bg-white/60 px-4 py-1 text-sm font-semibold text-brand-700 backdrop-blur">{eyebrow}</p>}
        <h1 className={`mt-5 font-bold leading-[1.05] tracking-tight ${big ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl"}`}>{h1}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">{lead}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {primary && <Pill href={primary.href}>{primary.label}</Pill>}
          {secondary && <PillGhost href={secondary.href}>{secondary.label}</PillGhost>}
        </div>
      </div>
      {visual}
    </header>
  );
}
