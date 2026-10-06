import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR } from "@/lib/dataDir";
import { posts as seed, type Block } from "@/content/blog";

export { CATEGORIES } from "@/content/blog";
export type PostStatus = "draft" | "published";
export type RelatedLink = { label: string; path: string };
export type Post = {
  slug: string; title: string; metaTitle: string; description: string;
  published: string; modified: string; author: string; authorSlug?: string; category: string;
  status: PostStatus; related: RelatedLink[]; bodyMd: string;
};

const FILE = path.join(DATA_DIR, "posts.json");

export function blocksToMd(blocks: Block[]): string {
  return blocks.map((b) => "items" in b ? b.items.map((i) => `- ${i}`).join("\n") : b.t === "h2" ? `## ${b.text}` : b.text).join("\n\n");
}

/** Markdown-lite: "## Heading", blank-line separated paragraphs, "- " bullet lists. */
export function mdToBlocks(md: string): Block[] {
  const out: Block[] = [];
  for (const chunk of md.replace(/\r/g, "").split(/\n{2,}/).map((c) => c.trim()).filter(Boolean)) {
    if (chunk.startsWith("## ")) out.push({ t: "h2", text: chunk.slice(3).trim() });
    else if (chunk.split("\n").every((l) => l.startsWith("- "))) out.push({ t: "ul", items: chunk.split("\n").map((l) => l.slice(2).trim()) });
    else out.push({ t: "p", text: chunk.replace(/\n/g, " ") });
  }
  return out;
}

export const wordCount = (md: string) => md.split(/\s+/).filter(Boolean).length;
export const readMins = (md: string) => Math.max(1, Math.round(wordCount(md) / 200));

async function load(): Promise<Post[]> {
  try { return JSON.parse(await readFile(FILE, "utf8")) as Post[]; }
  catch {
    const seeded: Post[] = seed.map((p) => ({
      slug: p.slug, title: p.title, metaTitle: p.metaTitle, description: p.description, published: p.published,
      modified: p.modified, author: p.author, category: p.category, status: "published", related: p.related, bodyMd: blocksToMd(p.body),
    }));
    try { await persist(seeded); } catch { /* read-only FS: serve the seed */ }
    return seeded;
  }
}
async function persist(all: Post[]) {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(all, null, 2));
}

export const getAllPosts = async () => (await load()).sort((a, b) => b.published.localeCompare(a.published));
export const getPublishedPosts = async () => (await getAllPosts()).filter((p) => p.status === "published");
export async function getPost(slug: string) { return (await load()).find((p) => p.slug === slug); }
export async function getPublishedPost(slug: string) { const p = await getPost(slug); return p?.status === "published" ? p : undefined; }

export async function savePost(p: Post) {
  const all = await load();
  const i = all.findIndex((x) => x.slug === p.slug);
  if (i >= 0) all[i] = p; else all.push(p);
  await persist(all);
}
export async function deletePost(slug: string) { await persist((await load()).filter((p) => p.slug !== slug)); }
