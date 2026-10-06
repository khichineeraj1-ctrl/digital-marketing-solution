import Link from "next/link";
import type { Author } from "@/content/authors";
import { AuthorAvatar } from "./AuthorAvatar";

export function AuthorBox({ a }: { a: Author }) {
  const first = a.bio.split(/\n{2,}/)[0];
  return (
    <aside aria-label="About the author" className="mx-auto max-w-3xl px-4 pb-6">
      <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-start">
        <AuthorAvatar a={a} size={72} />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500">{a.type === "person" ? "Written by" : "From the"}</p>
          <p className="mt-1 text-xl font-bold"><Link href={`/authors/${a.slug}`} rel="author" className="hover:underline">{a.name}</Link></p>
          <p className="text-sm text-muted">{a.role}</p>
          <p className="mt-3 text-muted">{first}</p>
          <Link href={`/authors/${a.slug}`} className="tap mt-3 inline-block font-semibold text-brand-700">View profile and all articles →</Link>
        </div>
      </div>
    </aside>
  );
}
