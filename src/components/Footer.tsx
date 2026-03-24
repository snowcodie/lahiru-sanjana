export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        <p>
          &copy; {new Date().getFullYear()} My Portfolio. Built with Next.js,
          Tailwind CSS &amp; PostgreSQL.
        </p>
      </div>
    </footer>
  );
}
