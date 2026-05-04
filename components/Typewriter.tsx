"use client";

import { useEffect, useState } from "react";

export function Typewriter({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-neon-cyan via-[#7dd3fc] to-neon-purple bg-clip-text text-transparent">
        {displayed}
      </span>
      <span
        className={`ml-0.5 inline-block w-[3px] h-[1.1em] bg-neon-cyan align-middle ${
          done ? "animate-pulse" : ""
        }`}
        style={!done ? { opacity: 1 } : undefined}
      />
    </span>
  );
}
