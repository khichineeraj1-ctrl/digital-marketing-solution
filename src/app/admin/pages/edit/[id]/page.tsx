import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getCustomPageById } from "@/lib/customPages";
import { PageForm } from "../../PageForm";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const p = await getCustomPageById((await params).id);
  if (!p) notFound();
  return (<><h1 className="mb-6 text-2xl font-bold">Edit page</h1><PageForm page={p} /></>);
}
