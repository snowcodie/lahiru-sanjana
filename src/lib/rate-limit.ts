import { LRUCache } from "lru-cache";

type RateLimitResult =
  | { success: true }
  | { success: false; retryAfter: number };

const cache = new LRUCache<string, number[]>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour window
});

const MAX_ATTEMPTS = 5;

/**
 * Simple IP-based rate limiter for the contact form.
 * Limits to MAX_ATTEMPTS per IP per hour.
 */
export function rateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const timestamps = (cache.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );

  if (timestamps.length >= MAX_ATTEMPTS) {
    const oldest = timestamps[0];
    const retryAfter = Math.ceil((windowMs - (now - oldest)) / 1000);
    return { success: false, retryAfter };
  }

  timestamps.push(now);
  cache.set(ip, timestamps);
  return { success: true };
}
