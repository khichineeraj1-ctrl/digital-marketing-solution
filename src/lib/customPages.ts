import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR } from "@/lib/dataDir";
import type { CustomPage } from "@/content/customPages";

const FILE = path.join(DATA_DIR, "pages.json");

async function load(): Promise<CustomPage[]> { try { return JSON.parse(await readFile(FILE, "utf8")) as CustomPage[]; } catch { return []; } }
async function persist(all: CustomPage[]) { await mkdir(path.dirname(FILE), { recursive: true }); await writeFile(FILE, JSON.stringify(all, null, 2)); }

export const getAllCustomPages = async () => (await load()).sort((a, b) => b.modified.localeCompare(a.modified));
export const getPublishedCustomPages = async () => (await getAllCustomPages()).filter((p) => p.status === "published");
export const getCustomPageById = async (id: string) => (await load()).find((p) => p.id === id);
export const getCustomPageByPath = async (p: string) => (await load()).find((x) => x.path === p);
export const getPublishedCustomPage = async (p: string) => { const x = await getCustomPageByPath(p); return x?.status === "published" ? x : undefined; };
export async function saveCustomPage(p: CustomPage) { const all = await load(); const i = all.findIndex((x) => x.id === p.id); if (i >= 0) all[i] = p; else all.push(p); await persist(all); }
export async function deleteCustomPage(id: string) { await persist((await load()).filter((p) => p.id !== id)); }
