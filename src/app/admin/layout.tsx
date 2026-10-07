import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin, endSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import { site } from "@/config/site";

export const metadata: Metadata = { title: { absolute: "Admin" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

async function logout() { "use server"; await endSession(); redirect("/admin/login"); }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdmin();
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/admin" className="font-bold text-brand-700">{site.name} Admin</Link>
            {authed && (
              <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
                <Link href="/admin">Dashboard</Link>
                <Link href="/admin/leads">Leads</Link>
                <Link href="/admin/blog">Blog</Link>
                <Link href="/admin/authors">Authors</Link>
                <Link href="/admin/case-studies">Client successes</Link>
                <Link href="/admin/pages">Pages</Link>
                <Link href="/admin/pricing">Pricing</Link>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-muted hover:underline" target="_blank">View site ↗</Link>
            {authed && <form action={logout}><button className="font-medium text-brand-700">Log out</button></form>}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
