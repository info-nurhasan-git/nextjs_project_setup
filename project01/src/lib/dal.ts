import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "./mongodb";
import User from "@/models/User";
import { decrypt, SESSION_COOKIE, type SessionPayload } from "./session";
import { toUserData } from "./serialize";
import type { UserData } from "./types";

export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return decrypt(token);
});

export const getCurrentUser = cache(async (): Promise<UserData | null> => {
  const session = await getSession();
  if (!session) return null;

  try {
    await connectDB();
    const user = await User.findById(session.userId).lean();
    if (!user) return null;
    return toUserData(user);
  } catch {
    return null;
  }
});

export async function requireUser(redirectTo = "/login"): Promise<UserData> {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return user;
}

export async function requireAdmin(): Promise<UserData> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");
  if (user.role !== "admin") redirect("/profile");
  return user;
}
