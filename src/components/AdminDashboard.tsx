"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost, ContactSubmission, Project } from "@/types";

type AdminDashboardProps = {
  contactSubmissions: ContactSubmission[];
  projects: Project[];
  blogPosts: BlogPost[];
  adminEmail: string;
};

type ProjectFormState = {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  published: boolean;
};

type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
};

const emptyProjectForm: ProjectFormState = {
  title: "",
  slug: "",
  description: "",
  imageUrl: "",
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  published: true,
};

const emptyBlogForm: BlogFormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  published: false,
};

function toProjectForm(project?: Project): ProjectFormState {
  if (!project) return emptyProjectForm;
  return {
    title: project.title,
    slug: project.slug,
    description: project.description,
    imageUrl: project.imageUrl ?? "",
    technologies: project.technologies.join(", "),
    githubUrl: project.githubUrl ?? "",
    liveUrl: project.liveUrl ?? "",
    published: project.published,
  };
}

function toBlogForm(post?: BlogPost): BlogFormState {
  if (!post) return emptyBlogForm;
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    content: post.content,
    coverImageUrl: post.coverImageUrl ?? "",
    published: post.published,
  };
}

export default function AdminDashboard({
  contactSubmissions,
  projects: initialProjects,
  blogPosts: initialBlogPosts,
  adminEmail,
}: AdminDashboardProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [projectForm, setProjectForm] = useState<ProjectFormState>(emptyProjectForm);
  const [blogForm, setBlogForm] = useState<BlogFormState>(emptyBlogForm);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const stats = useMemo(
    () => ({
      messages: contactSubmissions.length,
      projects: projects.length,
      posts: blogPosts.length,
    }),
    [blogPosts.length, contactSubmissions.length, projects.length]
  );

  async function submitProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("project");
    setError(null);
    setStatus(null);

    const payload = {
      ...projectForm,
      imageUrl: projectForm.imageUrl || null,
      githubUrl: projectForm.githubUrl || null,
      liveUrl: projectForm.liveUrl || null,
      technologies: projectForm.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const isEditing = editingProjectId !== null;
    const url = isEditing
      ? `/api/admin/projects/${editingProjectId}`
      : "/api/admin/projects";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { data?: Project; error?: string };
      if (!response.ok || !data.data) {
        setError(data.error ?? "Failed to save project.");
        return;
      }

      const savedProject = normalizeProject(data.data);

      setProjects((current) => {
        if (isEditing) {
          return current.map((item) => (item.id === savedProject.id ? savedProject : item));
        }
        return [savedProject, ...current];
      });
      setProjectForm(emptyProjectForm);
      setEditingProjectId(null);
      setStatus(isEditing ? "Project updated." : "Project created.");
      router.refresh();
    } catch {
      setError("Failed to save project.");
    } finally {
      setBusy(null);
    }
  }

  async function submitBlogPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("blog");
    setError(null);
    setStatus(null);

    const payload = {
      ...blogForm,
      excerpt: blogForm.excerpt || null,
      coverImageUrl: blogForm.coverImageUrl || null,
    };

    const isEditing = editingBlogId !== null;
    const url = isEditing
      ? `/api/admin/blog-posts/${editingBlogId}`
      : "/api/admin/blog-posts";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { data?: BlogPost; error?: string };
      if (!response.ok || !data.data) {
        setError(data.error ?? "Failed to save blog post.");
        return;
      }

      const savedBlogPost = normalizeBlogPost(data.data);

      setBlogPosts((current) => {
        if (isEditing) {
          return current.map((item) => (item.id === savedBlogPost.id ? savedBlogPost : item));
        }
        return [savedBlogPost, ...current];
      });
      setBlogForm(emptyBlogForm);
      setEditingBlogId(null);
      setStatus(isEditing ? "Blog post updated." : "Blog post created.");
      router.refresh();
    } catch {
      setError("Failed to save blog post.");
    } finally {
      setBusy(null);
    }
  }

  async function removeProject(id: number) {
    setBusy(`project-delete-${id}`);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Failed to delete project.");
        return;
      }

      setProjects((current) => current.filter((item) => item.id !== id));
      if (editingProjectId === id) {
        setEditingProjectId(null);
        setProjectForm(emptyProjectForm);
      }
      setStatus("Project deleted.");
      router.refresh();
    } catch {
      setError("Failed to delete project.");
    } finally {
      setBusy(null);
    }
  }

  async function removeBlogPost(id: number) {
    setBusy(`blog-delete-${id}`);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch(`/api/admin/blog-posts/${id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Failed to delete blog post.");
        return;
      }

      setBlogPosts((current) => current.filter((item) => item.id !== id));
      if (editingBlogId === id) {
        setEditingBlogId(null);
        setBlogForm(emptyBlogForm);
      }
      setStatus("Blog post deleted.");
      router.refresh();
    } catch {
      setError("Failed to delete blog post.");
    } finally {
      setBusy(null);
    }
  }

  async function logout() {
    setBusy("logout");
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-indigo-500">
            Admin Panel
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Manage content and messages
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Logged in as {adminEmail}. Use this dashboard to review contact submissions and publish projects or blog posts.
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          disabled={busy === "logout"}
          className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
        >
          {busy === "logout" ? "Logging out..." : "Log out"}
        </button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Messages" value={stats.messages} />
        <StatCard label="Projects" value={stats.projects} />
        <StatCard label="Blog Posts" value={stats.posts} />
      </div>

      {status ? <p className="mb-4 text-sm text-emerald-600">{status}</p> : null}
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1.1fr_0.9fr]">
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <SectionHeading
            title={editingProjectId ? "Edit Project" : "New Project"}
            description="Create or update portfolio projects."
          />
          <ProjectForm
            form={projectForm}
            setForm={setProjectForm}
            onSubmit={submitProject}
            onCancel={() => {
              setEditingProjectId(null);
              setProjectForm(emptyProjectForm);
            }}
            busy={busy === "project"}
            editing={editingProjectId !== null}
          />

          <div className="mt-8 space-y-4">
            {projects.map((project) => (
              <ItemCard
                key={project.id}
                title={project.title}
                subtitle={project.slug}
                body={project.description}
                badge={project.published ? "Published" : "Draft"}
                onEdit={() => {
                  setEditingProjectId(project.id);
                  setProjectForm(toProjectForm(project));
                }}
                onDelete={() => removeProject(project.id)}
                deleting={busy === `project-delete-${project.id}`}
              />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <SectionHeading
            title={editingBlogId ? "Edit Blog Post" : "New Blog Post"}
            description="Write and publish blog content."
          />
          <BlogForm
            form={blogForm}
            setForm={setBlogForm}
            onSubmit={submitBlogPost}
            onCancel={() => {
              setEditingBlogId(null);
              setBlogForm(emptyBlogForm);
            }}
            busy={busy === "blog"}
            editing={editingBlogId !== null}
          />

          <div className="mt-8 space-y-4">
            {blogPosts.map((post) => (
              <ItemCard
                key={post.id}
                title={post.title}
                subtitle={post.slug}
                body={post.excerpt || post.content.slice(0, 140)}
                badge={post.published ? "Published" : "Draft"}
                onEdit={() => {
                  setEditingBlogId(post.id);
                  setBlogForm(toBlogForm(post));
                }}
                onDelete={() => removeBlogPost(post.id)}
                deleting={busy === `blog-delete-${post.id}`}
              />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <SectionHeading
            title="Contact Messages"
            description="Newest inbound contact form submissions."
          />
          <div className="mt-6 space-y-4">
            {contactSubmissions.map((submission) => (
              <article key={submission.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">{submission.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{submission.email}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {submission.subject ? (
                  <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">{submission.subject}</p>
                ) : null}
                <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-600 dark:text-zinc-400">{submission.message}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function normalizeProject(project: Project): Project {
  return {
    ...project,
    createdAt: new Date(project.createdAt).toISOString(),
    updatedAt: new Date(project.updatedAt).toISOString(),
  };
}

function normalizeBlogPost(post: BlogPost): BlogPost {
  return {
    ...post,
    publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
    createdAt: new Date(post.createdAt).toISOString(),
    updatedAt: new Date(post.updatedAt).toISOString(),
  };
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">{value}</p>
    </div>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{title}</h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
    />
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" />
      {label}
    </label>
  );
}

function ProjectForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  busy,
  editing,
}: {
  form: ProjectFormState;
  setForm: React.Dispatch<React.SetStateAction<ProjectFormState>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  busy: boolean;
  editing: boolean;
}) {
  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <div>
        <FieldLabel htmlFor="project-title">Title</FieldLabel>
        <TextInput id="project-title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required />
      </div>
      <div>
        <FieldLabel htmlFor="project-slug">Slug</FieldLabel>
        <TextInput id="project-slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} required />
      </div>
      <div>
        <FieldLabel htmlFor="project-description">Description</FieldLabel>
        <TextArea id="project-description" rows={4} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required />
      </div>
      <div>
        <FieldLabel htmlFor="project-technologies">Technologies</FieldLabel>
        <TextInput id="project-technologies" value={form.technologies} onChange={(event) => setForm((current) => ({ ...current, technologies: event.target.value }))} placeholder="Next.js, Prisma, PostgreSQL" required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="project-image">Image URL</FieldLabel>
          <TextInput id="project-image" value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} />
        </div>
        <div>
          <FieldLabel htmlFor="project-live">Live URL</FieldLabel>
          <TextInput id="project-live" value={form.liveUrl} onChange={(event) => setForm((current) => ({ ...current, liveUrl: event.target.value }))} />
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="project-github">GitHub URL</FieldLabel>
        <TextInput id="project-github" value={form.githubUrl} onChange={(event) => setForm((current) => ({ ...current, githubUrl: event.target.value }))} />
      </div>
      <Toggle checked={form.published} onChange={(next) => setForm((current) => ({ ...current, published: next }))} label="Published" />
      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60">
          {busy ? "Saving..." : editing ? "Update Project" : "Create Project"}
        </button>
        {editing ? (
          <button type="button" onClick={onCancel} className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

function BlogForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  busy,
  editing,
}: {
  form: BlogFormState;
  setForm: React.Dispatch<React.SetStateAction<BlogFormState>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  busy: boolean;
  editing: boolean;
}) {
  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <div>
        <FieldLabel htmlFor="blog-title">Title</FieldLabel>
        <TextInput id="blog-title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required />
      </div>
      <div>
        <FieldLabel htmlFor="blog-slug">Slug</FieldLabel>
        <TextInput id="blog-slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} required />
      </div>
      <div>
        <FieldLabel htmlFor="blog-excerpt">Excerpt</FieldLabel>
        <TextArea id="blog-excerpt" rows={3} value={form.excerpt} onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))} />
      </div>
      <div>
        <FieldLabel htmlFor="blog-content">Content</FieldLabel>
        <TextArea id="blog-content" rows={10} value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} required />
      </div>
      <div>
        <FieldLabel htmlFor="blog-cover">Cover image URL</FieldLabel>
        <TextInput id="blog-cover" value={form.coverImageUrl} onChange={(event) => setForm((current) => ({ ...current, coverImageUrl: event.target.value }))} />
      </div>
      <Toggle checked={form.published} onChange={(next) => setForm((current) => ({ ...current, published: next }))} label="Published" />
      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60">
          {busy ? "Saving..." : editing ? "Update Blog Post" : "Create Blog Post"}
        </button>
        {editing ? (
          <button type="button" onClick={onCancel} className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

function ItemCard({
  title,
  subtitle,
  body,
  badge,
  onEdit,
  onDelete,
  deleting,
}: {
  title: string;
  subtitle: string;
  body: string;
  badge: string;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {badge}
        </span>
      </div>
      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{body}</p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={onEdit} className="rounded-xl border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
          Edit
        </button>
        <button type="button" onClick={onDelete} disabled={deleting} className="rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}