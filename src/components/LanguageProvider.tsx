"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  isLocale,
  Locale,
  supportedLocales,
  translations,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (path) => path,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("locale");
    if (stored && isLocale(stored)) {
      setLocaleState(stored);
      document.documentElement.setAttribute("lang", stored);
      return;
    }

    const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
    if (isLocale(browserLanguage)) {
      setLocaleState(browserLanguage);
      document.documentElement.setAttribute("lang", browserLanguage);
      return;
    }

    document.documentElement.setAttribute("lang", "en");
  }, []);

  const setLocale = (nextLocale: Locale) => {
    if (!supportedLocales.includes(nextLocale)) {
      return;
    }
    setLocaleState(nextLocale);
    localStorage.setItem("locale", nextLocale);
    document.documentElement.setAttribute("lang", nextLocale);
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    let cursor: unknown = translations[locale];

    for (const key of keys) {
      if (typeof cursor !== "object" || cursor === null || !(key in cursor)) {
        return path;
      }
      cursor = (cursor as Record<string, unknown>)[key];
    }

    return typeof cursor === "string" ? cursor : path;
  };

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
