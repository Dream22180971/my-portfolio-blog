"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-5 right-4 z-50 flex h-10 w-10 items-center justify-center border border-space-border bg-[var(--canvas)] text-text-muted transition-all hover:border-neon-cyan hover:text-neon-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-cyan sm:bottom-8 sm:right-8",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
      aria-label="回到顶部"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
