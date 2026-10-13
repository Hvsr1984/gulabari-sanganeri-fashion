import { describe, expect, it } from "vitest";
import { productSeed } from "@/db/seed-data";
import {
  articleSchema,
  breadcrumbSchema,
  jsonLdScript,
  organizationSchema,
  productSchema,
  websiteSchema,
} from "./structured-data";
import { absoluteUrl } from "./site";

const product = { id: 1, createdAt: new Date(), ...productSeed[0] } as Parameters<
  typeof productSchema
>[0];

describe("structured data", () => {
  it("describes the organisation with a Jaipur address", () => {
    const schema = organizationSchema() as Record<string, any>;
    expect(schema["@type"]).toBe("Organization");
    expect(schema.address.addressLocality).toBe("Jaipur");
    expect(schema.address.addressCountry).toBe("IN");
    expect(schema.url).toBe(absoluteUrl("/"));
  });

  it("emits a website entity linked to the organisation", () => {
    const schema = websiteSchema() as Record<string, any>;
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.publisher["@id"]).toContain("#organization");
  });

  it("emits a purchasable product with an INR offer and canonical URL", () => {
    const schema = productSchema(product) as Record<string, any>;
    expect(schema["@type"]).toBe("Product");
    expect(schema.sku).toBe(product.slug);
    expect(schema.offers.priceCurrency).toBe("INR");
    expect(schema.offers.price).toBe((product.priceCents / 100).toFixed(2));
    expect(schema.offers.availability).toBe("https://schema.org/InStock");
    expect(schema.image.every((src: string) => src.startsWith("https://"))).toBe(true);
  });

  it("builds breadcrumbs in order with 1-based positions", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
    ]) as Record<string, any>;
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].item).toBe(absoluteUrl("/shop"));
  });

  it("stamps articles with an ISO publication date", () => {
    const schema = articleSchema({
      slug: "the-story-of-sanganeri-printing",
      title: "The Story of Sanganeri Printing",
      excerpt: "How a river, a guild and a block built a craft town.",
      image: "/images/craft-press.jpg",
      category: "History",
      publishedAt: new Date("2026-01-03T00:00:00.000Z"),
    }) as Record<string, any>;
    expect(schema.datePublished).toBe("2026-01-03T00:00:00.000Z");
    expect(schema["@type"]).toBe("Article");
  });
});

describe("jsonLdScript", () => {
  it("escapes angle brackets so the payload cannot break out of the script tag", () => {
    const result = jsonLdScript({ name: "</script><img src=x onerror=alert(1)>" });
    expect(result.__html).not.toContain("</script>");
    expect(result.__html).toContain("\\u003c");
  });

  it("serialises arrays of schemas", () => {
    const result = jsonLdScript([organizationSchema(), websiteSchema()]);
    expect(JSON.parse(result.__html)).toHaveLength(2);
  });
});
