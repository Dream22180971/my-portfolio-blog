import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, FileText } from "lucide-react";
import ShareButton from "./ShareButton";
import { getPostBySlug, getAllPosts } from "@/lib/blog-data";
import { markdownToHtml } from "@/lib/markdown";
import { SITE_AUTHOR, SITE_NAME, SITE_URL, buildPageMetadata, getCanonicalUrl } from "@/lib/site";

function countWords(md: string): string {
  // 去掉 markdown 语法
  const plain = md
    .replace(/[#*`\[\]()>!|~=_\-]/g, " ")
    .replace(/\{%.*?%\}/g, " ")
    .replace(/<[^>]*>/g, " ");
  const chinese = (plain.match(/[一-鿿㐀-䶿]/g) || []).length;
  const english = (plain.match(/[a-zA-Z]+/g) || []).length;
  const digits = (plain.match(/\d+/g) || []).length;
  const total = chinese + english + digits;
  if (total >= 10000) return `${(total / 10000).toFixed(1)}万字`;
  if (total >= 1000) return `${(total / 1000).toFixed(0)}k字`;
  return `${total}字`;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(`/blog/${slug}`),
    },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              {countWords(post.content)}
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-text-primary md:text-4xl">
            {post.title}
          </h1>

          <p className="text-lg leading-8 text-text-secondary">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={tag} className={`tag ${index % 2 === 0 ? "tag-cyan" : "tag-purple"}`}>
                  {tag}
                </span>
              ))}
            </div>
            <ShareButton title={post.title} />
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
