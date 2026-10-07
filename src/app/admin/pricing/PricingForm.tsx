"use client";
import { useActionState } from "react";
import { savePricingAction, type FormState } from "./actions";
import type { Plan } from "@/lib/pricing";

const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2";

export function PricingForm({ plans }: { plans: Plan[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePricingAction, {});
  const err = (k: string) => state.errors?.[k] && <p role="alert" className="mt-1 text-sm text-red-700">{state.errors[k]}</p>;
  return (
    <form action={action} className="space-y-6">
      {state.message && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{state.message}</p>}
      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((p) => (
          <section key={p.product} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold">{p.name}</h2>
            <div><label className="font-medium" htmlFor={`${p.product}.name`}>Plan name</label><input id={`${p.product}.name`} name={`${p.product}.name`} defaultValue={p.name} className={field} />{err(`${p.product}.name`)}</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="font-medium" htmlFor={`${p.product}.from`}>Price (₹)</label><input id={`${p.product}.from`} name={`${p.product}.from`} inputMode="numeric" defaultValue={p.from} className={field} /><p className="mt-1 text-xs text-muted">0 shows &quot;Free&quot;</p>{err(`${p.product}.from`)}</div>
              <div><label className="font-medium" htmlFor={`${p.product}.priceLabel`}>Price label <span className="font-normal text-muted">(optional)</span></label><input id={`${p.product}.priceLabel`} name={`${p.product}.priceLabel`} defaultValue={p.priceLabel ?? ""} placeholder="e.g. Custom quote" className={field} /><p className="mt-1 text-xs text-muted">Replaces the price on the page</p>{err(`${p.product}.priceLabel`)}</div>
            </div>
            <div><label className="font-medium" htmlFor={`${p.product}.unit`}>Under the price</label><input id={`${p.product}.unit`} name={`${p.product}.unit`} defaultValue={p.unit} className={field} />{err(`${p.product}.unit`)}</div>
            <div><label className="font-medium" htmlFor={`${p.product}.points`}>What&apos;s included <span className="font-normal text-muted">(one per line)</span></label><textarea id={`${p.product}.points`} name={`${p.product}.points`} rows={5} defaultValue={p.points.join("\n")} className={field} />{err(`${p.product}.points`)}</div>
          </section>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button disabled={pending} className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-500 disabled:opacity-60">Save pricing</button>
        <a href="/pricing" target="_blank" className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">View pricing page ↗</a>
      </div>
    </form>
  );
}
