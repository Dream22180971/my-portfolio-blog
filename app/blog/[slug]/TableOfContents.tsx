"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

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
  const [activeId, setActiveId] = useState<string>("");
  const headings = useMemo(() => extractHeadings(content), [content]);

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
    <nav className="table-of-contents w-52 shrink-0" aria-label="文章目录">
      <p className="table-of-contents__title">文章目录</p>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              onClick={() => handleClick(heading.id)}
              title={heading.title}
              aria-current={activeId === heading.id ? "location" : undefined}
              className={cn(activeId === heading.id && "is-active")}
            >
              {heading.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
