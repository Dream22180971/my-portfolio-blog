import Link from "next/link";
import { ArrowRight, MapPin, Zap, Target, Sparkles } from "lucide-react";
import { GithubIcon, MailIcon, WechatIcon } from "@/components/SocialIcons";

const highlights = [
  { number: "3", label: "上线项目", color: "cyan" },
  { number: "1033ms", label: "RAG 响应", color: "purple" },
  { number: "1", label: "Vercel 部署", color: "green" },
];

const directions = [
  "RAG 知识库",
  "AI Agent 产品",
];

const nowBuilding = [
  { name: "VoyageAI v2", desc: "多 Provider 路由 + 成本优化", color: "cyan" },
  { name: "RAG 知识库 v2", desc: "多文档源 + 领域适配", color: "purple" },
  { name: "AI 工作流实验", desc: "LangGraph 多 Agent 编排", color: "green" },
];

const featuredProjects = [
  {
    name: "VoyageAI",
    value: "让 AI 规划你的旅行，从需求到行程一步到位",
    tags: ["Vue 3", "FastAPI", "AI Agent"],
    result: "完整前后端 AI 应用，支持个性化行程规划与多轮对话",
    href: "https://github.com/Dream22180971/VoyageAI",
    emoji: "✈",
    color: "cyan",
  },
  {
    name: "RAG 知识库问答",
    value: "让大模型「读懂」你的文档，精准回答业务问题",
    tags: ["LangChain", "FAISS", "DashScope"],
    result: "4 参考来源，1033ms 响应，索引缓存秒级加载",
    href: "https://github.com/Dream22180971/rag-knowledge-base-demo",
    emoji: "📚",
    color: "purple",
  },
  {
    name: "Coze 电商智能客服",
    value: "7×24 小时自动处理退换货、物流、产品咨询",
    tags: ["Coze", "Agent", "Knowledge Base"],
    result: "已发布 Agent Store，16 条 Q&A + 3 份知识库文档",
    href: "https://github.com/Dream22180971/coze-ecommerce-bot",
    emoji: "🤖",
    color: "green",
  },
];

const techStack = [
  "Python",
  "LangChain",
  "LangGraph",
  "RAG / FAISS",
  "FastAPI",
  "Vue 3",
  "Next.js",
  "TypeScript",
  "Coze",
  "TailwindCSS",
  "Docker",
  "Git",
];

export default function HomePage() {
  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
          <MapPin className="w-3 h-3" />
          <span>南京</span>
          <span className="opacity-30">•</span>
          <span>AI 独立开发者</span>
          <span className="opacity-30">•</span>
          <span>备考 IELTS 6.5+</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="text-text-primary">把 AI 想法</span>
          <br />
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            变成可用的产品
          </span>
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
          <span className="text-neon-cyan font-medium">专注 RAG + AI Agent 落地</span>，把大模型从「听起来很酷」变成「用起来很爽」。
        </p>

        {/* 方向标签 */}
        <div className="flex flex-wrap gap-2">
          {directions.map((dir) => (
            <span key={dir} className="tag tag-cyan/60">
              {dir}
            </span>
          ))}
        </div>

        {/* 能力标签 */}
        <div className="flex flex-wrap gap-2">
          <span className="tag tag-cyan flex items-center gap-1">
            <Target className="w-3 h-3" /> RAG 知识库
          </span>
          <span className="tag tag-purple flex items-center gap-1">
            <Zap className="w-3 h-3" /> AI 工具
          </span>
          <span className="tag tag-green flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Coze 低代码
          </span>
          <span className="tag tag-cyan flex items-center gap-1">
            <span>🔧</span> 测试工程
          </span>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <Link href="/projects" className="btn-primary">
            <span>查看产品</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/Dream22180971"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a href="mailto:3310103904@qq.com" className="btn-secondary">
            <MailIcon className="w-4 h-4" />
            <span>邮箱</span>
          </a>
          <span className="btn-secondary cursor-default" title="微信号: drmr2022">
            <WechatIcon className="w-4 h-4" />
            <span>drmr2022</span>
          </span>
        </div>
      </section>

      {/* 数字概览 */}
      <section className="grid grid-cols-3 gap-4">
        {highlights.map((stat, i) => (
          <div
            key={stat.label}
            className={`card-glow rounded-xl p-6 text-center animate-slide-up stagger-${i + 1}`}
          >
            <div
              className={`stat-number ${
                stat.color === "purple"
                  ? "bg-gradient-to-r from-neon-purple to-neon-cyan"
                  : stat.color === "green"
                  ? "bg-gradient-to-r from-neon-green to-neon-cyan"
                  : ""
              }`}
            >
              {stat.number}
            </div>
            <div className="text-sm font-mono text-text-secondary mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* 正在构建 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <h2 className="text-xl font-semibold text-text-primary">正在构建</h2>
        </div>
        <div className="grid gap-3">
          {nowBuilding.map((item) => (
            <div key={item.name} className="card-elevated rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-text-primary">{item.name}</div>
                <div className="text-sm text-text-secondary">{item.desc}</div>
              </div>
              <span className={`tag tag-${item.color}`}>
                {item.progress === 'active' ? '进行中' : '探索中'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 产品 / 工具 / 实验 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">产品 / 工具 / 实验</h2>
          <Link href="/projects" className="text-sm font-mono text-neon-cyan hover:underline">
            查看全部 →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {featuredProjects.map((project, i) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-glow rounded-xl p-6 animate-slide-up stagger-${i + 1} group flex flex-col`}
            >
              <span className="text-3xl mb-3">{project.emoji}</span>
              <h3 className="font-semibold text-text-primary group-hover:text-neon-cyan transition-colors mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-text-secondary mb-3">{project.value}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className={`tag tag-${project.color}`}>
                    {tag}
                  </span>
                ))}
              </div>
              {/* 成果 */}
              <div className="mt-auto pt-3 border-t border-space-border">
                <div className="text-xs font-mono text-neon-cyan mb-1">成果</div>
                <p className="text-sm text-text-secondary">{project.result}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 技术栈 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">工具箱</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="tag tag-cyan">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
