import Link from "next/link";

type ContactCardProps = {
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
  actionHref?: string;
  openInNewTab?: boolean;
};

export default function ContactCard({
  title,
  description,
  action,
  icon,
  actionHref,
  openInNewTab = false,
}: ContactCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800/10 text-zinc-800 dark:bg-zinc-100/10 dark:text-zinc-100">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-medium text-neutral-800 dark:text-zinc-100">
        {title}
      </h3>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      {actionHref ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-800 transition hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400"
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          {action}
          →
        </Link>
      ) : (
        <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-800 transition hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400">
          {action}
          →
        </button>
      )}
    </div>
  );
}