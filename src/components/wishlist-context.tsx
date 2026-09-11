"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

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

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const isInWishlist = useCallback(
    (slug: string) => items.some((item) => item.slug === slug),
    [items]
  );

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.slug === item.slug);
      if (exists) {
        return prev.filter((p) => p.slug !== item.slug);
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        isOpen,
        toggleWishlist,
        isInWishlist,
        removeItem,
        clear,
        open,
        close,
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
