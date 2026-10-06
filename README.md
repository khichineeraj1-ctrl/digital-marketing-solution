# Growth Platform — public site (SEO-first)

Marketing + acquisition site for three products: **Google Business Profile management**, **Influencer marketplace**, **Google & Meta Ads OS**.
Next.js 16 (App Router, fully static where possible) · Tailwind 4 · TypeScript. The logged-in products live elsewhere (`NEXT_PUBLIC_APP_URL`).

```bash
cp .env.example .env.local      # set NEXT_PUBLIC_SITE_URL to the production origin
npm run dev
npm run build && npm start
npm run seo:check               # crawl-audits every sitemap URL (needs the server running; BASE=http://localhost:3000)
```

## URL structure (slugs)
Lowercase, hyphenated, keyword-first, ≤ 4 levels, no IDs or query strings in indexable URLs, no trailing slash.

| Pattern | Example |
|---|---|
| `/google-business-profile-management` | hub |
| `/google-business-profile-management/features/{feature}` | `…/features/review-management` |
| `/google-business-profile-management/for/{industry}` | `…/for/clinics-and-doctors` |
| `/google-business-profile-management/in/{city}` | `…/in/mumbai` |
| `/influencer-marketplace`, `/for-brands`, `/for-influencers` | |
| `/influencer-marketplace/niches/{niche}` · `/in/{city}` | `…/niches/fashion` |
| `/ads-management/{google-ads\|meta-ads}` · `/features/{f}` · `/for/{industry}` | |
| `/blog/{slug}`, `/pricing`, `/signup` (`?role=` canonicalises to `/signup`) | |

Old/alternate URLs (`/gmb`, `/adwords`, bare `/…/features`) 301 → canonical in `next.config.ts`. **Never delete a redirect.**

## Adding content
All pages are generated from `src/content/*`. Add an entry → page, sitemap entry, footer/hub links and JSON-LD appear automatically (`src/lib/routes.ts` is the single registry). Slugs are validated at build (`assertSlugs`).
**Do not bulk-add cities/niches without unique copy** — near-identical pages are a doorway-page risk; the audit flags >80 % similarity as an error.

## What's implemented
- Per-page `<title>` (≤ 60), meta description (70–160), self-referencing absolute canonical, Open Graph + Twitter (dynamic OG image), robots meta
- JSON-LD: Organization, WebSite, SoftwareApplication, Service, BreadcrumbList, FAQPage, Article, ItemList
- `sitemap.xml` + `robots.txt` generated from the registry; staging switch `NEXT_PUBLIC_NOINDEX=1` blocks everything
- Crawlable internal linking: hub → features/industries/cities → siblings, footer, breadcrumbs, blog → product
- Semantic HTML, one H1/page, skip link, `lang="en-IN"`, no-JS FAQ (`<details>`), system fonts, static HTML (fast LCP), security headers
- Signup funnel: validated API (`/api/signup`), honeypot + rate limit, JSONL + optional webhook; `/thank-you` is noindex

## Before launch
1. Replace placeholders: brand in `src/config/site.ts`, prices in `src/content/products.ts`, `/privacy` + `/terms` text, `email`, `social`.
2. Set real `NEXT_PUBLIC_SITE_URL`, then `npm run build && npm start && npm run seo:check` — must PASS.
3. Verify the site in Google Search Console, submit `/sitemap.xml`; add GA4/Tag Manager consent-aware.
4. Replace `data/signups.jsonl` storage with your CRM (`SIGNUP_WEBHOOK_URL`) — serverless filesystems are read-only/ephemeral.
5. Expand copy: the audit warns on pages < 250 words. Real, specific content (case studies, screenshots, local data) is what ranks.

## Deploy: Railway + GoDaddy domain
See the deployment guide in the project chat / below.

1. Push to GitHub, then Railway → New Project → Deploy from GitHub repo.
2. Add a Volume mounted at `/data` and set `DATA_DIR=/data` (single replica only).
3. Set variables: `NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, `NEXT_PUBLIC_*` app URLs, `NEXT_PUBLIC_GBP_MANAGER_EMAIL`, optional webhook/WhatsApp/booking.
4. Settings → Networking → Custom Domain → `www.yourdomain.com`; add the CNAME (and TXT if shown) in GoDaddy DNS.
5. Forward the bare domain to `https://www.yourdomain.com` (or move DNS to Cloudflare for apex support).
6. `NEXT_PUBLIC_*` values are baked in at build time: change one, then redeploy.
7. After going live: `BASE=https://www.yourdomain.com npm run seo:check`, then submit `/sitemap.xml` in Search Console.
