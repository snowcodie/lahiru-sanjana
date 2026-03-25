"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type ProjectCardProps = {
  title: string;
  description: string;
  tags?: string[];
  codeUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  detailUrl?: string;
};

export default function ProjectCard({
  title,
  description,
  tags = [],
  codeUrl,
  liveUrl,
  featured = false,
  detailUrl,
}: ProjectCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    if (!detailUrl) return;
    router.push(detailUrl);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!detailUrl) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push(detailUrl);
    }
  };

  return (
    <article
      className={`relative rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] dark:border-zinc-800 dark:bg-zinc-900 ${
        detailUrl
          ? "cursor-pointer transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:hover:border-zinc-700"
          : ""
      }`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      tabIndex={detailUrl ? 0 : undefined}
      role={detailUrl ? "link" : undefined}
      aria-label={detailUrl ? `View details for ${title}` : undefined}
    >
      {featured && (
        <div className="absolute -top-3 right-8 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium leading-4 text-stone-50 shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
          Featured
        </div>
      )}

      <h3 className="max-w-sm text-xl font-medium leading-7 text-neutral-800 dark:text-zinc-100">
        {title}
      </h3>

      <p className="mt-6 max-w-sm text-sm font-normal leading-6 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium leading-4 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {(codeUrl || liveUrl) && (
        <div className="mt-6 flex items-center gap-4 border-t border-neutral-200/50 pt-5 dark:border-zinc-800/60">
          {codeUrl && (
            <Link
              href={codeUrl}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-normal leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                />
              </svg>
              <span>Code</span>
            </Link>
          )}

          {liveUrl && (
            <Link
              href={liveUrl}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-normal leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 3h7m0 0v7m0-7L10 14"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5h5M5 5v14h14v-5"
                />
              </svg>
              <span>Live Demo</span>
            </Link>
          )}
        </div>
      )}
    </article>
  );
}