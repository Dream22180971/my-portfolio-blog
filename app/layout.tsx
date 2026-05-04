import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import Link from "next/link";
import { MobileTopNav } from "@/components/MobileTopNav";
import { Analytics } from "@vercel/analytics/next";

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
      <body className="space-grid noise-overlay tech-orbs">
        {/* 移动端顶部导航 */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-space-border bg-space-bg/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-mono text-sm text-neon-cyan">
              seanwalter
            </Link>
            <MobileTopNav />
          </div>
        </header>

        {/* 桌面端侧边栏 */}
        <Sidebar />

        {/* 主内容区 */}
        <main className="min-h-screen pt-16 md:ml-64 md:pt-0">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:px-8 md:py-12">
            {children}
          </div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}