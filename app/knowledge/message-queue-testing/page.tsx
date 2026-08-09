import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, MessagesSquare } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({ title: "消息队列与异步任务测试教程", description: "以商城订单事件为主线，测试消息重复、丢失、乱序、消费失败、重试、死信、积压和最终一致性。", path: "/knowledge/message-queue-testing", tags: ["消息队列", "异步任务", "幂等消费", "死信队列", "最终一致性"] });

const sections: SectionItem[] = [
  { id: "model", label: "异步模型" }, { id: "contract", label: "消息契约" }, { id: "duplicate", label: "重复与幂等" },
  { id: "loss", label: "消息丢失" }, { id: "ordering", label: "乱序处理" }, { id: "retry", label: "重试与死信" },
  { id: "backlog", label: "积压与扩容" }, { id: "consistency", label: "最终一致性" }, { id: "practice", label: "练习与检查" },
];
const semanticsRows = [
  ["至多一次", "可能丢，不重复", "非关键通知、可接受遗漏的指标"], ["至少一次", "不轻易丢，可能重复", "订单、库存、支付等常见业务"],
  ["效果上的恰好一次", "传输仍可能重复，业务结果幂等", "资金、库存和优惠核销"],
];
const failureRows = [
  ["生产后进程崩溃", "事务提交但消息未发", "Outbox 中仍有待投递记录"], ["Broker 确认丢失", "生产者不知道是否成功", "同 eventId 重发，消费者幂等"],
  ["消费完成前崩溃", "消息再次投递", "副作用只发生一次"], ["消费异常后仍确认", "消息永久丢失", "不得 ack，进入重试或死信"],
];
const orderRows = [
  ["PAID(v3) 后收到 CREATED(v1)", "忽略旧版本，订单仍为已支付"], ["REFUNDED(v5) 先于 REFUNDING(v4)", "缓存/延迟或按版本拒绝回退"],
  ["同订单事件并行消费", "按 orderId 分区，保持分区内顺序"], ["不同订单同时到达", "允许并行，不建立全局顺序依赖"],
];
const metricRows = [
  ["Consumer lag", "最新位点与消费位点差", "持续增长说明消费跟不上"], ["Oldest message age", "最老待处理消息年龄", "直接反映业务延迟"],
  ["Throughput", "每秒生产/消费量", "判断扩容是否有效"], ["Retry / DLQ rate", "重试和死信比例", "发现毒消息或依赖故障"],
];

