type SkillCategoryCardProps = {
  title: string;
  skills: string[];
  icon: React.ReactNode;
};

export default function SkillCategoryCard({
  title,
  skills,
  icon,
}: SkillCategoryCardProps) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-800/10 text-zinc-800 dark:bg-zinc-100/10 dark:text-zinc-100">
          {icon}
        </div>

        <h3 className="text-lg font-medium leading-7 text-neutral-800 dark:text-zinc-100">
          {title}
        </h3>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium leading-4 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}