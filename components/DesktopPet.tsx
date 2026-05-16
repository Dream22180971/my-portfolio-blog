"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const messages = [
  "欢迎来到肖恩的博客！",
  "有什么可以帮你的？",
  "今天也在持续构建中 ⚡",
  "嘿，点我干嘛~",
  "一起学习AI吧！",
];

export function DesktopPet() {
  const [bubble, setBubble] = useState<string | null>(null);
  const [bouncing, setBouncing] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const msgIndex = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  const handleClick = useCallback(() => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);

    if (timerRef.current) clearTimeout(timerRef.current);
    const msg = messages[msgIndex.current % messages.length];
    msgIndex.current++;
    setBubble(msg);
    timerRef.current = setTimeout(() => setBubble(null), 3000);
  }, []);

  return (
    <div className="flex flex-col items-center select-none" style={{ width: 90 }}>
      {/* Speech bubble — 用 inline style 控制 opacity，避免 Tailwind v4 冲突 */}
      <div
        style={{
          opacity: bubble ? 1 : 0,
          transform: bubble ? "translateY(0)" : "translateY(8px)",
          pointerEvents: bubble ? "auto" : "none",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
        className="relative mb-1 rounded-lg border border-space-border bg-space-bg/95 px-3 py-1.5 text-xs font-mono text-text-secondary shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-xl whitespace-nowrap"
      >
        {bubble}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-space-border" />
      </div>

      {/* Pixel pet — Codex 风格可爱小生物 */}
      <button
        type="button"
        onClick={handleClick}
        className={`cursor-pointer focus:outline-none ${bouncing ? "pet-bounce" : ""}`}
        aria-label="桌面宠物"
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 13 13"
          xmlns="http://www.w3.org/2000/svg"
          style={{ imageRendering: "pixelated" }}
          className="pet-float"
        >
          {/* 身体 — 圆润的紫色小团子 */}
          <rect x="4" y="1" width="5" height="1" fill="#7c3aed" />
          <rect x="3" y="2" width="7" height="1" fill="#7c3aed" />
          <rect x="2" y="3" width="9" height="1" fill="#8b5cf6" />
          <rect x="2" y="4" width="9" height="1" fill="#8b5cf6" />
          <rect x="2" y="5" width="9" height="1" fill="#7c3aed" />
          <rect x="2" y="6" width="9" height="1" fill="#7c3aed" />
          <rect x="3" y="7" width="7" height="1" fill="#6d28d9" />
          <rect x="4" y="8" width="5" height="1" fill="#6d28d9" />

          {/* 眼白 */}
          <rect x="4" y="4" width="2" height="2" fill="white" />
          <rect x="7" y="4" width="2" height="2" fill="white" />

          {/* 眼珠 — 眨眼时变扁 */}
          {blinking ? (
            <>
              <rect x="4" y="5" width="2" height="1" fill="#1e1b4b" />
              <rect x="7" y="5" width="2" height="1" fill="#1e1b4b" />
            </>
          ) : (
            <>
              <rect x="5" y="4" width="1" height="2" fill="#1e1b4b" />
              <rect x="8" y="4" width="1" height="2" fill="#1e1b4b" />
              {/* 高光 */}
              <rect x="5" y="4" width="1" height="1" fill="white" opacity="0.8" />
              <rect x="8" y="4" width="1" height="1" fill="white" opacity="0.8" />
            </>
          )}

          {/* 腮红 */}
          <rect x="3" y="6" width="1" height="1" fill="#f472b6" opacity="0.5" />
          <rect x="9" y="6" width="1" height="1" fill="#f472b6" opacity="0.5" />

          {/* 小嘴 */}
          <rect x="6" y="7" width="1" height="1" fill="#c084fc" />

          {/* 天线 */}
          <rect x="6" y="0" width="1" height="1" fill="#00d4ff" />

          {/* 小脚 */}
          <rect x="4" y="9" width="2" height="1" fill="#6d28d9" />
          <rect x="7" y="9" width="2" height="1" fill="#6d28d9" />

          {/* 胸口星星 */}
          <rect x="6" y="6" width="1" height="1" fill="#00d4ff" opacity="0.6" />
        </svg>
      </button>
    </div>
  );
}
