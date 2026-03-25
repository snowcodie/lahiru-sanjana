"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();

  // "password" → initial step; "otp" → shown only when ENABLE_OTP=true
  const [step, setStep] = useState<"password" | "otp">("password");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        otpRequired?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }

      if (data.otpRequired) {
        setStep("otp");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Invalid code.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Verification failed. Please try again.");
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
          {step === "password" ? "Sign in" : "Enter your code"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {step === "password"
            ? "Enter your admin credentials to continue."
            : "A one-time code was sent to your email."}
        </p>
      </div>

      {step === "password" ? (
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              htmlFor="admin-identifier"
            >
              Username
            </label>
            <input
              id="admin-identifier"
              type="text"
              required
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              placeholder="admin"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              htmlFor="admin-password"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      ) : (
        <form className="space-y-5" onSubmit={handleOtp}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              htmlFor="admin-otp"
            >
              6-digit code
            </label>
            <input
              id="admin-otp"
              inputMode="numeric"
              pattern="[0-9]{6}"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm tracking-[0.35em] text-zinc-900 outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              placeholder="123456"
              autoFocus
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setStep("password"); setCode(""); setError(null); }}
              className="flex-1 rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
