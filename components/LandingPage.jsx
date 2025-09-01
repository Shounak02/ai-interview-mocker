"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import Footer from "../app/dashboard/_components/Footer";


export default function LandingPage() {
  const router = useRouter();

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

        <motion.p
          className="text-lg text-gray-600 mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Practice unlimited AI-powered mock interviews, get instant feedback,
          and track your progress to land your dream job.
        </motion.p>

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

      {/* Features Section */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "AI-Powered Questions",
              desc: "Get dynamic interview questions tailored to your skills and role.",
            },
            {
              title: "Instant Feedback",
              desc: "Receive real-time analysis of your responses and improve instantly.",
            },
            {
              title: "Track Your Growth",
              desc: "Monitor your performance and get insights into strengths & weaknesses.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-secondary rounded-2xl shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Footer Component with New Color Scheme */}
      <Footer />
    </div>
  );
}
