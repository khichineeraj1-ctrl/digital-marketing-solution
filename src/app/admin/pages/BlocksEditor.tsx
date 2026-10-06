"use client";
import { BLOCK_TYPES, type CustomBlock } from "@/content/customPages";

const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2";
const SERVICES = [["", "None"], ["gbp", "Business Profile"], ["seo", "SEO"], ["influencer", "Influencer"], ["ads", "Ads"], ["other", "Other"]];
export const uid = () => Math.random().toString(36).slice(2, 10);

/** Add / reorder / edit content blocks. Shared by "New page" and "Edit site page". */
export function BlocksEditor({ blocks, setBlocks, title = "Content blocks", error }: { blocks: CustomBlock[]; setBlocks: React.Dispatch<React.SetStateAction<CustomBlock[]>>; title?: string; error?: React.ReactNode }) {
  const upd = (id: string, patch: Partial<CustomBlock>) => setBlocks((bs) => bs.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const move = (i: number, d: number) => setBlocks((bs) => { const n = [...bs]; const j = i + d; if (j < 0 || j >= n.length) return bs; [n[i], n[j]] = [n[j], n[i]]; return n; });
  return (
      <section className="space-y-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {error}
        {blocks.map((b, i) => {
          const meta = BLOCK_TYPES.find((t) => t.value === b.type)!;
          return (
            <div key={b.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">{i + 1}</span>
                <select aria-label="Block type" value={b.type} onChange={(e) => upd(b.id, { type: e.target.value as CustomBlock["type"] })} className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold">{BLOCK_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select>
                <div className="ml-auto flex gap-1 text-sm">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded border px-2 py-1 disabled:opacity-30" aria-label="Move up">↑</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} className="rounded border px-2 py-1 disabled:opacity-30" aria-label="Move down">↓</button>
                  <button type="button" onClick={() => setBlocks((bs) => bs.filter((x) => x.id !== b.id))} className="rounded border border-red-200 px-2 py-1 text-red-700">Remove</button>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted">{meta.help}</p>
              <input value={b.heading} onChange={(e) => upd(b.id, { heading: e.target.value })} placeholder={b.type === "cta" ? "Supporting line (optional)" : "Section heading"} className={field} />
              {b.type === "cases" ? (
                <select value={b.service} onChange={(e) => upd(b.id, { service: e.target.value })} className={field}>{[["", "All services"], ...SERVICES.slice(1, 5)].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
              ) : b.type === "cta" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <input value={b.text} onChange={(e) => upd(b.id, { text: e.target.value })} placeholder="Button text" className={field} />
                  <select value={b.service} onChange={(e) => upd(b.id, { service: e.target.value })} className={field}>{SERVICES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
                </div>
              ) : (
                <textarea value={b.text} onChange={(e) => upd(b.id, { text: e.target.value })} rows={b.type === "richtext" ? 8 : 5} className={`${field} font-mono text-sm`} />
              )}
            </div>
          );
        })}
        <div className="flex flex-wrap gap-2">
          {BLOCK_TYPES.map((t) => <button key={t.value} type="button" onClick={() => setBlocks((bs) => [...bs, { id: uid(), type: t.value, heading: "", text: "", service: "" }])} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:border-brand-500">+ {t.label}</button>)}
        </div>
      </section>

  );
}
