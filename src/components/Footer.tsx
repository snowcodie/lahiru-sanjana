"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3">
          
          {/* Left - About */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Lahiru Sanjana
            </h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {t("footer.aboutDescription")}
            </p>

            {/* Email */}
            <a
              href="mailto:lahiru@email.com"
              className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              lahirusanjana1@gmail.com
            </a>
          </div>

          {/* Middle - Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-800 dark:text-zinc-200">
              {t("footer.navigationTitle")}
            </h4>
            <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/" onClick={scrollToTop}>
                {t("nav.home")}
              </Link>
              <Link href="/projects">
                {t("nav.projects")}
              </Link>
              <Link href="/career" >
                {t("nav.career")}
              </Link>
              <Link href="/blog" >
                {t("nav.blog")}
              </Link>
              <Link href="/contact" >
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {/* Right - Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-800 dark:text-zinc-200">
              {t("footer.connectTitle")}
            </h4>

            <div className="mt-4 flex gap-4">
              <Link
                href="https://github.com/snowcodie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/snowcodie/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                LinkedIn
              </Link>
              <Link
                href="mailto:lahirusanjana1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Mail To
              </Link>
            </div>

            {/* Optional CTA */}
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              {t("footer.openToOpportunities")}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} Lahiru Sanjana. {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}