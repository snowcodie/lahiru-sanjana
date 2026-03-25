import { NextRequest, NextResponse } from "next/server";
import { requestAdminOtp } from "@/lib/auth";
import { AdminOtpRequestSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = AdminOtpRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    await requestAdminOtp(parsed.data.email);
    return NextResponse.json(
      { message: "If that email is authorized, an OTP has been sent." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to send OTP email." },
      { status: 500 }
    );
  }
}