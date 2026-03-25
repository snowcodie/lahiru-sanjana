"use client";

import FeatureCard from "./FeatureCard";
import { useLanguage } from "@/components/LanguageProvider";

export default function PhilosophySection() {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-medium text-neutral-800 dark:text-zinc-100">
            {t("home.philosophy.title")}
          </h2>

          <p className="mt-6 text-lg leading-7 text-zinc-600 dark:text-zinc-400">
            {t("home.philosophy.paragraph1")}
          </p>

          <p className="mt-6 text-lg leading-7 text-zinc-600 dark:text-zinc-400">
            {t("home.philosophy.paragraph2")}
          </p>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              t("home.philosophy.tagEnterprise"),
              t("home.philosophy.tagModernWeb"),
              t("home.philosophy.tagScalableArchitecture"),
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-800/20 bg-zinc-800/5 px-4 py-2 text-sm text-neutral-800 dark:border-zinc-700 dark:bg-zinc-800/30 dark:text-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid gap-6 sm:grid-cols-2">
          <FeatureCard
            title={t("home.philosophy.innovationTitle")}
            description={t("home.philosophy.innovationDesc")}
            icon={<span>💡</span>}
          />

          <FeatureCard
            title={t("home.philosophy.userCentricTitle")}
            description={t("home.philosophy.userCentricDesc")}
            icon={<span>👤</span>}
          />

          <FeatureCard
            title={t("home.philosophy.cleanArchitectureTitle")}
            description={t("home.philosophy.cleanArchitectureDesc")}
            icon={<span>🏗️</span>}
          />

          <FeatureCard
            title={t("home.philosophy.performanceTitle")}
            description={t("home.philosophy.performanceDesc")}
            icon={<span>⚡</span>}
          />
        </div>
      </div>
    </section>
  );
}