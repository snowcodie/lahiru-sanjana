import type { Metadata } from "next";
import StatsSection from "@/components/StatsSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ProfessionalExperienceSection from "@/components/ProfessionalExperienceSection";
import PhilosophySection from "@/components/PhilosophySection";
import ContactSection from "@/components/ContactSection";
import HomeHeroSection from "@/components/HomeHeroSection";
import HomeContactMeSection from "@/components/HomeContactMeSection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my personal portfolio.",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <HomeHeroSection />

      <HomeContactMeSection />
      
      <ScrollReveal variant="zoom">
        <StatsSection />
      </ScrollReveal>

      <ScrollReveal variant="left">
        <FeaturedProjectsSection />
      </ScrollReveal>

      <ScrollReveal variant="right">
        <SkillsSection />
      </ScrollReveal>

      <ScrollReveal variant="up">
        <ProfessionalExperienceSection />
      </ScrollReveal>

      <ScrollReveal variant="soft">
        <PhilosophySection />
      </ScrollReveal>

      <ScrollReveal variant="zoom" threshold={0.2}>
        <ContactSection />
      </ScrollReveal>

    </div>
  );
}
