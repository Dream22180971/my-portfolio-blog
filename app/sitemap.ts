import type { MetadataRoute } from "next";
import { tutorials } from "@/content/knowledge/tutorials";
import { getAllPosts } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const referencePages = [
    "/knowledge/tutorials",
    "/knowledge/testing-engineer-roadmap",
    "/knowledge/etl-testing-manual",
    "/knowledge/e2e-data-consistency-testing",
    "/knowledge/compatibility-testing-manual",
    "/knowledge/api-testing-manual",
    "/knowledge/security-testing-manual",
    "/knowledge/adb-commands",
    "/knowledge/claude-code-commands",
    "/knowledge/database-commands",
    "/knowledge/linux-commands",
    "/knowledge/performance-testing-analysis",
  ];

  const tutorialPages = tutorials.flatMap((tutorial) =>
    tutorial.status === "published" && tutorial.href ? [tutorial.href] : []
  );

  const knowledgePages = [...new Set([...referencePages, ...tutorialPages])].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/experiments`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/knowledge`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...knowledgePages,
    ...blogPosts,
  ];
}
