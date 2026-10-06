import { requireAdmin } from "@/lib/adminAuth";
import { listLeads, STATUSES } from "@/lib/leads";
import { SERVICES } from "@/content/enquiry";
import { allRoutes } from "@/lib/routes";
import Link from "next/link";

export default async function Page() {
  await requireAdmin();
  const leads = await listLeads();
  const now = Date.now();
  const last7 = leads.filter((l) => now - Date.parse(l.ts) < 7 * 864e5).length;
  const stat = (label: string, v: number | string) => (
    <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm text-muted">{label}</p><p className="mt-1 text-3xl font-bold">{v}</p></div>
  );
  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
        {stat("Total enquiries", leads.length)}
        {stat("High-value", leads.filter((l) => l.priority).length)}
        {stat("Last 7 days", last7)}
        {stat("New (uncontacted)", leads.filter((l) => l.status === "new").length)}
        {stat("Indexable pages", (await allRoutes()).length)}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold">Enquiries by service</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {SERVICES.map((r) => <li key={r.value} className="flex justify-between"><Link className="hover:underline" href={`/admin/leads?service=${r.value}`}>{r.label}</Link><b>{leads.filter((l) => l.service === r.value).length}</b></li>)}
          </ul>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold">Pipeline</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {STATUSES.map((s) => <li key={s} className="flex justify-between"><Link className="capitalize hover:underline" href={`/admin/leads?status=${s}`}>{s}</Link><b>{leads.filter((l) => l.status === s).length}</b></li>)}
          </ul>
        </section>
      </div>
    </>
  );
}
