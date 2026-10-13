CREATE TABLE "artisans" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"village" text NOT NULL,
	"generations" text NOT NULL,
	"bio" text NOT NULL,
	"image" text NOT NULL,
	CONSTRAINT "artisans_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "journal_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"excerpt" text NOT NULL,
	"body" jsonb NOT NULL,
	"image" text NOT NULL,
	"read_minutes" integer DEFAULT 4 NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "journal_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"kind" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"tagline" text NOT NULL,
	"description" text NOT NULL,
	"price_cents" integer NOT NULL,
	"image" text NOT NULL,
	"garment" text NOT NULL,
	"motif_family" text NOT NULL,
	"colorway" text NOT NULL,
	"fabric" text NOT NULL,
	"motif_notes" text NOT NULL,
	"care_notes" text NOT NULL,
	"printed_notes" text NOT NULL,
	"sizes" jsonb NOT NULL,
	"secondary_image" text,
	"motif_name" text,
	"craft_type" text,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
