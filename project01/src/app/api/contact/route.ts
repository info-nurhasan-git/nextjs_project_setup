import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";
import { contactSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    await Message.create(parsed.data);
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Could not send your message right now. Please try again." },
      { status: 500 }
    );
  }
}
