"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart, formatPrice } from "./cart-context";

export function Checkout() {
  const { items, updateQty, removeItem, subtotalCents, clear, count } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [placed, setPlaced] = useState(false);

  const shippingCents = subtotalCents > 0 && subtotalCents < 500000 ? 15000 : 0;
  const totalCents = subtotalCents + shippingCents;

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo text-2xl text-bone">
          ✓
        </div>
        <h1 className="mt-6 font-serif text-3xl">Order confirmed</h1>
        <p className="mt-3 text-ink-soft">
          Thank you. This is a demo checkout — no payment was taken. Your pieces would
          be made to order and dispatched within 5–7 days.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-indigo px-6 py-3 text-sm text-bone hover:bg-indigo-deep"
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
        <p className="mt-3 text-ink-soft">
          Nothing here yet — the collection is waiting.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-indigo px-6 py-3 text-sm text-bone hover:bg-indigo-deep"
        >
          Browse the collection
        </Link>
      </div>
    );
  }

  const steps = ["Cart", "Details", "Payment"];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      {/* Step progress */}
      <div className="mb-10 flex items-center gap-3">
        {steps.map((label, i) => {
          const n = (i + 1) as 1 | 2 | 3;
          const active = step >= n;
          return (
            <div key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                    active ? "bg-indigo text-bone" : "bg-bone-deep text-ink-soft"
                  }`}
                >
                  {n}
                </span>
                <span className={`text-sm ${active ? "text-ink" : "text-ink-soft"}`}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && <span className="h-px w-8 bg-teak/30" />}
            </div>
          );
        })}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {step === 1 && (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.slug}-${item.size}`}
                  className="flex gap-4 border-b border-teak/15 pb-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-24 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm capitalize text-ink-soft">
                          {item.colorway} · Size {item.size}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.priceCents * item.qty)}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-teak/25">
                        <button
                          onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                          className="px-3 py-1 text-ink-soft"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                          className="px-3 py-1 text-ink-soft"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug, item.size)}
                        className="text-xs text-ink-soft hover:text-madder"
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
                  <label className="text-sm text-ink-soft">{label}</label>
                  <input
                    type={type}
                    required
                    className="w-full border-b border-teak/30 bg-transparent py-2.5 outline-none focus:border-indigo"
                  />
                </div>
              ))}
            </form>
          )}

          {step === 3 && (
            <div className="rounded-2xl border border-teak/15 bg-bone/60 p-6">
              <p className="text-sm text-ink-soft">
                This is a demonstration checkout. No real payment is processed.
                Placing the order will simply confirm the flow.
              </p>
              <div className="mt-5 space-y-3">
                <input
                  placeholder="Card number (demo)"
                  className="w-full rounded-lg border border-teak/25 bg-bone px-4 py-3 text-sm outline-none focus:border-indigo"
                />
                <div className="flex gap-3">
                  <input
                    placeholder="MM / YY"
                    className="w-1/2 rounded-lg border border-teak/25 bg-bone px-4 py-3 text-sm outline-none focus:border-indigo"
                  />
                  <input
                    placeholder="CVC"
                    className="w-1/2 rounded-lg border border-teak/25 bg-bone px-4 py-3 text-sm outline-none focus:border-indigo"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="text-sm text-ink-soft hover:text-ink"
              >
                ← Back
              </button>
            ) : (
              <Link href="/shop" className="text-sm text-ink-soft hover:text-ink">
                ← Continue shopping
              </Link>
            )}
            {step < 3 ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                className="rounded-full bg-indigo px-7 py-3 text-sm text-bone hover:bg-indigo-deep"
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
                className="rounded-full bg-indigo px-7 py-3 text-sm text-bone hover:bg-indigo-deep"
              >
                Place order — {formatPrice(totalCents)}
              </motion.button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-teak/15 bg-bone/60 p-6 lg:sticky lg:top-24">
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
            <div className="mt-2 flex justify-between border-t border-teak/15 pt-3 text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(totalCents)}</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            Free shipping on orders over {formatPrice(500000)}. Handmade to order.
          </p>
        </aside>
      </div>
    </div>
  );
}
