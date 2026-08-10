import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/knowledge/prompt-context-engineering-for-testing",
        destination: "/knowledge/ai-testing-workflow-orchestration",
        permanent: true,
      },
      {
        source: "/knowledge/mcp-testing-integration",
        destination: "/knowledge/ai-agent-testing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
