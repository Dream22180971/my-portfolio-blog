import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { getAllPosts } from "@/lib/blog-data";
import BlogListClient from "./BlogListClient";

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

      <BlogListClient articles={articles} />
    </div>
  );
}
