import BlogEditorPage from "@/components/BlogEditorPage";
import { Suspense } from "react";

export default function BlogEditorRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-zinc-500">Loading editor…</p>
        </div>
      }
    >
      <BlogEditorPage />
    </Suspense>
  );
}
