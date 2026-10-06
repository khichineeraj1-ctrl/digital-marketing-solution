import { notFound } from "next/navigation";
import { getPublishedAuthors } from "@/lib/authors";
import { requireAdmin } from "@/lib/adminAuth";
import { getPost } from "@/lib/posts";
import { PostForm } from "../PostForm";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const authors = (await getPublishedAuthors()).map((a) => ({ slug: a.slug, name: a.name, role: a.role }));
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return (<><h1 className="mb-6 text-2xl font-bold">Edit post</h1><PostForm post={post} authors={authors} /></>);
}
