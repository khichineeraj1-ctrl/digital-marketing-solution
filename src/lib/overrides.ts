import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { DATA_DIR } from "@/lib/dataDir";
import { buildMetadata, type SeoInput } from "@/lib/seo";
import type { CustomBlock } from "@/content/customPages";

/** Edits an admin makes to a built-in (code-defined) page. Every field is optional: blank means "use the default". */
export type Override = {
  metaTitle?: string;
  description?: string;
  h1?: string;
  lead?: string;
  faqs?: { q: string; a: string }[];
  blocks?: CustomBlock[];
  modified: string;
};

const FILE = path.join(DATA_DIR, "overrides.json");
type Store = Record<string, Override>;

async function load(): Promise<Store> { try { return JSON.parse(await readFile(FILE, "utf8")) as Store; } catch { return {}; } }
async function persist(s: Store) { await mkdir(path.dirname(FILE), { recursive: true }); await writeFile(FILE, JSON.stringify(s, null, 2)); }

export async function getOverride(p: string): Promise<Override | undefined> { return (await load())[p]; }
export const getAllOverrides = load;
export async function saveOverride(p: string, o: Override) { const s = await load(); s[p] = o; await persist(s); }
export async function resetOverride(p: string) { const s = await load(); delete s[p]; await persist(s); }

/** buildMetadata + any SEO title/description the admin has set for this exact path. */
export async function metaFor(input: SeoInput): Promise<Metadata> {
  const o = await getOverride(input.path);
  return buildMetadata({ ...input, title: o?.metaTitle || input.title, description: o?.description || input.description });
}

/** Pages whose hero/FAQ/blocks cannot be overridden (they have no standard hero). SEO + extra sections still apply. */
export const NO_HERO = new Set(["/contact", "/google-business-profile-management/get-started", "/privacy", "/terms"]);
