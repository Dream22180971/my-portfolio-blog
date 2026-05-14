"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const WORKER_URL = process.env.NEXT_PUBLIC_VIEWS_WORKER_URL;

function formatViews(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function ViewCount({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (!WORKER_URL) return;

    async function track() {
      try {
        // POST 递增浏览量
        const res = await fetch(`${WORKER_URL}/api/views/${slug}`, {
          method: "POST",
        });
        if (res.ok) {
          const data = await res.json();
          setViews(data.views);
        }
      } catch {
        // 静默失败，不影响用户体验
        try {
          const res = await fetch(`${WORKER_URL}/api/views/${slug}`);
          if (res.ok) {
            const data = await res.json();
            setViews(data.views);
          }
        } catch {
          // ignore
        }
      }
    }

    track();
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5">
      <Eye className="h-3.5 w-3.5" />
      {formatViews(views)}
    </span>
  );
}
