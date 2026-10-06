import { NextResponse } from "next/server";
import { z } from "zod";
import { addLead } from "@/lib/leads";
import { HIGH_VALUE_BUDGETS, HIGH_VALUE_LOCATIONS, SERVICE_FIELDS, isHighValue, type ServiceKey } from "@/content/enquiry";

export const runtime = "nodejs";

const schema = z.object({
  service: z.enum(["gbp", "influencer", "seo", "ads", "other"]),
  name: z.string({ error: "Enter your full name" }).trim().min(2, "Enter your full name").max(120),
  email: z.string({ error: "Enter a valid email" }).trim().toLowerCase().email("Enter a valid email").max(200),
  phone: z.string({ error: "Enter a valid 10-digit Indian mobile number" }).trim().regex(/^(\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  company: z.string({ error: "Enter your business or brand name" }).trim().min(2, "Enter your business or brand name").max(160),
  city: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().max(1000).optional().default(""),
  details: z.record(z.string(), z.union([z.string().max(300), z.array(z.string().max(60)).max(12)])).optional().default({}),
  // legacy / Business-Profile-connect form
  locations: z.enum(["1", "2-10", "11-50", "50-plus"]).optional(),
  budget: z.enum(["lt-50k", "50k-2l", "2l-10l", "10l-plus", "unsure"]).optional(),
  kind: z.enum(["enquiry", "gbp-connect"]).optional().default("enquiry"),
  gbpEmail: z.string().trim().toLowerCase().email("Enter the Google account email").max(200).optional(),
  gbpUrl: z.string().trim().max(500).optional().default(""),
  consent: z.literal("yes", { error: "Please accept the terms to continue" }),
  website: z.string().max(0).optional(), // honeypot
}).refine((d) => d.kind !== "gbp-connect" || !!d.gbpEmail, { path: ["gbpEmail"], message: "Enter the Google account email that manages your profile" });

// Naive per-instance rate limit. Put a real limiter (Upstash / WAF) in front for production.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many attempts. Please wait a minute." }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const i of parsed.error.issues) fields[String(i.path[0])] ??= i.message;
    if (fields.website) return NextResponse.json({ ok: true }); // honeypot: pretend success
    return NextResponse.json({ error: "Please fix the highlighted fields.", fields }, { status: 400 });
  }

  const { website: _hp, consent: _c, details: raw, ...lead } = parsed.data;

  // Keep only answers the chosen service actually asks, and check them against its config.
  const config = lead.kind === "gbp-connect" ? [] : SERVICE_FIELDS[lead.service as ServiceKey];
  const details: Record<string, string | string[]> = {};
  const fields: Record<string, string> = {};
  for (const f of config) {
    const v = raw[f.key];
    const vals = Array.isArray(v) ? v : v ? [v] : [];
    if (f.required && !vals.length) { fields[f.key] = f.kind === "text" ? "This field is required" : "Please choose an option"; continue; }
    if (!vals.length) continue;
    if (f.kind === "text") details[f.key] = String(vals[0]).trim();
    else if (vals.every((x) => f.options?.some((o) => o.value === x))) details[f.key] = f.kind === "multi" ? vals : vals[0];
    else fields[f.key] = "Invalid option";
  }
  if (lead.service === "other" && lead.message.length < 10) fields.message = "Tell us a little about what you need";
  if (Object.keys(fields).length) return NextResponse.json({ error: "Please fix the highlighted fields.", fields }, { status: 400 });

  const record = {
    ...lead, details,
    priority: isHighValue(lead.service, details) || HIGH_VALUE_BUDGETS.includes(lead.budget ?? "") || HIGH_VALUE_LOCATIONS.includes(lead.locations ?? ""),
    source: req.headers.get("referer") ?? "",
  };

  try {
    await addLead(record);
  } catch (e) {
    if (!process.env.ENQUIRY_WEBHOOK_URL) {
      console.error("enquiry persist failed and no ENQUIRY_WEBHOOK_URL set", e);
      return NextResponse.json({ error: "Could not save your details. Please try again." }, { status: 500 });
    }
  }

  const hook = process.env.ENQUIRY_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...record, ts: new Date().toISOString() }), signal: AbortSignal.timeout(5000) });
    } catch (e) { console.error("enquiry webhook failed", e); }
  }
  return NextResponse.json({ ok: true });
}
