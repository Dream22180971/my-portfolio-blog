import { spawn } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "127.0.0.1";
const PORT = 3100;
const BASE_URL = `http://${HOST}:${PORT}`;
const START_TIMEOUT_MS = 30000;

const KNOWLEDGE_PAGES_DIR = fileURLToPath(new URL("../app/knowledge", import.meta.url));

function createStartProcess() {
  return spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "--hostname", HOST, "--port", String(PORT)],
    {
      env: process.env,
      stdio: "inherit",
      cwd: process.cwd(),
    }
  );
}

function stopServer(server) {
  server.kill();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  const start = Date.now();

  while (Date.now() - start < START_TIMEOUT_MS) {
    try {
      const response = await fetch(`${BASE_URL}/robots.txt`);
      if (response.ok) return;
    } catch {}

    await sleep(500);
  }

  throw new Error("Timed out waiting for local Next.js server to start.");
}

function assertIncludes(haystack, needle, context) {
  if (!haystack.includes(needle)) {
    throw new Error(`Expected ${context} to include: ${needle}`);
  }
}

function extractFirstMatch(text, regex, label) {
  const match = text.match(regex);
  if (!match) {
    throw new Error(`Could not find ${label}.`);
  }

  return match[1];
}

async function fetchText(pathname) {
  const response = await fetch(`${BASE_URL}${pathname}`);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Request failed for ${pathname}: ${response.status}`);
  }

  return text;
}

async function fetchOk(pathname) {
  const response = await fetch(`${BASE_URL}${pathname}`);
  if (!response.ok) {
    throw new Error(`Request failed for ${pathname}: ${response.status}`);
  }
  return response;
}

function extractSitemapEntry(sitemap, url) {
  return extractFirstMatch(
    sitemap,
    new RegExp(`<url>\\s*<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/loc>([\\s\\S]*?)<\\/url>`),
    `sitemap entry for ${url}`
  );
}

async function runChecks() {
  const home = await fetchText("/");
  assertIncludes(home, "<title>seanwalter | 软件测试、AI 测试与独立开发</title>", "home title");
  assertIncludes(home, 'rel="canonical" href="https://seanwalter.top"', "home canonical");
  assertIncludes(home, 'content="https://seanwalter.top/opengraph-image"', "home OG image");
  assertIncludes(home, '"@type":"WebSite"', "website JSON-LD");
  assertIncludes(home, '"@type":"Person"', "person JSON-LD");

  const blog = await fetchText("/blog");
  assertIncludes(blog, "<title>博客 | seanwalter</title>", "blog title");
  assertIncludes(blog, 'rel="canonical" href="https://seanwalter.top/blog"', "blog canonical");

  const articlePath = extractFirstMatch(blog, /href="(\/blog\/[^"]+)"/, "first blog article link");
  const article = await fetchText(articlePath);
  const articleTitle = extractFirstMatch(article, /<h1[^>]*>([^<]+)<\/h1>/, "article heading");
  assertIncludes(article, `<title>${articleTitle} | seanwalter</title>`, "article title");
  assertIncludes(
    article,
    `rel="canonical" href="https://seanwalter.top${articlePath}"`,
    "article canonical"
  );
  assertIncludes(article, '"@type":"Article"', "article JSON-LD");
  assertIncludes(article, '"url":"https://seanwalter.top/about"', "article author URL");

  const projects = await fetchText("/projects");
  assertIncludes(projects, "<title>项目 | seanwalter</title>", "projects title");

  const about = await fetchText("/about");
  assertIncludes(about, "<title>关于我 | seanwalter</title>", "about title");
  assertIncludes(about, '"@type":"ProfilePage"', "profile page JSON-LD");

  const experiments = await fetchText("/experiments");
  assertIncludes(experiments, "<title>实验 | seanwalter</title>", "experiments title");

  const knowledge = await fetchText("/knowledge");
  assertIncludes(knowledge, "<title>知识库 | seanwalter</title>", "knowledge title");
  assertIncludes(knowledge, 'content="https://seanwalter.top/opengraph-image"', "knowledge OG image");
  assertIncludes(knowledge, '"@type":"CollectionPage"', "knowledge collection JSON-LD");
  assertIncludes(
    knowledge,
    'href="/knowledge/testing-engineer-roadmap"',
    "knowledge roadmap link"
  );

  const aiTutorials = await fetchText("/knowledge/tutorials?track=ai-testing");
  assertIncludes(aiTutorials, "AI 测试工程师五阶段成长路线", "AI testing roadmap title");
  for (const phaseTitle of ["AI 质量基础", "AI 应用专项质量", "智能体质量保障", "AI 可靠性与安全", "AI 原生测试工程"]) {
    assertIncludes(aiTutorials, phaseTitle, `AI testing phase: ${phaseTitle}`);
  }
  assertIncludes(
    aiTutorials,
    'href="/knowledge/llm-foundations-testing"',
    "AI testing foundations link"
  );
  assertIncludes(
    aiTutorials,
    'href="/knowledge/ai-agent-testing"',
    "AI Agent testing link"
  );

  for (const pathname of [
    "/knowledge/testing-engineer-roadmap",
    "/knowledge/etl-testing-manual",
    "/knowledge/linux-commands",
    "/knowledge/performance-testing-analysis",
    "/knowledge/traditional-automation-to-ai-testing",
    "/knowledge/ai-testing-workflow-orchestration",
    "/knowledge/testing-skills-design",
    "/knowledge/llm-foundations-testing",
    "/knowledge/ml-statistics-for-test-engineers",
    "/knowledge/test-development-programming",
    "/knowledge/docker-kubernetes-testing",
    "/knowledge/service-chain-testing",
    "/knowledge/data-quality-engineering",
    "/knowledge/reliability-testing-manual",
    "/knowledge/ai-application-testing-system",
    "/knowledge/multimodal-ocr-testing",
    "/knowledge/rag-knowledge-base-testing",
    "/knowledge/ai-agent-testing",
    "/knowledge/mcp-testing-integration",
    "/knowledge/llm-security-red-teaming",
    "/knowledge/ai-performance-cost-observability",
    "/knowledge/prompt-context-engineering-for-testing",
  ]) {
    const page = await fetchText(pathname);
    assertIncludes(
      page,
      `rel="canonical" href="https://seanwalter.top${pathname}"`,
      `${pathname} canonical`
    );
  }

  const sitemap = await fetchText("/sitemap.xml");
  assertIncludes(sitemap, "https://seanwalter.top/blog", "sitemap blog url");
  assertIncludes(
    sitemap,
    "https://seanwalter.top/knowledge/testing-engineer-roadmap",
    "sitemap testing roadmap url"
  );
  assertIncludes(
    sitemap,
    "https://seanwalter.top/knowledge/etl-testing-manual",
    "sitemap ETL manual url"
  );
  assertIncludes(
    sitemap,
    "https://seanwalter.top/knowledge/linux-commands",
    "sitemap linux manual url"
  );
  assertIncludes(
    sitemap,
    "https://seanwalter.top/knowledge/performance-testing-analysis",
    "sitemap performance manual url"
  );
  assertIncludes(
    sitemap,
    "https://seanwalter.top/knowledge/llm-foundations-testing",
    "sitemap AI testing foundations url"
  );
  assertIncludes(
    sitemap,
    "https://seanwalter.top/knowledge/ml-statistics-for-test-engineers",
    "sitemap ML statistics url"
  );
  assertIncludes(
    sitemap,
    "https://seanwalter.top/knowledge/ai-agent-testing",
    "sitemap AI Agent testing url"
  );
  assertIncludes(
    sitemap,
    "https://seanwalter.top/knowledge/mcp-testing-integration",
    "sitemap MCP testing url"
  );
  assertIncludes(
    sitemap,
    "https://seanwalter.top/knowledge/prompt-context-engineering-for-testing",
    "sitemap prompt and context engineering url"
  );
  const knowledgeSitemapEntry = extractSitemapEntry(sitemap, "https://seanwalter.top/knowledge");
  if (knowledgeSitemapEntry.includes("<lastmod>")) {
    throw new Error("Knowledge sitemap entry must not claim an unverified lastModified date.");
  }

  // 断言 app/knowledge 下每个页面都出现在 sitemap 中，防止新增知识页面漏登记
  const knowledgeSlugs = readdirSync(KNOWLEDGE_PAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(path.join(KNOWLEDGE_PAGES_DIR, entry.name, "page.tsx")))
    .map((entry) => entry.name);
  for (const slug of knowledgeSlugs) {
    const pageUrl = `https://seanwalter.top/knowledge/${slug}`;
    if (!sitemap.includes(pageUrl)) {
      throw new Error(`Knowledge page /knowledge/${slug} is missing from sitemap. Add it to content/knowledge/pages.ts or tutorials.ts.`);
    }
  }

  const robots = await fetchText("/robots.txt");
  assertIncludes(robots, "Sitemap: https://seanwalter.top/sitemap.xml", "robots sitemap");
  assertIncludes(robots, "Sitemap: https://seanwalter.top/image-sitemap.xml", "robots image sitemap");
  for (const crawler of ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"]) {
    assertIncludes(robots, `User-Agent: ${crawler}`, `${crawler} access`);
  }

  const llms = await fetchText("/llms.txt");
  assertIncludes(llms, "# seanwalter", "llms site name");
  assertIncludes(llms, "## Published tutorials", "llms tutorial index");
  assertIncludes(
    llms,
    "https://seanwalter.top/knowledge/software-testing-foundations",
    "llms testing foundations url"
  );

  const ogImage = await fetchOk("/opengraph-image");
  assertIncludes(ogImage.headers.get("content-type") ?? "", "image/png", "OG image content type");

  const manifest = await fetchText("/manifest.webmanifest");
  assertIncludes(manifest, '"name":"seanwalter"', "manifest name");

  console.log("Site verification passed.");
}

const server = createStartProcess();

try {
  await waitForServer();
  await runChecks();
} finally {
  stopServer(server);
}
