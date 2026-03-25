"use client";

import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/components/LanguageProvider";

type ContactInfo = {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  location?: string;
};

type ContactPageInfoProps = {
  contactInfo: ContactInfo;
};

export default function ContactPageInfo({ contactInfo }: ContactPageInfoProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className="mb-12">
        <h1
          id="contact-me"
          className="mb-3 scroll-mt-24 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"
        >
          {t("contactPage.heading")}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {t("contactPage.intro")}
        </p>
      </div>

      <div id="contact-form" className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <aside className="space-y-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {t("contactPage.myContactInfo")}
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                {t("contactPage.email")}
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {contactInfo.email}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                {t("contactPage.github")}
              </dt>
              <dd className="mt-1">
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {contactInfo.github.replace("https://github.com/", "@")}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                {t("contactPage.linkedIn")}
              </dt>
              <dd className="mt-1">
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {contactInfo.linkedin
                    .replace("https://linkedin.com/in/", "")
                    .replace("https://www.linkedin.com/in/", "")}
                </a>
              </dd>
            </div>

            {contactInfo.twitter ? (
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  {t("contactPage.twitterX")}
                </dt>
                <dd className="mt-1">
                  <a
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {contactInfo.twitter.replace("https://twitter.com/", "@")}
                  </a>
                </dd>
              </div>
            ) : null}

            {contactInfo.location ? (
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  {t("contactPage.location")}
                </dt>
                <dd className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {contactInfo.location}
                </dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </div>
    </>
  );
}
