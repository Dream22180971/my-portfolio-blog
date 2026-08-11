import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "AI 应用测试体系教程",
  description: "以商城测试用例生成应用为案例，建立评估目标、分层评估集、人工金标、多维评分、机器 Check、人工路由和版本回归体系。",
  path: "/knowledge/ai-application-testing-system",
  tags: ["AI应用测试", "LLM评估", "评估集", "人工金标", "AI回归测试"],
});

const sections: SectionItem[] = [
  { id: "scope", label: "评估目标" },
  { id: "dataset", label: "评估集" },
  { id: "gold", label: "人工金标" },
  { id: "rubric", label: "质量评分" },
  { id: "checks", label: "机器Check" },
  { id: "human", label: "评审路由" },
  { id: "regression", label: "版本回归" },
  { id: "practice", label: "练习与检查" },
];

const dimensionRows = [
  ["正确性", "业务规则和预期是否正确", "退款金额不得超过实付；重复回调只能生效一次"],
  ["相关性", "是否围绕需求与风险", "不生成需求外的积分、直播场景"],
  ["完整性", "关键正常、异常、边界与状态是否覆盖", "库存 0/1、支付超时、重复退款、并发取消"],
  ["可执行性", "前置、数据、步骤、结果是否可观察", "明确订单状态、金额、次数与等待上限"],
  ["可追溯性", "结论能否关联规则证据", "每条高风险断言带 rule_id"],
  ["安全性", "是否建议越权或危险操作", "禁止生产扣款、全表清理和真实用户数据"],
];

