"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";
import { GulabariRoseSignature } from "./gulabari-rose-signature";

export function StorySection() {
  return (
    <section className="relative overflow-hidden bg-bone py-24 sm:py-32 border-b border-teak/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Large artisan/block-print imagery with 3D depth and animated badge */}
          <div className="lg:col-span-6 relative">
            <Reveal>
              <div className="relative group overflow-hidden rounded-2xl bg-bone-deep cloth-shadow perspective-1000">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/craft-press.jpg"
                  alt="A Chippa artisan in Sanganer hand-stamping carved wooden block dipped in natural dye onto cotton cloth"
                  className="aspect-[4/3] sm:aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle cloth shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60" />

                {/* Tactile Editorial Badge: HAND BLOCK PRINTED */}
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-full craft-pill px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-madder shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
                    HAND BLOCK PRINTED
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Decorative Offset Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 z-10 w-48 rounded-xl bg-cotton p-4 border border-teak/15 shadow-xl">
              <p className="text-[10px] uppercase tracking-widest text-teak font-mono">Geographical Indication</p>
              <p className="font-serif text-sm font-semibold text-ink mt-0.5">Sanganer GI Tagged</p>
              <p className="text-[11px] text-ink-soft mt-1">Authentic craft certification preserved since 2010.</p>
            </div>
          </div>

          {/* Right: Editorial typography and concise storytelling */}
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="max-w-xl">
                <GulabariRoseSignature className="w-14 h-16 text-madder mb-3" />
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
                  Jaipur Heritage & Craftsmanship
                </span>

                <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-ink leading-[1.12]">
                  A PRINT BORN IN <span className="italic font-normal">SANGANER</span>
                </h2>

                <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
                  <p>
                    Sanganeri printing is a traditional hand-block printing craft associated with
                    Sanganer near Jaipur, Rajasthan. Artisans use carved wooden blocks to apply patterns
                    onto fabric, often creating delicate floral, botanical, paisley and geometric designs.
                  </p>
                  <p>
                    Unlike modern mechanical screen prints, each impression in Sanganeri cloth is driven
                    by human pressure, visual alignment, and the natural absorption of cotton fibers.
                    The Chippa printer works down tables stretching up to twenty meters, layering the outline
                    block (<em>rekha</em>) and fill blocks (<em>datta</em>) in precise, unhurried cadence.
                  </p>
                </div>

                {/* Craft Highlights */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-b border-teak/15 py-6">
                  <div>
                    <p className="font-serif text-2xl font-semibold text-indigo">Teak & Sheesham</p>
                    <p className="mt-1 text-xs text-ink-soft">Hand-carved relief blocks with micron-fine detailing</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-semibold text-madder">Natural Pigments</p>
                    <p className="mt-1 text-xs text-ink-soft">Indigo, madder root, pomegranate and harda mordants</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/craft"
                    className="inline-flex items-center justify-center rounded-full bg-indigo px-7 py-3 text-xs uppercase tracking-widest font-semibold text-bone transition-all hover:bg-indigo-deep hover:shadow-lg"
                  >
                    Explore The Full Craft Process
                  </Link>

                  <Link
                    href="/artisans"
                    className="inline-flex items-center text-xs uppercase tracking-wider font-medium text-teak hover:text-ink transition-colors"
                  >
                    Meet the Chippa Artisans →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
