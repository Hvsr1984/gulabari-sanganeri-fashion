"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart, formatPrice } from "./cart-context";
import { CraftImage } from "./craft-image";

export function Checkout() {
  const { items, updateQty, removeItem, subtotalCents, clear, count } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [placed, setPlaced] = useState(false);
  const reduce = useReducedMotion();

  const shippingCents = subtotalCents > 0 && subtotalCents < 500000 ? 15000 : 0;
  const totalCents = subtotalCents + shippingCents;

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <motion.div
          initial={reduce ? { opacity: 1 } : { scale: 0.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="bg-indigo text-bone mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl"
        >
          ✓
        </motion.div>
        <h1 className="mt-6 font-serif text-3xl">Order confirmed</h1>
        <p className="text-ink-soft mt-3">
          Thank you. This is a demo checkout — no payment was taken. Your pieces would be made
          to order and dispatched within 5–7 days.
        </p>
        <Link
          href="/shop"
          className="bg-indigo text-bone hover:bg-indigo-deep mt-8 inline-block rounded-full px-6 py-3 text-sm"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <p className="text-ink-soft mt-3">Nothing here yet — the collection is waiting.</p>
        <Link
          href="/shop"
          className="bg-indigo text-bone hover:bg-indigo-deep mt-8 inline-block rounded-full px-6 py-3 text-sm"
        >
          Browse the collection
        </Link>
      </div>
    );
  }

  const steps = ["Cart", "Details", "Payment"];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      {/* Step progress — the rail fills like dye drawn along a seam */}
      <ol className="mb-10 flex items-center gap-3" aria-label="Checkout progress">
        {steps.map((label, i) => {
          const n = (i + 1) as 1 | 2 | 3;
          const active = step >= n;
          const current = step === n;
          return (
            <li key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ scale: current ? 1.06 : 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  aria-current={current ? "step" : undefined}
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors ${
                    active ? "text-bone" : "bg-bone-deep text-ink-soft"
                  } ${current ? "bg-indigo" : active ? "bg-indigo/70" : ""}`}
                >
                  {active && !current ? "✓" : n}
                </motion.span>
                <span className={`text-sm ${active ? "text-ink" : "text-ink-soft"}`}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span className="bg-teak/25 relative h-px w-8 overflow-hidden">
                  <motion.span
                    className="bg-indigo absolute inset-0 origin-left"
                    initial={false}
                    animate={{ scaleX: step > n ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -18 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 1 && (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.slug}-${item.size}`}
                      className="border-teak/15 flex gap-4 border-b pb-4"
                    >
                      <CraftImage
                        src={item.image}
                        alt={item.name}
                        sizes="96px"
                        wrapperClassName="h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-bone-deep"
                        className="h-full w-full object-cover"
                        quality={65}
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-ink-soft text-sm capitalize">
                              {item.colorway} · Size {item.size}
                            </p>
                          </div>
                          <p className="font-medium">
                            {formatPrice(item.priceCents * item.qty)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="border-teak/25 flex items-center rounded-full border">
                            <button
                              onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                              className="text-ink-soft px-3 py-1"
                              aria-label="Decrease"
                            >
                              −
                            </button>
                            <span className="min-w-6 text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                              className="text-ink-soft px-3 py-1"
                              aria-label="Increase"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.slug, item.size)}
                            className="text-ink-soft hover:text-madder text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  {[
                    ["Full name", "text"],
                    ["Email", "email"],
                    ["Address", "text"],
                    ["City", "text"],
                    ["Postal code", "text"],
                  ].map(([label, type]) => (
                    <div key={label}>
                      <label className="text-ink-soft text-sm">{label}</label>
                      <input
                        type={type}
                        required
                        className="border-teak/30 focus:border-indigo w-full border-b bg-transparent py-2.5 outline-none"
                      />
                    </div>
                  ))}
                </form>
              )}

              {step === 3 && (
                <div className="border-teak/15 bg-bone/60 rounded-2xl border p-6">
                  <p className="text-ink-soft text-sm">
                    This is a demonstration checkout. No real payment is processed. Placing the
                    order will simply confirm the flow.
                  </p>
                  <div className="mt-5 space-y-3">
                    <input
                      placeholder="Card number (demo)"
                      className="border-teak/25 bg-bone focus:border-indigo w-full rounded-lg border px-4 py-3 text-sm outline-none"
                    />
                    <div className="flex gap-3">
                      <input
                        placeholder="MM / YY"
                        className="border-teak/25 bg-bone focus:border-indigo w-1/2 rounded-lg border px-4 py-3 text-sm outline-none"
                      />
                      <input
                        placeholder="CVC"
                        className="border-teak/25 bg-bone focus:border-indigo w-1/2 rounded-lg border px-4 py-3 text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="text-ink-soft hover:text-ink text-sm"
              >
                ← Back
              </button>
            ) : (
              <Link href="/shop" className="text-ink-soft hover:text-ink text-sm">
                ← Continue shopping
              </Link>
            )}
            {step < 3 ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                className="bg-indigo text-bone hover:bg-indigo-deep rounded-full px-7 py-3 text-sm"
              >
                {step === 1 ? "Checkout" : "Continue to payment"}
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setPlaced(true);
                  clear();
                }}
                className="bg-indigo text-bone hover:bg-indigo-deep rounded-full px-7 py-3 text-sm"
              >
                Place order — {formatPrice(totalCents)}
              </motion.button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="border-teak/15 bg-bone/60 h-fit rounded-2xl border p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-xl">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">Subtotal</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">Shipping</span>
              <span>{shippingCents === 0 ? "Free" : formatPrice(shippingCents)}</span>
            </div>
            <div className="border-teak/15 mt-2 flex justify-between border-t pt-3 text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(totalCents)}</span>
            </div>
          </div>
          <p className="text-ink-soft mt-4 text-xs">
            Free shipping on orders over {formatPrice(500000)}. Handmade to order.
          </p>
        </aside>
      </div>
    </div>
  );
}
