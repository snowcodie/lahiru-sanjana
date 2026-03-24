import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/auth";
import { ExperienceSchema } from "@/lib/validation";

type Context = { params: Promise<{ id: string }> };

// PUT /api/admin/experiences/[id]
export async function PUT(request: NextRequest, { params }: Context) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const expId = parseInt(id, 10);
  if (isNaN(expId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parseResult = ExperienceSchema.partial().safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { startDate, endDate, ...rest } = parseResult.data;
  const updateData: Record<string, unknown> = { ...rest };
  if (startDate !== undefined) updateData.startDate = new Date(startDate);
  if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null;

  try {
    const experience = await prisma.experience.update({
      where: { id: expId },
      data: updateData,
    });
    return NextResponse.json({ data: experience }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Experience not found or update failed" },
      { status: 404 }
    );
  }
}

// DELETE /api/admin/experiences/[id]
export async function DELETE(request: NextRequest, { params }: Context) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const expId = parseInt(id, 10);
  if (isNaN(expId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.experience.delete({ where: { id: expId } });
    return NextResponse.json({ message: "Experience deleted" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Experience not found or delete failed" },
      { status: 404 }
    );
  }
}
