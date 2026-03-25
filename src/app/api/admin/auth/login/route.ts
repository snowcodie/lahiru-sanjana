import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  getAdminEmail,
  isOtpEnabled,
  requestAdminOtp,
  verifyAdminPassword,
} from "@/lib/auth";
import { AdminLoginSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = AdminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { identifier, password } = parsed.data;

  console.log("[login-debug] identifier:", JSON.stringify(identifier));
  console.log("[login-debug] ADMIN_EMAIL:", JSON.stringify(process.env.ADMIN_EMAIL));
  console.log("[login-debug] HASH:", JSON.stringify(process.env.ADMIN_PASSWORD_HASH));

  const valid = await verifyAdminPassword(identifier, password);
  console.log("[login-debug] valid:", valid);
  if (!valid) {
    // Intentionally vague to avoid leaking whether the identifier exists
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  // OTP mode: send code and ask the client to show the OTP step
  if (isOtpEnabled()) {
    try {
      await requestAdminOtp(getAdminEmail());
    } catch {
      return NextResponse.json(
        { error: "Failed to send OTP email. Check SMTP configuration." },
        { status: 500 }
      );
    }
    return NextResponse.json({ otpRequired: true }, { status: 200 });
  }

  // Password-only mode: create session immediately
  const session = await createAdminSession(getAdminEmail());

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: session.token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: session.expiresAt,
  });

  return response;
}
