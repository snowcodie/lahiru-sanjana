import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/projects — list all published projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: projects }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
