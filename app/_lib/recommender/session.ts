import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const CC_USER_COOKIE = "cc_uid";

export async function getOrCreateUserId(): Promise<{ userId: string; isNew: boolean }> {
  const jar = await cookies();
  const existing = jar.get(CC_USER_COOKIE)?.value;
  if (existing && /^[a-zA-Z0-9-]{8,64}$/.test(existing)) {
    return { userId: existing, isNew: false };
  }
  return { userId: crypto.randomUUID(), isNew: true };
}

export function attachUserCookie(
  res: NextResponse,
  userId: string,
  isNew: boolean,
): NextResponse {
  if (isNew) {
    res.cookies.set(CC_USER_COOKIE, userId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return res;
}
