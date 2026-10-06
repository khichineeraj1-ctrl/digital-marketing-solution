"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getCaseStudy, saveCaseStudy, deleteCaseStudy } from "@/lib/caseStudies";
import { CS_SERVICES, type CaseStudy, type CsService, type Metric } from "@/content/caseStudies";
import { isValidSlug, slugify } from "@/lib/slug";
import { SEO_LIMITS } from "@/config/site";

export type FormState = { errors?: Record<string, string>; message?: string };
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

function parseMetrics(raw: string): Metric[] {
  return raw.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => { const [value, label] = l.split("|").map((x) => x.trim()); return { value, label }; });
}

export async function saveCaseStudyAction(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const g = (k: string) => String(fd.get(k) ?? "").trim();
  const md = (k: string) => String(fd.get(k) ?? "").replace(/\r/g, "").trim();
  const originalSlug = g("originalSlug");
  const existing = originalSlug ? await getCaseStudy(originalSlug) : undefined;
  const intent = g("intent");
  const publish = intent === "publish";

  const client = g("client"), title = g("title");
  const live = existing?.status === "published" && !existing.sample;
  const slug = live ? existing!.slug : (g("slug") || slugify(`${client} ${title}`).slice(0, 60));
  const services = CS_SERVICES.map((s) => s.value).filter((v) => fd.getAll("services").includes(v)) as CsService[];
  const metrics = parseMetrics(String(fd.get("metrics") ?? ""));
  const sample = fd.get("sample") === "on";
  const quote = { text: g("quoteText"), name: g("quoteName"), role: g("quoteRole") };
  const c: CaseStudy = {
    slug, client, title, services, metrics, sample,
    industry: g("industry"), city: g("city"), duration: g("duration"),
    metaTitle: g("metaTitle") || title, description: g("description"), summary: g("summary"),
    challengeMd: md("challengeMd"), solutionMd: md("solutionMd"), resultsMd: md("resultsMd"),
    quote: quote.text ? quote : undefined,
    status: publish ? "published" : intent === "unpublish" ? "draft" : (existing?.status ?? "draft"),
    published: existing?.published ?? new Date().toISOString().slice(0, 10),
    modified: new Date().toISOString().slice(0, 10),
  };

  const errors: Record<string, string> = {};
  if (!client) errors.client = "Client name is required";
  if (!title) errors.title = "Title is required";
  if (!isValidSlug(slug)) errors.slug = "Use lowercase letters, numbers and single hyphens (max 60)";
  if (slug !== originalSlug && (await getCaseStudy(slug))) errors.slug = "A case study with this slug already exists";
  for (const m of metrics) if (!m.value || !m.label) errors.metrics = 'One per line: "64% | Increase in direction requests"';
  if (publish) {
    if (!services.length) errors.services = "Pick at least one service";
    if (c.metaTitle.length < SEO_LIMITS.titleMin || c.metaTitle.length > SEO_LIMITS.titleMax) errors.metaTitle = `SEO title must be ${SEO_LIMITS.titleMin}–${SEO_LIMITS.titleMax} characters (now ${c.metaTitle.length})`;
    if (c.description.length < SEO_LIMITS.descMin || c.description.length > SEO_LIMITS.descMax) errors.description = `Meta description must be ${SEO_LIMITS.descMin}–${SEO_LIMITS.descMax} characters (now ${c.description.length})`;
    if (!c.summary) errors.summary = "Add a one-line summary for the card";
    if (!metrics.length) errors.metrics = "Add at least one result metric";
    if (words(`${c.challengeMd} ${c.solutionMd} ${c.resultsMd}`) < 120) errors.challengeMd = "Write at least 120 words across challenge, solution and results";
    if (sample) errors.sample = "Untick 'sample' only for real client results. Sample stories stay hidden from Google.";
  }
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };

  await saveCaseStudy(c);
  revalidatePath("/case-studies"); revalidatePath(`/case-studies/${slug}`); revalidatePath("/sitemap.xml"); revalidatePath("/");
  redirect(`/admin/case-studies?saved=${c.status}`);
}

export async function deleteCaseStudyAction(fd: FormData) {
  await requireAdmin();
  const slug = String(fd.get("slug"));
  await deleteCaseStudy(slug);
  revalidatePath("/case-studies"); revalidatePath(`/case-studies/${slug}`); revalidatePath("/sitemap.xml"); revalidatePath("/");
  redirect("/admin/case-studies?saved=deleted");
}
