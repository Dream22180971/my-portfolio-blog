"use client";

import { Mail, Target, Zap, Globe, BookOpen, ExternalLink, Menu, X } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";
import { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "../components/LanguageContext";
import { LanguageToggle } from "../components/LanguageToggle";
import { Sidebar } from "../components/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileNavItems = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/blog", label: "文章" },
  { href: "/about", label: "关于" },
  { href: "/experiments", label: "实验" },
  { href: "/contact", label: "联系" },
];

function MobileNav({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full px-6 py-4">
      <div className="flex items-center justify-between mb-8">
        <div className="font-mono text-neon-cyan text-lg">seanwalter</div>
        <button onClick={onClose} className="p-2 rounded-lg text-text-secondary hover:text-white">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 space-y-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive
                  ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30"
                  : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="pt-4 border-t border-space-border space-y-3">
        <a href="mailto:3310103904@qq.com" className="flex items-center gap-2 text-sm text-text-secondary">
          <Mail size={14} /> 3310103904@qq.com
        </a>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span>微信</span> drmr2022
        </div>
      </div>
    </div>
  );
}

const directions = [
  "AI 应用开发",
  "AI Agent 产品",
];

const stats = [
  { number: "3+", label: "个人项目", color: "cyan" },
  { number: "4", label: "文档源", color: "purple" },
  { number: "2", label: "平台部署", color: "green" },
];

const nowBuilding = [
  { name: "VoyageAI v2", desc: "多 Provider 路由 + 成本优化", color: "cyan", progress: "active" },
  { name: "RAG 知识库 v2", desc: "多文档源 + 领域适配", color: "purple", progress: "active" },
  { name: "AI 工作流实验", desc: "LangGraph 多 Agent 编排", color: "green", progress: "exploring" },
];

const featuredProjects = [
  {
    name: "RAG 知识库问答",
    desc: "企业级智能问答系统，支持 PDF/MD/TXT 多格式文档，LangChain + FAISS + DashScope",
    tags: ["LangChain", "FAISS", "DashScope", "Streamlit"],
    href: "https://github.com/Dream22180971/rag-knowledge-base-demo",
  },
  {
    name: "Coze 电商机器人",
    desc: "低代码电商智能客服，支持多轮对话、FAQ 知识库、自动推荐，Coze 平台",
    tags: ["Coze", "Agent", "知识库", "电商"],
    href: "https://github.com/Dream22180971/coze-ecommerce-bot",
  },
  {
    name: "VoyageAI 旅行规划",
    desc: "AI 驱动的旅行规划系统，支持多城市多天行程智能生成，Vue 3 + FastAPI",
    tags: ["Vue 3", "FastAPI", "AI", "旅行"],
    href: "https://github.com/Dream22180971/VoyageAI",
  },
];

function PageContent() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#0f172a] to-[#1a0a2e] text-text-primary space-grid noise-overlay">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <LanguageToggle />
        <button
          className="md:hidden p-2 rounded-lg bg-bg-secondary border border-border-primary text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-space-bg/95 backdrop-blur-xl pt-16">
          <MobileNav onClose={() => setMobileMenuOpen(false)} />
        </div>
      )}

      <div className="flex">
        <div className="hidden md:block w-64 fixed left-0 top-0 h-screen">
          <Sidebar />
        </div>

        <main className="flex-1 md:ml-64">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
            {/* Hero Section */}
            <section className="mb-20">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  {t("status", "开放求职")}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {t("hero_title", "把 AI 想法")} <span className="text-neon-cyan">→</span> {t("hero_title2", "变成可用的产品")}
                </h1>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed">
                <span className="text-neon-cyan font-medium">专注 AI 应用开发 + AI Agent 落地</span>，把大模型从「听起来很酷」变成「用起来很爽」
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {directions.map((d) => (
                  <span key={d} className="px-3 py-1 rounded-full bg-bg-secondary border border-border-primary text-sm">
                    {d}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 mt-8 sm:mt-10">
                <a href="https://github.com/Dream22180971" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-neon-cyan transition-colors">
                  <GithubIcon className="w-[18px] h-[18px]" /> GitHub
                </a>
                <a href="mailto:3310103904@qq.com" className="flex items-center gap-2 text-text-secondary hover:text-neon-cyan transition-colors">
                  <Mail size={18} /> 3310103904@qq.com
                </a>
                <span className="flex items-center gap-2 text-text-secondary">
                  <span className="text-xs px-2 py-0.5 rounded bg-bg-secondary border border-border-primary">微信</span> drmr2022
                </span>
              </div>
            </section>

            {/* Stats */}
            <section className="mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="p-4 sm:p-6 rounded-xl bg-bg-secondary border border-border-primary text-center">
                    <div className={`text-3xl font-bold text-neon-${s.color} mb-1`}>{s.number}</div>
                    <div className="text-sm text-text-secondary">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Now Building */}
            <section className="mb-16">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap size={18} className="text-neon-cyan" />
                {t("now_building", "正在构建")}
              </h2>
              <div className="space-y-4">
                {nowBuilding.map((item) => (
                  <div key={item.name} className="p-5 rounded-xl bg-bg-secondary border border-border-primary flex items-start justify-between gap-4 hover:border-neon-cyan/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium">{item.name}</span>
                        <span className={`tag tag-${item.color}`}>
                          {item.progress === "active" ? "进行中" : "探索中"}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Projects */}
            <section className="mb-16">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Target size={18} className="text-neon-purple" />
                {t("projects", "精选项目")}
              </h2>
              <div className="grid gap-5">
                {featuredProjects.map((p) => (
                  <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
                    className="group p-6 rounded-xl bg-bg-secondary border border-border-primary hover:border-neon-purple/50 transition-all hover:scale-[1.01]">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold group-hover:text-neon-purple transition-colors">{p.name}</h3>
                      <ExternalLink size={16} className="text-text-secondary group-hover:text-neon-purple" />
                    </div>
                    <p className="text-sm text-text-secondary mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="tag tag-purple">{tag}</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="/projects" className="text-neon-cyan hover:underline text-sm">
                  {t("view_all", "查看全部项目 →")}
                </a>
              </div>
            </section>

            {/* About teaser */}
            <section className="mb-16">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-neon-green" />
                {t("about_me", "关于我")}
              </h2>
              <div className="p-6 rounded-xl bg-bg-secondary border border-border-primary">
                <p className="text-text-secondary">
                  {t("about_desc", "自动化测试工程师，备考雅思，转型 AI 应用开发方向。热衷于用 RAG、Agent、低代码等技术解决实际问题。")}
                </p>
                <a href="/about" className="inline-flex items-center gap-1 mt-4 text-neon-cyan hover:underline text-sm">
                  {t("more", "了解更多 →")}
                </a>
              </div>
            </section>

            {/* Contact */}
            <section className="text-center py-8">
              <p className="text-text-secondary mb-4">{t("contact_hint", "欢迎 AI 产品合作 / 独立开发项目交流")}</p>
              <div className="flex justify-center gap-4">
                <a href="mailto:3310103904@qq.com" className="px-5 py-2 rounded-lg bg-neon-cyan text-bg-primary font-medium hover:opacity-90 transition-opacity">
                  {t("email_me", "写邮件")}
                </a>
                <a href="https://github.com/Dream22180971" target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2 rounded-lg bg-bg-secondary border border-neon-cyan/50 text-neon-cyan font-medium hover:border-neon-cyan transition-colors">
                  GitHub
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
