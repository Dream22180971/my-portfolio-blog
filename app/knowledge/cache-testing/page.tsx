import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({ title: "缓存测试实战教程", description: "以商城订单、库存与商品详情为主线，系统学习缓存命中、穿透、击穿、雪崩、热 Key、大 Key、数据一致性与 Redis 故障测试。", path: "/knowledge/cache-testing", tags: ["缓存测试", "Redis", "数据一致性", "稳定性测试"] });

const sections: SectionItem[] = [
  { id: "map", label: "缓存地图" }, { id: "baseline", label: "命中与回源" }, { id: "penetration", label: "穿透" }, { id: "breakdown", label: "击穿" }, { id: "avalanche", label: "雪崩" },
  { id: "hot-big", label: "热Key与大Key" }, { id: "consistency", label: "一致性" }, { id: "failure", label: "Redis故障" }, { id: "practice", label: "练习与清单" },
];

const riskRows = [
  ["穿透", "查询不存在的商品，每次都落到数据库", "空值缓存、布隆过滤器、参数校验"],
  ["击穿", "爆款商品缓存刚失效，大量请求同时回源", "互斥重建、逻辑过期、请求合并"],
  ["雪崩", "大量 Key 同时过期或 Redis 整体不可用", "过期时间抖动、多级缓存、限流降级"],
  ["热 Key", "单个商品或库存 Key 承担绝大多数流量", "分片、副本、本地缓存、热点识别"],
  ["大 Key", "订单聚合对象过大，读写和删除阻塞", "拆分结构、渐进删除、大小门禁"],
];

const caseRows = [
  ["当首次查询商品详情时，系统应回源数据库并写入缓存", "删除测试 Key；请求一次详情", "DB 查询 1 次；缓存写入；响应正确"],
  ["当再次查询同一商品时，系统应命中缓存", "连续请求相同商品", "DB 查询不再增加；命中率提升"],
  ["当更新商品价格时，用户不应长期读到旧价格", "更新价格后持续查询", "在约定 SLA 内返回新值，不回写旧值"],
  ["当 Redis 不可用时，核心下单链路应按策略降级", "隔离环境断开 Redis", "不发生缓存依赖级联；告警和恢复记录完整"],
];

