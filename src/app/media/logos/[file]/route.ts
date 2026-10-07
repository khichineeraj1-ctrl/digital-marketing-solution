import { readLogo } from "@/lib/logos";

// Client logos uploaded in the admin. File names include a content hash, so they can be cached forever.
export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const logo = await readLogo((await params).file);
  if (!logo) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(logo.data), { headers: { "Content-Type": logo.type, "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
}
