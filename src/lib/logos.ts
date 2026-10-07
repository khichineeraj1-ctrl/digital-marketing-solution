import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { DATA_DIR } from "@/lib/dataDir";

const DIR = path.join(DATA_DIR, "uploads", "logos");
export const MAX_LOGO_BYTES = 512 * 1024;
const TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", webp: "image/webp" };
import { FILE_RE } from "@/lib/logoPath";

/** Identifies the real format from the file's first bytes, never from its name or declared type. */
export function sniff(b: Buffer): "png" | "jpg" | "webp" | null {
  if (b.length > 12 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b.length > 12 && b.subarray(0, 4).toString() === "RIFF" && b.subarray(8, 12).toString() === "WEBP") return "webp";
  return null;
}

export async function saveLogo(slug: string, bytes: Buffer): Promise<string> {
  const ext = sniff(bytes)!;
  const name = `${slug.slice(0, 50)}-${createHash("sha256").update(bytes).digest("hex").slice(0, 10)}.${ext}`;
  await mkdir(DIR, { recursive: true });
  await writeFile(path.join(DIR, name), bytes);
  return name;
}
export async function deleteLogo(name?: string) { if (name && FILE_RE.test(name)) await rm(path.join(DIR, name), { force: true }); }
export async function readLogo(name: string): Promise<{ data: Buffer; type: string } | null> {
  if (!FILE_RE.test(name)) return null;
  try { return { data: await readFile(path.join(DIR, name)), type: TYPES[name.split(".").pop()!] }; } catch { return null; }
}
