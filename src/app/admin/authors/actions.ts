"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getAuthor, saveAuthor, deleteAuthor, DEFAULT_AUTHOR } from "@/lib/authors";
import { getAllPosts } from "@/lib/posts";
import type { Author } from "@/content/authors";
import { isValidSlug, slugify } from "@/lib/slug";

export type FormState = { errors?: Record<string, string>; message?: string };
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const isUrl = (u: string) => { try { return ["http:", "https:"].includes(new URL(u).protocol); } catch { return false; } };

export async function saveAuthorAction(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const g = (k: string) => String(fd.get(k) ?? "").trim();
  const originalSlug = g("originalSlug");
  const existing = originalSlug ? await getAuthor(originalSlug) : undefined;
  const intent = g("intent");
  const publish = intent === "publish";

  const name = g("name");
  const type = g("type") === "organization" ? "organization" : "person";
  const live = existing?.status === "published" && !existing.sample;
  const slug = live ? existing!.slug : (g("slug") || slugify(name).slice(0, 60));
  const list = (k: string, sep: RegExp) => String(fd.get(k) ?? "").split(sep).map((x) => x.trim()).filter(Boolean);
  const a: Author = {
    slug, type, name, role: g("role"), bio: String(fd.get("bio") ?? "").replace(/\r/g, "").trim(),
    expertise: list("expertise", /[,\n]/), credentials: list("credentials", /\n/),
    photoUrl: g("photoUrl"),
    links: { linkedin: g("linkedin"), x: g("x"), website: g("website") },
    sample: fd.get("sample") === "on",
    status: publish ? "published" : intent === "unpublish" ? "draft" : (existing?.status ?? "draft"),
    published: existing?.published ?? new Date().toISOString().slice(0, 10),
    modified: new Date().toISOString().slice(0, 10),
  };

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!isValidSlug(slug)) errors.slug = "Use lowercase letters, numbers and single hyphens";
  if (slug !== originalSlug && (await getAuthor(slug))) errors.slug = "An author with this slug already exists";
  for (const [k, v] of Object.entries({ photoUrl: a.photoUrl, linkedin: a.links.linkedin, x: a.links.x, website: a.links.website }))
    if (v && !isUrl(v)) errors[k] = "Enter a full URL starting with https://";
  if (intent === "unpublish" && slug === DEFAULT_AUTHOR) errors.slug = "The default editorial author must stay published";
  if (publish) {
    if (!a.role) errors.role = "Add a job title or descriptor";
    if (words(a.bio) < 40) errors.bio = `Write at least 40 words of bio (now ${words(a.bio)}). Be specific about experience.`;
    if (!a.expertise.length) errors.expertise = "Add at least one area of expertise";
    if (type === "person" && !a.links.linkedin && !a.links.website) errors.linkedin = "People need a verifiable profile: add LinkedIn or a personal website.";
    if (type === "person" && !a.credentials.length) errors.credentials = "Add at least one verifiable credential or experience fact.";
    if (a.sample) errors.sample = "Untick 'sample' only for a real person. Sample profiles stay hidden from Google.";
  }
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };

  await saveAuthor(a);
  revalidatePath("/authors"); revalidatePath(`/authors/${slug}`); revalidatePath("/sitemap.xml"); revalidatePath("/blog", "layout");
  redirect(`/admin/authors?saved=${a.status}`);
}

export async function deleteAuthorAction(fd: FormData) {
  await requireAdmin();
  const slug = String(fd.get("slug"));
  if (slug === DEFAULT_AUTHOR) redirect("/admin/authors?saved=protected");
  const used = (await getAllPosts()).filter((p) => p.authorSlug === slug).length;
  if (used) redirect(`/admin/authors?saved=inuse&n=${used}`);
  await deleteAuthor(slug);
  revalidatePath("/authors"); revalidatePath("/sitemap.xml");
  redirect("/admin/authors?saved=deleted");
}
