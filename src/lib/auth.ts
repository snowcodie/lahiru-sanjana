import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { sendAdminOtpEmail } from "@/lib/mail";

export const ADMIN_SESSION_COOKIE = "admin_session";

const OTP_TTL_MINUTES = 10;
const SESSION_TTL_DAYS = 7;

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
}

/** Returns true when OTP is required after a successful password login. */
export function isOtpEnabled() {
  return process.env.ENABLE_OTP?.trim().toLowerCase() === "true";
}

/**
 * Verify the submitted identifier + password against the ADMIN_EMAIL and
 * ADMIN_PASSWORD_HASH env vars. Returns true on success.
 */
export async function verifyAdminPassword(
  identifier: string,
  password: string
): Promise<boolean> {
  const adminIdentifier = getAdminEmail();
  const passwordHash = (process.env.ADMIN_PASSWORD_HASH?.trim() ?? "").replace(/^['"]|['"]$/g, "");

  if (!adminIdentifier || !passwordHash) {
    return false;
  }

  const identifierMatches = identifier.trim().toLowerCase() === adminIdentifier;
  if (!identifierMatches) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
}

export async function requestAdminOtp(identifier: string) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const adminEmail = getAdminEmail();

  if (!adminEmail || normalizedIdentifier !== adminEmail) {
    return { success: true };
  }

  const code = generateOtpCode();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await prisma.adminOtpCode.updateMany({
    where: {
      email: normalizedIdentifier,
      consumedAt: null,
    },
    data: {
      consumedAt: new Date(),
    },
  });

  await prisma.adminOtpCode.create({
    data: {
      email: normalizedIdentifier,
      codeHash: hashValue(code),
      expiresAt,
    },
  });

  await sendAdminOtpEmail({
    email: normalizedIdentifier,
    code,
    expiresAt,
  });

  return { success: true };
}

export async function verifyAdminOtp(identifier: string, code: string) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const adminEmail = getAdminEmail();

  if (!adminEmail || normalizedIdentifier !== adminEmail) {
    return null;
  }

  const otp = await prisma.adminOtpCode.findFirst({
    where: {
      email: normalizedIdentifier,
      codeHash: hashValue(code),
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) {
    return null;
  }

  await prisma.adminOtpCode.update({
    where: { id: otp.id },
    data: { consumedAt: new Date() },
  });

  return createAdminSession(normalizedIdentifier);
}

export async function createAdminSession(email: string) {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await prisma.adminSession.create({
    data: {
      email,
      tokenHash: hashValue(rawToken),
      expiresAt,
    },
  });

  return {
    token: rawToken,
    expiresAt,
    email,
  };
}

export async function deleteAdminSession(token: string | undefined) {
  if (!token) {
    return;
  }

  await prisma.adminSession.deleteMany({
    where: {
      tokenHash: hashValue(token),
    },
  });
}

export async function getAdminSessionFromRequest(request: NextRequest) {
  const cookieToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (cookieToken) {
    const session = await findValidSession(cookieToken);
    if (session) {
      return session;
    }
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.slice(7).trim();
  const secret = process.env.ADMIN_SECRET_KEY;
  if (!secret || token.length === 0) {
    return null;
  }

  return timingSafeEqual(token, secret)
    ? { email: getAdminEmail() || "admin", expiresAt: new Date(Date.now() + 60_000) }
    : null;
}

export async function isAdminAuthorized(request: NextRequest): Promise<boolean> {
  const session = await getAdminSessionFromRequest(request);
  return Boolean(session);
}

export async function getAdminSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return findValidSession(token);
}

export async function requireAdminPageAccess() {
  const session = await getAdminSessionFromCookies();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

function generateOtpCode() {
  return String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
}

function hashValue(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

async function findValidSession(token: string) {
  const session = await prisma.adminSession.findFirst({
    where: {
      tokenHash: hashValue(token),
      expiresAt: { gt: new Date() },
    },
    select: {
      email: true,
      expiresAt: true,
    },
  });

  return session;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
