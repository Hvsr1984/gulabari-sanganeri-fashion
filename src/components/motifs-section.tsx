"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MOTIFS } from "@/lib/content";
import { Reveal } from "./reveal";
import { MOTIF_GLYPHS, type MotifKey } from "./motif-glyphs";
import { CraftImage } from "./craft-image";

export function MotifsSection() {
  const [hoveredMotif, setHoveredMotif] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section className="bg-bone border-teak/10 relative overflow-hidden border-b py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-teak text-xs font-medium tracking-[0.25em] uppercase">
                Botanical Language of Rajasthan
              </span>
              <h2 className="text-ink mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
                MOTIFS OF SANGANER
              </h2>
            </div>
            <p className="text-ink-soft max-w-md text-sm leading-relaxed">
              Every carved block carries a centuries-old vocabulary. Explore the tactile
              swatches below, each stamped by hand onto unbleached cotton grounds.
            </p>
          </div>
        </Reveal>

        {/* 3D Tactile Swatch Card Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {MOTIFS.map((motif, idx) => {
            const Glyph = MOTIF_GLYPHS[motif.key as MotifKey];
            return (
              <Reveal key={motif.key} delay={idx * 0.08}>
                <motion.div
                  onMouseEnter={() => setHoveredMotif(motif.key)}
                  onMouseLeave={() => setHoveredMotif(null)}
                  whileHover={
                    reduce ? {} : { y: -10, rotateZ: idx % 2 === 0 ? 0.7 : -0.7, scale: 1.012 }
                  }
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="group bg-cotton border-teak/20 swatch-card hover:cloth-shadow-lg relative flex flex-col rounded-2xl border p-5 transition-shadow"
                >
                  {/* Swatch Image Area with Realistic Fabric Pin / Paper Feel */}
                  <div className="bg-bone-deep relative aspect-square w-full overflow-hidden rounded-xl shadow-inner">
                    <motion.div
                      className="cloth-sheen absolute inset-0"
                      animate={reduce ? {} : { scale: hoveredMotif === motif.key ? 1.05 : 1 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <CraftImage
                        src={motif.swatchImage}
                        alt={`${motif.name} hand block printed textile swatch`}
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 32vw, 30vw"
                        wrapperClassName="h-full w-full"
                        className="h-full w-full object-cover"
                      />
                    </motion.div>

                    {/* Warm textile shading — lifts on hover so the print reads true */}
                    <div className="from-ink/35 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-45 transition-opacity duration-500 group-hover:opacity-15" />

                    {/* The carved block glyph, stamped into the corner on hover */}
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={
                        reduce
                          ? { opacity: 0.9 }
                          : {
                              opacity: hoveredMotif === motif.key ? 1 : 0,
                              scale: hoveredMotif === motif.key ? 1 : 0.85,
                            }
                      }
                      transition={{ type: "spring", stiffness: 320, damping: 24 }}
                      className="craft-pill text-ink pointer-events-none absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full"
                    >
                      <Glyph className="dash-draw h-5 w-5" />
                    </motion.span>

                    {/* Swatch Label Badge */}
                    <div className="craft-pill text-teak pointer-events-none absolute bottom-3 left-3 rounded-full px-3 py-1 font-mono text-[10px] tracking-wider uppercase">
                      Hand-stamped swatch
                    </div>
                  </div>

                  {/* Swatch Details */}
                  <div className="mt-5 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-ink group-hover:text-indigo font-serif text-2xl font-semibold transition-colors">
                          {motif.name}
                        </h3>
                        <span className="text-teak font-mono text-xs tracking-widest uppercase">
                          0{idx + 1}
                        </span>
                      </div>

                      <p className="text-teak mt-2 text-xs font-medium italic">{motif.short}</p>

                      <p className="text-ink-soft mt-3 line-clamp-3 text-xs leading-relaxed">
                        {motif.long}
                      </p>

                      {/* Named Motifs Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {motif.named.map((n, nIdx) => (
                          <motion.span
                            key={n}
                            animate={
                              reduce
                                ? {}
                                : {
                                    y: hoveredMotif === motif.key ? -2 : 0,
                                    transition: { delay: nIdx * 0.045, duration: 0.35 },
                                  }
                            }
                            className="border-teak/15 bg-bone text-ink-soft rounded-full border px-2.5 py-1 text-[10px]"
                          >
                            {n}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="border-teak/10 mt-6 flex items-center justify-between border-t pt-4">
                      <Link
                        href={`/shop?family=${motif.key}`}
                        className="link-underline text-indigo hover:text-indigo-deep inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase"
                      >
                        Shop {motif.name} Pieces →
                      </Link>

                      <Link
                        href="/craft"
                        className="text-ink-faint hover:text-ink text-xs transition-colors"
                      >
                        Read History
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
