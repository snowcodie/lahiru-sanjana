import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import ContactPageInfo from "@/components/ContactPageInfo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch via the contact form or find me online.",
};

export default function ContactPage() {
  const contactInfo = {
    email: "lahirusanjana1@gmail.com",
    github: "https://github.com/snowcodie",
    linkedin: "https://www.linkedin.com/in/snowcodie/",
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ContactSection />
      <ContactPageInfo contactInfo={contactInfo} />
    </div>
  );
}
