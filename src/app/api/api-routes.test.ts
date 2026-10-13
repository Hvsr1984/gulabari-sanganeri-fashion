import { describe, expect, it } from "vitest";
import { POST as contactPost } from "./contact/route";
import { POST as subscribePost } from "./subscribe/route";
import { GET as healthGet } from "./health/route";

function post(
  body: unknown,
  url = "https://gulabari.test/api",
  ip = `10.0.0.${Math.floor(Math.random() * 250)}`
) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("accepts a valid enquiry and works without a database (mock mode)", async () => {
    const response = await contactPost(
      post(
        {
          name: "Aarav Sharma",
          email: "aarav@example.com",
          kind: "stockist",
          message: "Interested in stocking your Jaipur collection in Udaipur.",
        },
        "https://gulabari.test/api/contact"
      )
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("rejects an invalid payload with a 400 and a field message", async () => {
    const response = await contactPost(
      post({ name: "", email: "bad", message: "x" }, "https://gulabari.test/api/contact")
    );
    expect(response.status).toBe(400);
    const json = (await response.json()) as { ok: boolean; error: string };
    expect(json.ok).toBe(false);
    expect(json.error.length).toBeGreaterThan(0);
  });

  it("rejects malformed JSON without throwing", async () => {
    const response = await contactPost(post("{ not json", "https://gulabari.test/api/contact"));
    expect(response.status).toBe(400);
  });

  it("silently absorbs honeypot submissions so bots do not retry", async () => {
    const response = await contactPost(
      post(
        {
          name: "Bot Botson",
          email: "bot@example.com",
          message: "Buy cheap backlinks now, guaranteed placement.",
          company: "spam-co",
        },
        "https://gulabari.test/api/contact"
      )
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("throttles a burst from one address with 429 + Retry-After", async () => {
    const ip = "203.0.113.99";
    const payload = {
      name: "Repeat Sender",
      email: "repeat@example.com",
      message: "Please send the wholesale catalogue and fabric swatch cards.",
    };
    let throttled: Response | null = null;
    for (let i = 0; i < 8; i += 1) {
      const response = await contactPost(
        post(payload, "https://gulabari.test/api/contact", ip)
      );
      if (response.status === 429) {
        throttled = response;
        break;
      }
    }
    expect(throttled).not.toBeNull();
    expect(throttled?.headers.get("Retry-After")).toBeTruthy();
  });
});

describe("POST /api/subscribe", () => {
  it("accepts a valid email", async () => {
    const response = await subscribePost(
      post({ email: "letter@example.com" }, "https://gulabari.test/api/subscribe")
    );
    expect(response.status).toBe(200);
  });

  it("rejects an invalid email", async () => {
    const response = await subscribePost(
      post({ email: "not-an-email" }, "https://gulabari.test/api/subscribe")
    );
    expect(response.status).toBe(400);
  });

  it("rejects a missing body field", async () => {
    const response = await subscribePost(post({}, "https://gulabari.test/api/subscribe"));
    expect(response.status).toBe(400);
  });
});

describe("GET /api/health", () => {
  it("reports mock mode when DATABASE_URL is absent", async () => {
    const response = await healthGet();
    expect(response.status).toBe(200);
    const json = (await response.json()) as { ok: boolean; mode: string };
    expect(json.ok).toBe(true);
    expect(json.mode).toBe("mock");
  });
});
