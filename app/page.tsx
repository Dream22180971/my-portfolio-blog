import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Bug,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { GithubIcon, GiteeIcon } from "../components/SocialIcons";
import { Typewriter } from "../components/Typewriter";
import { FadeIn } from "../components/FadeIn";
import { MarqueeTicker } from "../components/MarqueeTicker";

const directions = ["AI 应用开发", "AI Agent 产品化", "自动化工作流"];

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
    liveUrl: "https://voyageai.seanwalter.top/",
    githubUrl: "https://github.com/Dream22180971/VoyageAI",
  },
  {
    name: "YouRenTool",
    desc: "桌面密码管理器，AES-256 加密，安全存储与一键填充。",
    color: "green",
    progress: "已上线",
    liveUrl: "https://youren.seanwalter.top/",
    githubUrl: "https://github.com/Dream22180971/YouRenTool",
  },
  {
    name: "运营 AI 内容助手",
    desc: "自媒体运营人的 AI 内容生成工具，支持多平台创作。",
    color: "purple",
    progress: "已上线",
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
    name: "运营 AI 内容助手",
    desc: "面向自媒体运营人的 AI 内容生成工具，支持账号定位、多平台内容创作和智能对话。",
    tags: ["React 18", "Vite", "OpenAI SDK"],
    href: "https://github.com/Dream22180971/operation-assistant",
  },
];

const capabilityCards = [
  {
    title: "从想法到 MVP",
    desc: "从一句「我想做一个 XX」到能跑的原型，中间的路径我来画。",
  },
  {
    title: "从 Demo 到可用",
    desc: "不只让功能跑起来，更让它在真实场景里站得住。",
  },
  {
    title: "从技术到表达",
    desc: "把复杂技术写成普通人看得懂的内容，让产品自己会说话。",
  },
];

const testingStrengths = [
  {
    title: "测试设计与质量闭环",
    icon: ShieldCheck,
    desc: "能独立完成测试方案、测试点提炼、用例设计与结果复盘，把质量风险前移到需求和设计阶段。",
    metric: "1000+ 高覆盖率用例设计经验",
  },
  {
    title: "接口 / 兼容 / 端到端验证",
    icon: SearchCheck,
    desc: "熟悉接口测试、数据校验、跨端联动、兼容性与稳定性验证，能从用户链路视角推进问题闭环。",
    metric: "350+ 缺陷跟踪与回归验证",
  },
  {
    title: "自动化与 AI 提效",
    icon: Bug,
    desc: "参与自动化脚本建设、CI/CD 环境协同，也会把 AI 用在测试设计、失败分析和缺陷定位提效上。",
    metric: "定位效率提升约 60%，自动化覆盖率达到 100%",
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
            <Typewriter text="用 AI 把想法变成产品" speed={80} />
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
            专注 AI 应用开发与 Agent 智能体设计，把大模型从
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
              href="https://gitee.com/dreamer22180971"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
            >
              <GiteeIcon className="h-[18px] w-[18px]" />
              Gitee
            </a>
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

      <FadeIn>
        <MarqueeTicker />
      </FadeIn>

      <FadeIn>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Zap className="h-5 w-5 text-neon-cyan" />
            正在构建
          </h2>
          <div className="space-y-3">
            {nowBuilding.map((item) => (
              <div
                key={item.name}
                className="card-glow rounded-2xl px-5 py-5"
              >
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="text-base font-semibold text-text-primary">{item.name}</span>
                  <span className={`tag tag-${item.color}`}>{item.progress}</span>
                </div>
                <p className="text-sm leading-6 text-text-secondary">{item.desc}</p>
                {(item.liveUrl || item.githubUrl) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-medium text-neon-cyan transition hover:bg-neon-cyan/20"
                      >
                        在线体验
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-text-secondary/20 bg-white/5 px-3 py-1 text-xs font-medium text-text-secondary transition hover:bg-white/10"
                      >
                        GitHub
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                )}
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
              <p className="text-sm leading-6 text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      <FadeIn>
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
      </FadeIn>

      <FadeIn>
      <section className="space-y-5">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <ShieldCheck className="h-5 w-5 text-neon-purple" />
          测试工程能力
        </div>
        <p className="max-w-3xl text-sm leading-7 text-text-secondary">
          除了 AI 应用开发，我也有完整的测试工程背景，覆盖测试设计、接口验证、自动化执行、日志分析与质量复盘。
          这些能力会直接反哺我现在做产品时对稳定性、边界条件和交付质量的要求。
        </p>

        <div className="grid gap-4 lg:grid-cols-3">
          {testingStrengths.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="card-glow rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl border border-neon-purple/20 bg-neon-purple/10 p-3">
                    <Icon className="h-5 w-5 text-neon-purple" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">{item.title}</h3>
                </div>
                <p className="text-sm leading-7 text-text-secondary">{item.desc}</p>
                <div className="mt-4 rounded-xl border border-space-border bg-white/5 px-4 py-3 text-sm text-neon-cyan">
                  {item.metric}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      </FadeIn>
    </div>
  );
}
