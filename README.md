# seanwalter

> 以测试工程建立判断力，用 AI 把不确定的想法校准成可靠产品。

[![Production](https://img.shields.io/badge/Production-seanwalter.top-147984?style=flat&logo=vercel)](https://seanwalter.top)
[![Version](https://img.shields.io/badge/Version-v0.2.0-6f8f8b?style=flat)](./package.json)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

**[访问网站](https://seanwalter.top)** · **[阅读文章](https://seanwalter.top/blog)** · **[查看项目](https://seanwalter.top/projects)** · **[浏览知识库](https://seanwalter.top/knowledge)**

---

## 它是什么

`seanwalter.top` 是肖恩沃尔特的个人产品与技术站。它不是一个展示技术名词的模板，而是把**质量工程、AI 产品化、公开写作与可验证交付**放在同一条工作链路中的实践档案。

这里记录三类内容：

- **产品**：从旅行规划、密码管理到内容工作流，展示问题如何被收敛成可用的产品。
- **判断**：以测试工程的视角处理边界、风险、体验与交付，而不把测试留到最后一步。
- **沉淀**：公开文章、系统教程、实战手册、实验记录与项目复盘，保留可追溯的学习和构建过程。

## 当前版本

### v0.2.0 · 测试工程师成长路线

- 建立从测试基本功、业务测试、自动化工程、分布式与数据、质量体系到 AI 应用测试的六阶段主线。
- 发布 23 篇系统教程，并为测试开发强化支线和 AI 测试阶段记录 15 篇后续教程。
- 增加教程模块筛选、关键词搜索、分页和成长路线关联，内容规模扩大后仍可持续维护。
- 保留实战手册与工具速查作为主线学习的场景补充，并统一教程的读者口吻与亮暗主题体验。

## 站点内容

| 页面 | 内容 |
| --- | --- |
| `/` | 首页：代表作品、工作方法、精选写作与合作入口 |
| `/projects` | AI 应用、Agent 工作流、测试工程和工具产品；统一按“问题 → 结果 → 技术栈”呈现 |
| `/blog` | 33 篇公开文章，支持按标题、摘要和标签搜索 |
| `/knowledge` | 六阶段测试工程师成长路线、23 篇系统教程、测试开发强化支线、实战手册与工具速查 |
| `/knowledge/tutorials` | 按能力模块、关键词和页码浏览全部已发布与计划中的教程 |
| `/experiments` | AI Agent、自动化测试与产品原型的探索记录 |
| `/about` | 当前方向、经历、核心能力与名字由来 |

## 核心功能

- **文章阅读体验**：文章搜索、阅读进度、目录导航、延伸阅读、代码块增强与 Mermaid 图表渲染。
- **系统学习路径**：成长路线、教程模块、测试开发强化支线、搜索筛选和分页共同组织长期学习内容。
- **亮暗主题**：一键切换亮色或暗色主题；浏览器可用时会记住主题偏好。
- **项目表达**：用用户问题和当前结果说明项目价值，技术栈作为辅助信息。
- **交互与反馈**：基于 Giscus / GitHub Discussions 的文章评论。
- **搜索引擎友好**：站点地图、图片站点地图、`robots.txt`、RSS、规范链接、Open Graph、JSON-LD 与动态分享图。
- **发布前校验**：一条命令完成 Lint、生产构建与核心路由 / 元数据检查。

## 技术实现

| 范畴 | 方案 |
| --- | --- |
| 框架 | Next.js 16（App Router）+ React 19 + TypeScript |
| 样式 | Tailwind CSS 4 + 自定义设计令牌与响应式 CSS |
| 内容 | `content/blog/` 文章数据、`content/knowledge/tutorials.ts` 教程索引与 App Router 教程页面 |
| 图表 | Mermaid 客户端渲染 |
| 评论 | Giscus（GitHub Discussions） |
| 数据与分析 | Vercel Analytics；`workers/views-counter/` 提供 Cloudflare Workers + KV 阅读计数实现 |
| 部署 | GitHub `main` 推送触发 Vercel 生产部署 |

## 本地开发

### 环境要求

- Node.js 20+
- npm

### 启动

```bash
git clone https://github.com/Dream22180971/my-portfolio-blog.git
cd my-portfolio-blog
npm install
npm run dev
```

默认在 [http://localhost:3000](http://localhost:3000) 预览。

### 完整校验

```bash
npm run check
```

该命令会依次执行：

```text
eslint → next build → scripts/verify-site.mjs
```

它会检查代码规范、生产构建、关键路由、文章页面和元数据输出。提交或部署前请保持该命令通过。

## 内容维护

### 新增系统教程

1. 在 `app/knowledge/<教程-slug>/page.tsx` 创建教程页面，沿用 `KnowledgeLayout`、章节导航和现有主题令牌。
2. 在 `content/knowledge/tutorials.ts` 注册标题、简介、能力模块、难度、状态、顺序和访问路径。
3. 使用 `published` 表示可以学习的内容，使用 `planned` 保留后续学习入口；未完成的教程不要配置访问路径。
4. 检查亮暗主题、桌面端与移动端布局、上一篇/下一篇关系，再执行 `npm run check`。

系统教程通过统一索引自动进入知识库模块、筛选结果和分页列表。

### 新增文章

1. 在 `content/blog/` 新建文章 TypeScript 文件，提供 `slug`、`title`、`date`、`excerpt`、`tags` 和 `content`。
2. 在 `content/blog/index.ts` 导入并注册文章。
3. 执行 `npm run check`。

文章会自动进入博客列表、站点地图、RSS、图片站点地图和相关推荐计算。

### 文章配图

文章图片直接存放在 `public/images/blog/`，随 Git 推送由 Vercel CDN 自动发布，无需单独的图床账户或支付方式：

```md
![Agent 工具调用循环](/images/blog/ai-agent-build-steps/agent-loop-v1.webp "一个最小可用 Agent 的核心循环")
```

- 图片路径：`public/images/blog/<文章-slug>/<用途>-v<版本号>.webp`，例如 `public/images/blog/ai-agent-build-steps/agent-loop-v1.webp`。
- 已发布图片的线上地址为 `https://seanwalter.top/images/blog/<文章-slug>/<文件名>`。
- 使用 `WebP` 作为位图默认格式；流程图优先 Mermaid，必须使用矢量图时使用 `SVG`。
- 每张图都必须有说明性 Alt 文本；可选的 Markdown 标题会渲染为图注。
- 不覆盖已发布文件。新增版本并更新文章路径，例如从 `agent-loop-v1.webp` 改为 `agent-loop-v2.webp`，避免浏览器缓存旧图。

### 新增项目

在 `app/projects/page.tsx` 的 `projects` 数组中补充以下信息：

- 项目名称和用户视角的一句话描述
- 当前状态与已经做到的结果
- GitHub 地址和少量技术标签

项目页会以“问题 → 结果 → 技术栈”的顺序展示它。

## 部署

仓库已绑定 Vercel 项目。通过以下流程发布：

```bash
npm run check
git checkout -b agent/<更新主题>
git add <已验证的文件>
git commit -m "描述本次更新"
git push -u origin agent/<更新主题>
```

分支推送后通过 Pull Request 合并到 `main`。GitHub CI 与 Vercel 检查通过后合并，Vercel 会自动构建并发布到 [seanwalter.top](https://seanwalter.top)。发布后可检查：

- [首页](https://seanwalter.top)
- [知识库](https://seanwalter.top/knowledge)
- [系统教程](https://seanwalter.top/knowledge/tutorials)
- [robots.txt](https://seanwalter.top/robots.txt)
- [sitemap.xml](https://seanwalter.top/sitemap.xml)
- [RSS](https://seanwalter.top/feed.xml)

## 关于

我是肖恩沃尔特（seanwalter），从软件测试工程走向 AI 产品化的开发者。

我关心的不只是产品能否运行，也关心它是否能解释、可信、可维护，并值得持续迭代。欢迎通过网站联系入口交流 AI 产品、Agent 工作流、质量工程与从 0 到 1 的产品验证。

## License

[MIT](./LICENSE)
