import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd, type Crumb } from "@/lib/jsonld";

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pb-1 pt-3 text-xs text-muted sm:pt-5 sm:text-sm">
      <ol className="flex min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          // on phones keep only Home + current page visible so the row never wraps or crowds the header
          return (
            <li key={c.path} className={`flex min-w-0 items-center gap-1.5 ${!last && i > 0 ? "hidden sm:flex" : ""}`}>
              {i > 0 && <span aria-hidden className="text-slate-400">/</span>}
              {last ? <span aria-current="page" className="truncate font-medium text-ink">{c.name}</span>
                : <Link href={c.path} className="tap shrink-0 hover:underline">{c.name}</Link>}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbLd(all)} />
    </nav>
  );
}
