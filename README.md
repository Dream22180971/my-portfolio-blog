# my-ai-portfolio

一个展示 AI 技术积累、博客文章与项目作品的个人技术网站，深空仪表盘风格。

**在线预览**: https://seanwalter.top

## 功能亮点

- 🎨 深空主题仪表盘风格（`#0a0e17` 深空黑 + `#00d4ff` 信号青）
- 📱 响应式布局，覆盖 Desktop / Tablet / Mobile
- 🚀 5 个核心页面：Home / Projects / Blog / About / Experiments
- 💫 暗色流畅动画、卡片光效、玻璃态导航栏
- 📝 博客文章静态生成，并带有 `sitemap`、`robots`、`manifest` 等基础 SEO 能力
- ✅ 内置基础回归检查，覆盖 metadata、主路由与文章页渲染

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 |
| 图标 | Lucide React |
| 部署 | Vercel |

## 快速启动

```bash
git clone https://github.com/Dream22180971/my-portfolio-blog.git
cd my-portfolio-blog
npm install
npm run dev
```

本地访问：`http://localhost:3000`

## 本地检查

```bash
npm run check
```

这会依次执行：

- `npm run lint`
- `npm run build`
- `npm run verify:site`

## 主要项目

| 项目 | 描述 | 技术栈 |
|------|------|--------|
| VoyageAI | AI 旅行规划助手 | Vue3 + FastAPI |
| rag-knowledge-base-demo | 企业级 RAG 知识库问答 | LangChain + FAISS + Streamlit |
| coze-ecommerce-bot | Coze 电商智能客服机器人 | Coze Agent |
| TestPilotAgent | AI Agent 自动化测试 | Python |
| operation-assistant | AI 运营工具 | TypeScript |

## 部署说明

当前采用 `git push + Vercel` 的直接部署方式。

推荐流程：

```bash
npm run check
git push origin main
```

推送到 `main` 后，Vercel 会自动构建并上线。

## License

MIT
