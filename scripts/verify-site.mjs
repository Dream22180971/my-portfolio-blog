import { spawn } from "node:child_process";

const HOST = "127.0.0.1";
const PORT = 3100;
const BASE_URL = `http://${HOST}:${PORT}`;
const START_TIMEOUT_MS = 30000;

function getNpmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function createStartProcess() {
  if (process.platform === "win32") {
    return spawn(
      "cmd.exe",
      ["/d", "/s", "/c", `npm run start -- --hostname ${HOST} --port ${PORT}`],
      {
        env: process.env,
        stdio: "inherit",
        cwd: process.cwd(),
      }
    );
  }

  return spawn(
    getNpmCommand(),
    ["run", "start", "--", "--hostname", HOST, "--port", String(PORT)],
    {
      env: process.env,
      stdio: "inherit",
      cwd: process.cwd(),
    }
  );
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

async function runChecks() {
  const home = await fetchText("/");
  assertIncludes(home, "<title>seanwalter | AI 独立开发者</title>", "home title");
  assertIncludes(home, 'rel="canonical" href="https://seanwalter.top"', "home canonical");

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

  const projects = await fetchText("/projects");
  assertIncludes(projects, "<title>项目 | seanwalter</title>", "projects title");

  const about = await fetchText("/about");
  assertIncludes(about, "<title>关于我 | seanwalter</title>", "about title");

  const experiments = await fetchText("/experiments");
  assertIncludes(experiments, "<title>实验 | seanwalter</title>", "experiments title");

  const sitemap = await fetchText("/sitemap.xml");
  assertIncludes(sitemap, "https://seanwalter.top/blog", "sitemap blog url");

  const robots = await fetchText("/robots.txt");
  assertIncludes(robots, "Sitemap: https://seanwalter.top/sitemap.xml", "robots sitemap");

  const manifest = await fetchText("/manifest.webmanifest");
  assertIncludes(manifest, '"name":"seanwalter"', "manifest name");

  console.log("Site verification passed.");
}

const server = createStartProcess();

try {
  await waitForServer();
  await runChecks();
} finally {
  server.kill();
}
