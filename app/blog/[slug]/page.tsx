import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog-data";
import { markdownToHtml } from "@/lib/markdown";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | seanwalter`,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = markdownToHtml(post.content);

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回文章列表
      </Link>

      <article className="space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-text-primary md:text-4xl">
            {post.title}
          </h1>

          <p className="text-lg leading-8 text-text-secondary">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={tag} className={`tag ${index % 2 === 0 ? "tag-cyan" : "tag-purple"}`}>
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="h-px bg-space-border" />

        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
