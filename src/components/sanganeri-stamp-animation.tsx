"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CraftImage } from "./craft-image";

const MOTIFS = [
  { name: "Gulab Buta", dye: "Botanical madder", swatch: "/images/swatch-buta.jpg" },
  { name: "Sprigged Buti", dye: "Indigo vat", swatch: "/images/swatch-buti.jpg" },
  { name: "Running Keri Bel", dye: "Pomegranate rind", swatch: "/images/swatch-bel.jpg" },
  { name: "Floral Jaal", dye: "Iron rust & indigo", swatch: "/images/swatch-jaal.jpg" },
];

const STRIKE_MS = 1500;

/**
 * The signature interaction: an actual printing-table sequence.
 *
 * Improvements over the first pass:
 *  - the block now carries visible carved relief, brass registration pins and
 *    a dye-saturated face, and it *squashes* on contact instead of passing
 *    through the cloth,
 *  - the four impressions land left-to-right like a printer working down the
 *    table, each one pressing a real print into the weave,
 *  - a colour wash bleeds outward from the strike point,
 *  - the whole thing is driven by one `strike` counter, so rapid clicks can
 *    never leave the state machine stuck mid-animation.
 */
export function SanganeriStampAnimation() {
  const [stamped, setStamped] = useState(1);
  const [striking, setStriking] = useState(false);
  const [impact, setImpact] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  const strike = useCallback(() => {
    setStriking((currentlyStriking) => {
      if (currentlyStriking) return true;
      setImpact((value) => value + 1);
      return true;
    });
  }, []);

  useEffect(() => {
    if (!striking) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setStamped((count) => Math.min(count + 1, MOTIFS.length));
      setStriking(false);
    }, STRIKE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [striking, impact]);

  // Kick off the first impression automatically — but only for visitors who
  // are happy with motion. Reduced-motion visitors simply get the full panel.
  useEffect(() => {
    if (reduce) return;
    const start = setTimeout(() => setStriking(true), 700);
    return () => clearTimeout(start);
  }, [reduce]);

  /**
   * Reduced motion is *derived*, never written into state from an effect, so
   * there is no setState-inside-useEffect cascade to reason about.
   */
  const visible = reduce ? MOTIFS.length : stamped;
  const complete = visible >= MOTIFS.length && !striking;
  const activeIndex = Math.min(visible - 1, MOTIFS.length - 1);

  return (
    <div className="border-teak/20 cloth-shadow-lg relative mx-auto max-w-4xl overflow-hidden rounded-3xl border bg-[#F3EFE6] p-6 sm:p-10">
      {/* Editorial header */}
      <div className="border-teak/15 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-teak font-mono text-xs font-semibold tracking-[0.25em] uppercase">
            Signature craft interaction · Sanganer table
          </span>
          <h3 className="text-ink mt-1 font-serif text-2xl font-semibold sm:text-3xl">
            The Physical Cadence of{" "}
            <span className="text-madder font-normal italic">Chhapaai</span>
          </h3>
          <p className="text-ink-soft mt-1.5 max-w-xl text-xs sm:text-sm">
            Watch the hand-carved teak relief block meet unbleached cotton mul. Every impression
            demands exact strike pressure and eye-measured registration.
          </p>
        </div>

        <button
          onClick={strike}
          disabled={striking || complete}
          className="craft-pill btn-editorial text-ink hover:bg-bone-deep inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase disabled:cursor-not-allowed disabled:opacity-60"
        >
          <motion.span
            className="bg-madder h-2 w-2 rounded-full"
            aria-hidden="true"
            animate={striking && !reduce ? { scale: [1, 1.6, 1] } : {}}
            transition={{ duration: 0.6, repeat: striking ? Infinity : 0 }}
          />
          {complete ? "Panel complete" : striking ? "Stamping fabric…" : "Stamp fabric again"}
        </button>
      </div>

      {/* The printing table */}
      <div className="border-teak/15 relative mt-8 flex min-h-[340px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-[#fcfbf9] p-6 select-none sm:min-h-[400px] sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(rgba(110, 73, 43, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(110, 73, 43, 0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 48px 48px",
          }}
        />

        <div className="border-teak/20 text-teak/70 absolute top-4 right-4 left-4 flex justify-between border-b border-dashed pb-2 font-mono text-[10px] tracking-widest uppercase sm:right-6 sm:left-6">
          <span>Alignment grid · Rekha</span>
          <span className="hidden sm:inline">Register gauge: 0.4 mm</span>
          <span>100% cotton mul</span>
        </div>

        <div className="grid w-full max-w-3xl grid-cols-2 gap-4 pt-8 sm:grid-cols-4 sm:gap-5">
          {MOTIFS.map((motif, index) => {
            const revealed = index < visible;
            const beingStruck = striking && index === visible - 1;

            return (
              <div
                key={motif.name}
                className="border-teak/25 relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-dashed bg-[#fdfcfa]"
              >
                <AnimatePresence>
                  {revealed && (
                    <motion.div
                      initial={
                        reduce
                          ? { opacity: 1 }
                          : { opacity: 0, scale: 0.94, filter: "blur(7px)" }
                      }
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.55,
                        delay: beingStruck ? 0.62 : 0,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute inset-0"
                    >
                      <CraftImage
                        src={motif.swatch}
                        alt={`${motif.name} — ${motif.dye} hand block print swatch`}
                        sizes="(max-width: 640px) 40vw, 180px"
                        wrapperClassName="h-full w-full"
                        className="h-full w-full object-cover"
                        quality={70}
                        reveal={false}
                      />
                      <div className="from-ink/55 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-2.5 text-center">
                        <p className="text-bone font-serif text-[11px] leading-tight font-semibold sm:text-xs">
                          {motif.name}
                        </p>
                        <p className="text-bone/80 font-mono text-[8px] tracking-widest uppercase sm:text-[9px]">
                          {motif.dye}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Impact bloom: dye flooding outward from the strike */}
                {beingStruck && !reduce && (
                  <motion.span
                    aria-hidden="true"
                    initial={{ opacity: 0.55, scale: 0.2 }}
                    animate={{ opacity: 0, scale: 2.4 }}
                    transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
                    className="bg-madder/35 pointer-events-none absolute h-24 w-24 rounded-full blur-xl"
                  />
                )}

                {!revealed && (
                  <span className="text-teak/45 font-mono text-[9px] tracking-wider uppercase">
                    Next stamping
                  </span>
                )}

                {/* The block itself */}
                <AnimatePresence>
                  {beingStruck && (
                    <motion.div
                      className="pointer-events-none absolute z-30 flex flex-col items-center"
                      initial={reduce ? { opacity: 1 } : { y: -150, opacity: 0, scale: 1.14 }}
                      animate={
                        reduce
                          ? { opacity: 1 }
                          : {
                              y: [-150, 0, 0, 0, -120],
                              opacity: [0, 1, 1, 1, 0],
                              scale: [1.14, 1.02, 0.96, 1, 1.06],
                              rotate: [-7, 0, 0, 0, -4],
                            }
                      }
                      exit={{ opacity: 0, y: -130 }}
                      transition={{
                        duration: 1.5,
                        times: [0, 0.34, 0.46, 0.85, 1],
                        ease: "easeInOut",
                      }}
                    >
                      {/* Carved teak block: handle, body, relief face, pins */}
                      <span
                        className="h-4 w-12 rounded-t-md border border-[#6b4221] bg-[#422915]"
                        aria-hidden="true"
                      />
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-lg border-2 border-[#82542e] bg-[#5a381f] shadow-2xl sm:h-24 sm:w-24">
                        <span
                          aria-hidden="true"
                          className="absolute inset-1 rounded opacity-30"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(92deg, rgba(255,235,205,0.5) 0 1px, transparent 1px 5px)",
                          }}
                        />
                        <span className="relative text-center">
                          <span className="text-bone/90 block font-mono text-[8px] font-bold tracking-widest uppercase">
                            Teak relief
                          </span>
                          <span className="border-madder/50 bg-madder/35 mt-1.5 flex h-9 w-9 items-center justify-center rounded-full border sm:h-11 sm:w-11">
                            <span
                              className="bg-madder/80 h-4 w-4 rounded-full blur-[2px]"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-bone/70 mt-1.5 block font-serif text-[7px] italic">
                            Chippa stamp
                          </span>
                        </span>
                        {/* brass registration pins */}
                        <span
                          className="absolute top-1 -left-1 h-2 w-2 rounded-full bg-[#c9a227] shadow-sm"
                          aria-hidden="true"
                        />
                        <span
                          className="absolute -right-1 bottom-1 h-2 w-2 rounded-full bg-[#c9a227] shadow-sm"
                          aria-hidden="true"
                        />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="border-teak/10 text-ink-soft mt-6 flex w-full flex-wrap items-center justify-between gap-4 border-t pt-4 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${striking ? "bg-madder" : "bg-sage"}`}
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] tracking-wider uppercase" aria-live="polite">
              {striking
                ? "Artisan striking block · 1.2 kg pressure"
                : complete
                  ? `${MOTIFS.length} of ${MOTIFS.length} registered repeats complete`
                  : `${visible} of ${MOTIFS.length} registered repeats · ${MOTIFS[activeIndex].dye}`}
            </span>
          </div>
          <span className="font-serif text-[11px] italic">
            Natural madder dye fixed with hard river water
          </span>
        </div>
      </div>
    </div>
  );
}
