"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-data";
import { POSTS_PER_PAGE } from "@/lib/blog-data";

export default function BlogListClient({
  articles,
  initialQuery,
}: {
  articles: BlogPostMeta[];
  initialQuery: string;
}) {
  const router = useRouter();
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
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearch("");
    setVisibleCount(POSTS_PER_PAGE);
    router.replace("/blog", { scroll: false });
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

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
      <div className="article-search">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="搜索标题、摘要或主题"
          aria-label="搜索文章"
        />
        {search && (
          <button
            onClick={clearSearch}
            aria-label="清除搜索"
          >
            清除
          </button>
        )}
      </div>

      {isFiltering && (
        <div className="article-filter-note">
          <span>
            “{search.trim()}” · {filteredArticles.length} 篇记录
          </span>
          <button onClick={clearSearch}>重置筛选</button>
        </div>
      )}

      {filteredArticles.length === 0 ? (
        <div className="empty-note">
          <p>没有找到与此相关的文章。</p>
          <button onClick={clearSearch}>查看全部记录</button>
        </div>
      ) : (
        <div className="article-archive">
          {visibleArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="article-archive__item"
            >
              <time className="article-archive__date" dateTime={article.date}>
                {article.date.replaceAll("-", ".")}
              </time>
              <div>
                <h2 className="article-archive__title">{article.title}</h2>
                <p className="article-archive__excerpt">{article.excerpt}</p>
              </div>
              <span className="article-archive__arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      )}

      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => Math.min(count + POSTS_PER_PAGE, filteredArticles.length))}
          className="load-more"
        >
          加载更多记录
        </button>
      )}
    </>
  );
}
