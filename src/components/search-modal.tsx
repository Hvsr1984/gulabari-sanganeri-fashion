"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { productSeed } from "@/db/seed-data";
import { formatPrice } from "./cart-context";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const filtered = query.trim()
    ? productSeed.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.garment.toLowerCase().includes(q) ||
          p.motifFamily.toLowerCase().includes(q) ||
          p.colorway.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/70 backdrop-blur-md"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-bone p-6 cloth-shadow-lg"
          >
            <div className="relative flex items-center border-b border-teak/20 pb-4">
              <svg className="h-5 w-5 text-teak mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => startTransition(() => setQuery(e.target.value))}
                placeholder="Search kurtas, dupattas, motifs (buti, bel, jaal), indigo..."
                className="w-full bg-transparent font-serif text-lg text-ink placeholder-ink-soft/50 outline-none"
              />
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-ink-soft hover:bg-teak/10"
                aria-label="Close search"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Suggestions or Results */}
            <div className="mt-4 max-h-96 overflow-y-auto">
              {!query.trim() ? (
                <div className="py-6">
                  <p className="text-xs uppercase tracking-widest text-teak">Suggested Searches</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Indigo Kurta", "Madder Dupatta", "Turmeric Dress", "Sage Shirt", "Buti Sprig", "Floral Jaal"].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="rounded-full border border-teak/20 px-3.5 py-1.5 text-xs text-ink-soft hover:border-indigo hover:text-indigo transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-8 text-center text-ink-soft">
                  <p className="font-serif text-lg">No pieces found matching &ldquo;{query}&rdquo;</p>
                  <p className="mt-1 text-xs">Try searching for cotton, buta, dupatta, or indigo.</p>
                </div>
              ) : (
                <div className="divide-y divide-teak/10">
                  {filtered.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/shop/${item.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-4 py-3 hover:bg-teak/5 px-2 rounded-lg transition-colors"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-serif text-sm font-medium text-ink group-hover:text-indigo">
                          {item.name}
                        </p>
                        <p className="text-xs text-teak capitalize">
                          {item.garment} · {item.motifFamily} motif · {item.colorway}
                        </p>
                      </div>
                      <span className="font-serif text-sm text-ink">{formatPrice(item.priceCents)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
