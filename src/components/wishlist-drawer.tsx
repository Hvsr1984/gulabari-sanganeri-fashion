"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useWishlist } from "./wishlist-context";
import { useCart, formatPrice } from "./cart-context";

export function WishlistDrawer() {
  const { items, isOpen, close, removeItem } = useWishlist();
  const { addItem } = useCart();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-bone shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-teak/15 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-teak">Curated Selections</p>
                <h2 className="font-serif text-2xl text-ink">Wishlist ({items.length})</h2>
              </div>
              <button
                onClick={close}
                className="rounded-full border border-teak/20 p-2 text-ink-soft hover:border-ink hover:text-ink"
                aria-label="Close wishlist"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-ink-soft">
                  <svg className="h-12 w-12 stroke-teak/40" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <p className="mt-4 font-serif text-xl text-ink">Your wishlist is empty</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Explore our Sanganeri hand block print collection and tap the heart on pieces you admire.
                  </p>
                  <button
                    onClick={close}
                    className="mt-6 rounded-full bg-indigo px-6 py-2.5 text-xs uppercase tracking-wider text-bone hover:bg-indigo-deep"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-teak/10">
                  {items.map((item) => (
                    <li key={item.slug} className="flex gap-4 py-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/shop/${item.slug}`}
                              onClick={close}
                              className="font-serif text-base text-ink hover:text-indigo"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.slug)}
                              className="text-ink-soft hover:text-madder"
                              aria-label="Remove item"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-xs text-teak capitalize">{item.garment} · {item.motifFamily} motif</p>
                          <p className="mt-1 font-serif text-sm font-medium text-ink">
                            {formatPrice(item.priceCents)}
                          </p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => {
                              addItem({
                                slug: item.slug,
                                name: item.name,
                                image: item.image,
                                priceCents: item.priceCents,
                                size: "M",
                                colorway: item.motifFamily,
                              });
                              close();
                            }}
                            className="rounded-full bg-ink px-4 py-1.5 text-xs text-bone hover:bg-indigo"
                          >
                            Add to Cart (M)
                          </button>
                          <Link
                            href={`/shop/${item.slug}`}
                            onClick={close}
                            className="rounded-full border border-teak/30 px-3 py-1.5 text-xs text-ink-soft hover:border-ink hover:text-ink"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
