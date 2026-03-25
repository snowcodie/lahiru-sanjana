"use client";

import SkillCategoryCard from "./SkillCategoryCard";
import { useLanguage } from "@/components/LanguageProvider";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["JS/TS","React", "TypeScript", "Next.js", "Tailwind CSS", "Angular", "SAP Fiori"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    ),
  },
  {
    title: "Backend",
    skills: ["ABAP", "JAVA", "Python", "Node.js","Spring", "Spring Boot", "Express", "REST APIs"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 12h12M6 18h12" />
      </svg>
    ),
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "SAP HANA"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    ),
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS - Hands-on", "Docker - Hands-on", "Kubernetes - Hands-on", "CI/CD - Hands-on", "SAP BTP", "Azure - Hands-on"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 18a4 4 0 010-8 5 5 0 019.7-1A3.5 3.5 0 1117 18H7z" />
      </svg>
    ),
  },
  {
    title: "Design",
    skills: ["Figma", "UI/UX", "Design Systems", "Fiori Design", "Responsive Design"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6a3 3 0 010 6H9m0-6a3 3 0 000 6m0 0h6a3 3 0 010 6H9m0-6a3 3 0 000 6" />
      </svg>
    ),
  },
  {
    title: "Mobile",
    skills: ["React Native", "Flutter"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 18h2" />
      </svg>
    ),
  },
];

export default function SkillsSection() {
  const { t } = useLanguage();

  const localizedCategories = skillCategories.map((category) => {
    const titleMap: Record<string, string> = {
      Frontend: t("home.skills.frontend"),
      Backend: t("home.skills.backend"),
      Database: t("home.skills.database"),
      "Cloud & DevOps": t("home.skills.cloudDevOps"),
      Design: t("home.skills.design"),
      Mobile: t("home.skills.mobile"),
    };

    return {
      ...category,
      title: titleMap[category.title] ?? category.title,
    };
  });

  return (
    <section className="border-t border-neutral-200/50 bg-neutral-50 px-6 py-24 dark:border-zinc-800/50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-medium leading-10 text-neutral-800 dark:text-zinc-100">
            {t("home.skills.title")}
          </h2>

          <p className="mt-4 text-lg font-normal leading-7 text-zinc-600 dark:text-zinc-400">
            {t("home.skills.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {localizedCategories.map((category) => (
            <SkillCategoryCard
              key={category.title}
              title={category.title}
              skills={category.skills}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}