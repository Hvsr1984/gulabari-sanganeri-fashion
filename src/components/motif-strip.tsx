"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MOTIF_GLYPHS } from "./motif-glyphs";
import { MOTIFS } from "@/lib/content";

export function MotifStrip() {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {MOTIFS.map((motif) => {
        const Glyph = MOTIF_GLYPHS[motif.key];
        return (
          <Link
            key={motif.key}
            href={`/craft#motif-${motif.key}`}
            className="group border-teak/15 bg-bone/60 hover:border-indigo/40 focus-visible:outline-indigo flex flex-col items-center rounded-xl border p-6 text-center transition-colors focus-visible:outline focus-visible:outline-2"
          >
            <motion.div
              className="text-ink"
              whileHover={reduce ? {} : { scale: 1.08 }}
              transition={{ duration: 0.25 }}
            >
              <Glyph className="h-16 w-16 [&_*]:transition-all [&_*]:duration-700 group-hover:[&_path]:[stroke-dasharray:120] group-hover:[&_path]:[stroke-dashoffset:0]" />
            </motion.div>
            <p className="mt-3 font-serif text-lg">{motif.name}</p>
            <p className="text-ink-soft mt-1 text-xs">{motif.short}</p>
          </Link>
        );
      })}
    </div>
  );
}
