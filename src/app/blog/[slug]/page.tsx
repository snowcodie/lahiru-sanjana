import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
    select: { title: true, excerpt: true },
  });

  if (!post) {
    return { title: "Blog Post" };
  }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-indigo-500">
        {post.publishedAt?.toLocaleDateString() ?? post.createdAt.toLocaleDateString()}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
        {post.title}
      </h1>
      {post.excerpt ? (
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
      ) : null}
      <div className="mt-10 whitespace-pre-wrap text-base leading-8 text-zinc-700 dark:text-zinc-300">
        {post.content}
      </div>
    </article>
  );
}