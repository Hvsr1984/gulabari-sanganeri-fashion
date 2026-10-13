"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/db/schema";
import { useCart, formatPrice } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { QuickViewModal } from "./quick-view-modal";
import { CraftImage } from "./craft-image";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  const wishlisted = isInWishlist(product.slug);

  const handleQuickAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      priceCents: product.priceCents,
      size: product.sizes[0] || "M",
      colorway: product.colorway,
    });
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1600);
  };

  const handleToggleWishlist = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
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

  return (
    <>
      <motion.article
        layout
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        whileHover={reduce ? {} : { y: -5 }}
        transition={{
          duration: 0.45,
          delay: Math.min(index * 0.05, 0.3),
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="cloth-sheen bg-bone-deep cloth-shadow group-hover:cloth-shadow-lg relative aspect-[3/4] w-full overflow-hidden rounded-2xl transition-shadow duration-500">
          <Link
            href={`/shop/${product.slug}`}
            className="block h-full w-full"
            aria-label={`View ${product.name}`}
          >
            <motion.div
              animate={
                reduce
                  ? {}
                  : {
                      scale: isHovered ? 1.05 : 1,
                      filter: isHovered && product.secondaryImage ? "blur(1.5px)" : "blur(0px)",
                    }
              }
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <CraftImage
                src={product.image}
                alt={`${product.name} — ${product.garment} · ${product.motifName || product.motifFamily}`}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover"
                quality={75}
              />
            </motion.div>

            {product.secondaryImage && (
              <motion.div
                aria-hidden={!isHovered}
                animate={{
                  opacity: isHovered && !reduce ? 1 : 0,
                  scale: isHovered && !reduce ? 1.04 : 1,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <CraftImage
                  src={product.secondaryImage}
                  alt=""
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover"
                  quality={70}
                  reveal={false}
                />
              </motion.div>
            )}
          </Link>

          <div className="pointer-events-none absolute top-3.5 left-3.5 z-10">
            <span className="craft-pill text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase">
              <span className="bg-madder h-1.5 w-1.5 rounded-full" aria-hidden="true" />
              Hand block printed
            </span>
          </div>

          <button
            onClick={handleToggleWishlist}
            className="craft-pill text-ink absolute top-3.5 right-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
            aria-label={
              wishlisted
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            aria-pressed={wishlisted}
          >
            <svg
              className={`h-4 w-4 transition-colors ${wishlisted ? "fill-madder text-madder" : "fill-none stroke-current"}`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Quick actions rise out of the cloth on hover — always reachable by keyboard. */}
          <div
            className={`absolute right-3 bottom-3 left-3 z-10 flex gap-2 transition-all duration-300 focus-within:translate-y-0 focus-within:opacity-100 ${
              isHovered && !reduce ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="border-teak/20 text-ink hover:bg-bone-deep flex-1 rounded-full border bg-[#F3EFE6] py-2.5 text-[11px] font-semibold tracking-wider uppercase shadow-sm transition-colors"
            >
              Quick view
            </button>
            <button
              onClick={handleQuickAdd}
              className={`rounded-full px-4 py-2.5 text-[11px] font-semibold tracking-wider uppercase shadow-md transition-colors ${
                added ? "bg-sage text-bone" : "bg-ink text-bone hover:bg-indigo"
              }`}
            >
              {added ? "Added ✓" : "+ Add"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col justify-between">
          <div>
            <div className="text-teak flex items-center justify-between text-xs font-medium">
              <span className="capitalize">
                {product.garment} · {product.colorway}
              </span>
              <span className="capitalize">
                {product.motifName || `${product.motifFamily} motif`}
              </span>
            </div>

            <Link href={`/shop/${product.slug}`} className="link-underline inline-block">
              <h3 className="text-ink mt-1 font-serif text-lg leading-snug font-semibold transition-colors sm:text-xl">
                {product.name}
              </h3>
            </Link>

            <p className="text-ink-soft mt-1 line-clamp-1 text-xs">{product.fabric}</p>
          </div>

          <div className="border-teak/10 mt-3 flex items-center justify-between border-t pt-2.5">
            <span className="text-ink font-serif text-base font-semibold">
              {formatPrice(product.priceCents)}
            </span>
            <Link
              href={`/shop/${product.slug}`}
              className="text-teak hover:text-indigo text-[11px] font-medium tracking-wider uppercase transition-colors"
            >
              Explore piece →
            </Link>
          </div>
        </div>
      </motion.article>

      <QuickViewModal
        product={quickViewOpen ? product : null}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
