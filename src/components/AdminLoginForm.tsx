"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm({ defaultEmail }: { defaultEmail?: string }) {
  const router = useRouter();
  const [step, setStep] = useState<"request" | "verify">("request");
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function requestOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setError(data.error ?? "Failed to request OTP.");
        return;
      }

      setMessage(data.message ?? "OTP sent.");
      setStep("verify");
    } catch {
      setError("Failed to request OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Failed to verify OTP.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-indigo-500">
          Admin Access
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Sign in with email OTP
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Enter your admin email. We&apos;ll send a one-time code to complete login.
        </p>
      </div>

      {step === "request" ? (
        <form className="space-y-5" onSubmit={requestOtp}>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              placeholder="admin@example.com"
            />
          </div>

          {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form className="space-y-5" onSubmit={verifyOtp}>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            Code sent to <span className="font-medium text-zinc-900 dark:text-white">{email}</span>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="admin-otp">
              6-digit OTP
            </label>
            <input
              id="admin-otp"
              inputMode="numeric"
              pattern="[0-9]{6}"
              required
              maxLength={6}
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm tracking-[0.35em] text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              placeholder="123456"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setStep("request");
                setCode("");
                setError(null);
              }}
              className="flex-1 rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Log in"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}