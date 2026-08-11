import { tutorials, tutorialTracks } from "@/content/knowledge/tutorials";
import { getAllPosts } from "@/lib/blog-data";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function markdownLink(title: string, path: string, description: string) {
  return `- [${title}](${new URL(path, SITE_URL)}) — ${description}`;
}

export function GET() {
  const publishedTutorials = tutorials
    .filter((tutorial) => tutorial.status === "published" && tutorial.href)
    .sort((a, b) => a.order - b.order);
  const posts = getAllPosts();

  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Author: ${SITE_AUTHOR}`,
    "Primary language: zh-CN",
    "Primary audience: software testers, test developers, AI quality engineers, and independent developers.",
    "",
    "## Primary pages",
    "",
    markdownLink("Home", "/", "Site overview and latest work."),
    markdownLink("Knowledge base", "/knowledge", "Structured learning routes, tutorials, manuals, and references."),
    markdownLink("Blog", "/blog", "Technical articles about AI products, testing, RAG, agents, and engineering practice."),
    markdownLink("Projects", "/projects", "Open-source projects and deployed AI applications."),
    markdownLink("About the author", "/about", "Author background, experience, focus, and public identity."),
    "",
    "## Learning tracks",
    "",
    ...tutorialTracks.map((track) =>
      markdownLink(track.title, `/knowledge/tutorials?track=${track.slug}`, `${track.description} ${track.outcome}`)
    ),
    "",
    "## Published tutorials",
    "",
    ...publishedTutorials.map((tutorial) =>
      markdownLink(tutorial.title, tutorial.href!, tutorial.description)
    ),
    "",
    "## Blog articles",
    "",
    ...posts.map((post) =>
      markdownLink(post.title, `/blog/${post.slug}`, `${post.date}; ${post.excerpt}`)
    ),
    "",
    "## Discovery and feeds",
    "",
    markdownLink("XML sitemap", "/sitemap.xml", "Canonical URL discovery and freshness metadata."),
    markdownLink("Image sitemap", "/image-sitemap.xml", "Discoverable article images."),
    markdownLink("RSS feed", "/feed.xml", "Recent blog content in RSS 2.0 format."),
    markdownLink("Robots policy", "/robots.txt", "Crawler access and sitemap locations."),
    "",
    "## Content use",
    "",
    "Articles include their own copyright statement. Unless otherwise stated, articles use CC BY-NC-SA 4.0.",
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": "zh-CN",
    },
  });
}
