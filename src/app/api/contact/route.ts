import { db } from "@/db";
import { messages } from "@/db/schema";
import { validateContact, type ContactInput } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const limit = rateLimit(clientKey(req, "contact"), { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Too many messages — please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Malformed request body." }, { status: 400 });
  }

  const parsed = validateContact(payload);
  if (!parsed.ok) {
    return Response.json(
      {
        ok: false,
        error: parsed.errors[0]?.message ?? "Invalid input.",
        errors: parsed.errors,
      },
      { status: 400 }
    );
  }

  const body: ContactInput = parsed.data;

  // A hidden honeypot field: bots fill it, humans never see it.
  if (
    typeof (payload as Record<string, unknown>)?.company === "string" &&
    ((payload as Record<string, unknown>).company as string).trim() !== ""
  ) {
    // Pretend success so the bot does not retry.
    return Response.json({ ok: true });
  }

  try {
    if (db) {
      await db.insert(messages).values(body);
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] failed to persist message", error);
    return Response.json(
      { ok: false, error: "We could not save your message. Please email us directly." },
      { status: 500 }
    );
  }
}
