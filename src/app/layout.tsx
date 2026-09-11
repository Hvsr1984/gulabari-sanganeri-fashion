import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { WishlistProvider } from "@/components/wishlist-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartDrawer } from "@/components/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist-drawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GULABARI — Authentic Sanganeri Hand Block Print Luxury Fashion · Jaipur",
    template: "%s · GULABARI Jaipur",
  },
  description:
    "GULABARI celebrates authentic Sanganeri hand block printed cotton, handcrafted in Jaipur. Rooted in centuries-old Chippa craft, natural botanical dyes, and contemporary luxury silhouettes.",
  keywords: [
    "GULABARI",
    "Gulabari Jaipur",
    "Sanganeri block print",
    "Jaipur hand block print",
    "luxury cotton kurtas",
    "Sanganer textiles",
    "handcrafted Indian fashion",
    "natural dyes",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-bone text-ink antialiased selection:bg-indigo selection:text-bone">
        <CartProvider>
          <WishlistProvider>
            <SiteHeader />
            <CartDrawer />
            <WishlistDrawer />
            <main>{children}</main>
            <SiteFooter />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
