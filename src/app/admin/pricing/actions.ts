"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getPricing, savePricing, resetPricing, type Plan } from "@/lib/pricing";

export type FormState = { errors?: Record<string, string>; message?: string; values?: Record<string, string>; stamp?: number };

const PAGES = ["/pricing", "/google-business-profile-management", "/influencer-marketplace", "/seo-services", "/ads-management"];

export async function savePricingAction(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const current = await getPricing();
  const errors: Record<string, string> = {};
  const values: Record<string, string> = {};
  const plans: Plan[] = current.map((c) => {
    const k = c.product, g = (f: string) => { const v = String(fd.get(`${k}.${f}`) ?? "").trim(); values[`${k}.${f}`] = v; return v; };
    const name = g("name"), unit = g("unit"), priceLabel = g("priceLabel"), rawIn = g("from"), pts = g("points");
    const digits = rawIn.replace(/[^\d.]/g, "");
    const from = rawIn === "" ? 0 : Number(digits);
    const points = pts.split("\n").map((s) => s.trim()).filter(Boolean);
    if (!name || name.length > 60) errors[`${k}.name`] = "Enter a plan name (up to 60 characters).";
    if (rawIn !== "" && (digits === "" || !Number.isFinite(from) || from > 10_000_000)) errors[`${k}.from`] = `"${rawIn}" isn't a valid price. Use digits only, e.g. 4999, or 0 for Free.`;
    if (!unit || unit.length > 80) errors[`${k}.unit`] = "Enter a short unit, e.g. per month (up to 80 characters).";
    if (priceLabel.length > 30) errors[`${k}.priceLabel`] = "Keep the label under 30 characters.";
    if (points.length === 0 || points.length > 8 || points.some((x) => x.length > 100)) errors[`${k}.points`] = "1 to 8 features, one per line, each under 100 characters.";
    return { product: k, name, from: Math.round(from), unit, points, ...(priceLabel ? { priceLabel } : {}) };
  });
  const showPrices = fd.get("showPrices") === "on";
  values.showPrices = showPrices ? "on" : "";
  if (Object.keys(errors).length) return { errors, values, stamp: Date.now(), message: `Not saved: ${Object.keys(errors).length} field${Object.keys(errors).length > 1 ? "s need" : " needs"} fixing (marked in red below).` };
  await savePricing({ showPrices, plans });
  for (const p of PAGES) revalidatePath(p);
  redirect("/admin/pricing?saved=1");
}

export async function resetPricingAction() {
  await requireAdmin();
  await resetPricing();
  for (const p of PAGES) revalidatePath(p);
  redirect("/admin/pricing?saved=reset");
}
