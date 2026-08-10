import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "从传统自动化到 AI 辅助测试迁移指南",
  description: "盘点并复用 pytest、Playwright、Page Object、Fixture、断言、测试数据与报告资产，通过适配器、质量门禁和人工审批分阶段接入测试 Agent。",
  path: "/knowledge/traditional-automation-to-ai-testing",
  tags: ["AI辅助测试", "pytest", "Playwright", "测试迁移", "测试Agent"],
});

const sections: SectionItem[] = [
  { id: "goal", label: "迁移目标" },
  { id: "inventory", label: "资产盘点" },
  { id: "contract", label: "资产喂给Agent" },
  { id: "adapters", label: "适配器与工具" },
  { id: "roles", label: "脚本与Agent分工" },
  { id: "stages", label: "分阶段迁移" },
  { id: "baseline", label: "回归基线" },
  { id: "guardrails", label: "权限成本人审" },
  { id: "case", label: "贯穿案例" },
  { id: "practice", label: "落地清单" },
];

export default function TraditionalAutomationToAiTestingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回 AI 测试工程师强化支线</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索 pytest、Playwright、适配器与迁移门禁...">
      <Header />

      <S id="goal" n="01" t="迁移不是重写脚本，而是给资产增加可调用接口" b="先复用，再生成">
        <Table title="传统自动化与 AI 辅助测试的职责变化" headers={["能力", "迁移前", "迁移后"]} rows={[
          ["pytest / Playwright", "按固定入口执行回归", "仍是确定性执行器和结果真相源"],
          ["Page Object / Fixture", "由测试代码直接引用", "同时通过目录和 Schema 暴露给 Agent 选择"],
          ["测试工程师", "写脚本、挑范围、分析失败", "定义边界、审批计划、裁决结果并沉淀资产"],
          ["Agent", "不存在或只生成文本", "检索资产、起草计划、调用受控工具、归纳证据"],
        ]} />
        <Callout>贯穿案例是一套商城 checkout 项目：pytest 验证订单 API，Playwright 验证结算页；已有 Page Object、登录 Fixture、订单数据工厂、业务断言和 trace/HTML 报告。目标是让 Agent 复用这些资产完成变更影响分析与候选回归，而不是让它临时重写一套框架。</Callout>
      </S>

      <S id="inventory" n="02" t="先给现有自动化资产建立可审计清单" b="知道有什么才能复用">
        <Table title="checkout 项目资产账本" headers={["资产", "盘点字段", "喂给 Agent 的价值"]} rows={[
          ["pytest 用例", "node_id、marker、依赖服务、平均时长", "按风险与时长选择 API 回归"],
          ["Playwright spec", "test title、tag、project、页面路径", "映射用户旅程与浏览器范围"],
          ["Page Object", "公开方法、页面、前置状态、禁止直接调用的方法", "优先复用稳定操作，不生成脆弱选择器"],
          ["fixtures", "scope、依赖、创建/清理副作用、并发限制", "选择可安全复用的身份与数据准备方式"],
          ["断言", "业务规则 ID、观察面、失败信息", "把“页面出现成功”升级为业务可判定结果"],
          ["测试数据", "Schema、敏感级别、生成器、清理方式", "生成合法且隔离的数据，不读取生产样本"],
          ["trace / report", "run_id、case_id、附件路径、保留期", "失败后基于证据归因，而不是猜测"],
        ]} />
        <Code title="automation-assets.json">{`{
  "schema_version": "1.0",
  "project": "checkout-quality",
  "assets": [
    {
      "id": "pw.checkout.submit",
      "kind": "playwright_test",
      "path": "tests/e2e/checkout.spec.ts",
      "tags": ["checkout", "p0", "smoke"],
      "uses": ["page.checkout", "fixture.authenticatedUser"],
      "side_effect": "creates_order",
      "allowed_envs": ["local", "test"]
    }
  ]
}`}</Code>
        <Card title="盘点时不要做的事"><List items={["不要把代码全文无差别塞入上下文；先提供索引，命中任务后再精读。", "不要把历史失败率直接当成业务优先级；先排除脚本和环境噪声。", "不要把 Fixture 名称当作无副作用承诺；必须记录它会创建、修改和清理什么。", "不要向 Agent 暴露生产账号、Cookie、Token 或脱敏前的真实订单数据。"]} /></Card>
      </S>

      <S id="contract" n="03" t="把代码资产转换成 Agent 能理解的上下文契约" b="索引 → 摘要 → 精读">
        <Flow items={[["资产扫描", "AST/测试列表"], ["能力索引", "ID与标签"], ["任务检索", "规则与变更"], ["按需精读", "相关代码"], ["计划草稿", "资产引用"]]} />
        <Table title="证据优先级" headers={["层级", "内容", "Agent 使用规则"]} rows={[
          ["L0 权威规则", "当前需求、接口契约、业务规则", "决定预期结果；冲突时暂停"],
          ["L1 可执行资产", "pytest、Playwright、断言、Fixture", "证明当前可验证能力"],
          ["L2 运行证据", "trace、截图、日志、HTML/JUnit 报告", "只用于本次运行归因"],
          ["L3 历史参考", "旧用例、旧缺陷、过往报告", "提示风险，不可覆盖当前规则"],
        ]} />
        <Code title="agent-task.json">{`{
  "change": ["RULE-CHECKOUT-17: 优惠券失效后重新计价"],
  "goal": "选择并执行最小回归集",
  "allowed_tools": ["list_tests", "read_asset", "run_test_subset", "read_report"],
  "constraints": {
    "environment": "test",
    "max_runtime_minutes": 12,
    "deny": ["write_production", "delete_data", "edit_baseline"]
  },
  "required_output": ["plan", "asset_ids", "commands", "evidence", "uncertainties"]
}`}</Code>
      </S>

      <S id="adapters" n="04" t="用窄适配器封装执行，而不是开放任意 Shell" b="工具能力小而可控">
        <Table title="最小工具面" headers={["工具", "输入", "输出", "限制"]} rows={[
          ["list_tests", "tag、rule_id、path", "用例 ID、时长、资产依赖", "只读"],
          ["run_pytest_subset", "允许的 node_ids", "exit_code、JUnit、日志位置", "禁止任意参数拼接"],
          ["run_playwright_subset", "允许的 test_ids/project", "结果、trace、截图位置", "只允许 test 环境"],
          ["read_report", "run_id、artifact kind", "结构化失败与附件引用", "路径必须在工作区报告目录"],
          ["propose_patch", "case_id、修改理由", "候选 diff", "必须人工批准后才能写入"],
        ]} />
        <Code title="tools/run_subset.py">{`ALLOWED_NODE_IDS = load_manifest_node_ids()

def run_pytest_subset(node_ids: list[str], env: str) -> dict:
    if env not in {"local", "test"}:
        raise PermissionError("only local/test environments are allowed")
    unknown = sorted(set(node_ids) - ALLOWED_NODE_IDS)
    if unknown:
        raise ValueError({"unknown_node_ids": unknown})

    # 参数来自白名单数组，不接收 Agent 拼接的 shell 字符串
    result = subprocess.run(
        [sys.executable, "-m", "pytest", *node_ids, "--junitxml=reports/junit.xml"],
        check=False,
        timeout=12 * 60,
    )
    return {"exit_code": result.returncode, "report": "reports/junit.xml"}`}</Code>
        <Callout>如果团队通过 MCP 暴露这些工具，MCP 只是调用协议，不自动带来安全性。服务端仍要校验参数 Schema、工作区路径、环境白名单、超时、输出大小和审计日志。</Callout>
      </S>

      <S id="roles" n="05" t="确定性脚本负责事实，Agent 负责选择与解释" b="不要交换职责">
        <Table title="人、Agent、脚本的边界" headers={["任务", "主责", "原因"]} rows={[
          ["列出用例、执行命令、计算覆盖与解析报告", "确定性脚本", "同一输入必须得到稳定、可复查结果"],
          ["根据变更匹配规则与候选资产", "Agent 起草，人工抽查", "需要语义推理，但可能漏选或误选"],
          ["决定 P0 范围、业务预期和是否放行", "测试负责人", "涉及风险接受与业务责任"],
          ["基于 trace 聚合失败证据", "脚本提取，Agent 归纳", "证据要原样保留，解释必须标明推断"],
          ["修改测试代码和基线", "Agent 提案，人工批准", "避免错误修复掩盖真实回归"],
        ]} />
        <Card title="checkout 变更的分工示例"><List ordered items={["脚本从 manifest 中列出关联 RULE-CHECKOUT-17 的 6 条 API 与 E2E 用例。", "Agent 结合 Page Object 方法、Fixture 副作用和历史失败，提出先跑 2 条 pytest + 2 条 Playwright。", "测试负责人确认该范围包含优惠失效、金额重算和重复提交三个风险。", "适配器执行白名单用例并生成 run_id；Agent 只能读取对应报告。", "任何失败先保留 trace 和 JUnit，再由人工裁决产品缺陷、脚本缺陷或环境问题。"]} /></Card>
      </S>

      <S id="stages" n="06" t="四阶段迁移，每阶段都有退出条件" b="先建议，后执行">
        <Table title="渐进式迁移路线" headers={["阶段", "Agent 权限", "交付物", "进入下一阶段的条件"]} rows={[
          ["0 观察", "只读索引与历史报告", "资产账本、重复/缺口清单", "抽样映射准确且无敏感泄露"],
          ["1 建议", "生成回归计划，不执行", "用例集合、理由、预计时长", "固定评估集召回和误选达到团队阈值"],
          ["2 受控执行", "调用白名单测试工具", "run_id、报告、证据摘要", "权限、超时、成本与审计门禁稳定"],
          ["3 候选修改", "生成 patch，不直接合并", "测试增量与回归结果", "人工评审、全量基线和回退演练通过"],
        ]} />
        <Callout>不要按日历自动升级权限。只有上一阶段的质量指标和失败演练都达到门槛，才开放下一类动作；出现越界调用或高风险误判时立即降回只读。</Callout>
      </S>

      <S id="baseline" n="07" t="冻结回归基线，证明迁移没有把质量变成感觉" b="同一批样本对比">
        <Table title="迁移前后都要记录的基线" headers={["指标", "基线定义", "失败动作"]} rows={[
          ["P0 用例召回率", "固定 20 个变更任务中应选 P0 的命中比例", "漏选即阻断权限升级"],
          ["无关用例率", "Agent 选择但专家判定无关的比例", "收紧检索与规则映射"],
          ["结果一致性", "传统命令与工具适配器的 pass/fail 是否一致", "修复适配器，不修改预期"],
          ["失败证据完整率", "失败是否都有日志、trace/report 和业务 ID", "报告不完整不得自动归因"],
          ["人工修订率", "计划、归因和候选 patch 被修改的比例", "定位高频错误并加入评估集"],
          ["成本与 P95 时延", "每任务 Token、测试分钟数、P95 完成时间", "超预算时降级到规则检索或固定冒烟"],
        ]} />
        <Code title="migration-gate.json">{`{
  "dataset": "checkout-migration-eval-v3",
  "thresholds": {
    "p0_recall": 1.0,
    "irrelevant_selection_rate_max": 0.12,
    "adapter_result_match": 1.0,
    "failure_evidence_completeness": 1.0
  },
  "rollback": "disable agent execution and keep deterministic CI"
}`}</Code>
      </S>

      <S id="guardrails" n="08" t="把权限、成本和人工审批做成运行时门禁" b="失败时安全降级">
        <Table title="五道生产边界" headers={["门禁", "规则"]} rows={[
          ["环境", "默认 local/test；生产环境工具不存在，而不是依赖 Prompt 口头禁止"],
          ["身份", "使用短期、最小权限测试身份；凭据由运行环境注入，不进入上下文与日志"],
          ["副作用", "创建订单、发消息、写数据库等动作在工具层标注；高风险动作逐次审批"],
          ["预算", "限制 Token、测试数量、并发、重试和最长运行时间；超限返回部分结果"],
          ["人审", "修改代码、更新截图基线、删除数据、全量回归与发布放行必须人工确认"],
        ]} />
        <Card title="三种降级"><List items={["模型不可用：按 rule_id 和 tag 运行固定冒烟集合。", "上下文证据不足：只输出待确认项，不生成断言或修改。", "成本/时限超标：停止扩展检索，交付已验证资产与未覆盖风险。"]} /></Card>
      </S>

      <S id="case" n="09" t="用一个 checkout 变更跑通完整迁移闭环" b="pytest + Playwright">
        <Card title="变更：优惠券在提交订单瞬间过期"><p>当前规则要求服务端拒绝过期优惠并返回最新应付金额，页面展示价格变化并允许用户确认后重试。风险包括旧价格下单、重复订单和页面/接口金额不一致。</p></Card>
        <Table title="Agent 最终引用的现有资产" headers={["资产 ID", "复用方式", "证据"]} rows={[
          ["py.order.expired_coupon", "直接运行 pytest API 用例", "JUnit + 订单查询日志"],
          ["py.order.idempotency", "复用参数化数据，验证重复确认", "订单数量与幂等键断言"],
          ["page.checkout", "调用 refreshPrice / submit 方法", "不生成新定位器"],
          ["fixture.authenticatedUser", "复用登录状态", "不共享购物车与订单"],
          ["pw.checkout.expired_coupon", "运行既有 Playwright spec", "页面断言 + trace + 接口响应"],
        ]} />
        <Code title="批准后的执行计划">{`plan:
  - run: py.order.expired_coupon
  - run: py.order.idempotency
  - run: pw.checkout.expired_coupon
assertions:
  - "API 返回 COUPON_EXPIRED 与最新 payableAmount"
  - "页面金额与接口 payableAmount 一致"
  - "用户确认重试后只创建一个订单"
artifacts:
  - "reports/junit.xml"
  - "playwright-report/index.html"
  - "test-results/**/trace.zip"
human_gate: "测试负责人检查业务预期与失败归因"`}</Code>
        <Callout>闭环的完成标准不是 Agent 给出“全部通过”的摘要，而是计划引用了真实资产、执行由白名单适配器完成、原始报告可反查、异常有人工结论，并把新发现的遗漏写回资产账本和固定评估集。</Callout>
      </S>

      <S id="practice" n="10" t="用两周试点完成一次可回退迁移" b="检查清单">
        <Card title="实施顺序"><List ordered items={["选一个无生产写入、失败证据完整的 pytest + Playwright 模块。", "生成资产 manifest，并人工核对 Page Object、Fixture、数据和副作用。", "封装只读检索、子集执行和报告读取三个窄工具。", "准备至少 20 个历史变更任务作为回归评估集。", "先让 Agent 只给计划，与专家回归集合对比。", "门禁通过后开放 test 环境的白名单执行。", "记录质量、人工修订、Token、P95 与测试分钟数。", "演练模型故障、超时、越界调用和一键退回确定性 CI。"]} /></Card>
        <Check items={["现有 pytest 与 Playwright 没有被重复重写", "Page Object、Fixture、断言与测试数据都有资产 ID", "trace、JUnit 和 HTML 报告可按 run_id 追溯", "Agent 不能执行任意 Shell", "确定性脚本与 Agent 的职责已分开", "迁移阶段有量化退出条件", "生产、密钥和高副作用动作在工具层隔离", "成本上限、人工审批和降级路线已演练", "传统 CI 始终是可用回退基线"]} />
        <Next />
      </S>
    </KnowledgeLayout>
  </div>;
}

