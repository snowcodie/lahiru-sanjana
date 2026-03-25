import type { Metadata } from "next";
import CareerPageContent from "@/components/CareerPageContent";

export const metadata: Metadata = {
  title: "Career",
  description: "My professional experience and career timeline.",
};

export default function CareerPage() {
  return <CareerPageContent />;
}
