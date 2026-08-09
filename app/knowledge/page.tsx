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
    slug: "e2e-data-consistency-testing",
    title: "E2E 数据一致性测试实战手册",
    subtitle: "10 章全链路指南",
    description: "从页面操作、接口响应到数据库、缓存、消息队列和下游系统的端到端数据一致性测试方法",
    tags: ["E2E 测试", "数据一致性", "Playwright", "消息队列", "自动化测试"],
  },
  {
    slug: "compatibility-testing-manual",
    title: "兼容性测试实战手册",
    subtitle: "10 章实战指南",
    description: "覆盖浏览器、操作系统、移动设备、分辨率、网络、语言数据与版本升级的完整兼容性测试方法",
    tags: ["兼容性测试", "跨浏览器", "移动端", "响应式", "BrowserStack"],
  },
  {
    slug: "security-testing-manual",
    title: "安全测试实战手册",
    subtitle: "10 章实战指南",
    description: "从攻击面、身份认证和越权测试，到 API、业务规则、漏洞交付与上线安全自查的完整方法",
    tags: ["安全测试", "OWASP", "API 安全", "越权", "Web 安全"],
  },
  {
    slug: "api-testing-manual",
    title: "接口测试实战手册",
    subtitle: "10 章实战指南",
    description: "从接口理解、用例设计、鉴权与数据校验，到 Postman 自动化、pytest 框架与 CI 回归的完整接口测试方法",
    tags: ["接口测试", "Postman", "pytest", "API", "自动化测试"],
  },
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
          <Link href="/" target="_blank" rel="noopener noreferrer" className="text-link">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>
      </header>

      <section className="knowledge-list" aria-label="知识手册">
        {knowledgeArticles.map((article, index) => (
          <Link key={article.slug} href={`/knowledge/${article.slug}`} target="_blank" rel="noopener noreferrer" className="knowledge-row">
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
