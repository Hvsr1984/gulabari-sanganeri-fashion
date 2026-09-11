"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/content";
import { Reveal } from "./reveal";

export function CraftProcessInteractive() {
  const [activeStep, setActiveStep] = useState(3); // Default to PRINT stage (04)
  const [isHoveringPrint, setIsHoveringPrint] = useState(false);

  return (
    <section className="relative overflow-hidden bg-bone-deep/50 py-24 sm:py-32 border-b border-teak/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-teak/15 pb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
                Six Stages of Traditional Craftsmanship
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
                THE CRAFT PROCESS
              </h2>
            </div>
            <p className="max-w-md text-sm text-ink-soft leading-relaxed">
              Every garment passes through six deliberate hands and stages. In a fast-paced world,
              we preserve this slow, rhythmic journey of pure cotton and wooden blocks.
            </p>
          </div>
        </Reveal>

        {/* Step Selector Pills */}
        <div className="mt-10 flex overflow-x-auto pb-4 gap-2.5 sm:gap-3 scrollbar-none">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.code}
                onClick={() => setActiveStep(idx)}
                className={`relative flex-shrink-0 flex items-center gap-3 rounded-full px-5 py-3 text-xs uppercase tracking-wider font-medium transition-all ${
                  isActive
                    ? "bg-indigo text-bone shadow-md"
                    : "border border-teak/20 bg-bone text-ink-soft hover:border-teak hover:text-ink"
                }`}
              >
                <span className={`font-mono font-bold ${isActive ? "text-bone" : "text-teak"}`}>
                  {step.code}
                </span>
                <span>{step.stage}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Display Panel */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Visual Showcase (with tactile hover reveal on printing stage) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative group overflow-hidden rounded-2xl bg-bone cloth-shadow-lg"
              >
                <div
                  className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden"
                  onMouseEnter={() => activeStep === 3 && setIsHoveringPrint(true)}
                  onMouseLeave={() => activeStep === 3 && setIsHoveringPrint(false)}
                >
                  {/* Base stage image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PROCESS_STEPS[activeStep].image}
                    alt={PROCESS_STEPS[activeStep].title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Special Tactile Interaction for 04 - PRINT stage */}
                  {activeStep === 3 && (
                    <>
                      {/* Macro fabric reveal overlay on hover */}
                      <motion.div
                        initial={false}
                        animate={{ opacity: isHoveringPrint ? 1 : 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 z-10 overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/fabric-macro.jpg"
                          alt="Macro close-up revealing natural cotton weave and printed ink pigments"
                          className="h-full w-full object-cover scale-110"
                        />
                        <div className="absolute inset-0 bg-ink/30" />
                        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                          <div className="rounded-xl border border-teak/20 bg-[#F3EFE6] p-4 cloth-shadow">
                            <p className="text-[10px] uppercase tracking-widest text-madder font-semibold">
                              Tactile Macro Reveal
                            </p>
                            <p className="font-serif text-lg font-semibold text-ink mt-0.5">
                              Natural Cotton Fibres &amp; Block Ink
                            </p>
                            <p className="text-xs text-ink-soft mt-1 max-w-xs">
                              Organic pigment absorption and hand-stamped registration.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Tactile prompt indicator */}
                      <div className="absolute top-4 right-4 z-20 rounded-full craft-pill px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-ink pointer-events-none">
                        {isHoveringPrint ? "🔍 Viewing Macro Weave" : "👆 Hover to reveal macro fabric texture"}
                      </div>
                    </>
                  )}

                  {/* Step Watermark */}
                  <div className="absolute bottom-4 left-4 z-20 rounded-lg bg-ink/75 px-3.5 py-1.5 text-xs text-bone backdrop-blur-sm">
                    <span className="font-mono font-bold text-bone-deep mr-2">
                      {PROCESS_STEPS[activeStep].code}
                    </span>
                    <span className="font-medium tracking-wider uppercase">
                      {PROCESS_STEPS[activeStep].hindi}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text Explanation & Insights */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="max-w-lg"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-teak font-semibold">
                  Stage {PROCESS_STEPS[activeStep].code} of 06 · {PROCESS_STEPS[activeStep].stage}
                </span>

                <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-ink">
                  {PROCESS_STEPS[activeStep].title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  {PROCESS_STEPS[activeStep].body}
                </p>

                {activeStep === 3 && (
                  <div className="mt-6 rounded-xl border border-teak/20 bg-bone p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink">
                      The Precision of the Chippa Wrist
                    </p>
                    <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                      Notice how the block is aligned by eye using the tiny brass registration pins on the wood corners.
                      Hover over the image on the left to inspect the natural cotton weave under high magnification.
                    </p>
                  </div>
                )}

                <div className="mt-8 flex items-center gap-4">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="rounded-full border border-teak/25 px-4 py-2 text-xs uppercase tracking-wider text-ink transition-colors hover:border-ink disabled:opacity-30"
                  >
                    ← Previous
                  </button>
                  <button
                    disabled={activeStep === PROCESS_STEPS.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                    className="rounded-full bg-ink px-5 py-2 text-xs uppercase tracking-wider text-bone transition-colors hover:bg-indigo disabled:opacity-30"
                  >
                    Next Stage →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
