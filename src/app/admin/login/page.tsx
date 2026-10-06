import { redirect } from "next/navigation";
import { checkPassword, startSession, isAdmin } from "@/lib/adminAuth";

async function login(formData: FormData) {
  "use server";
  if (checkPassword(String(formData.get("password") ?? ""))) {
    await startSession();
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-8">
      <h1 className="text-2xl font-bold">Admin login</h1>
      <form action={login} className="mt-6 space-y-4">
        <label htmlFor="password" className="font-medium">Password</label>
        <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        {error && <p role="alert" className="text-sm text-red-700">Incorrect password.</p>}
        <button className="w-full rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Sign in</button>
      </form>
    </div>
  );
}
