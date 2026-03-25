type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/10 text-zinc-800 dark:bg-zinc-100/10 dark:text-zinc-100">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-medium text-neutral-800 dark:text-zinc-100">
        {title}
      </h3>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}