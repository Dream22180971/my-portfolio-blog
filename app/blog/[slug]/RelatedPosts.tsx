import Link from "next/link";
import { CalendarDays } from "lucide-react";
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
    <section className="mt-12 space-y-6">
      <h2 className="text-xl font-bold text-text-primary">相关文章</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-glow block rounded-xl p-5 space-y-3"
          >
            <h3 className="text-sm font-semibold text-text-primary leading-6 line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <CalendarDays className="h-3 w-3" />
              {post.date}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((t, i) => (
                <span
                  key={t}
                  className={`tag text-[10px] px-2 py-0.5 ${
                    i === 0 ? "tag-cyan" : "tag-purple"
                  }`}
                >
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
