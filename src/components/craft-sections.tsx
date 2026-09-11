"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { MOTIF_GLYPHS } from "./motif-glyphs";
import { MOTIFS, PROCESS_STEPS, TIMELINE } from "@/lib/content";

export function ProcessScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      {/* Progress rail */}
      <div className="absolute left-4 top-0 h-full w-px bg-teak/20 sm:left-6">
        {!reduce && (
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-indigo"
          />
        )}
      </div>

      <ol className="space-y-16">
        {PROCESS_STEPS.map((step) => (
          <motion.li
            key={step.n}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="relative pl-14 sm:pl-20"
          >
            <span className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-indigo bg-bone font-mono text-xs font-bold text-indigo sm:h-12 sm:w-12 sm:left-1 shadow-sm">
              {step.code || `0${step.n}`}
            </span>

            <div className="grid sm:grid-cols-12 gap-6 items-center rounded-2xl bg-cotton p-6 border border-teak/15 cloth-shadow">
              <div className="sm:col-span-7">
                <span className="text-[10px] uppercase tracking-widest font-mono text-teak font-semibold">
                  Stage {step.code} · {step.hindi}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </div>
              <div className="sm:col-span-5 overflow-hidden rounded-xl aspect-[4/3] bg-bone-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function MotifGallery() {
  const reduce = useReducedMotion();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {MOTIFS.map((motif, idx) => {
        const Glyph = MOTIF_GLYPHS[motif.key];
        return (
          <motion.article
            key={motif.key}
            id={`motif-${motif.key}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: idx * 0.05 }}
            className="rounded-2xl border border-teak/20 bg-cotton p-6 swatch-card flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-bone-deep mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={motif.swatchImage}
                  alt={motif.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full craft-pill text-ink">
                  {Glyph && <Glyph className="h-5 w-5" />}
                </div>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-ink">{motif.name}</h3>
              <p className="mt-1 text-xs text-teak font-medium italic">{motif.short}</p>
              <p className="mt-3 text-xs leading-relaxed text-ink-soft">{motif.long}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-teak/10">
              <ul className="flex flex-wrap gap-1.5">
                {motif.named.map((n) => (
                  <li key={n} className="rounded-full bg-bone px-2.5 py-1 text-[10px] text-ink-soft border border-teak/15">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export function CraftTimeline() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-2 top-2 h-[calc(100%-1rem)] w-px bg-teak/20" />
      <ol className="space-y-12">
        {TIMELINE.map((item, i) => (
          <motion.li
            key={i}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="relative pl-10"
          >
            <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-indigo bg-bone shadow-sm" />
            <span className="font-serif text-xl font-bold text-indigo">{item.year}</span>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
