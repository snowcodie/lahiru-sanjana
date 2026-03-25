import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";
import { requireAdminPageAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { BlogPost, ContactSubmission, Project } from "@/types";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage portfolio content and contact submissions.",
};

export default async function AdminPage() {
  const session = await requireAdminPageAccess();

  const [rawContacts, rawProjects, rawBlogPosts] = await Promise.all([
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        ipAddress: true,
        spamScore: true,
        createdAt: true,
      },
    }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.blogPost.findMany({
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const contactSubmissions: ContactSubmission[] = rawContacts.map((item) => ({
    ...item,
    ipAddress: item.ipAddress ?? null,
    createdAt: item.createdAt.toISOString(),
  }));

  const projects: Project[] = rawProjects.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  const blogPosts: BlogPost[] = rawBlogPosts.map((item) => ({
    ...item,
    excerpt: item.excerpt ?? null,
    coverImageUrl: item.coverImageUrl ?? null,
    publishedAt: item.publishedAt?.toISOString() ?? null,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return (
    <AdminDashboard
      adminEmail={session.email}
      contactSubmissions={contactSubmissions}
      projects={projects}
      blogPosts={blogPosts}
    />
  );
}