"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { SearchModal } from "./search-modal";
import { GulabariBrandLockup } from "./gulabari-logo";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/craft", label: "Sanganeri Craft" },
  { href: "/artisans", label: "Artisans" },
  { href: "/journal", label: "Journal" },
  { href: "/sustainability", label: "Care" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count: cartCount, open: openCart } = useCart();
  const { count: wishlistCount, open: openWishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const reduce = useReducedMotion();

  // Close the mobile sheet on navigation without an effect-driven setState:
  // React's documented "adjust state during render" pattern.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  // Escape dismisses the mobile sheet, matching every other overlay on the site.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Scroll state and the reading-progress hairline come from motion values,
  // so scrolling never triggers a React re-render on the hot path.
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 40;
    if (next !== scrolled) setScrolled(next);
  });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-[background-color,box-shadow,border-color] duration-500 ${
          isTransparent
            ? "from-ink/80 via-ink/35 text-bone border-b border-white/10 bg-gradient-to-b to-transparent"
            : "border-teak/15 text-ink border-b bg-[#F3EFE6]/95 shadow-sm backdrop-blur-md"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
            scrolled ? "h-16" : "h-20 sm:h-[5.5rem]"
          }`}
        >
          <Link
            href="/"
            className="group flex items-center rounded-lg"
            aria-label="GULABARI JAIPUR — home"
          >
            <span className="transition-transform duration-500 group-hover:scale-[1.02]">
              <GulabariBrandLockup isTransparent={isTransparent} scrolled={scrolled} />
            </span>
          </Link>

          {/* Desktop navigation with a sliding cloth-underline */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-xs font-medium tracking-widest uppercase transition-colors ${
                    isTransparent
                      ? active
                        ? "text-bone font-semibold"
                        : "text-bone/80 hover:text-bone"
                      : active
                        ? "text-indigo font-semibold"
                        : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-1 left-0 h-[1.5px] w-full ${
                        isTransparent ? "bg-bone" : "bg-indigo"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex items-center gap-1.5 rounded-full p-2 text-xs transition-colors ${
                isTransparent
                  ? "text-bone/90 hover:bg-white/10"
                  : "text-ink-soft hover:bg-teak/10 hover:text-ink"
              }`}
              aria-label="Search the collection"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="hidden font-sans text-xs tracking-wider uppercase md:inline">
                Search
              </span>
            </button>

            <button
              onClick={openWishlist}
              className={`relative flex items-center gap-1.5 rounded-full p-2 text-xs transition-colors ${
                isTransparent
                  ? "text-bone/90 hover:bg-white/10"
                  : "text-ink-soft hover:bg-teak/10 hover:text-ink"
              }`}
              aria-label={`Open wishlist, ${wishlistCount} ${wishlistCount === 1 ? "piece" : "pieces"} saved`}
            >
              <svg
                className={`h-4 w-4 ${wishlistCount > 0 ? "fill-madder text-madder" : "fill-none stroke-current"}`}
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="bg-madder text-bone flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-all ${
                isTransparent
                  ? "text-bone border border-white/30 bg-white/10 hover:bg-white/20"
                  : "border-teak/30 bg-bone-deep/60 text-ink hover:border-indigo hover:text-indigo border"
              }`}
              aria-label={`Open shopping cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.6}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-indigo text-bone flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className={`rounded-full p-2 transition-colors lg:hidden ${
                isTransparent ? "text-bone hover:bg-white/10" : "text-ink hover:bg-teak/10"
              }`}
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span className="flex h-4 w-5 flex-col justify-between">
                <span
                  className={`h-0.5 w-full transition-transform duration-300 ${
                    isTransparent ? "bg-bone" : "bg-ink"
                  } ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`h-0.5 w-full transition-opacity duration-200 ${
                    isTransparent ? "bg-bone" : "bg-ink"
                  } ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-0.5 w-full transition-transform duration-300 ${
                    isTransparent ? "bg-bone" : "bg-ink"
                  } ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress — a hairline of madder dye drawn as you scroll */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={`h-[2px] origin-left ${isTransparent ? "bg-bone/70" : "bg-madder/70"}`}
        />

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="border-teak/15 bg-bone text-ink overflow-hidden border-t shadow-xl lg:hidden"
            >
              <div className="divide-teak/10 flex flex-col divide-y px-6 py-3">
                {NAV.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`hover:text-indigo block py-3.5 font-serif text-sm tracking-widest uppercase transition-colors ${
                        pathname === item.href ? "text-indigo" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="text-teak flex gap-4 pt-4 pb-2 text-xs">
                  <span>Handcrafted in Jaipur</span>
                  <span aria-hidden="true">•</span>
                  <span>GI Tagged Sanganeri</span>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
