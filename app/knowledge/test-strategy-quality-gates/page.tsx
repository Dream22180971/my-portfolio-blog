import Link from "next/link";
import { Activity, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "测试策略与质量门禁教程",
  description: "围绕商城大促版本，学习风险驱动测试策略、分层验证、质量门禁、发布判断、线上观察和质量复盘。",
  path: "/knowledge/test-strategy-quality-gates",
  tags: ["测试策略", "质量门禁", "风险测试", "发布准入", "质量体系", "测试架构"],
});

const sections: SectionItem[] = [
  { id: "start", label: "接手版本" },
  { id: "risk", label: "识别风险" },
  { id: "scope", label: "制定策略" },
  { id: "layers", label: "分层验证" },
  { id: "environment", label: "环境与数据" },
  { id: "criteria", label: "准入与准出" },
  { id: "gates", label: "质量门禁" },
  { id: "release", label: "发布判断" },
  { id: "online", label: "线上质量" },
  { id: "practice", label: "复盘与练习" },
];

const riskRows: string[][] = [
  ["重复下单或重复扣款", "用户资金、订单和库存同时受影响", "极高", "P0：幂等、支付回调、补偿"],
  ["优惠计算错误", "用户多付或平台损失", "高", "P0：门槛、叠加、精度和退款"],
  ["高峰期无法提交", "大面积用户无法完成交易", "高", "P0：容量、超时、降级和恢复"],
  ["库存与订单不一致", "超卖、少卖或履约失败", "高", "P0：并发扣减、回滚和对账"],
  ["订单备注显示异常", "局部体验受影响，不阻断交易", "低", "P2：长度、字符和页面展示"],
];

const strategyRows: string[][] = [
  ["订单创建", "规则复杂且直接影响交易", "单元 + 接口 + E2E", "重复提交、库存临界点、金额与状态"],
  ["优惠计算", "分支多、边界多、改动频繁", "单元 + 接口", "公式、门槛、叠加顺序、精度"],
  ["支付回调", "异步、重复、结果可能延迟", "接口 + 集成 + 故障演练", "幂等、乱序、超时、补偿"],
  ["下单页面", "用户关键路径，需要真实浏览器", "组件 + E2E", "表单、提示、主流程和兼容性"],
  ["活动高峰", "流量激增，依赖链路长", "性能 + 容量 + 可观测性", "吞吐、延迟、错误率和降级"],
];

const layerRows: string[][] = [
  ["单元测试", "金额公式、状态规则、库存判断", "反馈快、组合多", "不证明服务集成和真实页面正确"],
  ["接口测试", "订单、优惠、库存和权限契约", "覆盖业务规则与异常", "不覆盖浏览器交互"],
  ["集成测试", "数据库、缓存、消息和支付回调", "验证跨组件协作", "环境准备成本较高"],
  ["E2E 测试", "用户从选商品到下单成功", "最接近真实业务", "执行慢，不适合穷举规则"],
  ["线上观察", "真实流量、依赖和长尾问题", "发现测试环境无法复现的问题", "只能在防护和回滚能力就绪后使用"],
];

const criteriaRows: string[][] = [
  ["进入系统测试", "需求规则已确认；核心接口可用；测试环境稳定；基础数据就绪"],
  ["进入完整回归", "冒烟通过；P0 阻塞缺陷清零；版本范围没有继续变化"],
  ["允许发布", "P0/P1 回归通过；性能达标；剩余风险已评估并有负责人"],
  ["结束观察", "核心指标稳定；没有新增高风险告警；回滚窗口结束"],
];

const gateRows: string[][] = [
  ["提交代码", "Lint、类型、单元测试", "错误立即反馈给开发", "任何失败都阻断"],
  ["合并请求", "接口契约、核心回归、安全扫描", "阻止高风险改动进入主干", "P0/P1 检查失败阻断"],
  ["部署测试环境", "冒烟、数据库迁移、配置检查", "确认版本具备测试条件", "主流程或迁移失败阻断"],
  ["发布生产", "回归结论、性能、安全、风险审批", "确认可以承担真实业务流量", "阻断项清零且回滚就绪"],
  ["发布后", "错误率、延迟、订单成功率、对账", "及时止损并确认版本稳定", "超过阈值自动告警或回滚"],
];

