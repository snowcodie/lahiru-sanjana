"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost, ContactSubmission, Project } from "@/types";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

type AdminDashboardProps = {
  contactSubmissions: ContactSubmission[];
  projects: Project[];
  blogPosts: BlogPost[];
  adminEmail: string;
};

type Tab = "projects" | "blog" | "messages";

/* ------------------------------------------------------------------ */
/*  Form state types                                                   */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const PAGE_SIZE = 10;

function normalizeProject(project: Project): Project {
  return {
    ...project,
    createdAt: new Date(project.createdAt).toISOString(),
    updatedAt: new Date(project.updatedAt).toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function AdminDashboard({
  contactSubmissions,
  projects: initialProjects,
  blogPosts: initialBlogPosts,
  adminEmail,
}: AdminDashboardProps) {
  const router = useRouter();

  /* ----- state ----- */
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState(initialProjects);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);

  const [projectForm, setProjectForm] = useState<ProjectFormState>(emptyProjectForm);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  const [showProjectForm, setShowProjectForm] = useState(false);

  // View modals
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [viewBlog, setViewBlog] = useState<BlogPost | null>(null);
  const [viewMessage, setViewMessage] = useState<ContactSubmission | null>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  // Pagination
  const [projectPage, setProjectPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);
  const [messagePage, setMessagePage] = useState(1);

  const stats = useMemo(
    () => ({
      messages: contactSubmissions.length,
      projects: projects.length,
      posts: blogPosts.length,
    }),
    [blogPosts.length, contactSubmissions.length, projects.length],
  );

  /* ----- project CRUD ----- */
  const openNewProject = useCallback(() => {
    setEditingProjectId(null);
    setProjectForm(emptyProjectForm);
    setShowProjectForm(true);
  }, []);

  const openEditProject = useCallback((project: Project) => {
    setEditingProjectId(project.id);
    setProjectForm(toProjectForm(project));
    setShowProjectForm(true);
  }, []);

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
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const isEditing = editingProjectId !== null;
    const url = isEditing ? `/api/admin/projects/${editingProjectId}` : "/api/admin/projects";
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
      const saved = normalizeProject(data.data);
      setProjects((cur) =>
        isEditing ? cur.map((p) => (p.id === saved.id ? saved : p)) : [saved, ...cur],
      );
      setShowProjectForm(false);
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

  async function removeProject(id: number) {
    if (!confirm("Delete this project?")) return;
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
      setProjects((cur) => cur.filter((p) => p.id !== id));
      setStatus("Project deleted.");
      router.refresh();
    } catch {
      setError("Failed to delete project.");
    } finally {
      setBusy(null);
    }
  }

  /* ----- blog CRUD ----- */
  const openNewBlog = useCallback(() => {
    window.open("/admin/blog/editor", "_blank");
  }, []);

  const openEditBlog = useCallback((post: BlogPost) => {
    window.open(`/admin/blog/editor?id=${post.id}`, "_blank");
  }, []);


  async function removeBlogPost(id: number) {
    if (!confirm("Delete this blog post?")) return;
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
      setBlogPosts((cur) => cur.filter((p) => p.id !== id));
      setStatus("Blog post deleted.");
      router.refresh();
    } catch {
      setError("Failed to delete blog post.");
    } finally {
      setBusy(null);
    }
  }

  /* ----- logout ----- */
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

  /* ----- pagination helpers ----- */
  const projectRows = projects.slice((projectPage - 1) * PAGE_SIZE, projectPage * PAGE_SIZE);
  const projectTotalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));

  const blogRows = blogPosts.slice((blogPage - 1) * PAGE_SIZE, blogPage * PAGE_SIZE);
  const blogTotalPages = Math.max(1, Math.ceil(blogPosts.length / PAGE_SIZE));

  const messageRows = contactSubmissions.slice((messagePage - 1) * PAGE_SIZE, messagePage * PAGE_SIZE);
  const messageTotalPages = Math.max(1, Math.ceil(contactSubmissions.length / PAGE_SIZE));

  /* ----- tabs config ----- */
  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "projects", label: "Projects", count: stats.projects },
    { key: "blog", label: "Blog Posts", count: stats.posts },
    { key: "messages", label: "Contact Messages", count: stats.messages },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-indigo-500">
            Admin Panel
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Manage content
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Logged in as {adminEmail}
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          disabled={busy === "logout"}
          className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
        >
          {busy === "logout" ? "Logging out\u2026" : "Log out"}
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Projects" value={stats.projects} />
        <StatCard label="Blog Posts" value={stats.posts} />
        <StatCard label="Messages" value={stats.messages} />
      </div>

      {/* Status messages */}
      {status && <p className="mb-4 text-sm text-emerald-600">{status}</p>}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {/* Tab bar */}
      <div className="mb-6 flex gap-1 rounded-2xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              tab === t.key
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {t.label}
            <span className="ml-2 rounded-full bg-zinc-200 px-2 py-0.5 text-xs dark:bg-zinc-700">
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {/* ---------- PROJECTS ---------- */}
        {tab === "projects" && (
          <div>
            <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Projects</h2>
              <button
                type="button"
                onClick={openNewProject}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                + Add New
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                  <tr>
                    <Th>Title</Th>
                    <Th>Slug</Th>
                    <Th>Technologies</Th>
                    <Th>Status</Th>
                    <Th>Created</Th>
                    <Th className="text-right">Actions</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {projectRows.map((project) => (
                    <tr key={project.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                      <Td className="font-medium text-zinc-900 dark:text-white">{project.title}</Td>
                      <Td>{project.slug}</Td>
                      <Td>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((t) => (
                            <span key={t} className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{t}</span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs text-zinc-400">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                      </Td>
                      <Td><Badge published={project.published} /></Td>
                      <Td>{new Date(project.createdAt).toLocaleDateString()}</Td>
                      <Td className="text-right">
                        <ActionButtons
                          onView={() => setViewProject(project)}
                          onEdit={() => openEditProject(project)}
                          onDelete={() => removeProject(project.id)}
                          deleting={busy === `project-delete-${project.id}`}
                        />
                      </Td>
                    </tr>
                  ))}
                  {projectRows.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-400">No projects yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination page={projectPage} totalPages={projectTotalPages} onPageChange={setProjectPage} />
          </div>
        )}

        {/* ---------- BLOG POSTS ---------- */}
        {tab === "blog" && (
          <div>
            <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Blog Posts</h2>
              <button
                type="button"
                onClick={openNewBlog}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                + Add New
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                  <tr>
                    <Th>Title</Th>
                    <Th>Slug</Th>
                    <Th>Status</Th>
                    <Th>Published</Th>
                    <Th>Created</Th>
                    <Th className="text-right">Actions</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {blogRows.map((post) => (
                    <tr key={post.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                      <Td className="font-medium text-zinc-900 dark:text-white">{post.title}</Td>
                      <Td>{post.slug}</Td>
                      <Td><Badge published={post.published} /></Td>
                      <Td>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "\u2014"}</Td>
                      <Td>{new Date(post.createdAt).toLocaleDateString()}</Td>
                      <Td className="text-right">
                        <ActionButtons
                          onView={() => setViewBlog(post)}
                          onEdit={() => openEditBlog(post)}
                          onDelete={() => removeBlogPost(post.id)}
                          deleting={busy === `blog-delete-${post.id}`}
                        />
                      </Td>
                    </tr>
                  ))}
                  {blogRows.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-400">No blog posts yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination page={blogPage} totalPages={blogTotalPages} onPageChange={setBlogPage} />
          </div>
        )}

        {/* ---------- CONTACT MESSAGES ---------- */}
        {tab === "messages" && (
          <div>
            <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Contact Messages</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                  <tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Subject</Th>
                    <Th>Date</Th>
                    <Th>Spam</Th>
                    <Th className="text-right">Actions</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {messageRows.map((msg) => (
                    <tr key={msg.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                      <Td className="font-medium text-zinc-900 dark:text-white">{msg.name}</Td>
                      <Td>{msg.email}</Td>
                      <Td>{msg.subject || "\u2014"}</Td>
                      <Td>{new Date(msg.createdAt).toLocaleDateString()}</Td>
                      <Td>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${msg.spamScore > 5 ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"}`}>
                          {msg.spamScore}
                        </span>
                      </Td>
                      <Td className="text-right">
                        <button
                          type="button"
                          onClick={() => setViewMessage(msg)}
                          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
                        >
                          View
                        </button>
                      </Td>
                    </tr>
                  ))}
                  {messageRows.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-400">No messages yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination page={messagePage} totalPages={messageTotalPages} onPageChange={setMessagePage} />
          </div>
        )}
      </div>

      {/* ========== MODALS ========== */}

      {/* Project form modal */}
      {showProjectForm && (
        <Modal
          title={editingProjectId ? "Edit Project" : "New Project"}
          onClose={() => { setShowProjectForm(false); setEditingProjectId(null); setProjectForm(emptyProjectForm); }}
        >
          <form className="space-y-4" onSubmit={submitProject}>
            <Field label="Title">
              <TextInput id="pf-title" value={projectForm.title} onChange={(e) => setProjectForm((c) => ({ ...c, title: e.target.value }))} required />
            </Field>
            <Field label="Slug">
              <TextInput id="pf-slug" value={projectForm.slug} onChange={(e) => setProjectForm((c) => ({ ...c, slug: e.target.value }))} required />
            </Field>
            <Field label="Description">
              <TextArea id="pf-desc" rows={4} value={projectForm.description} onChange={(e) => setProjectForm((c) => ({ ...c, description: e.target.value }))} required />
            </Field>
            <Field label="Technologies (comma-separated)">
              <TextInput id="pf-tech" value={projectForm.technologies} onChange={(e) => setProjectForm((c) => ({ ...c, technologies: e.target.value }))} placeholder="Next.js, Prisma, PostgreSQL" required />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Image URL">
                <TextInput id="pf-img" value={projectForm.imageUrl} onChange={(e) => setProjectForm((c) => ({ ...c, imageUrl: e.target.value }))} />
              </Field>
              <Field label="Live URL">
                <TextInput id="pf-live" value={projectForm.liveUrl} onChange={(e) => setProjectForm((c) => ({ ...c, liveUrl: e.target.value }))} />
              </Field>
            </div>
            <Field label="GitHub URL">
              <TextInput id="pf-gh" value={projectForm.githubUrl} onChange={(e) => setProjectForm((c) => ({ ...c, githubUrl: e.target.value }))} />
            </Field>
            <Toggle checked={projectForm.published} onChange={(v) => setProjectForm((c) => ({ ...c, published: v }))} label="Published" />
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => { setShowProjectForm(false); setEditingProjectId(null); setProjectForm(emptyProjectForm); }} className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
                Cancel
              </button>
              <button type="submit" disabled={busy === "project"} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60">
                {busy === "project" ? "Saving\u2026" : editingProjectId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}


      {/* View project modal */}
      {viewProject && (
        <Modal title="Project Details" onClose={() => setViewProject(null)}>
          <dl className="space-y-3 text-sm">
            <Detail label="Title" value={viewProject.title} />
            <Detail label="Slug" value={viewProject.slug} />
            <Detail label="Description" value={viewProject.description} />
            <Detail label="Technologies" value={viewProject.technologies.join(", ")} />
            <Detail label="Image URL" value={viewProject.imageUrl || "\u2014"} />
            <Detail label="GitHub URL" value={viewProject.githubUrl || "\u2014"} />
            <Detail label="Live URL" value={viewProject.liveUrl || "\u2014"} />
            <Detail label="Status" value={viewProject.published ? "Published" : "Draft"} />
            <Detail label="Created" value={new Date(viewProject.createdAt).toLocaleString()} />
            <Detail label="Updated" value={new Date(viewProject.updatedAt).toLocaleString()} />
          </dl>
        </Modal>
      )}

      {/* View blog modal */}
      {viewBlog && (
        <Modal title="Blog Post Details" onClose={() => setViewBlog(null)}>
          <dl className="space-y-3 text-sm">
            <Detail label="Title" value={viewBlog.title} />
            <Detail label="Slug" value={viewBlog.slug} />
            <Detail label="Excerpt" value={viewBlog.excerpt || "\u2014"} />
            <Detail label="Status" value={viewBlog.published ? "Published" : "Draft"} />
            <Detail label="Published At" value={viewBlog.publishedAt ? new Date(viewBlog.publishedAt).toLocaleString() : "\u2014"} />
            <Detail label="Cover Image" value={viewBlog.coverImageUrl || "\u2014"} />
            <Detail label="Created" value={new Date(viewBlog.createdAt).toLocaleString()} />
          </dl>
          <div className="mt-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Content</p>
            <div
              className="prose-content max-h-64 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950"
              dangerouslySetInnerHTML={{ __html: viewBlog.content }}
            />
          </div>
        </Modal>
      )}

      {/* View message modal */}
      {viewMessage && (
        <Modal title="Message Details" onClose={() => setViewMessage(null)}>
          <dl className="space-y-3 text-sm">
            <Detail label="From" value={viewMessage.name} />
            <Detail label="Email" value={viewMessage.email} />
            <Detail label="Subject" value={viewMessage.subject || "\u2014"} />
            <Detail label="Date" value={new Date(viewMessage.createdAt).toLocaleString()} />
            <Detail label="Spam Score" value={String(viewMessage.spamScore)} />
            <Detail label="IP Address" value={viewMessage.ipAddress || "\u2014"} />
          </dl>
          <div className="mt-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Message</p>
            <div className="whitespace-pre-wrap rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              {viewMessage.message}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Shared sub-components                                              */
/* ================================================================== */

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">{value}</p>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`whitespace-nowrap px-6 py-4 text-zinc-600 dark:text-zinc-400 ${className}`}>
      {children}
    </td>
  );
}

function Badge({ published }: { published: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
        published
          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
          : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

function ActionButtons({
  onView,
  onEdit,
  onDelete,
  deleting,
}: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <div className="flex justify-end gap-2">
      <button type="button" onClick={onView} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200">
        View
      </button>
      <button type="button" onClick={onEdit} className="rounded-lg border border-indigo-300 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:border-indigo-400 dark:border-indigo-700 dark:text-indigo-300">
        Edit
      </button>
      <button type="button" onClick={onDelete} disabled={deleting} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-500 disabled:opacity-60">
        {deleting ? "\u2026" : "Delete"}
      </button>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-20 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      {children}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</dt>
      <dd className="mt-0.5 text-zinc-900 dark:text-white">{value}</dd>
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
    />
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" />
      {label}
    </label>
  );
}
