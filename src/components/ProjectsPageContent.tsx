"use client";

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/components/LanguageProvider";
import { Project } from "@/types";

type ProjectsPageContentProps = {
  projects: Project[];
};

export default function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pt-14">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/80 px-6 py-12 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/60 sm:px-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[12%] top-[-20%] h-72 w-72 rounded-full bg-zinc-900/8 blur-3xl dark:bg-zinc-50/10" />
          <div className="absolute right-[8%] top-[40%] h-72 w-72 rounded-full bg-zinc-900/8 blur-3xl dark:bg-zinc-50/10" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center rounded-full border border-neutral-300/70 bg-neutral-100/70 px-4 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
            {t("projectsPage.badge")}
          </div>

          <h1 className="mt-6 text-4xl font-medium leading-tight text-neutral-800 dark:text-zinc-100 sm:text-5xl">
            {t("projectsPage.heading")}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {t("projectsPage.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="rounded-full border border-zinc-300/70 px-3 py-1 dark:border-zinc-700/70">
              {projects.length} {t("projectsPage.publishedProjectsSuffix")}
            </span>
            <Link
              href="/contact"
              className="rounded-full border border-zinc-300/70 px-3 py-1 transition hover:bg-zinc-100 dark:border-zinc-700/70 dark:hover:bg-zinc-800/60"
            >
              {t("projectsPage.buildTogether")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12">
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 px-6 py-12 text-center text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-400">
            {t("projectsPage.emptyState")}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.technologies}
                codeUrl={project.githubUrl ?? undefined}
                liveUrl={project.liveUrl ?? undefined}
                featured={false}
                detailUrl={`/projects/${project.slug}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