export default function AiApplicationEvaluationPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回 AI 测试成长路线</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索评估集、金标、评分、人工路由与回归...">
      <Header />
      <S id="scope" n="01" t="先定义要评估什么，以及什么错误不可接受" b="目标可计算">
        <Card title="贯穿案例"><p>输入一份包含订单、库存、支付、取消与退款的商城需求，让 AI 输出“当……时，……”格式的结构化测试用例。评估重点是它能否守住资金、库存和状态流转风险，而不是一共写了多少条。</p></Card>
        <Table title="评估对象" headers={["层级", "关注点", "典型失败"]} rows={[
          ["输入理解", "是否识别约束和不确定信息", "把暂未定义当成确定规则"],
          ["生成内容", "是否准确、相关、完整", "编造功能、漏掉重复扣款"],
          ["输出结构", "字段和格式是否可消费", "缺前置、步骤、预期或优先级"],
          ["系统组合", "模型、Prompt、检索和工具是否一致", "升级后质量回退"],
          ["安全边界", "是否产生危险建议或敏感信息", "建议使用生产账号或真实扣款"],
        ]} />
        <Card title="先写硬发布标准"><List items={["P0 业务规则正确率 100%，不得出现资金与权限错误建议。", "关键风险召回率达到批准基线，信息不足时必须待确认。", "Schema 通过率和关键样本稳定性达到基线。", "高风险、证据冲突和机器规则失败输出必须进入人工审核。"]} /></Card>
      </S>

      <S id="dataset" n="02" t="建立分层评估集，而不是随手挑十条" b="样本决定结论边界">
        <Table title="商城评估集分层" headers={["分层", "样本例子", "目的"]} rows={[
          ["正常链路", "创建订单→扣库存→支付成功", "验证基础正确性"],
          ["边界", "库存 0/1、金额 0.01、优惠临界值", "验证数值和规则边界"],
          ["异常", "支付超时、回调重复、退款失败", "验证补偿、幂等与错误处理"],
          ["状态流转", "取消与发货并发、退款后重复取消", "验证合法迁移与反向场景"],
          ["信息不足", "未给退款时限或叠加顺序", "验证拒绝猜测并请求澄清"],
          ["安全输入", "需求混入越权指令或敏感数据", "验证边界不会被材料绕过"],
        ]} />
        <Card title="构建步骤"><List ordered items={["从真实需求、历史缺陷和高风险规则收集候选并脱敏。", "按模块、风险、难度、输入质量和失败类型打标签。", "分出开发集与锁定回归集，回归集不用于反复调 Prompt。", "保存 requirement_id、版本、必须覆盖和不可接受错误。", "线上逃逸和人工否决案例评估后进入挑战集。"]} /></Card>
        <Code title="评估样本 JSON">{`{
  "case_id": "ORDER-REFUND-017",
  "input": "已支付订单可取消，退款走异步回调。退款时限未定义。",
  "risk_tags": ["money", "idempotency", "async"],
  "must_cover": ["重复取消", "重复回调", "退款金额一致"],
  "must_not_claim": ["退款一定在5分钟到账"],
  "severity": "P0"
}`}</Code>
      </S>

      <S id="gold" n="03" t="人工金标固定业务底线，不固定唯一措辞" b="关键点金标">
        <Table title="金标需要包含" headers={["元素", "内容"]} rows={[
          ["必须覆盖", "重复取消只退款一次；库存只释放一次；状态最终一致"],
          ["边界", "支付成功与取消并发；回调延迟或重复"],
          ["禁止断言", "需求未给时限时，不得声称 5 分钟到账"],
          ["合格示例", "当同一已支付订单重复取消时，只创建一笔退款"],
          ["证据", "RULE-REFUND-03、BUG-481、规则版本"],
          ["审核信息", "审核人、时间、争议和最终裁决"],
        ]} />
        <Callout>两名审核者先独立标注，再讨论分歧。如果“完整性”长期无法一致判断，应拆成更具体的风险点，而不是用一个模糊总分掩盖争议。</Callout>
      </S>

      <S id="rubric" n="04" t="分别评分正确性、相关性和完整性" b="总分不能遮住红线">
        <Table title="多维评分规则" headers={["维度", "问题", "商城判断"]} rows={dimensionRows} />
        <Code title="分层评分示意">{`final_score =
  0.30 * correctness +
  0.20 * relevance +
  0.25 * completeness +
  0.15 * executability +
  0.10 * traceability

hard_fail if safety_violation or P0_fact_error
# 权重来自本项目风险，不是通用标准`}</Code>
        <Card title="一票否决"><p>一批输出平均 92 分，只要出现“支付失败可以直接把订单改成已支付”这类 P0 错误，也必须阻断，不能用其他维度的高分抵消。</p></Card>
      </S>

      <S id="checks" n="05" t="机器 Check 处理稳定规则" b="快筛，不替业务判断">
        <Table title="适合自动化的检查" headers={["检查", "实现", "失败动作"]} rows={[
          ["Schema", "JSON Schema / Pydantic", "字段缺失直接拒绝"],
          ["标题格式", "检查“当……时，……”和可观察结果", "退回改写"],
          ["规则词典", "金额、状态、次数与 rule_id 对照", "P0 冲突阻断"],
          ["重复", "标题、步骤和语义相似度聚类", "标记人工合并"],
          ["覆盖", "must_cover 与 risk_tags 对照", "缺失进入补生成或人审"],
          ["安全", "敏感字段、生产操作和危险命令", "立即拒绝并记录"],
        ]} />
        <Code title="TypeScript 检查示意">{`function check(candidate: TestCase, sample: EvalSample) {
  const errors: string[] = [];
  if (!candidate.title.startsWith("当") || !candidate.title.includes("时"))
    errors.push("TITLE_FORMAT");
  for (const risk of sample.mustCover)
    if (!candidate.riskTags.includes(risk)) errors.push("MISSING:" + risk);
  if (candidate.environment === "production") errors.push("UNSAFE_ENV");
  return { passed: errors.length === 0, errors };
}`}</Code>
      </S>

      <S id="human" n="06" t="按风险、规则结果和证据进入人工审核" b="路由必须可解释">
        <Table title="评审路由" headers={["条件", "动作"]} rows={[
          ["资金、权限、隐私和不可逆动作", "无论机器分数多高都人工确认"],
          ["规则失败、证据冲突或未知信息", "直接人工复核，不自动改写"],
          ["新模型、新 Prompt 或新业务模块", "提高审核比例直到质量稳定"],
          ["低风险且所有硬规则通过", "按批准比例抽样审核"],
        ]} />
        <Table title="人工结论" headers={["结论", "必须记录"]} rows={[
          ["接受", "审核人、规则版本和证据"],
          ["修改后接受", "修改字段、原因和原始候选"],
          ["拒绝", "错误分类和对应样本"],
          ["待确认", "问题、负责人和关闭条件"],
        ]} />
        <Callout>模型自报的“0.95 置信度”不能作为放行证据。人工结果要回流评估样本、规则和示例，不是只改掉当前文本。</Callout>
      </S>

      <S id="regression" n="07" t="用锁定集比较候选版本与稳定基线" b="评估驱动发布">
        <Flow items={[["锁定评估集", "输入与金标"], ["运行候选版", "固定参数"], ["机器评分", "硬规则与多维分"], ["人工复核", "高风险与差异"], ["发布或回退", "保留报告"]]} />
        <Code title="评估报告最小字段">{`run_id, model_version, prompt_version, knowledge_version
dataset_version, sample_id, random_seed
machine_checks, rubric_scores
human_decision, reviewer, reject_reason`}</Code>
        <Card title="专项职责边界"><p>本篇只负责内容质量与版本比较。Token 成本、P95、容量、漂移监控和降级演练统一放在路线最后的“AI 应用性能、成本与可观测性教程”。</p></Card>
      </S>

      <S id="practice" n="08" t="完成一轮商城 AI 应用评估" b="练习与检查">
        <Card title="练习"><List ordered items={["建立 20 条评估样本，覆盖正常、边界、异常、状态流转、信息不足和安全输入。", "为 5 条 P0 样本制作金标，并让两名审核者独立标注。", "实现 Schema、标题、重复、关键风险和危险操作检查。", "分别统计正确性、相关性、完整性、可执行性和 P0 硬失败。", "设置机器 Check 与人工审核路由，保存四类裁决。", "冻结回归集，比较新旧版本并给出发布或回退结论。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><Check title="评估资产" items={["数据集分层", "金标有版本", "回归集锁定", "线上失败可回流"]} /><Check title="质量判断" items={["多维而非总分", "P0 红线明确", "证据可追溯", "机器与人分工"]} /><Check title="回归交付" items={["版本可复现", "差异可解释", "失败可定位", "报告可追溯"]} /></div>
      </S>
    </KnowledgeLayout>
  </div>;
}

function Header() { return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Phase 01 / AI Quality Foundation 03</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">AI 应用测试体系教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">把评估目标、分层样本、人工金标、机器检查和版本回归连起来，让“回答不错”变成能够解释、复现和发布的质量证据。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>8 个章节</span><span>评估集 + 人工金标</span><span>机器 Check + 版本回归</span></div></header>; }
function S({ id, n, t, b, children }: { id: string; n: string; t: string; b: string; children: React.ReactNode }) { return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={`mt-3 space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join()} className="border-b border-space-border/50">{row.map((cell, index) => <td key={cell + index} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function Code({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function Flow({ items }: { items: string[][] }) { return <Card title="AI 应用评估闭环"><div className="grid gap-2 md:grid-cols-9 md:items-center">{items.map((item, index) => <div className="contents" key={item[0]}><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><b className="block text-xs text-text-primary">{item[0]}</b><span className="text-[11px]">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></Card>; }
function Check({ title, items }: { title: string; items: string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />{item}</li>)}</ul></Card>; }
