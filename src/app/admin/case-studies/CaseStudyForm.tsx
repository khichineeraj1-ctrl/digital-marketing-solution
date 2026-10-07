"use client";
import { useActionState, useState } from "react";
import { saveCaseStudyAction, type FormState } from "./actions";
import { CS_SERVICES, type CaseStudy } from "@/content/caseStudies";
import { slugify } from "@/lib/slug";
import { logoUrl } from "@/lib/logoPath";

const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2";
const Counter = ({ n, min, max }: { n: number; min: number; max: number }) => <span className={`text-xs ${n >= min && n <= max ? "text-green-700" : "text-amber-700"}`}>{n} / {min}–{max}</span>;

export function CaseStudyForm({ c }: { c?: CaseStudy }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveCaseStudyAction, {});
  const [client, setClient] = useState(c?.client ?? "");
  const [title, setTitle] = useState(c?.title ?? "");
  const [slug, setSlug] = useState(c?.slug ?? "");
  const [touched, setTouched] = useState(!!c);
  const [metaTitle, setMetaTitle] = useState(c?.metaTitle ?? "");
  const [desc, setDesc] = useState(c?.description ?? "");
  const [f, setF] = useState({
    summary: c?.summary ?? "", industry: c?.industry ?? "", city: c?.city ?? "", duration: c?.duration ?? "",
    challengeMd: c?.challengeMd ?? "", solutionMd: c?.solutionMd ?? "", resultsMd: c?.resultsMd ?? "",
    metrics: c?.metrics.map((m) => `${m.value} | ${m.label}`).join("\n") ?? "",
    quoteText: c?.quote?.text ?? "", quoteName: c?.quote?.name ?? "", quoteRole: c?.quote?.role ?? "",
  });
  const [services, setServices] = useState<string[]>(c?.services ?? []);
  const [sample, setSample] = useState(c?.sample ?? false);
  const [preview, setPreview] = useState<string | undefined>();
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));
  const locked = c?.status === "published" && !c.sample;
  const err = (k: string) => state.errors?.[k] && <p role="alert" className="mt-1 text-sm text-red-700">{state.errors[k]}</p>;
  const auto = (cl: string, t: string) => { if (!touched) setSlug(slugify(`${cl} ${t}`).slice(0, 60)); };

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="originalSlug" value={c?.slug ?? ""} />
      {state.message && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{state.message}</p>}

      <div className="grid gap-5 md:grid-cols-2">
        <div><label className="font-medium" htmlFor="client">Client name</label>
          <input id="client" name="client" value={client} className={field} onChange={(e) => { setClient(e.target.value); auto(e.target.value, title); }} />{err("client")}</div>
        <div><label className="font-medium" htmlFor="industry">Industry</label><input id="industry" name="industry" value={f.industry} onChange={set("industry")} className={field} /></div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <label className="font-medium" htmlFor="logo">Client logo <span className="font-normal text-muted">(optional)</span></label>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <div className="grid h-20 w-32 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {preview ?? logoUrl(c?.logo) ? <img src={preview ?? logoUrl(c?.logo)} alt="" className="h-full w-full object-contain" /> : <span className="text-xs text-muted">No logo</span>}
          </div>
          <div className="min-w-0 flex-1">
            <input id="logo" name="logo" type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : undefined); }} className="block w-full text-sm" />
            <p className="mt-1 text-xs text-muted">PNG, JPG or WebP, up to 500 KB. A transparent PNG with the logo cropped tight works best. Every logo is shown in the same white tile, so all clients look consistent.</p>
            {c?.logo && <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" name="removeLogo" /> Remove the current logo</label>}
            {err("logo")}
          </div>
        </div>
      </div>
      <div><label className="font-medium" htmlFor="title">Headline (H1) — lead with the result</label>
        <input id="title" name="title" value={title} className={field} onChange={(e) => { setTitle(e.target.value); auto(client, e.target.value); }} />{err("title")}</div>
      <div>
        <label className="font-medium" htmlFor="slug">URL slug</label>
        <div className="flex items-center gap-2 text-sm text-muted">/case-studies/
          <input id="slug" name="slug" value={slug} readOnly={locked} className={`${field} !mt-0 ${locked ? "bg-slate-100" : ""}`} onChange={(e) => { setTouched(true); setSlug(slugify(e.target.value)); }} /></div>
        <p className="mt-1 text-xs text-muted">{locked ? "Locked: this story is live, so its URL can't change." : "Format: client-name-service-result, e.g. acme-motors-meta-ads-lead-cost. Keywords people search for belong here."}</p>{err("slug")}
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <div><label className="font-medium" htmlFor="city">City / region</label><input id="city" name="city" value={f.city} onChange={set("city")} className={field} /></div>
        <div><label className="font-medium" htmlFor="duration">Duration</label><input id="duration" name="duration" value={f.duration} onChange={set("duration")} placeholder="6 months" className={field} /></div>
        <fieldset><legend className="font-medium">Services used</legend>
          {CS_SERVICES.map((s) => (
            <label key={s.value} className="mt-1 flex items-center gap-2 text-sm"><input type="checkbox" name="services" value={s.value} checked={services.includes(s.value)} onChange={(e) => setServices((p) => e.target.checked ? [...p, s.value] : p.filter((x) => x !== s.value))} />{s.label}</label>
          ))}{err("services")}
        </fieldset>
      </div>
      <div><label className="font-medium" htmlFor="summary">Card summary (one line)</label><input id="summary" name="summary" value={f.summary} onChange={set("summary")} className={field} />{err("summary")}</div>

      <div>
        <label className="font-medium" htmlFor="metrics">Result metrics — one per line: <code>Value | Label</code></label>
        <textarea id="metrics" name="metrics" rows={3} value={f.metrics} onChange={set("metrics")} className={`${field} font-mono text-sm`} placeholder={"-38% | Cost per lead\n3.1x | Lead volume"} />{err("metrics")}
        <p className="mt-1 text-xs text-muted">Only real, client-approved numbers. The first line is shown on the card.</p>
      </div>

      {(["challengeMd", "solutionMd", "resultsMd"] as const).map((k) => (
        <div key={k}>
          <label className="font-medium" htmlFor={k}>{k === "challengeMd" ? "The challenge" : k === "solutionMd" ? "What we did" : "The results"}</label>
          <textarea id={k} name={k} rows={7} value={f[k]} onChange={set(k)} className={`${field} font-mono text-sm`} />{err(k)}
          {k === "challengeMd" && <p className="mt-1 text-xs text-muted">Format: <code>## Subheading</code>, blank line between paragraphs, <code>- </code> for bullets.</p>}
        </div>
      ))}

      <fieldset className="rounded-xl border border-slate-200 p-4">
        <legend className="px-2 font-medium">Client quote (optional, needs client approval)</legend>
        <textarea name="quoteText" rows={2} value={f.quoteText} onChange={set("quoteText")} placeholder="Quote" className={field} />
        <div className="grid gap-3 sm:grid-cols-2"><input name="quoteName" value={f.quoteName} onChange={set("quoteName")} placeholder="Name" className={field} /><input name="quoteRole" value={f.quoteRole} onChange={set("quoteRole")} placeholder="Role" className={field} /></div>
      </fieldset>

      <div>
        <div className="flex justify-between"><label className="font-medium" htmlFor="metaTitle">SEO title</label><Counter n={metaTitle.length || title.length} min={20} max={60} /></div>
        <input id="metaTitle" name="metaTitle" value={metaTitle} placeholder={title} onChange={(e) => setMetaTitle(e.target.value)} className={field} />{err("metaTitle")}
      </div>
      <div>
        <div className="flex justify-between"><label className="font-medium" htmlFor="description">Meta description</label><Counter n={desc.length} min={70} max={160} /></div>
        <textarea id="description" name="description" rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} className={field} />{err("description")}
      </div>

      <label className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm">
        <input type="checkbox" name="sample" checked={sample} onChange={(e) => setSample(e.target.checked)} className="mt-1" />
        <span><b>Sample / illustrative content.</b> Shows a banner, is hidden from Google and the sitemap, and can&apos;t be published as real. Untick once this is a real, approved client story.{err("sample")}</span>
      </label>

      <div className="flex flex-wrap gap-3">
        <button name="intent" value="publish" disabled={pending} className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-500 disabled:opacity-60">{c?.status === "published" ? "Update" : "Publish"}</button>
        <button name="intent" value="draft" disabled={pending} className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">Save draft</button>
        {c?.status === "published" && <button name="intent" value="unpublish" disabled={pending} className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">Unpublish</button>}
      </div>
    </form>
  );
}
