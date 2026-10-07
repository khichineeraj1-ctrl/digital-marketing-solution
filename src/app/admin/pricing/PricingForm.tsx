"use client";
import { useActionState } from "react";
import { savePricingAction, type FormState } from "./actions";
import type { Plan } from "@/lib/pricing";

const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2";

export function PricingForm({ plans, showPrices }: { plans: Plan[]; showPrices: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePricingAction, {});
  const err = (k: string) => state.errors?.[k] && <p role="alert" className="mt-1 text-sm font-medium text-red-700">{state.errors[k]}</p>;
  const val = (k: string, d: string | number) => state.values?.[k] ?? String(d);
  const bad = (k: string) => (state.errors?.[k] ? "border-red-500" : "border-slate-300");
  const show = state.values ? state.values.showPrices === "on" : showPrices;
  return (
    <form action={action} className="space-y-6">
      {state.message && <p role="alert" className="rounded-lg bg-red-50 p-3 font-medium text-red-800">{state.message}</p>}
      {/* remount on a failed save so the fields keep what was typed instead of resetting to the saved values */}
      <div key={state.stamp ?? 0} className="space-y-6">
        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
          <input type="checkbox" name="showPrices" defaultChecked={show} className="mt-1 h-5 w-5" />
          <span><span className="font-bold">Show prices on the website</span><br /><span className="text-sm text-muted">Off by default: the pricing page shows &quot;Custom quote&quot; for every plan and no price is published to search engines. The numbers below stay saved here, so you can switch them on whenever you need.</span></span>
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <section key={p.product} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold">{p.name}</h2>
              <div><label className="font-medium" htmlFor={`${p.product}.name`}>Plan name</label><input id={`${p.product}.name`} name={`${p.product}.name`} defaultValue={val(`${p.product}.name`, p.name)} className={`${field} ${bad(`${p.product}.name`)}`} />{err(`${p.product}.name`)}</div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="font-medium" htmlFor={`${p.product}.from`}>Price (₹)</label><input id={`${p.product}.from`} name={`${p.product}.from`} inputMode="numeric" defaultValue={val(`${p.product}.from`, p.from)} className={`${field} ${bad(`${p.product}.from`)}`} /><p className="mt-1 text-xs text-muted">Digits only. 0 shows &quot;Free&quot;</p>{err(`${p.product}.from`)}</div>
                <div><label className="font-medium" htmlFor={`${p.product}.priceLabel`}>Price label <span className="font-normal text-muted">(optional)</span></label><input id={`${p.product}.priceLabel`} name={`${p.product}.priceLabel`} defaultValue={val(`${p.product}.priceLabel`, p.priceLabel ?? "")} placeholder="e.g. From ₹4,999" className={`${field} ${bad(`${p.product}.priceLabel`)}`} /><p className="mt-1 text-xs text-muted">Shown instead of the number (when prices are on)</p>{err(`${p.product}.priceLabel`)}</div>
              </div>
              <div><label className="font-medium" htmlFor={`${p.product}.unit`}>Under the price</label><input id={`${p.product}.unit`} name={`${p.product}.unit`} defaultValue={val(`${p.product}.unit`, p.unit)} className={`${field} ${bad(`${p.product}.unit`)}`} />{err(`${p.product}.unit`)}</div>
              <div><label className="font-medium" htmlFor={`${p.product}.points`}>What&apos;s included <span className="font-normal text-muted">(one per line; always shown)</span></label><textarea id={`${p.product}.points`} name={`${p.product}.points`} rows={5} defaultValue={val(`${p.product}.points`, p.points.join("\n"))} className={`${field} ${bad(`${p.product}.points`)}`} />{err(`${p.product}.points`)}</div>
            </section>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button disabled={pending} className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-500 disabled:opacity-60">Save pricing</button>
        <a href="/pricing" target="_blank" className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">View pricing page ↗</a>
      </div>
    </form>
  );
}
