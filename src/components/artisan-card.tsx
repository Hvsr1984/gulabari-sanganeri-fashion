"use client";

import type { Artisan } from "@/db/schema";
import { motion, useReducedMotion } from "framer-motion";

export function ArtisanCard({ artisan }: { artisan: Artisan }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? {} : { y: -4 }}
      transition={{ duration: 0.3 }}
      className="group grid gap-8 rounded-2xl border border-teak/20 bg-cotton p-6 sm:p-8 cloth-shadow sm:grid-cols-12 items-center"
    >
      <div className="sm:col-span-5 overflow-hidden rounded-xl bg-bone-deep aspect-[4/3] sm:aspect-[4/5] relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artisan.image}
          alt={`${artisan.name} — ${artisan.role}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-60" />
      </div>

      <div className="sm:col-span-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-madder" />
            <p className="text-xs uppercase tracking-widest text-teak font-mono">
              {artisan.village} · {artisan.generations}
            </p>
          </div>

          <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-ink group-hover:text-indigo transition-colors">
            {artisan.name}
          </h3>

          <p className="mt-1 text-sm font-medium text-teak">
            {artisan.role}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            {artisan.bio}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-teak/10 flex items-center justify-between text-xs text-ink-soft">
          <span className="font-serif italic">Fair living wages &amp; hereditary craft dignity</span>
          <span className="uppercase tracking-wider text-[10px] text-teak font-semibold">Jaipur Basin</span>
        </div>
      </div>
    </motion.article>
  );
}
