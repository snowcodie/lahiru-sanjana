import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/auth";
import { ProjectSchema } from "@/lib/validation";

type Context = { params: Promise<{ id: string }> };

// PUT /api/admin/projects/[id] — update a project
export async function PUT(request: NextRequest, { params }: Context) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const projectId = parseInt(id, 10);
  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parseResult = ProjectSchema.partial().safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const project = await prisma.project.update({
      where: { id: projectId },
      data: parseResult.data,
    });
    return NextResponse.json({ data: project }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Project not found or update failed" },
      { status: 404 }
    );
  }
}

// DELETE /api/admin/projects/[id] — delete a project
export async function DELETE(request: NextRequest, { params }: Context) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const projectId = parseInt(id, 10);
  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    await prisma.project.delete({ where: { id: projectId } });
    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Project not found or delete failed" },
      { status: 404 }
    );
  }
}
