export type Faq = { q: string; a: string };
export type Benefit = { title: string; body: string };

export type Feature = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string; // ≤ 52 chars so brand suffix fits in 60
  metaDescription: string; // 70–160 chars
  intro: string;
  benefits: Benefit[];
  faqs: Faq[];
};

export type Industry = {
  slug: string;
  name: string; // plural, lowercase: "restaurants"
  title: string; // "Restaurants"
  searchIntent: string; // how customers find this industry
  pains: string[];
  tactics: string[];
  faq: Faq;
};