export default function CacheTestingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=distributed-data" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回分布式系统与数据链路模块</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索缓存测试关键词...">
      <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Distributed Quality / Tutorial 18</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">缓存测试实战教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">从“接口返回得快”继续追问：缓存失效、热点爆发和 Redis 故障时，订单、库存与价格还能否保持正确。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>9 个章节</span><span>商城交易主线</span><span>Redis + 一致性 + 故障</span></div></header>

      <Section id="map" number="01" title="先画出商城缓存地图" badge="知道缓存了什么">
        <Flow title="商城读写链路" items={[["用户请求","商品详情 / 下单"],["应用服务","读取或更新业务"],["Redis","商品、库存、订单快照"],["数据库","最终事实来源"]]} />
        <Table title="缓存五类核心风险" headers={["风险", "商城表现", "常见防护"]} rows={riskRows} />
        <Card title="先回答五个问题"><List items={["缓存 Key 的命名、数据结构、TTL 和容量上限是什么？","读写采用 Cache Aside、Read Through 还是其他模式？","数据库与缓存谁是事实来源，允许多久不一致？","缓存未命中、超时或返回坏数据时走什么路径？","哪些 Key 会影响金额、库存和订单状态，必须按 P0 处理？"]} /></Card>
        <Callout>缓存测试不是只执行 GET 和 SET。你要证明性能收益存在，同时证明缓存不会把旧价格、错误库存或过期订单状态放大给更多用户。</Callout>
      </Section>

      <Section id="baseline" number="02" title="建立命中、未命中与回源基线" badge="先测正常路径">
        <Table title="可直接执行的基础用例" headers={["用例标题", "操作", "关键断言"]} rows={caseRows} />
        <Code title="Redis CLI：隔离测试 Key">{`SET test:product:1001 '{"price":9900,"stock":10}' EX 300
TTL test:product:1001
GET test:product:1001
DEL test:product:1001`}</Code>
        <Card title="执行步骤"><List ordered items={["使用专用商品和 test: 前缀，记录数据库原值。","清空单个测试 Key，发送一次请求并记录 DB 查询、延迟和缓存内容。","再次请求，确认命中缓存且业务响应不变。","等待 TTL 或主动失效，确认能正确回源并重建。","结束后只删除本次创建的测试 Key。"]} /></Card>
      </Section>

      <Section id="penetration" number="03" title="阻止不存在的数据持续穿透" badge="保护数据库">
        <Card title="用例：当并发查询不存在的商品时，数据库不应被重复击穿"><List items={["构造一个永不存在的商品 ID，并发请求 100 次。","确认参数校验、布隆过滤器或空值缓存生效。","统计应用请求数、缓存未命中数与数据库查询数。","验证空值 TTL 较短，商品随后创建时不会长期不可见。"]} /></Card>
        <Code title="k6 场景示意">{`export default function () {
  const id = "NOT-EXIST-" + (__VU % 5);
  http.get(BASE_URL + "/api/products/" + id);
}
// 断言：100 次请求不应对应 100 次数据库查询`}</Code>
        <Callout>只看 HTTP 404 会漏掉真正风险：返回完全正确，但每次 404 都查一次数据库，攻击流量仍可能拖垮系统。</Callout>
      </Section>

      <Section id="breakdown" number="04" title="验证爆款缓存击穿防护" badge="一个 Key 同时过期">
        <Timeline title="爆款商品失效时的正确行为" items={[["T0","热点 Key 过期"],["T1","一个请求获得重建权"],["T2","其他请求等待或读逻辑旧值"],["T3","新值写入后恢复命中"]]} />
        <Card title="用例：当爆款 Key 在高并发下失效时，只应触发受控回源"><List items={["预热爆款商品并把 TTL 调到可控短时间。","在过期点同时发起高并发读取。","断言数据库查询数被限制，锁有超时且不会死锁。","重建失败时旧值、错误响应或降级结果符合策略。","重建后所有请求最终读取同一版本。"]} /></Card>
      </Section>

      <Section id="avalanche" number="05" title="让缓存雪崩成为可控退化" badge="大量 Key 同时失效">
        <Table title="雪崩演练矩阵" headers={["注入", "观察", "通过标准"]} rows={[["同批 1000 个商品 Key 同时过期","DB QPS、连接池、P99","不过载；限流生效；恢复后无持续积压"],["Redis 延迟增加 300ms","线程池、超时、重试","重试有上限，不形成重试风暴"],["一个节点不可用","错误率、故障转移","核心读请求按策略恢复或降级"],["缓存命中率骤降","告警与回源比例","告警及时且能定位到 Key 空间"]]} />
        <Card title="预防性检查"><List items={["TTL 是否加入合理随机抖动，而不是同一秒批量过期。","缓存超时是否短于下游总超时，重试是否带退避。","数据库是否有回源限流和熔断保护。","降级数据是否明确标识，支付价格不可用旧值静默结算。"]} /></Card>
      </Section>

      <Section id="hot-big" number="06" title="识别热 Key 与大 Key" badge="不让单点拖慢集群">
        <div className="grid gap-4 md:grid-cols-2"><Card title="热 Key 测试"><List items={["按 Key 统计访问频率和节点负载。","模拟爆款和普通商品的流量倾斜。","验证副本、本地缓存或拆分策略。","检查热点消失后资源能否恢复。"]} /></Card><Card title="大 Key 测试"><List items={["测量序列化大小、元素数量和操作耗时。","验证读取、更新、过期和删除的尾延迟。","检查拆分与渐进删除是否生效。","设置超过阈值的写入门禁和告警。"]} /></Card></div>
        <Code title="只读检查示意">{`redis-cli --bigkeys
redis-cli --hotkeys
MEMORY USAGE test:order:aggregate:1001
# 仅在隔离测试环境使用诊断命令`}</Code>
      </Section>

      <Section id="consistency" number="07" title="验证数据库与缓存一致性" badge="连接上一章的数据链路">
        <Flow title="订单取消后的更新路径" items={[["取消订单","写数据库 CANCELLED"],["提交事务","发送失效事件"],["删除缓存","避免继续读旧值"],["再次查询","回源并写入新状态"]]} />
        <Card title="用例：当订单取消与查询并发发生时，不应把旧状态覆盖回缓存"><List ordered items={["准备 PAID 订单并预热缓存。","暂停一次旧状态查询，在数据库提交 CANCELLED。","触发缓存删除，再释放旧查询继续执行。","断言旧值不会覆盖新值；最终页面、API、缓存和数据库均为 CANCELLED。","重复取消，确认退款和库存释放仍只有一次。"]} /></Card>
        <Callout>一致性测试必须同时检查“最终读到新值”和“没有重复副作用”。前者保护展示，后者保护库存与资金。</Callout>
      </Section>

      <Section id="failure" number="08" title="演练 Redis 超时、断连与恢复" badge="故障不等于删除数据">
        <Card title="安全演练步骤"><List ordered items={["只在隔离环境声明故障范围、观察窗口和终止条件。","记录基线命中率、订单成功率、DB QPS 与 P99。","注入延迟、连接失败或单节点故障，不执行 FLUSHALL。","验证超时、熔断、限流、降级、告警与故障转移。","撤销故障，确认连接池、命中率和业务指标恢复且数据一致。"]} /></Card>
        <Table title="恢复验收" headers={["对象", "必须证明"]} rows={[["商品读取","可降级但不会把错误价格用于结算"],["库存扣减","不能只改缓存；数据库事实与防超卖规则仍有效"],["订单查询","短暂失败可解释，恢复后不长期返回旧状态"],["监控告警","故障开始、影响、恢复都有时间线"]]} />
      </Section>

      <Section id="practice" number="09" title="完成一次缓存测试小项目" badge="练习与检查清单">
        <Card title="练习"><List ordered items={["为商品、库存和订单画出 Key、TTL、读写模式与事实来源。","执行命中、未命中、过期、更新和删除的基线用例。","分别设计一条穿透、击穿、雪崩、热 Key 和大 Key 用例。","模拟订单取消与缓存回填竞态，保留完整时间线。","注入 Redis 延迟，输出业务影响、告警、降级与恢复报告。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><Check title="设计前" items={["Key 与 TTL 明确","一致性 SLA 明确","测试数据隔离","故障边界批准"]} /><Check title="执行中" items={["业务与技术指标齐全","并发与竞态已覆盖","不使用危险清库命令","证据带订单与 traceId"]} /><Check title="完成后" items={["缓存与数据库一致","资源恢复基线","测试 Key 已清理","高风险场景进入回归"]} /></div>
        
      </Section>
    </KnowledgeLayout>
  </div>;
}

function Section({ id, number, title, badge, children }: { id: string; number: string; title: string; badge: string; children: React.ReactNode }) { return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{number}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>{children}</section>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={`mt-3 space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>{items.map(x => <li key={x}>{x}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map(h => <th key={h} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{h}</th>)}</tr></thead><tbody>{rows.map(r => <tr key={r.join("-")} className="border-b border-space-border/50 last:border-0">{r.map((c,i) => <td key={`${c}-${i}`} className="px-4 py-2.5 text-xs leading-relaxed">{c}</td>)}</tr>)}</tbody></table></div></Card>; }
function Code({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function Flow({ title, items }: { title: string; items: readonly (readonly [string,string])[] }) { return <figure className="card-glow mb-4 rounded-xl p-5"><figcaption className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className="grid gap-2 md:grid-cols-7 md:items-center">{items.map((x,i) => <div className="contents" key={x[0]}><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="block text-sm text-text-primary">{x[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{x[1]}</span></div>{i < items.length-1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>; }
function Timeline({ title, items }: { title: string; items: readonly (readonly [string,string])[] }) { return <Card title={title}><div className="grid gap-3 md:grid-cols-4">{items.map(x => <div key={x[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="font-mono text-[10px] text-neon-cyan">{x[0]}</span><p className="mt-2 text-xs text-text-primary">{x[1]}</p></div>)}</div></Card>; }
function Check({ title, items }: { title: string; items: readonly string[] }) { return <Card title={title}><ul className="space-y-3">{items.map(x => <li key={x} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />{x}</li>)}</ul></Card>; }
