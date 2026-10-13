import { describe, expect, it, vi, afterEach } from "vitest";
import { clientKey, rateLimit } from "./rate-limit";

afterEach(() => {
  vi.useRealTimers();
});

describe("rateLimit", () => {
  it("allows requests up to the limit, then blocks with a retry hint", () => {
    const key = `test-${Math.random()}`;

    for (let i = 0; i < 3; i += 1) {
      expect(rateLimit(key, { limit: 3, windowMs: 1000 }).ok).toBe(true);
    }

    const blocked = rateLimit(key, { limit: 3, windowMs: 1000 });
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("lets the window slide so a caller recovers", () => {
    vi.useFakeTimers();
    const key = `slide-${Math.random()}`;

    rateLimit(key, { limit: 1, windowMs: 1000 });
    expect(rateLimit(key, { limit: 1, windowMs: 1000 }).ok).toBe(false);

    vi.advanceTimersByTime(1100);
    expect(rateLimit(key, { limit: 1, windowMs: 1000 }).ok).toBe(true);
  });

  it("scopes buckets independently", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, { limit: 1, windowMs: 1000 });
    expect(rateLimit(a, { limit: 1, windowMs: 1000 }).ok).toBe(false);
    expect(rateLimit(b, { limit: 1, windowMs: 1000 }).ok).toBe(true);
  });
});

describe("clientKey", () => {
  it("prefers the first forwarded address behind a proxy", () => {
    const req = new Request("https://gulabari.test/api/contact", {
      headers: { "x-forwarded-for": "203.0.113.7, 70.41.3.18" },
    });
    expect(clientKey(req, "contact")).toBe("contact:203.0.113.7");
  });

  it("falls back to x-real-ip and then to a local bucket", () => {
    const realIp = new Request("https://gulabari.test/api/contact", {
      headers: { "x-real-ip": "198.51.100.4" },
    });
    expect(clientKey(realIp, "subscribe")).toBe("subscribe:198.51.100.4");
    expect(clientKey(new Request("https://gulabari.test/"), "contact")).toBe("contact:local");
  });
});
