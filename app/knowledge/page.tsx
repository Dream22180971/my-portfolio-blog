import Link from "next/link";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "手册",
  description: "软件测试、AI 测试、开发工具等实用知识手册",
  path: "/knowledge",
});

const knowledgeArticles = [
  {
    slug: "adb-commands",
    title: "ADB 命令使用手册",
    subtitle: "Android & iOS 设备操控指南",
    description: "Android ADB + iOS libimobiledevice / tidevice 完整参考，120+ 命令覆盖设备管理、应用操控、日志调试、自动化测试等场景",
    tags: ["Android", "iOS", "ADB", "测试"],
    icon: "📱",
  },
  {
    slug: "claude-code-commands",
    title: "Claude Code 命令手册",
    subtitle: "完整参考手册",
    description: "Claude Code 交互式斜杠命令、终端 CLI、CLI 参数、键盘快捷键、自定义扩展、新特性完整参考，31 个斜杠命令 + 14 个 CLI 命令 + 18 个参数 + 7 个快捷键",
    tags: ["Claude Code", "AI", "CLI", "开发工具"],
    icon: "📋",
  },
];

export default function KnowledgePage() {
  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary">手册</h1>
        </div>
        <p className="text-text-secondary text-lg">
          软件测试、AI 测试、开发工具等实用知识沉淀，持续更新中
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-4">
        {knowledgeArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/knowledge/${article.slug}`}
            className="card-glow rounded-xl p-6 group block"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0 mt-1">{article.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-bold text-text-primary group-hover:text-neon-cyan transition-colors">
                    {article.title}
                  </h2>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  {article.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="tag tag-cyan">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State for Future Articles */}
      <div className="mt-8 text-center py-12 border border-dashed border-space-border rounded-xl">
        <Search className="w-8 h-8 text-text-secondary mx-auto mb-3 opacity-50" />
        <p className="text-text-secondary text-sm">
          更多知识文章正在整理中...
        </p>
      </div>
    </div>
  );
}
