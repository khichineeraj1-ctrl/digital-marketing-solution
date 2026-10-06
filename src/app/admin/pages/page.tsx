import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { allRoutes } from "@/lib/routes";
import { getAllOverrides } from "@/lib/overrides";
import { editablePaths } from "@/lib/editable";
import { absoluteUrl } from "@/lib/seo";
import { getAllCustomPages } from "@/lib/customPages";
import { deleteCustomPageAction } from "./actions";

const section = (p: string) => (p === "/" ? "Home" : p.split("/")[1]);
const MSG: Record<string, string> = { published: "Page published and added to the sitemap.", draft: "Page saved as draft.", deleted: "Page deleted.", site: "Changes saved. They go live within a minute.", reset: "Page reset to its default content." };

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const [routes, custom, overrides, editable] = await Promise.all([allRoutes(), getAllCustomPages(), getAllOverrides(), editablePaths()]);
  const editableSet = new Set(editable);
  const customPaths = new Set(custom.map((c) => `/${c.path}`));
  const system = routes.filter((r) => !customPaths.has(r.path));
  const groups = new Map<string, typeof system>();
  for (const r of system) groups.set(section(r.path), [...(groups.get(section(r.path)) ?? []), r]);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Pages &amp; SEO</h1>
        <Link href="/admin/pages/new" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">+ New page</Link>
      </div>
      {saved && <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-green-800">{MSG[saved] ?? "Saved."}</p>}

      <section className="mt-8">
        <h2 className="font-semibold">Your pages <span className="font-normal text-muted">({custom.length})</span></h2>
        <p className="mt-1 text-sm text-muted">Landing pages, location pages and service pages you build here. Add text, cards, steps, FAQs, links and calls to action, and published pages are added to the sitemap and linked from the site footer automatically, so search engines can find them.</p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          {custom.length === 0 ? (
            <p className="p-8 text-center text-muted">No custom pages yet. <Link href="/admin/pages/new" className="font-semibold text-brand-700 underline">Create your first page</Link>, for example <code>/seo-services-in-noida</code>.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-muted"><tr><th className="p-3">Page</th><th>Status</th><th>Updated</th><th></th></tr></thead>
              <tbody>
                {custom.map((c) => (
                  <tr key={c.id} className="border-t border-slate-100">
                    <td className="p-3"><Link href={`/admin/pages/edit/${c.id}`} className="font-medium text-brand-700 hover:underline">{c.title}</Link><br /><span className="text-xs text-muted">/{c.path}</span></td>
                    <td className="space-x-1"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{c.status}</span>{c.noindex && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold">hidden from Google</span>}</td>
                    <td>{c.modified}</td>
                    <td className="space-x-3 pr-3 text-right whitespace-nowrap">
                      {c.status === "published" && <Link href={`/${c.path}`} target="_blank" className="underline">View ↗</Link>}
                      <form action={deleteCustomPageAction} className="inline"><input type="hidden" name="id" value={c.id} /><button className="text-red-700 underline">Delete</button></form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-semibold">Site pages <span className="font-normal text-muted">({system.length})</span></h2>
        <p className="mt-1 text-sm text-muted">Built-in pages. Click <b>Edit</b> to change a page's headline, intro, SEO text, FAQs or add extra sections. Blog posts, client stories and author profiles have their own editors in the menu. <a className="underline" href="/sitemap.xml" target="_blank">sitemap.xml ↗</a> · <a className="underline" href="/robots.txt" target="_blank">robots.txt ↗</a></p>
        {[...groups].map(([name, list]) => (
          <div key={name} className="mt-6">
            <h3 className="text-sm font-semibold capitalize">{name.replace(/-/g, " ")} <span className="font-normal text-muted">({list.length})</span></h3>
            <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm"><tbody>
                {list.map((r) => (
                  <tr key={r.path} className="border-t border-slate-100 first:border-0">
                    <td className="p-3"><Link href={r.path} target="_blank" className="text-brand-700 hover:underline">{r.path}</Link></td>
                    <td className="text-muted">{overrides[r.path] ? <span className="rounded-full bg-lime px-2 py-0.5 text-xs font-bold text-brand-700">EDITED</span> : "default"}</td><td className="pr-3 text-right">{editableSet.has(r.path) ? <Link href={`/admin/pages/site?path=${encodeURIComponent(r.path)}`} className="font-semibold text-brand-700 underline">Edit</Link> : <span className="text-xs text-muted">edit in its own section</span>}</td>
                    
                  </tr>
                ))}
              </tbody></table>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
