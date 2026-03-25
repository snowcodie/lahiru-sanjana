"use client";

import ExperienceCard from "./ExperienceCard";
import { useLanguage } from "@/components/LanguageProvider";
import { experienceContent } from "@/lib/experience-content";

export default function ProfessionalExperienceSection() {
  const { t } = useLanguage();

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-medium leading-10 text-neutral-800 dark:text-zinc-100">
            {t("home.experience.title")}
          </h2>

          <p className="mt-4 text-lg font-normal leading-7 text-zinc-600 dark:text-zinc-400">
            {t("home.experience.subtitle")}
          </p>
        </div>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-neutral-200 dark:bg-zinc-800 lg:block" />

          <div className="flex flex-col gap-12">
            {experienceContent.map((experience) => (
              <div key={experience.titleKey} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:flex">
                  <div className="h-4 w-4 rounded-full border-4 border-neutral-50 bg-zinc-800 dark:border-zinc-950 dark:bg-zinc-100" />
                </div>

                <ExperienceCard
                  period={experience.period}
                  title={t(experience.titleKey)}
                  company={experience.company}
                  description={experience.description}
                  align={experience.align}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}