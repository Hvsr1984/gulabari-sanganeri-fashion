"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type { Product } from "@/db/schema";
import { ProductCard } from "./product-card";

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

  const clearAll = () =>
    setActive({ garment: [], motifFamily: [], colorway: [] });

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
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
            {filter.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {options[filter.key].map((value) => {
              const on = active[filter.key].includes(value);
              return (
                <button
                  key={value}
                  onClick={() => toggle(filter.key, value)}
                  className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
                    on
                      ? "border-indigo bg-indigo text-bone"
                      : "border-teak/25 text-ink-soft hover:border-indigo"
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
              <button onClick={clearAll} className="text-xs text-indigo hover:underline">
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
            className="rounded-full border border-teak/25 px-4 py-2 text-sm lg:hidden"
          >
            Filter ({activeChips.length})
          </button>
          <p className="hidden text-sm text-ink-soft lg:block">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-ink-soft">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-teak/25 bg-bone px-3 py-2 text-sm outline-none"
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
          <div className="mb-6 flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <motion.button
                key={`${chip.key}-${chip.value}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.25 }}
                onClick={() => toggle(chip.key, chip.value)}
                className="flex items-center gap-1.5 rounded-full bg-bone-deep px-3 py-1.5 text-sm capitalize"
              >
                {chip.value}
                <span className="text-ink-soft">✕</span>
              </motion.button>
            ))}
          </div>
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
          <div className="py-24 text-center text-ink-soft">
            <p>No pieces match these filters yet.</p>
            <button onClick={clearAll} className="mt-3 text-indigo hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {panelOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPanelOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-bone p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-serif text-xl">Filter</h2>
                <button onClick={() => setPanelOpen(false)}>✕</button>
              </div>
              {Sidebar}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={clearAll}
                  className="flex-1 rounded-full border border-teak/25 py-3 text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="flex-1 rounded-full bg-indigo py-3 text-sm text-bone"
                >
                  Show {filtered.length}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
