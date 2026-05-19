# DaydreamerBlog

> AI 技术积累、项目作品与知识库的个人技术主页，深空仪表盘风格。

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel)](https://seanwalter.top)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org)

**[seanwalter.top](https://seanwalter.top)** · [Blog](https://seanwalter.top/blog) · [Projects](https://seanwalter.top/projects) · [Knowledge](https://seanwalter.top/knowledge)

---

## 截图

<!-- TODO: 替换为实际截图链接 -->
<img width="2536" height="1346" alt="image" src="https://github.com/user-attachments/assets/9ef8af31-20bb-4672-93ce-c02b51b82c51" />
<img width="2522" height="1272" alt="image" src="https://github.com/user-attachments/assets/f0a09709-8535-4d20-819d-9fc9491ca660" />

<img width="2547" height="1346" alt="image" src="https://github.com/user-attachments/assets/b41a7294-1ef9-4e6f-995f-7dc3275ba734" />
<img width="2551" height="1346" alt="image" src="https://github.com/user-attachments/assets/aec3787c-8b94-4b9e-a7d2-f693ca83093d" />

<!-- ![Blog](public/screenshots/blog.png) -->
<!-- ![Projects](public/screenshots/projects.png) -->

> 截图待补充。本地启动后访问 [seanwalter.top](https://seanwalter.top) 查看实际效果。

---

## 它是什么

DaydreamerBlog 是一个**深空仪表盘风格的技术主页**，集合了博客文章、项目展示和知识库三大模块。

它不是又一个千篇一律的 Hexo 博客——而是用 Next.js 16 + Tailwind CSS 4 构建的**单页应用**，拥有：

- 沉浸式暗色主题（`#0a0e17` 深空黑 + `#00d4ff` 信号青）
- 可交互的桌面宠物（眼动追踪 + 点击粒子特效）
- 27 篇 AI 主题技术博客
- 6 个项目作品展示页
- 3 份命令手册知识库
- Giscus 评论系统 + 阅读进度条 + 目录导航

---

## 为什么做

大多数开发者博客长得都一样——Hexo 主题、千篇一律的卡片布局、没有记忆点。

我想要一个**能代表自己技术审美**的主页：

- 用深空仪表盘风格传递「AI 产品感」
- 用桌面宠物增加交互温度
- 用 TypeScript 内联博客内容，绕过 Cloudflare Workers 无文件系统的限制
- 内置回归检查脚本，每次部署前自动验证所有页面

这不是一个博客模板，而是一个**技术名片**。

---

## 核心功能

| 功能 | 状态 | 说明 |
|------|------|------|
| 深空主题 | ✅ | 暗色/亮色切换，`#0a0e17` 深空黑 + `#00d4ff` 信号青 |
| 博客系统 | ✅ | 27 篇文章，搜索过滤，阅读进度条，目录导航 |
| 项目展示 | ✅ | 6 个项目，技术标签，GitHub 链接 |
| 知识库 | ✅ | ADB / Claude Code / Linux 命令手册 |
| 桌面宠物 | ✅ | SVG 吉祥物，眼动追踪，点击粒子，睡眠模式 |
| Giscus 评论 | ✅ | 基于 GitHub Discussions 的评论系统 |
| 阅读计数 | ✅ | Cloudflare Worker + KV 持久化计数 |
| 动态 OG 图 | ✅ | 每篇文章自动生成 OpenGraph 社交分享图 |
| SEO 全套 | ✅ | sitemap / robots / manifest / RSS / JSON-LD |
| 回归检查 | ✅ | `npm run check` 自动验证所有页面渲染和元数据 |

---

## 技术架构

```
┌─────────────────────────────────────────┐
│              Frontend (Next.js 16)       │
│  App Router · TypeScript · Tailwind 4   │
├─────────────┬─────────────┬─────────────┤
│  /          │  /blog      │  /projects  │
│  首页       │  博客列表   │  项目展示   │
│  Hero+Stats │  搜索过滤   │  技术标签   │
├─────────────┼─────────────┼─────────────┤
│  /knowledge │  /about     │  /experiments│
│  命令手册   │  个人介绍   │  实验项目   │
├─────────────┴─────────────┴─────────────┤
│  Components: DesktopPet · FadeIn · Giscus│
│  MarqueeTicker · ThemeToggle · Typewriter│
├─────────────────────────────────────────┤
│  Blog Content: TS 内联（非 MDX）        │
│  自定义 Markdown Parser (lib/markdown.ts)│
├─────────────────────────────────────────┤
│  Cloudflare Worker: 阅读计数 (KV)       │
│  Vercel: 部署 + Analytics               │
└─────────────────────────────────────────┘
```

---

## 快速开始

```bash
git clone https://github.com/Dream22180971/my-portfolio-blog.git
cd my-portfolio-blog
npm install
npm run dev
```

访问 `http://localhost:3000`

### 部署前检查

```bash
npm run check
```

依次执行 lint → build → 验证所有页面渲染、元数据、sitemap。

---

## 使用示例

### 写一篇新博客

1. 在 `content/blog/` 下新建 TypeScript 文件
2. 导出 `BlogPost` 对象（slug、title、date、tags、content）
3. 在 `content/blog/index.ts` 中导入并注册
4. `npm run check` 验证无误后推送

### 添加新项目

在 `app/projects/page.tsx` 的项目数组中添加条目，包含名称、描述、技术栈、GitHub 链接。

### 本地验证

```bash
npm run check
```

自动检查：所有页面标题、canonical URL、JSON-LD 结构化数据、sitemap 条目、robots.txt、manifest。

---

## Roadmap

- [x] 深空仪表盘主题
- [x] 27 篇 AI 技术博客
- [x] 桌面宠物（眼动追踪 + 粒子）
- [x] Giscus 评论系统
- [x] Cloudflare Worker 阅读计数
- [x] 动态 OG 图生成
- [x] RSS Feed + Image Sitemap
- [x] 回归检查脚本
- [ ] 博客文章配图优化
- [ ] 知识库内容扩充
- [ ] 实验项目页完善
- [ ] 多语言支持（中/英）

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 |
| 图标 | Lucide React |
| 评论 | Giscus (GitHub Discussions) |
| 分析 | Vercel Analytics + Google Tag |
| 计数 | Cloudflare Workers + KV |
| 部署 | Vercel (主站) · Cloudflare (Worker) |
| 字体 | Inter (正文) · JetBrains Mono (代码) |

---

## License

[MIT](./LICENSE)
