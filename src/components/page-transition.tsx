"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Route transition.
 *
 * Replaces the old `template.tsx` (which remounted on every navigation and
 * always played the same 380ms upward slide). Two things are better here:
 *
 *  1. The key is the *top-level* path segment, so moving between pages never
 *     double-animates nested layouts, and returning to a section feels settled.
 *  2. The motion reads as cloth being laid onto the table — it starts slightly
 *     soft and out of focus, then resolves — instead of a generic slide-up.
 *
 * Visitors who prefer reduced motion get an instant, unanimated swap.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const section = `/${pathname.split("/")[1] ?? ""}`;

  return (
    <motion.div
      key={reduce ? undefined : section}
      initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)", scale: 0.995 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
