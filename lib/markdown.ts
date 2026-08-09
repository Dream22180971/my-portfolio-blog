const rules: [RegExp, string | ((...args: string[]) => string)][] = [
  // Images (must be before links). Supports optional Markdown titles as captions.
  [/!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)/g, renderImage],
  // Headers (with ids for anchor links)
  [/^### (.+)$/gm, "<h3>$1</h3>"],
  [/^## (.+)$/gm, (_match: string, title: string) => {
    const id = title
      .toLowerCase()
      .replace(/[^\w一-龥]+/g, "-")
      .replace(/^-|-$/g, "");
    return `<h2 id="${id}">${title}</h2>`;
  }],
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
  [/\[([^\]]+)\]\(([^)]+)\)/g, renderLink],
];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderImage(_match: string, alt: string, src: string, caption?: string): string {
  const image = `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" class="blog-image" />`;

  if (!caption) return image;

  return `<figure class="blog-figure">${image}<figcaption>${escapeHtml(caption)}</figcaption></figure>`;
}

function renderLink(_match: string, label: string, href: string): string {
  const external = /^(?:https?:)?\/\//i.test(href) && !/^https?:\/\/(?:www\.)?seanwalter\.top(?:[/?#:]|$)/i.test(href);
  const externalAttributes = external ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${href}"${externalAttributes}>${label}</a>`;
}

function wrapParagraphs(html: string): string {
  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;
  let rawBlockEnd: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (rawBlockEnd) {
      result.push(line);
      if (trimmed.includes(rawBlockEnd)) {
        rawBlockEnd = null;
      }
      continue;
    }

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
      trimmed.startsWith("<div") ||
      trimmed.startsWith("<blockquote") ||
      trimmed.startsWith("<table") ||
      trimmed.startsWith("<img") ||
      trimmed.startsWith("<figure") ||
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
      if (trimmed.startsWith("<pre") && !trimmed.includes("</pre>")) {
        rawBlockEnd = "</pre>";
      }
      if (trimmed.startsWith("<div") && !trimmed.includes("</div>")) {
        rawBlockEnd = "</div>";
      }
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

  // Extract code blocks first to protect them from other rules
  const codeBlocks: string[] = [];
  html = html.replace(/```[\s\S]*?```/g, (match: string) => {
    const language = match.match(/^```([a-zA-Z0-9_-]+)?/)?.[1] ?? "";
    const code = match.replace(/^```[a-zA-Z0-9_-]*\n?/, "").replace(/```$/, "");
    const placeholder = `\x00CODE_BLOCK_${codeBlocks.length}\x00`;
    const escapedCode = escapeHtml(code.trim());

    if (language.toLowerCase() === "mermaid") {
      codeBlocks.push(
        `<div class="blog-mermaid mermaid" data-mermaid-source="${escapedCode}">${escapedCode}</div>`
      );
    } else {
      codeBlocks.push(`<pre><code>${escapedCode}</code></pre>`);
    }

    return placeholder;
  });

  // Apply inline rules
  for (const [pattern, replacement] of rules) {
    if (typeof replacement === "function") {
      html = html.replace(pattern, replacement as (...args: string[]) => string);
    } else {
      html = html.replace(pattern, replacement);
    }
  }

  // Restore code blocks
  html = html.replace(/\x00CODE_BLOCK_(\d+)\x00/g, (_: string, index: string) => {
    return codeBlocks[parseInt(index)];
  });

  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, "\n");

  // Wrap loose text in paragraphs
  html = wrapParagraphs(html);

  return html;
}
