import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Database, FileSearch, ShieldCheck } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "SQL 与数据库测试教程",
  description: "围绕商城下单业务，使用 SQL 准备测试数据、核对订单金额与库存、验证事务一致性，并定位页面与数据库差异。",
  path: "/knowledge/sql-database-testing",
  tags: ["SQL", "数据库测试", "数据一致性", "事务", "订单测试", "测试数据"],
});

const sections: SectionItem[] = [
  { id: "start", label: "追踪下单数据" },
  { id: "data", label: "准备测试数据" },
  { id: "select", label: "SELECT 与 WHERE" },
  { id: "join", label: "JOIN 关联核对" },
  { id: "aggregate", label: "GROUP BY 汇总" },
  { id: "amount", label: "订单金额核对" },
  { id: "inventory", label: "库存一致性" },
  { id: "transaction", label: "事务与并发" },
  { id: "diagnosis", label: "差异定位" },
  { id: "practice", label: "校验与练习" },
];

const tableRows: string[][] = [
  ["orders", "订单主表", "order_id、user_id、status、total_amount、pay_amount"],
  ["order_items", "订单商品明细", "order_id、sku_id、quantity、unit_price"],
  ["products", "商品与库存", "sku_id、stock、sale_price、version"],
  ["coupons", "优惠券", "coupon_id、threshold_amount、discount_amount、status"],
  ["coupon_records", "用户领券与使用记录", "user_id、coupon_id、order_id、use_status"],
];

const testDataRows: string[][] = [
  ["正常下单", "库存 10；购买 2 件；商品单价 60 元", "订单创建、库存扣 2、满减后实付 100 元"],
  ["库存边界", "库存 2；购买 2 件", "可以创建订单，库存变为 0"],
  ["库存不足", "库存 1；购买 2 件", "不创建订单，库存仍为 1"],
  ["优惠边界", "商品总额正好 100 元", "满 100 减 20 生效，实付 80 元"],
  ["重复提交", "相同幂等键连续提交两次", "只存在一笔订单，只扣一次库存"],
];

const joinRows: string[][] = [
  ["INNER JOIN", "只保留两边都匹配的数据", "找出订单与明细完整匹配的记录"],
  ["LEFT JOIN", "保留左表全部数据", "发现没有商品明细的异常订单"],
  ["多表 JOIN", "沿业务外键继续关联", "同时核对订单、商品、优惠券和用户"],
];

const consistencyRows: string[][] = [
  ["订单金额", "orders.total_amount", "SUM(order_items.quantity × unit_price)", "金额完全相等"],
  ["库存扣减", "products.stock", "下单前库存 - 成功购买数量", "失败订单不影响库存"],
  ["优惠券状态", "coupon_records.use_status", "订单是否成功创建", "成功时 USED，失败时 AVAILABLE"],
  ["订单状态", "orders.status", "支付或取消事件", "状态变化符合业务流转"],
];

const diagnosticRows: string[][] = [
  ["页面金额错误，接口也错误", "金额计算服务或规则配置", "请求参数、服务日志、订单明细"],
  ["接口正确，数据库错误", "落库映射、精度或事务", "SQL 参数、字段类型、提交与回滚日志"],
  ["数据库正确，页面错误", "接口转换、缓存或前端展示", "接口响应、缓存键、前端格式化"],
  ["偶发库存错误", "并发更新或消息重复", "版本号、幂等键、事务日志、消息 ID"],
];

