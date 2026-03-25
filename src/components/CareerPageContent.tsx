"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  experienceContent,
  ExperienceContentItem,
} from "@/lib/experience-content";

function ExperienceCard({
  exp,
  index,
  t,
}: {
  exp: ExperienceContentItem;
  index: number;
  t: (key: string) => string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Double rAF ensures the initial opacity:0 state is painted
          // before we add the visible class, so the CSS transition fires.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setVisible(true));
          });
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <li
      ref={ref}
      className={`relative career-card-reveal${visible ? " career-card-visible" : ""}`}
    >
      <span className="absolute -left-[2.625rem] flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 ring-4 ring-white dark:ring-zinc-950" />

      <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-indigo-500">
          {exp.period}
        </p>
        <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
          {t(exp.titleKey)}
        </h2>
        <p className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {exp.company}
        </p>
        <ul className="space-y-2">
          {exp.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function CareerPageContent() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {t("careerPage.heading")}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {t("careerPage.subtitle")}
        </p>
      </div>

      {experienceContent.length === 0 ? (
        <p className="text-zinc-500">{t("careerPage.emptyState")}</p>
      ) : (
        <ol className="relative space-y-10 border-l-2 border-indigo-200 pl-8 dark:border-indigo-800">
          {experienceContent.map((exp, index) => (
            <ExperienceCard
              key={`${exp.period}-${exp.titleKey}`}
              exp={exp}
              index={index}
              t={t}
            />
          ))}
        </ol>
      )}
    </div>
  );
}
