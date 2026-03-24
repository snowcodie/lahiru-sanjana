import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-40 text-center">
      <p className="mb-2 text-6xl font-bold text-indigo-600">404</p>
      <h1 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-white">
        Page not found
      </h1>
      <p className="mb-8 text-zinc-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
