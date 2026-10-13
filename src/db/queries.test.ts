import { describe, expect, it } from "vitest";
import {
  getArtisans,
  getFeaturedProducts,
  getJournalPost,
  getJournalPosts,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "./queries";

/**
 * With no DATABASE_URL in the test environment these exercise the seed-data
 * fallback — the path that lets the whole storefront run as a demo with zero
 * infrastructure. It is the single most important behaviour to keep green.
 */
describe("seed fallback (no database configured)", () => {
  it("returns the full catalogue with stable, typed fields", async () => {
    const products = await getProducts();
    expect(products.length).toBeGreaterThanOrEqual(8);
    for (const product of products) {
      expect(product.slug).toBeTruthy();
      expect(product.priceCents).toBeGreaterThan(0);
      expect(Array.isArray(product.sizes)).toBe(true);
      expect(product.createdAt).toBeInstanceOf(Date);
    }
  });

  it("finds a product by slug and returns null for an unknown one", async () => {
    const product = await getProductBySlug("nadi-indigo-kurta");
    expect(product?.name).toBe("Nadi Indigo Kurta");
    await expect(getProductBySlug("does-not-exist")).resolves.toBeNull();
  });

  it("only returns featured pieces from getFeaturedProducts", async () => {
    const featured = await getFeaturedProducts(3);
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((product) => product.featured)).toBe(true);
  });

  it("never returns the current piece inside its own related list", async () => {
    const related = await getRelatedProducts("nadi-indigo-kurta", "buti", 3);
    expect(related.some((product) => product.slug === "nadi-indigo-kurta")).toBe(false);
  });

  it("serves artisans and journal posts with the fields the UI reads", async () => {
    const artisans = await getArtisans();
    expect(artisans.length).toBeGreaterThan(0);
    expect(artisans[0].image).toMatch(/^\/images\//);

    const posts = await getJournalPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(Array.isArray(posts[0].body)).toBe(true);

    const post = await getJournalPost(posts[0].slug);
    expect(post?.title).toBe(posts[0].title);
    await expect(getJournalPost("no-such-post")).resolves.toBeNull();
  });
});
