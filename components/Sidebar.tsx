"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GithubIcon, MailIcon, WechatIcon } from "./SocialIcons";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "首页", icon: "⌘" },
  { href: "/blog", label: "文章", icon: "◇" },
  { href: "/projects", label: "项目", icon: "◈" },
  { href: "/about", label: "关于", icon: "○" },
  { href: "/experiments", label: "实验", icon: "△" },
];

export function Sidebar() {
  const pathname = usePathname();
  const wechatId = "drmr2022";
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  async function copyWechatId() {
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopied(true);
    } catch {
      // clipboard API not available (non-HTTPS context)
      return;
    }

    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-64 flex-col border-r border-space-border bg-space-bg/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="p-6 border-b border-space-border">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white font-bold font-mono">
            肖
          </div>
          <div>
            <div className="font-mono text-sm text-neon-cyan group-hover:text-white transition-colors">
              seanwalter
            </div>
            <div className="text-xs text-text-secondary">个人博客站</div>
          </div>
        </Link>
      </div>

      {/* 导航 */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-item", isActive && "active")}
            >
              <span className="text-sm opacity-60">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 社交链接 */}
      <div className="p-4 border-t border-space-border">
        <div className="flex gap-2">
          <a
            href="https://github.com/Dream22180971"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center py-2 rounded-lg border border-space-border text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:3310103904@qq.com"
            className="flex-1 flex items-center justify-center py-2 rounded-lg border border-space-border text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
            title="邮箱"
          >
            <MailIcon className="w-4 h-4" />
          </a>
          <div className="relative flex-1">
            <button
              type="button"
              onClick={copyWechatId}
              className="w-full flex items-center justify-center py-2 rounded-lg border border-space-border text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
              aria-label={`点击复制微信号 ${wechatId}`}
              title={`微信: ${wechatId}`}
            >
              <WechatIcon className="w-4 h-4" />
            </button>
            <div
              className={cn(
                "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg border border-space-border bg-space-bg/95 px-2 py-1 text-[11px] font-mono text-text-secondary shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all",
                copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              )}
              aria-hidden={!copied}
            >
              已复制
            </div>
          </div>
        </div>
        <div className="mt-3 text-center text-xs text-text-muted">
          © 2026 · 南京
        </div>
      </div>

      {/* 主题切换 */}
      <div className="px-4 pb-2">
        <ThemeToggle />
      </div>

      {/* 状态指示 */}
      <div className="px-6 py-3 border-t border-space-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-mono text-text-secondary">持续构建中 / 持续迭代中</span>
        </div>
      </div>
    </aside>
  );
}