import { getPublishedAuthors } from "@/lib/authors";
import { requireAdmin } from "@/lib/adminAuth";
import { PostForm } from "../PostForm";

export default async function Page() {
  await requireAdmin();
  const authors = (await getPublishedAuthors()).map((a) => ({ slug: a.slug, name: a.name, role: a.role }));
  return (<><h1 className="mb-6 text-2xl font-bold">New post</h1><PostForm authors={authors} /></>);
}
