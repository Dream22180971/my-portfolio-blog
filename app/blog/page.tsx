import Link from "next/link";
import { Clock, Tag } from "lucide-react";

const articles = [
  {
    title: "Building a RAG System from Scratch",
    date: "2026-04-26",
    readTime: "8 min",
    excerpt: "A complete guide to building an enterprise RAG knowledge base with LangChain, FAISS, and DashScope. From document loading to semantic search.",
    tags: ["RAG", "LangChain", "AI", "Tutorial"],
    slug: "rag-from-scratch",
    featured: true,
  },
  {
    title: "AI Agent Development Practice Guide",
    date: "2026-04-24",
    readTime: "12 min",
    excerpt: "Hands-on tutorial on building AI agents with LangGraph. Covers state management, tool calling, and multi-agent orchestration patterns.",
    tags: ["Agent", "LangGraph", "Tutorial"],
    slug: "agent-guide",
    featured: false,
  },
  {
    title: "Why I Switched from Chroma to FAISS",
    date: "2026-04-26",
    readTime: "5 min",
    excerpt: "Debugging Chroma's SIGKILL issue on Windows and migrating to FAISS for stable vector storage. Performance comparison and lessons learned.",
    tags: ["FAISS", "Chroma", "Debug", "Windows"],
    slug: "chroma-to-faiss",
    featured: false,
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Blog</h1>
        <p className="text-text-secondary">
          Writing about AI, development, and the journey.
        </p>
      </div>

      <div className="space-y-4">
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className={`card-glow rounded-xl p-6 group animate-slide-up stagger-${Math.min(i + 1, 5)} ${
              article.featured ? "border-neon-purple/20" : ""
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                  <span className="opacity-30">•</span>
                  <span>{article.date}</span>
                </div>
                {article.featured && (
                  <span className="tag tag-purple text-xs">Featured</span>
                )}
              </div>

              <h2 className="text-xl font-semibold text-text-primary group-hover:text-neon-cyan transition-colors">
                {article.title}
              </h2>

              <p className="text-sm text-text-secondary leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="tag tag-cyan">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
