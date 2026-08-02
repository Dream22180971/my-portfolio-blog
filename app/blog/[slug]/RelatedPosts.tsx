import Link from "next/link";
import { getRelatedPosts } from "@/lib/blog-data";

export function RelatedPosts({
  slug,
  tags,
}: {
  slug: string;
  tags: string[];
}) {
  const related = getRelatedPosts(slug, tags);
  if (related.length === 0) return null;

  return (
    <section className="related-posts mt-24 border-t pt-7" aria-labelledby="related-posts-title">
      <div className="mb-6 flex items-baseline justify-between gap-6">
        <h2
          id="related-posts-title"
          className="related-posts__meta font-mono text-[10px] tracking-[0.12em] uppercase"
        >
          延伸阅读
        </h2>
        <span className="related-posts__meta font-mono text-[10px] tracking-[0.12em]">
          {String(related.length).padStart(2, "0")} 篇
        </span>
      </div>
      <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="related-posts__item group block border-t py-6 first:pt-0 sm:first:pt-0"
          >
            <time className="related-posts__date font-mono text-[10px] tracking-[0.1em]">
              {post.date}
            </time>
            <h3 className="related-posts__title mt-3 font-[family-name:var(--display-cn)] text-xl font-semibold leading-snug tracking-[-0.035em] transition-colors">
              {post.title}
            </h3>
            <div className="article-tags mt-4">
              {post.tags.slice(0, 2).map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
