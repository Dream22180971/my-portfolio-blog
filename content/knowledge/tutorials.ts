export const tutorialTracks = [
  {
    slug: "foundations",
    title: "测试基础",
    eyebrow: "Foundations",
    description: "建立质量风险、测试流程、测试类型和缺陷分析的基础认知。",
    outcome: "能够独立理解需求、识别风险并完成基础测试。",
  },
  {
    slug: "business-testing",
    title: "业务与用例设计",
    eyebrow: "Business Testing",
    description: "把业务规则转化为覆盖完整、表达清楚且可以执行的测试用例。",
    outcome: "能够设计复杂业务场景、边界和异常链路。",
  },
  {
    slug: "automation",
    title: "自动化工程",
    eyebrow: "Automation",
    description: "从接口和 Web 自动化出发，建立可维护的测试代码与持续回归能力。",
    outcome: "能够搭建自动化项目并接入持续集成。",
  },
  {
    slug: "data-systems",
    title: "数据与分布式测试",
    eyebrow: "Data & Systems",
    description: "覆盖数据库、数据链路、消息队列、缓存和分布式系统质量验证。",
    outcome: "能够定位跨系统数据差异和链路故障。",
  },
  {
    slug: "quality-architecture",
    title: "质量体系与测试架构",
    eyebrow: "Quality Architecture",
    description: "从单点测试走向质量度量、测试策略、平台建设和团队质量机制。",
    outcome: "能够设计面向交付全流程的质量保障体系。",
  },
  {
    slug: "ai-testing",
    title: "AI 应用测试",
    eyebrow: "AI Testing",
    description: "面向大模型、RAG、智能体和 AI 数据链路建立新的评估与审核方法。",
    outcome: "能够验证 AI 输出的准确性、稳定性与业务可信度。",
  },
] as const;

export type TutorialTrackSlug = (typeof tutorialTracks)[number]["slug"];

export type TutorialStatus = "planned" | "published";

export type Tutorial = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  track: TutorialTrackSlug;
  level: "入门" | "进阶" | "专项";
  status: TutorialStatus;
  order: number;
  href?: string;
};

export const tutorials: readonly Tutorial[] = [
  {
    slug: "software-testing-foundations",
    title: "软件测试基础教程",
    subtitle: "测试基础",
    description: "从质量风险、测试流程和常见测试类型开始，建立完整的软件测试认知。",
    track: "foundations",
    level: "入门",
    status: "planned",
    order: 1,
  },
  {
    slug: "test-case-design",
    title: "测试用例设计实战教程",
    subtitle: "需求到用例",
    description: "使用等价类、边界值、判定表和状态迁移，把业务需求转化为可执行用例。",
    track: "business-testing",
    level: "入门",
    status: "planned",
    order: 2,
  },
  {
    slug: "sql-database-testing",
    title: "SQL 与数据库测试教程",
    subtitle: "查询到对账",
    description: "从测试数据准备、SQL 查询，到业务数据核对、差异定位和自动化校验。",
    track: "data-systems",
    level: "进阶",
    status: "planned",
    order: 3,
  },
  {
    slug: "api-test-automation",
    title: "接口自动化测试教程",
    subtitle: "pytest + CI",
    description: "完成请求封装、数据驱动、分层断言、测试报告和持续集成的完整项目。",
    track: "automation",
    level: "进阶",
    status: "planned",
    order: 4,
  },
  {
    slug: "playwright-test-automation",
    title: "Playwright 自动化测试教程",
    subtitle: "Web E2E",
    description: "围绕真实业务流程，学习稳定定位、页面对象、测试数据和失败诊断。",
    track: "automation",
    level: "进阶",
    status: "planned",
    order: 5,
  },
];

export function getTutorialTrack(slug: string) {
  return tutorialTracks.find((track) => track.slug === slug);
}

export function getTutorialsByTrack(track: TutorialTrackSlug) {
  return tutorials.filter((tutorial) => tutorial.track === track).sort((a, b) => a.order - b.order);
}
