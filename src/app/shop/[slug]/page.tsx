import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import {
  getProductBySlug,
  getRelatedProducts,
  getProducts,
} from "@/db/queries";

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
  if (!product) return { title: "Piece Not Found" };
  return {
    title: `${product.name} — Hand Block Printed Cotton`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(slug, product.motifFamily, 3);

  return (
    <div className="grain pt-28 sm:pt-32 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-6">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-teak font-mono">
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
        <section className="mx-auto max-w-7xl px-5 sm:px-8 mt-24 sm:mt-32 pt-16 border-t border-teak/15">
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-teak font-mono">
                  Curated Companions
                </span>
                <h2 className="mt-1 font-serif text-2xl sm:text-4xl font-semibold text-ink">
                  More with the {product.motifFamily} motif
                </h2>
              </div>
              <Link href="/shop" className="text-xs uppercase tracking-widest font-semibold text-indigo hover:underline">
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
