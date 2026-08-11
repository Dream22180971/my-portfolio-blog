import type { MetadataRoute } from "next";
import { tutorials } from "@/content/knowledge/tutorials";
import { knowledgeReferencePages } from "@/content/knowledge/pages";
import { getAllPosts } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const referencePages = knowledgeReferencePages.map((page) => page.path);

  const tutorialPages = tutorials.flatMap((tutorial) =>
    tutorial.status === "published" && tutorial.href ? [tutorial.href] : []
  );

  const knowledgePages = [...new Set([...referencePages, ...tutorialPages])].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const latestPostModified = posts.reduce<string | undefined>((latest, post) => {
    const current = post.lastModified ?? post.date;
    return !latest || new Date(current) > new Date(latest) ? current : latest;
  }, undefined);

  return [
    {
      url: SITE_URL,
      ...(latestPostModified ? { lastModified: new Date(latestPostModified) } : {}),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      ...(latestPostModified ? { lastModified: new Date(latestPostModified) } : {}),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/experiments`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/knowledge`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...knowledgePages,
    ...blogPosts,
  ];
}
