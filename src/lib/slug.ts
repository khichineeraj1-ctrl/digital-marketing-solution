const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Lowercase, hyphen-separated, ASCII, no double hyphens, ≤ 60 chars. */
export function isValidSlug(s: string): boolean {
  return SLUG_RE.test(s) && s.length <= 60;
}

export function assertSlugs(label: string, slugs: string[]) {
  const seen = new Set<string>();
  for (const s of slugs) {
    if (!isValidSlug(s)) throw new Error(`[slug] invalid ${label} slug: "${s}"`);
    if (seen.has(s)) throw new Error(`[slug] duplicate ${label} slug: "${s}"`);
    seen.add(s);
  }
}
