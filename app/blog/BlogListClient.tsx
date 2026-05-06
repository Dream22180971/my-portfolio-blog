"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, ChevronDown } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog-data";
import { POSTS_PER_PAGE } from "@/lib/blog-data";

export default function BlogListClient({ articles }: { articles: BlogPostMeta[] }) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <>
      <div className="space-y-5">
        {visibleArticles.map((article, i) => (
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
                <span className="text-2xl font-bold text-neon-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[11px] uppercase tracking-[0.3em] text-text-muted">
                  note
                </span>
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
                  {article.tags.map((tag, idx) => (
                    <span key={tag} className={`tag ${idx === 0 ? "tag-cyan" : "tag-purple"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + POSTS_PER_PAGE, articles.length))}
            className="group inline-flex items-center gap-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-6 py-3 text-sm text-[#c4b5fd] transition-all hover:border-neon-purple/60 hover:bg-neon-purple/20 hover:text-neon-cyan"
          >
            加载更多
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </>
  );
}
