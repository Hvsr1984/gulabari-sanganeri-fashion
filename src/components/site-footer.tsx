"use client";

import Link from "next/link";
import { useState } from "react";
import { BelGlyph } from "./motif-glyphs";
import { GulabariLogo } from "./gulabari-logo";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="mt-20 sm:mt-28 border-t border-teak/15 bg-bone-deep/70 text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0">
                <GulabariLogo variant="dark" mode="emblem" className="h-full w-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.2em] uppercase text-madder">
                  GULABARI
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] font-mono text-teak font-medium">
                  JAIPUR
                </span>
              </div>
            </Link>
            <p className="mt-3 font-serif italic text-base text-teak font-medium">
              Handcrafted Textiles · Timeless Stories
            </p>
            <p className="mt-3 max-w-sm text-xs sm:text-sm leading-relaxed text-ink-soft">
              Authentic Sanganeri hand block printed cotton fashion. Carved by hand in seasoned teak,
              dyed with botanical pigments, and printed block by block in Rajasthan.
            </p>
            <BelGlyph className="mt-6 h-8 w-44 text-teak/40" />
          </div>

          {/* Nav Col 1 */}
          <div className="lg:col-span-2 sm:pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink font-mono">
              Collection
            </p>
            <ul className="mt-4 space-y-2.5 text-xs uppercase tracking-wider text-ink-soft">
              <li>
                <Link href="/shop" className="hover:text-indigo transition-colors">
                  Shop All Pieces
                </Link>
              </li>
              <li>
                <Link href="/shop?garment=kurta" className="hover:text-indigo transition-colors">
                  Cotton Kurtas
                </Link>
              </li>
              <li>
                <Link href="/shop?garment=dress" className="hover:text-indigo transition-colors">
                  Tiered Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?garment=shirt" className="hover:text-indigo transition-colors">
                  Camp Collar Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop?garment=dupatta" className="hover:text-indigo transition-colors">
                  Fine Dupattas
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink font-mono">
              The Craft
            </p>
            <ul className="mt-4 space-y-2.5 text-xs uppercase tracking-wider text-ink-soft">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink font-mono">
              The Slow Letter
            </p>
            <p className="mt-4 text-xs leading-relaxed text-ink-soft">
              Subtle dispatches from our Jaipur printing tables. Seasonal drops, craft essays,
              and care advice. No commercial noise.
            </p>

            <form onSubmit={subscribe} className="mt-4">
              <div className="flex overflow-hidden rounded-full border border-teak/30 bg-bone cloth-shadow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-4 py-3 text-xs outline-none text-ink placeholder-ink-soft/60 font-sans"
                  aria-label="Email address"
                  required
                />
                <button
                  type="submit"
                  className="shrink-0 bg-indigo px-5 text-xs font-semibold uppercase tracking-wider text-bone transition-all hover:bg-indigo-deep disabled:opacity-50"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "…" : "Subscribe"}
                </button>
              </div>

              {status === "done" && (
                <p className="mt-2 text-xs text-sage font-medium">
                  Thank you for subscribing. Check your inbox for our seasonal letter.
                </p>
              )}
              {status === "error" && (
                <p className="mt-2 text-xs text-madder font-medium">
                  Please enter a valid email address.
                </p>
              )}
            </form>

            <div className="mt-6 flex items-center gap-4 text-xs text-teak">
              <span>Instagram</span>
              <span>·</span>
              <span>Pinterest</span>
              <span>·</span>
              <span>Studio Jaipur</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & GI Attribution */}
        <div className="mt-16 flex flex-col gap-4 border-t border-teak/15 pt-8 text-xs text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} GULABARI JAIPUR. Geographical Indication (GI) tagged Sanganeri craft.</p>
          <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-wider">
            <span>Shipping: 5–7 Days Across India</span>
            <span>Worldwide Courier</span>
            <span>Natural Botanical Dyes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
