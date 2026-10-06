import { requireAdmin } from "@/lib/adminAuth";
import { AuthorForm } from "../AuthorForm";
export default async function Page() { await requireAdmin(); return (<><h1 className="mb-6 text-2xl font-bold">New author</h1><AuthorForm /></>); }
