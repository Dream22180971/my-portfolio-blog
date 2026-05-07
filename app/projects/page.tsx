import type { Metadata } from "next";
import { ArrowUpRight, FolderKanban, Sparkles, Trophy, Wrench } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "项目",
  description: "AI Agent、RAG 知识库、自动化测试相关的开源项目和实验。",
  path: "/projects",
});

const projects = [
  {
    name: "VoyageAI",
    desc: "AI 智能旅行规划系统，从需求输入、路线生成到结果导出形成完整闭环。",
    tags: ["Vue 3", "FastAPI", "AI 应用"],
    github: "https://github.com/Dream22180971/VoyageAI",
    emoji: "✈",
    color: "cyan",
    result: "前后端完整联调，支持云端部署、移动端适配和结构化行程输出。",
  },
  {
    name: "RAG 知识库问答",
    desc: "企业级 RAG 演示项目，让大模型真正理解并检索你的私有文档。",
    tags: ["LangChain", "FAISS", "DashScope", "Streamlit"],
    github: "https://github.com/Dream22180971/rag-knowledge-base-demo",
    emoji: "📚",
    color: "purple",
    result: "完成多来源问答、检索增强和答案溯源，索引缓存达到秒级加载。",
  },
  {
    name: "Coze 电商智能客服",
    desc: "基于 Coze 的智能客服机器人，7×24 小时自动应答",
    tags: ["Coze", "Agent", "知识库"],
    github: "https://github.com/Dream22180971/coze-ecommerce-bot",
    emoji: "🤖",
    color: "green",
    result: "已发布 Agent Store，16 条 Q&A + 3 份知识库文档",
  },
  {
    name: "TestPilotAgent",
    desc: "AI 驱动的自动化测试 Agent，探索用 LLM 辅助测试设计、场景拆解和验证流程。",
    tags: ["Python", "AI Agent", "测试工程"],
    github: "https://github.com/Dream22180971/TestPilotAgent",
    emoji: "🧪",
    color: "amber",
    result: "围绕测试工程经验延展出的 Agent 方向，持续验证生成式测试工作流。",
  },
  {
    name: "运营 AI 内容助手",
    desc: "面向自媒体运营人的 AI 内容生成工具，支持账号定位、多平台内容创作和智能对话。",
    tags: ["React 18", "Vite", "OpenAI SDK"],
    github: "https://github.com/Dream22180971/operation-assistant",
    emoji: "⚡",
    color: "cyan",
    result: "支持小红书/抖音/公众号多平台内容生成，集成通义千问/DeepSeek/Kimi 等国产模型。",
  },
  {
    name: "Food Menu App",
    desc: "面向日常决策的小型原型实验，验证 AI 辅助快速开发的效率边界。",
    tags: ["HTML", "Trae AI", "原型实验"],
    github: "https://github.com/Dream22180971/food-menu-app",
    emoji: "🍽️",
    color: "purple",
    result: "快速完成可交互界面雏形，用于验证单人快速交付模式。",
  },
];

const highlights = [
  { value: "6", label: "当前展示项目" },
  { value: "3", label: "AI / Agent 方向" },
  { value: "1", label: "测试 / 工具类项目" },
];

const filters = ["AI 应用", "Agent 工作流", "测试工程", "工具产品"];

export default function ProjectsPage() {
  return (
    <div className="space-y-10 animate-fade-in">
      <section className="relative overflow-hidden rounded-[28px] border border-space-border/80 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_26%),linear-gradient(145deg,rgba(15,23,42,0.94),rgba(10,14,23,0.98))] px-6 py-8 shadow-[0_0_80px_rgba(124,58,237,0.08)] sm:px-8 md:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(124,58,237,0.04),transparent)]" />
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-purple/25 bg-neon-purple/10 px-3 py-1 text-xs text-[#c4b5fd]">
            <Sparkles className="h-3.5 w-3.5" />
            项目档案 / 可运行 / 可追溯 / 可扩展
          </div>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl font-bold text-text-primary md:text-4xl">项目</h1>
            <p className="leading-7 text-text-secondary">
              这里收录了我近阶段公开沉淀的 AI 应用、Agent 工作流、测试工程实验和工具类项目。
              我更关心它们是否真的可用、是否能解释清楚，以及是否值得继续迭代。
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((item, index) => (
              <span
                key={item}
                className={`tag ${index % 2 === 0 ? "tag-cyan" : "tag-purple"}`}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-space-border bg-white/5 px-5 py-5">
                <div className="text-3xl font-bold text-neon-cyan">{item.value}</div>
                <div className="mt-1 text-sm text-text-secondary">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
          <FolderKanban className="h-5 w-5 text-neon-cyan" />
          仓库项目
        </h2>
        <p className="text-sm leading-7 text-text-secondary">
          从 AI 产品原型到测试工程实验，这些仓库一起构成了我当前的能力地图。
        </p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <a
              key={project.name}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-glow group rounded-2xl p-6 animate-slide-up stagger-${Math.min(i + 1, 5)}`}
            >
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-space-border bg-white/5 text-3xl">
                    {project.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary group-hover:text-neon-cyan transition-colors whitespace-normal break-words">
                          {project.name}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className={`tag ${
                                project.color === "cyan"
                                  ? "tag-cyan"
                                  : project.color === "purple"
                                  ? "tag-purple"
                                  : project.color === "green"
                                  ? "tag-green"
                                  : "tag-purple"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-text-muted">
                        <GithubIcon className="h-4 w-4" />
                        <ArrowUpRight className="h-4 w-4 group-hover:text-neon-cyan transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="min-h-[84px] text-sm leading-7 text-text-secondary">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(2).map((tag, index) => (
                    <span
                      key={tag}
                      className={`tag ${index % 2 === 0 ? "tag-cyan" : "tag-purple"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-space-border pt-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-mono text-neon-cyan">
                    <Trophy className="h-3.5 w-3.5" />
                    项目亮点
                  </div>
                  <p className="text-sm leading-7 text-text-secondary">{project.result}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card-glow rounded-2xl p-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-text-primary">
            <Wrench className="h-5 w-5 text-neon-purple" />
            我在项目里关注什么
          </h3>
          <p className="text-sm leading-7 text-text-secondary">
            不管是 AI 应用、Agent 工具还是测试工程类仓库，我都倾向于把“能跑”继续推进到“能解释、能维护、能继续迭代”。
            所以仓库里通常会同时保留实现、文档、部署思路和问题复盘。
          </p>
        </div>
        <div className="card-glow rounded-2xl p-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-text-primary">
            <Sparkles className="h-5 w-5 text-neon-cyan" />
            下一步补充方向
          </h3>
          <p className="text-sm leading-7 text-text-secondary">
            后续还会继续补充测试工程沉淀、自动化实践、AI 辅助开发实验和更多可公开的完整项目，让项目页既能展示成果，也能反映真实成长路径。
          </p>
        </div>
      </section>
    </div>
  );
}
