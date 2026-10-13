"use client";

import { useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { GulabariLogo } from "./gulabari-logo";
import { CraftImage } from "./craft-image";

const METRICS = [
  { label: "Origin", value: "Sanganer Basin, Rajasthan" },
  { label: "Technique", value: "Hand-carved wooden block · Rekha & Datta" },
  { label: "Textile", value: "100% breathable cotton mul & voile" },
];

/** The physical beats of the printing table, used to pace the hero entrance. */
const BEAT = { emblem: 0.35, title: 0.55, sub: 0.78, note: 0.9, cta: 1.02 };

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Two-dimension tilt, driven by motion values so pointer movement never
  // re-renders the tree.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateY = useSpring(tiltX, { stiffness: 90, damping: 32 });
  const rotateX = useSpring(tiltY, { stiffness: 90, damping: 32 });

  const { scrollY } = useScroll();
  const fabricY = useTransform(scrollY, [0, 900], [0, 110]);
  const contentY = useTransform(scrollY, [0, 900], [0, 60]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);

  const [pointerFine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce || !pointerFine || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(x * 7);
    tiltY.set(y * -7);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="on-dark bg-indigo-deep perspective-1200 relative flex min-h-[92vh] w-full items-end overflow-hidden sm:min-h-screen sm:items-center"
    >
      {/* ------------------------------------------------------------------
          1. The printed cloth. It starts out of focus and slightly over-scaled
          while the weave settles, its noise layer breathes at a different
          rate, and everything drifts on scroll.
      ------------------------------------------------------------------ */}
      <motion.div
        style={{ y: reduce ? 0 : fabricY, rotateY, rotateX }}
        className="transform-style-3d absolute -inset-6 will-change-transform sm:-inset-10"
      >
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.12, filter: "blur(18px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <CraftImage
            src="/images/hero-sanganeri.jpg"
            alt="Close-up of authentic Sanganeri hand block printed cotton with natural indigo and madder floral buti"
            sizes="100vw"
            priority
            reveal={false}
            wrapperClassName="h-full w-full"
            className="h-full w-full object-cover object-[center_35%] brightness-[0.86] contrast-[1.05] saturate-[1.03]"
            quality={75}
          />
        </motion.div>

        {/* Fibre grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
          }}
        />

        {/* A slow, single pass of daylight across the cloth */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            initial={{ x: "-60%", opacity: 0 }}
            animate={{ x: "60%", opacity: [0, 0.35, 0] }}
            transition={{ duration: 3.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="via-bone/25 pointer-events-none absolute inset-y-0 w-[45%] bg-gradient-to-r from-transparent to-transparent blur-2xl"
          />
        )}

        <div className="from-ink/92 via-ink/48 to-ink/32 sm:from-ink/92 sm:via-ink/58 absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r sm:to-transparent" />
      </motion.div>

      {/* ------------------------------------------------------------------
          2. Editorial content, sequenced like impressions down the table.
      ------------------------------------------------------------------ */}
      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
        className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:py-28"
      >
        <div className="max-w-2xl sm:max-w-3xl">
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: BEAT.emblem, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
              <GulabariLogo variant="light" mode="emblem" className="h-full w-full" priority />
            </span>
            <span className="craft-pill inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
              <motion.span
                className="bg-terracotta h-2 w-2 shrink-0 rounded-full"
                aria-hidden="true"
                animate={reduce ? {} : { opacity: [1, 0.35, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-ink text-[11px] font-medium tracking-[0.25em] uppercase sm:text-xs">
                Jaipur Craft Heritage · GI Protected Sanganer
              </span>
            </span>
          </motion.div>

          {/* The headline is uncovered the way a printer lifts the cloth off a
              freshly stamped length: a directional wipe, not a slide. */}
          <motion.h1
            initial={reduce ? { opacity: 1 } : { clipPath: "inset(0 100% 0 0)", opacity: 0.2 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 1.25, delay: BEAT.title, ease: [0.16, 1, 0.3, 1] }}
            className="text-bone font-serif text-4xl leading-[1.05] font-semibold tracking-tight drop-shadow-md sm:text-6xl md:text-7xl"
          >
            THE ART OF <br />
            <span className="text-bone-deep font-normal italic">SANGANERI</span>
          </motion.h1>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: BEAT.sub, ease: [0.16, 1, 0.3, 1] }}
            className="text-bone/90 mt-5 max-w-xl text-base leading-relaxed font-normal drop-shadow sm:text-xl"
          >
            Handcrafted in Jaipur. Printed by hand. Made to be remembered.
          </motion.p>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: BEAT.note }}
            className="text-bone/75 mt-3 hidden max-w-lg text-xs sm:block sm:text-sm"
          >
            Carved into seasoned teak wood, dipped in botanical dyes, and hand-stamped onto
            breathable unbleached cotton mul.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: BEAT.cta, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
          >
            <Link
              href="/shop"
              className="btn-editorial group bg-bone text-ink inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-white hover:shadow-xl sm:text-sm"
            >
              <span>Explore the collection</span>
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            <Link
              href="/craft"
              className="btn-editorial border-bone/60 text-bone hover:border-bone hover:bg-bone/15 inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm sm:text-sm"
            >
              Discover the craft
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Metric strip */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="border-bone/15 bg-ink/50 absolute right-0 bottom-0 left-0 z-20 hidden border-t backdrop-blur-md md:block"
      >
        <div className="text-bone/80 mx-auto flex max-w-7xl items-center justify-between px-8 py-3 text-xs">
          {METRICS.map((metric) => (
            <div key={metric.label} className="flex items-center gap-2">
              <span className="text-bone font-serif italic">{metric.label}</span>
              <span aria-hidden="true">—</span>
              <span>{metric.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: [0, 10, 0] }}
          transition={{ duration: 2.4, delay: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
          className="via-bone/60 absolute bottom-24 left-1/2 z-20 hidden h-8 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-transparent lg:block"
        />
      )}
    </section>
  );
}
