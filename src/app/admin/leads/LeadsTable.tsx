"use client";
import { useState } from "react";

export type LeadRow = {
  id: string; ts: string; service: string; serviceLabel: string; name: string; company: string; email: string; phone: string;
  city: string; message: string; priority: boolean; kind?: string; gbpEmail?: string; gbpUrl?: string; accessGranted?: boolean;
  status: string; notes: string; facts: string[]; answers: { label: string; value: string }[]; source: string;
};

const STATUS_STYLE: Record<string, string> = {
  new: "bg-blue-50 text-blue-800 border-blue-200", contacted: "bg-amber-50 text-amber-800 border-amber-200",
  qualified: "bg-violet-50 text-violet-800 border-violet-200", won: "bg-green-50 text-green-800 border-green-200", lost: "bg-slate-100 text-slate-600 border-slate-200",
};
const SERVICE_DOT: Record<string, string> = { gbp: "bg-emerald-500", seo: "bg-indigo-500", influencer: "bg-pink-500", ads: "bg-orange-500", other: "bg-slate-400" };

const fmt = (ts: string) => new Date(ts).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const wa = (p: string) => `https://wa.me/91${p.replace(/\D/g, "").slice(-10)}`;

export function LeadsTable({ leads, statuses, save }: { leads: LeadRow[]; statuses: readonly string[]; save: (fd: FormData) => Promise<void> }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!leads.length) return <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center text-muted">No enquiries match. <a href="/contact" className="underline">Submit the enquiry form</a> to test.</p>;

  return (
    <ul className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {leads.map((l) => {
        const isOpen = open === l.id;
        return (
          <li key={l.id} className={isOpen ? "bg-slate-50/60" : ""}>
            {/* compact row */}
            <div className="grid items-center gap-x-4 gap-y-2 px-4 py-3 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.6fr)_minmax(0,1.4fr)_auto_auto]">
              <button type="button" onClick={() => setOpen(isOpen ? null : l.id)} aria-expanded={isOpen} className="min-w-0 text-left">
                <span className="flex items-center gap-2"><span className="truncate font-semibold">{l.name}</span>{l.priority && <span title="High value" className="shrink-0 rounded-full bg-lime px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-brand-700">HIGH VALUE</span>}</span>
                <span className="block truncate text-sm text-muted">{l.company} · {fmt(l.ts)}</span>
              </button>
              <div className="flex min-w-0 items-center gap-2 text-sm"><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${SERVICE_DOT[l.service] ?? "bg-slate-400"}`} /><span className="truncate">{l.serviceLabel}</span>{l.kind === "gbp-connect" && <span className="shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">CONNECT</span>}</div>
              <div className="flex min-w-0 flex-wrap gap-1.5">{l.facts.map((f) => <span key={f} className="truncate rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium">{f}</span>)}</div>
              <form action={save}>
                <input type="hidden" name="id" value={l.id} /><input type="hidden" name="notes" value={l.notes} />{l.accessGranted && <input type="hidden" name="accessGranted" value="on" />}
                <select key={`${l.id}-${l.status}`} name="status" defaultValue={l.status} aria-label={`Status for ${l.name}`} onChange={(e) => e.currentTarget.form?.requestSubmit()}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold capitalize ${STATUS_STYLE[l.status]}`}>{statuses.map((s) => <option key={s}>{s}</option>)}</select>
              </form>
              <button type="button" onClick={() => setOpen(isOpen ? null : l.id)} aria-label={isOpen ? "Collapse" : "Expand"} className="hidden h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500 md:grid">
                <svg className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </button>
            </div>

            {/* details */}
            {isOpen && (
              <div className="grid gap-6 border-t border-slate-100 px-4 py-5 md:grid-cols-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Contact</p>
                  <p className="mt-2 font-semibold">{l.name}</p><p className="text-sm text-muted">{l.company}{l.city && ` · ${l.city}`}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
                    <a className="rounded-full border border-slate-300 px-3 py-1.5 hover:bg-white" href={`mailto:${l.email}`}>Email</a>
                    <a className="rounded-full border border-slate-300 px-3 py-1.5 hover:bg-white" href={`tel:${l.phone}`}>Call</a>
                    <a className="rounded-full border border-slate-300 px-3 py-1.5 hover:bg-white" href={wa(l.phone)} target="_blank" rel="noopener">WhatsApp</a>
                  </div>
                  <p className="mt-3 break-all text-sm text-muted">{l.email}<br />{l.phone}</p>
                  {l.gbpEmail && <p className="mt-3 break-all text-sm"><span className="text-muted">Google account: </span><b>{l.gbpEmail}</b>{l.gbpUrl && <><br /><span className="text-muted">Profile: </span>{l.gbpUrl}</>}</p>}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Their answers</p>
                  <dl className="mt-2 space-y-1.5 text-sm">{l.answers.map((a) => <div key={a.label} className="flex gap-2"><dt className="w-28 shrink-0 text-muted">{a.label}</dt><dd className="font-medium">{a.value}</dd></div>)}</dl>
                  {!l.answers.length && <p className="mt-2 text-sm text-muted">No extra answers.</p>}
                  {l.message && <blockquote className="mt-3 rounded-xl bg-white p-3 text-sm italic text-muted">“{l.message}”</blockquote>}
                </div>
                <form action={save} className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Follow-up</p>
                  <input type="hidden" name="id" value={l.id} /><input type="hidden" name="status" value={l.status} />
                  {l.kind === "gbp-connect" && <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" name="accessGranted" defaultChecked={l.accessGranted} />Manager access granted</label>}
                  <textarea name="notes" defaultValue={l.notes} rows={3} placeholder="Notes for your team" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" />
                  <button className="rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-500">Save notes</button>
                </form>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
