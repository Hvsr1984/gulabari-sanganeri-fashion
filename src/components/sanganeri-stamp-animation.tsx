"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function SanganeriStampAnimation() {
  const [stampedCount, setStampedCount] = useState(1);
  const [isStamping, setIsStamping] = useState(false);
  const reduce = useReducedMotion();

  const handleTriggerStamp = () => {
    if (isStamping) return;
    setIsStamping(true);
    setTimeout(() => {
      setStampedCount((prev) => Math.min(prev + 1, 4));
      setIsStamping(false);
    }, 1800);
  };

  useEffect(() => {
    // Initial auto-stamp trigger after small delay when component mounts
    const timer = setTimeout(() => {
      setIsStamping(true);
      setTimeout(() => {
        setIsStamping(false);
      }, 1600);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-teak/20 bg-[#F3EFE6] p-6 sm:p-10 cloth-shadow-lg">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-teak/15 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-teak font-semibold">
            Signature Craft Interaction · Sanganer Table
          </span>
          <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-ink">
            The Physical Cadence of <span className="italic font-normal text-madder">Chhapaai</span>
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-ink-soft max-w-xl">
            Watch the hand-carved teak relief block meet unbleached cotton mul.
            Every impression demands exact strike pressure and eye-measured registration.
          </p>
        </div>

        <button
          onClick={handleTriggerStamp}
          disabled={isStamping}
          className={`inline-flex items-center gap-2 rounded-full craft-pill px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-all hover:bg-bone-deep active:scale-95 disabled:opacity-60 shrink-0`}
        >
          <span className="h-2 w-2 rounded-full bg-madder" />
          <span>{isStamping ? "Stamping Fabric..." : "Stamp Fabric Again"}</span>
        </button>
      </div>

      {/* The 60-Foot Printing Table Canvas */}
      <div className="relative mt-8 min-h-[320px] sm:min-h-[380px] w-full overflow-hidden rounded-2xl bg-[#fcfbf9] border border-teak/15 p-6 sm:p-8 flex flex-col justify-center items-center select-none">
        {/* Fabric Weave & Registration Grid Background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(110, 73, 43, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(110, 73, 43, 0.04) 1px, transparent 1px)`,
            backgroundSize: "24px 24px, 48px 48px",
          }}
        />

        {/* Alignment Pins (Chippa Registration Guide Lines) */}
        <div className="absolute top-4 left-6 right-6 flex justify-between border-b border-dashed border-teak/20 pb-2 text-[10px] font-mono uppercase tracking-widest text-teak/60">
          <span>Alignment Grid · Rekha</span>
          <span>Register Gauge: 0.4mm</span>
          <span>100% Cotton Mul</span>
        </div>

        {/* Cotton Fabric Surface that compresses under block pressure */}
        <motion.div
          className="relative w-full max-w-2xl py-6 flex items-center justify-around gap-4"
          animate={
            isStamping && !reduce
              ? {
                  scale: [1, 0.99, 1],
                  filter: ["brightness(1)", "brightness(0.98)", "brightness(1)"],
                }
              : {}
          }
          transition={{ duration: 1.4, times: [0, 0.45, 1] }}
        >
          {/* Stamped Prints Grid */}
          {[0, 1, 2, 3].map((index) => {
            const isVisible = index < stampedCount;
            const isCurrentlyBeingStamped = index === stampedCount - 1 && isStamping;

            return (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center h-32 w-28 sm:h-40 sm:w-36 rounded-xl border border-dashed border-teak/20 bg-[#fdfcfa]"
              >
                {/* Reveal of Sanganeri Floral Print */}
                {isVisible && (
                  <motion.div
                    initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: isCurrentlyBeingStamped ? 0.6 : 0.2,
                      delay: isCurrentlyBeingStamped ? 0.55 : 0,
                    }}
                    className="relative flex flex-col items-center justify-center p-3 text-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/gulabari-emblem-transparent.png"
                      alt="Sanganeri Hand-Stamped Rose Motif"
                      className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-sm"
                    />
                    <span className="mt-2 text-[9px] sm:text-[10px] uppercase tracking-widest font-mono text-madder font-semibold">
                      Motif #{index + 1}
                    </span>
                    <span className="text-[8px] text-ink-faint">Botanical Madder</span>
                  </motion.div>
                )}

                {/* Stamping Block Hovering and Striking on the Current Target */}
                {isCurrentlyBeingStamped && (
                  <motion.div
                    className="absolute z-30 pointer-events-none flex flex-col items-center"
                    initial={{ y: -130, opacity: 0, scale: 1.15 }}
                    animate={
                      reduce
                        ? { y: 0, opacity: 1 }
                        : {
                            y: [-130, 0, 0, -110],
                            opacity: [0, 1, 1, 0.95],
                            scale: [1.12, 1, 1, 1.08],
                          }
                    }
                    transition={{
                      duration: 1.6,
                      times: [0, 0.4, 0.65, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Hand-Carved Teak Wooden Block 3D Representation */}
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl bg-[#5a381f] border-2 border-[#82542e] shadow-2xl p-2.5 flex flex-col items-center justify-center">
                      {/* Teak Wood Grain & Relief */}
                      <div className="absolute -top-3 h-3.5 w-12 rounded-t-md bg-[#422915] border border-[#6b4221]" />
                      <div className="text-center">
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-mono text-bone/90 font-bold block">
                          Teak Relief
                        </span>
                        <span className="text-[7px] font-serif text-bone/70 italic">
                          Chippa Stamp
                        </span>
                      </div>
                      {/* Ink Face */}
                      <div className="mt-2 h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-madder/40 bg-madder/30 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/gulabari-emblem-transparent.png"
                          alt="Wood Relief Surface"
                          className="h-8 w-8 sm:h-9 sm:w-9 object-contain opacity-80 filter brightness-90"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stamping Target Marker */}
                {!isVisible && !isCurrentlyBeingStamped && (
                  <span className="text-[9px] font-mono uppercase tracking-wider text-teak/40">
                    Next Stamping
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Tactile Status Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 w-full pt-4 border-t border-teak/10 text-xs text-ink-soft">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sage" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {isStamping
                ? "Artisan Striking Block: 1.2 kg strike pressure"
                : `${stampedCount} of 4 Registered Repeats Complete`}
            </span>
          </div>
          <span className="font-serif italic text-[11px]">
            Natural madder dye fixed with hard river water
          </span>
        </div>
      </div>
    </div>
  );
}
