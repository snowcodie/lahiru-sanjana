import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Context = { params: Promise<{ slug: string }> };

// GET /api/projects/[slug]
export async function GET(_req: NextRequest, { params }: Context) {
  const { slug } = await params;
  try {
    const project = await prisma.project.findUnique({
      where: { slug, published: true },
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ data: project }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
