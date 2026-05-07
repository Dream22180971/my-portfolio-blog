import type { Metadata } from "next";
import { ArrowUpRight, FlaskConical, Sparkles } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "实验",
  description: "围绕 AI Agent、测试自动化、原型验证和代码理解方向的实验记录与探索。",
  path: "/experiments",
});

const experiments = [
  {
    name: "TestPilotAgent",
    desc: "把自动化测试经验和 LLM 结合，探索用 Agent 自动生成测试思路、用例草稿和验证流程。",
    tags: ["Python", "AI Agent", "Testing"],
    status: "active",
    emoji: "🧪",
    href: "https://github.com/Dream22180971/TestPilotAgent",
  },
  {
    name: "运营 AI 内容助手",
    desc: "面向自媒体运营人的 AI 内容生成工具，支持账号定位、多平台内容创作和智能对话。",
    tags: ["React 18", "Vite", "OpenAI SDK"],
    status: "active",
    emoji: "⚙️",
    href: "https://github.com/Dream22180971/operation-assistant",
  },
  {
    name: "Food Menu App",
    desc: "一个偏生活化的小实验，用 Trae AI 辅助快速搭建餐食决策工具，验证单人开发的提效边界。",
    tags: ["HTML", "Trae AI", "原型实验"],
    status: "paused",
    emoji: "🍽️",
    href: "https://github.com/Dream22180971/food-menu-app",
  },
  {
    name: "知识图谱理解方向",
    desc: "继续研究基于图结构的代码理解与知识组织方式，关注比传统 RAG 更紧凑的上下文表达。",
    tags: ["Graph", "代码理解", "Research"],
    status: "research",
    emoji: "🕸",
    href: "https://github.com/Dream22180971/my-portfolio-blog",
  },
];

const statusMap = {
  active: { label: "进行中", color: "text-neon-green" },
  paused: { label: "暂缓中", color: "text-[#f59e0b]" },
  research: { label: "研究中", color: "text-neon-purple" },
};

export default function ExperimentsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-fade-in">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/25 bg-neon-cyan/10 px-3 py-1 text-xs text-neon-cyan">
          <Sparkles className="h-3.5 w-3.5" />
          实验场 / 原型验证
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">实验</h1>
        <p className="max-w-3xl leading-7 text-text-secondary">
          这里放的是正在试、值得试、或者暂时还没做成但很有价值的方向。大多都和我现有仓库、Agent 工作流和真实开发习惯有关。
        </p>
      </div>

      <div className="grid gap-4">
        {experiments.map((exp, i) => {
          const status = statusMap[exp.status as keyof typeof statusMap];
          return (
            <a
              key={exp.name}
              href={exp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-glow rounded-xl p-6 animate-slide-up stagger-${i + 1}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{exp.emoji}</span>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-text-primary">
                      {exp.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono ${status.color}`}>
                        ● {status.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-text-muted" />
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-text-secondary">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, index) => (
                      <span key={tag} className={`tag ${index === 0 ? "tag-cyan" : "tag-purple"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="card-glow rounded-xl p-6 text-center">
        <FlaskConical className="w-8 h-8 text-neon-cyan mx-auto mb-3" />
        <p className="text-text-secondary text-sm">
          更多实验会继续补充，重点会围绕 AI 工作流、个人生产力工具和更真实的 Agent 使用场景展开。
        </p>
      </div>
    </div>
  );
}
