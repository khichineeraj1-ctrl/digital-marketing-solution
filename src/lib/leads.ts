import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR } from "@/lib/dataDir";
import { randomUUID } from "node:crypto";

export const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;
export type Status = (typeof STATUSES)[number];
export type Lead = {
  id: string; ts: string; service: string; name: string; email: string; phone: string;
  company: string; city: string; locations?: string; budget?: string; message: string;
  details?: Record<string, string | string[]>; priority: boolean; gbpEmail?: string; gbpUrl?: string; kind?: "enquiry" | "gbp-connect"; accessGranted?: boolean; source: string; status: Status; notes: string;
};

const FILE = path.join(DATA_DIR, "leads.json");

export async function listLeads(): Promise<Lead[]> {
  try { return JSON.parse(await readFile(FILE, "utf8")) as Lead[]; } catch { return []; }
}
async function save(all: Lead[]) {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(all, null, 2));
}
export async function addLead(l: Omit<Lead, "id" | "ts" | "status" | "notes" | "accessGranted">): Promise<Lead> {
  const lead: Lead = { ...l, id: randomUUID(), ts: new Date().toISOString(), status: "new", notes: "" };
  await save([lead, ...(await listLeads())]);
  return lead;
}
export async function updateLead(id: string, patch: Partial<Pick<Lead, "status" | "notes" | "accessGranted">>) {
  const all = await listLeads();
  const i = all.findIndex((x) => x.id === id);
  if (i >= 0) { all[i] = { ...all[i], ...patch }; await save(all); }
}
