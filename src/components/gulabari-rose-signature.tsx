"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GulabariRoseSignature({
  className = "w-20 h-20 text-madder",
  delay = 0.1,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  const strokeTransition = reduce
    ? { duration: 0.01 }
    : { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-current"
      >
        {/* Cusped Jharokha Arch */}
        <motion.path
          d="M18 100 V46 C18 40 22 36 26 36 C28 32 32 28 38 28 C42 22 47 16 50 10 C53 16 58 22 62 28 C68 28 72 32 74 36 C78 36 82 40 82 46 V100"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={strokeTransition}
        />

        {/* Central Botanical Rose Petals */}
        <motion.path
          d="M50 48 C46 44 42 46 41 50 C40 55 45 59 50 61 C55 59 60 55 59 50 C58 46 54 44 50 48 Z"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.95 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...strokeTransition, delay: delay + 0.15 }}
        />
        <motion.path
          d="M44 46 C38 48 36 54 39 59 C42 64 48 66 50 67 C52 66 58 64 61 59 C64 54 62 48 56 46"
          strokeWidth="1.1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...strokeTransition, delay: delay + 0.25 }}
        />
        <motion.path
          d="M36 52 C32 57 33 64 38 69 C43 74 48 76 50 77 C52 76 57 74 62 69 C67 64 68 57 64 52"
          strokeWidth="1.1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...strokeTransition, delay: delay + 0.35 }}
        />

        {/* Stem and Foliage */}
        <motion.path
          d="M50 77 V96"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...strokeTransition, delay: delay + 0.45 }}
        />
        <motion.path
          d="M50 84 C43 83 38 78 34 82 C38 88 44 86 50 87"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...strokeTransition, delay: delay + 0.55 }}
        />
        <motion.path
          d="M50 88 C57 87 62 82 66 86 C62 92 56 90 50 91"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...strokeTransition, delay: delay + 0.6 }}
        />

        {/* Tiny Rosebuds flanking */}
        <motion.path
          d="M33 60 C30 58 28 62 30 65 C33 68 36 67 36 64 Z"
          strokeWidth="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.75 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...strokeTransition, delay: delay + 0.5 }}
        />
        <motion.path
          d="M67 60 C70 58 72 62 70 65 C67 68 64 67 64 64 Z"
          strokeWidth="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.75 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...strokeTransition, delay: delay + 0.5 }}
        />
      </svg>
    </div>
  );
}
