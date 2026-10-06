import { revalidatePath } from "next/cache";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { listLeads, updateLead, STATUSES, type Status } from "@/lib/leads";
import { SERVICES, SERVICE_META, describeDetails, keyFacts, type ServiceKey } from "@/content/enquiry";
import { LeadsTable, type LeadRow } from "./LeadsTable";

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
  const all = await listLeads();
  const leads = all.filter((l) =>
    (!service || l.service === service) && (!priority || l.priority) && (!status || l.status === status) &&
    (!needle || [l.name, l.email, l.phone, l.company].some((v) => v.toLowerCase().includes(needle))));
  const qs = new URLSearchParams(Object.entries({ service, status, q, priority }).filter(([, v]) => v) as [string, string][]).toString();
  const rows: LeadRow[] = leads.map((l) => ({
    id: l.id, ts: l.ts, service: l.service, serviceLabel: SERVICE_META[l.service as ServiceKey]?.title ?? l.service,
    name: l.name, company: l.company, email: l.email, phone: l.phone, city: l.city, message: l.message, priority: l.priority,
    kind: l.kind, gbpEmail: l.gbpEmail, gbpUrl: l.gbpUrl, accessGranted: l.accessGranted, status: l.status, notes: l.notes,
    facts: keyFacts(l), answers: describeDetails(l), source: l.source,
  }));
  const count = (s: string) => all.filter((l) => l.status === s).length;
  const cls = "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm";
  const tab = (label: string, val: string | undefined, n?: number) => {
    const on = (status ?? "") === (val ?? "");
    const p = new URLSearchParams(Object.entries({ service, q, priority, status: val }).filter(([, v]) => v) as [string, string][]).toString();
    return <Link key={label} href={`/admin/leads${p ? `?${p}` : ""}`} className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${on ? "bg-brand-700 text-white" : "bg-white text-brand-700 hover:bg-brand-50"}`}>{label}{n !== undefined && <span className={`ml-1.5 ${on ? "text-lime" : "text-muted"}`}>{n}</span>}</Link>;
  };
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Leads <span className="text-base font-normal text-muted">({leads.length}{leads.length !== all.length ? ` of ${all.length}` : ""})</span></h1>
        <a href={`/admin/leads/export?${qs}`} className="rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-500">Export CSV</a>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">{tab("All", undefined, all.length)}{STATUSES.map((s) => tab(s, s, count(s)))}</div>

      <form className="mt-3 flex flex-wrap items-center gap-2">
        {status && <input type="hidden" name="status" value={status} />}
        <input name="q" defaultValue={q} placeholder="Search name, email, phone…" className={`${cls} min-w-0 flex-1 md:max-w-xs`} />
        <select name="service" defaultValue={service ?? ""} className={cls}><option value="">All services</option>{SERVICES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}</select>
        <label className="flex items-center gap-2 px-2 text-sm"><input type="checkbox" name="priority" value="1" defaultChecked={!!priority} />High-value only</label>
        <button className={`${cls} font-semibold`}>Apply</button>
        {(service || q || priority || status) && <Link href="/admin/leads" className="px-2 text-sm text-muted underline">Reset</Link>}
      </form>

      <LeadsTable leads={rows} statuses={STATUSES} save={save} />
    </>
  );
}
