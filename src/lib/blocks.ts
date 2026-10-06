import type { CustomBlock, CustomPage } from "@/content/customPages";

export const lines = (t: string) => t.split("\n").map((l) => l.trim()).filter(Boolean);
export const pairs = (t: string) => lines(t).map((l) => { const i = l.indexOf("|"); return i < 0 ? [l, ""] as const : [l.slice(0, i).trim(), l.slice(i + 1).trim()] as const; });
export const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

export function pageWords(p: Pick<CustomPage, "lead" | "blocks">): number {
  return words(p.lead) + p.blocks.reduce((n, b) => n + (b.type === "cta" || b.type === "cases" ? 0 : words(`${b.heading} ${b.text.replace(/\|/g, " ")}`)), 0);
}
export const internalLinkCount = (blocks: CustomBlock[]) =>
  blocks.reduce((n, b) => n + (b.type === "links" ? pairs(b.text).filter(([, p]) => p.startsWith("/")).length : 0) + (b.type === "richtext" ? (b.text.match(/\]\(\//g) ?? []).length : 0), 0);
