import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/auth";
import { ExperienceSchema } from "@/lib/validation";

// GET /api/admin/experiences — list all experiences
export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const experiences = await prisma.experience.findMany({
    orderBy: { orderIndex: "asc" },
  });
  return NextResponse.json({ data: experiences }, { status: 200 });
}

// POST /api/admin/experiences — create a new experience
export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parseResult = ExperienceSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { startDate, endDate, ...rest } = parseResult.data;
  try {
    const experience = await prisma.experience.create({
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      },
    });
    return NextResponse.json({ data: experience }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/experiences/[id] is handled via the route below
// DELETE — handled in [id]/route.ts
