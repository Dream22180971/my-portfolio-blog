import { Star, GitFork, Trophy } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

const projects = [
  {
    name: "VoyageAI",
    desc: "AI 智能旅行规划系统，从用户需求到完整行程一步生成",
    tags: ["Vue 3", "FastAPI", "AI Agent"],
    github: "https://github.com/Dream22180971/VoyageAI",
    stars: 0,
    forks: 0,
    emoji: "✈",
    color: "cyan",
    result: "完整前后端应用，多轮对话 + 个性化行程规划",
  },
  {
    name: "RAG 知识库问答",
    desc: "企业级 RAG 演示项目，让大模型「读懂」你的文档",
    tags: ["LangChain", "FAISS", "DashScope", "Streamlit"],
    github: "https://github.com/Dream22180971/rag-knowledge-base-demo",
    stars: 0,
    forks: 0,
    emoji: "📚",
    color: "purple",
    result: "4 参考来源，1033ms 响应，索引缓存秒级加载",
  },
  {
    name: "Coze 电商智能客服",
    desc: "基于 Coze 的智能客服机器人，7×24 小时自动应答",
    tags: ["Coze", "Agent", "Knowledge Base"],
    github: "https://github.com/Dream22180971/coze-ecommerce-bot",
    stars: 0,
    forks: 0,
    emoji: "🤖",
    color: "green",
    result: "已发布 Agent Store，16 条 Q&A + 3 份知识库文档",
  },
  {
    name: "TestPilotAgent",
    desc: "AI 驱动的自动化测试 Agent，探索用 LLM 自动生成测试用例",
    tags: ["Python", "AI Agent", "Testing"],
    github: "https://github.com/Dream22180971/TestPilotAgent",
    stars: 0,
    forks: 0,
    emoji: "🧪",
    color: "amber",
    result: "探索阶段，测试框架搭建中",
  },
  {
    name: "运营助手 Agent",
    desc: "项目进度管理 Web App，对接 GitHub API 自动追踪进度",
    tags: ["Next.js", "SQLite", "Octokit"],
    github: "https://github.com/Dream22180971/operation-assistant",
    stars: 0,
    forks: 0,
    emoji: "⚡",
    color: "cyan",
    result: "v0.1 规划中，需求文档已完成",
  },
];

const categories = ["全部", "AI Agent", "Web 应用", "探索中"];

export default function ProjectsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">项目</h1>
        <p className="text-text-secondary">
          每个项目都是一次学习机会，代码可运行，文档可追溯。
        </p>
      </div>

      {/* 分类筛选 */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
              i === 0
                ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40"
                : "bg-space-card border border-space-border text-text-secondary hover:border-space-border/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 项目网格 */}
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <div
            key={project.name}
            className={`card-glow rounded-xl p-6 animate-slide-up stagger-${Math.min(i + 1, 5)}`}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{project.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-text-primary">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-text-muted hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-1 text-xs font-mono text-text-muted">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" /> {project.forks}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`tag ${
                      project.color === "cyan"
                        ? "tag-cyan"
                        : project.color === "purple"
                        ? "tag-purple"
                        : project.color === "amber"
                        ? "tag-purple"
                        : "tag-green"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 成果 */}
              <div className="pt-3 border-t border-space-border">
                <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan mb-1">
                  <Trophy className="w-3 h-3" /> 成果
                </div>
                <p className="text-sm text-text-secondary">{project.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}