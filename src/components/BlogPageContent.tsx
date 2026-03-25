"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { BlogPost } from "@/types";

type BlogPageContentProps = {
  posts: BlogPost[];
};

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-indigo-500">
          {t("blogPage.badge")}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          {t("blogPage.heading")}
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {t("blogPage.subtitle")}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 px-6 py-12 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          {t("blogPage.emptyState")}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-indigo-500">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : new Date(post.createdAt).toLocaleDateString()}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {post.excerpt ||
                  `${post.content.replace(/<[^>]*>/g, "").slice(0, 180)}...`}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
              >
                {t("blogPage.readArticle")}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
