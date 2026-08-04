"use client";

import { useEffect, useState } from "react";

type ActiveImage = {
  alt: string;
  src: string;
};

export function ArticleImageEnhance() {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof HTMLImageElement) || !target.matches(".prose-blog .blog-image")) return;

      setActiveImage({ alt: target.alt, src: target.currentSrc || target.src });
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveImage(null);
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!activeImage) return null;

  return (
    <div
      className="article-image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={activeImage.alt || "文章图片预览"}
      onClick={() => setActiveImage(null)}
    >
      <button type="button" className="article-image-lightbox__close" aria-label="关闭图片预览">
        ×
      </button>
      {/* The article parser emits remote R2 URLs, so this preview must preserve the original source. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={activeImage.src} alt={activeImage.alt} onClick={(event) => event.stopPropagation()} />
    </div>
  );
}
