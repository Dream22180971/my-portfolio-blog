import Link from "next/link";
import { ArrowUpRight, BookOpen, Mail, Sparkles, Target, Zap } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";

const directions = ["AI 应用开发", "AI Agent 产品化", "RAG 系统落地"];

const stats = [
  { number: "5+", label: "公开项目", color: "cyan" },
  { number: "4", label: "AI 技术方向", color: "purple" },
  { number: "2", label: "部署链路", color: "green" },
];

const nowBuilding = [
  {
    name: "VoyageAI v2",
    desc: "多模型路由、成本控制、行程体验优化。",
    color: "cyan",
    progress: "进行中",
  },
  {
    name: "运营助手 Agent",
    desc: "围绕 GitHub API 做进度追踪和任务辅助。",
    color: "purple",
    progress: "设计中",
  },
  {
    name: "TestPilotAgent",
    desc: "把测试场景、用例生成和验证流串成一个 Agent 工作流。",
    color: "green",
    progress: "实验中",
  },
];

const featuredProjects = [
  {
    name: "RAG 知识库问答",
    desc: "企业级 RAG 演示项目，支持多文档解析、检索增强与答案溯源。",
    tags: ["LangChain", "FAISS", "DashScope", "Streamlit"],
    href: "https://github.com/Dream22180971/rag-knowledge-base-demo",
  },
  {
    name: "VoyageAI",
    desc: "面向真实用户场景的 AI 旅行规划系统，覆盖前后端完整链路。",
    tags: ["Vue 3", "FastAPI", "AI", "Planner"],
    href: "https://github.com/Dream22180971/VoyageAI",
  },
  {
    name: "运营助手 Agent",
    desc: "围绕项目进度、任务拆解和 GitHub 数据汇总的智能运营工具。",
    tags: ["Next.js", "SQLite", "Octokit", "Agent"],
    href: "https://github.com/Dream22180971/operation-assistant",
  },
];

const capabilityCards = [
  {
    title: "从想法到 MVP",
    desc: "能把模糊需求拆成页面、接口、数据流和可验证结果。",
  },
  {
    title: "从 Demo 到可用",
    desc: "更关注稳定性、可维护性和真实使用体验，而不只是做一个演示。",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <section className="relative overflow-hidden rounded-[28px] border border-space-border/80 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.18),transparent_28%),linear-gradient(145deg,rgba(15,23,42,0.94),rgba(10,14,23,0.98))] px-6 py-10 shadow-[0_0_80px_rgba(0,212,255,0.08)] sm:px-8 md:px-12 md:py-14">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(0,212,255,0.03),transparent)]" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-cyan/25 bg-neon-cyan/10 px-4 py-1.5 text-sm text-neon-cyan shadow-[0_0_30px_rgba(0,212,255,0.08)]">
            <Sparkles className="h-4 w-4" />
            持续构建 AI 产品与工作流
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            把 AI 想法
            <span className="mt-1 block bg-gradient-to-r from-neon-cyan via-[#7dd3fc] to-neon-purple bg-clip-text text-transparent">
              变成可用的产品
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
            专注 AI 应用开发、RAG 落地与 Agent 工作流设计，把大模型从
            「听起来很酷」变成「真的能用、愿意复用、可持续迭代」。
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {directions.map((direction, index) => (
              <span
                key={direction}
                className={`rounded-full border px-4 py-2 text-sm shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] ${
                  index === 1
                    ? "border-neon-purple/30 bg-neon-purple/10 text-[#c4b5fd]"
                    : "border-space-border bg-white/5 text-text-primary"
                }`}
              >
                {direction}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-text-secondary">
            <a
              href="https://github.com/Dream22180971"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
              GitHub
            </a>
            <a
              href="mailto:3310103904@qq.com"
              className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
            >
              <Mail className="h-[18px] w-[18px]" />
              3310103904@qq.com
            </a>
            <span className="flex items-center gap-2">
              <span className="rounded border border-space-border bg-white/5 px-2 py-0.5 text-xs text-text-muted">
                微信
              </span>
              drmr2022
            </span>
          </div>

          <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-space-border bg-white/5 px-5 py-6 shadow-[0_0_30px_rgba(0,0,0,0.15)]"
              >
                <div
                  className={`mb-2 text-4xl font-bold ${
                    stat.color === "cyan"
                      ? "text-neon-cyan"
                      : stat.color === "purple"
                      ? "text-neon-purple"
                      : "text-neon-green"
                  }`}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Zap className="h-5 w-5 text-neon-cyan" />
            正在构建
          </h2>
          <div className="space-y-4">
            {nowBuilding.map((item) => (
              <div
                key={item.name}
                className="card-glow rounded-2xl px-5 py-5"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="text-base font-semibold text-text-primary">{item.name}</span>
                  <span className={`tag tag-${item.color}`}>{item.progress}</span>
                </div>
                <p className="text-sm leading-7 text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Target className="h-5 w-5 text-neon-purple" />
            我能提供什么
          </h2>
          {capabilityCards.map((item, index) => (
            <div
              key={item.title}
              className={`card-glow rounded-2xl px-5 py-5 ${
                index === 0 ? "border-neon-cyan/20" : "border-neon-purple/20"
              }`}
            >
              <div className="mb-2 text-base font-semibold text-text-primary">{item.title}</div>
              <p className="text-sm leading-7 text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <BookOpen className="h-5 w-5 text-neon-green" />
            精选项目
          </h2>
          <Link href="/projects" className="text-sm text-neon-cyan hover:underline">
            查看全部项目
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-glow group rounded-2xl p-6"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-neon-cyan transition-colors">
                  {project.name}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-neon-cyan transition-colors" />
              </div>
              <p className="min-h-[72px] text-sm leading-7 text-text-secondary">{project.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span key={tag} className={`tag ${index % 2 === 0 ? "tag-cyan" : "tag-purple"}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
