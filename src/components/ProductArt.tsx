/** Decorative mini-interfaces (no real numbers). Used by the hero banner and the services showcase. */
const bar = "rounded-full bg-slate-200";
const Stars = () => <span aria-hidden className="text-sm tracking-widest text-amber-400">★★★★★</span>;

/* ── mini-interfaces: purely decorative, no real numbers ── */
export function ArtGbp() {
  return (
    <div className="float-chip w-44 rounded-2xl bg-white p-3 shadow-xl">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
        </span>
        <div className="flex-1 space-y-1.5"><div className={`h-2 w-full ${bar}`} /><div className={`h-2 w-2/3 ${bar}`} /></div>
      </div>
      <div className="mt-2"><Stars /></div>
      <div className="mt-1.5 space-y-1.5"><div className={`h-1.5 w-full ${bar}`} /><div className={`h-1.5 w-4/5 ${bar}`} /></div>
      <div className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">✓ Reply sent</div>
    </div>
  );
}
export function ArtSeo() {
  const heights = [30, 42, 38, 60, 78, 100];
  return (
    <div className="float-chip w-44 rounded-2xl bg-white p-3 shadow-xl">
      <div className="flex items-center justify-between"><div className={`h-2 w-16 ${bar}`} /><span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">↗ Organic</span></div>
      <div className="mt-3 flex h-20 items-end gap-1.5">
        {heights.map((h, i) => <div key={i} className="grow-bar flex-1 rounded-t-md bg-gradient-to-t from-indigo-500 to-indigo-300" style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }} />)}
      </div>
      <div className="mt-2 h-px w-full bg-slate-200" />
    </div>
  );
}
export function ArtInfluencer() {
  const av = ["from-pink-400 to-orange-300", "from-violet-400 to-indigo-300", "from-sky-400 to-emerald-300"];
  return (
    <div className="float-chip w-44 rounded-2xl bg-white p-3 shadow-xl">
      <div className="flex -space-x-2.5">{av.map((g, i) => <span key={i} className={`h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br ${g}`} />)}<span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-slate-100 text-[11px] font-bold text-slate-500">+</span></div>
      <div className="relative mt-3 grid h-14 place-items-center rounded-xl bg-gradient-to-br from-pink-100 to-violet-100">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-pink-500 shadow"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
        <span className="absolute bottom-1.5 right-2 text-xs text-pink-500">♥</span>
      </div>
      <div className="mt-2 inline-flex rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-bold text-pink-600">Campaign live</div>
    </div>
  );
}
export function ArtAds() {
  return (
    <div className="float-chip w-44 rounded-2xl bg-white p-3 shadow-xl">
      <div className="flex items-center justify-between"><div className={`h-2 w-14 ${bar}`} /><span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-600">Cost per lead ↓</span></div>
      <div className="mt-3 space-y-2.5">
        <div className="flex items-center gap-2"><span className="w-10 text-[10px] font-bold text-slate-500">Google</span><div className="h-3 flex-1 rounded-full bg-slate-100"><div className="grow-x h-3 w-[78%] rounded-full bg-blue-500" /></div></div>
        <div className="flex items-center gap-2"><span className="w-10 text-[10px] font-bold text-slate-500">Meta</span><div className="h-3 flex-1 rounded-full bg-slate-100"><div className="grow-x h-3 w-[58%] rounded-full bg-indigo-500" style={{ animationDelay: "150ms" }} /></div></div>
      </div>
      <div className="mt-3 flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-1.5 flex-1 rounded-full bg-orange-200" />)}</div>
    </div>
  );
}

