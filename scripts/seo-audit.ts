/**
 * Crawl-based SEO audit. Run against a built, running server:
 *
 *   npm run build && npm start &        # (set NEXT_PUBLIC_SITE_URL to the production origin when building)
 *   npm run seo:check                    # BASE=http://localhost:3000 by default
 *
 * Exits 1 if any ERROR is found. WARNs don't fail the run.
 * Every sitemap URL is fetched from BASE (origin swapped) and checked against the rules below.
 */
import * as cheerio from "cheerio";

const BASE = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const TITLE_MAX = 60, TITLE_MIN = 20, DESC_MAX = 160, DESC_MIN = 70;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const BAD_ANCHORS = new Set(["click here", "here", "read more", "learn more", "more", "link"]);

type Issue = { level: "ERROR" | "WARN"; url: string; rule: string; detail: string };
const issues: Issue[] = [];
const add = (level: Issue["level"], url: string, rule: string, detail = "") => issues.push({ level, url, rule, detail });

const swap = (u: string) => { const x = new URL(u); return BASE + x.pathname + x.search; };
const pathOf = (u: string) => new URL(u, BASE).pathname;

async function get(url: string, init: RequestInit = {}) {
  return fetch(url, { redirect: "manual", ...init });
}

function shingles(text: string, n = 5): Set<string> {
  const w = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const s = new Set<string>();
  for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(" "));
  return s;
}
const jaccard = (a: Set<string>, b: Set<string>) => {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
};