export default function SqlDatabaseTestingPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=data-systems" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回数据与分布式测试模块
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索 SQL 与数据库测试...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Data Systems / Tutorial 10</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">SQL 与数据库测试教程</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">从“页面显示下单成功”继续向后检查，用数据证明订单、金额、库存和优惠券真的正确。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>商城下单数据链路</span><span>SQL + 图解 + 可执行校验</span></div>
        </header>

        <section id="start" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="从页面结果追到数据库" badge="结果要有数据证据" />
          <Card title="下单成功不等于数据一定正确">
            <p>页面出现“下单成功”后，继续确认四件事：订单只创建了一次、商品金额计算正确、库存扣减正确、优惠券状态与订单结果一致。SQL 能帮助你找到这些结果在数据库里的真实记录。</p>
          </Card>
          <DataTrailFigure />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="页面证据"><p>成功提示、订单号、实付金额和订单状态符合用户看到的结果。</p></Card>
            <Card title="接口证据"><p>响应码、业务码、订单 ID 和金额字段符合接口契约。</p></Card>
            <Card title="数据库证据"><p>订单、明细、库存和优惠记录之间能够互相对应。</p></Card>
          </div>
          <Callout>数据库测试不是看到一行记录就结束，而是检查一次业务操作影响的所有关键数据是否完整、一致、可追溯。</Callout>
        </section>

        <section id="data" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="看懂表关系并准备测试数据" badge="先知道数据在哪里" />
          <SchemaFigure />
          <TableCard title="下单链路中的核心数据表" headers={["数据表", "保存什么", "重点字段"]} rows={tableRows} />
          <DataPreparationFigure />
          <TableCard title="按场景准备一组可复用数据" headers={["测试场景", "准备的数据", "预期结果"]} rows={testDataRows} />
          <Card title="造数前先确认环境边界">
            <BulletList items={["优先使用专用测试环境和测试账号，不使用真实用户数据。", "能通过页面或接口准备的数据，优先走真实业务入口。", "必须写库造数时，先确认表约束、关联数据和回收方案。", "生产环境默认只做经过授权的只读查询，禁止直接修改业务数据。"]} />
          </Card>
        </section>

        <section id="select" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="用 SELECT 和 WHERE 找到目标订单" badge="先缩小查询范围" />
          <QueryFunnelFigure />
          <Card title="根据订单号查询一笔订单">
            <CodeBlock code={`SELECT
  order_id,
  user_id,
  status,
  total_amount,
  discount_amount,
  pay_amount,
  created_at
FROM orders
WHERE order_id = 'ORDER_202608090001';`} />
          </Card>
          <Card title="查询用户最近创建的订单">
            <CodeBlock code={`SELECT order_id, status, pay_amount, created_at
FROM orders
WHERE user_id = 10086
  AND created_at >= '2026-08-09 10:00:00'
  AND created_at <  '2026-08-09 11:00:00'
ORDER BY created_at DESC
LIMIT 20;`} />
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="查询条件要具体"><BulletList items={["优先使用订单号、用户 ID、幂等键等精确标识。", "时间范围同时写开始和结束，避免查到其他测试数据。", "明确排序和数量限制，防止结果顺序不稳定。"]} /></Card>
            <Card title="不要用 SELECT *"><BulletList items={["只查询本次要验证的字段。", "降低误读敏感字段和大字段的风险。", "字段变化时，校验脚本更容易发现影响。"]} /></Card>
          </div>
        </section>

        <section id="join" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="用 JOIN 核对订单与商品明细" badge="关联数据不能断" />
          <JoinFigure />
          <TableCard title="先根据验证目的选择 JOIN" headers={["方式", "保留的数据", "下单测试用途"]} rows={joinRows} />
          <Card title="查询订单及其商品明细">
            <CodeBlock code={`SELECT
  o.order_id,
  o.status,
  i.sku_id,
  i.quantity,
  i.unit_price,
  i.quantity * i.unit_price AS line_amount
FROM orders AS o
JOIN order_items AS i
  ON i.order_id = o.order_id
WHERE o.order_id = 'ORDER_202608090001';`} />
          </Card>
          <Card title="找出没有商品明细的异常订单">
            <CodeBlock code={`SELECT o.order_id, o.status, o.created_at
FROM orders AS o
LEFT JOIN order_items AS i
  ON i.order_id = o.order_id
WHERE i.order_id IS NULL
  AND o.created_at >= '2026-08-09 00:00:00';`} />
          </Card>
          <Callout>JOIN 后行数变多不一定是重复数据。一个订单包含多件商品时，订单主表的一行会对应明细表的多行。先理解一对一还是一对多，再判断结果是否异常。</Callout>
        </section>

        <section id="aggregate" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="用 GROUP BY 核对数量与汇总金额" badge="从明细算回总数" />
          <AggregationFigure />
          <Card title="按订单汇总商品数量和原始金额">
            <CodeBlock code={`SELECT
  order_id,
  SUM(quantity) AS total_quantity,
  SUM(quantity * unit_price) AS calculated_total
FROM order_items
WHERE order_id = 'ORDER_202608090001'
GROUP BY order_id;`} />
          </Card>
          <Card title="检查是否产生重复订单">
            <CodeBlock code={`SELECT
  idempotency_key,
  COUNT(*) AS order_count
FROM orders
WHERE user_id = 10086
  AND created_at >= '2026-08-09 10:00:00'
GROUP BY idempotency_key
HAVING COUNT(*) > 1;`} />
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="WHERE 先过滤"><p>WHERE 在分组前过滤原始行，例如限定本轮测试订单和时间范围。</p></Card>
            <Card title="HAVING 再筛选"><p>HAVING 在分组后过滤汇总结果，例如只保留出现两次以上的幂等键。</p></Card>
          </div>
        </section>

        <section id="amount" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="重新计算订单金额" badge="不要只相信结果字段" />
          <AmountEquationFigure />
          <Card title="用商品明细重新计算并与订单主表对比">
            <CodeBlock code={`SELECT
  o.order_id,
  o.total_amount AS stored_total,
  SUM(i.quantity * i.unit_price) AS calculated_total,
  o.discount_amount,
  o.pay_amount,
  SUM(i.quantity * i.unit_price)
    - o.discount_amount AS calculated_pay,
  o.pay_amount - (
    SUM(i.quantity * i.unit_price) - o.discount_amount
  ) AS difference
FROM orders AS o
JOIN order_items AS i
  ON i.order_id = o.order_id
WHERE o.order_id = 'ORDER_202608090001'
GROUP BY o.order_id, o.total_amount,
  o.discount_amount, o.pay_amount;`} />
          </Card>
          <Card title="金额校验需要回答的问题">
            <BulletList items={["明细金额之和是否等于订单原始金额。", "优惠门槛使用优惠前还是优惠后的金额判断。", "实付金额是否等于原始金额减去优惠。", "金额字段的精度、舍入方式和币种是否一致。", "差值是否严格为 0，还是允许明确的精度误差。"]} />
          </Card>
          <Callout>金融和交易字段不要用浮点数想当然地比较。先确认数据库字段类型、计算精度和舍入规则，再决定允许的差异范围。</Callout>
        </section>

        <section id="inventory" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="核对库存和跨表数据一致性" badge="失败时也要保持原状" />
          <ConsistencyFigure />
          <TableCard title="一次下单需要同时成立的关系" headers={["检查对象", "实际数据", "对照数据", "通过标准"]} rows={consistencyRows} />
          <Card title="查询商品当前库存">
            <CodeBlock code={`SELECT sku_id, stock, version, updated_at
FROM products
WHERE sku_id = 'SKU_10001';`} />
          </Card>
          <Card title="核对本轮成功订单扣减的商品数量">
            <CodeBlock code={`SELECT
  i.sku_id,
  SUM(i.quantity) AS sold_quantity
FROM order_items AS i
JOIN orders AS o
  ON o.order_id = i.order_id
WHERE i.sku_id = 'SKU_10001'
  AND o.status IN ('PENDING_PAYMENT', 'PAID', 'COMPLETED')
  AND o.created_at >= '2026-08-09 10:00:00'
  AND o.created_at <  '2026-08-09 11:00:00'
GROUP BY i.sku_id;`} />
          </Card>
          <Callout>库存核对需要记录操作前的基线。没有“下单前库存”，只看下单后的一个数字，无法证明本次操作到底扣了多少。</Callout>
        </section>

        <section id="transaction" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="验证事务、回滚和并发下单" badge="要么一起成功，要么一起失败" />
          <TransactionFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="成功事务"><BulletList items={["订单主表和商品明细同时写入。", "库存按购买数量扣减。", "优惠券标记为已使用并绑定订单。", "所有变化属于同一次明确的业务结果。"]} /></Card>
            <Card title="失败回滚"><BulletList items={["订单写入失败时不扣库存。", "库存扣减失败时不留下半成品订单。", "优惠券使用失败时不改变订单金额。", "超时重试不会重复执行已成功的动作。"]} /></Card>
          </div>
          <Card title="并发验证：两个请求同时购买最后一件商品">
            <CodeBlock code={`-- 请求完成后执行只读核对
SELECT sku_id, stock
FROM products
WHERE sku_id = 'SKU_LAST_ONE';

SELECT order_id, user_id, status
FROM orders
WHERE test_run_id = 'RUN_20260809_CONCURRENT'
ORDER BY created_at;

-- 预期：库存为 0，只有一个请求成功创建有效订单`} />
          </Card>
          <SafetyBoundary />
        </section>

        <section id="diagnosis" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="从差异反推问题所在层级" badge="先定位，再报缺陷" />
          <DiffPipelineFigure />
          <TableCard title="根据差异表现选择下一步证据" headers={["看到的现象", "优先怀疑", "继续收集"]} rows={diagnosticRows} />
          <Card title="找出订单主表与明细汇总不一致的记录">
            <CodeBlock code={`SELECT
  o.order_id,
  o.total_amount,
  COALESCE(SUM(i.quantity * i.unit_price), 0) AS item_total
FROM orders AS o
LEFT JOIN order_items AS i
  ON i.order_id = o.order_id
WHERE o.created_at >= '2026-08-09 00:00:00'
GROUP BY o.order_id, o.total_amount
HAVING o.total_amount <>
  COALESCE(SUM(i.quantity * i.unit_price), 0);`} />
          </Card>
          <Card title="记录足够复现的信息"><BulletList items={["测试环境、版本、执行时间和测试账号。", "订单号、商品 SKU、幂等键和本轮测试标识。", "页面截图、接口请求与响应、实际 SQL 结果。", "预期关系、实际差异和受影响的数据范围。"]} /></Card>
        </section>

        <section id="practice" data-knowledge-section className="mb-14">
          <SectionHeader number="10" title="把 SQL 变成可重复执行的校验" badge="查询结果要能判定" />
          <ValidationStackFigure />
          <Card title="用查询直接返回失败记录">
            <CodeBlock code={`SELECT
  o.order_id,
  o.pay_amount,
  o.total_amount - o.discount_amount AS expected_pay
FROM orders AS o
WHERE o.test_run_id = 'RUN_20260809_001'
  AND o.pay_amount <>
      o.total_amount - o.discount_amount;

-- 通过标准：返回 0 行；有返回值时，每一行都是待定位差异`} />
          </Card>
          <Card title="练习：独立完成一次下单数据核对">
            <BulletList ordered items={["准备一个有 5 件库存、单价 60 元并可使用满减券的商品。", "记录操作前库存和优惠券状态，再通过页面购买 2 件商品。", "使用 SELECT 和 WHERE 找到目标订单。", "使用 JOIN 查询订单明细和优惠券记录。", "使用 GROUP BY 重新计算商品数量和原始金额。", "核对实付金额、库存变化和优惠券状态。", "重复提交同一请求，确认订单数和库存不会再次变化。", "把查询整理为返回失败记录的可执行校验。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <ChecklistCard title="查询可控" items={["只查本轮数据", "字段范围明确", "时间边界明确", "结果顺序稳定"]} />
            <ChecklistCard title="结果可信" items={["记录操作前基线", "重新计算关键金额", "跨表关系已核对", "失败回滚已检查"]} />
            <ChecklistCard title="执行安全" items={["环境和权限确认", "默认使用只读 SQL", "测试数据可识别", "修改操作有回收方案"]} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6">
            <p className="text-sm text-text-secondary">能够独立核对下单数据后，继续学习 Python 与 pytest，把手工校验转化为可重复执行的测试代码。</p>
            <Link href="/knowledge/python-pytest-testing" className="inline-flex items-center gap-2 text-sm text-neon-cyan">
              继续学习 Python 与 pytest <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function SectionHeader({ number, title, badge }: { number: string; title: string; badge: string }) {
  return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{number}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>;
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

function CodeBlock({ code }: { code: string }) {
  return <div className="overflow-x-auto rounded-lg border border-space-border bg-neon-cyan/5"><pre className="min-w-[620px] p-4 font-mono text-xs leading-6 text-text-primary"><code>{code}</code></pre></div>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>;
}

function Figure({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby={id}><figcaption id={id} className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption>{children}</figure>;
}

function StepBox({ number, title, detail, accent = false }: { number: string; title: string; detail: string; accent?: boolean }) {
  return <div className={cn("rounded-lg border p-4", accent ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-neon-cyan/5")}><span className="font-mono text-[9px] text-neon-cyan">{number}</span><strong className="my-2 block text-sm text-text-primary">{title}</strong><p className="text-xs leading-6 text-text-secondary">{detail}</p></div>;
}

function DataTrailFigure() {
  const items = [["01", "页面", "提交订单"], ["02", "接口", "返回订单号"], ["03", "服务", "执行规则"], ["04", "数据库", "保存业务结果"]];
  return <Figure id="data-trail-title" title="一次下单会留下四层证据"><div className="grid gap-3 md:grid-cols-4">{items.map((item) => <StepBox key={item[0]} number={item[0]} title={item[1]} detail={item[2]} accent={item[0] === "04"} />)}</div></Figure>;
}

function SchemaFigure() {
  return <Figure id="schema-title" title="订单是核心，商品、库存和优惠数据通过主键与外键连接"><div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]"><StepBox number="A" title="products" detail="sku_id → 商品与库存" /><ArrowRight className="mx-auto hidden h-4 w-4 self-center text-neon-cyan md:block" /><StepBox number="B" title="orders + order_items" detail="order_id → 订单与明细" accent /><ArrowRight className="mx-auto hidden h-4 w-4 self-center text-neon-cyan md:block" /><StepBox number="C" title="coupon_records" detail="coupon_id + order_id → 使用记录" /></div></Figure>;
}

function DataPreparationFigure() {
  return <Figure id="data-preparation-title" title="准备数据时，同时记录操作前基线和可追踪标识"><div className="grid gap-3 sm:grid-cols-3"><StepBox number="01" title="建立基线" detail="记录库存、券状态和已有订单数" /><StepBox number="02" title="执行操作" detail="使用测试账号与 test_run_id 下单" accent /><StepBox number="03" title="对比变化" detail="只核对本次操作产生的差异" /></div></Figure>;
}

function QueryFunnelFigure() {
  const items = [["全表", "风险高、结果多", "w-full"], ["时间范围", "限定测试窗口", "w-5/6"], ["测试账号", "排除其他用户", "w-2/3"], ["订单号", "定位唯一结果", "w-1/2"]];
  return <Figure id="query-funnel-title" title="WHERE 条件逐步收窄，直到找到唯一业务记录"><div className="mx-auto flex max-w-2xl flex-col items-center gap-2">{items.map((item, index) => <div key={item[0]} className={cn("flex justify-between rounded-lg border px-4 py-3", item[2], index === items.length - 1 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-neon-cyan/5")}><strong className="text-xs text-text-primary">{item[0]}</strong><span className="text-xs text-text-secondary">{item[1]}</span></div>)}</div></Figure>;
}

function JoinFigure() {
  return <Figure id="join-title" title="JOIN 使用关联键，把分散的数据重新拼成一笔完整订单"><div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]"><StepBox number="主表" title="orders" detail="order_id = ORDER_001" /><div className="self-center text-center font-mono text-xs text-neon-cyan">order_id</div><StepBox number="明细" title="order_items" detail="SKU、数量、单价" accent /><div className="self-center text-center font-mono text-xs text-neon-cyan">sku_id</div><StepBox number="商品" title="products" detail="库存与商品信息" /></div></Figure>;
}

function AggregationFigure() {
  return <Figure id="aggregation-title" title="GROUP BY 把多行明细按订单聚合成可核对的结果"><div className="grid gap-4 md:grid-cols-3"><div className="rounded-lg border border-space-border p-4 text-xs leading-7 text-text-secondary"><strong className="block text-text-primary">明细行</strong>SKU-A × 2 = 120<br />SKU-B × 1 = 40</div><div className="flex items-center justify-center text-neon-cyan"><span className="font-mono text-xs">SUM + GROUP BY</span></div><div className="rounded-lg border border-neon-cyan/60 bg-neon-cyan/10 p-4 text-xs leading-7 text-text-secondary"><strong className="block text-text-primary">订单汇总</strong>商品数量 = 3<br />原始金额 = 160</div></div></Figure>;
}

function AmountEquationFigure() {
  const items = [["商品明细", "Σ 数量 × 单价"], ["优惠金额", "满足门槛后扣减"], ["实付金额", "原始金额 - 优惠"]];
  return <Figure id="amount-equation-title" title="金额不是孤立字段，而是一条可以重新计算的等式"><div className="grid gap-3 sm:grid-cols-3">{items.map((item, index) => <div key={item[0]} className={cn("rounded-lg border p-4 text-center", index === 2 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-neon-cyan/5")}><span className="text-xs text-text-secondary">{item[0]}</span><strong className="mt-2 block text-sm text-text-primary">{item[1]}</strong></div>)}</div><p className="mt-4 text-center font-mono text-xs text-neon-cyan">原始金额 - 优惠金额 = 实付金额</p></Figure>;
}

function ConsistencyFigure() {
  return <Figure id="consistency-title" title="同一个业务结果要在多张表中保持一致"><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><StepBox number="01" title="订单" detail="状态与金额" accent /><StepBox number="02" title="明细" detail="商品与数量" /><StepBox number="03" title="库存" detail="成功才扣减" /><StepBox number="04" title="优惠券" detail="使用状态同步" /></div></Figure>;
}

function TransactionFigure() {
  const items = [["BEGIN", "开始事务"], ["订单", "写主表与明细"], ["库存", "条件扣减"], ["优惠券", "标记已使用"], ["COMMIT", "全部成功后提交"]];
  return <Figure id="transaction-title" title="一次下单的关键变化应该处于同一个受控事务中"><div className="grid gap-2 sm:grid-cols-5">{items.map((item, index) => <div key={item[0]} className={cn("rounded-lg border p-3 text-center", index === items.length - 1 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-neon-cyan/5")}><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><strong className="my-2 block text-xs text-text-primary">{item[0]}</strong><p className="text-[11px] leading-5 text-text-secondary">{item[1]}</p></div>)}</div><p className="mt-4 text-center text-xs text-text-secondary">任一步失败 → ROLLBACK → 订单、库存和优惠券都恢复到操作前</p></Figure>;
}

function DiffPipelineFigure() {
  return <Figure id="diff-pipeline-title" title="沿数据链路逐层对比，可以把差异缩小到具体位置"><div className="grid gap-3 md:grid-cols-4"><StepBox number="01" title="页面" detail="用户看到了什么" /><StepBox number="02" title="接口" detail="服务返回了什么" /><StepBox number="03" title="数据库" detail="最终保存了什么" accent /><StepBox number="04" title="日志与事件" detail="中间发生了什么" /></div></Figure>;
}

function ValidationStackFigure() {
  return <Figure id="validation-stack-title" title="可执行校验需要明确输入、查询、判断和证据"><div className="grid gap-3 sm:grid-cols-4"><StepBox number="INPUT" title="输入" detail="订单号与测试标识" /><StepBox number="QUERY" title="查询" detail="只读 SQL" /><StepBox number="ASSERT" title="判断" detail="0 行或明确差值" accent /><StepBox number="EVIDENCE" title="证据" detail="保存失败记录" /></div></Figure>;
}

function SafetyBoundary() {
  return <div className="mb-4 rounded-xl border border-neon-cyan/40 bg-neon-cyan/5 p-5"><div className="mb-3 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-neon-cyan" /><h3 className="font-bold text-text-primary">数据库操作安全边界</h3></div><div className="grid gap-4 text-sm leading-7 text-text-secondary md:grid-cols-2"><div><div className="mb-2 flex items-center gap-2 font-semibold text-text-primary"><FileSearch className="h-4 w-4 text-neon-cyan" />默认允许的只读验证</div><p>在授权环境中使用 SELECT、受限 JOIN、COUNT 和 SUM，并通过精确条件限制范围。</p></div><div><div className="mb-2 flex items-center gap-2 font-semibold text-text-primary"><Database className="h-4 w-4 text-neon-cyan" />需要额外授权的操作</div><p>INSERT、UPDATE、DELETE、锁表、事务实验和并发压测必须在测试环境按方案执行，不能复制到生产环境。</p></div></div></div>;
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>;
}
