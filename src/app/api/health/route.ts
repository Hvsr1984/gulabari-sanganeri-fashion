import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (db) {
      await db.execute(sql`select 1`);
    }
    return Response.json({ ok: true, mode: db ? "database" : "mock" });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