function Header() { return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">AI Testing Roadmap / Step 01</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">从传统自动化到 AI 辅助测试迁移指南</h1><p className="text-lg leading-8 text-text-secondary">不推倒现有 pytest 与 Playwright，而是把经过验证的脚本、数据和失败证据封装为 Agent 能检索、能受控调用、能被人工审计的团队资产。</p></header>; }
function S({ id, n, t, b, children }: { id: string; n: string; t: string; b: string; children: React.ReactNode }) { return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={`mt-3 space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-b border-space-border/50">{row.map((cell, index) => <td key={`${cell}-${index}`} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function Code({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Flow({ items }: { items: string[][] }) { return <Card title="从资产到计划"><div className="grid gap-3 md:grid-cols-5">{items.map((item, index) => <div key={item[0]} className={`rounded-lg border p-4 ${index === 3 ? "border-neon-cyan/50 bg-neon-cyan/10" : "border-space-border bg-space-card/50"}`}><b className="block text-xs text-text-primary">{item[0]}</b><span className="text-[11px]">{item[1]}</span></div>)}</div></Card>; }
function Check({ items }: { items: string[] }) { return <Card title="迁移完成检查">{items.map((item) => <div key={item} className="mb-2 flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />{item}</div>)}</Card>; }
function Next() { return <div className="mt-8 flex justify-end border-y border-space-border py-6"><Link href="/knowledge/ai-testing-workflow-orchestration" className="inline-flex items-center gap-2 text-sm text-neon-cyan">下一篇：AI 测试资产生产与人机审核<ArrowRight className="h-4 w-4" /></Link></div>; }
