"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { MOTIF_GLYPHS } from "./motif-glyphs";
import { MOTIFS, PROCESS_STEPS, TIMELINE } from "@/lib/content";
import { CraftImage } from "./craft-image";

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
      <div className="bg-teak/20 absolute top-0 left-4 h-full w-px sm:left-6">
        {!reduce && (
          <motion.div
            style={{ scaleY: fill }}
            className="bg-indigo absolute top-0 left-0 h-full w-px origin-top"
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
            <span className="border-indigo bg-bone text-indigo absolute left-0 flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-xs font-bold shadow-sm sm:left-1 sm:h-12 sm:w-12">
              {step.code || `0${step.n}`}
            </span>

            <div className="bg-cotton border-teak/15 cloth-shadow grid items-center gap-6 rounded-2xl border p-6 sm:grid-cols-12">
              <div className="sm:col-span-7">
                <span className="text-teak font-mono text-[10px] font-semibold tracking-widest uppercase">
                  Stage {step.code} · {step.hindi}
                </span>
                <h3 className="text-ink mt-1 font-serif text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-ink-soft mt-3 text-xs leading-relaxed sm:text-sm">
                  {step.body}
                </p>
              </div>
              <div className="bg-bone-deep aspect-[4/3] overflow-hidden rounded-xl sm:col-span-5">
                <CraftImage
                  src={step.image}
                  alt={step.title}
                  sizes="(max-width: 640px) 92vw, 40vw"
                  wrapperClassName="h-full w-full"
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
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
            className="border-teak/20 bg-cotton swatch-card flex flex-col justify-between rounded-2xl border p-6"
          >
            <div>
              <div className="bg-bone-deep relative mb-5 aspect-square w-full overflow-hidden rounded-xl">
                <CraftImage
                  src={motif.swatchImage}
                  alt={`${motif.name} hand block printed swatch`}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  wrapperClassName="cloth-lift h-full w-full"
                  className="h-full w-full object-cover"
                />
                <div className="craft-pill text-ink absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full">
                  {Glyph && <Glyph className="h-5 w-5" />}
                </div>
              </div>

              <h3 className="text-ink font-serif text-2xl font-semibold">{motif.name}</h3>
              <p className="text-teak mt-1 text-xs font-medium italic">{motif.short}</p>
              <p className="text-ink-soft mt-3 text-xs leading-relaxed">{motif.long}</p>
            </div>

            <div className="border-teak/10 mt-5 border-t pt-4">
              <ul className="flex flex-wrap gap-1.5">
                {motif.named.map((n) => (
                  <li
                    key={n}
                    className="bg-bone text-ink-soft border-teak/15 rounded-full border px-2.5 py-1 text-[10px]"
                  >
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
      <div className="bg-teak/20 absolute top-2 left-2 h-[calc(100%-1rem)] w-px" />
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
            <span className="border-indigo bg-bone absolute top-1.5 left-0 h-4 w-4 rounded-full border-2 shadow-sm" />
            <span className="text-indigo font-serif text-xl font-bold">{item.year}</span>
            <p className="text-ink-soft mt-2 text-sm leading-relaxed">{item.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
