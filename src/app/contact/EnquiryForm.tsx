"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICES, SERVICE_FIELDS, SERVICE_META, type Field, type ServiceKey } from "@/content/enquiry";

type Answers = Record<string, string | string[]>;
const STEPS = ["Service", "Your needs", "Contact"] as const;

const Icon = ({ n }: { n: "pin" | "spark" | "chart" | "chat" | "search" }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {n === "pin" && <><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>}
    {n === "spark" && <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16z" />}
    {n === "chart" && <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />}
    {n === "search" && <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>}
    {n === "chat" && <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />}
  </svg>
);

export function EnquiryForm({ initialService }: { initialService: string | null }) {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const [service, setService] = useState<ServiceKey | null>((initialService as ServiceKey) || null);
  const [step, setStep] = useState(initialService ? (SERVICE_FIELDS[initialService as ServiceKey]?.length ? 1 : 2) : 0);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");

  const fields: Field[] = service ? SERVICE_FIELDS[service] : [];
  const go = (n: number) => { setErrors({}); setStep(n); topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  const pick = (s: ServiceKey) => { setService(s); setAnswers({}); go(SERVICE_FIELDS[s].length ? 1 : 2); };
  const setSingle = (k: string, v: string) => setAnswers((a) => ({ ...a, [k]: a[k] === v ? "" : v }));
  const toggleMulti = (k: string, v: string) => setAnswers((a) => { const cur = (a[k] as string[]) ?? []; return { ...a, [k]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] }; });

  function next() {
    const e: Record<string, string> = {};
    for (const f of fields) { const v = answers[f.key]; if (f.required && !(Array.isArray(v) ? v.length : v)) e[f.key] = f.kind === "text" ? "This field is required" : "Please choose an option"; }
    if (Object.keys(e).length) return setErrors(e);
    go(2);
  }

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setBusy(true); setFormError("");
    const fd = Object.fromEntries(new FormData(ev.currentTarget)) as Record<string, string>;
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fd, service, details: answers }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBusy(false); setFormError(json.error ?? "Something went wrong. Please try again."); setErrors(json.fields ?? {});
        // a service-question error means go back to that step
        if (json.fields && fields.some((f) => json.fields[f.key])) go(1);
        return;
      }
      router.push("/thank-you");
    } catch { setBusy(false); setFormError("Network error. Please try again."); }
  }

  const input = "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100";
  const err = (k: string) => errors[k] && <p className="mt-1.5 text-sm text-red-700" role="alert">{errors[k]}</p>;
  const chip = (on: boolean) => `rounded-full border px-4 py-2.5 text-sm font-semibold transition active:scale-95 ${on ? "border-brand-700 bg-brand-700 text-white shadow" : "border-slate-300 bg-white text-brand-700 hover:border-brand-500 hover:bg-brand-50"}`;

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2" aria-current={i === step ? "step" : undefined}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold transition ${i <= step ? "bg-brand-700 text-white" : "bg-slate-200 text-slate-500"}`}>{i < step ? "✓" : i + 1}</span>
            <span className={`hidden text-sm font-semibold sm:block ${i <= step ? "text-ink" : "text-slate-400"}`}>{s}</span>
            {i < STEPS.length - 1 && <span className={`h-0.5 flex-1 rounded transition ${i < step ? "bg-brand-700" : "bg-slate-200"}`} />}
          </li>
        ))}
      </ol>

      {/* STEP 0 — service */}
      {step === 0 && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight">What do you need help with?</h2>
          <p className="mt-1 text-muted">Pick one. We&apos;ll ask a few quick questions to match you with the right expert.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <button key={s.value} type="button" onClick={() => pick(s.value)}
                className="lift group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white"><Icon n={SERVICE_META[s.value].icon} /></span>
                <span><span className="block font-bold">{SERVICE_META[s.value].title}</span><span className="mt-0.5 block text-sm text-muted">{SERVICE_META[s.value].blurb}</span></span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1 — service-specific questions */}
      {step === 1 && service && (
        <div>
          <button type="button" onClick={() => go(0)} className="text-sm font-semibold text-brand-700">← Change service</button>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">{SERVICE_META[service].title}: tell us a bit more</h2>
          <div className="mt-6 space-y-7">
            {fields.map((f) => (
              <div key={f.key}>
                <p className="font-semibold">{f.label}{f.kind === "multi" && <span className="font-normal text-muted"> (select all that apply)</span>}{!f.required && f.kind !== "multi" && <span className="font-normal text-muted"> (optional)</span>}</p>
                {f.kind === "text" ? (
                  <input value={(answers[f.key] as string) ?? ""} onChange={(e) => setAnswers((a) => ({ ...a, [f.key]: e.target.value }))} placeholder={f.placeholder} className={input} />
                ) : (
                  <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label={f.label}>
                    {f.options!.map((o) => {
                      const on = f.kind === "multi" ? ((answers[f.key] as string[]) ?? []).includes(o.value) : answers[f.key] === o.value;
                      return <button key={o.value} type="button" aria-pressed={on} onClick={() => (f.kind === "multi" ? toggleMulti(f.key, o.value) : setSingle(f.key, o.value))} className={chip(on)}>{o.label}</button>;
                    })}
                  </div>
                )}
                {err(f.key)}
              </div>
            ))}
          </div>
          <button type="button" onClick={next} className="mt-8 w-full rounded-full bg-brand-700 px-6 py-3.5 font-semibold text-white transition hover:bg-brand-500 sm:w-auto sm:px-10">Continue →</button>
        </div>
      )}

      {/* STEP 2 — contact */}
      {step === 2 && service && (
        <form onSubmit={submit} noValidate>
          <button type="button" onClick={() => go(fields.length ? 1 : 0)} className="text-sm font-semibold text-brand-700">← Back</button>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">Where should we send your free audit?</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div><label htmlFor="name" className="font-semibold">Full name</label><input id="name" name="name" autoComplete="name" required className={input} />{err("name")}</div>
            <div><label htmlFor="company" className="font-semibold">Business / brand</label><input id="company" name="company" autoComplete="organization" required className={input} />{err("company")}</div>
            <div><label htmlFor="email" className="font-semibold">Work email</label><input id="email" name="email" type="email" autoComplete="email" required className={input} />{err("email")}</div>
            <div><label htmlFor="phone" className="font-semibold">Mobile number</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit number" required className={input} />{err("phone")}</div>
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="font-semibold">{service === "other" ? "What do you need?" : "Anything else we should know?"}{service !== "other" && <span className="font-normal text-muted"> (optional)</span>}</label>
            <textarea id="message" name="message" rows={3} className={input} />{err("message")}
          </div>
          <div aria-hidden className="absolute -left-[9999px]"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <label className="mt-5 flex items-start gap-2.5 text-sm text-muted">
            <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4" />
            <span>I agree to be contacted about my enquiry and accept the <a href="/privacy" className="underline">Privacy Policy</a>.</span>
          </label>
          {err("consent")}
          {formError && <p className="mt-4 rounded-xl bg-red-50 p-3 text-red-800" role="alert">{formError}</p>}
          <button disabled={busy} className="mt-6 w-full rounded-full bg-brand-700 px-6 py-4 text-lg font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60">{busy ? "Sending…" : "Get my free audit"}</button>
          <p className="mt-3 text-center text-xs text-muted">No spam. An expert replies within one working day.</p>
        </form>
      )}
    </div>
  );
}
