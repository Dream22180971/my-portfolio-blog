# my-ai-portfolio

一个展示 AI 技术积累与项目作品的个人作品集网站，深空仪表盘风格，支持中英双语切换。

**在线预览**: https://seanwalter.vercel.app

## 功能亮点

- 🎨 深空主题仪表盘风格（#0a0e17 深空黑 + #00d4ff 信号青）
- 🌐 中英双语自由切换（Language Toggle）
- 📱 完美响应式布局（Desktop / Tablet / Mobile）
- 🚀 6 个完整页面（首页 / Projects / Blog / About / Experiments / Contact）
- 💫 暗色流畅动画，卡片光效，玻璃态导航栏

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + 自定义深空主题 |
| 图标 | Lucide React |
| 部署 | Vercel + Cloudflare Workers |

## 快速启动

```bash
# 克隆仓库
git clone https://github.com/Dream22js0971/my-portfolio-blog.git
cd my-portfolio-blog

# 安装依赖
npm install

# 本地开发
npm run dev

# 打开 http://localhost:3000
```

## 主要项目

| 项目 | 描述 | 技术栈 |
|------|------|--------|
| VoyageAI | AI 旅行规划助手 | Vue3 + FastAPI |
| rag-knowledge-base-demo | 企业级 RAG 知识库问答 | LangChain + FAISS + Streamlit |
| coze-ecommerce-bot | Coze 电商智能客服机器人 | Coze Agent |
| TestPilotAgent | AI Agent 自动化测试 | Python |
| operation-assistant | AI 运维工具 | TypeScript |

## 部署说明

`main` 是唯一的开发主分支：

- 推送到 `main` 后，Vercel 会基于 `main` 自动构建部署。
- GitHub Actions 会把 `main` 自动同步到 `cloudflare/workers-autoconfig`。
- Cloudflare 分支仅作为部署镜像分支，不再承载独立业务代码。

```bash
git push origin main
```

如果需要本地验证 Cloudflare 构建流程，可使用：

```bash
npm run preview
npm run deploy
```

## License

MIT