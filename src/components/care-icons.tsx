"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

function DrawIcon({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-14 w-14 text-indigo"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      <motion.g
        variants={{
          hidden: reduce ? { opacity: 1 } : { pathLength: 0, opacity: 0 },
          show: { pathLength: 1, opacity: 1, transition: { duration: 1 } },
        }}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </motion.g>
    </motion.svg>
  );
}

export function CareIcons() {
  const items = [
    {
      title: "Cold, gentle wash",
      body: "Hand wash separately in cold water with a mild detergent. Wash colours separately for the first few washes.",
      icon: (
        <>
          <path d="M14 22h36l-3 30a4 4 0 0 1-4 3.5H21a4 4 0 0 1-4-3.5L14 22Z" />
          <path d="M20 34c3-3 6-3 9 0s6 3 9 0 6-3 8-1" />
        </>
      ),
    },
    {
      title: "Dry in the shade",
      body: "Always shade-dry. Direct, prolonged sun ages natural dye unevenly. Dry flat where possible.",
      icon: (
        <>
          <circle cx="32" cy="30" r="10" />
          <path d="M32 12v-4M50 30h4M32 48v4M10 30h4M45 17l3-3M45 43l3 3M19 17l-3-3M19 43l-3 3" />
          <path d="M12 54h40" />
        </>
      ),
    },
    {
      title: "Iron slightly damp",
      body: "Iron on a low-to-medium setting while slightly damp. Avoid ironing directly over deeply saturated print.",
      icon: (
        <>
          <path d="M10 42c0-10 8-16 20-16h24l-6 16H10Z" />
          <path d="M18 42v6M28 42v6M38 42v6" />
          <path d="M44 26c0-6 4-8 8-6" />
        </>
      ),
    },
    {
      title: "Colour will mellow",
      body: "Indigo, madder and turmeric soften with time. This is the character of natural-dyed cloth — a feature, not a defect.",
      icon: (
        <>
          <path d="M32 8c8 10 12 17 12 24a12 12 0 1 1-24 0c0-7 4-14 12-24Z" />
          <path d="M26 34c1 5 4 8 9 9" />
        </>
      ),
    },
  ];

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="flex gap-5 rounded-2xl border border-teak/15 bg-bone/60 p-6"
        >
          <div className="shrink-0">
            <DrawIcon delay={i * 0.1}>{item.icon}</DrawIcon>
          </div>
          <div>
            <h3 className="font-serif text-xl">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
