"use client";

import ContactCard from "./ContactCard";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();
  const whatsappUrl =
    "https://wa.me/94784420997?text=Hi%20Lahiru%2C%20I%20would%20like%20to%20chat%20about%20a%20project.";

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl text-center">

        {/* Heading */}
        <h2 className="text-4xl font-medium text-neutral-800 dark:text-zinc-100 sm:text-5xl">
          {t("home.contact.title")}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {t("home.contact.subtitle")}
        </p>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <ContactCard
            title={t("home.contact.emailMe")}
            description="lahirusanjana1@gmail.com"
            action={t("home.contact.sendEmail")}
            icon={<span>📧</span>}
            actionHref="mailto:lahirusanjana1@gmail.com"
            openInNewTab
          />

          <ContactCard
            title={t("home.contact.letsChat")}
            description="Quick questions or project inquiries"
            action={t("home.contact.startChat")}
            icon={<span>💬</span>}
            actionHref={whatsappUrl}
            openInNewTab
          />

          <ContactCard
            title={t("home.contact.scheduleCall")}
            description="Book a 30-minute consultation"
            action={t("home.contact.bookNow")}
            icon={<span>📅</span>}
            actionHref="/contact#contact-me"
          />
        </div>

        {/* CTA Button */}
        {/* <div className="mt-16">
          <button className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700">
            {t("home.contact.getInTouch")}
            <span>→</span>
          </button>
        </div> */}
      </div>
    </section>
  );
}