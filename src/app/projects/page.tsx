import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of my software projects and open-source work.",
};

export default async function ProjectsPage() {
  const rawProjects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const projects: Project[] = rawProjects.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          My Projects
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          A collection of things I&apos;ve built — from personal tools to
          full-stack applications.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-zinc-500">No projects yet. Check back soon!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
