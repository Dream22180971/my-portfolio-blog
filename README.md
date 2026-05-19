# DaydreamerBlog

> 一个深空仪表盘风格的技术主页——博客、项目展示、知识库，一站集成。

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel)](https://seanwalter.top)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org)

**[seanwalter.top](https://seanwalter.top)** · [Blog](https://seanwalter.top/blog) · [Projects](https://seanwalter.top/projects) · [Knowledge](https://seanwalter.top/knowledge)

---

## 目录

- [截图](#截图)
- [它是什么](#它是什么)
- [为什么做](#为什么做)
- [核心功能](#核心功能)
- [快速开始](#快速开始)
- [使用示例](#使用示例)
- [技术架构](#技术架构)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [谁适合看这个](#谁适合看这个)
- [关于我](#关于我)

---

## 截图

<img width="2536" height="1346" alt="首页" src="https://github.com/user-attachments/assets/9ef8af31-20bb-4672-93ce-c02b51b82c51" />
<img width="2522" height="1272" alt="博客" src="https://github.com/user-attachments/assets/f0a09709-8535-4d20-819d-9fc9491ca660" />
<img width="2547" height="1346" alt="项目" src="https://github.com/user-attachments/assets/b41a7294-1ef9-4e6f-995f-7dc3275ba734" />
<img width="2551" height="1346" alt="知识库" src="https://github.com/user-attachments/assets/aec3787c-8b94-4b9e-a7d2-f693ca83093d" />

---

## 它是什么

DaydreamerBlog 是一个**技术主页**，把博客、项目展示、知识库打包成一个深空仪表盘风格的网站。

**你可以用它来：**
- 阅读 27 篇 AI 主题的技术博客文章
- 浏览 6 个项目的详细介绍和技术栈
- 查阅 ADB / Claude Code / Linux 命令手册
- 在文章评论区互动（基于 GitHub Discussions）

它不是又一个 Hexo 模板——整个站点用 Next.js 16 构建，拥有沉浸式暗色主题、可交互桌面宠物、动态 OG 图生成等特性。

---

## 为什么做

市面上的开发者博客大多长得一样——Hexo 主题、千篇一律的卡片布局、没有记忆点。

我想要一个**能代表自己技术审美**的主页。不是"我用了什么技术"，而是"你打开就能感受到这是谁的网站"。

于是有了 DaydreamerBlog：深空仪表盘配色、桌面宠物交互、TypeScript 内联博客内容、部署前自动回归检查。

**这是一个技术名片，不是一个博客模板。**

---

## 核心功能

| 你能做什么 | 说明 |
|-----------|------|
| **读博客** | 27 篇文章，支持搜索过滤、阅读进度条、目录导航 |
| **看项目** | 6 个作品展示，每个带技术标签和 GitHub 链接 |
| **查知识库** | ADB / Claude Code / Linux 命令手册，随时查阅 |
| **评论互动** | 基于 GitHub Discussions，登录即可评论 |
| **切换主题** | 暗色 / 亮色一键切换 |
| **和桌面宠物玩** | SVG 吉祥物会追踪你的眼睛，点击它还有粒子特效 |

**开发者能看到的：**
- 动态 OG 图（每篇文章自动生成社交分享图）
- 阅读计数（Cloudflare Worker + KV 持久化）
- SEO 全套（sitemap / robots / manifest / RSS / JSON-LD）
- 回归检查脚本（`npm run check` 自动验证所有页面）

---

## 快速开始

```bash
# 1. 下载项目
git clone https://github.com/Dream22180971/my-portfolio-blog.git
cd my-portfolio-blog

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

打开浏览器访问 `http://localhost:3000` 就能看到界面了。

### 部署前检查

```bash
npm run check
```

自动执行 lint → build → 验证所有页面渲染和元数据，确保没问题再推送。

---

## 使用示例

### 阅读博客

1. 访问 [seanwalter.top/blog](https://seanwalter.top/blog)
2. 用搜索框或标签过滤文章
3. 点击文章进入阅读，左侧有目录导航，底部有评论区

### 写一篇新博客

1. 在 `content/blog/` 下新建一个 TypeScript 文件
2. 导出 `BlogPost` 对象（slug、title、date、tags、content）
3. 在 `content/blog/index.ts` 中导入并注册
4. 运行 `npm run check` 验证无误后推送

### 添加新项目

在 `app/projects/page.tsx` 的项目数组中添加一条，填上项目名、描述、技术栈和 GitHub 链接即可。

---

## 技术架构

```
┌─────────────────────────────────────────┐
│              Frontend (Next.js 16)       │
│  App Router · TypeScript · Tailwind 4   │
├─────────────┬─────────────┬─────────────┤
│  /          │  /blog      │  /projects  │
│  首页       │  博客列表   │  项目展示   │
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

## FAQ

**Q: 这个博客用的什么主题？**
A: 不是任何现成主题。整个前端是用 Next.js 16 + Tailwind CSS 4 从零搭建的，深空仪表盘配色是自定义的。

**Q: 博客文章是怎么存储的？**
A: 文章以 TypeScript 文件形式内联在 `content/blog/` 目录下，不是 MDX 也不是 Markdown 文件。这样做是为了兼容 Cloudflare Workers（无文件系统）。

**Q: 评论需要什么账号？**
A: 评论基于 Giscus，需要 GitHub 账号。登录后即可在文章底部发表评论。

**Q: 桌面宠物是什么？**
A: 一个 SVG 吉祥物组件，会追踪鼠标位置（眼动），点击它会触发粒子特效，长时间不动会进入睡眠模式。

**Q: 我能用这个模板搭自己的博客吗？**
A: 可以。项目是 MIT 开源的，fork 后修改 `content/blog/` 下的文章、`app/projects/page.tsx` 的项目列表、`app/about/page.tsx` 的个人信息即可。

---

## 谁适合看这个

- **想搭个人技术主页的开发者**：可以直接参考或 fork 改造
- **对 AI + 前端感兴趣的同行**：博客里有 27 篇实战文章
- **想了解 Next.js 16 App Router 的人**：项目本身就是 App Router 的实战案例
- **面试官 / 招聘方**：About 页面有完整的技能矩阵和项目经历

---

## 关于我

我是**肖恩沃尔特**（Sean Walter），一个从测试工程师正在转型为 AI 独立开发者的程序员。

我相信：测试不是验证代码的手段，而是理解产品的视角。AI 不是替代人的工具，而是放大能力的杠杆。

- GitHub: [Dream22180971](https://github.com/Dream22180971)
- Twitter/X: [@sean_walter0717](https://x.com/sean_walter0717)
- 博客: [seanwalter.top](https://seanwalter.top)

---

## License

[MIT](./LICENSE)
