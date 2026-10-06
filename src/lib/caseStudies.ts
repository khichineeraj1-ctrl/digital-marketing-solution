import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR } from "@/lib/dataDir";
import { seedCaseStudies, type CaseStudy } from "@/content/caseStudies";

const FILE = path.join(DATA_DIR, "case-studies.json");

async function load(): Promise<CaseStudy[]> {
  try { return JSON.parse(await readFile(FILE, "utf8")) as CaseStudy[]; }
  catch { try { await persist(seedCaseStudies); } catch { /* read-only FS */ } return seedCaseStudies; }
}
async function persist(all: CaseStudy[]) { await mkdir(path.dirname(FILE), { recursive: true }); await writeFile(FILE, JSON.stringify(all, null, 2)); }

export const getAllCaseStudies = async () => (await load()).sort((a, b) => b.published.localeCompare(a.published));
export const getPublishedCaseStudies = async () => (await getAllCaseStudies()).filter((c) => c.status === "published");
/** Real (non-sample) published studies: the only ones that go in the sitemap. */
export const getIndexableCaseStudies = async () => (await getPublishedCaseStudies()).filter((c) => !c.sample);
export const getCaseStudy = async (slug: string) => (await load()).find((c) => c.slug === slug);
export const getPublishedCaseStudy = async (slug: string) => { const c = await getCaseStudy(slug); return c?.status === "published" ? c : undefined; };
export async function saveCaseStudy(c: CaseStudy) { const all = await load(); const i = all.findIndex((x) => x.slug === c.slug); if (i >= 0) all[i] = c; else all.push(c); await persist(all); }
export async function deleteCaseStudy(slug: string) { await persist((await load()).filter((c) => c.slug !== slug)); }
