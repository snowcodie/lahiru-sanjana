import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/auth";

// GET /api/admin/contact-submissions — paginated list of contact form submissions
export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
  const skip = (page - 1) * limit;

  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        spamScore: true,
        createdAt: true,
        // Exclude ipAddress and userAgent from list view for privacy
      },
    }),
    prisma.contactSubmission.count(),
  ]);

  return NextResponse.json(
    { data: submissions, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
    { status: 200 }
  );
}
