"use client";

import { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GulabariLogo } from "./gulabari-logo";

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  // Subtle fabric parallax on scroll
  const { scrollY } = useScroll();
  const fabricParallaxY = useTransform(scrollY, [0, 800], [0, 90]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: y * -8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden bg-indigo-deep perspective-1200 flex items-end sm:items-center"
    >
      {/* 1. Background Sanganeri Fabric with Slow Reveal & Scroll Parallax */}
      <motion.div
        style={{ y: reduce ? 0 : fabricParallaxY }}
        className="absolute -inset-6 sm:-inset-10 transform-style-3d will-change-transform"
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateY: reduce ? 0 : tilt.x,
          rotateX: reduce ? 0 : tilt.y,
        }}
        transition={{
          opacity: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
          rotateY: { type: "spring", damping: 35, stiffness: 90 },
          rotateX: { type: "spring", damping: 35, stiffness: 90 },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-sanganeri.jpg"
          alt="Close-up of authentic Sanganeri hand block printed cotton cloth with natural indigo and madder floral buti"
          className="h-full w-full object-cover object-[center_35%] filter brightness-[0.88] contrast-[1.04]"
          loading="eager"
        />

        {/* Tactile Textile Fiber Overlay */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Editorial Vignette & Atmospheric Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/30 sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/55 sm:to-transparent" />
      </motion.div>

      {/* Floating Hero Content with Staggered Sequence */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8 pt-28 pb-16 sm:py-28">
        <div className="max-w-2xl sm:max-w-3xl">
          {/* 2. GULABARI Brand Emblem & Craft Tag Reveal */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
              <GulabariLogo variant="light" mode="emblem" className="h-full w-full" priority />
            </div>
            <div className="inline-flex items-center gap-2.5 rounded-full craft-pill px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-terracotta shrink-0" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-medium text-ink">
                Jaipur Craft Heritage · GI Protected Sanganer
              </span>
            </div>
          </motion.div>

          {/* 3. Main Heading Reveals Upward */}
          <motion.h1
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-bone drop-shadow-md"
          >
            THE ART OF <br />
            <span className="italic font-normal text-bone-deep">SANGANERI</span>
          </motion.h1>

          {/* 4. Subtitle Fades In */}
          <motion.p
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-base sm:text-xl font-normal leading-relaxed text-bone/90 max-w-xl drop-shadow"
          >
            Handcrafted in Jaipur. Printed by hand. Made to be remembered.
          </motion.p>

          {/* Craft Guarantee Details */}
          <motion.p
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82 }}
            className="mt-3 text-xs sm:text-sm text-bone/70 max-w-lg hidden sm:block"
          >
            Carved into seasoned teak wood, dipped in botanical dyes, and hand-stamped onto breathable unbleached cotton mul.
          </motion.p>

          {/* 5. CTAs Appear Last */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap gap-4 items-center"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-bone px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-ink transition-all hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>EXPLORE THE COLLECTION</span>
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/craft"
              className="inline-flex items-center justify-center rounded-full border border-bone/60 px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-bone backdrop-blur-sm transition-all hover:bg-bone/15 hover:border-bone"
            >
              DISCOVER THE CRAFT
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Subtle Floating Bottom Metric Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-bone/15 bg-ink/50 backdrop-blur-md hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3 text-xs text-bone/80">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-bone">Origin</span>
            <span>—</span>
            <span>Sanganer Basin, Rajasthan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-bone">Technique</span>
            <span>—</span>
            <span>Hand-Carved Wooden Block (Rekha & Datta)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-bone">Textile</span>
            <span>—</span>
            <span>100% Breathable Cotton Mul & Voile</span>
          </div>
        </div>
      </div>
    </section>
  );
}
