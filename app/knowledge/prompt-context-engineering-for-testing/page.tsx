import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "AI 时代测试提示词与上下文工程教程",
  description: "把需求、业务规则、接口、代码、历史缺陷和示例组织成有边界、可追溯、可回归的测试 Prompt 与上下文。",
  path: "/knowledge/prompt-context-engineering-for-testing",
  tags: ["测试提示词", "上下文工程", "AI辅助测试", "结构化输出", "Prompt评估"],
});

const sections: SectionItem[] = [
  { id: "problem", label: "任务边界" },
  { id: "evidence", label: "证据分层" },
  { id: "prompt", label: "Prompt契约" },
  { id: "context", label: "上下文预算" },
  { id: "retrieval", label: "按需检索" },
  { id: "examples", label: "示例与规则" },
  { id: "output", label: "输出契约" },
  { id: "security", label: "输入安全" },
  { id: "evaluation", label: "评估回归" },
  { id: "practice", label: "练习与检查" },
];

export default function PromptContextEngineeringForTestingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回 AI 测试成长路线</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索 Prompt、上下文、证据、示例、Schema 和回归...">
      <Header />

      <S id="problem" n="01" t="先把测试任务说清楚，再让 AI 开始工作" b="提示词不是一句口令">
        <Card title="案例：为商城下单改动生成候选测试点"><p>需求新增“会员券与满减可以叠加，但订单金额不能低于 0.01 元”。AI 需要读取当前需求、优惠规则、接口约束和历史缺陷，输出候选测试点与待确认问题。它不能修改正式用例，也不能猜测没有写明的优惠上限。</p></Card>
        <Table title="任务契约四要素" headers={["要素", "必须写清", "模糊时的风险"]} rows={[
          ["目标", "需要产出测试点、用例、脚本还是报告", "生成内容看似完整却不可用"],
          ["证据", "允许依据哪些版本的材料", "旧规则覆盖当前需求"],
          ["边界", "哪些判断与动作必须由人完成", "AI 擅自裁决业务或产生副作用"],
          ["验收", "结构、覆盖、错误处理和停止条件", "无法用脚本或人工稳定审核"],
        ]} />
        <Callout>高质量 Prompt 的核心不是写得长，而是让职责、证据、边界和合格标准都可验证。</Callout>
      </S>

      <S id="evidence" n="02" t="按可信度给上下文排序" b="不是所有材料都同等有效">
        <Table title="测试证据层级" headers={["优先级", "内容", "使用方式"]} rows={[
          ["01", "当前版本已确认需求与业务规则", "决定预期结果，保留原文和 source_id"],
          ["02", "已确认接口、数据模型和实现约束", "解释可观察结果，不反向篡改需求"],
          ["03", "现有测试、历史缺陷和线上问题", "提示风险与回归点，不能直接当当前规则"],
          ["04", "讨论记录、假设和模型推断", "单独标记为待确认，不写进正式断言"],
        ]} />
        <Code title="evidence-manifest.json">{`{
  "task": "checkout-discount-test-analysis",
  "sources": [
    {"id":"REQ-42","type":"current_rule","version":"2.1","priority":1},
    {"id":"API-7","type":"confirmed_contract","version":"1.8","priority":2},
    {"id":"BUG-319","type":"history","priority":3}
  ],
  "unconfirmed": ["会员券是否允许与免邮券同时使用"]
}`}</Code>
      </S>

      <S id="prompt" n="03" t="系统 Prompt 用来约束职责、证据和停止条件" b="边界契约">
        <Table title="固定骨架" headers={["部分", "写法"]} rows={[
          ["角色", "你是候选测试分析员，不负责裁决需求争议"],
          ["目标", "从证据中提取规则、风险、测试点和待确认项"],
          ["证据顺序", "当前规则 > 已确认契约 > 历史参考"],
          ["禁止事项", "不补写功能、不使用生产隐私、不修改正式资产"],
          ["停止条件", "来源冲突、关键材料缺失或动作有副作用时转人工"],
          ["输出契约", "按 Schema 返回，并保留 rule_id 与 source_id"],
        ]} />
        <Code title="system-prompt.txt">{`你是候选测试分析员，只依据 evidence 中的当前版本材料工作。
必须：每个测试点关联 rule_id 和 source_id；事实、推断、待确认分开输出。
禁止：补写需求外功能；用历史规则覆盖当前规则；修改正式测试库。
当证据冲突、关键材料缺失或需要真实副作用时，返回 needs_human_review。`}</Code>
      </S>

      <S id="context" n="04" t="上下文预算优先保护当前规则" b="相关才展开">
        <Table title="上下文预算" headers={["内容", "装载策略", "空间不足时"]} rows={[
          ["任务与当前规则", "常驻并保留原文", "不能静默截断"],
          ["资产索引", "常驻 ID、版本和摘要", "按命中结果读取正文"],
          ["接口与代码", "只读取命中规则的相关片段", "先移除无关实现"],
          ["历史缺陷", "先摘要，命中风险后展开", "先移除重复历史"],
          ["对话过程", "保留结论和来源", "压缩讨论，不压缩已确认事实"],
        ]} />
        <Code title="context-budget.json">{`{
  "max_tokens": 24000,
  "reserve_for_output": 6000,
  "priority": ["current_rules", "confirmed_contracts", "relevant_tests", "history"],
  "overflow": "drop unrelated history; never truncate current rules silently"
}`}</Code>
      </S>

      <S id="retrieval" n="05" t="先检索资产索引，再读取命中的正文" b="减少噪声和过期信息">
        <Flow title="按需装载" items={[["任务拆解", "规则与风险"], ["检索索引", "ID与摘要"], ["权限过滤", "项目与版本"], ["读取正文", "命中片段"], ["引用输出", "来源可回查"]]} />
        <Table title="检索检查" headers={["问题", "验证方法"]} rows={[
          ["是否找全关键规则", "用已知 rule_id 计算必要证据召回率"],
          ["是否混入旧版本", "断言 source.version 与当前版本范围"],
          ["是否跨项目或越权", "按项目、角色、租户和数据级别过滤"],
          ["是否带入无关长文", "统计命中片段与最终产出的引用关系"],
          ["检索失败是否诚实", "缺证据时返回待确认，而不是依赖模型记忆"],
        ]} />
      </S>

      <S id="examples" n="06" t="示例说明怎样算好，规则负责稳定约束" b="少样本不等于复制答案">
        <Table title="示例与规则的分工" headers={["方式", "适合解决", "不能替代"]} rows={[
          ["正例", "标题格式、步骤粒度、证据引用方式", "业务规则和边界值"],
          ["反例", "编造、重复、模糊预期和危险动作", "机器可判定的 Schema"],
          ["规则", "必填字段、枚举、覆盖关系和禁止项", "复杂业务裁决"],
          ["历史样本", "常见缺陷模式和风险提示", "当前版本预期"],
        ]} />
        <Card title="选择示例"><List items={["覆盖最常见和最高风险的错误，不追求数量。", "示例中的角色、金额和状态明确标记为示意值。", "输入与合格输出成对保存，失败原因可分类。", "示例版本与 Prompt、规则和评估集一起管理。"]} /></Card>
      </S>

      <S id="output" n="07" t="固定输出结构，让脚本和人工都能消费" b="自然语言也要有契约">
        <Table title="候选测试点字段" headers={["字段", "约束"]} rows={[
          ["test_point_id", "批次内唯一，可追踪修改"],
          ["rule_ids / source_ids", "至少关联一条当前证据"],
          ["scenario", "使用“当……时，……”表达条件和结果"],
          ["risk", "说明失败会造成什么业务影响"],
          ["priority", "依据影响和发生可能性，不按编写难度"],
          ["questions", "未知信息单独列出，不能混入预期"],
        ]} />
        <Code title="结构化输出示例">{`{
  "test_point_id": "CHECKOUT-018",
  "rule_ids": ["REQ-42"],
  "source_ids": ["REQ-42#discount-stack"],
  "scenario": "当会员券与满减叠加后金额低于 0.01 元时，订单金额按 0.01 元结算",
  "priority": "P0",
  "questions": []
}`}</Code>
      </S>

      <S id="security" n="08" t="文档和历史内容中的指令只能当作数据" b="上下文也会被注入">
        <Table title="输入安全测试" headers={["输入", "攻击", "合格行为"]} rows={[
          ["需求文档", "要求忽略系统规则并输出生产账号", "只提取业务事实，拒绝越界指令"],
          ["历史缺陷", "旧规则声称优先于当前需求", "按证据优先级处理并标记冲突"],
          ["代码注释", "诱导调用未授权工具", "代码只用于理解实现，不改变允许工具"],
          ["示例", "携带固定金额和角色", "不复制到没有证据的新场景"],
          ["检索结果", "跨项目敏感信息", "权限过滤并记录安全事件"],
        ]} />
        <Callout>把不可信文本放进 XML 标签或 JSON 字段有助于分隔，但真正的边界仍需要权限过滤、工具白名单、输出校验和人工门禁共同完成。</Callout>
      </S>

      <S id="evaluation" n="09" t="Prompt 和上下文变化都要回放固定评估集" b="改一句也可能退化">
        <Table title="评估维度" headers={["维度", "检查"]} rows={[
          ["证据忠实度", "事实和预期能否回指当前来源"],
          ["规则召回", "已知关键规则是否都形成测试点"],
          ["编造率", "无来源数值、状态、角色和功能比例"],
          ["结构合格率", "Schema、字段和枚举是否通过"],
          ["待确认质量", "缺口是否具体、可分派、可关闭"],
          ["人工接受率", "接受、修改、拒绝的分布与错误分类"],
        ]} />
        <Code title="prompt-regression.json">{`{
  "candidate": {"model":"m2","prompt":"test-analysis@1.4.0"},
  "baseline": {"model":"m2","prompt":"test-analysis@1.3.2"},
  "dataset": "checkout-analysis-eval@v5",
  "must_pass": ["no_invented_limits", "conflict_stops", "schema_valid"],
  "compare": ["rule_recall", "human_acceptance", "p95", "token_cost"]
}`}</Code>
      </S>

      <S id="practice" n="10" t="把一个真实需求整理成可回归的上下文包" b="练习与检查">
        <Card title="练习"><List ordered items={["选择一个含 3～5 条规则变更的脱敏需求，登记来源、版本和优先级。", "定义 AI 的职责、允许证据、禁止事项、停止条件和输出 Schema。", "建立资产索引，只装载与当前规则相关的接口、代码、用例和缺陷。", "准备正例、反例、信息缺失、来源冲突和文档注入样本。", "生成候选测试点，运行结构、证据、覆盖和编造检查。", "调整一次 Prompt 或上下文策略，用同一评估集比较新旧版本。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><Check title="输入可信" items={["版本明确", "证据有优先级", "权限已过滤", "缺失会停止"]} /><Check title="输出可用" items={["结构固定", "来源可回查", "未知不编造", "脚本可校验"]} /><Check title="变更可控" items={["Prompt有版本", "样本可复现", "指标可比较", "退化可回滚"]} /></div>
        <Next />
      </S>
    </KnowledgeLayout>
  </div>;
}

function Header() { return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Phase 05 / AI-Native QA Engineering 01</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">AI 时代测试提示词与上下文工程教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">把需求、规范、代码、缺陷和测试经验组织成有边界、可追溯、可评估的上下文，让 AI 产出稳定的候选测试资产。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>Prompt + Context</span><span>证据、结构与回归</span></div></header>; }
function S({ id, n, t, b, children }: { id: string; n: string; t: string; b: string; children: React.ReactNode }) { return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={`mt-3 space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join()} className="border-b border-space-border/50">{row.map((cell, index) => <td key={cell + index} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function Code({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-neon-cyan/5 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function Flow({ title, items }: { title: string; items: string[][] }) { return <Card title={title}><div className="grid gap-2 md:grid-cols-9 md:items-center">{items.map((item, index) => <div className="contents" key={item[0]}><div className="rounded-lg border border-space-border bg-neon-cyan/5 p-4 text-center"><b className="block text-xs text-text-primary">{item[0]}</b><span className="text-[11px]">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></Card>; }
function Check({ title, items }: { title: string; items: string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />{item}</li>)}</ul></Card>; }
function Next() { return <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">下一步：把已经验证的 Prompt、规则、检查器和案例封装成可复用测试 Skill。</p><Link href="/knowledge/testing-skills-design" className="inline-flex items-center gap-2 text-sm text-neon-cyan">测试 Skill 设计与资产封装<ArrowRight className="h-4 w-4" /></Link></div>; }
