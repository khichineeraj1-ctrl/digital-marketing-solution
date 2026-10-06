"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/adminAuth";
import { editablePaths } from "@/lib/editable";
import { saveOverride, resetOverride, NO_HERO, type Override } from "@/lib/overrides";
import { BLOCK_TYPES, type CustomBlock } from "@/content/customPages";
import { pairs } from "@/lib/blocks";
import { SEO_LIMITS } from "@/config/site";

export type FormState = { errors?: Record<string, string>; message?: string };
const SERVICES = ["", "gbp", "seo", "influencer", "ads", "other"];

export async function saveSitePageAction(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const g = (k: string) => String(fd.get(k) ?? "").trim();
  const path = g("path");
  if (!(await editablePaths()).includes(path)) return { message: "That page can't be edited here." };

  const errors: Record<string, string> = {};
  const metaTitle = g("metaTitle"), description = g("description"), h1 = g("h1"), lead = g("lead");
  if (metaTitle && (metaTitle.length < SEO_LIMITS.titleMin || metaTitle.length > SEO_LIMITS.titleMax)) errors.metaTitle = `SEO title must be ${SEO_LIMITS.titleMin}–${SEO_LIMITS.titleMax} characters (now ${metaTitle.length}), or leave it blank to keep the default.`;
  if (description && (description.length < SEO_LIMITS.descMin || description.length > SEO_LIMITS.descMax)) errors.description = `Meta description must be ${SEO_LIMITS.descMin}–${SEO_LIMITS.descMax} characters (now ${description.length}), or leave it blank to keep the default.`;
  if (h1.length > 120) errors.h1 = "Keep the headline under 120 characters.";
  if (lead.length > 400) errors.lead = "Keep the intro under 400 characters.";

  const faqLines = String(fd.get("faqs") ?? "");
  const faqs = pairs(faqLines).map(([q, a]) => ({ q, a }));
  if (faqs.some((f) => !f.q || !f.a)) errors.faqs = 'One per line: "Question | Answer".';

  let blocks: CustomBlock[] = [];
  try { blocks = JSON.parse(String(fd.get("blocks") ?? "[]")); } catch { /* ignore */ }
  const valid = BLOCK_TYPES.map((b) => b.value) as string[];
  blocks = (Array.isArray(blocks) ? blocks : []).filter((b) => b && valid.includes(b.type)).map((b) => ({
    id: String(b.id || randomUUID()), type: b.type, heading: String(b.heading ?? "").slice(0, 200), text: String(b.text ?? "").slice(0, 8000), service: SERVICES.includes(b.service) ? b.service : "",
  }));
  for (const b of blocks) {
    if (["cards", "steps", "faq", "links"].includes(b.type)) {
      const ps = pairs(b.text);
      if (b.type === "links" && ps.some(([l, p]) => !l || !p.startsWith("/"))) errors.blocks = 'Link blocks need one "Label | /internal-path" per line.';
      if (["cards", "steps", "faq"].includes(b.type) && ps.some(([a, c]) => !a || !c)) errors.blocks = 'Cards, steps and FAQ need "Title | Text" on every line.';
    }
  }
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };

  const o: Override = { modified: new Date().toISOString().slice(0, 10) };
  if (metaTitle) o.metaTitle = metaTitle;
  if (description) o.description = description;
  if (!NO_HERO.has(path)) { if (h1) o.h1 = h1; if (lead) o.lead = lead; if (faqs.length) o.faqs = faqs; }
  if (blocks.length) o.blocks = blocks;
  if (Object.keys(o).length === 1) await resetOverride(path); else await saveOverride(path, o);

  revalidatePath(path); revalidatePath("/sitemap.xml");
  redirect(`/admin/pages?saved=site`);
}

export async function resetSitePageAction(fd: FormData) {
  await requireAdmin();
  const path = String(fd.get("path") ?? "");
  if ((await editablePaths()).includes(path)) { await resetOverride(path); revalidatePath(path); }
  redirect("/admin/pages?saved=reset");
}
