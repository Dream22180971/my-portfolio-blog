import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

type TableRow = readonly string[];

export const metadata = buildPageMetadata({
  title: "E2E 数据一致性测试实战手册",
  description: "从页面操作、接口响应到数据库、缓存、消息队列和下游系统的端到端数据一致性测试方法。",
  path: "/knowledge/e2e-data-consistency-testing",
  tags: ["E2E 测试", "数据一致性", "Playwright", "消息队列", "自动化测试"],
});

const sections: SectionItem[] = [
  { id: "overview", label: "测试目标" },
  { id: "model", label: "一致性模型" },
  { id: "scenario", label: "场景设计" },
  { id: "checkpoints", label: "全链路检查点" },
  { id: "waiting", label: "等待与轮询" },
  { id: "idempotency", label: "幂等与补偿" },
  { id: "data", label: "测试数据" },
  { id: "automation", label: "自动化结构" },
  { id: "report", label: "失败报告" },
  { id: "checklist", label: "检查清单" },
];

const consistencyRows: TableRow[] = [
  ["强一致", "操作成功后，相关数据必须立即正确", "响应返回后立即校验订单状态、金额、权限"],
  ["最终一致", "允许短暂不一致，但必须在约定时间内完成", "在超时时间内轮询优惠券、退款、异步任务"],
  ["业务一致", "字段表达不同，但代表的业务事实必须一致", "订单实付金额必须等于退款流水累计金额"],
];

const checkpointRows: TableRow[] = [
  ["页面", "用户看到订单已取消，操作入口状态正确", "不能继续发货、支付或重复取消"],
  ["API", "查询接口返回取消状态和正确金额", "HTTP 与业务 code 都正确"],
  ["订单数据库", "状态、取消时间、版本号正确", "只有一次合法状态迁移"],
  ["库存", "被占用数量恢复", "不能少释放或多释放"],
  ["优惠券", "恢复可用并留下返还记录", "返还效果只能发生一次"],
  ["退款流水", "退款金额等于实付金额", "幂等键唯一，无重复退款"],
  ["缓存", "不再返回取消前的旧状态", "回源后不会用旧值覆盖新值"],
  ["消息与下游", "取消事件被正确消费", "重试、死信、补偿均可追踪"],
];

const failureRows: TableRow[] = [
  ["接口超时后重试", "第一次可能已成功，第二次重复写入", "同一幂等键只能产生一个业务结果"],
  ["消息重复消费", "重复返券、重复退款、库存多释放", "同一 eventId 的业务效果只发生一次"],
  ["下游暂时失败", "主系统成功，下游永远停在旧状态", "可重试、可补偿、超限后可告警"],
  ["并发状态操作", "取消、发货、退款相互覆盖", "状态机合法，版本冲突被识别"],
  ["缓存失效失败", "数据库已更新，用户持续读到旧状态", "在 SLA 内刷新或回源得到新值"],
];

const priorityRows: TableRow[] = [
  ["P0", "支付、退款、余额、库存、核心订单状态", "每次发布前执行，任何不一致阻断发布"],
  ["P1", "优惠券、积分、会员权益、审批同步", "主干回归或每日流水线执行"],
  ["P2", "低风险异步统计、非关键展示数据", "定时执行或变更相关时执行"],
];

