"use client";
import { useActionState, useState } from "react";
import { savePostAction, type FormState } from "./actions";
import { CATEGORIES } from "@/content/blog";
import type { Post } from "@/lib/posts";
import { slugify } from "@/lib/slug";

const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2";

function Counter({ n, min, max }: { n: number; min: number; max: number }) {
  const ok = n >= min && n <= max;
  return <span className={`text-xs ${ok ? "text-green-700" : "text-amber-700"}`}>{n} / {min}–{max}</span>;
}

export function PostForm({ post, authors }: { post?: Post; authors: { slug: string; name: string; role: string }[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePostAction, {});
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle ?? "");
  const [desc, setDesc] = useState(post?.description ?? "");
  const [body, setBody] = useState(post?.bodyMd ?? "");
  const [category, setCategory] = useState<string>(post?.category ?? CATEGORIES[0]);
  const [author, setAuthor] = useState(post?.authorSlug ?? authors.find((a) => a.name === post?.author)?.slug ?? "editorial-team");
  const [related, setRelated] = useState(post?.related.map((r) => `${r.label} | ${r.path}`).join("\n") ?? "");
  const locked = post?.status === "published";
  const words = body.split(/\s+/).filter(Boolean).length;
  const err = (k: string) => state.errors?.[k] && <p role="alert" className="mt-1 text-sm text-red-700">{state.errors[k]}</p>;

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="originalSlug" value={post?.slug ?? ""} />
      {state.message && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{state.message}</p>}

      <div>
        <label className="font-medium" htmlFor="title">Title (H1)</label>
        <input id="title" name="title" value={title} className={field} required
          onChange={(e) => { setTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value).slice(0, 60)); }} />
        {err("title")}
      </div>

      <div>
        <label className="font-medium" htmlFor="slug">URL slug</label>
        <div className="flex items-center gap-2 text-sm text-muted">/blog/
          <input id="slug" name="slug" value={slug} readOnly={locked} className={`${field} !mt-0 ${locked ? "bg-slate-100" : ""}`}
            onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }} />
        </div>
        {locked && <p className="mt-1 text-xs text-muted">Locked: this post is live, and changing a published URL would break links and rankings.</p>}
        {err("slug")}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="font-medium" htmlFor="category">Category</label>
          <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} className={field}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          {err("category")}
        </div>
        <div>
          <label className="font-medium" htmlFor="authorSlug">Author</label>
          <select id="authorSlug" name="authorSlug" value={author} onChange={(e) => setAuthor(e.target.value)} className={field}>{authors.map((a) => <option key={a.slug} value={a.slug}>{a.name} — {a.role}</option>)}</select>
          <p className="mt-1 text-xs text-muted">Named experts with a profile build trust. <a href="/admin/authors" className="underline">Manage authors</a></p>
        </div>
      </div>

      <div>
        <div className="flex justify-between"><label className="font-medium" htmlFor="metaTitle">SEO title</label><Counter n={metaTitle.length || title.length} min={20} max={60} /></div>
        <input id="metaTitle" name="metaTitle" value={metaTitle} placeholder={title} onChange={(e) => setMetaTitle(e.target.value)} className={field} />
        {err("metaTitle")}
      </div>
      <div>
        <div className="flex justify-between"><label className="font-medium" htmlFor="description">Meta description</label><Counter n={desc.length} min={70} max={160} /></div>
        <textarea id="description" name="description" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} className={field} />
        {err("description")}
      </div>

      <div>
        <div className="flex justify-between"><label className="font-medium" htmlFor="bodyMd">Content</label><span className={`text-xs ${words >= 150 ? "text-green-700" : "text-amber-700"}`}>{words} words (min 150 to publish)</span></div>
        <textarea id="bodyMd" name="bodyMd" rows={18} value={body} onChange={(e) => setBody(e.target.value)} className={`${field} font-mono text-sm`} />
        <p className="mt-1 text-xs text-muted">Format: <code>## Heading</code> for sections · blank line between paragraphs · lines starting with <code>- </code> for bullet lists. The page title is the H1, so start sections at ##.</p>
        {err("bodyMd")}
      </div>

      <div>
        <label className="font-medium" htmlFor="related">Internal links (one per line: <code>Label | /path</code>)</label>
        <textarea id="related" name="related" rows={3} value={related} onChange={(e) => setRelated(e.target.value)} className={`${field} font-mono text-sm`} placeholder="Google review management software | /google-business-profile-management/features/review-management" />
        <p className="mt-1 text-xs text-muted">Link every post to the relevant product page — this is what turns blog traffic into enquiries.</p>
        {err("related")}
      </div>

      <div className="flex flex-wrap gap-3">
        <button name="intent" value="publish" disabled={pending} className="rounded-lg bg-brand-600 px-5 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">{locked ? "Update published post" : "Publish"}</button>
        {!locked && <button name="intent" value="draft" disabled={pending} className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">Save draft</button>}
        {locked && <button name="intent" value="unpublish" disabled={pending} className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold">Unpublish (to draft)</button>}
      </div>
    </form>
  );
}
