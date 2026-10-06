import Link from "next/link";
import { Pill } from "./Pill";

export function Cta({ href = "/contact", label = "Book a consultation", sub }: { href?: string; label?: string; sub?: string }) {
  return (
    <section className="px-4 py-14">
      <div className="reveal relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand-700 px-8 py-14 text-white md:px-14">
        <div aria-hidden className="orb orb-a -right-16 -top-24 h-72 w-72" style={{ background: "radial-gradient(circle,#b6f542,transparent 70%)", opacity: 0.5 }} />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Ready for a smarter growth plan?</h2>
            <p className="mt-2 text-brand-100">{sub ?? "Talk to a strategist. We will review your presence and share what we would do first, free of charge."}</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Pill href={href} className="!bg-white !text-brand-700 hover:!bg-lime">{label}</Pill>
            <Link href="/contact" className="text-sm text-brand-100 underline">Questions? Talk to us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
