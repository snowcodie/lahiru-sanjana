"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { localeLabels, Locale, supportedLocales } from "@/lib/i18n";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/career", labelKey: "nav.career" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/contact", labelKey: "nav.contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  const handleLocaleChange = (value: string) => {
    setLocale(value as Locale);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div className="flex items-center gap-3">
            <Link href="/">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-black text-xl font-bold tracking-tight text-white dark:bg-white dark:text-black">
                <span className="text-xl font-semibold leading-5 text-white dark:text-black">
                LS
                </span>
            </div>
            </Link>

            <Link
            href="/"
            className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white"
            >
            Lahiru Sanjana
            </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className={`text-md font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                pathname === href
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {t(labelKey)}
            </Link>
          ))}
          <label className="sr-only" htmlFor="desktop-language-select">
            {t("nav.languageLabel")}
          </label>
          <div className="relative">
            <select
              id="desktop-language-select"
              value={locale}
              onChange={(event) => handleLocaleChange(event.target.value)}
              className="appearance-none rounded-full border border-zinc-300 bg-white py-1 pl-3 pr-8 text-xs font-medium text-zinc-700 outline-none transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {supportedLocales.map((item) => (
                <option key={item} value={item}>
                  {localeLabels[item]}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-500 dark:text-zinc-400"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 4.5 3 3 3-3" />
            </svg>
          </div>
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            {theme === "dark" ? (
              // Sun icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.36-.71.71M6.34 17.66l-.71.71m12.02 0-.71-.71M6.34 6.34l-.71-.71M12 7a5 5 0 100 10A5 5 0 0012 7z" />
              </svg>
            ) : (
              // Moon icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <label className="sr-only" htmlFor="mobile-language-select">
            {t("nav.languageLabel")}
          </label>
          <div className="relative">
            <select
              id="mobile-language-select"
              value={locale}
              onChange={(event) => handleLocaleChange(event.target.value)}
              className="appearance-none rounded-full border border-zinc-300 bg-white py-1 pl-2.5 pr-7 text-[11px] font-medium text-zinc-700 outline-none transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {supportedLocales.map((item) => (
                <option key={item} value={item}>
                  {item.toUpperCase()}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 text-zinc-500 dark:text-zinc-400"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 4.5 3 3 3-3" />
            </svg>
          </div>
          {/* Mobile theme toggle */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.36-.71.71M6.34 17.66l-.71.71m12.02 0-.71-.71M6.34 6.34l-.71-.71M12 7a5 5 0 100 10A5 5 0 0012 7z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </button>
          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="flex flex-col gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-6 bg-zinc-700 transition-transform dark:bg-zinc-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-zinc-700 transition-opacity dark:bg-zinc-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-zinc-700 transition-transform dark:bg-zinc-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
  className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
    menuOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"
  }`}
>
  <nav className="min-h-[calc(100vh-72px)] border-t border-zinc-200/40 bg-white/40 px-6 py-6 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-black/5 dark:border-zinc-800/40 dark:bg-zinc-950/40 dark:shadow-black/20">
    <div className="flex min-h-[calc(100vh-120px)] flex-col justify-between">
      <div className="flex flex-col items-end gap-3">
        {navLinks.map(({ href, labelKey }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className={`min-w-[160px] rounded-2xl px-4 py-3 text-right text-base font-medium transition-all duration-200 backdrop-blur-sm ${
              pathname === href
                ? "bg-white/70 text-zinc-900 shadow-sm ring-1 ring-zinc-200/60 dark:bg-zinc-800/70 dark:text-white dark:ring-zinc-700/60"
                : "text-zinc-600 hover:bg-white/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
            }`}
          >
            {t(labelKey)}
          </Link>
        ))}
      </div>

      <div className="mt-10 border-t border-zinc-800/40 pt-6 text-right dark:border-zinc-800/40">
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-400">
          Lahiru Sanjana
        </p>
        <p className="mt-1 text-xs text-zinc-800 dark:text-zinc-500">
          {t("nav.brandSubtitle")}
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <Link
            href="https://github.com/snowcodie"
            className="rounded-full border border-zinc-800/50 bg-white/40 px-3 py-2 text-xs text-zinc-900 transition hover:bg-white/70 hover:text-zinc-900 dark:border-zinc-700/50 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:bg-zinc-800/70 dark:hover:text-white"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/snowcodie/"
            className="rounded-full border border-zinc-800/50 bg-white/40 px-3 py-2 text-xs text-zinc-900 transition hover:bg-white/70 hover:text-zinc-900 dark:border-zinc-700/50 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:bg-zinc-800/70 dark:hover:text-white"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  </nav>
</div>

        )}

    </header>
  );
}
