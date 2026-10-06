"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/adminAuth";
import { getCustomPageById, getCustomPageByPath, saveCustomPage, deleteCustomPage } from "@/lib/customPages";
import { allRoutes } from "@/lib/routes";
import { BLOCK_TYPES, RESERVED_FIRST_SEGMENTS, type CustomBlock, type CustomPage } from "@/content/customPages";
import { isValidSlug, slugify } from "@/lib/slug";
import { pairs, pageWords, internalLinkCount } from "@/lib/blocks";
import { SEO_LIMITS } from "@/config/site";

export type FormState = { errors?: Record<string, string>; message?: string };
const SERVICES = ["", "gbp", "seo", "influencer", "ads", "other"];

function revalidateAll(path: string) { revalidatePath(`/${path}`); revalidatePath("/sitemap.xml"); }

export async function saveCustomPageAction(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const g = (k: string) => String(fd.get(k) ?? "").trim();
  const id = g("id");
  const existing = id ? await getCustomPageById(id) : undefined;
  const intent = g("intent");
  const publish = intent === "publish";

  let blocks: CustomBlock[] = [];
  try { blocks = JSON.parse(String(fd.get("blocks") ?? "[]")); } catch { /* handled below */ }
  const validTypes = BLOCK_TYPES.map((b) => b.value) as string[];
  blocks = (Array.isArray(blocks) ? blocks : []).filter((b) => b && validTypes.includes(b.type)).map((b) => ({
    id: String(b.id || randomUUID()), type: b.type, heading: String(b.heading ?? "").slice(0, 200), text: String(b.text ?? "").slice(0, 8000), service: SERVICES.includes(b.service) ? b.service : "",
  }));

  const raw = g("path").replace(/^\/+|\/+$/g, "");
  const live = existing?.status === "published";
  const path = live ? existing!.path : raw || slugify(g("title")).slice(0, 60);
  const page: CustomPage = {
    id: existing?.id ?? randomUUID(), path, title: g("title"), eyebrow: g("eyebrow"), lead: g("lead"),
    ctaService: SERVICES.includes(g("ctaService")) ? g("ctaService") : "", ctaLabel: g("ctaLabel"),
    metaTitle: g("metaTitle") || g("title"), description: g("description"), blocks,
    noindex: fd.get("noindex") === "on",
    status: publish ? "published" : intent === "unpublish" ? "draft" : (existing?.status ?? "draft"),
    published: existing?.published ?? new Date().toISOString().slice(0, 10), modified: new Date().toISOString().slice(0, 10),
  };

  const errors: Record<string, string> = {};
  const segs = path.split("/");
  if (!page.title) errors.title = "Title is required";
  if (!path || segs.length > 2 || !segs.every(isValidSlug)) errors.path = "Use 1–2 lowercase, hyphenated segments, e.g. seo-services-in-noida or locations/noida";
  else if ((RESERVED_FIRST_SEGMENTS as readonly string[]).includes(segs[0])) errors.path = `"${segs[0]}" is used by the site itself. Pick a different URL.`;
  else {
    const dup = await getCustomPageByPath(path);
    if (dup && dup.id !== page.id) errors.path = "Another custom page already uses this URL.";
    if ((await allRoutes()).some((r) => r.path === `/${path}` && !(existing && existing.path === path))) errors.path ??= "This URL already exists on the site.";
  }
  for (const b of blocks) {
    if (["cards", "steps", "faq", "links"].includes(b.type)) {
      const ps = pairs(b.text);
      if (b.type === "links" && ps.some(([l, p]) => !l || !p.startsWith("/"))) errors.blocks = 'Link blocks need one "Label | /internal-path" per line.';
      if (["cards", "steps", "faq"].includes(b.type) && ps.some(([a, c]) => !a || !c)) errors.blocks = 'Cards, steps and FAQ need "Title | Text" on every line.';
    }
  }
  if (publish) {
    if (page.metaTitle.length < SEO_LIMITS.titleMin || page.metaTitle.length > SEO_LIMITS.titleMax) errors.metaTitle = `SEO title must be ${SEO_LIMITS.titleMin}–${SEO_LIMITS.titleMax} characters (now ${page.metaTitle.length})`;
    if (page.description.length < SEO_LIMITS.descMin || page.description.length > SEO_LIMITS.descMax) errors.description = `Meta description must be ${SEO_LIMITS.descMin}–${SEO_LIMITS.descMax} characters (now ${page.description.length})`;
    if (page.lead.length < 40) errors.lead = "Add an intro (at least 40 characters) under the headline";
    if (pageWords(page) < 150) errors.blocks ??= `Publish needs at least 150 words of content (now ${pageWords(page)}). Thin pages hurt SEO.`;
    if (internalLinkCount(blocks) < 2) errors.links = "Link to at least 2 relevant pages (add an Internal links block) so the page is not isolated.";
  }
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };

  await saveCustomPage(page);
  revalidateAll(page.path);
  redirect(`/admin/pages?saved=${page.status}`);
}

export async function deleteCustomPageAction(fd: FormData) {
  await requireAdmin();
  const p = await getCustomPageById(String(fd.get("id")));
  if (p) { await deleteCustomPage(p.id); revalidateAll(p.path); }
  redirect("/admin/pages?saved=deleted");
}
