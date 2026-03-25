"use client";

import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/components/LanguageProvider";

type FeaturedProject = {
  titleKey: string;
  description: string;
  tags: string[];
  codeUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

const projects: FeaturedProject[] = [
  {
    titleKey: "home.featuredProjects.projectTitleEnterpriseDms",
    description:
        "A scalable document management platform with role-based access, approval workflows, and version control. Designed to streamline enterprise file handling with secure sharing, audit trails, and seamless integration with backend services.",
    tags: ["Laravel", "Angular", "REST API", "MySQL", "OnlyOffice DocServer", "Document Workflow"],
    // codeUrl: "#",
    // liveUrl: "#",
    featured: true,
    },
    {
    titleKey: "home.featuredProjects.projectTitleUiUxRedesign",
    description:
        "Redesigned multiple web applications with a focus on clean UI, improved usability, and responsive design. Enhanced user experience through modern layouts, optimized performance, and consistent design systems.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "UI/UX", "Responsive Design"],
    // codeUrl: "#",
    featured: true,
    },
    {
    titleKey: "home.featuredProjects.projectTitleTravelAssistant",
    description:
        "A smart assistant system for travel agencies to manage bookings, customer interactions, and recommendations. Includes chatbot integration, automated workflows, and real-time data handling for improved operational efficiency.",
    tags: ["Spring Boot", "Next.js", "Chatbot", "REST API", "MySQL", "Automated Mailling Tool"],
    // codeUrl: "#",
    // liveUrl: "#",
    featured: true,
    }
];

export default function FeaturedProjectsSection() {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-medium leading-10 text-neutral-800 dark:text-zinc-100">
            {t("home.featuredProjects.title")}
          </h2>

          <p className="mt-4 text-lg font-normal leading-7 text-zinc-600 dark:text-zinc-400">
            {t("home.featuredProjects.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.titleKey}
              title={t(project.titleKey)}
              description={project.description}
              tags={project.tags}
              codeUrl={project.codeUrl}
              liveUrl={project.liveUrl}
              featured={project.featured}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-5 py-2.5 text-sm font-medium leading-5 text-neutral-800 transition hover:bg-neutral-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <span>{t("home.featuredProjects.viewAll")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}