import { NextRequest } from "next/server";

/**
 * Verifies the admin secret key from the Authorization header.
 * Expects: Authorization: Bearer <ADMIN_SECRET_KEY>
 */
export function isAdminAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.slice(7).trim();
  const secret = process.env.ADMIN_SECRET_KEY;
  if (!secret || token.length === 0) {
    return false;
  }
  // Constant-time comparison to prevent timing attacks
  return timingSafeEqual(token, secret);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
