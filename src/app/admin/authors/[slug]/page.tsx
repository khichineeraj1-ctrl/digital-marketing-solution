import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getAuthor } from "@/lib/authors";
import { AuthorForm } from "../AuthorForm";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const a = await getAuthor((await params).slug);
  if (!a) notFound();
  return (<><h1 className="mb-6 text-2xl font-bold">Edit author</h1><AuthorForm a={a} /></>);
}
