"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type { Product } from "@/db/schema";
import { ProductCard } from "./product-card";
import { DialogShell } from "./dialog-shell";

type FilterKey = "garment" | "motifFamily" | "colorway";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "garment", label: "Garment" },
  { key: "motifFamily", label: "Motif" },
  { key: "colorway", label: "Colourway" },
];

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

export function ShopBrowser({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Record<FilterKey, string[]>>({
    garment: [],
    motifFamily: [],
    colorway: [],
  });
  const [sort, setSort] = useState<SortKey>("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  const options = useMemo(() => {
    const build = (key: FilterKey) =>
      Array.from(new Set(products.map((p) => p[key] as string))).sort();
    return {
      garment: build("garment"),
      motifFamily: build("motifFamily"),
      colorway: build("colorway"),
    };
  }, [products]);

  const toggle = (key: FilterKey, value: string) => {
    setActive((prev) => {
      const set = new Set(prev[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...prev, [key]: Array.from(set) };
    });
  };

  const clearAll = () => setActive({ garment: [], motifFamily: [], colorway: [] });

  const filtered = useMemo(() => {
    const list = products.filter((p) =>
      (Object.keys(active) as FilterKey[]).every(
        (key) => active[key].length === 0 || active[key].includes(p[key] as string)
      )
    );
    if (sort === "price-asc") list.sort((a, b) => a.priceCents - b.priceCents);
    else if (sort === "price-desc") list.sort((a, b) => b.priceCents - a.priceCents);
    else list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [products, active, sort]);

  const activeChips = (Object.keys(active) as FilterKey[]).flatMap((key) =>
    active[key].map((value) => ({ key, value }))
  );

  const Sidebar = (
    <div className="space-y-7">
      {FILTERS.map((filter) => (
        <div key={filter.key}>
          <p className="text-ink-soft mb-2 text-xs font-semibold tracking-widest uppercase">
            {filter.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {options[filter.key].map((value) => {
              const on = active[filter.key].includes(value);
              return (
                <button
                  key={value}
                  onClick={() => toggle(filter.key, value)}
                  aria-pressed={on}
                  className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-all duration-200 active:scale-95 ${
                    on
                      ? "border-indigo bg-indigo text-bone shadow-sm"
                      : "border-teak/25 text-ink-soft hover:border-indigo hover:text-ink"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl">Filter</h2>
            {activeChips.length > 0 && (
              <button onClick={clearAll} className="text-indigo text-xs hover:underline">
                Clear
              </button>
            )}
          </div>
          {Sidebar}
        </div>
      </aside>

      <div>
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setPanelOpen(true)}
            className="border-teak/25 rounded-full border px-4 py-2 text-sm lg:hidden"
          >
            Filter ({activeChips.length})
          </button>
          <p className="text-ink-soft hidden text-sm lg:block" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-ink-soft">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort the collection"
              className="border-teak/25 bg-bone rounded-full border px-3 py-2 text-sm"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Active chips */}
        {activeChips.length > 0 && (
          <motion.div layout className="mb-6 flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <motion.button
                key={`${chip.key}-${chip.value}`}
                layout
                initial={{ scale: 0.86, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.86, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                onClick={() => toggle(chip.key, chip.value)}
                className="border-teak/20 bg-bone-deep hover:border-madder/40 hover:text-madder flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm capitalize transition-colors"
                aria-label={`Remove filter ${chip.value}`}
              >
                {chip.value}
                <span aria-hidden="true" className="text-ink-soft">
                  ✕
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <div className="text-ink-soft py-24 text-center">
            <p>No pieces match these filters yet.</p>
            <button onClick={clearAll} className="text-indigo mt-3 hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter sheet — focus-trapped, Escape-dismissable */}
      <DialogShell
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        label="Filter the collection"
        variant="bottom"
        panelClassName="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-teak/20 bg-bone p-6 lg:hidden"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-xl">Filter</h2>
          <button
            onClick={() => setPanelOpen(false)}
            className="border-teak/20 text-ink-soft hover:border-ink hover:text-ink rounded-full border p-2"
            aria-label="Close filters"
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
        {Sidebar}
        <div className="mt-6 flex gap-3">
          <button
            onClick={clearAll}
            className="border-teak/25 flex-1 rounded-full border py-3 text-sm"
          >
            Clear
          </button>
          <button
            onClick={() => setPanelOpen(false)}
            className="bg-indigo text-bone flex-1 rounded-full py-3 text-sm"
          >
            Show {filtered.length}
          </button>
        </div>
      </DialogShell>
    </div>
  );
}
