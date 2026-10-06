import type { Author } from "@/content/authors";

const GRADS = ["linear-gradient(135deg,#0b0b45,#4545e0)", "linear-gradient(135deg,#0b3b45,#2bb5a0)", "linear-gradient(135deg,#2a1068,#c04fd8)", "linear-gradient(135deg,#0b0b45,#7ab800)"];
const hash = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);

export function AuthorAvatar({ a, size = 56 }: { a: Pick<Author, "name" | "photoUrl" | "slug">; size?: number }) {
  const initials = a.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  if (a.photoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={a.photoUrl} alt={a.name} width={size} height={size} loading="lazy" className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />;
  }
  return <span aria-hidden className="grid shrink-0 place-items-center rounded-full font-bold text-white" style={{ width: size, height: size, background: GRADS[hash(a.slug) % GRADS.length], fontSize: size * 0.36 }}>{initials}</span>;
}
