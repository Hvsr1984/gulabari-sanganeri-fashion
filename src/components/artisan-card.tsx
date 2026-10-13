"use client";

import type { Artisan } from "@/db/schema";
import { motion, useReducedMotion } from "framer-motion";
import { CraftImage } from "./craft-image";

export function ArtisanCard({ artisan }: { artisan: Artisan }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? {} : { y: -4 }}
      transition={{ duration: 0.3 }}
      className="group border-teak/20 bg-cotton cloth-shadow grid items-center gap-8 rounded-2xl border p-6 sm:grid-cols-12 sm:p-8"
    >
      <div className="bg-bone-deep relative aspect-[4/3] overflow-hidden rounded-xl sm:col-span-5 sm:aspect-[4/5]">
        <CraftImage
          src={artisan.image}
          alt={`${artisan.name} — ${artisan.role}`}
          sizes="(max-width: 640px) 92vw, 30vw"
          wrapperClassName="absolute inset-0"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="from-ink/40 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex flex-col justify-between sm:col-span-7">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-madder h-1.5 w-1.5 rounded-full" />
            <p className="text-teak font-mono text-xs tracking-widest uppercase">
              {artisan.village} · {artisan.generations}
            </p>
          </div>

          <h3 className="text-ink group-hover:text-indigo mt-2 font-serif text-2xl font-semibold transition-colors sm:text-3xl">
            {artisan.name}
          </h3>

          <p className="text-teak mt-1 text-sm font-medium">{artisan.role}</p>

          <p className="text-ink-soft mt-4 text-sm leading-relaxed">{artisan.bio}</p>
        </div>

        <div className="border-teak/10 text-ink-soft mt-6 flex items-center justify-between border-t pt-4 text-xs">
          <span className="font-serif italic">
            Fair living wages &amp; hereditary craft dignity
          </span>
          <span className="text-teak text-[10px] font-semibold tracking-wider uppercase">
            Jaipur Basin
          </span>
        </div>
      </div>
    </motion.article>
  );
}
