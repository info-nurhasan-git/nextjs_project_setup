import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.email("Please enter a valid email address."),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid email." },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    await Subscriber.updateOne(
      { email: parsed.data.email.toLowerCase() },
      { $setOnInsert: { email: parsed.data.email.toLowerCase() } },
      { upsert: true }
    );
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Could not subscribe right now. Please try again." },
      { status: 500 }
    );
  }
}
