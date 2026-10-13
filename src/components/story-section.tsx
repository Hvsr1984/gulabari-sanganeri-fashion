"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";
import { GulabariRoseSignature } from "./gulabari-rose-signature";
import { CraftImage } from "./craft-image";

export function StorySection() {
  return (
    <section className="bg-bone border-teak/10 relative overflow-hidden border-b py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Large artisan/block-print imagery with 3D depth and animated badge */}
          <div className="relative lg:col-span-6">
            <Reveal>
              <div className="group bg-bone-deep cloth-shadow perspective-1000 relative overflow-hidden rounded-2xl">
                <CraftImage
                  src="/images/craft-press.jpg"
                  alt="A Chippa artisan in Sanganer hand-stamping a carved wooden block dipped in natural dye onto cotton cloth"
                  sizes="(max-width: 1024px) 92vw, 48vw"
                  wrapperClassName="aspect-[4/3] w-full sm:aspect-[5/4]"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />

                {/* Subtle cloth shadow overlay */}
                <div className="from-ink/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60" />

                {/* Tactile Editorial Badge: HAND BLOCK PRINTED */}
                <div className="craft-pill absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-full px-4 py-2">
                  <span className="bg-madder h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-ink text-[11px] font-bold tracking-[0.2em] uppercase">
                    HAND BLOCK PRINTED
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Decorative Offset Card */}
            <div className="bg-cotton border-teak/15 absolute -right-6 -bottom-6 z-10 hidden w-48 rounded-xl border p-4 shadow-xl sm:block">
              <p className="text-teak font-mono text-[10px] tracking-widest uppercase">
                Geographical Indication
              </p>
              <p className="text-ink mt-0.5 font-serif text-sm font-semibold">
                Sanganer GI Tagged
              </p>
              <p className="text-ink-soft mt-1 text-[11px]">
                Authentic craft certification preserved since 2010.
              </p>
            </div>
          </div>

          {/* Right: Editorial typography and concise storytelling */}
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="max-w-xl">
                <GulabariRoseSignature className="text-madder mb-3 h-16 w-14" />
                <span className="text-teak text-xs font-medium tracking-[0.25em] uppercase">
                  Jaipur Heritage & Craftsmanship
                </span>

                <h2 className="text-ink mt-3 font-serif text-3xl leading-[1.12] font-semibold tracking-tight sm:text-5xl">
                  A PRINT BORN IN <span className="font-normal italic">SANGANER</span>
                </h2>

                <div className="text-ink-soft mt-6 space-y-4 text-base leading-relaxed">
                  <p>
                    Sanganeri printing is a traditional hand-block printing craft associated
                    with Sanganer near Jaipur, Rajasthan. Artisans use carved wooden blocks to
                    apply patterns onto fabric, often creating delicate floral, botanical,
                    paisley and geometric designs.
                  </p>
                  <p>
                    Unlike modern mechanical screen prints, each impression in Sanganeri cloth
                    is driven by human pressure, visual alignment, and the natural absorption of
                    cotton fibers. The Chippa printer works down tables stretching up to twenty
                    meters, layering the outline block (<em>rekha</em>) and fill blocks (
                    <em>datta</em>) in precise, unhurried cadence.
                  </p>
                </div>

                {/* Craft Highlights */}
                <div className="border-teak/15 mt-8 grid grid-cols-2 gap-4 border-t border-b py-6">
                  <div>
                    <p className="text-indigo font-serif text-2xl font-semibold">
                      Teak & Sheesham
                    </p>
                    <p className="text-ink-soft mt-1 text-xs">
                      Hand-carved relief blocks with micron-fine detailing
                    </p>
                  </div>
                  <div>
                    <p className="text-madder font-serif text-2xl font-semibold">
                      Natural Pigments
                    </p>
                    <p className="text-ink-soft mt-1 text-xs">
                      Indigo, madder root, pomegranate and harda mordants
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/craft"
                    className="bg-indigo text-bone hover:bg-indigo-deep inline-flex items-center justify-center rounded-full px-7 py-3 text-xs font-semibold tracking-widest uppercase transition-all hover:shadow-lg"
                  >
                    Explore The Full Craft Process
                  </Link>

                  <Link
                    href="/artisans"
                    className="text-teak hover:text-ink inline-flex items-center text-xs font-medium tracking-wider uppercase transition-colors"
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
