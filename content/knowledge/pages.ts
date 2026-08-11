/**
 * 知识库独立页面注册表（不在 tutorials 教程体系内的知识页面）。
 *
 * 这是手册、工具速查和落地页的单一数据源：
 * - `app/knowledge/page.tsx` 的目录列表从这里派生
 * - `app/sitemap.ts` 的 referencePages 从这里派生
 * - `KnowledgeLayout` 的「最近更新」从这里与 tutorials 合并查找
 *
 * 新增手册时只需在这里加一条记录，目录、sitemap、时效标识会自动生效。
 */

export type KnowledgeReferencePage = {
  path: string;
  title: string;
  updated: string;
};

export type TestingManual = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: readonly string[];
  updated: string;
};

export type ToolReference = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: readonly string[];
  updated: string;
};

/** 知识库落地页（目录类） */
export const knowledgeLandingPages: readonly KnowledgeReferencePage[] = [
  { path: "/knowledge/tutorials", title: "系统教程", updated: "2026-08-11" },
  { path: "/knowledge/testing-engineer-roadmap", title: "测试工程师成长路线", updated: "2026-08-11" },
];

/** 实战手册 */
export const testingManuals: readonly TestingManual[] = [
  {
    slug: "etl-testing-manual",
    title: "数据质量测试实战",
    subtitle: "12 章数据质量指南",
    description: "从数据抽取、转换、加载和字段映射，到增量同步、控制总额、数据质量与金融AI数据链路的完整测试体系",
    tags: ["ETL测试", "数据质量", "数据仓库", "SQL", "金融数据"],
    updated: "2026-08-10",
  },
  {
    slug: "e2e-data-consistency-testing",
    title: "端到端数据一致性测试实战手册",
    subtitle: "10 章全链路指南",
    description: "从页面操作、接口响应到数据库、缓存、消息队列和下游系统的端到端数据一致性测试方法",
    tags: ["E2E 测试", "数据一致性", "Playwright", "消息队列", "自动化测试"],
    updated: "2026-08-10",
  },
  {
    slug: "compatibility-testing-manual",
    title: "兼容性测试实战手册",
    subtitle: "10 章实战指南",
    description: "覆盖浏览器、操作系统、移动设备、分辨率、网络、语言数据与版本升级的完整兼容性测试方法",
    tags: ["兼容性测试", "跨浏览器", "移动端", "响应式", "BrowserStack"],
    updated: "2026-08-10",
  },
  {
    slug: "security-testing-manual",
    title: "安全测试实战手册",
    subtitle: "10 章实战指南",
    description: "从攻击面、身份认证和越权测试，到 API、业务规则、漏洞交付与上线安全自查的完整方法",
    tags: ["安全测试", "OWASP", "API 安全", "越权", "Web 安全"],
    updated: "2026-08-10",
  },
  {
    slug: "api-testing-manual",
    title: "接口测试实战手册",
    subtitle: "10 章实战指南",
    description: "从接口理解、用例设计、鉴权与数据校验，到 Postman 自动化、pytest 框架与 CI 回归的完整接口测试方法",
    tags: ["接口测试", "Postman", "pytest", "API", "自动化测试"],
    updated: "2026-08-10",
  },
  {
    slug: "performance-testing-analysis",
    title: "性能压测与性能分析实战手册",
    subtitle: "12 章实战指南",
    description: "面向 Web 接口、数据库、缓存、消息队列、微服务和云原生环境的性能测试实战参考，覆盖压测方案设计、工具选型、监控采集、瓶颈定位和测试报告输出",
    tags: ["性能测试", "压测", "k6", "JMeter", "性能分析"],
    updated: "2026-08-10",
  },
  {
    slug: "reliability-testing-manual",
    title: "可靠性测试实战手册",
    subtitle: "10 章实战指南",
    description: "覆盖可靠性指标、长时间稳定性、故障注入与容错、恢复能力、优雅降级与数据可靠性的可靠性测试实战手册，贯穿支付订单系统案例",
    tags: ["可靠性测试", "稳定性", "故障注入", "容错", "恢复", "SLO"],
    updated: "2026-08-12",
  },
];

/** 工具速查 */
export const toolReferences: readonly ToolReference[] = [
  {
    slug: "linux-commands",
    title: "Linux 命令手册",
    subtitle: "22 章 260+ 命令",
    description: "服务器运维、DevOps自动化、安全审计、性能调优一站式参考，覆盖CentOS/Ubuntu/RHEL，18个企业实战场景",
    tags: ["Linux", "运维", "Docker", "Kubernetes", "DevOps"],
    updated: "2026-08-10",
  },
  {
    slug: "database-commands",
    title: "SQL 命令手册",
    subtitle: "5 大数据库 350+ 命令",
    description: "MySQL/PostgreSQL/Redis/MongoDB/Elasticsearch 企业级命令一站式参考，覆盖连接管理、CRUD、索引优化、备份恢复、高可用、性能调优等场景",
    tags: ["MySQL", "PostgreSQL", "Redis", "MongoDB", "Elasticsearch"],
    updated: "2026-08-10",
  },
  {
    slug: "adb-commands",
    title: "ADB 命令使用手册",
    subtitle: "Android & iOS 设备操控指南",
    description: "Android ADB + iOS libimobiledevice / tidevice 完整参考，120+ 命令覆盖设备管理、应用操控、日志调试、自动化测试等场景",
    tags: ["Android", "iOS", "ADB", "测试"],
    updated: "2026-08-10",
  },
  {
    slug: "claude-code-commands",
    title: "Claude Code 命令手册",
    subtitle: "完整参考手册",
    description: "Claude Code 交互式斜杠命令、终端 CLI、CLI 参数、键盘快捷键、自定义扩展、新特性完整参考，31 个斜杠命令 + 14 个 CLI 命令 + 18 个参数 + 7 个快捷键",
    tags: ["Claude Code", "AI", "CLI", "开发工具"],
    updated: "2026-08-10",
  },
];

/** 全部独立知识页面（落地页 + 手册 + 速查），供 sitemap 与时效标识使用 */
export const knowledgeReferencePages: readonly KnowledgeReferencePage[] = [
  ...knowledgeLandingPages,
  ...testingManuals.map((manual) => ({
    path: `/knowledge/${manual.slug}`,
    title: manual.title,
    updated: manual.updated,
  })),
  ...toolReferences.map((reference) => ({
    path: `/knowledge/${reference.slug}`,
    title: reference.title,
    updated: reference.updated,
  })),
];

/** 按路径查找独立知识页面 */
export function getKnowledgeReferencePage(path: string) {
  return knowledgeReferencePages.find((page) => page.path === path);
}
