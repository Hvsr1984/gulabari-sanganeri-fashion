import type { MetadataRoute } from "next";
import { getProducts, getJournalPosts } from "@/db/queries";
import { ROUTES, SITE, absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts(), getJournalPosts()]);
  const lastModified = new Date();

  return [
    ...ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/shop/${product.slug}`),
      lastModified: product.createdAt ?? lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/journal/${post.slug}`),
      lastModified: post.publishedAt ?? lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: absoluteUrl("/cart"),
      changeFrequency: "yearly" as const,
      priority: 0.1,
    },
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];
}
