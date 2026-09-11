"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Product } from "@/db/schema";
import { useCart, formatPrice } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { MOTIF_GLYPHS, type MotifKey } from "./motif-glyphs";
import { MOTIFS } from "@/lib/content";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const reduce = useReducedMotion();

  // Gallery array
  const gallery = [
    product.image,
    product.secondaryImage || "/images/lookbook.jpg",
    "/images/fabric-macro.jpg",
    "/images/craft-press.jpg",
  ].filter(Boolean) as string[];

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [macroZoom, setMacroZoom] = useState(false);

  // 3D Parallax tilt state
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const wishlisted = isInWishlist(product.slug);
  const motifInfo = MOTIFS.find((m) => m.key === product.motifFamily);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleAdd = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        image: product.image,
        priceCents: product.priceCents,
        size,
        colorway: product.colorway,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      slug: product.slug,
      name: product.name,
      image: product.image,
      priceCents: product.priceCents,
      garment: product.garment,
      motifFamily: product.motifFamily,
      fabric: product.fabric,
    });
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Top Product Showcase: Gallery + Buy Box */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: Large Product Photography with 3D Tilt & Thumbnails */}
        <div className="lg:col-span-7">
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="perspective-1000 relative"
          >
            <motion.div
              animate={
                reduce
                  ? {}
                  : {
                      rotateY: tilt.x,
                      rotateX: tilt.y,
                    }
              }
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-2xl bg-bone-deep cloth-shadow-lg"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt={`${product.name} view ${activeImg + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025] ${
                    macroZoom ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                  }`}
                  onClick={() => setMacroZoom((prev) => !prev)}
                />
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="rounded-full craft-pill px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
                  {product.craftType || "Hand Block Printed"}
                </span>
                <span className="rounded-full bg-indigo px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-bone border border-indigo-deep/20 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                  Sanganeri Cotton
                </span>
              </div>

              {/* Macro Inspection Button */}
              <button
                onClick={() => setMacroZoom((prev) => !prev)}
                className="absolute bottom-4 right-4 z-10 rounded-full craft-pill px-3.5 py-1.5 text-xs font-medium text-ink hover:bg-bone-deep transition-colors"
              >
                {macroZoom ? "Reset Zoom" : "🔍 Tap to Inspect Weave"}
              </button>
            </motion.div>
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {gallery.map((img, i) => (
              <button
                key={img}
                onClick={() => {
                  setActiveImg(i);
                  setMacroZoom(false);
                }}
                className={`relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  activeImg === i ? "border-indigo scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Purchase Box */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-teak font-medium">
                {motifInfo && (() => {
                  const Glyph = MOTIF_GLYPHS[product.motifFamily as MotifKey];
                  return Glyph ? <Glyph className="h-4 w-4 text-teak" /> : null;
                })()}
                <span>
                  {product.colorway} · {product.garment}
                </span>
              </div>

              <button
                onClick={handleToggleWishlist}
                className="flex items-center gap-1.5 rounded-full border border-teak/20 px-3 py-1 text-xs text-ink-soft hover:border-madder hover:text-madder transition-colors"
                aria-label="Toggle wishlist"
              >
                <svg
                  className={`h-4 w-4 ${wishlisted ? "fill-madder text-madder" : "fill-none stroke-current"}`}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{wishlisted ? "Saved" : "Save"}</span>
              </button>
            </div>

            <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink tracking-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-base text-ink-soft italic">{product.tagline}</p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-ink">
                {formatPrice(product.priceCents)}
              </span>
              <span className="text-xs text-ink-soft">Tax included · Free shipping across India</span>
            </div>

            {/* Quick Specs Table */}
            <div className="mt-6 divide-y divide-teak/15 border-t border-b border-teak/15 py-3 text-xs text-ink-soft">
              <div className="flex justify-between py-2">
                <span className="font-semibold text-ink">Fabric</span>
                <span>{product.fabric}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-ink">Print Type</span>
                <span>Hand Block Printed (Teak &amp; Sheesham)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-ink">Motif Family</span>
                <span className="capitalize">{product.motifName || `${product.motifFamily} motif`}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-ink">Craft Origin</span>
                <span>Sanganer, Jaipur, Rajasthan</span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-semibold uppercase tracking-wider text-ink">Select Size</span>
                <span className="text-teak">Relaxed comfort fit</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-[48px] rounded-xl border py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-all ${
                      size === s
                        ? "border-indigo bg-indigo text-bone shadow-md"
                        : "border-teak/25 bg-bone text-ink hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink">Quantity</span>
              <div className="inline-flex items-center rounded-full border border-teak/30 bg-bone px-3 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-ink-soft hover:text-ink text-sm"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-3 text-sm font-semibold text-ink">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 text-ink-soft hover:text-ink text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="mt-10 pt-6 border-t border-teak/15">
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.98 }}
              className={`w-full rounded-full py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-lg ${
                added
                  ? "bg-sage text-bone"
                  : "bg-ink text-bone hover:bg-indigo hover:shadow-xl"
              }`}
            >
              {added ? "Added to Cart ✓" : `Add to Cart — ${formatPrice(product.priceCents * quantity)}`}
            </motion.button>
            <p className="mt-3 text-center text-xs text-ink-soft">
              Dispatches within 5–7 days · Each piece is printed by hand
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Below-The-Fold Editorial Sections:
          THE FABRIC, THE PRINT, THE MAKING, CARE */}
      <div className="border-t border-teak/15 pt-16">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
            Editorial Anatomy
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-ink">
            Craftsmanship &amp; Materiality
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* THE FABRIC */}
          <div className="rounded-2xl border border-teak/15 bg-cotton p-6 cloth-shadow">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo/10 text-indigo mb-4">
              <span className="font-mono text-sm font-bold">01</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-ink">THE FABRIC</h3>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              {product.fabric}. Sourced from unbleached natural cotton grown and woven in India.
              The fabric is washed, scoured, and bleached in open sunlight to maintain its natural
              fiber breathability and airy softness against the skin.
            </p>
          </div>

          {/* THE PRINT */}
          <div className="rounded-2xl border border-teak/15 bg-cotton p-6 cloth-shadow">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-madder/10 text-madder mb-4">
              <span className="font-mono text-sm font-bold">02</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-ink">THE PRINT</h3>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              {product.motifNotes ||
                "Printed using hand-carved relief blocks. The outline block (rekha) is stamped first to establish the motif boundary, followed by the fill blocks (datta) that introduce the rich pigments."}
            </p>
          </div>

          {/* THE MAKING */}
          <div className="rounded-2xl border border-teak/15 bg-cotton p-6 cloth-shadow">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teak/10 text-teak mb-4">
              <span className="font-mono text-sm font-bold">03</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-ink">THE MAKING</h3>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              {product.printedNotes ||
                "Carried down a sixty-foot padded table by a master Chippa artisan. Alignment is achieved purely through human touch and vision, followed by sun drying in open courtyards."}
            </p>
          </div>

          {/* CARE */}
          <div className="rounded-2xl border border-teak/15 bg-cotton p-6 cloth-shadow">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage mb-4">
              <span className="font-mono text-sm font-bold">04</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-ink">CARE</h3>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              {product.careNotes ||
                "Gentle hand wash in cold water using a mild pH-neutral detergent. Dry flat in the shade. The natural botanical color will mellow gracefully over the years."}
            </p>
          </div>
        </div>

        {/* Large Macro Fabric Banner */}
        <div className="mt-14 overflow-hidden rounded-2xl bg-bone-deep border border-teak/20 cloth-shadow relative">
          <div className="grid lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 sm:p-12">
              <span className="text-[11px] uppercase tracking-widest font-mono text-teak">
                Textile Inspection
              </span>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-ink">
                Close-Up Natural Weave &amp; Pigment
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Notice the microscopic cotton slubs and hand-stamped pigment saturation.
                Every length of cloth carries tiny organic variations where the carver&apos;s chisel
                and the printer&apos;s strike met the natural cloth.
              </p>
              <div className="mt-6 flex gap-4 text-xs text-teak font-medium">
                <span>✓ 100% Breathable Cotton</span>
                <span>✓ Chemical-Free Mordanting</span>
              </div>
            </div>
            <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/fabric-macro.jpg"
                alt="Macro fabric view showing weave and indigo print"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
