import { requireAdmin } from "@/lib/adminAuth";
import { getPricing } from "@/lib/pricing";
import { PricingForm } from "./PricingForm";
import { resetPricingAction } from "./actions";

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const plans = await getPricing();
  return (
    <>
      <h1 className="text-2xl font-bold">Pricing</h1>
      <p className="mt-1 text-muted">Edit the plans shown on the <a href="/pricing" target="_blank" className="underline">pricing page</a>. Prices also feed the search-result price markup. Changes go live within a minute.</p>
      {saved && <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-green-800">{saved === "reset" ? "Pricing reset to the defaults." : "Pricing saved. It goes live within a minute."}</p>}
      <div className="mt-6"><PricingForm plans={plans} /></div>
      <form action={resetPricingAction} className="mt-6 border-t border-slate-200 pt-6"><button className="text-sm font-semibold text-red-700 underline">Reset all pricing to the defaults</button></form>
    </>
  );
}
