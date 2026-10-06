"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Item = { label: string; path: string; desc?: string };
type Ext = { label: string; desc?: string; href: string };

/** Hamburger + slide-down panel. The panel stays in the DOM (visibility only) so links remain crawlable. */
export function MobileNav({ menus, logins, joins }: { menus: { label: string; items: Item[] }[]; logins: Ext[]; joins: Ext[] }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>("Products");
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  const row = "block rounded-xl px-3 py-3 active:bg-brand-50";
  return (
    <div className="lg:hidden">
      <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-panel" onClick={() => setOpen(!open)}
        className="grid h-11 w-11 place-items-center rounded-full border border-brand-700/25 bg-white text-brand-700">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* backdrop */}
      <div onClick={() => setOpen(false)} aria-hidden className={`fixed inset-x-0 bottom-0 top-[4.5rem] z-30 bg-brand-700/30 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />

      <nav id="mobile-panel" aria-label="Mobile"
        className={`fixed inset-x-3 top-[5rem] z-40 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl transition-all duration-200 ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
        {menus.map((m) => {
          const expanded = section === m.label;
          return (
            <div key={m.label} className="border-b border-slate-100 last:border-0">
              <button type="button" onClick={() => setSection(expanded ? null : m.label)} aria-expanded={expanded}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-lg font-semibold">
                {m.label}
                <svg className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <ul className={`overflow-hidden transition-all ${expanded ? "max-h-[40rem] pb-2" : "max-h-0"}`} aria-hidden={!expanded}>
                {m.items.map((it) => (
                  <li key={it.path}>
                    <Link href={it.path} tabIndex={expanded ? 0 : -1} className={row}>
                      <span className="font-medium">{it.label}</span>
                      {it.desc && <span className="block text-sm text-muted">{it.desc}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <Link href="/case-studies" className="block border-b border-slate-100 px-3 py-3.5 text-lg font-semibold">Client Successes</Link>
        <Link href="/pricing" className="block border-b border-slate-100 px-3 py-3.5 text-lg font-semibold">Pricing</Link>

        <div className="mt-3 rounded-2xl bg-brand-50 p-3">
          <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted">Log in</p>
          {logins.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noopener nofollow" className={row}><span className="font-medium">{l.label} ↗</span>{l.desc && <span className="block text-sm text-muted">{l.desc}</span>}</a>)}
          <div className="mt-1 grid grid-cols-2 gap-2">
            {joins.map((j) => <a key={j.label} href={j.href} target="_blank" rel="noopener nofollow" className="rounded-xl bg-white px-3 py-2.5 text-center text-sm font-semibold text-brand-700">{j.label} ↗</a>)}
          </div>
          <Link href="/google-business-profile-management/get-started" className="mt-2 block px-1 text-sm text-muted"><b className="text-ink">Business Profile?</b> No login — share access →</Link>
        </div>
        <Link href="/contact" className="mt-3 block rounded-full bg-brand-700 px-6 py-3.5 text-center text-lg font-semibold text-white">Book a call</Link>
      </nav>
    </div>
  );
}
