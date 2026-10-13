/**
 * Single source of truth for site-level metadata, used by the layout, the
 * sitemap/robots routes and the JSON-LD builders.
 */
export const SITE = {
  name: "GULABARI",
  legalName: "GULABARI Jaipur",
  tagline: "Authentic Sanganeri Hand Block Print Luxury Fashion",
  description:
    "GULABARI celebrates authentic Sanganeri hand block printed cotton, handcrafted in Jaipur. Rooted in centuries-old Chippa craft, natural botanical dyes, and contemporary luxury silhouettes.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulabari-sanganeri-fashion.vercel.app",
  locale: "en_IN",
  country: "IN",
  region: "Rajasthan",
  city: "Jaipur",
  email: "2025pietcsharshvardhan063@poornima.org",
  founder: "Harshvardhan Singh Rajawat",
  foundingYear: "2024",
  ogImage: "/images/og-gulabari.jpg",
} as const;

export const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/craft", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/artisans", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/journal", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/sustainability", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}
