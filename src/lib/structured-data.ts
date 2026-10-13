import type { Product } from "@/db/schema";
import { SITE, absoluteUrl } from "./site";

/**
 * JSON-LD builders. Rendered as <script type="application/ld+json"> so search
 * engines can build rich results (product cards with price, breadcrumbs,
 * organisation knowledge panel) from this storefront.
 */

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE.name,
    legalName: SITE.legalName,
    url: absoluteUrl("/"),
    description: SITE.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/gulabari-logo-transparent.png"),
      width: 1024,
      height: 1024,
    },
    image: absoluteUrl(SITE.ogImage),
    foundingDate: SITE.foundingYear,
    founder: { "@type": "Person", name: SITE.founder },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    knowsAbout: [
      "Sanganeri hand block printing",
      "natural botanical dyes",
      "Rajasthani textile craft",
      "Chippa artisan community",
    ],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function productSchema(product: Product): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.image, product.secondaryImage]
      .filter(Boolean)
      .map((src) => absoluteUrl(src!)),
    sku: product.slug,
    category: product.garment,
    material: product.fabric,
    color: product.colorway,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": absoluteUrl("/#organization") },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/shop/${product.slug}`),
      priceCurrency: "INR",
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": absoluteUrl("/#organization") },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Motif",
        value: product.motifName ?? product.motifFamily,
      },
      {
        "@type": "PropertyValue",
        name: "Craft",
        value: product.craftType ?? "Sanganeri hand block print",
      },
      { "@type": "PropertyValue", name: "Printed in", value: "Sanganer, Jaipur, Rajasthan" },
    ],
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: Date | string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    articleSection: post.category,
    datePublished: new Date(post.publishedAt).toISOString(),
    inLanguage: "en-IN",
    author: { "@type": "Person", name: SITE.founder },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(`/journal/${post.slug}`),
  };
}

/** Inline the JSON-LD without pulling in a serialisation dependency. */
export function jsonLdScript(schema: Json | Json[]) {
  return {
    __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
}
