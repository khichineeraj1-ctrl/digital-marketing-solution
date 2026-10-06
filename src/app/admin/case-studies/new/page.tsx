import { requireAdmin } from "@/lib/adminAuth";
import { CaseStudyForm } from "../CaseStudyForm";
export default async function Page() { await requireAdmin(); return (<><h1 className="mb-6 text-2xl font-bold">New case study</h1><CaseStudyForm /></>); }
