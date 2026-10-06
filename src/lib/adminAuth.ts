import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { site } from "@/config/site";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "admin_session";
const TTL = 60 * 60 * 8; // 8h

const secret = () => {
  const s = process.env.ADMIN_SECRET;
  if (!s || s.length < 16) throw new Error("ADMIN_SECRET (16+ chars) is not set");
  return s;
};
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");
const safeEq = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  // compare HMACs so length never leaks
  return safeEq(sign(input), sign(pw));
}

export async function startSession() {
  const exp = String(Math.floor(Date.now() / 1000) + TTL);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, { httpOnly: true, sameSite: "lax", secure: site.url.startsWith("https://"), path: "/", maxAge: TTL });
}
export async function endSession() { (await cookies()).delete({ name: COOKIE, path: "/" }); }

export async function isAdmin(): Promise<boolean> {
  try {
    const v = (await cookies()).get(COOKIE)?.value;
    if (!v) return false;
    const [exp, sig] = v.split(".");
    return !!exp && !!sig && safeEq(sig, sign(exp)) && Number(exp) > Date.now() / 1000;
  } catch { return false; }
}
export async function requireAdmin() { if (!(await isAdmin())) redirect("/admin/login"); }
