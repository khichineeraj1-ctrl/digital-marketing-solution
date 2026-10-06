import { revalidatePath } from "next/cache";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { listLeads, updateLead, STATUSES, type Status } from "@/lib/leads";
import { SERVICES, describeDetails } from "@/content/enquiry";

async function save(formData: FormData) {
  "use server";
  await requireAdmin();
  const status = String(formData.get("status"));
  if (!(STATUSES as readonly string[]).includes(status)) return;
  await updateLead(String(formData.get("id")), { status: status as Status, notes: String(formData.get("notes") ?? "").slice(0, 1000), accessGranted: formData.get("accessGranted") === "on" });
  revalidatePath("/admin/leads");
}

export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string; status?: string; q?: string; priority?: string }> }) {
  await requireAdmin();
  const { service, status, q, priority } = await searchParams;
  const needle = q?.toLowerCase().trim();
  const leads = (await listLeads()).filter((l) =>
    (!service || l.service === service) && (!priority || l.priority) && (!status || l.status === status) &&
    (!needle || [l.name, l.email, l.phone, l.company].some((v) => v.toLowerCase().includes(needle))));
  const qs = new URLSearchParams(Object.entries({ service, status, q, priority }).filter(([, v]) => v) as [string, string][]).toString();
  const cls = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Leads <span className="text-base font-normal text-muted">({leads.length})</span></h1>
        <a href={`/admin/leads/export?${qs}`} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Export CSV</a>
      </div>
      <form className="mt-5 flex flex-wrap gap-3">
        <input name="q" defaultValue={q} placeholder="Search name, email, phone…" className={cls} />
        <select name="service" defaultValue={service ?? ""} className={cls}><option value="">All services</option>{SERVICES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}</select>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="priority" value="1" defaultChecked={!!priority} />High-value only</label>
        <select name="status" defaultValue={status ?? ""} className={cls}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</select>
        <button className={cls}>Filter</button>
        <Link href="/admin/leads" className="px-2 py-2 text-sm text-muted underline">Reset</Link>
      </form>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-muted"><tr><th className="p-3">Date</th><th>Service</th><th>Contact</th><th>Company &amp; needs</th><th>Status &amp; notes</th></tr></thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-slate-100 align-top">
                <td className="p-3 whitespace-nowrap">{new Date(l.ts).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                <td>{SERVICES.find((x) => x.value === l.service)?.label ?? l.service}{l.priority && <span className="ml-2 rounded-full bg-lime px-2 py-0.5 text-xs font-bold text-brand-700">HIGH VALUE</span>}</td>
                <td><b>{l.name}</b><br /><a className="text-brand-700" href={`mailto:${l.email}`}>{l.email}</a><br />{l.phone}</td>
                <td><b>{l.company}</b>{l.kind === "gbp-connect" && <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">GBP CONNECT</span>}{l.gbpEmail && <><br />Google account: <b>{l.gbpEmail}</b></>}{l.gbpUrl && <><br />{l.gbpUrl}</>}{l.city && <><br />{l.city}</>}<dl className="mt-1 space-y-0.5">{describeDetails(l).map((d) => <div key={d.label}><dt className="inline text-muted">{d.label}: </dt><dd className="inline font-medium">{d.value}</dd></div>)}</dl>{l.message && <p className="mt-1 max-w-xs text-muted">“{l.message}”</p>}</td>
                <td className="py-3 pr-3">
                  <form action={save} className="flex flex-col gap-2">
                    <input type="hidden" name="id" value={l.id} />
                    <select name="status" defaultValue={l.status} className={cls}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
                    {l.kind === "gbp-connect" && <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="accessGranted" defaultChecked={l.accessGranted} />Manager access granted</label>}
                    <input name="notes" defaultValue={l.notes} placeholder="Notes" className={cls} />
                    <button className="self-start text-brand-700 underline">Save</button>
                  </form>
                </td>
              </tr>
            ))}
            {!leads.length && <tr><td colSpan={5} className="p-8 text-center text-muted">No enquiries yet. Submit the <Link href="/contact" className="underline">enquiry form</Link> to test.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
