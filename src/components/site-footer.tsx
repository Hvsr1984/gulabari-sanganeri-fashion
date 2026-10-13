"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { BelGlyph } from "./motif-glyphs";
import { GulabariLogo } from "./gulabari-logo";
import { EMAIL_PATTERN } from "@/lib/validation";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const fieldId = useId();

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)
      ?.value;
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company: honeypot ?? "" }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-teak/15 bg-bone-deep/70 text-ink mt-20 border-t sm:mt-28">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 sm:h-16 sm:w-16">
                <GulabariLogo variant="dark" mode="emblem" className="h-full w-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-madder font-serif text-2xl font-semibold tracking-[0.2em] uppercase sm:text-3xl">
                  GULABARI
                </span>
                <span className="text-teak font-mono text-[10px] font-medium tracking-[0.28em] uppercase">
                  JAIPUR
                </span>
              </div>
            </Link>
            <p className="text-teak mt-3 font-serif text-base font-medium italic">
              Handcrafted Textiles · Timeless Stories
            </p>
            <p className="text-ink-soft mt-3 max-w-sm text-xs leading-relaxed sm:text-sm">
              Authentic Sanganeri hand block printed cotton fashion. Carved by hand in seasoned
              teak, dyed with botanical pigments, and printed block by block in Rajasthan.
            </p>
            <BelGlyph className="text-teak/40 mt-6 h-8 w-44" />
          </div>

          {/* Nav Col 1 */}
          <div className="sm:pl-4 lg:col-span-2">
            <p className="text-ink font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              Collection
            </p>
            <ul className="text-ink-soft mt-4 space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <Link href="/shop" className="hover:text-indigo transition-colors">
                  Shop All Pieces
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?garment=kurta"
                  className="hover:text-indigo transition-colors"
                >
                  Cotton Kurtas
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?garment=dress"
                  className="hover:text-indigo transition-colors"
                >
                  Tiered Dresses
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?garment=shirt"
                  className="hover:text-indigo transition-colors"
                >
                  Camp Collar Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?garment=dupatta"
                  className="hover:text-indigo transition-colors"
                >
                  Fine Dupattas
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="lg:col-span-2">
            <p className="text-ink font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              The Craft
            </p>
            <ul className="text-ink-soft mt-4 space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <Link href="/craft" className="hover:text-indigo transition-colors">
                  Sanganeri Craft
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-indigo transition-colors">
                  The Chippa Artisans
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-indigo transition-colors">
                  The Journal
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-indigo transition-colors">
                  Textile Care
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo transition-colors">
                  Contact &amp; Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / The Slow Letter */}
          <div className="lg:col-span-4">
            <p className="text-ink font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              The Slow Letter
            </p>
            <p className="text-ink-soft mt-4 text-xs leading-relaxed">
              Subtle dispatches from our Jaipur printing tables. Seasonal drops, craft essays,
              and care advice. No commercial noise.
            </p>

            <form onSubmit={subscribe} className="relative mt-4" noValidate>
              <div className="border-teak/30 bg-bone cloth-shadow flex overflow-hidden rounded-full border">
                <label htmlFor={`${fieldId}-email`} className="sr-only">
                  Email address for The Slow Letter
                </label>
                <input
                  id={`${fieldId}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  className="text-ink placeholder-ink-soft/60 w-full bg-transparent px-4 py-3 font-sans text-xs focus-visible:outline-none"
                  aria-describedby={`${fieldId}-status`}
                  required
                />
                {/* Honeypot — hidden from people, irresistible to bots. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                />
                <button
                  type="submit"
                  className="bg-indigo text-bone hover:bg-indigo-deep shrink-0 px-5 text-xs font-semibold tracking-wider uppercase transition-all disabled:opacity-50"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "…" : "Subscribe"}
                </button>
              </div>

              <p
                id={`${fieldId}-status`}
                aria-live="polite"
                className="mt-2 min-h-[1rem] text-xs font-medium"
              >
                {status === "done" && (
                  <span className="text-sage">
                    Thank you. Your first letter will arrive with the next seasonal drop.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-madder">Please enter a valid email address.</span>
                )}
              </p>
            </form>

            <div className="text-teak mt-6 flex items-center gap-4 text-xs">
              <span>Instagram</span>
              <span>·</span>
              <span>Pinterest</span>
              <span>·</span>
              <span>Studio Jaipur</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & GI Attribution */}
        <div className="border-teak/15 text-ink-soft mt-16 flex flex-col gap-4 border-t pt-8 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} GULABARI JAIPUR. Geographical Indication (GI) tagged
            Sanganeri craft.
          </p>
          <div className="flex flex-wrap gap-6 text-[11px] tracking-wider uppercase">
            <span>Shipping: 5–7 Days Across India</span>
            <span>Worldwide Courier</span>
            <span>Natural Botanical Dyes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
