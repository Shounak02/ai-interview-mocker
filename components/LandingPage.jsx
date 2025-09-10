"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Footer from "../app/dashboard/_components/Footer";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      title: "AI-Powered Questions",
      description:
        "Get dynamic interview questions tailored to your skills and role.",
      link: "#",
    },
    {
      title: "Instant Feedback",
      description:
        "Receive real-time analysis of your responses and improve instantly.",
      link: "#",
    },
    {
      title: "Track Your Growth",
      description:
        "Monitor your performance and get insights into strengths & weaknesses.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-indigo-50 to-white">
        <motion.img
          src="/logo.svg"
          alt="Hexa-AI Logo"
          className="w-50 h-50 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Ace Your Interviews with AI 🚀
        </motion.h1>

        {/* ✅ Text Generate Effect under Hero Title */}
        <div className="max-w-2xl mx-auto mb-6 text-gray-700">
          <TextGenerateEffect
            words="Practice smarter. Improve faster. Land your dream job with confidence."
            loop={true}
            speed={70}
            pause={1500}
          />
        </div>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Button size="lg" onClick={() => router.push("/sign-in")}>
            Sign In
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/sign-up")}
          >
            Get Started
          </Button>
        </motion.div>
      </section>

      {/* Features Section with Hover Effect */}
      <section className="py-16 bg-white px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Hexa-AI?
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          <HoverEffect items={features} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
