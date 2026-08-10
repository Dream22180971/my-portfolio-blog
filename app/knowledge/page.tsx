import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";
import { getTutorialsByTrack, tutorialTracks } from "@/content/knowledge/tutorials";

export const metadata = buildPageMetadata({
  title: "知识库",
  description: "面向测试工程师的成长路线、系统教程、实战手册与工具速查知识库",
  path: "/knowledge",
});

const testingManuals = [
  {
    slug: "etl-testing-manual",
    title: "ETL 数据测试体系",
    subtitle: "12 章数据质量指南",
    description: "从数据抽取、转换、加载和字段映射，到增量同步、控制总额、数据质量与金融AI数据链路的完整测试体系",
    tags: ["ETL测试", "数据质量", "数据仓库", "SQL", "金融数据"],
  },
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
];

const toolReferences = [
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

const mainTutorialTracks = tutorialTracks.filter((track) => track.slug !== "test-development" && track.slug !== "ai-testing");
const testDevelopmentTutorials = getTutorialsByTrack("test-development");
const aiTestingTutorials = getTutorialsByTrack("ai-testing");

export default function KnowledgePage() {
  return (
    <div className="editorial-page editorial-page--wide">
      <header className="page-heading-wrap">
        <p className="page-kicker">Knowledge Base</p>
        <div>
          <h1 className="page-heading">知识库</h1>
          <p className="page-copy">你可以从成长路线开始系统学习，通过图文教程掌握方法，再按工作场景查阅实战手册和工具命令。</p>
          <Link href="/" className="text-link">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>
      </header>

      <section className="knowledge-roadmap" aria-labelledby="roadmap-heading">
        <div>
          <span className="project-type">Start Here / 01</span>
          <h2 id="roadmap-heading">测试工程师成长路线</h2>
          <p>五个阶段串联测试基础、业务测试、自动化、分布式与数据链路，以及测试架构与质量体系。</p>
        </div>
        <ol className="knowledge-roadmap__stages" aria-label="五阶段学习路线">
          <li>测试基本功</li>
          <li>Web / App 业务测试</li>
          <li>自动化测试工程化</li>
          <li>分布式与数据链路</li>
          <li>测试架构与质量体系</li>
        </ol>
        <Link href="/knowledge/testing-engineer-roadmap" className="text-link">
          查看成长路线
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="knowledge-branch-card" aria-labelledby="test-development-heading">
        <div className="knowledge-branch-card__intro">
          <span className="project-type">Optional Track / SDET</span>
          <h2 id="test-development-heading">测试开发工程师强化支线</h2>
          <p>如果你想从自动化测试继续进阶，可以按照以下路线学习编程、代码级测试、云原生环境和测试平台开发，逐步成长为测试开发工程师。</p>
        </div>
        <ul className="knowledge-branch-card__tasks" aria-label="测试开发强化支线待办">
          {testDevelopmentTutorials.map((tutorial) => (
            <li key={tutorial.slug}>
              <span>{tutorial.title}</span>
              <small>待办</small>
            </li>
          ))}
        </ul>
        <div className="knowledge-branch-card__action">
          <span>{testDevelopmentTutorials.length} 项进阶内容</span>
          <Link href="/knowledge/tutorials?track=test-development" className="text-link">
            查看强化支线
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="knowledge-branch-card" aria-labelledby="ai-testing-heading">
        <div className="knowledge-branch-card__intro">
          <span className="project-type">Optional Track / AI Quality</span>
          <h2 id="ai-testing-heading">AI 测试工程师强化支线</h2>
          <p>先学习如何用 AI 分析需求、生产和校验测试资产，再学习如何评估大模型、OCR、RAG、Agent 与线上 AI 应用，逐步成长为 AI 测试工程师。</p>
        </div>
        <ul className="knowledge-branch-card__tasks" aria-label="AI 测试工程师强化支线内容">
          {aiTestingTutorials.slice(0, 5).map((tutorial) => (
            <li key={tutorial.slug}>
              <span>{tutorial.title}</span>
              <small>{tutorial.status === "published" ? "可学习" : "待办"}</small>
            </li>
          ))}
          {aiTestingTutorials.length > 5 && <li><span>更多测试提效与工程化内容</span><small>+{aiTestingTutorials.length - 5}</small></li>}
        </ul>
        <div className="knowledge-branch-card__action">
          <span>{aiTestingTutorials.filter((tutorial) => tutorial.status === "published").length} 篇可学习 · {aiTestingTutorials.filter((tutorial) => tutorial.status === "planned").length} 项待办</span>
          <Link href="/knowledge/tutorials?track=ai-testing" className="text-link">
            查看 AI 测试支线
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="knowledge-section" aria-labelledby="tutorial-heading">
        <header className="knowledge-section__head">
          <p className="page-kicker">System Tutorials</p>
          <div>
            <h2 id="tutorial-heading">系统教程</h2>
            <p>你可以按学习顺序掌握每项能力，并通过图解原理、贯穿案例、代码演示和练习检查完成实践。</p>
          </div>
        </header>
        <div className="knowledge-tutorial-standard" aria-label="教程内容标准">
          <span>图解原理</span>
          <span>贯穿案例</span>
          <span>代码演示</span>
          <span>练习与检查清单</span>
        </div>
        <div className="knowledge-tutorial-modules" aria-label="系统教程五个主线模块">
          {mainTutorialTracks.map((track, index) => {
            const trackTutorials = getTutorialsByTrack(track.slug);
            const publishedTutorials = trackTutorials.filter((tutorial) => tutorial.status === "published");

            return (
              <article key={track.slug} className="knowledge-tutorial-module">
                <div className="knowledge-tutorial-module__meta">
                  <span className="project-type">Module / {String(index + 1).padStart(2, "0")}</span>
                  <span>{trackTutorials.length === 0 ? "即将补充" : publishedTutorials.length > 0 ? `${publishedTutorials.length} 篇可学习 / 共 ${trackTutorials.length} 篇` : `${trackTutorials.length} 篇即将推出`}</span>
                </div>
                <span className="knowledge-tutorial-module__eyebrow">{track.eyebrow}</span>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <div className="knowledge-tutorial-module__outcome">
                  <span>能力出口</span>
                  <p>{track.outcome}</p>
                </div>
                <ul aria-label={`${track.title}首批教程`}>
                  {trackTutorials.slice(0, 2).map((tutorial) => <li key={tutorial.slug}>{tutorial.title}</li>)}
                  {trackTutorials.length === 0 && <li>更多学习内容即将补充</li>}
                </ul>
                <Link href={`/knowledge/tutorials?track=${track.slug}`} className="text-link">
                  进入模块
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
        <div className="knowledge-tutorial-index-link">
          <p>想查找某篇教程时，可以按分类、关键词或页码浏览完整目录。</p>
          <Link href="/knowledge/tutorials" className="text-link">
            查看全部教程
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <KnowledgeSection
        kicker="Testing Manuals"
        title="实战手册"
        description="围绕具体质量风险和交付场景，提供可以直接执行的测试方法、案例与检查清单。"
        items={testingManuals}
        label="Manual"
        action="阅读手册"
      />

      <KnowledgeSection
        kicker="Tool References"
        title="工具速查"
        description="面向日常开发、测试和排障工作的命令参考，需要时快速定位，不作为成长路线主干。"
        items={toolReferences}
        label="Reference"
        action="查看速查"
      />

      <p className="page-copy knowledge-page-note">你可以先完成测试工程师成长主线，再根据职业目标选择测试开发或 AI 测试强化支线。</p>
    </div>
  );
}

type KnowledgeItem = (typeof testingManuals)[number] | (typeof toolReferences)[number];

function KnowledgeSection({
  kicker,
  title,
  description,
  items,
  label,
  action,
}: {
  kicker: string;
  title: string;
  description: string;
  items: readonly KnowledgeItem[];
  label: string;
  action: string;
}) {
  return (
    <section className="knowledge-section" aria-labelledby={`${label.toLowerCase()}-heading`}>
      <header className="knowledge-section__head">
        <p className="page-kicker">{kicker}</p>
        <div>
          <h2 id={`${label.toLowerCase()}-heading`}>{title}</h2>
          <p>{description}</p>
        </div>
      </header>
      <div className="knowledge-list">
        {items.map((article, index) => (
          <Link key={article.slug} href={`/knowledge/${article.slug}`} className="knowledge-row">
            <span className="project-type">{label} / {String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{article.title}</h2>
              <span className="knowledge-row__subtitle">{article.subtitle}</span>
              <div className="project-row__tags">
                {article.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <p>{article.description}</p>
            <span className="text-link">
              {action}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
