import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { WishlistProvider } from "@/components/wishlist-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartDrawer } from "@/components/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist-drawer";
import { PageTransition } from "@/components/page-transition";
import { jsonLdScript, organizationSchema, websiteSchema } from "@/lib/structured-data";

/**
 * Fonts are self-hosted from src/fonts (variable woff2, latin subset) rather
 * than fetched from Google at build time. Same two families, ~180 KB total,
 * but the build is now hermetic — it works offline, in CI and on any host.
 */
const fraunces = localFont({
  src: [
    {
      path: "../fonts/fraunces-latin-variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/fraunces-latin-variable-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  preload: true,
});

const inter = localFont({
  src: [
    {
      path: "../fonts/inter-latin-variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/inter-latin-variable-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "GULABARI — Authentic Sanganeri Hand Block Print Luxury Fashion · Jaipur",
    template: "%s · GULABARI Jaipur",
  },
  description:
    "GULABARI celebrates authentic Sanganeri hand block printed cotton, handcrafted in Jaipur. Rooted in centuries-old Chippa craft, natural botanical dyes, and contemporary luxury silhouettes.",
  applicationName: "GULABARI",
  keywords: [
    "GULABARI",
    "Gulabari Jaipur",
    "Sanganeri block print",
    "Jaipur hand block print",
    "luxury cotton kurtas",
    "Sanganer textiles",
    "handcrafted Indian fashion",
    "natural dyes",
    "Chippa community",
    "Rajasthani textile craft",
  ],
  authors: [{ name: "Harshvardhan Singh Rajawat", url: "https://github.com/Hvsr1984" }],
  creator: "Harshvardhan Singh Rajawat",
  publisher: "GULABARI Jaipur",
  alternates: { canonical: "/" },
  category: "shopping",
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: "GULABARI — Jaipur",
    title: "GULABARI — Authentic Sanganeri Hand Block Print Fashion",
    description:
      "Block-by-block printing on pure cotton with natural botanical dyes, made by Chippa artisan families in Sanganer & Jahota, Rajasthan.",
    images: [
      {
        url: "/images/og-gulabari.jpg",
        width: 1200,
        height: 630,
        alt: "GULABARI Jaipur — authentic Sanganeri hand block printed cotton",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GULABARI — Authentic Sanganeri Hand Block Print Fashion",
    description:
      "Hand-stamped in Jaipur with carved teakwood blocks and natural botanical dyes.",
    images: ["/images/og-gulabari.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5ee" },
    { media: "(prefers-color-scheme: dark)", color: "#16243d" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-bone text-ink selection:bg-indigo selection:text-bone min-h-screen antialiased"
      >
        {/* Organisation + WebSite structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript([organizationSchema(), websiteSchema()])}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <WishlistProvider>
            <SiteHeader />
            <CartDrawer />
            <WishlistDrawer />
            <main id="main-content" tabIndex={-1} className="outline-none">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
