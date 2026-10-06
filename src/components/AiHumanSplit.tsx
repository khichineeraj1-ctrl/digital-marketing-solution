const ai = ["Monitors performance, rankings and reviews around the clock", "Drafts replies, briefs and reports for expert review", "Runs budget pacing and automated safeguards", "Spots keyword, audience and creative gaps in minutes"];
const human = ["Defines positioning, goals and the right channel mix", "Owns brand voice, approvals and sensitive decisions", "Makes the trade-offs when budgets and priorities collide", "Decides what to stop, fix and double down on"];

export function AiHumanSplit() {
  const col = (title: string, tag: string, items: string[], dark: boolean) => (
    <div className={`reveal lift rounded-3xl p-8 ${dark ? "bg-brand-700 text-white" : "border border-slate-200 bg-white"}`}>
      <p className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-lime" : "text-brand-500"}`}>{tag}</p>
      <h3 className="mt-2 text-2xl font-bold">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((i) => <li key={i} className="flex gap-3"><span aria-hidden className={dark ? "text-lime" : "text-brand-500"}>●</span><span className={dark ? "text-brand-100" : "text-muted"}>{i}</span></li>)}
      </ul>
    </div>
  );
  return (
    <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="split-h">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">Our point of view</p>
        <h2 id="split-h" className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Machine speed. Human judgement.</h2>
        <p className="mt-4 text-lg text-muted">AI is brilliant at scale and speed, and poor at knowing what your business should do next. We put each where it is strongest.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {col("AI handles the heavy lifting", "Powered by our platforms", ai, false)}
        {col("Strategists make the calls", "Led by senior consultants", human, true)}
      </div>
    </section>
  );
}
