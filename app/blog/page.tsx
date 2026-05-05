import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Sparkles } from "lucide-react";
import { getAllPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "博客 | seanwalter",
  description: "AI Agent 开发实战笔记：RAG、LLM、自动化测试、AI 产品化。",
  alternates: { canonical: "https://seanwalter.top/blog" },
  openGraph: {
    title: "博客 | seanwalter",
    description: "AI Agent 开发实战笔记：RAG、LLM、自动化测试、AI 产品化。",
    url: "https://seanwalter.top/blog",
  },
};

export default function BlogPage() {
  const articles = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-fade-in">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-purple/25 bg-neon-purple/10 px-3 py-1 text-xs text-[#c4b5fd]">
          <Sparkles className="h-3.5 w-3.5" />
          技术沉淀 / 思考记录
        </div>
        <h1 className="text-3xl font-bold text-text-primary md:text-4xl">文章</h1>
        <p className="max-w-2xl leading-7 text-text-secondary">
          分享 AI 应用开发、Agent 工程实践，以及从测试转向产品化开发过程中的方法和判断。
        </p>
      </div>

      <div className="space-y-5">
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className={`card-glow group block overflow-hidden rounded-2xl p-6 animate-slide-up stagger-${Math.min(
              i + 1,
              5
            )} ${
              article.featured
                ? "border-neon-purple/25 bg-[linear-gradient(135deg,rgba(124,58,237,0.12),rgba(17,24,39,0.88))]"
                : ""
            }`}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <div className="hidden h-28 w-24 rounded-2xl border border-space-border bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.22),transparent_42%),linear-gradient(180deg,rgba(17,24,39,0.95),rgba(10,14,23,0.9))] md:flex md:flex-col md:items-center md:justify-center">
                <span className="text-2xl font-bold text-neon-cyan">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 text-[11px] uppercase tracking-[0.3em] text-text-muted">note</span>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {article.date}
                    </span>
                  </div>
                  {article.featured && (
                    <span className="tag tag-purple text-xs">精选文章</span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold leading-8 text-text-primary group-hover:text-neon-cyan transition-colors md:text-2xl">
                    {article.title}
                  </h2>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-text-muted group-hover:text-neon-cyan transition-colors" />
                </div>

                <p className="text-sm leading-7 text-text-secondary md:text-[15px]">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {article.tags.map((tag, index) => (
                    <span key={tag} className={`tag ${index === 0 ? "tag-cyan" : "tag-purple"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
