"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A thin block-print border that "stamps" into view left-to-right as it
 * enters the viewport, mimicking a printer moving a block down the cloth.
 */
export function StampBorder({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const units = Array.from({ length: 14 });

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 700 24"
        preserveAspectRatio="none"
        className="h-6 w-full text-teak/50"
        fill="none"
      >
        <motion.g
          initial={reduce ? { opacity: 1 } : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <line x1="0" y1="4" x2="700" y2="4" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="20" x2="700" y2="20" stroke="currentColor" strokeWidth="1" />
          {units.map((_, i) => {
            const x = 25 + i * 50;
            return (
              <g key={i} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d={`M${x} 12c-5-6 0-10 0-10s5 4 0 10Z`} />
                <path d={`M${x} 12c5-6 0-10 0-10`} />
                <circle cx={x} cy="14" r="1.6" />
              </g>
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
}
