"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDbError =
    error.message?.includes("Authentication failed") ||
    error.message?.includes("connect ECONNREFUSED") ||
    error.message?.includes("P1000") ||
    error.message?.includes("P1001");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-5xl font-bold text-red-500">!</p>
      <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
        {isDbError ? "Database not connected" : "Something went wrong"}
      </h2>
      <p className="mb-6 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
        {isDbError
          ? "Could not connect to the database. Check your DATABASE_URL in .env and make sure PostgreSQL is running."
          : "An unexpected error occurred. You can try again or go back home."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
