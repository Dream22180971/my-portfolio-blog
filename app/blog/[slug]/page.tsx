import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, FileText } from "lucide-react";
import ShareButton from "./ShareButton";
import BackToTop from "./BackToTop";
import ViewCount from "./ViewCount";
import ReadingProgress from "./ReadingProgress";
import { RelatedPosts } from "./RelatedPosts";
import { CodeBlockEnhance } from "@/components/CodeBlockEnhance";
import { Comments } from "@/components/Comments";
import { MermaidRenderer } from "@/components/MermaidRenderer";
import { TableOfContents } from "./TableOfContents";
import { getPostBySlug, getAllPosts } from "@/lib/blog-data";
import { markdownToHtml } from "@/lib/markdown";
import { SITE_AUTHOR, SITE_NAME, SITE_URL, buildPageMetadata, getCanonicalUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

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
    modifiedTime: post.lastModified ?? post.date,
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
    dateModified: post.lastModified ?? post.date,
    image: `${SITE_URL}/blog/${slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(`/blog/${slug}`),
    },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="article-page animate-fade-in">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="article-back"
      >
        <ArrowLeft className="h-4 w-4" />
        返回文章列表
      </Link>

      <div className="article-layout">
        <article className="min-w-0">
          <header className="article-header">
            <div className="article-meta text-text-muted font-mono text-[10px] tracking-[0.08em]">
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
              <ViewCount slug={slug} />
            </div>

            <h1 className="article-title">
              {post.title}
            </h1>

            <p className="article-excerpt">
              {post.excerpt}
            </p>

            <div className="article-header__actions">
              <div className="article-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className={cn("tag", "tag-cyan")}>
                    {tag}
                  </span>
                ))}
              </div>
              <ShareButton title={post.title} />
            </div>
          </header>

          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <CodeBlockEnhance />
          <MermaidRenderer />
        </article>

        <div className="article-toc">
          <TableOfContents content={post.content} />
        </div>
      </div>

      <Comments />

      <RelatedPosts slug={slug} tags={post.tags} />

      <BackToTop />
    </div>
  );
}
