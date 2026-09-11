"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./reveal";

const TEXTURE_POINTS = [
  {
    id: 1,
    title: "Spun Cotton Mul Weave",
    desc: "100% breathable unbleached natural cotton with visible spun slubs and micro-fibers that soften with every wash.",
    top: "32%",
    left: "28%",
  },
  {
    id: 2,
    title: "Organic Indigo Pigment",
    desc: "Natural indigo dye absorbed deep into cellulose yarn rather than sitting as a synthetic plastic film on top.",
    top: "54%",
    left: "62%",
  },
  {
    id: 3,
    title: "Human Registration Mark",
    desc: "Slight edge bleed and stamp irregularity—the irreplaceable signature of a Chippa artisan's hand pressure.",
    top: "68%",
    left: "38%",
  },
];

export function FabricTextureExperience() {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [perspectiveOffset, setPerspectiveOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    const x = relX * 100;
    const y = relY * 100;
    setLensPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    if (!reduce) {
      setPerspectiveOffset({
        x: (relX - 0.5) * 12, // 3-6px tactile shift
        y: (relY - 0.5) * 12,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setActivePoint(null);
    setPerspectiveOffset({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden bg-bone py-24 sm:py-32 border-b border-teak/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
              Tactile Textile Examination
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
              FEEL THE CRAFT
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-soft">
              True Sanganeri cloth is never digitally sterile. Move your cursor across the textile
              below to explore the living character of unbleached cotton fibers, natural botanical ink
              variations, and authentic hand-carved block impressions.
            </p>
          </div>
        </Reveal>

        {/* Interactive Fabric Stage */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Main Fabric Canvas with Interactive Magnifier Lens */}
          <div className="lg:col-span-8 perspective-1000">
            <Reveal>
              <div
                ref={containerRef}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className="relative cursor-crosshair overflow-hidden rounded-2xl bg-bone-deep cloth-shadow-lg select-none"
              >
                {/* 3D Tactile Fabric Canvas */}
                <motion.div
                  className="relative h-full w-full will-change-transform"
                  animate={
                    reduce
                      ? {}
                      : {
                          x: isHovering ? perspectiveOffset.x : 0,
                          y: isHovering ? perspectiveOffset.y : 0,
                          rotateX: isHovering ? perspectiveOffset.y * -0.35 : 0,
                          rotateY: isHovering ? perspectiveOffset.x * 0.35 : 0,
                          scale: isHovering ? 1.025 : 1,
                        }
                  }
                  transition={{ type: "spring", damping: 30, stiffness: 120 }}
                >
                  {/* Main Macro Fabric Photography */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/fabric-macro.jpg"
                    alt="Extreme close-up of Sanganeri hand block printed cotton cloth showing fibers and ink"
                    className="aspect-[4/3] sm:aspect-[16/10] w-full object-cover"
                  />

                  {/* Overlay Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
                </motion.div>

                {/* Dynamic Zoom Loupe / Magnifier Lens */}
                {!reduce && isHovering && (
                  <motion.div
                    className="pointer-events-none absolute hidden sm:block h-44 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-bone bg-bone shadow-2xl z-30"
                    style={{
                      left: `${lensPos.x}%`,
                      top: `${lensPos.y}%`,
                    }}
                  >
                    {/* Zoomed portion of the fabric */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/fabric-macro.jpg"
                      alt=""
                      className="absolute max-w-none w-[320%] h-[320%] object-cover"
                      style={{
                        left: `${-lensPos.x * 2.2}%`,
                        top: `${-lensPos.y * 2.2}%`,
                      }}
                    />
                    <div className="absolute inset-0 rounded-full border border-ink/20 shadow-inner" />
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="rounded-full craft-pill px-2.5 py-0.5 text-[9px] font-mono uppercase text-ink">
                        3.2× Macro Weave
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Interactive Inspection Pins */}
                {TEXTURE_POINTS.map((point) => (
                  <button
                    key={point.id}
                    onClick={() => setActivePoint(point.id)}
                    onMouseEnter={() => setActivePoint(point.id)}
                    style={{ top: point.top, left: point.left }}
                    className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    aria-label={point.title}
                  >
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo text-[10px] font-bold text-bone border border-bone/60 shadow-sm transition-transform group-hover:scale-110">
                        {point.id}
                      </span>
                    </span>
                  </button>
                ))}

                {/* Instruction Pill */}
                <div className="absolute bottom-4 left-4 z-20 rounded-full craft-pill px-4 py-1.5 text-xs text-ink">
                  <span>Hover to magnify fibers · Tap pins for craft insights</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Tactile Feature Insights */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-teak/15 bg-cotton p-6 cloth-shadow">
                <span className="text-[11px] uppercase tracking-widest font-mono text-teak">
                  Tactile Qualities
                </span>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-ink">
                  The Feel of Authenticity
                </h3>

                <ul className="mt-5 space-y-4">
                  {TEXTURE_POINTS.map((point) => {
                    const isSelected = activePoint === point.id;
                    return (
                      <li
                        key={point.id}
                        onClick={() => setActivePoint(point.id)}
                        onMouseEnter={() => setActivePoint(point.id)}
                        className={`cursor-pointer rounded-xl p-3.5 transition-all ${
                          isSelected
                            ? "bg-indigo text-bone shadow-md"
                            : "bg-bone/80 text-ink-soft hover:bg-bone hover:text-ink"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                              isSelected ? "bg-bone text-indigo" : "bg-teak/20 text-teak"
                            }`}
                          >
                            {point.id}
                          </span>
                          <p
                            className={`font-serif text-sm font-semibold ${
                              isSelected ? "text-bone" : "text-ink"
                            }`}
                          >
                            {point.title}
                          </p>
                        </div>
                        <p
                          className={`mt-2 text-xs leading-relaxed ${
                            isSelected ? "text-bone/85" : "text-ink-soft"
                          }`}
                        >
                          {point.desc}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
