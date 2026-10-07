"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getPricing, savePricing, resetPricing, type Plan } from "@/lib/pricing";

export type FormState = { errors?: Record<string, string>; message?: string };

export async function savePricingAction(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const current = await getPricing();
  const errors: Record<string, string> = {};
  const plans: Plan[] = current.map((c) => {
    const k = c.product, g = (f: string) => String(fd.get(`${k}.${f}`) ?? "").trim();
    const name = g("name"), unit = g("unit"), priceLabel = g("priceLabel");
    const raw = g("from").replace(/[,₹\s]/g, "");
    const from = raw === "" ? 0 : Number(raw);
    const points = g("points").split("\n").map((s) => s.trim()).filter(Boolean);
    if (!name || name.length > 60) errors[`${k}.name`] = "Enter a plan name (up to 60 characters).";
    if (!Number.isFinite(from) || from < 0 || from > 10_000_000) errors[`${k}.from`] = "Enter a number, 0 for Free.";
    if (!unit || unit.length > 80) errors[`${k}.unit`] = "Enter a short unit, e.g. per month (up to 80 characters).";
    if (priceLabel.length > 30) errors[`${k}.priceLabel`] = "Keep the label under 30 characters.";
    if (points.length === 0 || points.length > 8 || points.some((x) => x.length > 100)) errors[`${k}.points`] = "1 to 8 features, one per line, each under 100 characters.";
    return { product: k, name, from: Math.round(from), unit, points, ...(priceLabel ? { priceLabel } : {}) };
  });
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };
  await savePricing(plans);
  for (const p of ["/pricing", "/google-business-profile-management", "/influencer-marketplace", "/seo-services", "/ads-management"]) revalidatePath(p);
  redirect("/admin/pricing?saved=1");
}

export async function resetPricingAction() {
  await requireAdmin();
  await resetPricing();
  revalidatePath("/pricing");
  redirect("/admin/pricing?saved=reset");
}
