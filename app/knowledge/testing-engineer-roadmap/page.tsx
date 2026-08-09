import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleDashed } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "测试工程师成长路线",
  description: "从测试基本功、Web与App业务测试、自动化工程化，到分布式数据链路、质量体系和AI应用测试的六阶段成长路线。",
  path: "/knowledge/testing-engineer-roadmap",
  tags: ["测试工程师", "成长路线", "自动化测试", "数据测试", "AI测试"],
});

const sections: SectionItem[] = [
  { id: "overview", label: "如何使用" },
  { id: "stage-1", label: "01 测试基本功" },
  { id: "stage-2", label: "02 业务测试" },
  { id: "stage-3", label: "03 自动化工程" },
  { id: "stage-4", label: "04 分布式与数据" },
  { id: "stage-5", label: "05 质量体系" },
  { id: "stage-6", label: "06 AI应用测试" },
  { id: "practice", label: "实践方法" },
];

type Resource = {
  title: string;
  href?: string;
  note: string;
};

type Stage = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  goal: string;
  focus: string[];
  project: string;
  done: string[];
  resources: Resource[];
};

const stages: Stage[] = [
  {
    id: "stage-1",
    number: "01",
    title: "测试基本功",
    subtitle: "先学会发现风险，再学习工具",
    goal: "能够把一段需求转化为结构清楚、可执行、可评审的测试方案，而不是只会照着页面操作。",
    focus: ["需求分析与测试范围", "等价类、边界值、判定表和状态迁移", "用例标题、步骤、预期结果与优先级", "缺陷描述、证据收集、复现与根因沟通"],
    project: "选择登录或订单模块，完成需求拆解、测试点、用例、缺陷单和测试报告的完整交付。",
    done: ["能说明为什么测、测什么和不测什么", "用例能够被其他测试人员直接执行", "能够按业务影响而不是个人感觉划分优先级"],
    resources: [
      { title: "软件测试基础教程", note: "规划中" },
      { title: "测试用例设计实战教程", note: "规划中" },
      { title: "需求评审与缺陷管理手册", note: "规划中" },
    ],
  },
  {
    id: "stage-2",
    number: "02",
    title: "Web / App 业务测试",
    subtitle: "把页面、接口和数据看成一条业务链",
    goal: "能够独立负责一个 Web 或 App 功能，从用户操作一直验证到接口、数据库和异常状态。",
    focus: ["业务流程、页面状态和异常分支", "接口契约、鉴权、数据准备与断言", "浏览器、设备、分辨率和网络兼容", "SQL查询、日志定位与移动端调试"],
    project: "完成一个登录—下单—取消订单流程的 Web/App 测试，覆盖接口、数据和兼容性。",
    done: ["能从页面问题继续定位到接口或数据层", "能覆盖正常、异常、边界、权限和状态流转", "能使用SQL、日志和抓包信息提供定位证据"],
    resources: [
      { title: "接口测试实战手册", href: "/knowledge/api-testing-manual", note: "现有手册" },
      { title: "兼容性测试实战手册", href: "/knowledge/compatibility-testing-manual", note: "现有手册" },
      { title: "ADB 命令使用手册", href: "/knowledge/adb-commands", note: "工具速查" },
      { title: "企业级数据库命令手册", href: "/knowledge/database-commands", note: "工具速查" },
    ],
  },
  {
    id: "stage-3",
    number: "03",
    title: "自动化测试工程化",
    subtitle: "从会写脚本到能稳定回归",
    goal: "把稳定、重复、价值高的测试场景沉淀为可维护的自动化资产，并接入持续集成。",
    focus: ["Python、pytest、fixture与测试数据管理", "接口客户端封装和分层断言", "Playwright页面对象与稳定定位", "失败报告、并行执行、环境配置和CI门禁"],
    project: "为一个业务模块建立接口与UI自动化回归，做到一条命令执行并输出可定位的报告。",
    done: ["自动化用例可以重复运行且互不依赖", "失败信息能区分环境、脚本和产品问题", "知道哪些场景值得自动化，哪些应保留人工验证"],
    resources: [
      { title: "接口测试实战手册", href: "/knowledge/api-testing-manual", note: "pytest与CI章节" },
      { title: "E2E 数据一致性测试实战手册", href: "/knowledge/e2e-data-consistency-testing", note: "现有手册" },
      { title: "接口自动化测试教程", note: "规划中" },
      { title: "Playwright 自动化测试教程", note: "规划中" },
    ],
  },
  {
    id: "stage-4",
    number: "04",
    title: "分布式系统与数据链路",
    subtitle: "验证最终一致，而不只验证请求成功",
    goal: "面对微服务、缓存、消息队列、数据仓库和批处理链路，能够设计跨系统的一致性测试。",
    focus: ["服务调用、超时、重试、幂等与补偿", "缓存、消息队列和最终一致性", "ETL全量与增量、映射、聚合和对账", "性能瓶颈、安全边界与故障恢复"],
    project: "验证订单取消后的库存、优惠券、退款、消息事件和ETL报表，形成全链路对账脚本。",
    done: ["能画出数据和状态流转图", "能验证重复、延迟、乱序和补跑场景", "能用控制总额、明细抽样和异常差集定位数据问题"],
    resources: [
      { title: "E2E 数据一致性测试实战手册", href: "/knowledge/e2e-data-consistency-testing", note: "现有手册" },
      { title: "ETL 数据测试体系", href: "/knowledge/etl-testing-manual", note: "本次上线" },
      { title: "性能压测与性能分析实战手册", href: "/knowledge/performance-testing-analysis", note: "现有手册" },
      { title: "安全测试实战手册", href: "/knowledge/security-testing-manual", note: "现有手册" },
    ],
  },
  {
    id: "stage-5",
    number: "05",
    title: "测试架构与质量体系",
    subtitle: "从执行测试升级为经营质量",
    goal: "能够基于业务风险制定测试策略，设计质量门禁、可观测指标和团队级测试资产。",
    focus: ["风险驱动的测试策略和分层测试", "质量指标、发布准入和回归范围", "日志、指标、链路追踪和线上质量", "测试资产治理、评审机制和效能度量"],
    project: "为一个真实项目设计质量保障方案，包括风险矩阵、分层测试、CI门禁、指标看板和复盘机制。",
    done: ["能解释测试投入与业务风险的对应关系", "能用数据说明质量变化而不是只汇报用例数", "能让质量保障流程在团队内稳定运行"],
    resources: [
      { title: "测试策略与质量门禁教程", note: "规划中" },
      { title: "可观测性与线上质量手册", note: "规划中" },
      { title: "测试效能度量与复盘手册", note: "规划中" },
    ],
  },
  {
    id: "stage-6",
    number: "06",
    title: "AI 应用测试",
    subtitle: "验证概率性输出是否可信、可控、可追溯",
    goal: "能够测试大模型、RAG、Agent和OCR等AI应用，并建立自动评估与人工审核结合的质量闭环。",
    focus: ["数据集、基准答案、评分规则和置信度", "生成用例的测试点覆盖、优先级比例与脚本Check", "RAG检索质量、幻觉、引用和权限边界", "Agent工具调用、任务完成率、安全和人工接管"],
    project: "建立一套AI生成测试用例的评估流程：机器校验格式与覆盖，人工审核业务正确性和置信度。",
    done: ["能为概率性输出定义可重复的评估标准", "能区分机器校验和人工判断的边界", "能跟踪准确率、覆盖率、拒答率、误报率和人工通过率"],
    resources: [
      { title: "AI生成测试用例的人工审核实战", href: "/blog/ai-generated-test-cases-human-review", note: "现有文章" },
      { title: "AI 应用测试体系教程", note: "规划中" },
      { title: "RAG 与 Agent 测试手册", note: "规划中" },
      { title: "OCR 数据质量测试手册", note: "规划中" },
    ],
  },
];

export default function TestingEngineerRoadmapPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge" target="_blank" rel="noopener noreferrer" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回知识库
      </Link>
      <KnowledgeLayout sections={sections}>
        <header className="mb-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-neon-cyan">Learning Roadmap</p>
          <h1 className="mb-3 text-3xl font-bold text-text-primary md:text-4xl">测试工程师成长路线</h1>
          <p className="mb-6 max-w-3xl text-lg leading-8 text-text-secondary">这不是一张需要一次学完的技能清单，而是一条从“会执行测试”走向“能设计质量体系和验证AI应用”的实践路线。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>6 个成长阶段</span><span>现有手册直接关联</span><span>每阶段都有实践产出与完成标准</span></div>
        </header>

        <section id="overview" data-knowledge-section className="mb-14">
          <SectionHeader number="00" title="如何使用这条路线" subtitle="以能力和项目产出为准，不以看完文章为准" />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="先评估"><p>从能够独立完成的阶段开始。已经具备的能力可以跳过，但建议用“完成标准”重新校验。</p></Card>
            <Card title="边学边做"><p>每个阶段选择一个真实业务项目，把知识转化为测试方案、脚本、报告或质量机制。</p></Card>
            <Card title="持续回看"><p>后面的数据、架构和AI测试会反过来提升前面的用例设计能力，路线允许循环学习。</p></Card>
          </div>
        </section>

        {stages.map((stage) => (
          <section key={stage.id} id={stage.id} data-knowledge-section className="mb-14">
            <SectionHeader number={stage.number} title={stage.title} subtitle={stage.subtitle} />
            <Card title="阶段目标"><p>{stage.goal}</p></Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card title="重点能力"><BulletList items={stage.focus} /></Card>
              <Card title="阶段实践"><p>{stage.project}</p><h4 className="mb-2 mt-5 font-semibold text-text-primary">完成标准</h4><BulletList items={stage.done} /></Card>
            </div>
            <ResourceList resources={stage.resources} />
          </section>
        ))}

        <section id="practice" data-knowledge-section className="mb-14">
          <SectionHeader number="→" title="贯穿六阶段的实践方法" subtitle="每学一项，就留下一个可以复用的工程资产" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="建议保留的作品"><BulletList items={["需求分析与风险矩阵", "测试点、用例和缺陷报告", "接口与UI自动化项目", "数据对账脚本与质量报告", "项目测试策略和质量看板", "AI评估集、评分规则与人工审核记录"]} /></Card>
            <Card title="判断是否真正掌握"><BulletList items={["能够向别人讲清楚方法适用的场景和限制", "能够在新项目中独立复现，而不是照抄示例", "能够用数据或证据证明测试结果", "能够沉淀模板、脚本和检查清单供团队复用"]} /></Card>
          </div>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return <div className="mb-5 flex items-start gap-4 border-b-2 border-space-border pb-4"><span className="mt-1 font-mono text-sm text-neon-cyan">{number}</span><div><h2 className="text-xl font-bold text-text-primary">{title}</h2><p className="mt-1 text-sm text-text-secondary">{subtitle}</p></div></div>;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary"><h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>{children}</div>;
}

function BulletList({ items }: { items: readonly string[] }) {
  return <ul className="mt-3 list-disc space-y-2 pl-5">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function ResourceList({ resources }: { resources: readonly Resource[] }) {
  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-space-border">
      <div className="border-b border-space-border bg-space-card/50 px-5 py-3 text-sm font-semibold text-text-primary">对应知识库内容</div>
      <div className="divide-y divide-space-border">
        {resources.map((resource) => {
          const content = <><span className="flex items-center gap-2">{resource.href ? <CheckCircle2 className="h-4 w-4 text-neon-cyan" /> : <CircleDashed className="h-4 w-4 text-text-secondary" />}<span>{resource.title}</span></span><span className="flex items-center gap-2 text-xs text-text-secondary">{resource.note}{resource.href && <ArrowUpRight className="h-3.5 w-3.5" />}</span></>;
          return resource.href ? <Link key={resource.title} href={resource.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 px-5 py-3 text-sm text-text-primary transition-colors hover:bg-neon-cyan/5 hover:text-neon-cyan">{content}</Link> : <div key={resource.title} className="flex items-center justify-between gap-4 px-5 py-3 text-sm text-text-secondary">{content}</div>;
        })}
      </div>
    </div>
  );
}
