import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";
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
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="relative self-stretch overflow-hidden">
        {/* Background glow */}
        {/* <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[20%] top-0 h-96 w-96 rounded-full bg-zinc-950/8 blur-3xl dark:bg-zinc-50/12" />
          <div className="absolute right-[18%] top-[55%] h-96 w-96 rounded-full bg-zinc-950/8 blur-3xl dark:bg-zinc-50/12" />
        </div> */}

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-10 text-center sm:py-16">
          {/* Welcome badge */}
          <div className="inline-flex items-center rounded-full border border-neutral-400 bg-gray-100/50 px-4 py-2 dark:bg-[#222222]/50 dark:border-neutral-700 backdrop-blur-md">
            <span className="text-sm font-normal leading-5 text-zinc-600 dark:text-neutral-500">
              👋 Welcome to my space
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-5xl font-medium leading-tight text-neutral-800 sm:text-6xl lg:text-7xl lg:leading-[72px] dark:text-neutral-100">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-zinc-900 via-black to-zinc-700 bg-clip-text text-transparent dark:text-neutral-100">
              Lahiru Sanjana
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-2xl font-normal leading-9 text-zinc-600 sm:text-3xl">
            Software Engineer &amp; SAP Developer
          </p>

          {/* Description */}
          <p className="mt-8 max-w-3xl text-lg font-normal leading-7 text-zinc-600/90">
            Crafting elegant solutions for complex business challenges.
            Specializing in enterprise applications with a focus on user
            experience and scalable architecture.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-5 py-2.5 text-sm font-medium leading-5 text-stone-50 shadow-[0px_4px_6px_-4px_rgba(46,46,46,0.20)] shadow-[0px_10px_15px_-3px_rgba(46,46,46,0.20)] transition hover:bg-zinc-700"
            >
              <span>View Projects</span>
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
              <span>Contact Me</span>
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

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 sm:mt-20">
            <span className="text-xs font-normal uppercase tracking-wide text-zinc-600/80">
              Scroll to explore
            </span>

            <div className="relative h-12 w-6 rounded-full border-2 border-zinc-600/50">
              <div className="scroll-dot absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-[5px] rounded-full bg-zinc-600/80" />
            </div>
          </div>

        </div>
      </section>

      {/* contact me */}
      <ScrollReveal className="relative w-full px-6 pt-8">
        <div className="pointer-events-none absolute inset-x-6 top-0">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent dark:via-zinc-200/40" />
          <div className="mt-[-1px] h-2 bg-gradient-to-r from-transparent via-zinc-800/15 to-transparent blur-sm dark:via-zinc-200/10" />
        </div>

        <div className="mx-auto flex max-w-5xl justify-center gap-6">
          
          {/* GitHub */}
          <Link
            href="https://github.com/snowcodie"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link social-link-left flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-neutral-900 shadow-sm transition hover:scale-105 hover:bg-neutral-800"
          >
            <svg
              className="h-5 w-5 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.7}
            >
              <path d="M12 2a10 10 0 00-3.16 19.5c.5.1.66-.22.66-.48v-1.7c-2.7.6-3.3-1.2-3.3-1.2a2.6 2.6 0 00-1.1-1.4c-.9-.6.06-.6.06-.6a2 2 0 011.5 1 2 2 0 002.8.8 2 2 0 01.6-1.3c-2.2-.2-4.5-1.1-4.5-5a3.9 3.9 0 011-2.7 3.6 3.6 0 01.1-2.7s.8-.3 2.8 1a9.6 9.6 0 015 0c2-1.3 2.8-1 2.8-1a3.6 3.6 0 01.1 2.7 3.9 3.9 0 011 2.7c0 3.9-2.3 4.8-4.5 5a2.3 2.3 0 01.7 1.8v2.7c0 .26.16.58.67.48A10 10 0 0012 2z" />
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/snowcodie/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link social-link-middle flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-neutral-900 shadow-sm transition hover:scale-105 hover:bg-neutral-800"
          >
            <svg
              className="h-5 w-5 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.7}
            >
              <path d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 9h4v2h.1a4.4 4.4 0 013.9-2.1c4.2 0 5 2.8 5 6.4V20h-4v-4.6c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V20h-4z" />
            </svg>
          </Link>

          {/* Email */}
          <Link
            href="mailto:lahirusanjana1@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link social-link-right flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-neutral-900 shadow-sm transition hover:scale-105 hover:bg-neutral-800"
          >
            <svg
              className="h-5 w-5 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.7}
            >
              <path d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
            </svg>
          </Link>

        </div>
      </ScrollReveal>


    </div>
  );
}
