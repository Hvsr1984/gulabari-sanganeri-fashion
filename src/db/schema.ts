import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  priceCents: integer("price_cents").notNull(),
  image: text("image").notNull(),
  garment: text("garment").notNull(), // kurta, dress, dupatta, shirt
  motifFamily: text("motif_family").notNull(), // buta, buti, bel, jaal
  colorway: text("colorway").notNull(), // indigo, turmeric, madder, sage
  fabric: text("fabric").notNull(), // fabric weight/type
  motifNotes: text("motif_notes").notNull(),
  careNotes: text("care_notes").notNull(),
  printedNotes: text("printed_notes").notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull(),
  secondaryImage: text("secondary_image"),
  motifName: text("motif_name"),
  craftType: text("craft_type"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const artisans = pgTable("artisans", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  village: text("village").notNull(),
  generations: text("generations").notNull(),
  bio: text("bio").notNull(),
  image: text("image").notNull(),
});

export const journalPosts = pgTable("journal_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  excerpt: text("excerpt").notNull(),
  body: jsonb("body").$type<string[]>().notNull(),
  image: text("image").notNull(),
  readMinutes: integer("read_minutes").notNull().default(4),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  kind: text("kind").notNull(), // general, wholesale, stockist
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Artisan = typeof artisans.$inferSelect;
export type JournalPost = typeof journalPosts.$inferSelect;
