import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "seanwalter | AI Agent 开发者",
  description: "AI Agent 开发者，专注 RAG 知识库与智能体搭建。南京，备考 IELTS 6.5+。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="space-grid noise-overlay">
        {/* 移动端顶部导航 */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-space-bg/90 backdrop-blur-xl border-b border-space-border">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-mono text-sm text-neon-cyan">seanwalter</span>
            <MobileNav />
          </div>
        </header>

        {/* 桌面端侧边栏 */}
        <Sidebar />

        {/* 主内容区 */}
        <main className="md:ml-64 min-h-screen pt-16 md:pt-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

function MobileNav() {
  const navItems = [
    { href: "/", label: "首页", icon: "⬡" },
    { href: "/projects", label: "项目", icon: "◈" },
    { href: "/blog", label: "文章", icon: "◇" },
    { href: "/about", label: "关于", icon: "○" },
  ];

  return (
    <div className="flex gap-1">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="px-3 py-1 text-xs font-mono text-text-secondary hover:text-neon-cyan transition-colors"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
