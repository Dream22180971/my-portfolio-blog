"use client";

import Giscus from "@giscus/react";
import { useTheme } from "./ThemeProvider";

export function Comments() {
  const { theme } = useTheme();

  return (
    <div className="comments-section">
      <h2 className="comments-section__title">评论</h2>
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
        theme={theme === "dark" ? "dark" : "light"}
        lang="zh-CN"
      />
    </div>
  );
}
