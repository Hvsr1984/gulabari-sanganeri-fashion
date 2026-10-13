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

export type WishlistItem = {
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  garment: string;
  motifFamily: string;
  fabric: string;
};

type WishlistState = {
  items: WishlistItem[];
  isOpen: boolean;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (slug: string) => boolean;
  removeItem: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  count: number;
};

const WishlistContext = createContext<WishlistState | null>(null);
const STORAGE_KEY = "gulabari-wishlist-v1";
const EMPTY: WishlistItem[] = [];

export function WishlistProvider({ children }: { children: ReactNode }) {
  // Same pattern as the cart: read straight from the store on first render.
  const stored = useStoredValue<WishlistItem[]>(STORAGE_KEY, EMPTY);
  const persist = useStoredSetter<WishlistItem[]>(STORAGE_KEY);
  const [isOpen, setIsOpen] = useState(false);

  const toggleWishlist = useCallback(
    (item: WishlistItem) => {
      const exists = stored.some((entry) => entry.slug === item.slug);
      persist(exists ? stored.filter((entry) => entry.slug !== item.slug) : [...stored, item]);
    },
    [persist, stored]
  );

  const removeItem = useCallback(
    (slug: string) => persist(stored.filter((entry) => entry.slug !== slug)),
    [persist, stored]
  );

  const clear = useCallback(() => persist(EMPTY), [persist]);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<WishlistState>(
    () => ({
      items: stored,
      isOpen,
      toggleWishlist,
      isInWishlist: (slug: string) => stored.some((entry) => entry.slug === slug),
      removeItem,
      clear,
      open,
      close,
      count: stored.length,
    }),
    [stored, isOpen, toggleWishlist, removeItem, clear, open, close]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
