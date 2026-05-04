"use client";

const keywords = [
  "GPT-5.5",
  "Claude 4.7",
  "Gemini 3.1",
  "DeepSeek V4",
  "Kimi K2.6",
  "RAG",
  "Agent",
  "MCP",
];

export function MarqueeTicker() {
  const items = [...keywords, ...keywords];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-space-border bg-white/[0.02] py-3">
      <div className="marquee-track flex items-center gap-6 whitespace-nowrap">
        {items.map((kw, i) => (
          <span key={`${kw}-${i}`} className="flex items-center gap-6 text-sm font-mono text-text-secondary">
            <span className="text-neon-cyan/40">◆</span>
            <span>{kw}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
