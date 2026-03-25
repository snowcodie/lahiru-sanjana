import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/AdminLoginForm";
import { getAdminSessionFromCookies } from "@/lib/auth";

export const metadata = {
  title: "Admin Login",
  description: "Secure admin login.",
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
          
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}