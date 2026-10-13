import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { validateEmail } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const limit = rateLimit(clientKey(req, "subscribe"), { limit: 6, windowMs: 60_000 });
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Too many attempts — please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Malformed request body." }, { status: 400 });
  }

  const parsed = validateEmail((payload as { email?: unknown })?.email);
  if (!parsed.ok) {
    return Response.json(
      { ok: false, error: parsed.errors[0]?.message ?? "Invalid email." },
      { status: 400 }
    );
  }

  try {
    if (db) {
      await db.insert(subscribers).values({ email: parsed.data.email }).onConflictDoNothing();
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[subscribe] failed to persist subscriber", error);
    return Response.json(
      { ok: false, error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
