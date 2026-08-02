import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
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
    result: "前后端完整联调，支持云端部署、移动端适配和结构化行程输出。",
  },
  {
    name: "RAG 知识库问答",
    desc: "企业级 RAG 演示项目，让大模型真正理解并检索你的私有文档。",
    tags: ["LangChain", "FAISS", "DashScope", "Streamlit"],
    github: "https://github.com/Dream22180971/rag-knowledge-base-demo",
    result: "完成多来源问答、检索增强和答案溯源，索引缓存达到秒级加载。",
  },
  {
    name: "Coze 电商智能客服",
    desc: "基于 Coze 的智能客服机器人，7×24 小时自动应答",
    tags: ["Coze", "Agent", "知识库"],
    github: "https://github.com/Dream22180971/coze-ecommerce-bot",
    result: "已发布 Agent Store，16 条 Q&A + 3 份知识库文档",
  },
  {
    name: "TestPilotAgent",
    desc: "AI 驱动的自动化测试 Agent，探索用 LLM 辅助测试设计、场景拆解和验证流程。",
    tags: ["Python", "AI Agent", "测试工程"],
    github: "https://github.com/Dream22180971/TestPilotAgent",
    result: "围绕测试工程经验延展出的 Agent 方向，持续验证生成式测试工作流。",
  },
  {
    name: "运营 AI 内容助手",
    desc: "面向自媒体运营人的 AI 内容生成工具，支持账号定位、多平台内容创作和智能对话。",
    tags: ["React 18", "Vite", "OpenAI SDK"],
    github: "https://github.com/Dream22180971/operation-assistant",
    result: "支持小红书/抖音/公众号多平台内容生成，集成通义千问/DeepSeek/Kimi 等国产模型。",
  },
  {
    name: "Food Menu App",
    desc: "面向日常决策的小型原型实验，验证 AI 辅助快速开发的效率边界。",
    tags: ["HTML", "Trae AI", "原型实验"],
    github: "https://github.com/Dream22180971/food-menu-app",
    result: "快速完成可交互界面雏形，用于验证单人快速交付模式。",
  },
];

const filters = ["AI 应用", "Agent 工作流", "测试工程", "工具产品"];

export default function ProjectsPage() {
  return (
    <div className="editorial-page editorial-page--wide editorial-page--projects">
      <header className="page-heading-wrap">
        <p className="page-kicker">Projects / Archive</p>
        <div>
          <h1 className="page-heading">把想法校准成能用的产品。</h1>
          <p className="page-copy">
            这里收录近阶段公开沉淀的 AI 应用、Agent 工作流、测试工程实验和工具类项目。
            我更关心它们是否真的可用、是否能解释清楚，以及是否值得继续迭代。
          </p>
          <p className="project-row__result">
            当前展示 6 个项目，其中 3 个聚焦 AI / Agent，1 个是测试 / 工具类项目。
          </p>
          <div className="project-row__tags" aria-label="项目方向">
            {filters.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </header>

      <section className="project-list" aria-label="仓库项目">
        {projects.map((project, index) => (
          <a
            key={project.name}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-row"
          >
            <span className="project-type">Project / {String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{project.name}</h2>
              <div className="project-row__tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <p>{project.desc}</p>
              <p className="project-row__result">结果 / {project.result}</p>
            </div>
            <span className="text-link">
              代码
              <GithubIcon className="h-4 w-4" />
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </section>

      <section className="project-note-grid">
        <div>
          <h2>我在项目里关注什么</h2>
          <p>
            不管是 AI 应用、Agent 工具还是测试工程类仓库，我都倾向于把「能跑」继续推进到「能解释、能维护、能继续迭代」。
            所以仓库里通常会同时保留实现、文档、部署思路和问题复盘。
          </p>
        </div>
        <div>
          <h2>下一步补充方向</h2>
          <p>
            后续还会继续补充测试工程沉淀、自动化实践、AI 辅助开发实验和更多可公开的完整项目，让项目页既能展示成果，也能反映真实成长路径。
          </p>
        </div>
      </section>
    </div>
  );
}
