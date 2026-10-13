import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { getProductBySlug, getRelatedProducts, getProducts } from "@/db/queries";
import { breadcrumbSchema, jsonLdScript, productSchema } from "@/lib/structured-data";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Piece not found" };

  const title = `${product.name} — Hand Block Printed ${product.garment}`;
  const description = `${product.tagline}. ${product.fabric}. Hand block printed with natural botanical dyes in Sanganer, Jaipur.`;

  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} · GULABARI Jaipur`,
      description,
      url: `/shop/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 896,
          height: 1200,
          alt: `${product.name} — ${product.garment} in ${product.colorway}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} · GULABARI Jaipur`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const structuredData = [
    productSchema(product),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      { name: product.name, path: `/shop/${product.slug}` },
    ]),
  ];

  const related = await getRelatedProducts(slug, product.motifFamily, 3);

  return (
    <div className="grain pt-28 pb-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(structuredData)}
      />

      {/* Breadcrumb Navigation */}
      <div className="mx-auto mb-6 max-w-7xl px-5 sm:px-8">
        <nav className="text-teak flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
          <Link href="/shop" className="hover:text-indigo transition-colors">
            Collection
          </Link>
          <span>/</span>
          <span className="capitalize">{product.garment}</span>
          <span>/</span>
          <span className="text-ink font-semibold">{product.name}</span>
        </nav>
      </div>

      {/* Main Detail Content */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ProductDetail product={product} />
      </div>

      {/* Related Motif Pieces Grid */}
      {related.length > 0 && (
        <section className="border-teak/15 mx-auto mt-24 max-w-7xl border-t px-5 pt-16 sm:mt-32 sm:px-8">
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="text-teak font-mono text-xs tracking-widest uppercase">
                  Curated Companions
                </span>
                <h2 className="text-ink mt-1 font-serif text-2xl font-semibold sm:text-4xl">
                  More with the {product.motifFamily} motif
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-indigo text-xs font-semibold tracking-widest uppercase hover:underline"
              >
                View All →
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
