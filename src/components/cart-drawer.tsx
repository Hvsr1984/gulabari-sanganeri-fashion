"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, formatPrice } from "./cart-context";
import { DialogShell } from "./dialog-shell";
import { CraftImage } from "./craft-image";

export function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQty, subtotalCents, count } = useCart();
  const shippingFree = subtotalCents >= 500000;
  const remaining = Math.max(0, 500000 - subtotalCents);

  return (
    <DialogShell
      open={isOpen}
      onClose={close}
      label="Shopping cart"
      variant="right"
      panelClassName="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-teak/20 bg-bone shadow-2xl"
    >
      <header className="border-teak/15 flex items-center justify-between border-b px-6 py-5">
        <div>
          <p className="text-teak text-[11px] tracking-[0.2em] uppercase">Your selection</p>
          <h2 className="text-ink font-serif text-xl">
            Cart <span className="text-ink-faint">({count})</span>
          </h2>
        </div>
        <button
          onClick={close}
          className="border-teak/20 text-ink-soft hover:border-ink hover:text-ink rounded-full border p-2 transition-colors"
          aria-label="Close cart"
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

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="border-teak/20 bg-bone-deep/60 flex h-16 w-16 items-center justify-center rounded-full border">
            <svg
              className="text-teak h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.3}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </span>
          <div>
            <p className="text-ink font-serif text-xl">Your cart is empty</p>
            <p className="text-ink-soft mt-1 text-sm">
              Every piece is printed to order on the Sanganer table.
            </p>
          </div>
          <Link
            href="/shop"
            onClick={close}
            className="btn-editorial bg-indigo text-bone hover:bg-indigo-deep rounded-full px-6 py-2.5 text-xs tracking-widest uppercase"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <>
          {/* Free-shipping meter — fills as the cloth is laid down */}
          <div className="border-teak/10 border-b px-6 py-3">
            <p className="text-ink-soft text-[11px]">
              {shippingFree ? (
                <span className="text-sage font-medium">
                  Complimentary India-wide shipping unlocked
                </span>
              ) : (
                <>
                  <span className="text-ink font-medium">{formatPrice(remaining)}</span> more
                  for complimentary shipping
                </>
              )}
            </p>
            <div className="bg-bone-deep mt-2 h-1 w-full overflow-hidden rounded-full">
              <motion.div
                className="bg-indigo/70 h-full rounded-full"
                initial={false}
                animate={{ width: `${Math.min(100, (subtotalCents / 500000) * 100)}%` }}
                transition={{ type: "spring", stiffness: 180, damping: 26 }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-2">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={`${item.slug}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="border-teak/10 flex gap-4 border-b py-4"
                >
                  <CraftImage
                    src={item.image}
                    alt={item.name}
                    sizes="80px"
                    wrapperClassName="h-24 w-20 shrink-0 overflow-hidden rounded-md bg-bone-deep"
                    className="h-full w-full object-cover"
                    quality={65}
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/shop/${item.slug}`}
                        onClick={close}
                        className="text-ink hover:text-indigo text-sm font-medium transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.slug, item.size)}
                        className="text-ink-faint hover:text-madder self-start text-xs transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-ink-soft text-xs capitalize">
                      {item.colorway} · Size {item.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="border-teak/25 flex items-center rounded-full border">
                        <button
                          onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                          className="text-ink-soft hover:text-ink px-2.5 py-1 transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                          className="text-ink-soft hover:text-ink px-2.5 py-1 transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.priceCents * item.qty)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <footer className="border-teak/15 border-t px-6 py-5">
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotalCents)}</span>
            </div>
            <p className="text-ink-soft mt-1 text-xs">
              Shipping &amp; taxes calculated at checkout.
            </p>
            <Link
              href="/cart"
              onClick={close}
              className="btn-editorial bg-indigo text-bone hover:bg-indigo-deep mt-4 block rounded-full py-3 text-center text-xs tracking-widest uppercase"
            >
              Review &amp; Checkout
            </Link>
          </footer>
        </>
      )}
    </DialogShell>
  );
}