export default function MessageQueueTestingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=distributed-data" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回分布式与数据质量模块</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索消息队列测试关键词...">
      <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Distributed Systems / Tutorial 17</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">消息队列与异步任务测试教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">接受消息传输的不确定性，再用契约、幂等、重试、监控和对账保证业务结果可信。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>9 个章节</span><span>订单事件链</span><span>重复 丢失 乱序 积压</span></div></header>

      <section id="model" data-knowledge-section className="mb-14">
        <SectionHeader number="01" title="先理解异步链路的三个时钟" badge="返回成功不等于完成" />
        <FlowFigure id="async-flow" title="支付成功后的异步业务" items={[["支付回调", "写订单状态"], ["Outbox", "保存待发事件"], ["Broker", "持久化与投递"], ["消费者", "扣库存发积分"], ["查询/对账", "确认最终状态"]]} />
        <TableCard title="交付语义与业务选择" headers={["语义", "含义", "适用判断"]} rows={semanticsRows} />
        <Callout>HTTP 成功示例统一为 200，但它只说明同步入口已接受请求；支付、库存或退款是否真正完成，要继续检查响应体业务结果和异步最终状态。</Callout>
      </section>

      <section id="contract" data-knowledge-section className="mb-14">
        <SectionHeader number="02" title="把消息当作长期演进的业务契约" badge="事件可识别可追踪" />
        <CodeBlock title="OrderPaid.v1.json">{`{
  "eventId": "E-1001",
  "eventType": "OrderPaid",
  "eventVersion": 1,
  "occurredAt": "2026-08-10T02:00:00Z",
  "aggregateId": "O-1001",
  "aggregateVersion": 3,
  "traceId": "4bf92f3577b34da6",
  "data": {
    "paymentId": "P-1001",
    "paidAmount": "80.00",
    "currency": "CNY"
  }
}`}</CodeBlock>
        <Card title="契约检查"><BulletList items={["eventId 全局唯一，用于幂等和审计。", "aggregateId 是分区键，aggregateVersion 判断新旧。", "时间使用明确时区，金额使用字符串或定点数。", "新增字段保持向后兼容；删除、改名和改类型需升级版本。", "消息不携带令牌、卡号或不必要的个人信息。"]} /></Card>
      </section>

      <section id="duplicate" data-knowledge-section className="mb-14">
        <SectionHeader number="03" title="主动制造重复，验证消费者幂等" badge="至少一次投递" />
        <FlowFigure id="dedupe-flow" title="幂等消费者的原子处理" items={[["收到事件", "读取 eventId"], ["检查去重表", "是否已处理"], ["业务写入", "库存或积分"], ["记录已处理", "同一事务"], ["确认消息", "提交位点"]]} />
        <CodeBlock title="重复事件测试">{`def test_当支付事件重复投递时_库存只扣减一次(harness):
    event = order_paid(event_id="E-DUP-1", order_id="O-1", quantity=2)

    harness.publish("order-events", event)
    harness.publish("order-events", event)
    harness.wait_consumed("E-DUP-1", attempts=2)

    assert harness.inventory("SKU-1")["deducted"] == 2
    assert harness.processed_event_count("E-DUP-1") == 1
    assert harness.points_ledger_count("O-1") == 1`}</CodeBlock>
        <Callout>“消费者执行了两次但第二次没报错”不是幂等证据。必须核对库存、优惠核销、积分账本、通知等所有副作用只发生一次。</Callout>
      </section>

      <section id="loss" data-knowledge-section className="mb-14">
        <SectionHeader number="04" title="在每个确认窗口测试消息丢失" badge="生产与消费两端" />
        <TableCard title="丢失窗口与证据" headers={["故障窗口", "风险", "必须验证"]} rows={failureRows} />
        <CodeBlock title="Outbox 原子写入示意">{`BEGIN;
UPDATE orders SET status = 'PAID', version = version + 1
WHERE order_id = 'O-1001' AND status = 'PENDING_PAYMENT';
INSERT INTO outbox_events(event_id, aggregate_id, event_type, payload, status)
VALUES ('E-1001', 'O-1001', 'OrderPaid', '{...}', 'PENDING');
COMMIT;

-- 测试：提交后杀死发布进程；重启 relay 后 E-1001 必须最终投递
SELECT status, attempts FROM outbox_events WHERE event_id = 'E-1001';`}</CodeBlock>
        <Card title="当……时，……关键用例"><BulletList items={["当数据库回滚时，不得留下可投递 Outbox 事件。", "当 Relay 发送后未更新状态就崩溃时，允许重发但业务结果不重复。", "当 Broker 暂时不可用时，PENDING 事件保留并带退避重试。", "当消费者处理失败时，不得提前提交位点。"]} /></Card>
      </section>

      <section id="ordering" data-knowledge-section className="mb-14">
        <SectionHeader number="05" title="打乱事件顺序，阻止状态倒退" badge="局部有序" />
        <TableCard title="订单事件乱序测试" headers={["输入顺序", "处理策略"]} rows={orderRows} />
        <CodeBlock title="聚合版本保护">{`def apply_event(order, event):
    if event["aggregateVersion"] <= order.version:
        return "IGNORED_STALE_EVENT"
    if event["aggregateVersion"] != order.version + 1:
        return "WAITING_FOR_GAP"
    order.transition(event["eventType"])
    order.version = event["aggregateVersion"]
    return "APPLIED"

def test_当旧事件晚到时_订单状态不回退(order):
    order.status, order.version = "PAID", 3
    result = apply_event(order, {"eventType": "OrderCreated", "aggregateVersion": 1})
    assert result == "IGNORED_STALE_EVENT"
    assert order.status == "PAID"`}</CodeBlock>
      </section>

      <section id="retry" data-knowledge-section className="mb-14">
        <SectionHeader number="06" title="区分可恢复失败、毒消息与死信" badge="重试有上限" />
        <FlowFigure id="retry-flow" title="消费失败的有限处理路径" items={[["首次失败", "记录原因"], ["指数退避", "释放下游压力"], ["再次消费", "保持幂等"], ["超过上限", "进入 DLQ"], ["修复重放", "审计结果"]]} />
        <CodeBlock title="重试与死信配置示意">{`retry:
  attempts: 5
  backoff: exponential
  initialDelayMs: 1000
  maxDelayMs: 30000
deadLetter:
  topic: order-events.dlq
  include:
    - originalTopic
    - eventId
    - failureReason
    - attempts
    - firstFailedAt`}</CodeBlock>
        <Card title="分类处理"><BulletList items={["网络超时、依赖限流通常可退避重试。", "Schema 非法、缺必填字段通常直接进入死信。", "余额不足、退款超额是业务拒绝，不应无限重试。", "DLQ 重放前先修复原因，并用原 eventId 保持幂等。"]} /></Card>
      </section>

      <section id="backlog" data-knowledge-section className="mb-14">
        <SectionHeader number="07" title="制造积压，验证容量、扩容和恢复" badge="不要只看队列长度" />
        <TableCard title="积压监控的四个核心指标" headers={["指标", "含义", "判断"]} rows={metricRows} />
        <CodeBlock title="积压演练伪命令">{`# 1. 将消费者缩容到 1 个实例
kubectl scale deployment order-consumer --replicas=1
# 2. 向测试 Topic 发送 100000 条带 runId 的事件
python scripts/publish_orders.py --count 100000 --run-id backlog-01
# 3. 扩容并观察 lag、oldest age、吞吐与错误率
kubectl scale deployment order-consumer --replicas=6
# 4. 验证所有 runId=backlog-01 的业务状态最终收敛`}</CodeBlock>
        <Callout>只在隔离环境执行容量演练。扩容后不仅要看积压下降，还要检查数据库连接、下游限流、分区分配和消息顺序是否被破坏。</Callout>
      </section>

      <section id="consistency" data-knowledge-section className="mb-14">
        <SectionHeader number="08" title="用状态收敛和对账证明最终一致" badge="允许延迟，不允许失控" />
        <FlowFigure id="consistency-flow" title="从业务动作到一致性证据" items={[["支付成功", "订单 PAID"], ["事件投递", "OrderPaid"], ["异步消费", "库存与积分"], ["状态查询", "等待收敛"], ["对账修复", "发现并补偿"]]} />
        <CodeBlock title="最终一致性测试">{`def test_当支付成功事件短暂失败时_业务最终一致(harness):
    harness.fail_consumer("inventory", times=2)
    response = harness.pay("O-1001")
    assert response.status_code == 200
    assert response.json()["businessCode"] == "SUCCESS"

    harness.wait_until(
        lambda: harness.snapshot("O-1001"),
        lambda x: x["order"] == "PAID"
        and x["inventory"] == "DEDUCTED"
        and x["pointsLedger"] == 1,
        timeout=30,
    )
    assert harness.dlq_count(order_id="O-1001") == 0`}</CodeBlock>
        <Card title="一致性标准必须量化"><BulletList items={["正常情况下多少秒内收敛。", "依赖恢复后积压多快清空。", "超时未收敛由什么告警发现。", "对账任务如何定位、补偿并留下审计记录。"]} /></Card>
      </section>

      <section id="practice" data-knowledge-section className="mb-14">
        <SectionHeader number="09" title="完成一次订单事件可靠性演练" badge="练习与验收" />
        <Card title="练习：覆盖异步链路的六类风险"><BulletList ordered items={["为 OrderPaid 定义版本化消息契约和分区键。", "重复投递同一 eventId，核对库存、积分和通知只执行一次。", "在事务提交、发送确认和消费确认窗口分别注入崩溃。", "逆序投递创建、支付和退款事件，验证状态不倒退。", "模拟可恢复异常与毒消息，核对退避、上限和 DLQ 元数据。", "修复消费者后按原 eventId 重放死信。", "制造 10 万条积压并验证扩容、下游容量和恢复时间。", "定义收敛时限，运行订单、库存、支付、退款对账。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><ChecklistCard title="消息可治理" items={["契约版本明确", "eventId 唯一", "分区键正确", "敏感数据最少"]} /><ChecklistCard title="失败可恢复" items={["重复不产生副作用", "丢失窗口覆盖", "重试有上限", "死信可审计重放"]} /><ChecklistCard title="结果可证明" items={["乱序不倒退", "积压有指标", "收敛时限明确", "对账补偿可执行"]} /></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">你已经能验证异步消息的可靠性。下一步聚焦缓存故障、热点与数据库一致性。</p><Link href="/knowledge/cache-testing" className="inline-flex items-center gap-2 text-sm text-neon-cyan">继续学习缓存测试 <ArrowRight className="h-4 w-4" /></Link></div>
      </section>
    </KnowledgeLayout>
  </div>;
}

function SectionHeader({ number, title, badge }: { number: string; title: string; badge: string }) { return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{number}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function BulletList({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={cn("mt-3 space-y-2 pl-5", ordered ? "list-decimal" : "list-disc")}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function TableCard({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-b border-space-border/50 last:border-b-0">{row.map((cell, index) => <td key={`${cell}-${index}`} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function CodeBlock({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function FlowFigure({ id, title, items }: { id: string; title: string; items: readonly (readonly [string, string])[] }) { return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby={id}><figcaption id={id} className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">{items.map((item, index) => <div key={item[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="block text-sm text-text-primary">{item[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{item[1]}</span></div>{index < items.length - 1 && <MessagesSquare className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>; }
function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>; }
