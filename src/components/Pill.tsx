import Link from "next/link";

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17 17 7M8 7h9v9" /></svg>
);

const isExternal = (h: string) => /^https?:\/\//.test(h);
// Product apps live on other domains: open them normally, don't pass SEO equity to login/app pages.
const ext = { target: "_blank", rel: "noopener nofollow" } as const;

export function Pill({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  if (!href) return null;
  const inner = <>{children}<span className="pill-arrow"><Arrow /></span></>;
  return isExternal(href)
    ? <a href={href} className={`pill ${className}`} {...ext}>{inner}</a>
    : <Link href={href} className={`pill ${className}`}>{inner}</Link>;
}
export function PillGhost({ href, children }: { href: string; children: React.ReactNode }) {
  if (!href) return null;
  return isExternal(href)
    ? <a href={href} className="pill-ghost" {...ext}>{children}<span aria-hidden className="ml-2">↗</span></a>
    : <Link href={href} className="pill-ghost">{children}</Link>;
}
