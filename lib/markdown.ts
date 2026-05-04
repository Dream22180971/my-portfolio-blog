const rules: [RegExp, string | ((...args: string[]) => string)][] = [
  // Code blocks (must be before other rules)
  [/```[\s\S]*?```/g, (match: string) => {
    const code = match.replace(/```\w*\n?/, "").replace(/```$/, "");
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
  }],
  // Headers
  [/^### (.+)$/gm, "<h3>$1</h3>"],
  [/^## (.+)$/gm, "<h2>$1</h2>"],
  // Horizontal rule
  [/^---$/gm, "<hr />"],
  // Blockquotes
  [/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>"],
  // Bold
  [/\*\*(.+?)\*\*/g, "<strong>$1</strong>"],
  // Italic
  [/\*(.+?)\*/g, "<em>$1</em>"],
  // Inline code
  [/`([^`]+)`/g, "<code>$1</code>"],
  // Unordered list items
  [/^- (.+)$/gm, "<li>$1</li>"],
  // Ordered list items
  [/^\d+\. (.+)$/gm, "<li>$1</li>"],
  // Links
  [/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'],
];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapParagraphs(html: string): string {
  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        result.push("</ul>");
        inList = false;
      }
      continue;
    }

    // Skip lines that are already HTML blocks
    if (
      trimmed.startsWith("<h") ||
      trimmed.startsWith("<hr") ||
      trimmed.startsWith("<pre") ||
      trimmed.startsWith("<blockquote") ||
      trimmed.startsWith("<li") ||
      trimmed.startsWith("</")
    ) {
      if (trimmed.startsWith("<li") && !inList) {
        result.push("<ul>");
        inList = true;
      } else if (!trimmed.startsWith("<li") && inList) {
        result.push("</ul>");
        inList = false;
      }
      result.push(trimmed);
      continue;
    }

    if (inList) {
      result.push("</ul>");
      inList = false;
    }
    result.push(`<p>${trimmed}</p>`);
  }

  if (inList) result.push("</ul>");
  return result.join("\n");
}

export function markdownToHtml(md: string): string {
  let html = md;

  // Apply inline rules
  for (const [pattern, replacement] of rules) {
    if (typeof replacement === "function") {
      html = html.replace(pattern, replacement as (...args: string[]) => string);
    } else {
      html = html.replace(pattern, replacement);
    }
  }

  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, "\n");

  // Wrap loose text in paragraphs
  html = wrapParagraphs(html);

  return html;
}
