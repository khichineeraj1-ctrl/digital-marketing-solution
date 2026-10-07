import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR } from "@/lib/dataDir";
import { pricing as defaults } from "@/content/products";

export type Plan = { product: string; name: string; from: number; unit: string; points: string[]; priceLabel?: string };

const FILE = path.join(DATA_DIR, "pricing.json");
const base = (): Plan[] => defaults.map((p) => ({ product: p.product, name: p.name, from: p.from, unit: p.unit, points: [...p.points] }));

/** Admin-edited plans, falling back to the defaults in code. A missing product keeps its default. */
export async function getPricing(): Promise<Plan[]> {
  try {
    const saved = JSON.parse(await readFile(FILE, "utf8")) as Plan[];
    return base().map((d) => saved.find((s) => s.product === d.product) ?? d);
  } catch { return base(); }
}
export async function getPlan(product: string): Promise<Plan> { return (await getPricing()).find((p) => p.product === product) ?? base()[0]; }
export async function savePricing(plans: Plan[]) { await mkdir(path.dirname(FILE), { recursive: true }); await writeFile(FILE, JSON.stringify(plans, null, 2)); }
export async function resetPricing() { await rm(FILE, { force: true }); }
export const priceText = (p: Plan) => p.priceLabel || (p.from === 0 ? "Free" : `₹${p.from.toLocaleString("en-IN")}`);
