import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Network } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({ title: "微服务测试实战教程", description: "围绕商城订单链路，系统测试网关、认证、服务契约、超时重试、熔断降级、分布式事务、故障传播与链路追踪。", path: "/knowledge/microservices-testing", tags: ["微服务测试", "API 网关", "熔断降级", "分布式事务", "链路追踪"] });

const sections: SectionItem[] = [
  { id: "map", label: "服务地图" }, { id: "layers", label: "测试分层" }, { id: "gateway", label: "网关与认证" },
  { id: "contract", label: "服务契约" }, { id: "timeout", label: "超时与重试" }, { id: "resilience", label: "熔断与降级" },
  { id: "transaction", label: "分布式事务" }, { id: "trace", label: "追踪与定位" }, { id: "practice", label: "演练与检查" },
];
const layerRows = [
  ["单服务", "订单金额、状态规则", "快，原因明确", "不能证明真实依赖"], ["契约", "请求响应结构与兼容", "提前发现接口破坏", "不能证明业务协同"],
  ["组件", "服务 + 数据库 + 可控依赖", "可验证存储与故障", "环境仍被简化"], ["端到端", "网关到库存、支付", "接近真实链路", "慢且定位成本高"],
];
const faultRows = [
  ["库存超时", "订单不应无限等待", "超时预算、无重复预占"], ["优惠 500", "按策略失败或降级", "金额提示明确"],
  ["支付慢响应", "客户端不可重复扣款", "幂等键、状态可查询"], ["退款服务不可用", "进入可恢复状态", "任务可重试、用户可查询"],
];
const transactionRows = [
  ["创建订单后锁库存失败", "订单取消", "没有库存预占"], ["锁库存后支付失败", "释放库存", "订单保持待支付或关闭"],
  ["支付成功但确认超时", "先查询再补偿", "不得再次扣款"], ["退款成功但订单更新失败", "补偿任务重放", "资金与订单最终一致"],
];

