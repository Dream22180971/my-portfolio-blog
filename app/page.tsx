import Link from "next/link";
import { ArrowRight, MapPin, Zap, Target, Sparkles } from "lucide-react";
import { GithubIcon, MailIcon, WechatIcon } from "@/components/SocialIcons";

const highlights = [
  { number: "5+", label: "AI 项目", color: "cyan" },
  { number: "RAG", label: "核心方向", color: "purple" },
  { number: "∞", label: "探索中", color: "green" },
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
          <span>AI 落地顾问 / RAG 方向</span>
          <span className="opacity-30">•</span>
          <span>备考 IELTS 6.5+</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="text-text-primary">用 AI 解决</span>
          <br />
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            真实业务问题
          </span>
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
          自动化测试工程师 → AI Agent 开发者。专注 RAG 知识库与智能体搭建，
          帮企业把大模型从「听起来很酷」变成「用起来很爽」。
        </p>

        {/* 能力标签 */}
        <div className="flex flex-wrap gap-2">
          <span className="tag tag-cyan flex items-center gap-1">
            <Target className="w-3 h-3" /> RAG 知识库
          </span>
          <span className="tag tag-purple flex items-center gap-1">
            <Zap className="w-3 h-3" /> AI Agent 搭建
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
            <span>查看项目</span>
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

      {/* 重点项目 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">重点项目</h2>
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
        <h2 className="text-xl font-semibold text-text-primary">技术栈</h2>
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
