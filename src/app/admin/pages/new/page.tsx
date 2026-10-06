import { requireAdmin } from "@/lib/adminAuth";
import { PageForm } from "../PageForm";
export default async function Page() { await requireAdmin(); return (<><h1 className="mb-6 text-2xl font-bold">New page</h1><PageForm /></>); }
