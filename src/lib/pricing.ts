import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR } from "@/lib/dataDir";
import { pricing as defaults } from "@/content/products";

export type Plan = { product: string; name: string; from: number; unit: string; points: string[]; priceLabel?: string };
export type PricingConfig = { showPrices: boolean; plans: Plan[] };

const FILE = path.join(DATA_DIR, "pricing.json");
const base = (): Plan[] => defaults.map((p) => ({ product: p.product, name: p.name, from: p.from, unit: p.unit, points: [...p.points] }));
const merge = (saved: Plan[]) => base().map((d) => saved.find((s) => s.product === d.product) ?? d);

/** Prices are customised per client, so they are hidden on the public site unless an admin switches them on. */
export async function getPricingConfig(): Promise<PricingConfig> {
  try {
    const raw = JSON.parse(await readFile(FILE, "utf8")) as Plan[] | { showPrices?: boolean; plans?: Plan[] };
    if (Array.isArray(raw)) return { showPrices: false, plans: merge(raw) };
    return { showPrices: raw.showPrices === true, plans: merge(raw.plans ?? []) };
  } catch { return { showPrices: false, plans: base() }; }
}
export const getPricing = async () => (await getPricingConfig()).plans;
/** The starting price to publish in search markup, or undefined while prices are hidden. */
export async function publicFromPrice(product: string): Promise<number | undefined> {
  const c = await getPricingConfig();
  return c.showPrices ? c.plans.find((p) => p.product === product)?.from : undefined;
}
export async function savePricing(c: PricingConfig) { await mkdir(path.dirname(FILE), { recursive: true }); await writeFile(FILE, JSON.stringify(c, null, 2)); }
export async function resetPricing() { await rm(FILE, { force: true }); }
export const priceText = (p: Plan) => p.priceLabel || (p.from === 0 ? "Free" : `₹${p.from.toLocaleString("en-IN")}`);
