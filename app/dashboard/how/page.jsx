"use client"
import React from 'react'
import { CheckCircle, Zap, BookOpen, Star } from 'lucide-react'
import Link from 'next/link'

function HowItWorks() {
  const steps = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Choose Your Role & Tech Stack",
      description: "Select the job role, technologies, and experience level for your mock interview."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
      title: "Take AI-Powered Mock Questions",
      description: "Answer smart questions generated based on your chosen profile."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
      title: "Get Instant Feedback",
      description: "Receive detailed real-time feedback on your answers and performance."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Track Your Progress",
      description: "Monitor your improvement and prepare effectively for your real interview."
    }
  ]

  return (
    <div className="p-10 md:mx-20 lg:mx-36">
      <h1 className="text-3xl font-bold mb-8">How Hexa Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-5 p-5 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
            <div>{step.icon}</div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
              <p className="text-gray-700">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <p className="text-gray-700 text-lg">
          Ready to practice? Go to the <span className="font-semibold"><Link href={'/dashboard'}>Dashboard</Link></span> and start your personalized mock interview now!
        </p>
      </div>
    </div>
  )
}

export default HowItWorks
