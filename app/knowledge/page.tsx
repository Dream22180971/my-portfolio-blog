import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  SITE_NAME,
  WEBSITE_ID,
  buildPageMetadata,
  getCanonicalUrl,
  serializeJsonLd,
} from "@/lib/site";
import { getTutorialsByTrack, tutorialTracks } from "@/content/knowledge/tutorials";
import {
  testingManuals,
  toolReferences,
  type TestingManual,
  type ToolReference,
} from "@/content/knowledge/pages";

export const metadata = buildPageMetadata({
  title: "知识库",
  description: "面向测试工程师的成长路线、系统教程、实战手册与工具速查知识库",
  path: "/knowledge",
  tags: ["软件测试教程", "自动化测试", "测试开发", "AI 测试", "质量工程"],
});

const mainTutorialTracks = tutorialTracks.filter((track) => track.slug !== "test-development" && track.slug !== "ai-testing");
const testDevelopmentTutorials = getTutorialsByTrack("test-development");
const aiTestingTutorials = getTutorialsByTrack("ai-testing");

const featuredKnowledgeItems = [
  {
    name: "测试工程师成长路线",
    path: "/knowledge/testing-engineer-roadmap",
  },
  {
    name: "软件测试与 AI 测试系统教程",
    path: "/knowledge/tutorials",
  },
  ...testingManuals.map((item) => ({
    name: item.title,
    path: `/knowledge/${item.slug}`,
  })),
  ...toolReferences.map((item) => ({
    name: item.title,
    path: `/knowledge/${item.slug}`,
  })),
];

const knowledgeJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${getCanonicalUrl("/knowledge")}#collection`,
  url: getCanonicalUrl("/knowledge"),
  name: `测试工程与 AI 质量知识库 | ${SITE_NAME}`,
  description: "面向测试工程师和学习者的成长路线、系统教程、实战手册与工具速查。",
  inLanguage: "zh-CN",
  isPartOf: { "@id": WEBSITE_ID },
  about: ["软件测试", "自动化测试", "测试开发", "AI 测试", "RAG 测试", "Agent 测试"].map((name) => ({
    "@type": "Thing",
    name,
  })),
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: featuredKnowledgeItems.length,
    itemListElement: featuredKnowledgeItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: getCanonicalUrl(item.path),
    })),
  },
};

export default function KnowledgePage() {
  return (
    <div className="editorial-page editorial-page--wide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(knowledgeJsonLd) }}
      />
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
          <span className="project-type">Specialization / SDET</span>
          <h2 id="test-development-heading">测试开发工程化路线</h2>
          <p>SDET 是 AI Quality 的工程底座。沿着编程基础、接口与服务自动化、测试基础设施、质量平台到高级质量工程，把测试能力建设成可持续运行的工程体系。</p>
        </div>
        <ul className="knowledge-branch-card__tasks" aria-label="测试开发工程化路线内容">
          {testDevelopmentTutorials.map((tutorial) => (
            <li key={tutorial.slug}>
              <span>{tutorial.title}</span>
              <small>{tutorial.status === "published" ? "可学习" : "待办"}</small>
            </li>
          ))}
        </ul>
        <div className="knowledge-branch-card__action">
          <span>{testDevelopmentTutorials.filter((tutorial) => tutorial.status === "published").length} 篇可学习 · {testDevelopmentTutorials.filter((tutorial) => tutorial.status === "planned").length} 项待办</span>
          <Link href="/knowledge/tutorials?track=test-development" className="text-link">
            查看工程化路线
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="knowledge-branch-card" aria-labelledby="ai-testing-heading">
        <div className="knowledge-branch-card__intro">
          <span className="project-type">Specialization / AI Quality</span>
          <h2 id="ai-testing-heading">AI 测试工程师强化支线</h2>
          <p>从 AI 质量基础开始，依次学习 RAG 与文档智能、Agent 与 MCP、可靠性与安全，再把测试经验封装成 Prompt、Skill 和人机协作工作流。</p>
        </div>
        <ul className="knowledge-branch-card__tasks" aria-label="AI 测试工程师强化支线内容">
          {aiTestingTutorials.slice(0, 5).map((tutorial) => (
            <li key={tutorial.slug}>
              <span>{tutorial.title}</span>
              <small>{tutorial.status === "published" ? "可学习" : "待办"}</small>
            </li>
          ))}
          {aiTestingTutorials.length > 5 && <li><span>继续学习智能体、可靠性与 AI 原生测试工程</span><small>+{aiTestingTutorials.length - 5}</small></li>}
        </ul>
        <div className="knowledge-branch-card__action">
          <span>{aiTestingTutorials.filter((tutorial) => tutorial.status === "published").length} 篇可学习 · {aiTestingTutorials.filter((tutorial) => tutorial.status === "planned").length} 项待办</span>
          <Link href="/knowledge/tutorials?track=ai-testing" className="text-link">
            查看 AI 测试工程师强化支线
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

      <p className="page-copy knowledge-page-note">你可以先完成测试工程师成长主线，再根据职业目标选择测试开发工程化、数据质量或 AI 测试工程师强化支线。</p>
    </div>
  );
}

type KnowledgeItem = TestingManual | ToolReference;

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
