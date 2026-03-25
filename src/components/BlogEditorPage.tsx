"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm text-zinc-400">Loading editor…</p>
    </div>
  ),
});

type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
};

const emptyForm: BlogFormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  published: false,
};

export default function BlogEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditing = editId !== null;

  const [form, setForm] = useState<BlogFormState>(emptyForm);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load existing post when editing
  useEffect(() => {
    if (!editId) return;
    setLoading(true);
    fetch(`/api/admin/blog-posts/${editId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load post");
        const data = (await res.json()) as { data: BlogFormState };
        setForm({
          title: data.data.title,
          slug: data.data.slug,
          excerpt: data.data.excerpt ?? "",
          content: data.data.content,
          coverImageUrl: data.data.coverImageUrl ?? "",
          published: data.data.published,
        });
      })
      .catch(() => setError("Failed to load the blog post."))
      .finally(() => setLoading(false));
  }, [editId]);

  const autoSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((c) => ({
      ...c,
      title,
      slug: isEditing ? c.slug : autoSlug(title),
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setStatus(null);

    const payload = {
      ...form,
      excerpt: form.excerpt || null,
      coverImageUrl: form.coverImageUrl || null,
    };

    const url = isEditing
      ? `/api/admin/blog-posts/${editId}`
      : "/api/admin/blog-posts";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Failed to save blog post.");
        return;
      }
      setStatus(isEditing ? "Blog post updated!" : "Blog post created!");
      // Redirect back to admin after short delay
      setTimeout(() => {
        window.close();
        // If window.close didn't work (not opened via script), go to admin
        router.push("/admin");
      }, 1200);
    } catch {
      setError("Failed to save blog post.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-20">
        <p className="text-zinc-500">Loading post…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-medium uppercase tracking-[0.24em] text-indigo-500">
            Blog Editor
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {isEditing ? "Edit Blog Post" : "New Blog Post"}
          </h1>
        </div>
        <button
          type="button"
          onClick={() => {
            window.close();
            router.push("/admin");
          }}
          className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
        >
          Back to Admin
        </button>
      </div>

      {status && (
        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {status}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Slug row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={handleTitleChange}
              required
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((c) => ({ ...c, slug: e.target.value }))}
              required
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Excerpt <span className="text-zinc-400">(optional)</span>
          </label>
          <textarea
            rows={2}
            value={form.excerpt}
            onChange={(e) => setForm((c) => ({ ...c, excerpt: e.target.value }))}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
        </div>

        {/* Cover image */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Cover image URL <span className="text-zinc-400">(optional)</span>
          </label>
          <input
            type="text"
            value={form.coverImageUrl}
            onChange={(e) => setForm((c) => ({ ...c, coverImageUrl: e.target.value }))}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
        </div>

        {/* Rich text editor */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Content
          </label>
          <RichTextEditor
            content={form.content}
            onChange={(html) => setForm((c) => ({ ...c, content: html }))}
          />
        </div>

        {/* Published toggle & submit */}
        <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <label className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((c) => ({ ...c, published: e.target.checked }))}
              className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
            />
            Publish immediately
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                window.close();
                router.push("/admin");
              }}
              className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
            >
              {busy ? "Saving…" : isEditing ? "Update Post" : "Create Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
