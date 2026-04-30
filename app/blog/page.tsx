"use client";

import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const articles = {
  zh: [
    {
      title: "从零搭建企业级 RAG 知识库",
      date: "2026-04-26",
      readTime: "8 分钟",
      excerpt: "使用 LangChain + FAISS + DashScope 搭建企业级 RAG 知识库的完整指南，包含文档加载、语义搜索和性能优化。",
      tags: ["RAG", "LangChain", "AI", "教程"],
      slug: "rag-from-scratch",
      featured: true,
    },
    {
      title: "AI Agent 开发实战指南",
      date: "2026-04-24",
      readTime: "12 分钟",
      excerpt: "使用 LangGraph 构建 AI Agent 的实战教程，涵盖状态管理、工具调用和多 Agent 协作模式。",
      tags: ["Agent", "LangGraph", "教程"],
      slug: "agent-guide",
      featured: false,
    },
    {
      title: "为什么我从 Chroma 切换到 FAISS",
      date: "2026-04-26",
      readTime: "5 分钟",
      excerpt: "排查 Chroma 在 Windows 上的 SIGKILL 问题并迁移到 FAISS 向量存储，性能对比和经验总结。",
      tags: ["FAISS", "Chroma", "调试", "Windows"],
      slug: "chroma-to-faiss",
      featured: false,
    },
  ],
  en: [
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
  ],
};

const pageContent = {
  zh: {
    title: "文章",
    description: "分享 AI、开发和成长路上的思考。",
    readTime: "阅读",
    featured: "精选",
  },
  en: {
    title: "Blog",
    description: "Writing about AI, development, and the journey.",
    readTime: "min read",
    featured: "Featured",
  },
};

export default function BlogPage() {
  const { language } = useLanguage();
  const articlesList = articles[language];
  const content = pageContent[language];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">{content.title}</h1>
        <p className="text-text-secondary">{content.description}</p>
      </div>

      <div className="space-y-4">
        {articlesList.map((article, i) => (
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
                  <span className="tag tag-purple text-xs">{content.featured}</span>
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