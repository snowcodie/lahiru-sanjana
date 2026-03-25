"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function HomeHeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative self-stretch overflow-hidden">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-10 text-center sm:py-16">
        <div className="inline-flex items-center rounded-full border border-neutral-400 bg-gray-100/50 px-4 py-2 backdrop-blur-md dark:border-neutral-700 dark:bg-[#222222]/50">
          <span className="text-sm font-normal leading-5 text-zinc-600 dark:text-neutral-500">
            {t("home.hero.badge")}
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-medium leading-tight text-neutral-800 dark:text-neutral-100 sm:text-6xl lg:text-7xl lg:leading-[72px]">
          {t("home.hero.titlePrefix")} {" "}
          <span className="bg-gradient-to-r from-zinc-900 via-black to-zinc-700 bg-clip-text text-transparent dark:text-neutral-100">
            Lahiru Sanjana
          </span>
        </h1>

        <p className="mt-6 text-2xl font-normal leading-9 text-zinc-600 sm:text-3xl">
          {t("home.hero.subtitle")}
        </p>

        <p className="mt-8 max-w-3xl text-lg font-normal leading-7 text-zinc-600/90">
          {t("home.hero.description")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-5 py-2.5 text-sm font-medium leading-5 text-stone-50 shadow-[0px_4px_6px_-4px_rgba(46,46,46,0.20)] shadow-[0px_10px_15px_-3px_rgba(46,46,46,0.20)] transition hover:bg-zinc-700"
          >
            <span>{t("home.hero.viewProjects")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-600/50 bg-zinc-100 px-5 py-2.5 text-sm font-medium leading-5 text-neutral-800 transition hover:bg-neutral-100 dark:border-neutral-700/50 dark:bg-zinc-900/40 dark:text-neutral-300 dark:hover:bg-zinc-800/70 dark:hover:text-white"
          >
            <span>{t("home.hero.contactMe")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8m-18 8h18V8H3v8z"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 sm:mt-20">
          <span className="text-xs font-normal uppercase tracking-wide text-zinc-600/80">
            {t("home.hero.scroll")}
          </span>

          <div className="relative h-12 w-6 rounded-full border-2 border-zinc-600/50">
            <div className="scroll-dot absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-[5px] rounded-full bg-zinc-600/80" />
          </div>
        </div>
      </div>
    </section>
  );
}