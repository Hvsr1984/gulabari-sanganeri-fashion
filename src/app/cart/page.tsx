import type { Metadata } from "next";
import { Checkout } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Cart & Checkout",
  description: "Review your GULABARI pieces and check out.",
};

export default function CartPage() {
  return (
    <div className="grain min-h-screen pt-24 pb-20 sm:pt-28">
      <header className="mx-auto max-w-5xl px-5 py-6">
        <h1 className="font-serif text-4xl">Your Cart</h1>
      </header>
      <Checkout />
    </div>
  );
}
