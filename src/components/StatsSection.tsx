"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      value: "20+",
      label: t("home.stats.projectsDelivered"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-zinc-800 dark:text-zinc-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M10 10h4v4h-4z" />
        </svg>
      ),
    },
    {
      value: "2+",
      label: t("home.stats.yearsExperience"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-zinc-800 dark:text-zinc-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <circle cx="12" cy="8" r="3" />
          <path d="M8 21c0-2.5 1.8-4 4-4s4 1.5 4 4" />
        </svg>
      ),
    },
    {
      value: "8+",
      label: t("home.stats.happyClients"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-zinc-800 dark:text-zinc-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5 1.343 3.5 3 3.5Z" />
          <path d="M8 12c2.21 0 4-1.79 4-4S10.21 4 8 4 4 5.79 4 8s1.79 4 4 4Z" />
          <path d="M2 20c0-2.21 2.239-4 5-4s5 1.79 5 4" />
          <path d="M13 20c0-1.657 1.567-3 3.5-3S20 18.343 20 20" />
        </svg>
      ),
    },
    {
      value: "95%",
      label: t("home.stats.clientSatisfaction"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-zinc-800 dark:text-zinc-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gray-100/30 px-6 py-16 dark:bg-zinc-900/20">
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-300/70 to-transparent dark:via-zinc-700/70" />
        <div className="mt-[-1px] h-2 bg-gradient-to-r from-transparent via-neutral-300/20 to-transparent blur-sm dark:via-zinc-700/20" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-300/70 to-transparent dark:via-zinc-700/70" />
        <div className="mt-[-1px] h-2 bg-gradient-to-r from-transparent via-neutral-300/20 to-transparent blur-sm dark:via-zinc-700/20" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-50 via-zinc-50/70 to-transparent blur-sm dark:from-zinc-950 dark:via-zinc-950/70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-50 via-zinc-50/70 to-transparent blur-sm dark:from-zinc-950 dark:via-zinc-950/70" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/10 dark:bg-zinc-100/10">
              {item.icon}
            </div>

            <h3 className="mt-4 text-3xl font-medium leading-9 text-neutral-800 dark:text-neutral-100">
              {item.value}
            </h3>

            <p className="mt-1 text-sm font-normal leading-5 text-zinc-600 dark:text-zinc-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}