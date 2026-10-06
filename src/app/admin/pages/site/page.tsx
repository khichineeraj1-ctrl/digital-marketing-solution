import { notFound } from "next/navigation";
import Link from "next/link";
import * as cheerio from "cheerio";
import { requireAdmin } from "@/lib/adminAuth";
import { editablePaths } from "@/lib/editable";
import { getOverride, NO_HERO } from "@/lib/overrides";
import { SiteForm, type Defaults } from "../SiteForm";

/** Reads the page's current title / description / H1 / intro from the running site, to show as placeholders. */
async function liveDefaults(path: string): Promise<Defaults> {
  const empty = { title: "", description: "", h1: "", lead: "" };
  try {
    const res = await fetch(`http://127.0.0.1:${process.env.PORT ?? 3000}${path}`, { cache: "no-store", signal: AbortSignal.timeout(6000) });
    if (!res.ok) return empty;
    const $ = cheerio.load(await res.text());
    const h1 = $("h1").first();
    return { title: $("head > title").first().text().trim(), description: $('meta[name="description"]').attr("content") ?? "", h1: h1.text().trim(), lead: h1.nextAll("p").first().text().trim() };
  } catch { return empty; }
}

export default async function Page({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  await requireAdmin();
  const path = (await searchParams).path ?? "";
  if (!(await editablePaths()).includes(path)) notFound();
  const [override, defaults] = await Promise.all([getOverride(path), liveDefaults(path)]);
  return (
    <>
      <p className="text-sm"><Link href="/admin/pages" className="text-brand-700 underline">← All pages</Link></p>
      <h1 className="mt-2 text-2xl font-bold">Edit page <code className="rounded bg-slate-100 px-2 py-0.5 text-base">{path}</code></h1>
      {NO_HERO.has(path) && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">This page has a custom layout, so you can change its SEO text and add extra sections. Its headline and form are set in code.</p>}
      <div className="mt-6"><SiteForm path={path} override={override} defaults={defaults} noHero={NO_HERO.has(path)} /></div>
    </>
  );
}
