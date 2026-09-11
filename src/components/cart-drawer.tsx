"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, formatPrice } from "./cart-context";

export function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQty, subtotalCents, count } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-teak/15 px-6 py-5">
              <h2 className="font-serif text-xl">Your Cart ({count})</h2>
              <button
                onClick={close}
                className="text-ink-soft hover:text-ink"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-ink-soft">Your cart is empty.</p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="rounded-full bg-indigo px-6 py-2.5 text-sm text-bone hover:bg-indigo-deep"
                >
                  Browse the collection
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map((item) => (
                    <div
                      key={`${item.slug}-${item.size}`}
                      className="flex gap-4 border-b border-teak/10 py-4"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-20 rounded-md object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="text-sm font-medium">{item.name}</p>
                          <button
                            onClick={() => removeItem(item.slug, item.size)}
                            className="text-xs text-ink-soft hover:text-madder"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs capitalize text-ink-soft">
                          {item.colorway} · Size {item.size}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-teak/25">
                            <button
                              onClick={() =>
                                updateQty(item.slug, item.size, item.qty - 1)
                              }
                              className="px-2.5 py-1 text-ink-soft hover:text-ink"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="min-w-6 text-center text-sm">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                updateQty(item.slug, item.size, item.qty + 1)
                              }
                              className="px-2.5 py-1 text-ink-soft hover:text-ink"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm font-medium">
                            {formatPrice(item.priceCents * item.qty)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-teak/15 px-6 py-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotalCents)}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">
                    Shipping & taxes calculated at checkout.
                  </p>
                  <Link
                    href="/cart"
                    onClick={close}
                    className="mt-4 block rounded-full bg-indigo py-3 text-center text-sm text-bone transition-colors hover:bg-indigo-deep"
                  >
                    Review & Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
