import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "AI 测试资产生产与人机审核教程",
  description: "从 SRS 提取、系统 Prompt、上下文证据和任务拆解，到候选用例、机器 Check、100 条人工审核案例、版本回归与失败恢复。",
  path: "/knowledge/ai-testing-workflow-orchestration",
  tags: ["AI辅助测试", "上下文工程", "测试用例生成", "人工审核", "质量门禁"],
});

const sections: SectionItem[] = [
  { id: "goal", label: "生产目标" },
  { id: "evidence", label: "材料与证据" },
  { id: "prompt", label: "系统Prompt" },
  { id: "context", label: "上下文预算" },
  { id: "pipeline", label: "生产流水线" },
  { id: "contract", label: "输出契约" },
  { id: "checks", label: "机器Check" },
  { id: "human", label: "人工审核" },
  { id: "versions", label: "版本追溯" },
  { id: "regression", label: "评估集回归" },
  { id: "recovery", label: "失败恢复" },
  { id: "practice", label: "练习与检查" },
];

export default function AiTestingAssetProductionPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回 AI 测试成长路线</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索 SRS、Prompt、用例生成、机器检查和人工审核...">
      <Header />
      <S id="goal" n="01" t="目标不是生成更多文字，而是生产可信测试资产" b="候选不等于正式">
        <Table title="一次对话为什么不够" headers={["缺口", "表现", "工程解法"]} rows={[
          ["输入不完整", "漏表格、旧规则混入或图片文字未提取", "先做元素计数、证据分层和来源 ID"],
          ["过程不可追", "不知道哪条规则产生哪条用例", "rule_id → risk_id → case_id 全链路映射"],
          ["质量不可控", "格式漂亮但业务错误、重复或编造", "确定性 Check + 风险分层人工审核"],
          ["中断不可恢复", "上下文丢失后只能重新生成", "每一步产物落盘并设置检查点"],
          ["版本不可复用", "每次面对旧用例重新开始", "新增、复用、修改、回归和废弃分开记录"],
        ]} />
        <Callout>AI 输出的第一版统一叫“候选资产”。只有证据、机器检查、人工裁决和版本记录齐全后，才能进入正式测试库。</Callout>
      </S>

      <S id="evidence" n="02" t="先证明输入完整，再讨论 Prompt 好不好" b="文档是证据">
        <Flow title="材料进入模型前的五步" items={[["原始材料", "DOCX / PDF / 图片"], ["元素提取", "正文 / 表格 / 图片"], ["结构重建", "章节 / 页码 / 顺序"], ["完整性检查", "计数 / 抽样 / 差异"], ["证据注册", "source_id / version"]]} />
        <Table title="材料证据层级" headers={["层级", "作用", "处理原则"]} rows={[
          ["当前权威规则", "决定本版本预期", "优先完整保留，不能被摘要或历史覆盖"],
          ["已确认接口与实现", "解释约束和可观察结果", "只读取命中规则的相关部分"],
          ["历史缺陷与旧用例", "提示风险和回归点", "只作为参考，不直接变成当前预期"],
          ["待确认记录", "暴露材料缺口与冲突", "指定负责人和关闭条件"],
        ]} />
        <Card title="SRS 提取验收"><List items={[
          "源文档与结构化结果的段落、表格、图片数量能够对账。",
          "表格保留行列关系，图片 OCR 结果不能覆盖原始证据。",
          "金额、时限、状态和权限等高风险章节必须抽样回看。",
          "空白、格式不支持或提取失败时明确报错，不能静默跳过。",
        ]} /></Card>
      </S>

      <S id="prompt" n="03" t="系统 Prompt 是边界契约，不是万能咒语" b="职责、证据、停止条件">
        <Table title="系统 Prompt 的固定骨架" headers={["部分", "必须写清"]} rows={[
          ["职责", "提取规则、风险与候选用例，不裁决业务争议"],
          ["证据顺序", "当前规则 > 已确认接口/实现 > 历史参考"],
          ["允许工具", "检索、结构校验和无副作用分析"],
          ["停止条件", "来源冲突、材料缺失、真实副作用或敏感数据"],
          ["输出契约", "事实、推断、待确认分栏，并符合固定 Schema"],
        ]} />
        <Code title="system-prompt.txt">{`你是候选测试分析员，只依据 evidence 中的当前版本材料工作。
必须：每条规则保留 source_id；未知数值进入 questions；输出符合 JSON Schema。
禁止：补写需求外功能；用旧规则覆盖当前规则；直接修改正式用例库；执行生产副作用。
当证据冲突、必需材料缺失或动作超出 allowed_tools 时，返回 needs_human_review。`}</Code>
        <Callout>少样本示例负责说明“怎样算好”，Schema 和脚本负责稳定约束。示例不能替代规则，更不能把示例中的金额、角色和状态复制到新项目。</Callout>
      </S>

      <S id="context" n="04" t="上下文按任务按需装载" b="相关才展开">
        <Table title="上下文预算" headers={["内容", "预算策略", "溢出时"]} rows={[
          ["资产索引", "常驻 ID、版本和摘要", "保留索引，按需读取正文"],
          ["当前权威证据", "优先保留原文", "不得静默截断"],
          ["相关代码与现有测试", "只读取命中规则的文件", "先丢无关实现"],
          ["历史缺陷与旧用例", "摘要优先，命中风险再展开", "先丢重复历史"],
          ["本轮结构化产物", "保留结论，压缩对话过程", "保留 source_id 可回查"],
        ]} />
        <Code title="context-budget.json">{`{
  "max_tokens": 24000,
  "reserve_for_output": 6000,
  "priority": ["current_rules", "confirmed_contracts", "relevant_tests", "history"],
  "overflow": "drop unrelated history; never truncate current rules silently"
}`}</Code>
      </S>

      <S id="pipeline" n="05" t="六步流水线，每一步都有可验收产物" b="一步一产物">
        <Table title="测试资产生产流程" headers={["步骤", "AI 负责", "人工负责", "正式产物"]} rows={[
          ["规则提取", "逐条提取并保留来源", "确认歧义和测试边界", "规则注册表、待确认项"],
          ["测试点与风险", "组合正常、异常、边界、权限和历史模式", "判断风险是否适用", "测试点、风险与回归点"],
          ["候选用例", "按规则和风险生成结构化草稿", "抽查业务、数据与优先级", "候选用例批次"],
          ["机器门禁", "执行 Schema、覆盖、冲突和重复检查", "判断告警是否需要修订", "检查报告"],
          ["人工审核", "聚类差异、提供证据摘要", "接受、修改、拒绝或待确认", "审核账本"],
          ["版本沉淀", "汇总新增、复用、修改、回归和废弃", "决定进入哪个资产层", "版本总结与正式库"],
        ]} />
        <Callout>任务拆开后，任何一步失败都能判断是输入漏了、风险没识别、生成失真，还是审核规则不清；不需要把整批内容重新生成。</Callout>
      </S>

      <S id="contract" n="06" t="先固定输出契约，再谈表达质量" b="脚本和人都能消费">
        <Table title="候选用例最小字段" headers={["字段", "约束"]} rows={[
          ["case_id / batch_id", "版本和批次内唯一，可反查原始候选"],
          ["rule_ids / risk_ids", "至少关联一条规则或风险来源"],
          ["title", "采用“当……时，……”并包含可观察结果"],
          ["precondition", "账号、状态、数据量和环境明确"],
          ["steps / expected", "步骤可重复，预期有证据且可以判定"],
          ["priority", "依据业务损失，不依据编写难度"],
          ["source", "新增、复用、修改、回归或废弃"],
          ["questions", "不确定内容进入待确认，不能混入断言"],
        ]} />
        <Code title="候选用例结构示意">{`{
  "case_id": "LOGIN-047",
  "rule_ids": ["RULE-AUTH-03"],
  "title": "当已退出用户重放旧 Token 时，接口拒绝且会话不恢复",
  "priority": "P0",
  "source": "new",
  "questions": []
}`}</Code>
      </S>

      <S id="checks" n="07" t="机器 Check 只处理确定性问题" b="快筛，不替业务裁决">
        <Table title="五道机器门禁" headers={["门禁", "检查", "失败动作"]} rows={[
          ["Schema", "必填字段、枚举、长度和未知字段", "结构失败直接退回"],
          ["证据冲突", "金额、状态、时限、权限与规则注册表比对", "标记冲突，禁止自动改写"],
          ["需求追溯", "每条确定规则是否至少有一条证据用例", "输出未覆盖规则并阻断定稿"],
          ["重复与孤立", "语义相似、无来源、废弃残留和编号重复", "进入人工合并或补来源"],
          ["安全与分布", "真实隐私、生产操作、优先级异常分布", "硬失败或人工复核"],
        ]} />
        <Callout>“规则覆盖率 100%”只说明登记的规则都有用例，不代表规则注册表没有漏模块。覆盖数字永远要和人工风险评审一起解释。</Callout>
      </S>

      <S id="human" n="08" t="人工把 100 条候选变成正式资产" b="按证据裁决">
        <Table title="人工审核四种结论" headers={["结论", "适用情况", "必须记录"]} rows={[
          ["接受", "业务正确、可执行且证据完整", "审核人、规则版本和批次"],
          ["修改后接受", "方向正确，但数据、步骤或预期不完整", "修改字段和原因"],
          ["拒绝", "编造、重复、业务错误或危险操作", "错误代码与证据"],
          ["待确认", "规则缺失、冲突或权限口径不明", "问题、负责人和关闭条件"],
        ]} />
        <Card title="审核顺序"><List ordered items={[
          "先看 P0 资金、权限、隐私和状态一致性，再看普通功能。",
          "核对规则与来源，不接受模型自报置信度作为证据。",
          "检查可执行性、优先级和测试点满足情况。",
          "把稳定错误回流脚本，把业务差异回流示例和规则库。",
        ]} /></Card>
        <Link href="/blog/ai-generated-test-cases-human-review" className="mb-4 flex flex-col gap-2 rounded-xl border border-neon-cyan/35 bg-neon-cyan/5 p-5 transition-colors hover:border-neon-cyan/70 md:flex-row md:items-center md:justify-between">
          <span><strong className="block text-base text-text-primary">配套案例：100 条 AI 候选用例审核账本</strong><span className="mt-1 block text-sm leading-6 text-text-secondary">查看模块分布、9 类错误、10 条 Before/After 样例、机器 Check 和回流指标。</span></span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm text-neon-cyan">阅读案例<ArrowRight className="h-4 w-4" /></span>
        </Link>
      </S>

      <S id="versions" n="09" t="输入、产物和审核都按版本隔离" b="禁止覆盖历史">
        <Flow title="版本化生产闭环" items={[["V1 资产", "规则与用例"], ["V2 差异", "增删改"], ["增量生产", "复用与修改"], ["审核入库", "保留裁决"], ["版本总结", "差异与指标"]]} />
        <Table title="版本总结最少包含" headers={["对象", "需要记录"]} rows={[
          ["输入", "需求、接口、代码、历史缺陷和证据版本"],
          ["生成", "模型、系统 Prompt、示例、参数和批次"],
          ["用例", "新增、复用、修改、回归和废弃数量"],
          ["审核", "接受、修改、拒绝、待确认及错误分类"],
          ["资产", "回填的规则、脚本、案例和下版检查点"],
        ]} />
      </S>

      <S id="regression" n="10" t="Prompt、模型和规则的每次变化都要回放固定评估集" b="改一句也会退化">
        <Table title="锁定评估集至少覆盖" headers={["样本桶", "必须证明"]} rows={[
          ["正常规则", "规则提取、格式和用例可执行"],
          ["信息缺失", "诚实待确认，不编造数值和状态"],
          ["来源冲突", "保留证据并暂停，不静默选边"],
          ["长上下文", "当前规则不被无关历史挤掉"],
          ["文档注入", "材料中的指令只作为数据处理"],
          ["历史缺陷", "迁移风险而不把旧规则写成当前预期"],
        ]} />
        <Code title="prompt-regression.json">{`{
  "candidate": {"model":"m2","prompt":"test-assets@1.4.0"},
  "baseline": {"model":"m2","prompt":"test-assets@1.3.2"},
  "dataset": "asset-production-eval@v5",
  "must_pass": ["no_invented_limits", "conflict_stops", "schema_valid"],
  "compare": ["rule_recall", "human_acceptance", "p95", "token_cost"]
}`}</Code>
        <Callout>待确认数量增加不一定是退化。如果编造数下降，说明流程更诚实地暴露了需求缺口。关键是按错误类型和风险分桶解释变化。</Callout>
      </S>

      <S id="recovery" n="11" t="流程中断后从最近合格产物继续" b="恢复而不是重写">
        <Table title="恢复步骤" headers={["步骤", "动作"]} rows={[
          ["盘点", "确认规则、风险、用例、检查和审核分别完成到哪里"],
          ["定位", "找到最后一个验收通过的产物和版本"],
          ["重载", "只读取下一步需要的证据和资产索引"],
          ["续跑", "不覆盖已确认内容，保存 recovery_id"],
          ["复核", "确认恢复前后口径和来源映射一致"],
        ]} />
        <Card title="必须人工接管"><List items={["来源互相冲突", "生成需求外功能或未定义参数", "大批量覆盖正式资产", "上下文口径前后不一致", "涉及真实敏感数据或外部副作用"]} /></Card>
      </S>

      <S id="practice" n="12" t="用一个小版本跑通完整生产闭环" b="练习与检查">
        <Card title="练习"><List ordered items={[
          "选择一个含 3～5 条规则变更的脱敏需求，完成文档元素对账。",
          "写出系统 Prompt、证据顺序、停止条件和输出 Schema。",
          "依次产出规则、风险、候选用例、机器检查和人工审核账本。",
          "故意加入缺失数值、来源冲突、重复用例和文档注入，验证门禁。",
          "中断一次流程，从最近合格产物恢复。",
          "调整一条 Prompt 规则，用锁定集比较新旧版本并决定发布或回滚。",
        ]} /></Card>
        <Check items={["材料未静默丢失", "当前证据优先", "未知信息不编造", "每条用例可追溯", "机器和人工职责分开", "审核结论有账本", "版本可以回放", "中断能够恢复"]} />
        <Next />
      </S>
    </KnowledgeLayout>
  </div>;
}

