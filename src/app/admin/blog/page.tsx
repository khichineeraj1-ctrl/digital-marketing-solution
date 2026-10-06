import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { getAllPosts, wordCount } from "@/lib/posts";
import { deletePostAction } from "./actions";

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const posts = await getAllPosts();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog <span className="text-base font-normal text-muted">({posts.length})</span></h1>
        <Link href="/admin/blog/new" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">+ New post</Link>
      </div>
      {saved && <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-green-800">Post {saved === "published" ? "published" : saved === "deleted" ? "deleted" : "saved as draft"}.</p>}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-muted"><tr><th className="p-3">Title</th><th>Category</th><th>Status</th><th>Words</th><th>Updated</th><th></th></tr></thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.slug} className="border-t border-slate-100">
                <td className="p-3"><Link href={`/admin/blog/${p.slug}`} className="font-medium text-brand-700 hover:underline">{p.title}</Link><br /><span className="text-xs text-muted">/blog/{p.slug}</span></td>
                <td>{p.category}</td>
                <td><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{p.status}</span></td>
                <td>{wordCount(p.bodyMd)}</td>
                <td>{p.modified}</td>
                <td className="space-x-3 pr-3 text-right whitespace-nowrap">
                  {p.status === "published" && <Link href={`/blog/${p.slug}`} target="_blank" className="underline">View ↗</Link>}
                  <form action={deletePostAction} className="inline"><input type="hidden" name="slug" value={p.slug} /><button className="text-red-700 underline">Delete</button></form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
