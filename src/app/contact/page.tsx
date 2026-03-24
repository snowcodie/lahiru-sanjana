import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch via the contact form or find me online.",
};

export default async function ContactPage() {
  const contactInfoRows = await prisma.contactInfo.findMany();
  const contactMap = Object.fromEntries(
    contactInfoRows.map((r) => [r.key, r.value])
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Contact Me
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Have a question, collaboration idea, or just want to say hi? Fill out
          the form below or reach me directly through any of the channels listed.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-5">
        {/* Contact form — takes up 3 columns */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        {/* My contact details — takes up 2 columns */}
        <aside className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            My Contact Info
          </h2>
          <dl className="space-y-4">
            {contactMap.email && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${contactMap.email}`}
                    className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {contactMap.email}
                  </a>
                </dd>
              </div>
            )}
            {contactMap.github && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  GitHub
                </dt>
                <dd className="mt-1">
                  <a
                    href={contactMap.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {contactMap.github.replace("https://github.com/", "@")}
                  </a>
                </dd>
              </div>
            )}
            {contactMap.linkedin && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  LinkedIn
                </dt>
                <dd className="mt-1">
                  <a
                    href={contactMap.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {contactMap.linkedin.replace("https://linkedin.com/in/", "")}
                  </a>
                </dd>
              </div>
            )}
            {contactMap.twitter && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Twitter / X
                </dt>
                <dd className="mt-1">
                  <a
                    href={contactMap.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {contactMap.twitter.replace("https://twitter.com/", "@")}
                  </a>
                </dd>
              </div>
            )}
            {contactMap.location && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Location
                </dt>
                <dd className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {contactMap.location}
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </div>
  );
}
