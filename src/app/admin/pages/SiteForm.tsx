"use client";
import { useActionState, useState } from "react";
import { saveSitePageAction, resetSitePageAction, type FormState } from "./siteActions";
import type { CustomBlock } from "@/content/customPages";
import type { Override } from "@/lib/overrides";
import { BlocksEditor } from "./BlocksEditor";

const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2";
const Counter = ({ n, min, max }: { n: number; min: number; max: number }) => <span className={`text-xs ${n === 0 || (n >= min && n <= max) ? "text-green-700" : "text-amber-700"}`}>{n} / {min}–{max}</span>;

export type Defaults = { title: string; description: string; h1: string; lead: string };

export function SiteForm({ path, override, defaults, noHero }: { path: string; override?: Override; defaults: Defaults; noHero: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSitePageAction, {});
  const [metaTitle, setMetaTitle] = useState(override?.metaTitle ?? "");
  const [desc, setDesc] = useState(override?.description ?? "");
  const [blocks, setBlocks] = useState<CustomBlock[]>(override?.blocks ?? []);
  const err = (k: string) => state.errors?.[k] && <p role="alert" className="mt-1 text-sm text-red-700">{state.errors[k]}</p>;

  return (
    <>
      <form action={action} className="space-y-6">
        <input type="hidden" name="path" value={path} />
        <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />
        {state.message && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{state.message}</p>}
        <p className="rounded-xl bg-brand-50 p-4 text-sm text-muted">Leave a field <b>blank</b> to keep the page&apos;s default text. Changes go live within a minute.</p>

        {!noHero && (
          <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold">Headline and intro</h2>
            <div><label className="font-medium" htmlFor="h1">Headline (H1)</label><input id="h1" name="h1" defaultValue={override?.h1 ?? ""} placeholder={defaults.h1} className={field} />{err("h1")}</div>
            <div><label className="font-medium" htmlFor="lead">Intro under the headline</label><textarea id="lead" name="lead" rows={3} defaultValue={override?.lead ?? ""} placeholder={defaults.lead} className={field} />{err("lead")}</div>
          </section>
        )}

        <BlocksEditor blocks={blocks} setBlocks={setBlocks} title="Extra sections (shown before the FAQ and final call to action)" error={err("blocks")} />

        {!noHero && (
          <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold">FAQ</h2>
            <label className="font-medium" htmlFor="faqs">Replace the page&apos;s FAQs <span className="font-normal text-muted">(one per line: Question | Answer)</span></label>
            <textarea id="faqs" name="faqs" rows={6} defaultValue={override?.faqs?.map((f) => `${f.q} | ${f.a}`).join("\n") ?? ""} className={`${field} font-mono text-sm`} placeholder="Leave empty to keep the existing FAQs" />{err("faqs")}
          </section>
        )}

        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold">SEO</h2>
          <div>
            <div className="flex justify-between"><label className="font-medium" htmlFor="metaTitle">SEO title</label><Counter n={metaTitle.length} min={20} max={60} /></div>
            <input id="metaTitle" name="metaTitle" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder={defaults.title} className={field} />{err("metaTitle")}
          </div>
          <div>
            <div className="flex justify-between"><label className="font-medium" htmlFor="description">Meta description</label><Counter n={desc.length} min={70} max={160} /></div>
            <textarea id="description" name="description" rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={defaults.description} className={field} />{err("description")}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button disabled={pending} className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-500 disabled:opacity-60">Save changes</button>
          <a href={path} target="_blank" className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">View page ↗</a>
        </div>
      </form>
      {override && (
        <form action={resetSitePageAction} className="mt-6 border-t border-slate-200 pt-6">
          <input type="hidden" name="path" value={path} />
          <button className="text-sm font-semibold text-red-700 underline">Reset this page to its default content</button>
        </form>
      )}
    </>
  );
}
