"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MOTIFS } from "@/lib/content";
import { Reveal } from "./reveal";

export function MotifsSection() {
  const [hoveredMotif, setHoveredMotif] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-bone py-24 sm:py-32 border-b border-teak/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
                Botanical Language of Rajasthan
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
                MOTIFS OF SANGANER
              </h2>
            </div>
            <p className="max-w-md text-sm text-ink-soft leading-relaxed">
              Every carved block carries a centuries-old vocabulary. Explore the tactile swatches below,
              each stamped by hand onto unbleached cotton grounds.
            </p>
          </div>
        </Reveal>

        {/* 3D Tactile Swatch Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {MOTIFS.map((motif, idx) => {
            return (
              <Reveal key={motif.key} delay={idx * 0.08}>
                <motion.div
                  onMouseEnter={() => setHoveredMotif(motif.key)}
                  onMouseLeave={() => setHoveredMotif(null)}
                  whileHover={reduce ? {} : { y: -8, rotateZ: idx % 2 === 0 ? 0.6 : -0.6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="group relative flex flex-col rounded-2xl bg-cotton p-5 border border-teak/20 swatch-card transition-shadow hover:cloth-shadow-lg"
                >
                  {/* Swatch Image Area with Realistic Fabric Pin / Paper Feel */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-bone-deep shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={motif.swatchImage}
                      alt={`${motif.name} hand block printed textile swatch`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle textile sheen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                    {/* Swatch Label Badge */}
                    <div className="absolute bottom-3 left-3 rounded-full craft-pill px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-teak">
                      Hand-Stamped Swatch
                    </div>
                  </div>

                  {/* Swatch Details */}
                  <div className="mt-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-2xl font-semibold text-ink group-hover:text-indigo transition-colors">
                          {motif.name}
                        </h3>
                        <span className="font-mono text-xs text-teak uppercase tracking-widest">
                          0{idx + 1}
                        </span>
                      </div>

                      <p className="mt-2 text-xs font-medium text-teak italic">
                        {motif.short}
                      </p>

                      <p className="mt-3 text-xs leading-relaxed text-ink-soft line-clamp-3">
                        {motif.long}
                      </p>

                      {/* Named Motifs Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {motif.named.map((n) => (
                          <span
                            key={n}
                            className="rounded-full bg-bone px-2.5 py-1 text-[10px] text-ink-soft border border-teak/15"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-teak/10 flex items-center justify-between">
                      <Link
                        href={`/shop?family=${motif.key}`}
                        className="text-xs font-semibold uppercase tracking-wider text-indigo hover:text-indigo-deep hover:underline inline-flex items-center gap-1"
                      >
                        Shop {motif.name} Pieces →
                      </Link>

                      <Link
                        href="/craft"
                        className="text-xs text-ink-faint hover:text-ink transition-colors"
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
