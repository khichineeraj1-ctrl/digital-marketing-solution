export type Author = {
  slug: string;
  type: "person" | "organization";
  name: string;
  role: string; // job title (person) or descriptor (organisation)
  bio: string; // plain paragraphs separated by blank lines
  expertise: string[];
  credentials: string[]; // verifiable facts: years, certifications, past roles
  photoUrl: string; // optional absolute URL; initials avatar is used when empty
  links: { linkedin: string; x: string; website: string };
  status: "draft" | "published";
  sample: boolean; // illustrative profile: noindex, not in sitemap, never used as a byline
  published: string;
  modified: string;
};

/**
 * The default byline is the organisation. Replace it with real, named experts via /admin/authors:
 * Google's guidance rewards content that shows who wrote it and why they are qualified.
 */
export const seedAuthors: Author[] = [
  {
    slug: "editorial-team", type: "organization", name: "Editorial Team", role: "Strategists and specialists across SEO, local search, influencer and paid media",
    bio: "Our editorial team brings together practitioners from SEO, Google Business Profile management, influencer marketing and paid media.\n\nArticles are drafted by the people who do this work and edited for accuracy and clarity before they are published. We update guides when platforms or policies change.",
    expertise: ["SEO", "Local SEO", "Google Business Profile", "Influencer marketing", "Google Ads", "Meta Ads"], credentials: [],
    photoUrl: "", links: { linkedin: "", x: "", website: "" }, status: "published", sample: false, published: "2026-09-01", modified: "2026-10-01",
  },
  {
    slug: "sample-author", type: "person", name: "Sample Author", role: "Head of SEO (sample profile)",
    bio: "This is a sample profile that shows how a named expert appears on the site. Replace it with a real person: their background, what they have actually done, and why readers should trust their advice on the topics they write about.\n\nGood author bios are specific. They mention years of hands-on experience, the kinds of businesses worked with, and any certifications or talks that can be verified.",
    expertise: ["Technical SEO", "Content strategy"], credentials: ["10+ years in search marketing (sample)", "Speaker at industry events (sample)"],
    photoUrl: "", links: { linkedin: "https://www.linkedin.com/", x: "", website: "" }, status: "published", sample: true, published: "2026-09-01", modified: "2026-10-01",
  },
];
