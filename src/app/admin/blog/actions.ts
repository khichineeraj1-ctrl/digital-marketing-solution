"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getPost, savePost, deletePost, wordCount, CATEGORIES, type Post, type RelatedLink } from "@/lib/posts";
import { isValidSlug, slugify } from "@/lib/slug";
import { getPublishedAuthor, DEFAULT_AUTHOR } from "@/lib/authors";
import { SEO_LIMITS } from "@/config/site";

export type FormState = { errors?: Record<string, string>; message?: string };

function parseRelated(raw: string): RelatedLink[] {
  return raw.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const [label, p] = l.split("|").map((x) => x.trim());
    return { label, path: p };
  });
}

export async function savePostAction(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const originalSlug = String(fd.get("originalSlug") ?? "");
  const existing = originalSlug ? await getPost(originalSlug) : undefined;
  const g = (k: string) => String(fd.get(k) ?? "").trim();
  const intent = g("intent"); // "draft" | "publish"
  const publish = intent === "publish";

  const title = g("title");
  // published URLs are permanent: slug is locked once live
  const slug = existing?.status === "published" ? existing.slug : (g("slug") || slugify(title));
  const metaTitle = g("metaTitle") || title;
  const description = g("description");
  const bodyMd = String(fd.get("bodyMd") ?? "").replace(/\r/g, "").trim();
  const category = g("category");
  const related = parseRelated(String(fd.get("related") ?? ""));

  const errors: Record<string, string> = {};
  if (!title) errors.title = "Title is required";
  if (!isValidSlug(slug)) errors.slug = "Use lowercase letters, numbers and single hyphens (max 60)";
  if (slug !== originalSlug && (await getPost(slug))) errors.slug = "A post with this slug already exists";
  if (!(CATEGORIES as readonly string[]).includes(category)) errors.category = "Pick a category";
  for (const r of related) if (!r.label || !r.path?.startsWith("/")) errors.related = 'Each line must be "Label | /path"';

  if (publish) {
    if (metaTitle.length > SEO_LIMITS.titleMax || metaTitle.length < SEO_LIMITS.titleMin) errors.metaTitle = `SEO title must be ${SEO_LIMITS.titleMin}–${SEO_LIMITS.titleMax} characters (now ${metaTitle.length})`;
    if (description.length < SEO_LIMITS.descMin || description.length > SEO_LIMITS.descMax) errors.description = `Meta description must be ${SEO_LIMITS.descMin}–${SEO_LIMITS.descMax} characters (now ${description.length})`;
    if (wordCount(bodyMd) < 150) errors.bodyMd = `Publish needs at least 150 words (now ${wordCount(bodyMd)}). Save as draft to keep working.`;
    if (!bodyMd.split("\n").some((l) => l.startsWith("## "))) errors.bodyMd ??= "Add at least one ## heading";
  }
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };

  const authorRec = (await getPublishedAuthor(g("authorSlug"))) ?? (await getPublishedAuthor(DEFAULT_AUTHOR))!;
  const today = new Date().toISOString().slice(0, 10);
  const post: Post = {
    slug, title, metaTitle, description, bodyMd, category, related,
    author: authorRec.name, authorSlug: authorRec.slug,
    status: publish ? "published" : existing?.status === "published" && intent !== "unpublish" ? "published" : "draft",
    published: existing?.status === "published" ? existing.published : (publish ? today : existing?.published ?? today),
    modified: today,
  };
  if (intent === "unpublish") post.status = "draft";
  await savePost(post);
  revalidatePath("/blog"); revalidatePath(`/blog/${slug}`); revalidatePath("/sitemap.xml");
  redirect(`/admin/blog?saved=${post.status}`);
}

export async function deletePostAction(fd: FormData) {
  await requireAdmin();
  const slug = String(fd.get("slug"));
  await deletePost(slug);
  revalidatePath("/blog"); revalidatePath(`/blog/${slug}`); revalidatePath("/sitemap.xml");
  redirect("/admin/blog?saved=deleted");
}
