"use client";
import { useActionState, useState } from "react";
import { saveCustomPageAction, type FormState } from "./actions";
import { BLOCK_TYPES, type CustomBlock, type CustomPage } from "@/content/customPages";
import { slugify } from "@/lib/slug";

const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2";
const SERVICES = [["", "None"], ["gbp", "Business Profile"], ["seo", "SEO"], ["influencer", "Influencer"], ["ads", "Ads"], ["other", "Other"]];
const Counter = ({ n, min, max }: { n: number; min: number; max: number }) => <span className={`text-xs ${n >= min && n <= max ? "text-green-700" : "text-amber-700"}`}>{n} / {min}–{max}</span>;
const uid = () => Math.random().toString(36).slice(2, 10);

export function PageForm({ page }: { page?: CustomPage }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveCustomPageAction, {});
  const [title, setTitle] = useState(page?.title ?? "");
  const [path, setPath] = useState(page?.path ?? "");
  const [touched, setTouched] = useState(!!page);
  const [metaTitle, setMetaTitle] = useState(page?.metaTitle ?? "");
  const [desc, setDesc] = useState(page?.description ?? "");
  const [f, setF] = useState({ eyebrow: page?.eyebrow ?? "", lead: page?.lead ?? "", ctaService: page?.ctaService ?? "", ctaLabel: page?.ctaLabel ?? "" });
  const [noindex, setNoindex] = useState(page?.noindex ?? false);
  const [blocks, setBlocks] = useState<CustomBlock[]>(page?.blocks ?? [{ id: uid(), type: "richtext", heading: "", text: "", service: "" }]);
  const locked = page?.status === "published";
  const err = (k: string) => state.errors?.[k] && <p role="alert" className="mt-1 text-sm text-red-700">{state.errors[k]}</p>;
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((p) => ({ ...p, [k]: e.target.value }));
  const upd = (id: string, patch: Partial<CustomBlock>) => setBlocks((bs) => bs.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const move = (i: number, d: number) => setBlocks((bs) => { const n = [...bs]; const j = i + d; if (j < 0 || j >= n.length) return bs; [n[i], n[j]] = [n[j], n[i]]; return n; });

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="id" value={page?.id ?? ""} />
      <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />
      {state.message && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{state.message}</p>}

      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Page basics</h2>
        <div><label className="font-medium" htmlFor="title">Headline (H1)</label>
          <input id="title" name="title" value={title} className={field} onChange={(e) => { setTitle(e.target.value); if (!touched) setPath(slugify(e.target.value).slice(0, 60)); }} />{err("title")}</div>
        <div>
          <label className="font-medium" htmlFor="path">URL</label>
          <div className="flex items-center gap-2 text-sm text-muted">/<input id="path" name="path" value={path} readOnly={locked} className={`${field} !mt-0 ${locked ? "bg-slate-100" : ""}`} onChange={(e) => { setTouched(true); setPath(e.target.value.toLowerCase().replace(/[^a-z0-9/-]+/g, "-").replace(/-{2,}/g, "-")); }} /></div>
          <p className="mt-1 text-xs text-muted">{locked ? "Locked: this page is live, so its URL can't change." : "Keyword-first and hyphenated, e.g. seo-services-in-noida. One or two levels, e.g. locations/noida."}</p>{err("path")}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div><label className="font-medium" htmlFor="eyebrow">Small label above the headline <span className="font-normal text-muted">(optional)</span></label><input id="eyebrow" name="eyebrow" value={f.eyebrow} onChange={set("eyebrow")} className={field} /></div>
          <div><label className="font-medium" htmlFor="ctaService">Main button sends enquiries for</label>
            <select id="ctaService" name="ctaService" value={f.ctaService} onChange={set("ctaService")} className={field}>{SERVICES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
        </div>
        <div><label className="font-medium" htmlFor="lead">Intro under the headline</label><textarea id="lead" name="lead" rows={3} value={f.lead} onChange={set("lead")} className={field} />{err("lead")}</div>
        <div><label className="font-medium" htmlFor="ctaLabel">Main button text <span className="font-normal text-muted">(default: Book a consultation)</span></label><input id="ctaLabel" name="ctaLabel" value={f.ctaLabel} onChange={set("ctaLabel")} className={field} /></div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold">Content blocks</h2>
        {err("blocks")}{err("links")}
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

      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">SEO</h2>
        <div>
          <div className="flex justify-between"><label className="font-medium" htmlFor="metaTitle">SEO title</label><Counter n={metaTitle.length || title.length} min={20} max={60} /></div>
          <input id="metaTitle" name="metaTitle" value={metaTitle} placeholder={title} onChange={(e) => setMetaTitle(e.target.value)} className={field} />{err("metaTitle")}
        </div>
        <div>
          <div className="flex justify-between"><label className="font-medium" htmlFor="description">Meta description</label><Counter n={desc.length} min={70} max={160} /></div>
          <textarea id="description" name="description" rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} className={field} />{err("description")}
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="noindex" checked={noindex} onChange={(e) => setNoindex(e.target.checked)} />Hide from Google and the sitemap (for ad landing pages or tests)</label>
      </section>

      <div className="flex flex-wrap gap-3">
        <button name="intent" value="publish" disabled={pending} className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-500 disabled:opacity-60">{locked ? "Update page" : "Publish"}</button>
        <button name="intent" value="draft" disabled={pending} className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">Save draft</button>
        {locked && <button name="intent" value="unpublish" disabled={pending} className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">Unpublish</button>}
      </div>
    </form>
  );
}
