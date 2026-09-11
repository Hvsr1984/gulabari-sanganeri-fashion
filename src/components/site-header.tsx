"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const reduce = useReducedMotion();

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Determine header appearance
  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 ${
          isTransparent
            ? "bg-gradient-to-b from-ink/80 via-ink/35 to-transparent text-bone border-b border-white/10"
            : "bg-[#F3EFE6] text-ink border-b border-teak/15 shadow-sm"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            scrolled ? "h-16" : "h-20 sm:h-22"
          }`}
        >
          {/* GULABARI Brand Logo */}
          <Link href="/" className="group flex items-center" aria-label="GULABARI JAIPUR Home">
            <GulabariBrandLockup isTransparent={isTransparent} scrolled={scrolled} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-xs uppercase tracking-widest font-medium transition-colors ${
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
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right utility actions: Search, Wishlist, Cart, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex items-center gap-1.5 rounded-full p-2 text-xs transition-colors ${
                isTransparent
                  ? "text-bone/90 hover:bg-white/10"
                  : "text-ink-soft hover:text-ink hover:bg-teak/10"
              }`}
              aria-label="Search collection"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="hidden md:inline font-sans text-xs uppercase tracking-wider">Search</span>
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={openWishlist}
              className={`relative flex items-center gap-1.5 rounded-full p-2 text-xs transition-colors ${
                isTransparent
                  ? "text-bone/90 hover:bg-white/10"
                  : "text-ink-soft hover:text-ink hover:bg-teak/10"
              }`}
              aria-label={`Open wishlist, ${wishlistCount} items`}
            >
              <svg
                className={`h-4 w-4 ${wishlistCount > 0 ? "fill-madder text-madder" : "fill-none stroke-current"}`}
                viewBox="0 0 24 24"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-madder text-[10px] font-bold text-bone">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all ${
                isTransparent
                  ? "border border-white/30 bg-white/10 text-bone hover:bg-white/20"
                  : "border border-teak/30 bg-bone-deep/60 text-ink hover:border-indigo hover:text-indigo"
              }`}
              aria-label={`Open shopping cart, ${cartCount} items`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.6}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-indigo px-1 text-[10px] font-bold text-bone">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`rounded-full p-2 lg:hidden transition-colors ${
                isTransparent ? "text-bone hover:bg-white/10" : "text-ink hover:bg-teak/10"
              }`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              <div className="flex h-4 w-5 flex-col justify-between">
                <span
                  className={`h-0.5 w-full transition-transform ${isTransparent ? "bg-bone" : "bg-ink"} ${
                    menuOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full transition-opacity ${isTransparent ? "bg-bone" : "bg-ink"} ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full transition-transform ${isTransparent ? "bg-bone" : "bg-ink"} ${
                    menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-teak/15 bg-bone text-ink shadow-xl lg:hidden"
          >
            <div className="flex flex-col px-6 py-5 divide-y divide-teak/10">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3.5 text-sm uppercase tracking-widest font-serif text-ink hover:text-indigo transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 pb-2 flex gap-4 text-xs text-teak">
                <span>Handcrafted in Jaipur</span>
                <span>•</span>
                <span>GI Tagged Sanganeri</span>
              </div>
            </div>
          </motion.nav>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
