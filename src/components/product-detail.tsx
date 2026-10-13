"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Product } from "@/db/schema";
import { useCart, formatPrice } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { MOTIF_GLYPHS, type MotifKey } from "./motif-glyphs";
import { MOTIFS } from "@/lib/content";
import { CraftImage } from "./craft-image";

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
              className="bg-bone-deep cloth-shadow-lg relative aspect-[3/4] w-full overflow-hidden rounded-2xl sm:aspect-[4/5]"
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
                <span className="craft-pill text-ink rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase">
                  {product.craftType || "Hand Block Printed"}
                </span>
                <span className="bg-indigo text-bone border-indigo-deep/20 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                  Sanganeri Cotton
                </span>
              </div>

              {/* Macro Inspection Button */}
              <button
                onClick={() => setMacroZoom((prev) => !prev)}
                className="craft-pill text-ink hover:bg-bone-deep absolute right-4 bottom-4 z-10 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
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
                  activeImg === i
                    ? "border-indigo scale-105 shadow-md"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <CraftImage
                  src={img}
                  alt=""
                  sizes="80px"
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover"
                  quality={55}
                  reveal={false}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Purchase Box */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="text-teak flex items-center gap-2 text-xs font-medium tracking-widest uppercase">
                {motifInfo &&
                  (() => {
                    const Glyph = MOTIF_GLYPHS[product.motifFamily as MotifKey];
                    return Glyph ? <Glyph className="text-teak h-4 w-4" /> : null;
                  })()}
                <span>
                  {product.colorway} · {product.garment}
                </span>
              </div>

              <button
                onClick={handleToggleWishlist}
                className="border-teak/20 text-ink-soft hover:border-madder hover:text-madder flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors"
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

            <h1 className="text-ink mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {product.name}
            </h1>
            <p className="text-ink-soft mt-2 text-base italic">{product.tagline}</p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-ink font-serif text-3xl font-semibold">
                {formatPrice(product.priceCents)}
              </span>
              <span className="text-ink-soft text-xs">
                Tax included · Free shipping across India
              </span>
            </div>

            {/* Quick Specs Table */}
            <div className="divide-teak/15 border-teak/15 text-ink-soft mt-6 divide-y border-t border-b py-3 text-xs">
              <div className="flex justify-between py-2">
                <span className="text-ink font-semibold">Fabric</span>
                <span>{product.fabric}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-ink font-semibold">Print Type</span>
                <span>Hand Block Printed (Teak &amp; Sheesham)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-ink font-semibold">Motif Family</span>
                <span className="capitalize">
                  {product.motifName || `${product.motifFamily} motif`}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-ink font-semibold">Craft Origin</span>
                <span>Sanganer, Jaipur, Rajasthan</span>
              </div>
            </div>

            <p className="text-ink-soft mt-6 text-sm leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="mb-2.5 flex items-center justify-between text-xs">
                <span className="text-ink font-semibold tracking-wider uppercase">
                  Select Size
                </span>
                <span className="text-teak">Relaxed comfort fit</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-[48px] rounded-xl border px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all ${
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
              <span className="text-ink text-xs font-semibold tracking-wider uppercase">
                Quantity
              </span>
              <div className="border-teak/30 bg-bone inline-flex items-center rounded-full border px-3 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-ink-soft hover:text-ink px-2 py-1 text-sm"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-ink px-3 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-ink-soft hover:text-ink px-2 py-1 text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="border-teak/15 mt-10 border-t pt-6">
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.98 }}
              className={`w-full rounded-full py-4 text-xs font-semibold tracking-[0.2em] uppercase shadow-lg transition-all ${
                added ? "bg-sage text-bone" : "bg-ink text-bone hover:bg-indigo hover:shadow-xl"
              }`}
            >
              {added
                ? "Added to Cart ✓"
                : `Add to Cart — ${formatPrice(product.priceCents * quantity)}`}
            </motion.button>
            <p className="text-ink-soft mt-3 text-center text-xs">
              Dispatches within 5–7 days · Each piece is printed by hand
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Below-The-Fold Editorial Sections:
          THE FABRIC, THE PRINT, THE MAKING, CARE */}
      <div className="border-teak/15 border-t pt-16">
        <div className="mb-12 max-w-3xl">
          <span className="text-teak text-xs font-medium tracking-[0.25em] uppercase">
            Editorial Anatomy
          </span>
          <h2 className="text-ink mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            Craftsmanship &amp; Materiality
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* THE FABRIC */}
          <div className="border-teak/15 bg-cotton cloth-shadow rounded-2xl border p-6">
            <div className="bg-indigo/10 text-indigo mb-4 flex h-10 w-10 items-center justify-center rounded-full">
              <span className="font-mono text-sm font-bold">01</span>
            </div>
            <h3 className="text-ink font-serif text-xl font-semibold">THE FABRIC</h3>
            <p className="text-ink-soft mt-3 text-xs leading-relaxed">
              {product.fabric}. Sourced from unbleached natural cotton grown and woven in India.
              The fabric is washed, scoured, and bleached in open sunlight to maintain its
              natural fiber breathability and airy softness against the skin.
            </p>
          </div>

          {/* THE PRINT */}
          <div className="border-teak/15 bg-cotton cloth-shadow rounded-2xl border p-6">
            <div className="bg-madder/10 text-madder mb-4 flex h-10 w-10 items-center justify-center rounded-full">
              <span className="font-mono text-sm font-bold">02</span>
            </div>
            <h3 className="text-ink font-serif text-xl font-semibold">THE PRINT</h3>
            <p className="text-ink-soft mt-3 text-xs leading-relaxed">
              {product.motifNotes ||
                "Printed using hand-carved relief blocks. The outline block (rekha) is stamped first to establish the motif boundary, followed by the fill blocks (datta) that introduce the rich pigments."}
            </p>
          </div>

          {/* THE MAKING */}
          <div className="border-teak/15 bg-cotton cloth-shadow rounded-2xl border p-6">
            <div className="bg-teak/10 text-teak mb-4 flex h-10 w-10 items-center justify-center rounded-full">
              <span className="font-mono text-sm font-bold">03</span>
            </div>
            <h3 className="text-ink font-serif text-xl font-semibold">THE MAKING</h3>
            <p className="text-ink-soft mt-3 text-xs leading-relaxed">
              {product.printedNotes ||
                "Carried down a sixty-foot padded table by a master Chippa artisan. Alignment is achieved purely through human touch and vision, followed by sun drying in open courtyards."}
            </p>
          </div>

          {/* CARE */}
          <div className="border-teak/15 bg-cotton cloth-shadow rounded-2xl border p-6">
            <div className="bg-sage/10 text-sage mb-4 flex h-10 w-10 items-center justify-center rounded-full">
              <span className="font-mono text-sm font-bold">04</span>
            </div>
            <h3 className="text-ink font-serif text-xl font-semibold">CARE</h3>
            <p className="text-ink-soft mt-3 text-xs leading-relaxed">
              {product.careNotes ||
                "Gentle hand wash in cold water using a mild pH-neutral detergent. Dry flat in the shade. The natural botanical color will mellow gracefully over the years."}
            </p>
          </div>
        </div>

        {/* Large Macro Fabric Banner */}
        <div className="bg-bone-deep border-teak/20 cloth-shadow relative mt-14 overflow-hidden rounded-2xl border">
          <div className="grid items-center lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-6">
              <span className="text-teak font-mono text-[11px] tracking-widest uppercase">
                Textile Inspection
              </span>
              <h3 className="text-ink mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                Close-Up Natural Weave &amp; Pigment
              </h3>
              <p className="text-ink-soft mt-4 text-sm leading-relaxed">
                Notice the microscopic cotton slubs and hand-stamped pigment saturation. Every
                length of cloth carries tiny organic variations where the carver&apos;s chisel
                and the printer&apos;s strike met the natural cloth.
              </p>
              <div className="text-teak mt-6 flex gap-4 text-xs font-medium">
                <span>✓ 100% Breathable Cotton</span>
                <span>✓ Chemical-Free Mordanting</span>
              </div>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:col-span-6">
              <CraftImage
                src="/images/fabric-macro.jpg"
                alt="Macro fabric view showing cotton weave and botanical print"
                sizes="(max-width: 1024px) 92vw, 50vw"
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
