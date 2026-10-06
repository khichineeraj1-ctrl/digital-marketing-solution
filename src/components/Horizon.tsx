/** Decorative half-sphere "horizon" with a dot grid and a Signal → Insight → Action motif. Pure CSS, aria-hidden. */
export function Horizon() {
  const chip = (label: string, delay: string, pos: string) => (
    <div className={`float-chip absolute hidden items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-700 shadow-lg backdrop-blur sm:flex ${pos}`} style={{ animationDelay: delay }}>
      <span className="pulse-dot h-2 w-2 rounded-full bg-lime" style={{ animationDelay: delay }} />{label}
    </div>
  );
  return (
    <div aria-hidden className="pointer-events-none relative mx-auto mt-4 h-52 w-full max-w-4xl overflow-hidden sm:h-72 md:h-80">
      <div className="absolute left-1/2 top-10 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full sm:h-[60rem] sm:w-[60rem]"
        style={{ background: "radial-gradient(circle at 50% 8%, #e8ffb5 0%, #b6f542 12%, #5ec8ff 38%, #4545e0 62%, #0b0b45 82%)", boxShadow: "0 0 120px 20px rgba(94,200,255,.35)" }}>
        <div className="horizon-ring absolute inset-0 rounded-full opacity-60"
          style={{ background: "conic-gradient(from 0deg, transparent 0 55%, rgba(255,255,255,.55) 62%, transparent 70% 100%)" }} />
        <div className="absolute inset-0 rounded-full opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.9) 1.2px, transparent 1.4px)", backgroundSize: "22px 22px" }} />
      </div>
      {chip("Signal detected", "0s", "left-[8%] top-16")}
      {chip("Insight ready", "1.2s", "left-1/2 top-4 -translate-x-1/2")}
      {chip("Action queued", "2.4s", "right-[8%] top-20")}
    </div>
  );
}
