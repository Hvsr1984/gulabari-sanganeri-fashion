import { db } from "./index";
import { products, artisans, journalPosts } from "./schema";
import { eq, sql, and, ne, desc } from "drizzle-orm";
import { productSeed, artisanSeed, journalSeed } from "./seed-data";

let seeding: Promise<void> | null = null;

/** Arbitrary but stable key for the Postgres advisory lock guarding seeding. */
const SEED_LOCK_KEY = 918_273_645;

async function seedIfEmpty() {
  if (!db) return;

  // Take a transaction-scoped advisory lock first. Two cold requests landing at
  // once would otherwise both read `count = 0` and race to insert; with the lock
  // the second waits, re-reads, and finds the catalogue already seeded.
  await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(${SEED_LOCK_KEY})`);

    const [{ count }] = await tx.select({ count: sql<number>`count(*)::int` }).from(products);
    if (count > 0) return;

    await tx.insert(products).values(productSeed).onConflictDoNothing();
    await tx.insert(artisans).values(artisanSeed).onConflictDoNothing();
    await tx.insert(journalPosts).values(journalSeed).onConflictDoNothing();
  });
}

export async function ensureSeeded() {
  if (!db) return;
  if (!seeding) {
    seeding = seedIfEmpty().catch((e) => {
      seeding = null;
      throw e;
    });
  }
  return seeding;
}

export async function getProducts() {
  if (!db) {
    return productSeed.map((p, idx) => ({ id: idx + 1, createdAt: new Date(), ...p }));
  }
  await ensureSeeded();
  return db.select().from(products).orderBy(desc(products.featured), products.id);
}

export async function getFeaturedProducts(limit = 3) {
  if (!db) {
    return productSeed
      .filter((p) => p.featured)
      .slice(0, limit)
      .map((p, idx) => ({ id: idx + 1, createdAt: new Date(), ...p }));
  }
  await ensureSeeded();
  return db.select().from(products).where(eq(products.featured, true)).limit(limit);
}

export async function getProductBySlug(slug: string) {
  if (!db) {
    const p = productSeed.find((item) => item.slug === slug);
    return p ? { id: 1, createdAt: new Date(), ...p } : null;
  }
  await ensureSeeded();
  const rows = await db.select().from(products).where(eq(products.slug, slug));
  return rows[0] ?? null;
}

export async function getRelatedProducts(slug: string, motifFamily: string, limit = 3) {
  if (!db) {
    return productSeed
      .filter((p) => p.motifFamily === motifFamily && p.slug !== slug)
      .slice(0, limit)
      .map((p, idx) => ({ id: idx + 1, createdAt: new Date(), ...p }));
  }
  await ensureSeeded();
  return db
    .select()
    .from(products)
    .where(and(eq(products.motifFamily, motifFamily), ne(products.slug, slug)))
    .limit(limit);
}

export async function getArtisans() {
  if (!db) {
    return artisanSeed.map((a, idx) => ({ id: idx + 1, createdAt: new Date(), ...a }));
  }
  await ensureSeeded();
  return db.select().from(artisans).orderBy(artisans.id);
}

export async function getJournalPosts() {
  if (!db) {
    return journalSeed.map((j, idx) => ({
      id: idx + 1,
      publishedAt: new Date(),
      createdAt: new Date(),
      ...j,
    }));
  }
  await ensureSeeded();
  return db.select().from(journalPosts).orderBy(desc(journalPosts.publishedAt));
}

export async function getJournalPost(slug: string) {
  if (!db) {
    const j = journalSeed.find((item) => item.slug === slug);
    return j ? { id: 1, publishedAt: new Date(), createdAt: new Date(), ...j } : null;
  }
  await ensureSeeded();
  const rows = await db.select().from(journalPosts).where(eq(journalPosts.slug, slug));
  return rows[0] ?? null;
}
