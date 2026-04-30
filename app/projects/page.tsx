import Link from "next/link";
import { ExternalLink, Star, GitFork } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

const projects = [
  {
    name: "VoyageAI",
    desc: "AI-powered intelligent travel planning system. Uses multi-agent collaboration to provide personalized itinerary recommendations.",
    tags: ["Vue 3", "FastAPI", "AI Agent", "Multi-Agent"],
    github: "https://github.com/Dream22180971/VoyageAI",
    stars: 0,
    forks: 0,
    emoji: "✈",
    color: "cyan",
    category: "AI",
  },
  {
    name: "RAG Knowledge Base",
    desc: "Enterprise-level RAG system with LangChain, FAISS vector storage, and DashScope LLM. Supports PDF/MD/TXT document processing.",
    tags: ["LangChain", "FAISS", "DashScope", "Streamlit"],
    github: "https://github.com/Dream22180971/rag-knowledge-base-demo",
    stars: 0,
    forks: 0,
    emoji: "📚",
    color: "purple",
    category: "AI",
  },
  {
    name: "Coze E-commerce Bot",
    desc: "Intelligent customer service bot built on Coze platform. Supports product FAQ, return policy, and logistics inquiries.",
    tags: ["Coze", "Agent", "Knowledge Base", "E-commerce"],
    github: "https://github.com/Dream22180971/coze-ecommerce-bot",
    stars: 0,
    forks: 0,
    emoji: "🤖",
    color: "green",
    category: "AI",
  },
  {
    name: "TestPilotAgent",
    desc: "AI-powered automated testing agent framework. Exploring LLM-based test case generation and execution.",
    tags: ["Python", "AI Agent", "Testing"],
    github: "https://github.com/Dream22180971/TestPilotAgent",
    stars: 0,
    forks: 0,
    emoji: "🧪",
    color: "amber",
    category: "AI",
  },
  {
    name: "Operation Assistant",
    desc: "Project progress management app with Next.js, SQLite, and GitHub API integration.",
    tags: ["Next.js", "SQLite", "Octokit", "TypeScript"],
    github: "https://github.com/Dream22180971/operation-assistant",
    stars: 0,
    forks: 0,
    emoji: "⚡",
    color: "cyan",
    category: "Web",
  },
];

const categories = ["All", "AI", "Web", "Experiments"];

export default function ProjectsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Projects</h1>
        <p className="text-text-secondary">
          Building AI-powered solutions, one commit at a time.
        </p>
      </div>

      {/* Category Filter - Visual only for now */}
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

      {/* Projects Grid */}
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
                        : "tag-green"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
