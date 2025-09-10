"use client";
import { useState, useEffect } from "react";

export function TextGenerateEffect({
  words,
  speed = 60,
  pause = 1200,
  loop = true,
  className = "",
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = typing, -1 = deleting

  useEffect(() => {
    let timeout;

    if (!loop) {
      if (index < words.length) {
        timeout = setTimeout(() => {
          setDisplayedText(words.slice(0, index + 1));
          setIndex(index + 1);
        }, speed);
      }
      return () => clearTimeout(timeout);
    }

    if (direction === 1 && index === words.length) {
      // pause before deleting
      timeout = setTimeout(() => setDirection(-1), pause);
    } else if (direction === -1 && index === 0) {
      // pause before typing again
      timeout = setTimeout(() => setDirection(1), pause / 2);
    } else {
      timeout = setTimeout(() => {
        const newIndex = index + direction;
        setDisplayedText(words.slice(0, newIndex));
        setIndex(newIndex);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [index, direction, words, speed, loop, pause]);

  return (
    <span
      className={`text-lg md:text-xl font-semibold tracking-wide text-indigo-600 ${className}`}
    >
      {displayedText}
      <span className="inline-block w-[2px] h-5 bg-indigo-600 ml-1 animate-blink" />
    </span>
  );
}
