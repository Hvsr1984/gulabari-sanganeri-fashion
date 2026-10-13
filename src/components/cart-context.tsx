"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useStoredSetter, useStoredValue } from "@/lib/hydration";

export type CartItem = {
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  size: string;
  colorway: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  count: number;
  subtotalCents: number;
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "gulabari-cart-v1";
const EMPTY: CartItem[] = [];

export function CartProvider({ children }: { children: ReactNode }) {
  /**
   * The cart lives in localStorage, read through useSyncExternalStore, so the
   * first render is already hydrated — no effect-driven setState cascade and
   * no hydration mismatch between server and client markup.
   */
  const stored = useStoredValue<CartItem[]>(STORAGE_KEY, EMPTY);
  const persist = useStoredSetter<CartItem[]>(STORAGE_KEY);
  const [isOpen, setIsOpen] = useState(false);

  const setItems = useCallback(
    (updater: (previous: CartItem[]) => CartItem[]) => persist(updater(stored)),
    [persist, stored]
  );

  const addItem = useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      setItems((prev) => {
        const index = prev.findIndex(
          (entry) => entry.slug === item.slug && entry.size === item.size
        );
        if (index >= 0) {
          const next = [...prev];
          next[index] = { ...next[index], qty: next[index].qty + qty };
          return next;
        }
        return [...prev, { ...item, qty }];
      });
      setIsOpen(true);
    },
    [setItems]
  );

  const removeItem = useCallback(
    (slug: string, size: string) => {
      setItems((prev) => prev.filter((entry) => !(entry.slug === slug && entry.size === size)));
    },
    [setItems]
  );

  const updateQty = useCallback(
    (slug: string, size: string, qty: number) => {
      setItems((prev) =>
        prev
          .map((entry) =>
            entry.slug === slug && entry.size === size
              ? { ...entry, qty: Math.max(1, qty) }
              : entry
          )
          .filter((entry) => entry.qty > 0)
      );
    },
    [setItems]
  );

  const clear = useCallback(() => persist(EMPTY), [persist]);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartState>(() => {
    const count = stored.reduce((total, item) => total + item.qty, 0);
    const subtotalCents = stored.reduce((total, item) => total + item.priceCents * item.qty, 0);
    return {
      items: stored,
      isOpen,
      addItem,
      removeItem,
      updateQty,
      clear,
      open,
      close,
      count,
      subtotalCents,
    };
  }, [stored, isOpen, addItem, removeItem, updateQty, clear, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatPrice(cents: number) {
  return `₹${(cents / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
