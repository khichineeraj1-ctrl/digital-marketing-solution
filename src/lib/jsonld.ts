import { site } from "@/config/site";
import { absoluteUrl } from "./seo";

export type Crumb = { name: string; path: string };
export type Faq = { q: string; a: string };

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: site.address.country },
  ...(site.social.length ? { sameAs: site.social } : {}),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}#website`,
  url: site.url,
  name: site.name,
  inLanguage: site.locale,
  publisher: { "@id": `${site.url}#organization` },
});

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const softwareLd = (o: { name: string; description: string; path: string; fromPrice?: number }) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: o.name,
  description: o.description,
  url: absoluteUrl(o.path),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  publisher: { "@id": `${site.url}#organization` },
  ...(o.fromPrice !== undefined
    ? { offers: { "@type": "Offer", price: String(o.fromPrice), priceCurrency: site.currency } }
    : {}),
});

export const serviceLd = (o: { name: string; description: string; path: string; area?: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: o.name,
  description: o.description,
  url: absoluteUrl(o.path),
  provider: { "@id": `${site.url}#organization` },
  areaServed: o.area ? { "@type": "City", name: o.area } : { "@type": "Country", name: "India" },
});

export type AuthorLd = { name: string; path?: string; type: "person" | "organization"; jobTitle?: string; sameAs?: string[] };

export const authorLd = (a: AuthorLd) => ({
  "@type": a.type === "person" ? "Person" : "Organization",
  name: a.name,
  ...(a.path ? { url: absoluteUrl(a.path) } : {}),
  ...(a.jobTitle && a.type === "person" ? { jobTitle: a.jobTitle } : {}),
  ...(a.sameAs?.length ? { sameAs: a.sameAs } : {}),
});

export const profilePageLd = (o: { name: string; path: string; type: "person" | "organization"; jobTitle?: string; description: string; image?: string; sameAs?: string[]; knowsAbout?: string[]; modified: string; published: string }) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateCreated: o.published,
  dateModified: o.modified,
  mainEntity: {
    "@type": o.type === "person" ? "Person" : "Organization",
    "@id": `${absoluteUrl(o.path)}#${o.type === "person" ? "person" : "org"}`,
    name: o.name,
    url: absoluteUrl(o.path),
    description: o.description,
    ...(o.image ? { image: o.image } : {}),
    ...(o.jobTitle && o.type === "person" ? { jobTitle: o.jobTitle, worksFor: { "@id": `${site.url}#organization` } } : {}),
    ...(o.sameAs?.length ? { sameAs: o.sameAs } : {}),
    ...(o.knowsAbout?.length ? { knowsAbout: o.knowsAbout } : {}),
  },
});

export const articleLd = (o: { title: string; description: string; path: string; published: string; modified: string; author: string | AuthorLd }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: o.title,
  description: o.description,
  mainEntityOfPage: absoluteUrl(o.path),
  datePublished: o.published,
  dateModified: o.modified,
  author: typeof o.author === "string" ? { "@type": "Organization", name: o.author } : authorLd(o.author),
  publisher: { "@id": `${site.url}#organization` },
  image: [`${site.url}/opengraph-image`],
});
