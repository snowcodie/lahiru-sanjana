import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Career",
  description: "My professional experience and career timeline.",
};

export default async function CareerPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { orderIndex: "asc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          My Career
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          My professional journey — roles, companies, and what I worked on.
        </p>
      </div>

      {experiences.length === 0 ? (
        <p className="text-zinc-500">No career entries yet.</p>
      ) : (
        <ol className="relative border-l-2 border-indigo-200 dark:border-indigo-800 space-y-10 pl-8">
          {experiences.map((exp) => {
            const startYear = new Date(exp.startDate).toLocaleDateString(
              "en-US",
              { month: "short", year: "numeric" }
            );
            const endYear = exp.endDate
              ? new Date(exp.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "Present";

            return (
              <li key={exp.id} className="relative">
                {/* Timeline dot */}
                <span className="absolute -left-[2.625rem] flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 ring-4 ring-white dark:ring-zinc-950" />

                <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="mb-1 text-xs font-medium uppercase tracking-widest text-indigo-500">
                    {startYear} — {endYear}
                  </p>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {exp.position}
                  </h2>
                  <p className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {exp.company}
                  </p>
                  {exp.description && (
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {exp.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
