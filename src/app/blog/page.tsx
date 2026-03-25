import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import BlogPageContent from "@/components/BlogPageContent";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles, learnings, and technical notes.",
};

export default async function BlogPage() {
  const rawPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  const posts: BlogPost[] = rawPosts.map((p) => ({
    ...p,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <BlogPageContent posts={posts} />;
}