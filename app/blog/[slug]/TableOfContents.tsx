"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const regex = /^## (.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const title = match[1];
    const id = title
      .toLowerCase()
      .replace(/[^\w一-龥]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ id, title });
  }

  return headings;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const items = extractHeadings(content);
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  function handleClick(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav className="sticky top-24 w-56 shrink-0">
      <div className="text-xs font-mono text-text-muted mb-3 uppercase tracking-wider">
        目录
      </div>
      <ul className="space-y-1.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => handleClick(heading.id)}
              title={heading.title}
              className={`block w-full text-left text-sm leading-5 pl-3 border-l-2 transition-all duration-200 truncate ${
                activeId === heading.id
                  ? "border-neon-cyan text-neon-cyan"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-space-border"
              }`}
            >
              {heading.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
