/**
 * A tiny external store around localStorage.
 *
 * Reading hydrated cart / wishlist data through `useSyncExternalStore` means
 * the very first committed render is already correct — no `useEffect` +
 * `setState` hydration cascade, no flash of an empty cart, and no React 19
 * `set-state-in-effect` lint error.
 */
import { useCallback, useSyncExternalStore } from "react";

type Listener = () => void;

const listeners = new Set<Listener>();
let hydrated = false;

/** Snapshots are cached so `getSnapshot` stays referentially stable. */
const cache = new Map<string, { raw: string | null; value: unknown }>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener) {
  if (!hydrated) {
    hydrated = true;
    // Re-read once the browser store is available.
    cache.clear();
    queueMicrotask(emit);
  }
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    const cached = cache.get(key);
    if (cached && cached.raw === raw) return cached.value as T;
    const value = raw ? (JSON.parse(raw) as T) : fallback;
    cache.set(key, { raw, value });
    return value;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(value);
    window.localStorage.setItem(key, raw);
    cache.set(key, { raw, value });
    emit();
  } catch {
    /* storage disabled or full — fail quietly */
  }
}

/** Subscribe to a JSON-encoded localStorage key. */
export function useStoredValue<T>(key: string, fallback: T) {
  const getSnapshot = useCallback(() => readStore<T>(key, fallback), [key, fallback]);
  return useSyncExternalStore(subscribe, getSnapshot, () => fallback);
}

export function useStoredSetter<T>(key: string) {
  return useCallback((value: T) => writeStore(key, value), [key]);
}
