import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-data";
import { buildPageMetadata } from "@/lib/site";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = buildPageMetadata({
  title: "博客",
  description: "AI Agent 开发实战笔记：RAG、LLM、自动化测试、AI 产品化。",
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const articles = getAllPosts();
  const { q } = await searchParams;

  return (
    <main className="editorial-page editorial-page--blog">
      <header className="page-heading-wrap">
        <p className="page-kicker">Archive / Notes</p>
        <h1 className="page-heading">文章索引</h1>
        <p className="page-copy">
          关于 AI 应用、Agent 工程与产品质量的持续记录：把实践中形成的判断，整理成可以复用的文字。
        </p>
      </header>

      <BlogListClient articles={articles} initialQuery={q ?? ""} />
    </main>
  );
}
