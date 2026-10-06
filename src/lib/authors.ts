import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR } from "@/lib/dataDir";
import { seedAuthors, type Author } from "@/content/authors";
import type { Post } from "@/lib/posts";

const FILE = path.join(DATA_DIR, "authors.json");
export const DEFAULT_AUTHOR = "editorial-team";

async function load(): Promise<Author[]> {
  try { return JSON.parse(await readFile(FILE, "utf8")) as Author[]; }
  catch { try { await persist(seedAuthors); } catch { /* read-only FS */ } return seedAuthors; }
}
async function persist(all: Author[]) { await mkdir(path.dirname(FILE), { recursive: true }); await writeFile(FILE, JSON.stringify(all, null, 2)); }

export const getAllAuthors = async () => (await load()).sort((a, b) => Number(a.type === "organization") - Number(b.type === "organization") || a.name.localeCompare(b.name));
export const getPublishedAuthors = async () => (await getAllAuthors()).filter((a) => a.status === "published");
/** Real, public profiles: the only ones that go in the sitemap and may be used as bylines. */
export const getIndexableAuthors = async () => (await getPublishedAuthors()).filter((a) => !a.sample);
export const getAuthor = async (slug: string) => (await load()).find((a) => a.slug === slug);
export const getPublishedAuthor = async (slug: string) => { const a = await getAuthor(slug); return a?.status === "published" ? a : undefined; };
export async function saveAuthor(a: Author) { const all = await load(); const i = all.findIndex((x) => x.slug === a.slug); if (i >= 0) all[i] = a; else all.push(a); await persist(all); }
export async function deleteAuthor(slug: string) { await persist((await load()).filter((a) => a.slug !== slug)); }

/** The byline author for a post. Falls back to the organisation if the named author is missing, a draft or a sample. */
export async function authorForPost(p: Pick<Post, "authorSlug" | "author">): Promise<Author> {
  const all = await getIndexableAuthors();
  return all.find((a) => a.slug === p.authorSlug) ?? all.find((a) => a.name === p.author) ?? all.find((a) => a.slug === DEFAULT_AUTHOR) ?? seedAuthors[0];
}
export async function postsBy(slug: string): Promise<Post[]> {
  const { getPublishedPosts } = await import("@/lib/posts");
  const posts = await getPublishedPosts();
  const out: Post[] = [];
  for (const p of posts) if ((await authorForPost(p)).slug === slug) out.push(p);
  return out;
}
