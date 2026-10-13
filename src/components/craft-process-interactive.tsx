"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/content";
import { Reveal } from "./reveal";
import { CraftImage } from "./craft-image";

export function CraftProcessInteractive() {
  const [activeStep, setActiveStep] = useState(3); // Default to PRINT stage (04)
  const [isHoveringPrint, setIsHoveringPrint] = useState(false);

  return (
    <section className="bg-bone-deep/50 border-teak/10 relative overflow-hidden border-b py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="border-teak/15 flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-teak text-xs font-medium tracking-[0.25em] uppercase">
                Six Stages of Traditional Craftsmanship
              </p>
              <h2 className="text-ink mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
                THE CRAFT PROCESS
              </h2>
            </div>
            <p className="text-ink-soft max-w-md text-sm leading-relaxed">
              Every garment passes through six deliberate hands and stages. In a fast-paced
              world, we preserve this slow, rhythmic journey of pure cotton and wooden blocks.
            </p>
          </div>
        </Reveal>

        {/* Step Selector Pills */}
        <div className="scrollbar-none mt-10 flex gap-2.5 overflow-x-auto pb-4 sm:gap-3">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.code}
                onClick={() => setActiveStep(idx)}
                className={`relative flex flex-shrink-0 items-center gap-3 rounded-full px-5 py-3 text-xs font-medium tracking-wider uppercase transition-all ${
                  isActive
                    ? "bg-indigo text-bone shadow-md"
                    : "border-teak/20 bg-bone text-ink-soft hover:border-teak hover:text-ink border"
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
                className="group bg-bone cloth-shadow-lg relative overflow-hidden rounded-2xl"
              >
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]"
                  onMouseEnter={() => activeStep === 3 && setIsHoveringPrint(true)}
                  onMouseLeave={() => activeStep === 3 && setIsHoveringPrint(false)}
                >
                  {/* Base stage image */}
                  <CraftImage
                    src={PROCESS_STEPS[activeStep].image}
                    alt={`${PROCESS_STEPS[activeStep].title} — ${PROCESS_STEPS[activeStep].hindi}`}
                    sizes="(max-width: 1024px) 92vw, 58vw"
                    wrapperClassName="h-full w-full"
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
                        <CraftImage
                          src="/images/fabric-macro.jpg"
                          alt="Macro close-up revealing natural cotton weave and printed ink pigments"
                          sizes="(max-width: 1024px) 92vw, 58vw"
                          wrapperClassName="h-full w-full"
                          className="h-full w-full scale-110 object-cover"
                          reveal={false}
                        />
                        <div className="bg-ink/30 absolute inset-0" />
                        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                          <div className="border-teak/20 cloth-shadow rounded-xl border bg-[#F3EFE6] p-4">
                            <p className="text-madder text-[10px] font-semibold tracking-widest uppercase">
                              Tactile Macro Reveal
                            </p>
                            <p className="text-ink mt-0.5 font-serif text-lg font-semibold">
                              Natural Cotton Fibres &amp; Block Ink
                            </p>
                            <p className="text-ink-soft mt-1 max-w-xs text-xs">
                              Organic pigment absorption and hand-stamped registration.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Tactile prompt indicator */}
                      <div className="craft-pill text-ink pointer-events-none absolute top-4 right-4 z-20 rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-wider uppercase">
                        {isHoveringPrint
                          ? "🔍 Viewing Macro Weave"
                          : "👆 Hover to reveal macro fabric texture"}
                      </div>
                    </>
                  )}

                  {/* Step Watermark */}
                  <div className="bg-ink/75 text-bone absolute bottom-4 left-4 z-20 rounded-lg px-3.5 py-1.5 text-xs backdrop-blur-sm">
                    <span className="text-bone-deep mr-2 font-mono font-bold">
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
          <div className="flex flex-col justify-center lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="max-w-lg"
              >
                <span className="text-teak font-mono text-xs font-semibold tracking-widest uppercase">
                  Stage {PROCESS_STEPS[activeStep].code} of 06 ·{" "}
                  {PROCESS_STEPS[activeStep].stage}
                </span>

                <h3 className="text-ink mt-2 font-serif text-3xl font-semibold sm:text-4xl">
                  {PROCESS_STEPS[activeStep].title}
                </h3>

                <p className="text-ink-soft mt-4 text-base leading-relaxed">
                  {PROCESS_STEPS[activeStep].body}
                </p>

                {activeStep === 3 && (
                  <div className="border-teak/20 bg-bone mt-6 rounded-xl border p-4">
                    <p className="text-ink text-xs font-semibold tracking-wider uppercase">
                      The Precision of the Chippa Wrist
                    </p>
                    <p className="text-ink-soft mt-1 text-xs leading-relaxed">
                      Notice how the block is aligned by eye using the tiny brass registration
                      pins on the wood corners. Hover over the image on the left to inspect the
                      natural cotton weave under high magnification.
                    </p>
                  </div>
                )}

                <div className="mt-8 flex items-center gap-4">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="border-teak/25 text-ink hover:border-ink rounded-full border px-4 py-2 text-xs tracking-wider uppercase transition-colors disabled:opacity-30"
                  >
                    ← Previous
                  </button>
                  <button
                    disabled={activeStep === PROCESS_STEPS.length - 1}
                    onClick={() =>
                      setActiveStep((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1))
                    }
                    className="bg-ink text-bone hover:bg-indigo rounded-full px-5 py-2 text-xs tracking-wider uppercase transition-colors disabled:opacity-30"
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
