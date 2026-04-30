import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { GithubIcon, MailIcon } from "@/components/SocialIcons";

const stats = [
  { number: "3", label: "Projects", color: "cyan" },
  { number: "2", label: "Skills", color: "purple" },
  { number: "∞", label: "Ideas", color: "green" },
];

const projects = [
  {
    name: "VoyageAI",
    desc: "AI-powered intelligent travel planning system",
    tags: ["Vue 3", "FastAPI", "AI Agent"],
    href: "https://github.com/Dream22180971/VoyageAI",
    emoji: "✈",
    color: "cyan",
  },
  {
    name: "RAG Knowledge Base",
    desc: "Enterprise-level intelligent Q&A platform with LangChain",
    tags: ["LangChain", "FAISS", "DashScope"],
    href: "https://github.com/Dream22180971/rag-knowledge-base-demo",
    emoji: "📚",
    color: "purple",
  },
  {
    name: "Coze E-commerce Bot",
    desc: "Intelligent customer service bot for e-commerce scenarios",
    tags: ["Coze", "Agent", "Knowledge Base"],
    href: "https://github.com/Dream22180971/coze-ecommerce-bot",
    emoji: "🤖",
    color: "green",
  },
];

const latestArticles = [
  {
    title: "Building a RAG System from Scratch",
    date: "2026-04-26",
    tags: ["RAG", "LangChain", "AI"],
    href: "/blog/rag-from-scratch",
  },
  {
    title: "AI Agent Development Practice Guide",
    date: "2026-04-24",
    tags: ["Agent", "LangGraph", "Tutorial"],
    href: "/blog/agent-guide",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
            <MapPin className="w-3 h-3" />
            <span>Nanjing, China</span>
            <span className="opacity-30">•</span>
            <Calendar className="w-3 h-3" />
            <span>Available now</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="text-text-primary">Building </span>
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            AI Agents
          </span>
          <br />
          <span className="text-text-primary">for the real world</span>
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
          Automated testing engineer transitioning to AI Agent development. 
          Building RAG knowledge bases, Coze bots, and LLM-powered applications.
          Currently preparing for IELTS while crafting production-ready AI solutions.
        </p>

        <div className="flex flex-wrap gap-3 pt-4">
          <Link href="/projects" className="btn-primary">
            <span>View Projects</span>
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
          <a href="mailto:sean@example.com" className="btn-secondary">
            <MailIcon className="w-4 h-4" />
            <span>Contact</span>
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
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

      {/* Recent Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Recent Projects</h2>
          <Link href="/projects" className="text-sm font-mono text-neon-cyan hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid gap-4">
          {projects.map((project, i) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-glow rounded-xl p-6 animate-slide-up stagger-${i + 1} group`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{project.emoji}</span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-text-primary group-hover:text-neon-cyan transition-colors">
                      {project.name}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-neon-cyan transition-colors" />
                  </div>
                  <p className="text-sm text-text-secondary">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag tag-cyan">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Latest Articles</h2>
          <Link href="/blog" className="text-sm font-mono text-neon-cyan hover:underline">
            Read more →
          </Link>
        </div>

        <div className="space-y-3">
          {latestArticles.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="block card-glow rounded-xl p-5 group hover:border-neon-cyan/30 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-text-primary group-hover:text-neon-cyan transition-colors">
                  {article.title}
                </h3>
                <span className="text-xs font-mono text-text-muted">{article.date}</span>
              </div>
              <div className="flex gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="tag tag-purple">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js",
            "TypeScript",
            "Python",
            "LangChain",
            "LangGraph",
            "FastAPI",
            "Vue 3",
            "TailwindCSS",
            "FAISS",
            "Coze",
            "Docker",
          ].map((tech) => (
            <span key={tech} className="tag tag-cyan">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
