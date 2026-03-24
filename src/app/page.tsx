import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my personal portfolio.",
};

export default async function HomePage() {
  const [contactInfoRows, featuredProjects] = await Promise.all([
    prisma.contactInfo.findMany(),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  const contactMap = Object.fromEntries(
    contactInfoRows.map((r) => [r.key, r.value])
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <section className="mb-20 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Hi, I&apos;m{" "}
          <span className="text-indigo-600">Your Name</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Software Engineer building modern web applications. Passionate about
          clean code, great UX, and scalable systems.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/projects"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-zinc-300 px-6 py-3 font-semibold text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Quick contact highlights */}
      <section className="mb-20">
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
          Find me online
        </h2>
        <div className="flex flex-wrap gap-4">
          {contactMap.email && (
            <a
              href={`mailto:${contactMap.email}`}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              ✉ {contactMap.email}
            </a>
          )}
          {contactMap.github && (
            <a
              href={contactMap.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              GitHub
            </a>
          )}
          {contactMap.linkedin && (
            <a
              href={contactMap.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              LinkedIn
            </a>
          )}
          {contactMap.location && (
            <span className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              ◉ {contactMap.location}
            </span>
          )}
        </div>
      </section>

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              All projects →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {project.description.slice(0, 100)}…
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
