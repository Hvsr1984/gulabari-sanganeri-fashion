"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type DialogShellProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  /**
   * "right"  = side drawer (cart, wishlist)
   * "center" = centred modal (quick view)
   * "top"    = command palette (search)
   * "bottom" = mobile bottom sheet (filters)
   */
  variant?: "right" | "center" | "top" | "bottom";
  /** Tailwind sizing for the panel. */
  panelClassName?: string;
  /** Optional className on the fixed positioning wrapper. */
  className?: string;
};

/**
 * One accessible overlay primitive for every dialog in the storefront
 * (cart, wishlist, search, quick view).
 *
 * Handles what a native <dialog> would — and what all four previously missed:
 *  - Escape to dismiss
 *  - focus moves into the panel on open and returns to the trigger on close
 *  - Tab / Shift+Tab are trapped inside the panel
 *  - background scroll is locked and compensated for scrollbar width
 *  - `aria-modal` + `role="dialog"` + `aria-labelledby` wiring
 *  - honours prefers-reduced-motion by swapping travel for a plain fade
 */
export function DialogShell({
  open,
  onClose,
  label,
  children,
  variant = "center",
  panelClassName = "",
  className = "",
}: DialogShellProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;

    // Focus the first meaningful control, or the panel itself.
    const raf = requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const target = panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel;
      target.focus({ preventScroll: true });
    });

    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      restoreFocusTo.current?.focus?.({ preventScroll: true });
    };
  }, [open, handleKeyDown]);

  const motionProps = {
    right: {
      initial: reduce ? { opacity: 0 } : { x: "100%" },
      animate: reduce ? { opacity: 1 } : { x: 0 },
      exit: reduce ? { opacity: 0 } : { x: "100%" },
      transition: { type: "spring" as const, damping: 30, stiffness: 300 },
    },
    center: {
      initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 14 },
      animate: reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 },
      exit: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 },
      transition: { type: "spring" as const, damping: 28, stiffness: 320 },
    },
    top: {
      initial: reduce ? { opacity: 0 } : { opacity: 0, y: -18 },
      animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
      exit: reduce ? { opacity: 0 } : { opacity: 0, y: -14 },
      transition: { duration: 0.28, ease: EASE },
    },
    bottom: {
      initial: reduce ? { opacity: 0 } : { y: "100%" },
      animate: reduce ? { opacity: 1 } : { y: 0 },
      exit: reduce ? { opacity: 0 } : { y: "100%" },
      transition: { type: "spring" as const, damping: 30, stiffness: 300 },
    },
  }[variant];

  return (
    <AnimatePresence>
      {open && (
        <div className={`fixed inset-0 z-[60] ${className}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
            className={`absolute inset-0 ${
              variant === "right" || variant === "bottom"
                ? "bg-ink/45 backdrop-blur-[2px]"
                : "bg-ink/70 backdrop-blur-md"
            }`}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            {...motionProps}
            className={`${panelClassName} outline-none`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
