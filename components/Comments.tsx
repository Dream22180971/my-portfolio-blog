"use client";

import Giscus from "@giscus/react";

export function Comments() {
  return (
    <div className="mt-12 pt-8 border-t border-space-border">
      <h2 className="text-xl font-semibold text-text-primary mb-6">评论</h2>
      <Giscus
        repo="Dream22180971/my-portfolio-blog"
        repoId="R_kgDOSQaYaQ"
        category="Announcements"
        categoryId="DIC_kwDOSQaYac4C9DZY"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="zh-CN"
      />
    </div>
  );
}
