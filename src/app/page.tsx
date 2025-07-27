import { TestimonialSection } from "@/components/TestimonialSection";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import HowUProWorks from "@/components/HowUProWorks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RenderingDemo } from "@/components/RenderingDemo";
import TrustedByExpertsSection from "../components/TrustedByExpertsSection";
import CallToActionPage from "@/components/CallToActionPage";
// Server Component - rendered on the server
export default function Home() {
  // Generate server time for demonstration
  const serverTime = new Date().toLocaleTimeString();

  return (
    <div className="w-full" style={{ backgroundColor: "#020d02" }}>
      {/* Testimonial Section - Full Width */}
      <Hero />
      <HowUProWorks />
      <div className="min-h-[calc(100vh-4rem)] p-8">
        <TrustedByExpertsSection />
        <TestimonialSection />
        <CallToActionPage />
      </div>
    </div>
  );
}
