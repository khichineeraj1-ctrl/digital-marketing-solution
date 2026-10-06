import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getCaseStudy } from "@/lib/caseStudies";
import { CaseStudyForm } from "../CaseStudyForm";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const c = await getCaseStudy((await params).slug);
  if (!c) notFound();
  return (<><h1 className="mb-6 text-2xl font-bold">Edit case study</h1><CaseStudyForm c={c} /></>);
}
