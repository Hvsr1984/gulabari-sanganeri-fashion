/**
 * A tiny in-memory sliding-window limiter.
 *
 * It is per-instance rather than distributed — good enough to stop the casual
 * form-spam and accidental double submits that public forms attract. Swap the
 * store for Redis/Upstash if the storefront ever runs multi-region.
 */
type Entry = { hits: number[] };

const store = new Map<string, Entry>();
const MAX_KEYS = 5000;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();

  // Opportunistic cleanup so the map cannot grow without bound.
  if (store.size > MAX_KEYS) {
    for (const [existingKey, entry] of store) {
      if (entry.hits.every((hit) => now - hit > windowMs)) store.delete(existingKey);
    }
  }

  const entry = store.get(key) ?? { hits: [] };
  entry.hits = entry.hits.filter((hit) => now - hit < windowMs);

  if (entry.hits.length >= limit) {
    const oldest = entry.hits[0];
    store.set(key, entry);
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }

  entry.hits.push(now);
  store.set(key, entry);
  return { ok: true, remaining: limit - entry.hits.length, retryAfterSeconds: 0 };
}

/** Best-effort client identity for rate limiting behind a proxy. */
export function clientKey(req: Request, scope: string) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
  return `${scope}:${ip}`;
}
