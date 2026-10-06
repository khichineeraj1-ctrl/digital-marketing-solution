import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { getAllCaseStudies } from "@/lib/caseStudies";
import { deleteCaseStudyAction } from "./actions";

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const list = await getAllCaseStudies();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Client successes <span className="text-base font-normal text-muted">({list.length})</span></h1>
        <Link href="/admin/case-studies/new" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">+ New case study</Link>
      </div>
      {saved && <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-green-800">Case study {saved === "published" ? "published" : saved === "deleted" ? "deleted" : "saved as draft"}.</p>}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-muted"><tr><th className="p-3">Client / headline</th><th>Industry</th><th>Status</th><th>Updated</th><th></th></tr></thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.slug} className="border-t border-slate-100">
                <td className="p-3"><Link href={`/admin/case-studies/${c.slug}`} className="font-medium text-brand-700 hover:underline">{c.client}</Link><br /><span className="text-xs text-muted">{c.title}</span><br /><span className="text-xs text-muted">/case-studies/{c.slug}</span></td>
                <td>{c.industry}</td>
                <td className="space-x-1">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{c.status}</span>
                  {c.sample && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold">SAMPLE · hidden from Google</span>}
                </td>
                <td>{c.modified}</td>
                <td className="space-x-3 pr-3 text-right whitespace-nowrap">
                  {c.status === "published" && <Link href={`/case-studies/${c.slug}`} target="_blank" className="underline">View ↗</Link>}
                  <form action={deleteCaseStudyAction} className="inline"><input type="hidden" name="slug" value={c.slug} /><button className="text-red-700 underline">Delete</button></form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
