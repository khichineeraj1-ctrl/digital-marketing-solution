import { isAdmin } from "@/lib/adminAuth";
import { listLeads } from "@/lib/leads";
import { describeDetails } from "@/content/enquiry";

const cell = (v: string) => {
  let s = v ?? "";
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // neutralise spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(req: Request) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const sp = new URL(req.url).searchParams;
  const service = sp.get("service"), priority = sp.get("priority"), status = sp.get("status"), q = sp.get("q")?.toLowerCase();
  const rows = (await listLeads()).filter((l) => (!service || l.service === service) && (!priority || l.priority) && (!status || l.status === status) &&
    (!q || [l.name, l.email, l.phone, l.company].some((v) => v.toLowerCase().includes(q))));
  const head = ["date", "service", "high_value", "name", "email", "phone", "company", "google_account_email", "gbp_link", "access_granted", "city", "answers", "message", "status", "notes", "source"];
  const csv = [head.join(","), ...rows.map((l) => [l.ts, l.service, l.priority ? "yes" : "", l.name, l.email, l.phone, l.company, l.gbpEmail ?? "", l.gbpUrl ?? "", l.accessGranted ? "yes" : "", l.city, describeDetails(l).map((d) => `${d.label}: ${d.value}`).join(" | "), l.message, l.status, l.notes, l.source].map(cell).join(","))].join("\n");
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="leads.csv"' } });
}
