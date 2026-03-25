import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BlogPostSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: [
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
  });

  return NextResponse.json({ data: posts }, { status: 200 });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = BlogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.blogPost.create({
      data: {
        ...parsed.data,
        publishedAt: parsed.data.published ? new Date() : null,
      },
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A blog post with that slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}