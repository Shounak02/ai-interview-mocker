"use client";

import React, { useState } from "react";
import { Volume2 } from "lucide-react";


const mockQuestions = [
  { id: 1, question: "Explain React hooks and their use cases?" },
  { id: 2, question: "What is closure in JavaScript?" },
  { id: 3, question: "Explain event delegation in DOM?" },
  { id: 4, question: "Difference between var, let, and const?" },
];

function QuestionsPage() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (text) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const speech = new SpeechSynthesisUtterance(text);
      speech.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-3">Mock Interview Questions</h2>
      <p className="text-gray-500 mb-5">
        Select a question to view it and hear it read aloud.
      </p>

      {/* Question Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {mockQuestions.map((q, index) => (
          <button
            key={q.id}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all ${
              activeQuestionIndex === index
                ? "bg-black text-white"
                : "bg-secondary hover:bg-gray-300"
            }`}
            onClick={() => setActiveQuestionIndex(index)}
          >
            Question #{index + 1}
          </button>
        ))}
      </div>

      {/* Question Display */}
      <div className="flex items-center justify-between p-5 border rounded-lg mb-10 bg-gray-50">
        <p className="text-lg md:text-xl">{mockQuestions[activeQuestionIndex].question}</p>
        <Volume2
          className={`cursor-pointer w-6 h-6 ${isSpeaking ? "text-blue-500 animate-pulse" : ""}`}
          onClick={() => handleSpeak(mockQuestions[activeQuestionIndex].question)}
        />
      </div>

      {/* Note Section */}
      <div className="border rounded-lg p-5 bg-blue-100">
        <h2 className="flex gap-2 items-center text-blue-700 font-semibold">
          💡 Note:
        </h2>
        <p className="text-sm text-blue-800 mt-2">
          These are just static sample questions to give you a feel for the platform. 
          To take a personalized mock interview suited to your job role and tech stack, go to the Dashboard and start an interview.
        </p>
      </div>
    </div>
  );
}

export default QuestionsPage;
