import { db } from "@/db";
import { messages } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { name, email, kind, message } = await req.json();
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.includes("@") ||
      !message.trim()
    ) {
      return Response.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    if (db) {
      await db.insert(messages).values({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        kind: typeof kind === "string" ? kind : "general",
        message: message.trim(),
      });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

