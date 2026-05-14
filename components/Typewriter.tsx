"use client";

import { useEffect, useState } from "react";

export function Typewriter({ text, speed = 80, pause = 2000 }: { text: string; speed?: number; pause?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < text.length) {
        timer = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);
      } else {
        timer = setTimeout(() => setPhase("deleting"), pause);
      }
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timer = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length - 1));
        }, speed / 2);
      } else {
        timer = setTimeout(() => {
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, text, speed, pause]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-neon-cyan via-neon-cyan-light to-neon-purple bg-clip-text text-transparent">
        {displayed}
      </span>
      <span className="ml-0.5 inline-block w-[3px] h-[1.1em] bg-neon-cyan align-middle animate-pulse" />
    </span>
  );
}
