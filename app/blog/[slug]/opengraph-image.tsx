import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog-data";

export const alt = "肖恩的博客";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "肖恩的博客";
  const tags = post?.tags?.slice(0, 3).join(" · ") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0a0e17 0%, #131a2b 50%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 装饰圆 */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          }}
        />

        {/* 顶部站点名 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22d3ee",
            }}
          />
          <span
            style={{
              fontSize: 20,
              fontFamily: "sans-serif",
              color: "#94a3b8",
              letterSpacing: "0.05em",
            }}
          >
            seanwalter.top
          </span>
        </div>

        {/* 标题 */}
        <div
          style={{
            fontSize: title.length > 20 ? 44 : 52,
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "#e2e8f0",
            lineHeight: 1.3,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          {title}
        </div>

        {/* 标签 */}
        {tags && (
          <div
            style={{
              fontSize: 18,
              fontFamily: "sans-serif",
              color: "#22d3ee",
              letterSpacing: "0.02em",
            }}
          >
            {tags}
          </div>
        )}

        {/* 底部分割线 + 作者 */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: 1,
              flex: 1,
              background: "linear-gradient(to right, rgba(34,211,238,0.3), transparent)",
              marginRight: 24,
            }}
          />
          <span
            style={{
              fontSize: 16,
              fontFamily: "sans-serif",
              color: "#64748b",
              whiteSpace: "nowrap",
            }}
          >
            肖恩的博客
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
