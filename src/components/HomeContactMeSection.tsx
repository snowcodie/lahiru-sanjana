import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function HomeContactMeSection() {
  return (
    <ScrollReveal className="relative w-full px-6 pb-16 pt-8">
      <div className="pointer-events-none absolute inset-x-6 top-0">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent dark:via-zinc-200/40" />
        <div className="mt-[-1px] h-2 bg-gradient-to-r from-transparent via-zinc-800/15 to-transparent blur-sm dark:via-zinc-200/10" />
      </div>

      <div className="mx-auto flex max-w-5xl justify-center gap-6 pb-8">
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

        <div className="pointer-events-none absolute inset-x-6 bottom-0 pb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent dark:via-zinc-200/40" />
          <div className="mt-[-1px] h-2 bg-gradient-to-r from-transparent via-zinc-800/15 to-transparent blur-sm dark:via-zinc-200/10" />
        </div>
      </div>
    </ScrollReveal>
  );
}
