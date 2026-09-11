"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/db/schema";
import { useCart, formatPrice } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { QuickViewModal } from "./quick-view-modal";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const reduce = useReducedMotion();

  const wishlisted = isInWishlist(product.slug);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      priceCents: product.priceCents,
      size: product.sizes[0] || "M",
      colorway: product.colorway,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      slug: product.slug,
      name: product.name,
      image: product.image,
      priceCents: product.priceCents,
      garment: product.garment,
      motifFamily: product.motifFamily,
      fabric: product.fabric,
    });
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        whileHover={reduce ? {} : { y: -3 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Image Container with secondary image hover fade */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-bone-deep cloth-shadow transition-shadow duration-300 group-hover:cloth-shadow-lg">
          <Link href={`/shop/${product.slug}`} className="block h-full w-full">
            {/* Primary Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={`${product.name} — ${product.garment}`}
              loading="lazy"
              className={`h-full w-full object-cover transition-all duration-700 ease-out ${
                isHovered && product.secondaryImage && !reduce ? "opacity-0 scale-105" : "opacity-100 scale-100"
              }`}
            />

            {/* Secondary Image (Fade in on hover) */}
            {product.secondaryImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.secondaryImage}
                alt={`${product.name} alternate view`}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                  isHovered && !reduce ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
              />
            )}
          </Link>

          {/* Top Left Craft Label */}
          <div className="absolute left-3.5 top-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full craft-pill px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-madder shrink-0" />
              HAND BLOCK PRINTED
            </span>
          </div>

          {/* Top Right Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute right-3.5 top-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full craft-pill text-ink transition-transform hover:scale-110"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              className={`h-4 w-4 transition-colors ${
                wishlisted ? "fill-madder text-madder" : "fill-none stroke-current"
              }`}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Hover Action Overlay: Quick View + Quick Add */}
          <div
            className={`absolute bottom-3 left-3 right-3 z-10 flex gap-2 transition-all duration-300 ${
              isHovered && !reduce ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <button
              onClick={handleOpenQuickView}
              className="flex-1 rounded-full bg-[#F3EFE6] border border-teak/20 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-bone-deep shadow-sm"
            >
              Quick View
            </button>
            <button
              onClick={handleQuickAdd}
              className={`rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-colors shadow-md ${
                added ? "bg-sage text-bone" : "bg-ink text-bone hover:bg-indigo"
              }`}
            >
              {added ? "Added ✓" : "+ Add"}
            </button>
          </div>
        </div>

        {/* Card Editorial Information */}
        <div className="mt-4 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between text-xs text-teak font-medium">
              <span className="capitalize">{product.garment} · {product.colorway}</span>
              <span className="capitalize">{product.motifName || `${product.motifFamily} motif`}</span>
            </div>

            <Link href={`/shop/${product.slug}`} className="group-hover:text-indigo transition-colors">
              <h3 className="mt-1 font-serif text-lg sm:text-xl font-semibold text-ink leading-snug">
                {product.name}
              </h3>
            </Link>

            <p className="mt-1 text-xs text-ink-soft line-clamp-1">
              {product.fabric}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-teak/10 pt-2.5">
            <span className="font-serif text-base font-semibold text-ink">
              {formatPrice(product.priceCents)}
            </span>
            <Link
              href={`/shop/${product.slug}`}
              className="text-[11px] uppercase tracking-wider text-teak hover:text-indigo font-medium"
            >
              Explore Piece →
            </Link>
          </div>
        </div>
      </motion.article>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}
