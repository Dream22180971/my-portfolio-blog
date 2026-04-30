"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, MailIcon, WechatIcon } from "./SocialIcons";
import { LanguageToggle } from "./LanguageToggle";

const navItems = [
  { href: "/", label: "首页", icon: "⌘" },
  { href: "/projects", label: "项目", icon: "◈" },
  { href: "/blog", label: "文章", icon: "◇" },
  { href: "/about", label: "关于", icon: "○" },
  { href: "/experiments", label: "实验", icon: "△" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-space-bg/80 backdrop-blur-xl border-r border-space-border z-40">
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
            <div className="text-xs text-text-secondary">AI Agent 开发者</div>
          </div>
        </Link>
      </div>

      {/* 语言切换 */}
      <div className="px-4 py-3 border-b border-space-border">
        <LanguageToggle />
      </div>

      {/* 导航 */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
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
          <span
            className="flex-1 flex items-center justify-center py-2 rounded-lg border border-space-border text-text-secondary cursor-default"
            title="微信: drmr2022"
          >
            <WechatIcon className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3 text-center text-xs text-text-muted">
          © 2026 · 南京
        </div>
      </div>

      {/* 状态指示 */}
      <div className="px-6 py-3 border-t border-space-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-mono text-text-secondary">求职中 / 接项目中</span>
        </div>
      </div>
    </aside>
  );
}