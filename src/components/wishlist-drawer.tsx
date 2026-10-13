"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useWishlist } from "./wishlist-context";
import { useCart, formatPrice } from "./cart-context";
import { DialogShell } from "./dialog-shell";
import { CraftImage } from "./craft-image";

export function WishlistDrawer() {
  const { items, isOpen, close, removeItem } = useWishlist();
  const { addItem } = useCart();

  return (
    <DialogShell
      open={isOpen}
      onClose={close}
      label="Saved pieces"
      variant="right"
      panelClassName="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-teak/20 bg-bone shadow-2xl"
    >
      <header className="border-teak/15 flex items-center justify-between border-b px-6 py-5">
        <div>
          <p className="text-teak text-[11px] tracking-[0.2em] uppercase">Curated selections</p>
          <h2 className="text-ink font-serif text-xl">
            Wishlist <span className="text-ink-faint">({items.length})</span>
          </h2>
        </div>
        <button
          onClick={close}
          className="border-teak/20 text-ink-soft hover:border-ink hover:text-ink rounded-full border p-2 transition-colors"
          aria-label="Close wishlist"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {items.length === 0 ? (
          <div className="text-ink-soft flex h-full flex-col items-center justify-center text-center">
            <svg
              className="stroke-teak/40 h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-ink mt-4 font-serif text-xl">Your wishlist is empty</p>
            <p className="mt-1 max-w-xs text-sm">
              Tap the heart on any piece to keep it here while you decide.
            </p>
            <button
              onClick={close}
              className="btn-editorial bg-indigo text-bone hover:bg-indigo-deep mt-6 rounded-full px-6 py-2.5 text-xs tracking-widest uppercase"
            >
              Explore collection
            </button>
          </div>
        ) : (
          <ul className="divide-teak/10 divide-y">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 py-4"
                >
                  <CraftImage
                    src={item.image}
                    alt={item.name}
                    sizes="80px"
                    wrapperClassName="h-24 w-20 shrink-0 overflow-hidden rounded-md bg-bone-deep"
                    className="h-full w-full object-cover"
                    quality={65}
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={close}
                          className="text-ink hover:text-indigo font-serif text-base transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.slug)}
                          className="text-ink-faint hover:text-madder transition-colors"
                          aria-label={`Remove ${item.name} from wishlist`}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-teak text-xs capitalize">
                        {item.garment} · {item.motifFamily} motif
                      </p>
                      <p className="text-ink mt-1 font-serif text-sm font-medium">
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
                        className="bg-ink text-bone hover:bg-indigo rounded-full px-4 py-1.5 text-xs transition-colors"
                      >
                        Add to cart · M
                      </button>
                      <Link
                        href={`/shop/${item.slug}`}
                        onClick={close}
                        className="border-teak/30 text-ink-soft hover:border-ink hover:text-ink rounded-full border px-3 py-1.5 text-xs transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </DialogShell>
  );
}