const releaseRows: string[][] = [
  ["阻断发布", "重复扣款、订单丢失、越权、核心链路不可用", "风险不可接受，必须修复并回归"],
  ["有条件发布", "低频兼容问题、非核心展示异常", "明确影响范围、规避方案、负责人和修复时间"],
  ["允许发布", "核心回归通过，性能和安全达标", "保留监控、灰度和回滚计划"],
];

const metricRows: string[][] = [
  ["结果指标", "订单成功率、支付成功率、线上缺陷", "用户最终是否成功完成业务"],
  ["过程指标", "缺陷发现阶段、修复时长、回归耗时", "质量问题是否被更早、更快处理"],
  ["防护指标", "门禁拦截次数、回滚次数、告警恢复时间", "质量机制是否真正发挥作用"],
  ["资产指标", "稳定自动化覆盖、失效用例、数据准备耗时", "测试资产是否可持续维护"],
];

export default function TestStrategyQualityGatesPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=quality-architecture" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回质量体系与测试架构模块
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索测试策略与门禁关键词...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Quality Architecture / Tutorial 20</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">测试策略与质量门禁教程</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">从“把用例执行完”走向“把有限资源投入最高风险，并为发布决定提供证据”。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>商城大促版本</span><span>策略 + 门禁 + 线上闭环</span></div>
        </header>

        <section id="start" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="接手一次商城大促版本" badge="先看业务变化" />
          <Card title="这次版本改了什么">
            <p>商城将在周五晚开启限时大促：新增会员券叠加规则，库存服务支持高并发扣减，支付回调增加重试机制，下单页面也更换了确认弹窗。活动流量预计是平时的 8 倍。</p>
          </Card>
          <ReleaseContextFigure />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="业务目标"><p>活动期间用户可以顺利下单，优惠正确，不能重复扣款或超卖。</p></Card>
            <Card title="版本变化"><p>规则、服务、页面和流量同时变化，风险会在不同层级相互影响。</p></Card>
            <Card title="测试任务"><p>不是平均测试所有内容，而是优先证明高风险链路可以安全发布。</p></Card>
          </div>
          <Callout>测试策略不是一张固定模板。它要回答：这次版本最怕什么、怎样发现、由谁验证、何时完成，以及什么结果会阻断发布。</Callout>
        </section>

        <section id="risk" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="先把最不能发生的问题排在前面" badge="风险决定投入" />
          <RiskAssessmentFigure />
          <TableCard title="商城大促风险清单" headers={["风险", "业务影响", "等级", "优先验证"]} rows={riskRows} />
          <Card title="判断风险时回答三个问题"><BulletList ordered items={["发生后会影响多少用户、资金或业务数据？", "这次改动是否让问题更容易发生？", "现有自动化、监控和回滚是否能及时发现并止损？"]} /></Card>
          <Callout>优先级不能只看“发生概率”。重复扣款即使概率很低，影响也足以阻断发布；备注显示异常即使容易复现，也不应该挤占核心交易验证时间。</Callout>
        </section>

        <section id="scope" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="把风险转换成测试策略" badge="说明测什么和怎么测" />
          <StrategyCanvasFigure />
          <TableCard title="为每个高风险对象选择验证方式" headers={["测试对象", "为什么重要", "验证层级", "重点场景"]} rows={strategyRows} />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="策略里必须写清"><BulletList items={["本次测试范围和明确不测的内容。", "高风险功能及对应验证方法。", "环境、数据、人员和时间依赖。", "自动化、人工、性能和安全测试安排。", "准入、准出和发布判断标准。"]} /></Card>
            <Card title="策略不是用例清单"><BulletList items={["用例描述具体场景怎样执行。", "策略说明为什么投入、如何分层和怎样判断完成。", "需求变化后先更新风险，再调整用例范围。", "时间不足时按风险缩减，不随机删除用例。"]} /></Card>
          </div>
        </section>

        <section id="layers" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="把问题放在最合适的层级验证" badge="越靠下反馈越快" />
          <TestLayerFigure />
          <TableCard title="同一条下单链路的分层验证" headers={["层级", "主要验证", "优势", "限制"]} rows={layerRows} />
          <Card title="优惠金额为什么不只用 E2E 测试">
            <p>优惠规则可能有几十种组合。如果全部通过浏览器执行，反馈慢且难定位。更合理的做法是用单元测试穷举金额公式、接口测试验证业务契约，只保留少量 E2E 用例确认用户真实流程。</p>
          </Card>
          <Callout>分层不是追求某个固定比例。哪一层最容易稳定、快速地暴露当前风险，就优先在哪一层建立主要验证。</Callout>
        </section>

        <section id="environment" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="提前准备环境、数据和依赖" badge="可测性也是质量" />
          <EnvironmentFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="环境检查"><BulletList items={["版本、配置和数据库脚本保持对应。", "库存、优惠、支付和消息服务可以观察。", "第三方依赖准备真实联调与可控替身。", "日志、指标和链路追踪包含业务 ID。", "故障注入只在隔离的测试环境执行。"]} /></Card>
            <Card title="数据检查"><BulletList items={["准备普通、边界、高风险和异常数据。", "账号、商品、优惠券和库存可以重复创建。", "并行测试使用唯一标识，避免相互污染。", "资金和订单数据只能在专用环境操作。", "清理脚本按测试标识精确执行，禁止全表清理。"]} /></Card>
          </div>
          <Callout>一个版本“无法测试”，通常不是测试人员多等一会就能解决。缺少日志、数据工厂或依赖控制时，要把可测性缺口作为版本风险明确提出。</Callout>
        </section>

        <section id="criteria" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="用准入和准出条件控制节奏" badge="条件不满足就停" />
          <CriteriaFlowFigure />
          <TableCard title="每个阶段开始和结束前都要满足条件" headers={["阶段", "必须满足"]} rows={criteriaRows} />
          <Card title="为什么不能边改边做完整回归"><p>版本范围持续变化时，已经通过的结果可能立即失效。先用冒烟确认版本基本可测，等核心改动稳定后再进入完整回归，可以减少重复劳动，也让测试结论对应明确版本。</p></Card>
          <Callout>准入条件保护测试效率，准出条件保护发布质量。条件要能检查、能留证据，不能写成“基本稳定”“问题不大”。</Callout>
        </section>

        <section id="gates" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="把关键检查变成质量门禁" badge="失败自动阻断" />
          <QualityGateFigure />
          <TableCard title="商城项目的五道质量门禁" headers={["阶段", "自动或人工检查", "目的", "阻断规则"]} rows={gateRows} />
          <CodeBlock title="质量门禁示意">{`quality_gates:
  pull_request:
    - lint
    - type_check
    - unit_tests
    - api_contract_tests
  staging:
    - database_migration_check
    - smoke_tests
    - p0_regression
  production:
    - release_approval
    - rollback_ready
    - monitoring_ready`}</CodeBlock>
          <Callout>门禁不是检查越多越好。只把稳定、必要、失败后必须处理的检查设为阻断；偶发失败却长期无人修复的门禁，最终只会被团队绕过。</Callout>
        </section>

        <section id="release" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="用证据做发布判断" badge="不只汇报通过率" />
          <ReleaseDecisionFigure />
          <TableCard title="三种发布结论" headers={["结论", "典型情况", "需要采取的行动"]} rows={releaseRows} />
          <Card title="一份发布报告至少说明"><BulletList items={["本次验证对应的版本、范围和环境。", "高风险场景的执行结果和证据。", "未执行、阻塞和失败内容。", "剩余风险、影响范围和临时规避方案。", "灰度、监控、告警和回滚负责人。", "最终建议：阻断、有条件发布或允许发布。"]} /></Card>
          <Callout>“通过率 98%”不能直接说明可以发布。剩下的 2% 如果包含重复扣款，版本必须阻断；如果只是低频展示问题，则可以结合风险有条件发布。</Callout>
        </section>

        <section id="online" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="发布后继续验证真实业务" badge="质量不会在上线时结束" />
          <OnlineQualityFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="上线后重点观察"><BulletList items={["下单成功率、支付成功率和库存扣减成功率。", "接口错误率、P95/P99 延迟和超时。", "重复订单、金额差异和对账异常。", "关键服务资源、消息积压和依赖状态。", "用户投诉、客服反馈和业务异常。"]} /></Card>
            <Card title="发现异常立即行动"><BulletList items={["确认指标变化是否与当前版本相关。", "缩小灰度或关闭活动开关。", "触发降级、限流或回滚。", "保存订单号、时间线、日志和链路证据。", "修复后补充自动化、门禁或告警。"]} /></Card>
          </div>
          <Callout>线上观察不是拿用户做测试。高风险功能必须先在测试环境充分验证；灰度、开关、监控和回滚都就绪后，才能用小范围真实流量确认系统表现。</Callout>
        </section>

        <section id="practice" data-knowledge-section className="mb-14">
          <SectionHeader number="10" title="用指标和复盘持续改进质量体系" badge="让机制越来越有效" />
          <TableCard title="不要只统计用例数量" headers={["指标类型", "可以观察什么", "它回答的问题"]} rows={metricRows} />
          <ImprovementLoopFigure />
          <Card title="练习：为商城大促设计质量保障方案">
            <BulletList ordered items={["列出不少于 10 个版本风险，并给出影响、概率和防护能力判断。", "为前 5 个高风险项选择测试层级、数据和验证方法。", "说明本次明确不测的范围以及接受原因。", "设计代码提交、测试环境、生产发布和发布后的质量门禁。", "写出系统测试准入、完整回归准入和生产发布准出条件。", "准备一份包含阻断、有条件发布和允许发布规则的决策表。", "定义 5 个上线观察指标、告警阈值和负责人。", "完成一次复盘，说明哪个问题应该被更早的测试或门禁发现。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <ChecklistCard title="风险有依据" items={["业务影响明确", "改动范围明确", "防护能力明确", "优先级可解释"]} />
            <ChecklistCard title="策略可执行" items={["验证层级明确", "人员时间明确", "环境数据就绪", "准入准出可检查"]} />
            <ChecklistCard title="发布可控制" items={["阻断规则明确", "剩余风险有负责人", "监控告警就绪", "灰度回滚可执行"]} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6">
            <p className="text-sm text-text-secondary">建立发布门禁后，继续学习如何用日志、指标和链路追踪验证线上质量。</p>
            <Link href="/knowledge/observability-testing" className="inline-flex items-center gap-2 text-sm text-neon-cyan">继续学习可观测性测试 <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function SectionHeader({ number, title, badge }: { number: string; title: string; badge: string }) {
  return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{number}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>;
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>;
}

function BulletList({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag className={cn("mt-3 space-y-2 pl-5", ordered ? "list-decimal" : "list-disc")}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>;
}

function TableCard({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly string[][] }) {
  return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-b border-space-border/50 last:border-b-0">{row.map((cell, index) => <td key={`${cell}-${index}`} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>;
}

function CodeBlock({ title, children }: { title: string; children: string }) {
  return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>;
}

function FlowFigure({ id, title, items }: { id: string; title: string; items: readonly (readonly [string, string])[] }) {
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby={id}><figcaption id={id} className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className={cn("grid gap-2 md:items-center", items.length === 4 ? "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]" : "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]")}>{items.map((item, index) => <div key={item[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="block text-sm text-text-primary">{item[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>;
}

function ReleaseContextFigure() {
  return <FlowFigure id="release-context-title" title="一次大促版本同时改变五个风险来源" items={[["业务规则", "优惠叠加"], ["系统链路", "库存与支付"], ["用户页面", "确认弹窗"], ["运行压力", "8 倍流量"], ["交付窗口", "周五上线"]]} />;
}

function RiskAssessmentFigure() {
  const items = [["业务影响", "资金、用户、数据"], ["发生可能", "改动、复杂度、历史"], ["发现能力", "测试、监控、告警"], ["恢复能力", "开关、补偿、回滚"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="risk-assessment-title"><figcaption id="risk-assessment-title" className="mb-5 text-sm font-bold text-text-primary">风险不是一个分数，而是四个问题的共同判断</figcaption><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => <div key={item[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><strong className="my-2 block text-sm text-text-primary">{item[0]}</strong><p className="text-xs text-text-secondary">{item[1]}</p></div>)}</div></figure>;
}

function StrategyCanvasFigure() {
  return <FlowFigure id="strategy-canvas-title" title="从风险到测试策略的五步转换" items={[["变化", "版本改了什么"], ["风险", "哪里最怕出错"], ["方法", "在哪一层验证"], ["资源", "谁在何时完成"], ["标准", "怎样判断可发布"]]} />;
}

function TestLayerFigure() {
  const layers = [["线上观察", "真实业务指标", "w-3/5"], ["E2E", "关键用户路径", "w-3/4"], ["接口与集成", "业务规则和依赖", "w-11/12"], ["单元测试", "公式、边界和状态", "w-full"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="test-layer-title"><figcaption id="test-layer-title" className="mb-5 text-sm font-bold text-text-primary">越靠下反馈越快，越靠上越接近真实运行</figcaption><div className="mx-auto flex max-w-3xl flex-col items-center gap-2">{layers.map((layer, index) => <div key={layer[0]} className={cn("flex items-center justify-between rounded-lg border px-4 py-3", layer[2], index === 0 ? "border-neon-cyan/50 bg-neon-cyan/10" : "border-space-border bg-space-card/50")}><strong className="text-sm text-text-primary">{layer[0]}</strong><span className="text-xs text-text-secondary">{layer[1]}</span></div>)}</div></figure>;
}

function EnvironmentFigure() {
  return <FlowFigure id="environment-title" title="测试结论依赖一条可观察、可控制的验证链路" items={[["版本配置", "知道测的是什么"], ["测试数据", "场景可以重复"], ["依赖服务", "真实或可控替身"], ["日志指标", "失败可以定位"], ["清理恢复", "环境可以复用"]]} />;
}

function CriteriaFlowFigure() {
  return <FlowFigure id="criteria-title" title="每推进一个阶段，都先检查是否具备条件" items={[["开发自测", "代码可验证"], ["系统测试", "版本可测试"], ["完整回归", "范围已稳定"], ["生产发布", "风险可接受"], ["线上观察", "指标已稳定"]]} />;
}

function QualityGateFigure() {
  return <FlowFigure id="quality-gate-title" title="门禁把关键检查放在变更必经之路" items={[["提交", "静态与单元检查"], ["合并", "核心自动化"], ["部署", "迁移与冒烟"], ["发布", "风险与回滚"], ["线上", "指标与告警"]]} />;
}

function ReleaseDecisionFigure() {
  const outcomes = [["阻断", "核心风险未解决", "border-space-border"], ["有条件发布", "低风险且可控制", "border-neon-cyan/40"], ["允许发布", "证据充分、风险可接受", "border-neon-cyan/60"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="release-decision-title"><figcaption id="release-decision-title" className="mb-5 text-sm font-bold text-text-primary">测试结论必须落到明确行动</figcaption><div className="grid gap-3 md:grid-cols-3">{outcomes.map((outcome) => <div key={outcome[0]} className={cn("rounded-lg border bg-space-card/50 p-5 text-center", outcome[2])}><ShieldCheck className="mx-auto mb-3 h-5 w-5 text-neon-cyan" /><strong className="block text-sm text-text-primary">{outcome[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{outcome[1]}</span></div>)}</div></figure>;
}

function OnlineQualityFigure() {
  return <FlowFigure id="online-quality-title" title="灰度发布后用真实指标完成最后一段验证" items={[["小流量灰度", "控制影响范围"], ["观察指标", "成功率与延迟"], ["核对业务", "订单与资金"], ["扩大流量", "逐步验证容量"], ["稳定或回滚", "按阈值行动"]]} />;
}

function ImprovementLoopFigure() {
  const items = [["发现问题", "缺陷、告警、投诉"], ["定位原因", "需求、代码、环境或机制"], ["补充防护", "测试、门禁或监控"], ["验证效果", "指标是否改善"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="improvement-loop-title"><figcaption id="improvement-loop-title" className="mb-5 text-sm font-bold text-text-primary">每个问题都应该让质量防线向前移动</figcaption><div className="grid gap-3 md:grid-cols-4">{items.map((item, index) => <div key={item[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><Activity className="mb-3 h-4 w-4 text-neon-cyan" /><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><strong className="my-2 block text-sm text-text-primary">{item[0]}</strong><p className="text-xs text-text-secondary">{item[1]}</p></div>)}</div></figure>;
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>;
}
