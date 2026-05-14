import { posts } from "@/content/blog";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  lastModified?: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  featured?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getAllPosts(): BlogPostMeta[] {
  return [...posts]
    .sort((a, b) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateDiff !== 0) return dateDiff;
      return posts.indexOf(b) - posts.indexOf(a);
    })
    .map((post) => {
      const { content, ...meta } = post;
      void content;
      return { ...meta, lastModified: meta.lastModified ?? meta.date };
    });
}

export function getPostBySlug(slug: string): BlogPost | null {
  return posts.find((post) => post.slug === slug) ?? null;
}

export const POSTS_PER_PAGE = 10;

export function getTotalPages(): number {
  return Math.ceil(posts.length / POSTS_PER_PAGE);
}

export function getRelatedPosts(
  slug: string,
  tags: string[],
  limit = 3
): BlogPostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      ...post,
      score: post.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((post) => post.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit)
    .map(({ score, ...rest }) => rest);
}
