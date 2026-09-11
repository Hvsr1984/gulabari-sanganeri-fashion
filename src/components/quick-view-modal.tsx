"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/db/schema";
import { useCart, formatPrice } from "./cart-context";
import { useWishlist } from "./wishlist-context";

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes[0];
  const displayImage = activeImage || product.image;
  const wishlisted = isInWishlist(product.slug);

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      priceCents: product.priceCents,
      size: currentSize,
      colorway: product.colorway,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-bone cloth-shadow-lg"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full craft-pill p-2 text-ink hover:bg-ink hover:text-bone transition-colors"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image side */}
            <div className="relative bg-bone-deep p-6 flex flex-col justify-center items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-bone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-all duration-300"
                />
                <div className="absolute top-3 left-3 rounded-full craft-pill px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-teak">
                  {product.craftType || "Hand Block Printed"}
                </div>
              </div>

              {/* Thumbnail selector */}
              {product.secondaryImage && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`h-16 w-14 overflow-hidden rounded-lg border-2 transition-all ${
                      displayImage === product.image ? "border-indigo scale-105" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt="" className="h-full w-full object-cover" />
                  </button>
                  <button
                    onClick={() => setActiveImage(product.secondaryImage!)}
                    className={`h-16 w-14 overflow-hidden rounded-lg border-2 transition-all ${
                      displayImage === product.secondaryImage ? "border-indigo scale-105" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.secondaryImage} alt="" className="h-full w-full object-cover" />
                  </button>
                </div>
              )}
            </div>

            {/* Details side */}
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-teak">
                    {product.garment} · {product.colorway}
                  </span>
                  <button
                    onClick={() =>
                      toggleWishlist({
                        slug: product.slug,
                        name: product.name,
                        image: product.image,
                        priceCents: product.priceCents,
                        garment: product.garment,
                        motifFamily: product.motifFamily,
                        fabric: product.fabric,
                      })
                    }
                    className="p-1 text-ink-soft hover:text-madder transition-colors"
                    aria-label="Wishlist"
                  >
                    <svg
                      className={`h-5 w-5 ${wishlisted ? "fill-madder text-madder" : "fill-none stroke-current"}`}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.6}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-ink">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-ink-soft italic">{product.tagline}</p>

                <p className="mt-4 font-serif text-2xl font-medium text-ink">
                  {formatPrice(product.priceCents)}
                </p>

                <div className="mt-4 border-t border-b border-teak/15 py-3 space-y-2 text-xs text-ink-soft">
                  <div className="flex justify-between">
                    <span className="font-medium text-ink">Fabric:</span>
                    <span>{product.fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-ink">Motif:</span>
                    <span className="capitalize">{product.motifName || product.motifFamily}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-ink">Craft Origin:</span>
                    <span>Sanganer, Jaipur</span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft line-clamp-3">
                  {product.description}
                </p>

                {/* Size selection */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-medium uppercase tracking-wider text-ink">Select Size</span>
                    <span className="text-teak">True to size</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[44px] rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                          currentSize === s
                            ? "border-indigo bg-indigo text-bone"
                            : "border-teak/25 bg-bone text-ink hover:border-ink"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-teak/15">
                <button
                  onClick={handleAddToCart}
                  className={`w-full rounded-full py-3.5 text-xs font-medium uppercase tracking-widest transition-all ${
                    added
                      ? "bg-sage text-bone"
                      : "bg-ink text-bone hover:bg-indigo hover:shadow-lg"
                  }`}
                >
                  {added ? "Added to Cart ✓" : `Add to Cart — ${formatPrice(product.priceCents)}`}
                </button>

                <Link
                  href={`/shop/${product.slug}`}
                  onClick={onClose}
                  className="text-center text-xs text-teak hover:text-indigo hover:underline py-1"
                >
                  View Full Editorial Page & Macro Fabric →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
