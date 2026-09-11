"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function UnderlineDraw({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline">
      {children}
      <svg
        className="pointer-events-none absolute -bottom-3 left-0 h-3 w-full text-madder"
        viewBox="0 0 300 12"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <motion.path
          d="M2 8c40-6 90-6 140-2 45 3 90 4 156-3"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </svg>
    </span>
  );
}
