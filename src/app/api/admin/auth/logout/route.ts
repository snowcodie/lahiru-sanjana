import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, deleteAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  await deleteAdminSession(token);

  const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}