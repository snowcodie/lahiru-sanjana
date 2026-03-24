import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ContactFormSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

// POST /api/contact — submit a contact form message
export async function POST(request: NextRequest) {
  // Resolve client IP (works behind Vercel/common proxies)
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  // Apply rate limit
  const rateLimitResult = rateLimit(ip);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfter),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate and parse input
  const parseResult = ContactFormSchema.safeParse(body);
  if (!parseResult.success) {
    const details = parseResult.error.flatten().fieldErrors as Record<
      string,
      string[]
    >;
    return NextResponse.json(
      { error: "Validation failed", details },
      { status: 400 }
    );
  }

  const { name, email, subject, message, website } = parseResult.data;

  // Honeypot check — bots that fill the hidden "website" field are rejected silently
  if (website && website.length > 0) {
    // Return 200 to fool bots but do not store
    return NextResponse.json(
      { message: "Message received." },
      { status: 200 }
    );
  }

  // Basic spam scoring: flag submissions with many URLs or unusual patterns
  const urlCount = (message.match(/https?:\/\//g) ?? []).length;
  const spamScore = urlCount > 3 ? Math.min(urlCount, 10) : 0;

  try {
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject: subject ?? null,
        message,
        ipAddress: ip,
        userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
        spamScore,
      },
    });

    return NextResponse.json(
      { message: "Your message has been received. Thank you!" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to save your message. Please try again later." },
      { status: 500 }
    );
  }
}
