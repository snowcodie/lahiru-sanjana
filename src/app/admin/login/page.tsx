import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/AdminLoginForm";
import { getAdminEmail, getAdminSessionFromCookies } from "@/lib/auth";

export const metadata = {
  title: "Admin Login",
  description: "Secure admin login with email OTP.",
};

export default async function AdminLoginPage() {
  const session = await getAdminSessionFromCookies();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_38%),linear-gradient(to_bottom,_rgba(244,244,245,0.85),_rgba(255,255,255,1))] px-6 py-16 dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.2),_transparent_30%),linear-gradient(to_bottom,_rgba(9,9,11,0.9),_rgba(9,9,11,1))]">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-indigo-500">
            Portfolio Admin
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Manage projects, blog posts, and contact inbox in one place.
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Access is protected with a one-time password sent to your admin email. After login, you can publish projects, write blog posts, and review new messages.
          </p>
        </div>

        <AdminLoginForm defaultEmail={getAdminEmail()} />
      </div>
    </div>
  );
}