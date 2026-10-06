import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { getAllAuthors } from "@/lib/authors";
import { getAllPosts } from "@/lib/posts";
import { deleteAuthorAction } from "./actions";

const MSG: Record<string, string> = { published: "Author published.", draft: "Author saved as draft.", deleted: "Author deleted.", protected: "The default editorial author can't be deleted.", inuse: "That author still has articles. Reassign them first." };

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const [authors, posts] = await Promise.all([getAllAuthors(), getAllPosts()]);
  const count = (slug: string) => posts.filter((p) => (p.authorSlug ?? (p.author === "Editorial Team" ? "editorial-team" : "")) === slug).length;
  const realPeople = authors.filter((a) => a.type === "person" && !a.sample && a.status === "published").length;
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Authors <span className="text-base font-normal text-muted">({authors.length})</span></h1>
        <Link href="/admin/authors/new" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">+ New author</Link>
      </div>
      {saved && <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-green-800">{MSG[saved] ?? "Saved."}</p>}
      {realPeople === 0 && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900"><b>E-E-A-T tip:</b> all articles are currently bylined to the organisation. Articles written by named experts with verifiable profiles build more trust, so add your real strategists and assign them to posts.</p>}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-muted"><tr><th className="p-3">Author</th><th>Type</th><th>Status</th><th>Articles</th><th></th></tr></thead>
          <tbody>
            {authors.map((a) => (
              <tr key={a.slug} className="border-t border-slate-100">
                <td className="p-3"><Link href={`/admin/authors/${a.slug}`} className="font-medium text-brand-700 hover:underline">{a.name}</Link><br /><span className="text-xs text-muted">{a.role}</span><br /><span className="text-xs text-muted">/authors/{a.slug}</span></td>
                <td className="capitalize">{a.type}</td>
                <td className="space-x-1"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${a.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{a.status}</span>{a.sample && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold">SAMPLE · hidden</span>}</td>
                <td>{count(a.slug)}</td>
                <td className="space-x-3 pr-3 text-right whitespace-nowrap">
                  {a.status === "published" && <Link href={`/authors/${a.slug}`} target="_blank" className="underline">View ↗</Link>}
                  <form action={deleteAuthorAction} className="inline"><input type="hidden" name="slug" value={a.slug} /><button className="text-red-700 underline">Delete</button></form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
