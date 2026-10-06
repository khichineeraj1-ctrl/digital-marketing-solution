"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOCATIONS } from "@/content/enquiry";

export function GbpConnectForm() {
  const router = useRouter();
  const [state, setState] = useState<{ busy: boolean; error?: string; fields?: Record<string, string> }>({ busy: false });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ busy: true });
    const data = { ...Object.fromEntries(new FormData(e.currentTarget)), service: "gbp", kind: "gbp-connect" };
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) return setState({ busy: false, error: json.error ?? "Something went wrong. Please try again.", fields: json.fields });
      router.push("/thank-you?next=gbp");
    } catch { setState({ busy: false, error: "Network error. Please try again." }); }
  }

  const input = "mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 focus:border-brand-500";
  const err = (k: string) => state.fields?.[k] && <p className="mt-1 text-sm text-red-700" role="alert">{state.fields[k]}</p>;
  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="company" className="font-medium">Business name</label><input id="company" name="company" autoComplete="organization" required className={input} />{err("company")}</div>
        <div><label htmlFor="name" className="font-medium">Your name</label><input id="name" name="name" autoComplete="name" required className={input} />{err("name")}</div>
        <div><label htmlFor="email" className="font-medium">Contact email</label><input id="email" name="email" type="email" autoComplete="email" required className={input} />{err("email")}</div>
        <div><label htmlFor="phone" className="font-medium">Mobile number</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={input} />{err("phone")}</div>
      </div>
      <div>
        <label htmlFor="gbpEmail" className="font-medium">Google account email that owns your Business Profile</label>
        <input id="gbpEmail" name="gbpEmail" type="email" required className={input} placeholder="the Gmail / Google Workspace email you use to manage the profile" />{err("gbpEmail")}
        <p className="mt-1 text-xs text-muted">Only the email — never your password.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="gbpUrl" className="font-medium">Profile link <span className="font-normal text-muted">(optional)</span></label><input id="gbpUrl" name="gbpUrl" className={input} placeholder="Google Maps link or business name" /></div>
        <div><label htmlFor="city" className="font-medium">City <span className="font-normal text-muted">(optional)</span></label><input id="city" name="city" className={input} /></div>
      </div>
      <div><label htmlFor="locations" className="font-medium">Number of locations</label>
        <select id="locations" name="locations" className={input}>{LOCATIONS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}</select></div>
      <div aria-hidden className="absolute -left-[9999px]"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex items-start gap-2 text-sm text-muted">
        <input type="checkbox" name="consent" value="yes" required className="mt-1" />
        <span>I authorise us to request <b>Manager</b> access to my Google Business Profile to manage and optimise it. I understand I can remove access at any time, and accept the <a href="/privacy" className="underline">Privacy Policy</a>.</span>
      </label>
      {err("consent")}
      {state.error && <p className="rounded-xl bg-red-50 p-3 text-red-800" role="alert">{state.error}</p>}
      <button disabled={state.busy} className="w-full rounded-full bg-brand-700 px-6 py-3.5 font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60">{state.busy ? "Sending…" : "Continue"}</button>
    </form>
  );
}