export default function MicroservicesTestingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=distributed-data" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回分布式与数据质量模块</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索微服务测试关键词...">
      <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Distributed Systems / Tutorial 16</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">微服务测试实战教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">不只验证每个服务“各自正常”，还要验证依赖失败、网络不确定和跨服务状态变化时，交易链路仍可控。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>9 个章节</span><span>订单服务群</span><span>契约 + 韧性 + 追踪</span></div></header>

      <section id="map" data-knowledge-section className="mb-14">
        <SectionHeader number="01" title="先画出订单链路与责任边界" badge="知道失败会传到哪里" />
        <FlowFigure id="service-map" title="一次下单穿过的核心服务" items={[["网关", "路由与认证"], ["订单", "编排交易"], ["库存", "预占与释放"], ["优惠", "计算与核销"], ["支付", "扣款与退款"]]} />
        <Card title="建立服务测试地图"><BulletList items={["记录服务负责人、接口契约、存储和上下游。", "标出同步调用、异步事件与第三方边界。", "为每条调用记录超时、重试、幂等和降级策略。", "列出订单号、支付号、traceId 等关联键。"]} /></Card>
        <Callout>成功响应统一检查 HTTP 200，但微服务的业务结果仍由响应体业务码和跨服务最终状态决定。</Callout>
      </section>

      <section id="layers" data-knowledge-section className="mb-14">
        <SectionHeader number="02" title="把风险放到合适的测试层" badge="不要全靠 E2E" />
        <TableCard title="微服务测试的四个层级" headers={["层级", "验证目标", "优势", "限制"]} rows={layerRows} />
        <Card title="当优惠规则改变时，怎样分层"><BulletList items={["单元测试穷举门槛、叠加与金额精度。", "契约测试保证订单服务仍能解析优惠响应。", "组件测试验证优惠超时和数据库写入。", "只保留少量 E2E 验证真实下单和取消。"]} /></Card>
      </section>

      <section id="gateway" data-knowledge-section className="mb-14">
        <SectionHeader number="03" title="验证网关路由、认证与授权" badge="入口安全边界" />
        <TableCard title="当……时，……网关用例" headers={["场景", "预期"]} rows={[
          ["当访问令牌有效且用户拥有订单时，查询详情", "HTTP 200，响应体返回自己的订单"], ["当令牌过期时，提交订单", "401，网关不转发到订单服务"],
          ["当普通用户查询他人订单时", "403 或业务拒绝，响应体不泄露订单信息"], ["当重复提交相同幂等键时", "HTTP 200，响应体指向同一订单"],
        ]} />
        <CodeBlock title="pytest 网关验证">{`def test_当用户查询他人订单时_网关拒绝(gateway, user_token):
    response = gateway.get("/api/orders/OTHER-1", token=user_token)
    assert response.status_code == 403
    assert "paidAmount" not in response.text

def test_当重复提交相同幂等键时_只创建一个订单(gateway, payload):
    headers = {"Idempotency-Key": "case-order-001"}
    first = gateway.post("/api/orders", json=payload, headers=headers)
    second = gateway.post("/api/orders", json=payload, headers=headers)
    assert first.status_code == second.status_code == 200
    assert first.json()["data"]["orderId"] == second.json()["data"]["orderId"]`}</CodeBlock>
      </section>

      <section id="contract" data-knowledge-section className="mb-14">
        <SectionHeader number="04" title="用契约测试控制服务演进" badge="兼容消费者" />
        <FlowFigure id="contract-flow" title="消费者驱动契约反馈环" items={[["订单消费者", "声明期望"], ["契约仓库", "版本化保存"], ["库存提供者", "验证实现"], ["部署门禁", "阻断破坏"]]} />
        <CodeBlock title="库存响应契约测试">{`def test_inventory_reserve_contract(inventory_client):
    response = inventory_client.reserve({
        "orderId": "O-CONTRACT-1", "skuId": "SKU-1", "quantity": 1
    })
    assert response.status_code == 200
    body = response.json()
    assert body["businessCode"] == "SUCCESS"
    assert isinstance(body["data"]["reservationId"], str)
    assert body["data"]["status"] == "RESERVED"`}</CodeBlock>
        <Callout>新增可选字段通常兼容，删除字段、改名、改类型或改变业务语义可能破坏消费者。契约通过后仍需保留真实集成测试。</Callout>
      </section>

      <section id="timeout" data-knowledge-section className="mb-14">
        <SectionHeader number="05" title="验证超时、重试与幂等共同工作" badge="重试会放大副作用" />
        <TableCard title="同步依赖故障目录" headers={["故障", "系统行为", "重点断言"]} rows={faultRows} />
        <CodeBlock title="toxiproxy 故障注入示例">{`# 给支付上游增加 1500ms 延迟
curl -X POST http://localhost:8474/proxies/payment/toxics \\
  -H "Content-Type: application/json" \\
  -d '{"name":"latency","type":"latency","attributes":{"latency":1500}}'

# 用同一幂等键发起支付；成功时 HTTP 200，仍检查响应体
curl -X POST http://localhost:8080/api/payments \\
  -H "Idempotency-Key: pay-O-1001" \\
  -d '{"orderId":"O-1001","amount":"80.00"}'`}</CodeBlock>
        <Card title="时间预算"><p>入口总超时必须大于内部关键步骤之和，并为序列化、排队和网络留出余量。下游超时不能比上游等待更长，否则请求已经放弃，下游仍继续消耗资源。</p></Card>
      </section>

      <section id="resilience" data-knowledge-section className="mb-14">
        <SectionHeader number="06" title="测试熔断、降级、限流和恢复" badge="状态转换可观察" />
        <FlowFigure id="breaker-flow" title="熔断器不是一个错误码" items={[["Closed", "正常调用"], ["失败超阈值", "记录并打开"], ["Open", "快速失败或降级"], ["Half-open", "少量探测"], ["恢复", "重新关闭"]]} />
        <CodeBlock title="故障演练断言">{`def test_当优惠服务持续超时时_熔断并安全降级(shop):
    shop.inject_timeout(service="coupon", count=10)
    results = [shop.preview_order("SKU-1") for _ in range(12)]

    assert any(r.headers.get("X-Circuit-State") == "OPEN" for r in results)
    assert all(r.status_code == 200 for r in results)
    assert all(r.json()["businessCode"] == "COUPON_UNAVAILABLE" for r in results)
    assert shop.count_created_orders() == 0`}</CodeBlock>
        <Callout>降级必须对用户透明说明风险。无法确认优惠金额时，不应悄悄按原价创建订单；恢复后还要验证熔断器不会长期停留在半开状态。</Callout>
      </section>

      <section id="transaction" data-knowledge-section className="mb-14">
        <SectionHeader number="07" title="验证分布式事务与补偿" badge="最终一致但不可失控" />
        <TableCard title="Saga 中断点与补偿" headers={["中断点", "补偿动作", "最终断言"]} rows={transactionRows} />
        <CodeBlock title="跨服务状态轮询">{`def wait_until(fetch, predicate, timeout=10):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        value = fetch()
        if predicate(value):
            return value
        time.sleep(0.2)
    raise AssertionError("business state did not converge")

def test_当支付失败时_库存最终释放(order_api, inventory_api, order):
    order_api.pay(order["orderId"], force="DECLINED")
    reservation = wait_until(
        lambda: inventory_api.get(order["reservationId"]),
        lambda x: x["status"] == "RELEASED",
    )
    assert reservation["releasedQuantity"] == 1`}</CodeBlock>
        <Callout>不要用固定等待猜测最终一致。轮询业务状态，并设置明确超时；同时检查补偿只执行一次、重复触发幂等、人工修复入口可用。</Callout>
      </section>

      <section id="trace" data-knowledge-section className="mb-14">
        <SectionHeader number="08" title="用日志、指标与追踪还原故障传播" badge="跨服务证据链" />
        <Card title="一条 trace 应回答"><BulletList items={["请求经过哪些服务，各阶段耗时多少。", "traceId、orderId、paymentId 是否贯穿且可搜索。", "哪次调用超时、重试、熔断或进入补偿。", "响应中的错误是否映射到正确责任服务。", "日志不泄露令牌、卡号、地址等敏感信息。"]} /></Card>
        <CodeBlock title="W3C Trace Context 调用示例">{`curl -i http://localhost:8080/api/orders/O-1001 \\
  -H "Authorization: Bearer $TEST_TOKEN" \\
  -H "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"

# 检查：网关、订单、库存、支付 span 共享同一 traceId
# 检查：错误 span 带 order.id、peer.service 与 retry.count`}</CodeBlock>
      </section>

      <section id="practice" data-knowledge-section className="mb-14">
        <SectionHeader number="09" title="完成一次微服务故障演练" badge="练习与验收" />
        <Card title="练习：验证商城交易链"><BulletList ordered items={["画出网关、订单、库存、优惠、支付和退款依赖图。", "为未认证、越权和重复幂等键写“当……时，……”用例。", "建立订单消费者与库存提供者契约。", "注入库存超时，确认超时预算和重试次数。", "让优惠服务持续失败，观察熔断、降级和恢复。", "在 Saga 每个步骤后中断，核对补偿与最终状态。", "验证支付成功但确认超时时不会重复扣款。", "用 traceId 和订单号还原一次失败时间线。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><ChecklistCard title="边界清楚" items={["依赖地图完整", "契约版本化", "认证授权覆盖", "幂等键可追踪"]} /><ChecklistCard title="故障可控" items={["超时预算合理", "重试不放大", "熔断可恢复", "降级不误导"]} /><ChecklistCard title="状态可信" items={["补偿可重放", "最终状态可验证", "追踪链完整", "敏感信息脱敏"]} /></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">同步调用和分布式事务已经可测。下一步进入消息重复、丢失、乱序和积压的异步世界。</p><Link href="/knowledge/message-queue-testing" className="inline-flex items-center gap-2 text-sm text-neon-cyan">继续学习消息队列测试 <ArrowRight className="h-4 w-4" /></Link></div>
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
function FlowFigure({ id, title, items }: { id: string; title: string; items: readonly (readonly [string, string])[] }) { return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby={id}><figcaption id={id} className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className={cn("grid gap-2 md:items-center", items.length === 4 ? "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]" : "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]")}>{items.map((item, index) => <div key={item[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="block text-sm text-text-primary">{item[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{item[1]}</span></div>{index < items.length - 1 && <Network className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>; }
function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>; }
