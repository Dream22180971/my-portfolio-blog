import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "AI 应用性能、成本与可观测性教程",
  description: "用客服 AI 贯穿案例实战 TTFT、P50/P95/P99、Token 成本、并发限流、版本漂移、预算门禁、失败注入与安全降级。",
  path: "/knowledge/ai-performance-cost-observability",
  tags: ["AI性能测试", "Token成本", "可观测性", "版本漂移", "降级策略"],
});

const sections: SectionItem[] = [
  { id: "case", label: "贯穿案例" },
  { id: "latency", label: "延迟分位数" },
  { id: "cost", label: "Token 成本" },
  { id: "load", label: "并发与限流" },
  { id: "observability", label: "可观测字段" },
  { id: "drift", label: "版本漂移" },
  { id: "matrix", label: "测试矩阵" },
  { id: "injection", label: "失败注入" },
  { id: "gates", label: "门禁与降级" },
  { id: "practice", label: "练习与交付" },
];

export default function AiPerformancePage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回 AI 测试工程师强化支线</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索 TTFT、Token 成本、P95、漂移与降级...">
      <Header />
      <S id="case" n="01" t="先把质量、速度和钱放进同一条请求链" b="贯穿案例">
        <Card title="案例：电商售后客服 Copilot">
          <p>客服输入“订单已签收 8 天，鞋子开胶，能否退款？”，系统先做安全检查，再检索售后政策与订单状态，调用模型生成带证据的建议，最后由规则决定自动回复还是转人工。目标不是单纯追求快，而是在正确、安全、可负担的前提下足够快。</p>
        </Card>
        <Flow items={[["入口", "鉴权/排队"], ["检索", "订单/政策"], ["模型", "首字/生成"], ["工具", "资格校验"], ["出口", "门禁/人审"]]} />
        <Table title="端到端预算拆解" headers={["阶段", "观测点", "示例预算", "失败信号"]} rows={[
          ["排队与限流", "queue_ms、rate_limit_wait_ms", "P95 <= 150ms", "容量不足或租户不公平"],
          ["检索", "retrieval_ms、top_k、cache_hit", "P95 <= 400ms", "索引慢或召回退化"],
          ["模型首字", "provider_accept 到首个 Token", "TTFT P95 <= 1.8s", "冷启动、排队或长输入"],
          ["完整生成", "首字到最后一个 Token", "P95 <= 3.5s", "输出过长或服务降速"],
          ["端到端", "request_start 到业务结果", "P95 <= 5s", "任一阶段长尾叠加"],
        ]} />
        <Callout>预算是项目示例，不是行业通用阈值。先用真实业务峰值、客服可等待时间和人工兜底能力校准，再写入发布门禁。</Callout>
      </S>

      <S id="latency" n="02" t="分开测 TTFT、端到端与长尾" b="P50 / P95 / P99">
        <Table title="延迟指标口径" headers={["指标", "计算边界", "回答的问题"]} rows={[
          ["TTFT", "首个响应 Token 时间 - 请求受理时间", "用户多久看到开始回答"],
          ["生成耗时", "最后一个 Token 时间 - 首个 Token 时间", "流式输出是否拖沓"],
          ["端到端延迟", "业务结果可用时间 - 请求进入时间", "检索、工具、模型合起来多慢"],
          ["P50", "50% 请求不超过该值", "典型体验"],
          ["P95", "95% 请求不超过该值", "大部分用户的坏体验上界"],
          ["P99", "99% 请求不超过该值", "长尾、抖动和容量风险"],
        ]} />
        <Code title="从一次压测结果计算分位数">{`const sorted = latencyMs.toSorted((a, b) => a - b);
const percentile = (p: number) =>
  sorted[Math.ceil((p / 100) * sorted.length) - 1];

console.log({
  p50: percentile(50),
  p95: percentile(95),
  p99: percentile(99),
});
// 同时按模型、场景、缓存命中、是否调用工具分组，不能只看总分位数。`}</Code>
        <Card title="测量纪律"><List items={["预热后再记录稳定态，同时单独保留冷启动数据。", "流式请求必须记录首字和末字，不用服务端 200 时间冒充 TTFT。", "失败和超时也进入分母，否则延迟会因丢弃慢请求而虚假变好。", "每个分位数同时报告样本量、时间窗与成功率。"]} /></Card>
      </S>

      <S id="cost" n="03" t="把 Token、检索和工具费用算到一次业务结果" b="可复核公式">
        <Code title="单请求成本公式">{`C_request =
  T_input  / 1_000_000 * P_input  +
  T_cached / 1_000_000 * P_cached +
  T_output / 1_000_000 * P_output +
  C_retrieval + C_tools + C_retry

// T 是 Token 数，P 是每百万 Token 单价；币种与计费时间必须随报告保存。
// 不能只算主模型：重试、Embedding、重排、OCR 和外部工具都属于业务成本。`}</Code>
        <Card title="计算例：一次售后建议">
          <p>假设未缓存输入 4,200 Token，输入单价 ¥0.50/百万；输出 850 Token，输出单价 ¥2.00/百万；检索与重排 ¥0.0004。则成本为 4,200 / 1,000,000 × 0.50 + 850 / 1,000,000 × 2.00 + 0.0004 = <b className="text-text-primary">¥0.0042/次</b>。若每天 100,000 次且分布不变，日成本约 ¥420。以上价格只是演算值，测试时使用当前合同价。</p>
        </Card>
        <Table title="成本指标与陷阱" headers={["指标", "计算", "防止的误判"]} rows={[
          ["单次 P50/P95 成本", "按每请求总成本取分位数", "平均值掩盖超长上下文"],
          ["每成功任务成本", "总成本 / 成功且可用结果数", "便宜但大量失败"],
          ["每租户日预算", "租户请求、重试、工具费求和", "头部租户挤占预算"],
          ["质量调整成本", "总成本 / 人审接受结果数", "低质量输出看似便宜"],
        ]} />
        <Callout>Token 预算不是简单截断。必须先保护系统指令、证据与关键业务上下文，再压缩历史对话；截断后仍无足够证据时应请求澄清或转人工。</Callout>
      </S>

      <S id="load" n="04" t="用到达率、并发和限流验证容量" b="不只看 QPS">
        <Table title="负载模型" headers={["场景", "流量形态", "断言"]} rows={[
          ["基线", "1 用户顺序请求", "建立各阶段延迟与成本基准"],
          ["阶梯负载", "每 5 分钟增加 10 并发", "找到 P95 超门与错误率拐点"],
          ["突发", "30 秒内从 5 升到 100 并发", "队列有界，不发生雪崩重试"],
          ["长稳", "目标峰值持续 2 小时", "连接、内存和限额无累积泄漏"],
          ["租户竞争", "大租户突发 + 小租户稳定流量", "配额隔离，小租户不饿死"],
        ]} />
        <Code title="并发与吞吐的近似校验">{`// Little's Law：稳定系统中，并发量 L ≈ 到达率 λ × 平均停留时间 W
// 例：40 req/s × 3.0s ≈ 120 个在途请求
expectedInFlight = arrivalRatePerSec * meanE2eSeconds;

// 实测长期明显高于近似值时，检查排队、重试和下游阻塞。
// 平均数只用于容量估计；发布体验仍以 P95/P99 为准。`}</Code>
        <Card title="限流断言"><List items={["429/限流响应带可解释错误与退避提示，不返回半截正式答案。", "客户端采用带抖动的指数退避，并设置最大次数与总时限。", "重试沿用 request_id/idempotency_key，指标中区分原请求与尝试次数。", "排队达到上限后快速失败或转人工，不允许无界等待。"]} /></Card>
      </S>

      <S id="observability" n="05" t="每条答案都能还原当时发生了什么" b="可观测字段">
        <Code title="一次请求的最小观测事件">{`{
  "trace_id": "tr_7f31", "request_id": "req_0182", "tenant_id_hash": "t_91a",
  "scenario": "refund_after_delivery", "risk_level": "P0",
  "model": "provider/model", "model_version": "2026-07-15",
  "prompt_version": "refund-v12", "schema_version": "answer-v4",
  "index_version": "policy-2026-08-01", "retrieved_doc_ids": ["POL-17#3"],
  "input_tokens": 4200, "cached_tokens": 0, "output_tokens": 850,
  "queue_ms": 42, "retrieval_ms": 181, "ttft_ms": 932, "e2e_ms": 2940,
  "tool_calls": [{"name": "refund_eligibility", "status": "ok", "latency_ms": 87}],
  "estimated_cost": 0.0042, "currency": "CNY",
  "outcome": "human_review", "error_code": null, "retry_count": 0
}`}</Code>
        <Table title="三类信号如何配合" headers={["信号", "用途", "约束"]} rows={[
          ["Metrics", "趋势、分位数、错误率、预算消耗", "标签要有界，request_id 不做高基数标签"],
          ["Traces", "拆解检索、模型、工具和队列耗时", "跨服务传播 trace_id"],
          ["Logs", "错误上下文与审计证据", "敏感字段脱敏，不记录完整 Prompt/用户原文"],
          ["Eval events", "质量分、引用、人工裁决", "和运行 trace 关联但权限隔离"],
        ]} />
        <Callout>可观测不等于“把所有内容打进日志”。订单号、手机号、用户原文和检索文档都要按最小必要原则脱敏、限权与设置保留期。</Callout>
      </S>

      <S id="drift" n="06" t="模型、Prompt 与索引都必须可版本化回归" b="漂移控制">
        <Table title="三类版本漂移" headers={["变化", "可能表现", "对比方法", "阻断条件"]} rows={[
          ["模型版本", "质量、Token 或 TTFT 改变", "固定评估集做候选/基线 A/B", "P0 硬失败或质量显著回退"],
          ["Prompt 版本", "工具选择、格式、拒答边界改变", "同模型同参数配对比较", "关键场景通过率低于基线"],
          ["索引版本", "引用缺失、旧政策被召回", "锁定查询集测召回与答案证据", "现行政策召回失败或过期证据入答"],
          ["Schema/解析器", "字段缺失、默认值污染", "契约测试 + 回放历史响应", "入库契约不兼容"],
        ]} />
        <Card title="漂移回归报告必须回答"><List items={["候选只改了什么，其他版本是否锁定？", "全量、P0、长上下文、工具调用四组指标分别如何变化？", "质量收益是否值得新增延迟与成本？", "线上灰度的停止条件、回退版本和负责人是什么？"]} /></Card>
      </S>

      <S id="matrix" n="07" t="建立覆盖质量、性能、成本与可靠性的矩阵" b="可执行组合">
        <Table title="售后客服 AI 测试矩阵" headers={["维度", "取值", "主要指标", "重点断言"]} rows={[
          ["上下文长度", "短 / 典型 / P95 / 超限", "TTFT、成本、截断率", "关键证据不被截断"],
          ["检索状态", "命中 / 空 / 慢 / 旧索引", "检索耗时、证据率", "空证据不编造政策"],
          ["工具状态", "成功 / 429 / 超时 / 5xx", "成功率、重试、E2E", "副作用不重复"],
          ["流量", "基线 / 阶梯 / 突发 / 长稳", "P95/P99、队列、429", "限流可控且租户隔离"],
          ["风险", "咨询 / 金额 / 权限 / 隐私", "人审率、硬失败", "高风险不得静默降级"],
          ["版本", "现网 / 候选模型、Prompt、索引", "质量、延迟、成本差量", "变化可归因可回退"],
        ]} />
        <Card title="最小实验设计"><List ordered items={["固定评估集、随机参数、计费表和基线版本。", "先单变量比较，再做高风险组合；不要一次同时换模型、Prompt 和索引。", "每个组合记录成功、失败、超时与人工接受结果。", "对差量做业务解释，不能只凭总平均值宣布变好。"]} /></Card>
      </S>

      <S id="injection" n="08" t="主动注入慢、错、限额与不可用" b="验证失败安全">
        <Table title="失败注入清单" headers={["注入", "预期系统行为", "禁止行为"]} rows={[
          ["模型 TTFT 超时", "取消请求，展示可重试状态或转人工", "把未完成文本当正式答复"],
          ["提供方 429", "按预算退避，达到上限后停止", "多个节点同时无界重试"],
          ["检索超时/空结果", "说明证据不足，限制回答范围", "脱离证据编造退款政策"],
          ["工具 5xx", "只重试幂等读操作；写操作先查状态", "重复创建退款或工单"],
          ["成本计数缺失", "标记计费未知并告警", "按 0 成本放行预算门"],
          ["旧索引误路由", "版本校验失败并回到稳定索引", "混用新旧政策生成答案"],
        ]} />
        <Code title="失败场景断言伪代码">{`given({ model: "timeout_after_first_token", retrieval: "ok" });
const result = await runCase("REFUND-017");

expect(result.publishable).toBe(false);
expect(result.state).toBe("HUMAN_REVIEW");
expect(result.partialAnswerStoredAsDraft).toBe(true);
expect(result.retryCount).toBeLessThanOrEqual(2);
expect(result.trace.errorCode).toBe("MODEL_TIMEOUT");`}</Code>
      </S>

      <S id="gates" n="09" t="把预算门、发布门与分级降级写成策略" b="守住业务底线">
        <Table title="发布门禁示例" headers={["门", "候选标准", "失败动作"]} rows={[
          ["质量门", "P0 通过率 100%，总体质量不低于基线", "阻断发布，查看差异样本"],
          ["延迟门", "TTFT P95 <= 1.8s；E2E P95 <= 5s；P99 <= 10s", "定位阶段长尾或回退版本"],
          ["可靠性门", "成功率 >= 99.5%，错误预算未耗尽", "停止灰度扩量"],
          ["成本门", "每成功任务 P95 <= ¥0.012，日预测不超预算", "压缩上下文或切换方案"],
          ["漂移门", "模型/Prompt/索引均有版本与回退证据", "禁止不可归因变更上线"],
        ]} />
        <Table title="按风险降级，而不是一刀切" headers={["触发", "允许降级", "必须转人工/停止"]} rows={[
          ["预算接近上限", "低风险问答用小模型、缩短非关键历史", "资金与权限判断不因省钱绕过规则"],
          ["检索不可用", "展示已有订单事实并说明限制", "政策结论、承诺与退款资格"],
          ["模型超时", "保存草稿，允许客服手工回复", "禁止发布半截或无证据答案"],
          ["高峰限流", "低优先级排队或异步通知", "紧急投诉和高风险请求进入人工通道"],
        ]} />
        <Callout>人工不是无限容量的“万能降级”。人审队列也要有 SLA、容量告警与超时处置；队列饱和时系统应明确停止自动承诺，而不是继续制造风险。</Callout>
      </S>

      <S id="practice" n="10" t="完成一次可复现的性能成本验收" b="练习与交付清单">
        <Card title="练习"><List ordered items={["准备 30 条售后评估样本，标注风险、上下文长度、是否检索和是否调用工具。", "记录基线的 TTFT、E2E P50/P95/P99、成功率和每成功任务成本。", "执行阶梯、突发和长稳测试，验证限流、公平性与重试上限。", "分别替换候选模型、Prompt、索引，输出质量/延迟/成本差量。", "注入模型超时、429、检索空结果、工具 5xx 和成本字段缺失。", "配置质量、延迟、可靠性、预算与漂移门，演练小模型、只读、排队和转人工。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3">
          <Check title="数据与脚本" items={["分层负载数据", "固定评估集", "故障开关", "分位数计算"]} />
          <Check title="观测与报告" items={["Trace 可串联", "版本可归因", "成本可复核", "隐私已脱敏"]} />
          <Check title="上线治理" items={["门禁有负责人", "灰度有停止线", "降级守边界", "回退已演练"]} />
        </div>
      </S>
    </KnowledgeLayout>
  </div>;
}

function Header() { return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Phase 04 / AI Reliability & Safety 02</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">AI 应用性能、成本与可观测性教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">从“回答得出来”进阶到“高峰时仍可用、每一分钱可解释、任何版本回退可复现”，完成 AI 测试闭环的运行质量验收。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>客服 AI 贯穿案例</span><span>性能 + FinOps + SRE</span></div></header>; }
function S({ id, n, t, b, children }: { id: string; n: string; t: string; b: string; children: React.ReactNode }) { return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) { const T = ordered ? "ol" : "ul"; return <T className={`mt-3 space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>{items.map((item) => <li key={item}>{item}</li>)}</T>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join()} className="border-b border-space-border/50">{row.map((cell, index) => <td key={cell + index} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function Code({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function Flow({ items }: { items: string[][] }) { return <Card title="一次请求的关键阶段"><div className="grid gap-2 md:grid-cols-9 md:items-center">{items.map((item, index) => <div className="contents" key={item[0]}><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><b className="block text-xs text-text-primary">{item[0]}</b><span className="text-[11px]">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></Card>; }
function Check({ title, items }: { title: string; items: string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />{item}</li>)}</ul></Card>; }
