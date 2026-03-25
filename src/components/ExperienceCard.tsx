type ExperienceCardProps = {
  period: string;
  title: string;
  company: string;
  description: string;
  align?: "left" | "right";
};

export default function ExperienceCard({
  period,
  title,
  company,
  description,
  align = "left",
}: ExperienceCardProps) {
  return (
    <div
      className={`w-full lg:w-[calc(50%-32px)] ${
        align === "right" ? "lg:ml-auto" : ""
      }`}
    >
      <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2 text-sm font-normal leading-5 text-zinc-600 dark:text-zinc-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{period}</span>
        </div>

        <h3 className="mt-4 text-xl font-medium leading-7 text-neutral-800 dark:text-zinc-100">
          {title}
        </h3>

        <p className="mt-2 text-base font-normal leading-6 text-zinc-800 dark:text-zinc-200">
          {company}
        </p>

        <p className="mt-6 text-sm font-normal leading-6 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </article>
    </div>
  );
}