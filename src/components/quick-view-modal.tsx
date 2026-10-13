"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/db/schema";
import { useCart, formatPrice } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { DialogShell } from "./dialog-shell";
import { CraftImage } from "./craft-image";

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  return (
    <DialogShell
      open={Boolean(product)}
      onClose={onClose}
      label={product ? `${product.name} quick view` : "Quick view"}
      variant="center"
      className="flex items-center justify-center p-4 sm:p-6 md:p-10"
      panelClassName="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-teak/15 bg-bone cloth-shadow-lg"
    >
      {/* Remounts per product so the size/image choice always starts fresh. */}
      {product && <QuickViewBody key={product.slug} product={product} onClose={onClose} />}
    </DialogShell>
  );
}

function QuickViewBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [added, setAdded] = useState(false);

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

  const thumbnails = [product.image, product.secondaryImage].filter(Boolean) as string[];

  return (
    <div className="grid md:grid-cols-2">
      <div className="border-teak/10 bg-bone-deep/60 flex flex-col items-center justify-center border-b p-5 sm:p-6 md:border-r md:border-b-0">
        <motion.div
          key={displayImage}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-bone relative aspect-[4/5] w-full overflow-hidden rounded-xl"
        >
          <CraftImage
            src={displayImage}
            alt={`${product.name} — ${product.garment} in ${product.colorway}`}
            sizes="(max-width: 768px) 92vw, 420px"
            wrapperClassName="h-full w-full"
            className="h-full w-full object-cover"
            quality={80}
          />
          <span className="craft-pill text-teak absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            {product.craftType || "Hand block printed"}
          </span>
        </motion.div>

        {thumbnails.length > 1 && (
          <div className="mt-4 flex gap-3">
            {thumbnails.map((thumbnail) => {
              const selected = displayImage === thumbnail;
              return (
                <button
                  key={thumbnail}
                  onClick={() => setActiveImage(thumbnail)}
                  aria-label={
                    thumbnail === product.image ? "Show flat-lay view" : "Show on-model view"
                  }
                  aria-pressed={selected}
                  className={`h-16 w-14 overflow-hidden rounded-lg border-2 transition-all ${
                    selected
                      ? "border-indigo scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <CraftImage
                    src={thumbnail}
                    alt=""
                    sizes="56px"
                    wrapperClassName="h-full w-full"
                    className="h-full w-full object-cover"
                    quality={55}
                    reveal={false}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-teak text-xs tracking-widest uppercase">
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
              className="text-ink-soft hover:text-madder p-1 transition-colors"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wishlisted}
            >
              <svg
                className={`h-5 w-5 ${wishlisted ? "fill-madder text-madder" : "fill-none stroke-current"}`}
                viewBox="0 0 24 24"
                aria-hidden="true"
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

          <h2 className="text-ink mt-2 font-serif text-2xl font-semibold sm:text-3xl">
            {product.name}
          </h2>
          <p className="text-ink-soft mt-1 text-sm italic">{product.tagline}</p>

          <p className="text-ink mt-4 font-serif text-2xl font-medium">
            {formatPrice(product.priceCents)}
          </p>

          <div className="border-teak/15 text-ink-soft mt-4 space-y-2 border-y py-3 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-ink font-medium">Fabric</span>
              <span className="text-right">{product.fabric}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-ink font-medium">Motif</span>
              <span className="text-right capitalize">
                {product.motifName || product.motifFamily}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-ink font-medium">Craft origin</span>
              <span className="text-right">Sanganer, Jaipur</span>
            </div>
          </div>

          <p className="text-ink-soft mt-4 line-clamp-3 text-sm leading-relaxed">
            {product.description}
          </p>

          <fieldset className="mt-5">
            <legend className="mb-2 flex w-full justify-between text-xs">
              <span className="text-ink font-medium tracking-wider uppercase">Select size</span>
              <span className="text-teak">True to size</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={currentSize === size}
                  className={`min-w-[44px] rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                    currentSize === size
                      ? "border-indigo bg-indigo text-bone"
                      : "border-teak/25 bg-bone text-ink hover:border-ink"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="border-teak/15 mt-6 flex flex-col gap-2.5 border-t pt-4">
          <button
            onClick={handleAddToCart}
            className={`btn-editorial w-full rounded-full py-3.5 text-xs font-medium tracking-widest uppercase transition-all ${
              added ? "bg-sage text-bone" : "bg-ink text-bone hover:bg-indigo hover:shadow-lg"
            }`}
          >
            {added ? "Added to cart ✓" : `Add to cart — ${formatPrice(product.priceCents)}`}
          </button>

          <Link
            href={`/shop/${product.slug}`}
            onClick={onClose}
            className="text-teak hover:text-indigo py-1 text-center text-xs transition-colors"
          >
            View full editorial page &amp; macro fabric →
          </Link>
        </div>
      </div>
    </div>
  );
}
