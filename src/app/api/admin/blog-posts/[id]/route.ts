import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { BlogPostSchema } from "@/lib/validation";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Context) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const postId = parseInt(id, 10);
  if (Number.isNaN(postId)) {
    return NextResponse.json({ error: "Invalid blog post ID" }, { status: 400 });
  }

  const post = await prisma.blogPost.findUnique({ where: { id: postId } });
  if (!post) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  return NextResponse.json({ data: post });
}

export async function PUT(request: NextRequest, { params }: Context) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const postId = parseInt(id, 10);
  if (Number.isNaN(postId)) {
    return NextResponse.json({ error: "Invalid blog post ID" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = BlogPostSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data: Prisma.BlogPostUpdateInput = { ...parsed.data };
  if (typeof data.published === "boolean") {
    data.publishedAt = data.published ? new Date() : null;
  }

  try {
    const post = await prisma.blogPost.update({
      where: { id: postId },
      data,
    });

    return NextResponse.json({ data: post }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Blog post not found or update failed" },
      { status: 404 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Context) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const postId = parseInt(id, 10);
  if (Number.isNaN(postId)) {
    return NextResponse.json({ error: "Invalid blog post ID" }, { status: 400 });
  }

  try {
    await prisma.blogPost.delete({ where: { id: postId } });
    return NextResponse.json({ message: "Blog post deleted" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Blog post not found or delete failed" },
      { status: 404 }
    );
  }
}