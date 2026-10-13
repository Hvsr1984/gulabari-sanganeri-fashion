"use client";

import { useDeferredValue, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { productSeed } from "@/db/seed-data";
import { formatPrice } from "./cart-context";
import { DialogShell } from "./dialog-shell";
import { CraftImage } from "./craft-image";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SUGGESTIONS = [
  "Indigo Kurta",
  "Madder Dupatta",
  "Turmeric Dress",
  "Sage Shirt",
  "Buti Sprig",
  "Floral Jaal",
];

const RESULT_ROW =
  "group flex items-center gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-teak/[0.06]";

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  /**
   * Search state lives in an inner component that is only mounted while the
   * palette is open, so closing it discards the query with no effect-driven
   * reset (the previous `setQuery("")` inside useEffect).
   */
  return (
    <DialogShell
      open={isOpen}
      onClose={onClose}
      label="Search the collection"
      variant="top"
      className="flex items-start justify-center px-4 pt-20 sm:px-6"
      panelClassName="relative z-10 w-full max-w-2xl rounded-2xl border border-teak/15 bg-bone p-5 cloth-shadow-lg sm:p-6"
    >
      <SearchPanel onClose={onClose} />
    </DialogShell>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  // Keeps typing buttery on long result lists without a transition wrapper.
  const deferredQuery = useDeferredValue(query);

  const trimmed = deferredQuery.trim().toLowerCase();
  const results = trimmed
    ? productSeed.filter((product) =>
        [
          product.name,
          product.garment,
          product.motifFamily,
          product.colorway,
          product.description,
          product.fabric,
        ]
          .join(" ")
          .toLowerCase()
          .includes(trimmed)
      )
    : [];

  return (
    <>
      <div className="border-teak/20 flex items-center gap-3 border-b pb-4">
        <svg
          className="text-teak h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          data-autofocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search kurtas, dupattas, motifs (buti, bel, jaal), indigo…"
          aria-label="Search pieces"
          className="text-ink placeholder:text-ink-soft/60 w-full bg-transparent font-serif text-lg outline-none"
        />
        <kbd className="border-teak/25 text-ink-faint hidden shrink-0 rounded border px-2 py-1 font-mono text-[10px] tracking-wider uppercase sm:block">
          Esc
        </kbd>
        <button
          onClick={onClose}
          className="text-ink-soft hover:bg-teak/10 hover:text-ink shrink-0 rounded-full p-1.5 transition-colors"
          aria-label="Close search"
        >
          <svg
            className="h-5 w-5"
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

      <div className="mt-4 max-h-[60vh] overflow-y-auto" aria-live="polite">
        {!query.trim() ? (
          <div className="py-6">
            <p className="text-teak text-xs tracking-widest uppercase">Suggested searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((tag, index) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * index, duration: 0.25 }}
                  onClick={() => setQuery(tag)}
                  className="border-teak/20 text-ink-soft hover:border-indigo hover:text-indigo rounded-full border px-3.5 py-1.5 text-xs transition-colors"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-ink-soft py-8 text-center">
            <p className="font-serif text-lg">
              No pieces found matching &ldquo;{query.trim()}&rdquo;
            </p>
            <p className="mt-1 text-xs">Try cotton, buta, dupatta, or indigo.</p>
          </div>
        ) : (
          <>
            <p className="text-teak mb-1 text-xs tracking-widest uppercase">
              {results.length} {results.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="divide-teak/10 divide-y">
              {results.map((item, index) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.035, 0.25), duration: 0.28 }}
                >
                  <Link href={`/shop/${item.slug}`} onClick={onClose} className={RESULT_ROW}>
                    <CraftImage
                      src={item.image}
                      alt={`${item.name} — ${item.garment}`}
                      sizes="56px"
                      wrapperClassName="h-16 w-13 shrink-0 overflow-hidden rounded-lg bg-bone-deep"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      quality={70}
                    />
                    <span className="flex-1">
                      <span className="text-ink group-hover:text-indigo block font-serif text-sm font-medium transition-colors">
                        {item.name}
                      </span>
                      <span className="text-teak block text-xs capitalize">
                        {item.garment} · {item.motifFamily} motif · {item.colorway}
                      </span>
                    </span>
                    <span className="text-ink font-serif text-sm">
                      {formatPrice(item.priceCents)}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
