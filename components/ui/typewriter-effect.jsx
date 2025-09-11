"use client";
import React from "react";
import { motion } from "framer-motion";

export function TypewriterEffectSmooth({ words }) {
  return (
    <div className="flex flex-wrap items-center text-base sm:text-lg md:text-xl font-medium">
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: idx * 0.4, // one by one reveal
            duration: 0.6,
            ease: "easeOut",
          }}
          className={`mr-3 ${word.className || ""}`}
        >
          {word.text}
        </motion.span>
      ))}
    </div>
  );
}
