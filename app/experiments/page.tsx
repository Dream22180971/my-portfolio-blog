import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
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
    href: "https://github.com/Dream22180971/TestPilotAgent",
  },
  {
    name: "运营 AI 内容助手",
    desc: "面向自媒体运营人的 AI 内容生成工具，支持账号定位、多平台内容创作和智能对话。",
    tags: ["React 18", "Vite", "OpenAI SDK"],
    status: "active",
    href: "https://github.com/Dream22180971/operation-assistant",
  },
  {
    name: "Food Menu App",
    desc: "一个偏生活化的小实验，用 Trae AI 辅助快速搭建餐食决策工具，验证单人开发的提效边界。",
    tags: ["HTML", "Trae AI", "原型实验"],
    status: "paused",
    href: "https://github.com/Dream22180971/food-menu-app",
  },
  {
    name: "知识图谱理解方向",
    desc: "继续研究基于图结构的代码理解与知识组织方式，关注比传统 RAG 更紧凑的上下文表达。",
    tags: ["Graph", "代码理解", "Research"],
    status: "research",
    href: "https://github.com/Dream22180971/my-portfolio-blog",
  },
];

const statusMap = {
  active: "进行中",
  paused: "暂缓中",
  research: "研究中",
};

export default function ExperimentsPage() {
  return (
    <div className="editorial-page editorial-page--wide">
      <header className="page-heading-wrap">
        <p className="page-kicker">Experiments / In Progress</p>
        <div>
          <h1 className="page-heading">把想法做成实验，<br />让结果回答问题。</h1>
          <p className="page-copy">
            这里放的是正在试、值得试，或者暂时还没做成但很有价值的方向。大多都和现有仓库、Agent 工作流和真实开发习惯有关。
          </p>
        </div>
      </header>

      <section className="experiment-list" aria-label="实验记录">
        {experiments.map((experiment, index) => (
          <a
            key={experiment.name}
            href={experiment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="experiment-row"
          >
            <span className="project-type">Lab / {String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{experiment.name}</h2>
              <span className={cn("experiment-status", experiment.status === "active" && "is-active")}>
                {statusMap[experiment.status as keyof typeof statusMap]}
              </span>
              <div className="project-row__tags">
                {experiment.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <p>{experiment.desc}</p>
            <span className="text-link">
              查看实验
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </section>

      <p className="page-copy">
        更多实验会继续补充，重点会围绕 AI 工作流、个人生产力工具和更真实的 Agent 使用场景展开。
      </p>
    </div>
  );
}