async function main() {
  console.log(`SEO audit → ${BASE}\n`);

  // ───────── robots.txt + sitemap ─────────
  const robotsRes = await get(`${BASE}/robots.txt`);
  const robots = await robotsRes.text();
  if (robotsRes.status !== 200) add("ERROR", "/robots.txt", "robots-missing", String(robotsRes.status));
  if (!/^sitemap:\s*\S+/im.test(robots)) add("ERROR", "/robots.txt", "robots-no-sitemap", "robots.txt must reference the sitemap");
  if (/^disallow:\s*\/\s*$/im.test(robots)) add("ERROR", "/robots.txt", "robots-blocks-all", "site is blocking all crawlers (staging flag on?)");

  const smRes = await get(`${BASE}/sitemap.xml`);
  const sm = cheerio.load(await smRes.text(), { xmlMode: true });
  const sitemapUrls = sm("url > loc").map((_, e) => sm(e).text().trim()).get();
  if (!sitemapUrls.length) { add("ERROR", "/sitemap.xml", "sitemap-empty"); return report(); }
  if (new Set(sitemapUrls).size !== sitemapUrls.length) add("ERROR", "/sitemap.xml", "sitemap-duplicates");
  if (sitemapUrls.length > 50000) add("ERROR", "/sitemap.xml", "sitemap-too-large", "split into a sitemap index");

  const inSitemap = new Set(sitemapUrls.map(pathOf));
  const titles = new Map<string, string[]>();
  const descs = new Map<string, string[]>();
  const inbound = new Map<string, Set<string>>();
  const linkTargets = new Map<string, string>(); // target path → first source
  const bodies = new Map<string, Set<string>>();
  const siteWide = new Set<string>(); // links in header/footer of the home page (present on every page)

  // ───────── per-page checks ─────────
  for (const loc of sitemapUrls) {
    const path = pathOf(loc);
    const res = await get(swap(loc));
    if (res.status !== 200) { add("ERROR", path, "status", `HTTP ${res.status}`); continue; }
    const html = await res.text();
    const $ = cheerio.load(html);

    // URL / slug hygiene
    if (path !== "/" && path.endsWith("/")) add("ERROR", path, "url-trailing-slash");
    for (const seg of path.split("/").filter(Boolean)) if (!SLUG.test(seg)) add("ERROR", path, "slug-format", `segment "${seg}" must be lowercase-hyphenated`);
    if (path.split("/").filter(Boolean).length > 4) add("WARN", path, "url-depth", "more than 4 levels deep");
    if (new URL(loc).search) add("ERROR", path, "sitemap-has-query-string");

    // <html lang>, viewport, charset
    if (!$("html").attr("lang")) add("ERROR", path, "html-lang");
    if (!$('meta[name="viewport"]').length) add("ERROR", path, "viewport");

    // title
    const title = $("head > title").first().text().trim();
    if (!title) add("ERROR", path, "title-missing");
    else {
      if (title.length > TITLE_MAX) add("ERROR", path, "title-too-long", `${title.length} chars: "${title}"`);
      if (title.length < TITLE_MIN) add("WARN", path, "title-too-short", `${title.length} chars`);
      titles.set(title, [...(titles.get(title) ?? []), path]);
    }

    // meta description
    const desc = ($('meta[name="description"]').attr("content") ?? "").trim();
    if (!desc) add("ERROR", path, "description-missing");
    else {
      if (desc.length > DESC_MAX) add("ERROR", path, "description-too-long", `${desc.length} chars`);
      if (desc.length < DESC_MIN) add("WARN", path, "description-too-short", `${desc.length} chars`);
      descs.set(desc, [...(descs.get(desc) ?? []), path]);
    }

    // canonical (self-referencing, absolute, matches sitemap)
    const canonicals = $('link[rel="canonical"]').map((_, e) => $(e).attr("href")).get();
    if (canonicals.length !== 1) add("ERROR", path, "canonical-count", `found ${canonicals.length}`);
    else if (canonicals[0] !== loc) add("ERROR", path, "canonical-mismatch", `${canonicals[0]} ≠ ${loc}`);

    // robots meta
    const rm = ($('meta[name="robots"]').attr("content") ?? "").toLowerCase();
    if (rm.includes("noindex")) add("ERROR", path, "noindex-in-sitemap", rm);

    // headings
    const h1s = $("h1");
    if (h1s.length !== 1) add("ERROR", path, "h1-count", `found ${h1s.length}`);
    else if (!h1s.first().text().trim()) add("ERROR", path, "h1-empty");
    let prev = 0;
    $("h1,h2,h3,h4,h5,h6").each((_, e) => {
      const lvl = Number(e.tagName[1]);
      if (prev && lvl > prev + 1) add("WARN", path, "heading-skip", `h${prev} → h${lvl}`);
      prev = lvl;
    });

    // Open Graph / Twitter
    for (const p of ["og:title", "og:description", "og:url", "og:type", "og:site_name"])
      if (!$(`meta[property="${p}"]`).attr("content")) add("ERROR", path, "og-missing", p);
    if ($('meta[property="og:url"]').attr("content") !== loc) add("ERROR", path, "og-url-mismatch");
    if (!$('meta[name="twitter:card"]').attr("content")) add("ERROR", path, "twitter-card-missing");
    if (!$('meta[property="og:image"]').attr("content")) add("ERROR", path, "og-image-missing");

    // JSON-LD
    const types: string[] = [];
    $('script[type="application/ld+json"]').each((_, e) => {
      try {
        const j = JSON.parse($(e).text());
        for (const item of Array.isArray(j) ? j : [j]) types.push(item["@type"]);
      } catch { add("ERROR", path, "jsonld-invalid-json"); }
    });
    if (path !== "/" && !types.includes("BreadcrumbList")) add("ERROR", path, "jsonld-breadcrumb-missing");
    if (path === "/" && !(types.includes("Organization") && types.includes("WebSite"))) add("ERROR", path, "jsonld-home-org-website");
    if ($("main details summary").length && !types.includes("FAQPage")) add("ERROR", path, "faq-markup-without-schema");
    if (path.startsWith("/blog/") && !types.includes("Article")) add("ERROR", path, "jsonld-article-missing");

    // images
    $("img").each((_, e) => { if ($(e).attr("alt") === undefined) add("ERROR", path, "img-alt-missing", $(e).attr("src") ?? ""); });

    // thin content (visible text, minus nav/footer)
    const $main = cheerio.load($("main").html() ?? "");
    const text = $main.text().replace(/\s+/g, " ").trim();
    const words = text.split(" ").filter(Boolean).length;
    if (words < 250) add("WARN", path, "thin-content", `${words} words in <main>`);
    bodies.set(path, shingles(text));

    if (path === "/") $("header a[href], footer a[href], nav a[href]").each((_, e) => { const h = $(e).attr("href")!; if (h.startsWith("/")) siteWide.add(new URL(h, loc).pathname); });

    // links
    let internalOut = 0;
    $("main a[href]").each((_, e) => {
      const href = $(e).attr("href")!;
      const label = $(e).text().replace(/\s+/g, " ").trim();
      if (/^(mailto:|tel:|#)/.test(href)) return;
      const url = new URL(href, loc);
      if (url.origin !== new URL(loc).origin) {
        if (!/noopener|nofollow/.test($(e).attr("rel") ?? "") && $(e).attr("target") === "_blank") add("WARN", path, "external-blank-no-noopener", href);
        return;
      }
      internalOut++;
      if (!label && !$(e).attr("aria-label")) add("ERROR", path, "link-empty-anchor", href);
      if (BAD_ANCHORS.has(label.toLowerCase())) add("WARN", path, "link-generic-anchor", `"${label}" → ${href}`);
      const target = url.pathname;
      if (target !== path) {
        (inbound.get(target) ?? inbound.set(target, new Set()).get(target)!).add(path);
        if (!linkTargets.has(target)) linkTargets.set(target, path);
      }
    });
    if (path !== "/" && internalOut < 2) add("WARN", path, "few-internal-links", `${internalOut} contextual links`);
  }

  // ───────── cross-page checks ─────────
  for (const [t, ps] of titles) if (ps.length > 1) add("ERROR", ps.join(", "), "title-duplicate", t);
  for (const [d, ps] of descs) if (ps.length > 1) add("ERROR", ps.join(", "), "description-duplicate", d.slice(0, 60) + "…");

  // orphans: in sitemap but no inbound link from another page (home is exempt)
  for (const p of inSitemap) if (p !== "/" && !inbound.get(p)?.size && !siteWide.has(p)) add("ERROR", p, "orphan-page", "no contextual link from any page and not in site-wide nav/footer");

  // internal links must hit indexable, canonical, sitemap URLs (or a deliberate noindex utility page)
  const utility = new Set(["/login", "/thank-you"]);
  for (const [target, src] of linkTargets) {
    if (inSitemap.has(target) || utility.has(target) || target.startsWith("/api/")) continue;
    const r = await get(BASE + target);
    if (r.status >= 300 && r.status < 400) add("ERROR", src, "link-to-redirect", `${target} → ${r.headers.get("location")} (link to the final URL)`);
    else if (r.status !== 200) add("ERROR", src, "broken-internal-link", `${target} → ${r.status}`);
    else add("WARN", src, "link-to-page-not-in-sitemap", target);
  }

  // near-duplicate content between pages (same template, different keyword only)
  const keys = [...bodies.keys()];
  for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) {
    const sim = jaccard(bodies.get(keys[i])!, bodies.get(keys[j])!);
    if (sim > 0.8) add("ERROR", `${keys[i]} ↔ ${keys[j]}`, "near-duplicate-content", `${Math.round(sim * 100)}% similar`);
    else if (sim > 0.6) add("WARN", `${keys[i]} ↔ ${keys[j]}`, "similar-content", `${Math.round(sim * 100)}% similar`);
  }

  // ───────── site-level behaviour ─────────
  const nf = await get(`${BASE}/this-page-does-not-exist-xyz`);
  if (nf.status !== 404) add("ERROR", "/404", "soft-404", `unknown URL returned ${nf.status}`);
  else if (!/noindex/i.test(await nf.text())) add("WARN", "/404", "404-not-noindex");

  const slash = await get(`${BASE}/pricing/`);
  if (![301, 308].includes(slash.status)) add("ERROR", "/pricing/", "trailing-slash-not-redirected", `HTTP ${slash.status}`);

  for (const src of ["/gmb", "/adwords", "/google-business-profile-management/features", "/ads-management/for"]) {
    const r = await get(BASE + src);
    const loc = r.headers.get("location");
    if (r.status !== 308 && r.status !== 301) add("ERROR", src, "redirect-missing", `HTTP ${r.status}`);
    else if (loc) { const t = await get(new URL(loc, BASE).toString()); if (t.status !== 200) add("ERROR", src, "redirect-target-bad", `${loc} → ${t.status}`); }
  }

  const og = await get(`${BASE}/opengraph-image`);
  if (og.status !== 200 || !(og.headers.get("content-type") ?? "").startsWith("image/")) add("ERROR", "/opengraph-image", "og-image-unreachable", `HTTP ${og.status}`);

  const home = await get(BASE);
  const sec = ["x-content-type-options", "referrer-policy"];
  for (const h of sec) if (!home.headers.get(h)) add("WARN", "/", "security-header-missing", h);
  if (home.headers.get("x-powered-by")) add("WARN", "/", "x-powered-by-exposed");

  report(sitemapUrls.length);
}

function report(pages = 0) {
  const errors = issues.filter((i) => i.level === "ERROR");
  const warns = issues.filter((i) => i.level === "WARN");
  const byRule = new Map<string, Issue[]>();
  for (const i of issues) byRule.set(`${i.level} ${i.rule}`, [...(byRule.get(`${i.level} ${i.rule}`) ?? []), i]);
  for (const [k, list] of [...byRule].sort()) {
    console.log(`\n${k}  (${list.length})`);
    for (const i of list.slice(0, 8)) console.log(`   ${i.url}${i.detail ? "  —  " + i.detail : ""}`);
    if (list.length > 8) console.log(`   … +${list.length - 8} more`);
  }
  console.log(`\n${pages} pages audited · ${errors.length} errors · ${warns.length} warnings`);
  console.log(errors.length ? "✗ FAIL" : "✓ PASS");
  process.exit(errors.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
