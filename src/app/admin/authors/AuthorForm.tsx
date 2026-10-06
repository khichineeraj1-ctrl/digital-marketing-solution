"use client";
import { useActionState, useState } from "react";
import { saveAuthorAction, type FormState } from "./actions";
import type { Author } from "@/content/authors";
import { slugify } from "@/lib/slug";

const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2";

export function AuthorForm({ a }: { a?: Author }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveAuthorAction, {});
  const [name, setName] = useState(a?.name ?? "");
  const [slug, setSlug] = useState(a?.slug ?? "");
  const [touched, setTouched] = useState(!!a);
  const [type, setType] = useState<string>(a?.type ?? "person");
  const [sample, setSample] = useState(a?.sample ?? false);
  const [f, setF] = useState({ role: a?.role ?? "", bio: a?.bio ?? "", expertise: a?.expertise.join(", ") ?? "", credentials: a?.credentials.join("\n") ?? "", photoUrl: a?.photoUrl ?? "", linkedin: a?.links.linkedin ?? "", x: a?.links.x ?? "", website: a?.links.website ?? "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));
  const locked = a?.status === "published" && !a.sample;
  const err = (k: string) => state.errors?.[k] && <p role="alert" className="mt-1 text-sm text-red-700">{state.errors[k]}</p>;
  const bioWords = f.bio.split(/\s+/).filter(Boolean).length;

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="originalSlug" value={a?.slug ?? ""} />
      {state.message && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{state.message}</p>}

      <div className="grid gap-5 md:grid-cols-2">
        <div><label className="font-medium" htmlFor="name">Name</label>
          <input id="name" name="name" value={name} className={field} onChange={(e) => { setName(e.target.value); if (!touched) setSlug(slugify(e.target.value).slice(0, 60)); }} />{err("name")}</div>
        <div><label className="font-medium" htmlFor="type">Type</label>
          <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)} className={field}><option value="person">Person (named expert)</option><option value="organization">Organisation / team</option></select></div>
      </div>
      <div>
        <label className="font-medium" htmlFor="slug">URL slug</label>
        <div className="flex items-center gap-2 text-sm text-muted">/authors/<input id="slug" name="slug" value={slug} readOnly={locked} className={`${field} !mt-0 ${locked ? "bg-slate-100" : ""}`} onChange={(e) => { setTouched(true); setSlug(slugify(e.target.value)); }} /></div>
        {locked && <p className="mt-1 text-xs text-muted">Locked: this profile is live.</p>}{err("slug")}
      </div>
      <div><label className="font-medium" htmlFor="role">Job title / descriptor</label><input id="role" name="role" value={f.role} onChange={set("role")} placeholder="Head of SEO" className={field} />{err("role")}</div>
      <div>
        <div className="flex justify-between"><label className="font-medium" htmlFor="bio">Bio</label><span className={`text-xs ${bioWords >= 40 ? "text-green-700" : "text-amber-700"}`}>{bioWords} words (min 40)</span></div>
        <textarea id="bio" name="bio" rows={6} value={f.bio} onChange={set("bio")} className={field} />{err("bio")}
        <p className="mt-1 text-xs text-muted">First-hand experience beats adjectives: years in the field, types of clients, notable work. Separate paragraphs with a blank line.</p>
      </div>
      <div><label className="font-medium" htmlFor="expertise">Areas of expertise (comma-separated)</label><input id="expertise" name="expertise" value={f.expertise} onChange={set("expertise")} placeholder="Technical SEO, Local SEO" className={field} />{err("expertise")}</div>
      <div><label className="font-medium" htmlFor="credentials">Experience and credentials (one per line, must be verifiable)</label><textarea id="credentials" name="credentials" rows={4} value={f.credentials} onChange={set("credentials")} className={field} />{err("credentials")}</div>
      <div className="grid gap-5 md:grid-cols-3">
        <div><label className="font-medium" htmlFor="linkedin">LinkedIn URL</label><input id="linkedin" name="linkedin" value={f.linkedin} onChange={set("linkedin")} className={field} />{err("linkedin")}</div>
        <div><label className="font-medium" htmlFor="x">X / Twitter URL</label><input id="x" name="x" value={f.x} onChange={set("x")} className={field} />{err("x")}</div>
        <div><label className="font-medium" htmlFor="website">Website URL</label><input id="website" name="website" value={f.website} onChange={set("website")} className={field} />{err("website")}</div>
      </div>
      <div><label className="font-medium" htmlFor="photoUrl">Photo URL (optional)</label><input id="photoUrl" name="photoUrl" value={f.photoUrl} onChange={set("photoUrl")} placeholder="https://…/photo.jpg — an initials avatar is used if empty" className={field} />{err("photoUrl")}</div>

      <label className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm">
        <input type="checkbox" name="sample" checked={sample} onChange={(e) => setSample(e.target.checked)} className="mt-1" />
        <span><b>Sample / illustrative profile.</b> Hidden from Google and the sitemap, and never used as a byline. Untick only for a real person.{err("sample")}</span>
      </label>

      <div className="flex flex-wrap gap-3">
        <button name="intent" value="publish" disabled={pending} className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-500 disabled:opacity-60">{a?.status === "published" ? "Update" : "Publish"}</button>
        <button name="intent" value="draft" disabled={pending} className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">Save draft</button>
        {a?.status === "published" && <button name="intent" value="unpublish" disabled={pending} className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">Unpublish</button>}
      </div>
    </form>
  );
}
