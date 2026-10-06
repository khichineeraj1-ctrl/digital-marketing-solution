import type { Benefit, Faq } from "./types";
import { assertSlugs } from "@/lib/slug";

export type Niche = {
  slug: string;
  name: string; // "Fashion"
  blurb: string;
  formats: string[];
  goodFor: string[];
  faq: Faq;
};

export const niches: Niche[] = [
  { slug: "fashion", name: "Fashion", blurb: "Style creators who turn looks into purchases through lookbooks, hauls and try-ons.", formats: ["Instagram Reels lookbooks", "Try-on hauls", "Festive styling stories"], goodFor: ["D2C apparel brands", "Jewellery and accessories", "Marketplace sale events"], faq: { q: "Which fashion creators suit a new apparel brand?", a: "Micro-creators with engaged, niche audiences often convert better for new brands than very large accounts. Filter by audience city, age and past brand collaborations." } },
  { slug: "beauty", name: "Beauty", blurb: "Skincare and makeup creators who build trust through tutorials and honest reviews.", formats: ["Get-ready-with-me videos", "Product reviews", "Routine breakdowns"], goodFor: ["Skincare and haircare brands", "Salon chains", "Cosmetics launches"], faq: { q: "Do beauty campaigns need disclosure?", a: "Yes. Sponsored posts must be clearly disclosed, for example with the paid-partnership label and clear wording, in line with advertising rules in India." } },
  { slug: "food", name: "Food", blurb: "Food creators who drive footfall and orders with reels, reviews and recipes.", formats: ["Restaurant visit reels", "Recipe videos", "Delivery unboxings"], goodFor: ["Restaurants and cafes", "Packaged-food brands", "Cloud kitchens"], faq: { q: "How do restaurants measure influencer campaigns?", a: "Use unique offer codes, tracked links and time-bound offers so visits and orders can be attributed to each creator." } },
  { slug: "travel", name: "Travel", blurb: "Travel storytellers who inspire bookings with itineraries and destination guides.", formats: ["Destination reels", "Itinerary carousels", "Stay reviews"], goodFor: ["Hotels and resorts", "Tour operators", "Tourism boards"], faq: { q: "Can influencers visit properties as part of a campaign?", a: "Yes. Campaigns can include hosted stays with a clear brief on deliverables, dates and disclosure." } },
  { slug: "tech", name: "Tech & Gadgets", blurb: "Reviewers and explainers who help buyers compare phones, laptops and apps.", formats: ["YouTube reviews", "Unboxing shorts", "Comparison videos"], goodFor: ["Consumer electronics", "Apps and fintech", "Accessories"], faq: { q: "Are YouTube or Instagram creators better for tech?", a: "Long-form YouTube reviews suit considered purchases, while Reels and Shorts help launches and awareness. Many brands use both." } },
  { slug: "fitness", name: "Fitness & Wellness", blurb: "Trainers and wellness creators who motivate with routines, nutrition and challenges.", formats: ["Workout reels", "Transformation stories", "Challenge series"], goodFor: ["Gyms and studios", "Supplements and apparel", "Health apps"], faq: { q: "Can supplement brands work with fitness creators?", a: "Yes, but claims must be truthful and within regulation, and sponsored content must be clearly disclosed." } },
  { slug: "parenting", name: "Parenting", blurb: "Parenting creators with high-trust communities of new and expecting parents.", formats: ["Product trials", "Day-in-the-life vlogs", "Tips carousels"], goodFor: ["Baby care and toys", "Kids' education", "Family services"], faq: { q: "What matters most when choosing parenting creators?", a: "Audience trust and comment quality matter more than follower count; review recent sponsored posts to see how the audience responds." } },
  { slug: "finance", name: "Finance & Investing", blurb: "Educators who explain money, savings and investing to a growing audience.", formats: ["Explainer videos", "Carousel breakdowns", "Webinars"], goodFor: ["Fintech apps", "Insurance and credit", "Investment platforms"], faq: { q: "Are there rules for finance influencer content?", a: "Yes. Financial promotions are regulated, and creators must not give unregistered investment advice. Brief creators on compliant claims and disclosures." } },
  { slug: "automotive", name: "Automotive", blurb: "Car and bike creators who influence showroom visits with reviews and drives.", formats: ["Test-drive reviews", "Ownership stories", "Comparison videos"], goodFor: ["Dealerships", "Car-care brands", "Accessories"], faq: { q: "Can dealerships use local automotive creators?", a: "Yes. City-level creators can drive test-drive bookings when paired with a trackable booking link or offer code." } },
  { slug: "gaming", name: "Gaming", blurb: "Streamers and gaming creators with highly engaged, younger audiences.", formats: ["Live streams", "Game walkthroughs", "Esports commentary"], goodFor: ["Gaming and app publishers", "Peripherals", "Youth brands"], faq: { q: "How should app installs be tracked from gaming creators?", a: "Use unique tracked links or deep links per creator so installs and in-app actions can be attributed." } },
];

export const forBrandsBenefits: Benefit[] = [
  { title: "Search and filter verified creators", body: "Filter by niche, city, platform, audience demographics and engagement rate." },
  { title: "Briefs, contracts and approvals", body: "Send a campaign brief, agree deliverables and approve content before it goes live." },
  { title: "Payments held until delivery", body: "Pay through the platform so creators are paid on delivery and brands are protected." },
  { title: "Performance reporting", body: "Track reach, engagement and tracked-link clicks for every creator in one report." },
];

export const forCreatorsBenefits: Benefit[] = [
  { title: "Get campaigns that match you", body: "Receive briefs from brands in your niche and city, and apply with your rates." },
  { title: "Clear briefs and fair terms", body: "See deliverables, timelines and payment up front before you accept." },
  { title: "Reliable payouts", body: "Get paid through the platform once the brand approves your content." },
  { title: "Media kit built for you", body: "Your profile doubles as a shareable media kit with stats and past work." },
];

export const influencerFaqs: Faq[] = [
  { q: "How do I join as an influencer?", a: "Create a free creator profile, connect your social accounts and pick your niche and city. Once verified you can start applying to campaigns." },
  { q: "Does it cost anything for brands to find influencers?", a: "Browsing creators is free. Brands pay for campaign management and the platform fee when a campaign is booked." },
  { q: "How are creators verified?", a: "We verify account ownership and check follower authenticity signals before a profile is listed." },
  { q: "Can I run campaigns in specific cities?", a: "Yes. Filter creators by city and audience location to run hyperlocal campaigns for stores, clinics and restaurants." },
];

assertSlugs("niche", niches.map((n) => n.slug));
export const getNiche = (slug: string) => niches.find((n) => n.slug === slug);
