import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/dal";
import { profileSchema } from "@/lib/validation";
import { toUserData } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest) {
  const current = await getCurrentUser();
  if (!current) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid data.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const user = await User.findByIdAndUpdate(current.id, parsed.data, {
      new: true,
    }).lean();

    if (!user) {
      return Response.json({ error: "User not found." }, { status: 404 });
    }

    return Response.json({ user: toUserData(user) });
  } catch {
    return Response.json(
      { error: "Could not update your profile." },
      { status: 500 }
    );
  }
}
