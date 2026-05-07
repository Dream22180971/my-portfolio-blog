const rules: [RegExp, string | ((...args: string[]) => string)][] = [
  // Images (must be before links)
  [/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" class="blog-image" />'],
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
      trimmed.startsWith("<table") ||
      trimmed.startsWith("<img") ||
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

function parseTables(md: string): string {
  const lines = md.split("\n");
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Detect table start: line starts with | and next line is a separator
    if (
      /^\|.+\|$/.test(line.trim()) &&
      i + 1 < lines.length &&
      /^\|[-:| ]+\|$/.test(lines[i + 1].trim())
    ) {
      const headerCells = parseTableRow(line);
      const bodyRows: string[][] = [];

      i += 2; // skip separator
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        bodyRows.push(parseTableRow(lines[i]));
        i++;
      }

      result.push(buildTableHtml(headerCells, bodyRows));
      continue;
    }

    result.push(line);
    i++;
  }

  return result.join("\n");
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function buildTableHtml(headers: string[], rows: string[][]): string {
  const thead = `<thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  return `<table class="blog-table">${thead}${tbody}</table>`;
}

export function markdownToHtml(md: string): string {
  let html = md;

  // Parse tables first (before inline rules)
  html = parseTables(html);

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
