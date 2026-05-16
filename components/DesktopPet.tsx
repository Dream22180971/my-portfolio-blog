"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const messages = [
  "欢迎来到肖恩的博客！",
  "有什么可以帮你的？",
  "今天也在持续构建中 ⚡",
  "嘿，点我干嘛~",
  "一起学习AI吧！",
];

const FIRST_VISIT_KEY = "seanwalter-pet-greeted";

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
  color: string;
}

let particleId = 0;

export function DesktopPet() {
  const [bubble, setBubble] = useState<string | null>(null);
  const [bouncing, setBouncing] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [sleeping, setSleeping] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [redBounce, setRedBounce] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickTimestamps = useRef<number[]>([]);
  const msgIndex = useRef(0);

  // 首次访问问候
  useEffect(() => {
    if (typeof window === "undefined") return;
    const greeted = localStorage.getItem(FIRST_VISIT_KEY);
    if (!greeted) {
      localStorage.setItem(FIRST_VISIT_KEY, "1");
      setTimeout(() => {
        setBubble("欢迎首次到访！点我试试~");
        timerRef.current = setTimeout(() => setBubble(null), 4000);
      }, 1500);
    }
  }, []);

  // 自动眨眼
  useEffect(() => {
    if (sleeping) return;
    const id = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, [sleeping]);

  // 眼珠跟随鼠标
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 0.8;
      const norm = Math.min(dist / 200, 1);
      setEyeOffset({
        x: (dx / (dist || 1)) * maxOffset * norm,
        y: (dy / (dist || 1)) * maxOffset * norm,
      });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 重置空闲计时器
  const resetIdleTimer = useCallback(() => {
    setSleeping(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setSleeping(true), 5000);
  }, []);

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  // 生成星星粒子
  const spawnParticles = useCallback(() => {
    const stars = ["✦", "✧", "⋆", "✶", "❋"];
    const colors = ["#00d4ff", "#7c3aed", "#f472b6", "#10b981", "#fbbf24"];
    const newParticles: Particle[] = Array.from({ length: 5 }, () => ({
      id: particleId++,
      x: -20 + Math.random() * 40,
      y: -10 - Math.random() * 30,
      char: stars[Math.floor(Math.random() * stars.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 800);
  }, []);

  const handleClick = useCallback(() => {
    resetIdleTimer();

    // 睡眠点击唤醒
    if (sleeping) {
      setSleeping(false);
      setBubble("嗯？我醒了！打了个盹~");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setBubble(null), 3000);
      return;
    }

    // 连击检测：1秒内3次
    const now = Date.now();
    clickTimestamps.current.push(now);
    clickTimestamps.current = clickTimestamps.current.filter((t) => now - t < 1000);
    if (clickTimestamps.current.length >= 3) {
      clickTimestamps.current = [];
      setRedBounce(true);
      setTimeout(() => setRedBounce(false), 500);
      setBubble("别点啦别点啦！要坏掉了~");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setBubble(null), 3000);
      return;
    }

    // 正常点击
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);
    spawnParticles();

    if (timerRef.current) clearTimeout(timerRef.current);
    const msg = messages[msgIndex.current % messages.length];
    msgIndex.current++;
    setBubble(msg);
    timerRef.current = setTimeout(() => setBubble(null), 3000);
  }, [sleeping, resetIdleTimer, spawnParticles]);

  const pupilLx = 5 + eyeOffset.x;
  const pupilLy = 4 + eyeOffset.y;
  const pupilRx = 8 + eyeOffset.x;
  const pupilRy = 4 + eyeOffset.y;

  const petColor = redBounce ? "#ef4444" : undefined;

  return (
    <div
      className="flex flex-col items-center select-none relative"
      style={{ width: 90 }}
    >
      {/* 粒子效果 */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute pointer-events-none pet-particle"
          style={{
            left: `calc(50% + ${p.x}px)`,
            bottom: 80,
            color: p.color,
            fontSize: 12,
            "--tx": `${p.x * 1.5}px`,
            "--ty": `${p.y}px`,
          } as React.CSSProperties}
        >
          {p.char}
        </span>
      ))}

      {/* 睡眠 Z 动画 */}
      {sleeping && (
        <>
          <span className="absolute pointer-events-none pet-z pet-z-1" style={{ top: -8, right: 6 }}>Z</span>
          <span className="absolute pointer-events-none pet-z pet-z-2" style={{ top: -16, right: 0 }}>z</span>
          <span className="absolute pointer-events-none pet-z pet-z-3" style={{ top: -22, right: -4 }}>z</span>
        </>
      )}

      {/* Speech bubble */}
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

      {/* Pixel pet */}
      <button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setEyeOffset({ x: 0, y: 0 }); }}
        className={`cursor-pointer focus:outline-none ${redBounce ? "pet-red-bounce" : bouncing ? "pet-bounce" : ""}`}
        aria-label="桌面宠物"
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 13 13"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            imageRendering: "pixelated",
            transform: hovered && !sleeping ? "scale(1.12)" : "scale(1)",
            transition: "transform 0.2s ease",
          }}
          className={sleeping ? "" : "pet-float"}
        >
          {/* 身体 */}
          <rect x="4" y="1" width="5" height="1" fill={petColor || "#7c3aed"} />
          <rect x="3" y="2" width="7" height="1" fill={petColor || "#7c3aed"} />
          <rect x="2" y="3" width="9" height="1" fill={petColor || "#8b5cf6"} />
          <rect x="2" y="4" width="9" height="1" fill={petColor || "#8b5cf6"} />
          <rect x="2" y="5" width="9" height="1" fill={petColor || "#7c3aed"} />
          <rect x="2" y="6" width="9" height="1" fill={petColor || "#7c3aed"} />
          <rect x="3" y="7" width="7" height="1" fill={petColor || "#6d28d9"} />
          <rect x="4" y="8" width="5" height="1" fill={petColor || "#6d28d9"} />

          {/* 眼睛 — 睡眠时闭眼 */}
          {sleeping ? (
            <>
              <rect x="4" y="5" width="2" height="1" fill="#1e1b4b" />
              <rect x="7" y="5" width="2" height="1" fill="#1e1b4b" />
            </>
          ) : (
            <>
              {/* 眼白 */}
              <rect x={hovered ? 3.5 : 4} y={hovered ? 3.5 : 4} width={hovered ? 3 : 2} height={hovered ? 3 : 2} fill="white" />
              <rect x={hovered ? 6.5 : 7} y={hovered ? 3.5 : 4} width={hovered ? 3 : 2} height={hovered ? 3 : 2} fill="white" />
              {/* 眼珠 */}
              {blinking ? (
                <>
                  <rect x={hovered ? 3.5 : 4} y={hovered ? 5.5 : 5} width={hovered ? 3 : 2} height="1" fill="#1e1b4b" />
                  <rect x={hovered ? 6.5 : 7} y={hovered ? 5.5 : 5} width={hovered ? 3 : 2} height="1" fill="#1e1b4b" />
                </>
              ) : (
                <>
                  <rect x={pupilLx} y={pupilLy} width="1" height="2" fill="#1e1b4b" />
                  <rect x={pupilRx} y={pupilRy} width="1" height="2" fill="#1e1b4b" />
                  <rect x={pupilLx} y={pupilLy} width="1" height="1" fill="white" opacity="0.8" />
                  <rect x={pupilRx} y={pupilRy} width="1" height="1" fill="white" opacity="0.8" />
                </>
              )}
            </>
          )}

          {/* 腮红 */}
          <rect x="3" y="6" width="1" height="1" fill={redBounce ? "#ef4444" : "#f472b6"} opacity={hovered ? 0.8 : 0.5} />
          <rect x="9" y="6" width="1" height="1" fill={redBounce ? "#ef4444" : "#f472b6"} opacity={hovered ? 0.8 : 0.5} />

          {/* 小嘴 — 睡眠时嘟嘴 */}
          {sleeping ? (
            <rect x="6" y="7" width="1" height="1" fill="#c084fc" />
          ) : hovered ? (
            <>
              <rect x="5" y="7" width="1" height="1" fill="#c084fc" />
              <rect x="6" y="7" width="1" height="1" fill="#c084fc" />
              <rect x="7" y="7" width="1" height="1" fill="#c084fc" />
            </>
          ) : (
            <rect x="6" y="7" width="1" height="1" fill="#c084fc" />
          )}

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
