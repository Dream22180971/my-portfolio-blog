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
    desc: "把旅行偏好和预算，变成一份可以直接照着走的行程和清单。",
    status: "已上线",
    tags: ["Vue 3", "FastAPI", "AI 应用"],
    github: "https://github.com/Dream22180971/VoyageAI",
    result: "已支持完整前后端链路、云端部署和移动端适配，用户可直接在线生成行程。",
  },
  {
    name: "RAG 知识库问答",
    desc: "让团队把分散的私有文档，变成可追溯、可直接提问的知识入口。",
    status: "已完成演示",
    tags: ["LangChain", "FAISS", "DashScope", "Streamlit"],
    github: "https://github.com/Dream22180971/rag-knowledge-base-demo",
    result: "已完成多来源问答、检索增强和答案溯源，索引缓存支持秒级加载。",
  },
  {
    name: "Coze 电商智能客服",
    desc: "让电商常见问题在用户需要时得到稳定、可复用的即时回答。",
    status: "已发布",
    tags: ["Coze", "Agent", "知识库"],
    github: "https://github.com/Dream22180971/coze-ecommerce-bot",
    result: "已发布至 Agent Store，沉淀 16 条 Q&A 与 3 份知识库文档。",
  },
  {
    name: "TestPilotAgent",
    desc: "把测试设计、场景拆解和验证流程，变成可持续迭代的 AI 协作路径。",
    status: "实验中",
    tags: ["Python", "AI Agent", "测试工程"],
    github: "https://github.com/Dream22180971/TestPilotAgent",
    result: "围绕测试工程经验延展出的 Agent 方向，持续验证生成式测试工作流。",
  },
  {
    name: "运营 AI 内容助手",
    desc: "从账号定位到多平台文案，一次对话完成内容生产闭环。",
    status: "已开源",
    tags: ["React 18", "Vite", "OpenAI SDK"],
    github: "https://github.com/Dream22180971/operation-assistant",
    result: "已支持小红书、抖音、公众号多平台内容生成，并接入多种国产模型。",
  },
  {
    name: "Food Menu App",
    desc: "用一个轻量交互原型，验证 AI 辅助开发在日常决策场景中的交付边界。",
    status: "实验中",
    tags: ["HTML", "Trae AI", "原型实验"],
    github: "https://github.com/Dream22180971/food-menu-app",
    result: "快速完成可交互界面雏形，用于验证单人快速交付模式。",
  },
  {
    name: "00后动画记忆馆",
    desc: "把放学后的动画记忆，整理成一间可以慢慢逛的数字展厅。",
    status: "已上线",
    tags: ["Next.js 16", "React 19", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Dream22180971/animation-memory-museum",
    result: "已完成海报轮播、年代时间线、名台词回放、动画歌曲等完整模块，收录 6 部经典国产动画。",
  },
  {
    name: "Project Showcase",
    desc: "用一个干净的多语言展示站，把所有项目串成一个可对外分享的入口。",
    status: "已上线",
    tags: ["Next.js 16", "React 19", "Framer Motion", "i18n"],
    github: "https://github.com/Dream22180971/project-showcase",
    result: "支持中英双语、项目详情页、GitHub API 实时数据，已部署至 projects.seanwalter.top。",
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
          <div className="project-principle">
            <h2>我在项目里关注什么</h2>
            <p>
              我倾向于把「能跑」继续推进到「能解释、能维护、能继续迭代」，让每一次构建都能回答真实问题。
            </p>
          </div>
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
              <span className="project-status">{project.status}</span>
            </div>
            <div>
              <p>{project.desc}</p>
              <p className="project-row__result">结果 / {project.result}</p>
              <div className="project-row__tags project-row__tags--stack" aria-label={`${project.name} 技术栈`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
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
          <h2>下一步补充方向</h2>
          <p>
            后续还会继续补充测试工程沉淀、自动化实践、AI 辅助开发实验和更多可公开的完整项目，让项目页既能展示成果，也能反映真实成长路径。
          </p>
        </div>
      </section>
    </div>
  );
}
