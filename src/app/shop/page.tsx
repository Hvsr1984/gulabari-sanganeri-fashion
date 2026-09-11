import type { Metadata } from "next";
import { ShopBrowser } from "@/components/shop-browser";
import { getProducts } from "@/db/queries";

export const metadata: Metadata = {
  title: "Shop the Sanganeri Collection — GULABARI",
  description:
    "Authentic hand block printed cotton kurtas, tiered dresses, camp shirts, and fine dupattas. Printed with botanical dyes in Jaipur.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="grain pt-28 sm:pt-32 pb-24">
      <header className="mx-auto max-w-7xl px-5 sm:px-8 pb-8">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
          Authentic Handcrafted Catalog
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-6xl font-semibold text-ink">
          The Sanganer Collection
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-ink-soft leading-relaxed">
          Each piece is stamped with hand-carved wooden blocks on unbleached natural cotton mul and voile.
          Filter by garment, motif family, or natural dye palette.
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ShopBrowser products={products} />
      </div>
    </div>
  );
}
