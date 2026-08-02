import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "手册",
  description: "软件测试、AI 测试、开发工具等实用知识手册",
  path: "/knowledge",
});

const knowledgeArticles = [
  {
    slug: "performance-testing-analysis",
    title: "性能压测与性能分析实战手册",
    subtitle: "12 章实战指南",
    description: "面向 Web 接口、数据库、缓存、消息队列、微服务和云原生环境的性能测试实战参考，覆盖压测方案设计、工具选型、监控采集、瓶颈定位和测试报告输出",
    tags: ["性能测试", "压测", "k6", "JMeter", "性能分析"],
  },
  {
    slug: "linux-commands",
    title: "Linux 企业级命令手册",
    subtitle: "22 章 260+ 命令",
    description: "服务器运维、DevOps自动化、安全审计、性能调优一站式参考，覆盖CentOS/Ubuntu/RHEL，18个企业实战场景",
    tags: ["Linux", "运维", "Docker", "Kubernetes", "DevOps"],
  },
  {
    slug: "database-commands",
    title: "企业级数据库命令手册",
    subtitle: "5 大数据库 350+ 命令",
    description: "MySQL/PostgreSQL/Redis/MongoDB/Elasticsearch 企业级命令一站式参考，覆盖连接管理、CRUD、索引优化、备份恢复、高可用、性能调优等场景",
    tags: ["MySQL", "PostgreSQL", "Redis", "MongoDB", "Elasticsearch"],
  },
  {
    slug: "adb-commands",
    title: "ADB 命令使用手册",
    subtitle: "Android & iOS 设备操控指南",
    description: "Android ADB + iOS libimobiledevice / tidevice 完整参考，120+ 命令覆盖设备管理、应用操控、日志调试、自动化测试等场景",
    tags: ["Android", "iOS", "ADB", "测试"],
  },
  {
    slug: "claude-code-commands",
    title: "Claude Code 命令手册",
    subtitle: "完整参考手册",
    description: "Claude Code 交互式斜杠命令、终端 CLI、CLI 参数、键盘快捷键、自定义扩展、新特性完整参考，31 个斜杠命令 + 14 个 CLI 命令 + 18 个参数 + 7 个快捷键",
    tags: ["Claude Code", "AI", "CLI", "开发工具"],
  },
];

export default function KnowledgePage() {
  return (
    <div className="editorial-page editorial-page--wide">
      <header className="page-heading-wrap">
        <p className="page-kicker">Knowledge / Field Manuals</p>
        <div>
          <h1 className="page-heading">手册</h1>
          <p className="page-copy">软件测试、AI 测试、开发工具等实用知识沉淀，持续更新中。</p>
          <Link href="/" className="text-link">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>
      </header>

      <section className="knowledge-list" aria-label="知识手册">
        {knowledgeArticles.map((article, index) => (
          <Link key={article.slug} href={`/knowledge/${article.slug}`} className="knowledge-row">
            <span className="project-type">Manual / {String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{article.title}</h2>
              <span className="knowledge-row__subtitle">{article.subtitle}</span>
              <div className="project-row__tags">
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <p>{article.description}</p>
            <span className="text-link">
              阅读手册
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>

      <p className="page-copy">更多知识文章正在整理中...</p>
    </div>
  );
}