function Header() { return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">AI Assisted Testing / Step 02</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">AI 测试资产生产与人机审核教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">从可靠材料开始，把系统 Prompt、上下文证据、候选生成、机器 Check、人工审核和版本回归连成一条可以恢复、审计和持续改进的生产线。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>12 个章节</span><span>Prompt + 工作流</span><span>机器门禁 + 人工审核</span></div></header>; }
function S({ id, n, t, b, children }: { id: string; n: string; t: string; b: string; children: React.ReactNode }) { return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={`mt-3 space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join()} className="border-b border-space-border/50">{row.map((cell, index) => <td key={cell + index} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function Code({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Flow({ title, items }: { title: string; items: string[][] }) { return <Card title={title}><div className="grid gap-2 md:grid-cols-9 md:items-center">{items.map((item, index) => <div className="contents" key={item[0]}><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><b className="block text-xs text-text-primary">{item[0]}</b><span className="text-[11px]">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></Card>; }
function Check({ items }: { items: string[] }) { return <Card title="完成检查">{items.map((item) => <div key={item} className="mb-2 flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />{item}</div>)}</Card>; }
function Next() { return <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">下一步：把已经验证的规范、检查器和数据能力封装为可复用 Skill。</p><Link href="/knowledge/testing-skills-design" className="inline-flex items-center gap-2 text-sm text-neon-cyan">测试 Skill 与知识资产封装<ArrowRight className="h-4 w-4" /></Link></div>; }
