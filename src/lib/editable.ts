import { allRoutes } from "@/lib/routes";
import { getAllCustomPages } from "@/lib/customPages";

/** Built-in pages an admin can edit: everything in the sitemap except custom pages and detail pages that have their own editor. */
export async function editablePaths(): Promise<string[]> {
  const custom = new Set((await getAllCustomPages()).map((c) => `/${c.path}`));
  return (await allRoutes())
    .map((r) => r.path)
    .filter((p) => !custom.has(p) && !/^\/(blog|case-studies|authors)\/[^/]+$/.test(p));
}
