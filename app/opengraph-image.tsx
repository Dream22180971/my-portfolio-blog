import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "seanwalter 软件测试、AI 测试与独立开发知识库";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 72px",
          color: "#E9ECE8",
          background: "#0B0D0E",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 22,
            borderBottom: "1px solid rgba(138, 244, 255, 0.35)",
            color: "#8E9997",
            fontSize: 20,
            letterSpacing: "0.08em",
          }}
        >
          <span>{SITE_NAME}.top</span>
          <span>TECHNICAL NOTES / KNOWLEDGE BASE</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <span style={{ color: "#8AF4FF", fontSize: 24, letterSpacing: "0.08em" }}>
            SOFTWARE TESTING / AI QUALITY / INDEPENDENT DEVELOPMENT
          </span>
          <div style={{ display: "flex", fontSize: 62, lineHeight: 1.22, fontWeight: 700 }}>
            Turning complex technology into practical learning paths
          </div>
          <div style={{ display: "flex", color: "#8E9997", fontSize: 24 }}>
            Software Testing / AI Testing / RAG / Agent / MCP
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#8E9997",
            fontSize: 18,
          }}
        >
          <span>SEAN WALTER</span>
          <span style={{ color: "#8AF4FF" }}>seanwalter.top</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
