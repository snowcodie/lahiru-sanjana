import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import ProjectsPageContent from "@/components/ProjectsPageContent";
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

  return <ProjectsPageContent projects={projects} />;
}
