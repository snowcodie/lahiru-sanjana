import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/about — returns contact info and career timeline
export async function GET() {
  try {
    const [contactInfoRows, experiences] = await Promise.all([
      prisma.contactInfo.findMany(),
      prisma.experience.findMany({ orderBy: { orderIndex: "asc" } }),
    ]);

    const contactInfo = Object.fromEntries(
      contactInfoRows.map((r) => [r.key, r.value])
    );

    return NextResponse.json(
      { data: { contactInfo, experiences } },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}
