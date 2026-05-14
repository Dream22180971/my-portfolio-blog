"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, ChevronDown, Search, X } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog-data";
import { POSTS_PER_PAGE } from "@/lib/blog-data";
import { cn } from "@/lib/cn";

export default function BlogListClient({ articles }: { articles: BlogPostMeta[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState(initialQuery);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrl = useCallback(
    (q: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        const qs = params.toString();
        router.replace(`/blog${qs ? `?${qs}` : ""}`, { scroll: false });
      }, 300);
    },
    [router]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setVisibleCount(POSTS_PER_PAGE);
    updateUrl(value);
  };

  const clearSearch = () => {
    setSearch("");
    setVisibleCount(POSTS_PER_PAGE);
    router.replace("/blog", { scroll: false });
  };

  const filteredArticles = useMemo(() => {
    if (!search.trim()) return articles;
    const q = search.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [articles, search]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const isFiltering = !!search.trim();

  return (
    <>
      {/* 搜索栏 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="搜索文章标题、摘要或标签..."
          className="w-full rounded-xl border border-space-border bg-space-card py-3 pl-11 pr-10 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-neon-cyan"
        />
        {search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-neon-cyan transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 筛选状态提示 */}
      {isFiltering && (
        <div className="flex items-center justify-between rounded-lg border border-space-border bg-space-card px-4 py-2 text-sm text-text-secondary">
          <span>
            找到 <span className="text-neon-cyan">{filteredArticles.length}</span> 篇文章
          </span>
          <button
            onClick={clearSearch}
            className="text-text-muted hover:text-neon-cyan transition-colors"
          >
            清除
          </button>
        </div>
      )}

      <div className="space-y-5">
        {filteredArticles.length === 0 && (
          <div className="py-16 text-center text-text-muted">
            <p className="text-lg">没有找到相关文章</p>
            <button
              onClick={clearSearch}
              className="mt-3 text-sm text-neon-cyan hover:underline"
            >
              清除筛选
            </button>
          </div>
        )}
        {visibleArticles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className={cn(
              "card-glow group block overflow-hidden rounded-2xl p-6 animate-slide-up",
              `stagger-${Math.min(i + 1, 5)}`,
              article.featured && "border-neon-purple/25 blog-card-featured"
            )}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <div className="hidden h-28 w-24 rounded-2xl border border-space-border blog-thumb md:flex md:flex-col md:items-center md:justify-center">
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
                    <span key={tag} className={cn("tag", idx === 0 ? "tag-cyan" : "tag-purple")}>
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
            className="group inline-flex items-center gap-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-6 py-3 text-sm text-neon-purple-light transition-all hover:border-neon-purple/60 hover:bg-neon-purple/20 hover:text-neon-cyan"
          >
            加载更多
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </>
  );
}