export default function E2EDataConsistencyTestingPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回知识库
      </Link>

      <KnowledgeLayout sections={sections}>
        <header className="mb-10">
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">E2E 数据一致性测试实战手册</h1>
          <p className="mb-6 text-lg text-text-secondary">从用户操作一路检查到数据库、缓存、消息队列和下游系统，证明整条业务链最终说的是同一件事。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>页面 + API + 数据层</span><span>Playwright / 数据库 / MQ</span></div>
        </header>

        <section id="overview" data-knowledge-section className="mb-14">
          <Header icon="🔗" title="测试目标" badge="页面成功不等于业务成功" />
          <Card title="E2E 数据一致性到底测什么？">
            <p>页面弹出“操作成功”，只能证明前端收到了成功响应。真正的 E2E 数据一致性测试，还要继续验证业务数据是否在所有相关系统中正确落地。</p>
            <List items={["用户最终看到的状态正确。", "接口返回、数据库记录和缓存数据表达同一业务事实。", "异步消息被正确消费，下游系统在约定时间内完成处理。", "请求重试、消息重复和并发操作不会产生重复业务结果。", "中途失败后系统能够重试、补偿、告警和追踪。"]} />
          </Card>
          <Card title="贯穿案例"><p>以“使用优惠券的已支付订单被用户取消”为例，你需要验证订单终止履约、库存释放、优惠券只返还一次、退款总额等于实付金额，并且缓存和下游状态最终一致。</p></Card>
        </section>

        <section id="model" data-knowledge-section className="mb-14">
          <Header icon="🧭" title="先确定一致性模型" badge="立即正确，还是最终正确" />
          <Table title="三类一致性" headers={["类型", "业务含义", "测试方式"]} rows={consistencyRows} />
          <Card title="测试开始前必须确认"><List items={["哪些状态必须立即生效？", "哪些状态允许异步完成？", "允许不一致多长时间？", "超时后由谁重试、补偿或告警？", "哪个系统是最终事实来源？"]} /></Card>
        </section>

        <section id="scenario" data-knowledge-section className="mb-14">
          <Header icon="🧾" title="场景与用例设计" badge="用业务事实组织断言" />
          <Card title="推荐用例标题"><p className="font-medium text-text-primary">当已支付订单使用优惠券时，取消订单后所有关联数据应在 5 分钟内保持一致</p></Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="前置数据"><List items={["创建独立测试用户和库存为 10 的商品。", "发放一张 20 元测试优惠券。", "创建并支付一笔使用优惠券的订单。", "记录订单号、用户 ID、优惠券 ID、支付流水号和初始库存。"]} /></Card>
            <Card title="操作与结果"><List items={["从订单详情页发起取消。", "立即校验页面、取消接口和订单查询接口。", "轮询库存、优惠券、退款和消费记录。", "反向校验不存在重复退款、重复返券和多释放库存。"]} /></Card>
          </div>
          <Table title="按风险安排执行频率" headers={["优先级", "典型链路", "执行策略"]} rows={priorityRows} />
        </section>

        <section id="checkpoints" data-knowledge-section className="mb-14">
          <Header icon="📍" title="全链路检查点" badge="从入口追到业务终点" />
          <Table title="订单取消链路检查矩阵" headers={["层级", "正向断言", "反向断言"]} rows={checkpointRows} />
          <Card title="统一关联标识"><List items={["orderNo：标识业务订单。", "traceId：定位一次服务调用。", "eventId：标识一条业务事件。", "e2e_run_id：标识整次测试运行，并关联报告、日志与清理任务。"]} /></Card>
          <Code title="text">{`e2e_run_id = e2e-20260809-order-cancel-001
order_no  = TEST-ORDER-10001
trace_id  = 6e7d...
event_id  = order-cancelled-10001`}</Code>
        </section>

        <section id="waiting" data-knowledge-section className="mb-14">
          <Header icon="⏱️" title="最终一致的等待策略" badge="轮询状态，不赌固定时间" />
          <Card title="不要这样等待"><p>固定等待 5 秒既可能浪费时间，也可能在 CI 较慢时误判失败。等待的目标应该是“状态达到预期”，而不是“时间过去了”。</p></Card>
          <Code title="TypeScript / Playwright">{`await expect
  .poll(
    async () => (await couponApi.get(couponId)).status,
    {
      timeout: 5 * 60 * 1000,
      intervals: [1000, 2000, 5000, 10000],
      message: "订单取消后，优惠券应在 5 分钟内恢复可用",
    },
  )
  .toBe("AVAILABLE");`}</Code>
          <Card title="轮询必须具备"><List items={["明确的最终状态。", "业务认可的最长等待时间。", "不会改变业务数据的只读查询。", "超时后输出最后状态、等待时长和关联标识。"]} /></Card>
        </section>

        <section id="idempotency" data-knowledge-section className="mb-14">
          <Header icon="♻️" title="幂等、异常与补偿" badge="异常路径才是事故高发区" />
          <Table title="必须覆盖的故障场景" headers={["场景", "主要风险", "核心断言"]} rows={failureRows} />
          <Card title="幂等校验不能只看返回码"><List items={["同一请求重复发送后只有一条业务记录。", "同一消息重复消费后余额、库存和权益只变化一次。", "幂等键有明确作用域和有效期。", "第一次成功但响应丢失时，重试能返回同一业务结果。"]} /></Card>
        </section>

        <section id="data" data-knowledge-section className="mb-14">
          <Header icon="🧪" title="测试数据管理" badge="独立、可追踪、可恢复" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="数据准备"><List items={["每条用例使用独立用户、订单和优惠券。", "数据带统一 TEST 前缀和 e2e_run_id。", "使用测试租户、测试支付渠道和可控库存。", "测试之间不依赖执行顺序。"]} /></Card>
            <Card title="数据清理"><List items={["优先使用业务允许的测试接口回收数据。", "用例失败时先保存证据，再执行清理。", "财务流水和审计日志使用冲正或专用测试账本，不直接删除。", "清理失败必须告警，避免污染后续测试。"]} /></Card>
          </div>
        </section>

        <section id="automation" data-knowledge-section className="mb-14">
          <Header icon="🧰" title="自动化工程结构" badge="页面操作与数据探针分层" />
          <Code title="目录结构">{`tests/
  order-cancel-consistency.spec.ts
fixtures/
  order-scenario.ts
clients/
  order-api.ts
  coupon-api.ts
probes/
  database-probe.ts
  cache-probe.ts
  event-probe.ts
assertions/
  consistency-assertions.ts`}</Code>
          <Code title="TypeScript / Playwright">{`test("当已支付订单使用优惠券时，取消后关联数据应保持一致", async ({ page }) => {
  const scenario = await orderScenario.createPaidOrderWithCoupon();

  await orderPage.open(scenario.orderNo);
  await orderPage.cancelOrder("不想要了");

  await consistency.expectOrderCancelled(scenario);
  await consistency.expectInventoryReleased(scenario);
  await consistency.expectCouponReturnedOnce(scenario);
  await consistency.expectRefundCompletedOnce(scenario);
});`}</Code>
          <Card title="职责分层"><List items={["Page Object：模拟真实用户操作。", "API Client：读取稳定的业务状态。", "Probe：只读观察数据库、缓存和事件。", "Consistency Assertion：表达跨系统业务规则。", "测试文件：编排场景，不堆实现细节。"]} /></Card>
        </section>

        <section id="report" data-knowledge-section className="mb-14">
          <Header icon="📝" title="失败报告与定位" badge="说明断在哪一层" />
          <Card title="报告必须包含"><List items={["e2e_run_id、订单号、traceId 和 eventId。", "用户操作、接口响应与执行环境。", "每个检查点的期望、实际状态和首次达到时间。", "数据库、缓存、消息和下游系统的状态时间线。", "最后一次轮询结果及超时阈值。", "相关日志、Trace、截图、消息重试和死信证据。", "初步归因：产品缺陷、环境故障、数据污染或脚本问题。"]} /></Card>
          <Card title="理想的失败结论"><p>订单在 10:00:02 已取消，事件在 10:00:03 发布；优惠券消费者连续重试 3 次后进入死信队列。截至 10:05:02，优惠券状态仍为 USED。开发人员可以直接从消费者和死信记录开始排查。</p></Card>
        </section>

        <section id="checklist" data-knowledge-section className="mb-14">
          <Header icon="✅" title="E2E 数据一致性检查清单" badge="设计 / 执行 / 收尾" />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="设计前"><List items={["已定义业务事实来源", "已区分强一致与最终一致", "已明确 SLA 和优先级", "已画出数据流向"]} /></Card>
            <Card title="执行中"><List items={["使用唯一关联标识", "正向与反向断言齐全", "异步状态使用轮询", "重复、超时、并发已覆盖"]} /></Card>
            <Card title="执行后"><List items={["失败证据可回放", "各层状态有时间线", "测试数据完成清理", "高风险用例进入持续回归"]} /></Card>
          </div>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function Header({ icon, title, badge }: { icon: string; title: string; badge: string }) {
  return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 text-lg">{icon}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>;
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>;
}

function List({ items }: { items: readonly string[] }) {
  return <ul className="mt-3 list-disc space-y-2 pl-5">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Table({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly TableRow[] }) {
  return <Card title={title}><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-space-border/50 last:border-b-0">{row.map((cell) => <td key={cell} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>;
}

function Code({ title, children }: { title: string; children: string }) {
  return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>;
}
