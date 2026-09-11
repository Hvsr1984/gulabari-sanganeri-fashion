import { db } from "@/db";
import { subscribers } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (typeof email !== "string" || !email.includes("@")) {
      return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    if (db) {
      await db
        .insert(subscribers)
        .values({ email: email.toLowerCase().trim() })
        .onConflictDoNothing();
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

