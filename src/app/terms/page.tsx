import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { mdToBlocks } from "@/lib/posts";
import legal from "@/content/legal.json";

const doc = legal.terms;
export const metadata = buildMetadata({ title: "Terms of Service", description: doc.description.length > 160 ? `${doc.description.slice(0, 157)}…` : doc.description, path: "/terms" });

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Terms of Service", path: "/terms" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-4xl font-bold tracking-tight">{doc.title}</h1>
        <div className="mt-8 space-y-4 text-lg leading-relaxed">
          {mdToBlocks(doc.bodyMd).map((b, i) =>
            "items" in b ? <ul key={i} className="list-disc space-y-2 pl-6 text-muted">{b.items.map((x) => <li key={x}>{x}</li>)}</ul>
            : b.t === "h2" ? <h2 key={i} className="pt-4 text-2xl font-bold">{b.text}</h2>
            : b.t === "h3" ? <h3 key={i} className="pt-2 text-xl font-bold">{b.text}</h3>
            : <p key={i} className="text-muted">{b.text}</p>)}
        </div>
      </article>
    </>
  );
}
