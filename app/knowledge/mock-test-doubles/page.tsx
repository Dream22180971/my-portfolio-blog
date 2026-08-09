import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, PlugZap } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "Mock 与测试桩实战教程",
  description: "围绕商城下单依赖，学习 Mock、Stub、Fake、Spy 的区别，掌握接口桩、浏览器拦截、异常复现和契约校验。",
  path: "/knowledge/mock-test-doubles",
  tags: ["Mock", "Stub", "测试桩", "测试替身", "服务虚拟化", "接口测试"],
});

const sections: SectionItem[] = [
  { id: "start", label: "为什么要替身" },
  { id: "types", label: "四类替身" },
  { id: "boundary", label: "选择边界" },
  { id: "function", label: "函数级 Stub" },
  { id: "service", label: "接口测试桩" },
  { id: "browser", label: "浏览器拦截" },
  { id: "failure", label: "异常场景" },
  { id: "contract", label: "契约校验" },
  { id: "strategy", label: "分层使用" },
  { id: "practice", label: "练习与检查" },
];

const doubleRows: string[][] = [
  ["Stub（桩）", "预先返回指定结果", "库存服务固定返回“库存不足”", "控制输入，让场景稳定出现"],
  ["Mock", "除了返回结果，还验证调用行为", "确认支付接口只调用一次", "检查是否按约定调用依赖"],
  ["Fake", "用简化实现代替真实组件", "内存优惠券仓库", "提供可运行但非生产级的实现"],
  ["Spy", "保留真实行为并记录调用", "记录订单仓库 save 的参数", "观察调用次数、顺序和参数"],
];

const boundaryRows: string[][] = [
  ["第三方支付", "费用、限流、不可控且不应真实扣款", "支付沙箱或接口桩", "上线前仍要完成真实沙箱联调"],
  ["库存服务", "需要稳定复现库存不足、超时和 500", "HTTP Stub", "保留一组真实集成回归"],
  ["优惠计算函数", "只验证订单服务如何处理返回值", "函数 Stub", "优惠规则本身应有独立真实测试"],
  ["订单数据库", "本次需要验证真实事务和落库", "不要替换", "使用隔离测试库和专用数据"],
  ["页面调用订单接口", "验证前端对异常响应的提示", "Playwright 路由拦截", "主流程仍调用真实测试接口"],
];

const failureRows: string[][] = [
  ["库存不足", "200 + OUT_OF_STOCK", "提示库存不足，不创建订单"],
  ["依赖超时", "连接超过约定时间", "提示稍后重试，不重复提交"],
  ["服务错误", "500 + INTERNAL_ERROR", "安全失败，不展示内部堆栈"],
  ["畸形响应", "缺少 amount 或类型错误", "前端或服务拒绝错误数据并记录异常"],
  ["重复回调", "同一 payment_id 返回两次", "只更新一次订单，不重复扣减"],
  ["乱序回调", "失败通知晚于成功通知到达", "状态不允许从成功退回失败"],
];

const contractRows: string[][] = [
  ["请求方法和路径", "POST /payments/confirm", "桩配置与真实接口一致"],
  ["请求字段", "order_id、amount、currency", "名称、类型和必填保持一致"],
  ["成功响应", "200 + payment_id + status", "代码示例和提供方文档一致"],
  ["错误响应", "业务码、message 和可重试标识", "异常用例不会依赖虚构字段"],
  ["版本变化", "新增字段或枚举值", "契约测试及时发现桩已经过期"],
];

const strategyRows: string[][] = [
  ["单元测试", "函数 Stub、Mock、Spy", "大量规则和异常快速反馈", "高"],
  ["服务测试", "HTTP Stub、Fake 依赖", "订单服务独立验证异常与重试", "高"],
  ["集成测试", "尽量使用真实数据库、缓存和服务", "验证组件真实协作", "中"],
  ["E2E 测试", "主流程真实，少量异常使用路由拦截", "验证用户完整体验", "低"],
  ["发布前联调", "真实沙箱和真实契约", "发现测试替身无法暴露的问题", "不使用替身代替"],
];

export default function MockTestDoublesPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=automation" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回自动化工程模块
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索 Mock 与测试桩关键词...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Automation / Tutorial 13</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">Mock 与测试桩实战教程</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">控制暂时不可用或不可预测的依赖，稳定复现真实业务中的成功、失败和异常。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>库存 + 优惠 + 支付依赖</span><span>pytest + HTTP Stub + Playwright</span></div>
        </header>

        <section id="start" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="真实依赖让异常场景难以重复" badge="先解决不可控" />
          <Card title="你要测试的下单链路">
            <p>订单服务需要调用库存、优惠和支付服务。正常下单很容易验证，但你还需要稳定复现库存超时、支付重复回调、优惠服务返回错误字段等情况。等待真实依赖偶然出错，既慢也不可重复。</p>
          </Card>
          <DependencyProblemFigure />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="依赖还没开发完"><p>先用约定好的请求和响应完成订单服务开发与测试，不必一直等待。</p></Card>
            <Card title="异常很难制造"><p>通过测试桩固定返回超时、500 或畸形数据，让同一问题可以重复验证。</p></Card>
            <Card title="真实调用有代价"><p>短信、支付和外部平台可能收费或产生真实副作用，测试必须隔离。</p></Card>
          </div>
          <Callout>测试替身解决的是“依赖不可控”，不是证明真实集成一定正确。替身测试通过后，仍需要真实服务、沙箱或契约测试兜底。</Callout>
        </section>

        <section id="types" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="先分清 Stub、Mock、Fake 和 Spy" badge="不要都叫 Mock" />
          <TestDoubleMapFigure />
          <TableCard title="四类测试替身承担不同任务" headers={["类型", "主要行为", "下单案例", "你要解决的问题"]} rows={doubleRows} />
          <Card title="一句话判断"><BulletList items={["只需要固定返回值：用 Stub。", "还要确认依赖被怎样调用：用 Mock。", "需要一个简化但可运行的实现：用 Fake。", "想保留行为并观察调用：用 Spy。"]} /></Card>
          <Callout>日常交流中把测试替身统称为 Mock 很常见，但设计测试时必须清楚你是在控制返回、验证交互，还是替换实现。</Callout>
        </section>

        <section id="boundary" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="只替换本次不需要验证的边界" badge="先确定测试目标" />
          <BoundaryDecisionFigure />
          <TableCard title="商城下单中的替换选择" headers={["依赖", "为什么考虑替换", "本次选择", "仍需保留什么"]} rows={boundaryRows} />
          <Card title="决定之前问三个问题"><BulletList ordered items={["本次真正要验证的是哪个组件和业务规则？", "真实依赖能否稳定、安全、低成本地提供所需场景？", "替换后会不会把本来应该发现的集成问题一起隐藏？"]} /></Card>
          <Callout>如果本次目标是验证订单数据库事务，就不能把数据库替换成内存 Fake；如果目标只是验证页面错误提示，拦截订单接口反而更直接。</Callout>
        </section>

        <section id="function" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="用函数 Stub 固定优惠结果" badge="pytest monkeypatch" />
          <FunctionStubFigure />
          <CodeBlock title="固定优惠服务返回值">{`def test_coupon_timeout_does_not_create_order(monkeypatch):
    def timeout_stub(*args, **kwargs):
        raise TimeoutError("coupon service timeout")

    monkeypatch.setattr(
        "order_service.coupon_client.calculate",
        timeout_stub,
    )

    result = create_order(user_id="u-1", sku_id="sku-1")

    assert result.code == "COUPON_SERVICE_UNAVAILABLE"
    assert result.order_id is None`}</CodeBlock>
          <Card title="这个 Stub 控制了什么"><BulletList items={["无论什么时候执行，都稳定抛出优惠服务超时。", "用例可以只关注订单服务怎样处理超时。", "测试没有调用真实优惠服务，也不会被网络状态影响。", "优惠服务自身是否正确，需要在它自己的测试中验证。"]} /></Card>
        </section>

        <section id="service" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="用 HTTP 测试桩代替远程服务" badge="服务边界" />
          <HttpStubFigure />
          <CodeBlock title="支付服务桩响应">{`{
  "request": {
    "method": "POST",
    "urlPath": "/payments/confirm",
    "bodyPatterns": [
      { "matchesJsonPath": "$.order_id" }
    ]
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "payment_id": "pay-test-001",
      "status": "SUCCESS"
    },
    "fixedDelayMilliseconds": 800
  }
}`}</CodeBlock>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="请求匹配"><BulletList items={["方法、路径和必要请求头正确。", "订单号、金额和币种符合约定。", "不匹配时明确失败，避免桩无条件返回成功。", "每条场景使用独立映射和测试标识。"]} /></Card>
            <Card title="响应控制"><BulletList items={["返回固定业务状态和字段。", "增加延迟复现慢响应和超时。", "返回 4xx、5xx 或连接中断。", "按调用次数返回不同结果，复现重试和恢复。"]} /></Card>
          </div>
          <Callout>好的测试桩应该像真实服务一样校验请求。如果任何请求都返回成功，调用方即使传错字段，测试也不会失败。</Callout>
        </section>

        <section id="browser" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="用 Playwright 拦截页面接口" badge="验证前端异常体验" />
          <BrowserRouteFigure />
          <CodeBlock title="拦截创建订单接口">{`test('当库存不足时，页面提示用户修改数量', async ({ page }) => {
  await page.route('**/api/orders', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        code: 'OUT_OF_STOCK',
        message: '库存不足'
      })
    });
  });

  await page.goto('/checkout');
  await page.getByRole('button', { name: '提交订单' }).click();

  await expect(page.getByText('库存不足')).toBeVisible();
  await expect(page.getByRole('button', { name: '修改数量' })).toBeVisible();
});`}</CodeBlock>
          <Card title="浏览器拦截适合验证"><BulletList items={["页面怎样展示业务错误。", "超时后按钮是否恢复可点击。", "服务错误时是否保留用户已经填写的内容。", "畸形响应是否触发安全兜底。", "不同响应状态下页面是否走向正确分支。"]} /></Card>
          <Callout>页面拦截验证的是前端行为，不证明真实订单接口会返回正确数据。核心下单主流程仍应调用真实测试接口完成 E2E 回归。</Callout>
        </section>

        <section id="failure" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="把难以复现的异常变成固定用例" badge="异常场景库" />
          <FailureCatalogFigure />
          <TableCard title="下单依赖的异常测试桩" headers={["场景", "桩返回或行为", "关键预期"]} rows={failureRows} />
          <Card title="每个异常用例继续检查"><BulletList items={["用户看到的提示是否明确且可操作。", "订单、库存、优惠券和支付状态是否保持一致。", "重试会不会产生重复订单或重复扣减。", "日志和指标是否记录依赖、耗时和业务 ID。", "恢复后能否继续完成原来的业务。"]} /></Card>
        </section>

        <section id="contract" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="防止测试桩和真实接口越走越远" badge="契约漂移" />
          <ContractLoopFigure />
          <TableCard title="测试桩必须跟随的接口契约" headers={["契约部分", "支付接口示例", "检查方式"]} rows={contractRows} />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="消费者提供预期"><p>订单服务记录自己依赖的请求与响应结构，通过消费者契约测试确认调用代码和桩都符合预期。</p></Card>
            <Card title="提供方验证契约"><p>支付服务在自己的流水线中执行这些契约，接口变更时及时发现哪些消费者会受到影响。</p></Card>
          </div>
          <Callout>测试桩长期不校验契约，会变成“永远正确的假服务”：测试全部通过，真实联调却因为字段、枚举或错误码变化而失败。</Callout>
        </section>

        <section id="strategy" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="把测试替身放进分层策略" badge="替换越少越接近真实" />
          <DoublePyramidFigure />
          <TableCard title="不同测试层级怎样使用替身" headers={["层级", "替身方式", "主要价值", "使用比例"]} rows={strategyRows} />
          <Card title="发现这些信号就要减少 Mock"><BulletList items={["一个用例需要配置十几个 Mock 才能运行。", "内部方法重命名就导致大量测试失败。", "Mock 返回的数据比真实接口文档还复杂。", "自动化一直通过，真实环境却频繁联调失败。", "团队已经没人能说明每个替身对应哪个真实版本。"]} /></Card>
          <Callout>底层测试可以大量使用替身换取速度和可控性；越接近用户和发布，越应该减少替身，增加真实组件、真实数据结构和真实依赖验证。</Callout>
        </section>

        <section id="practice" data-knowledge-section className="mb-14">
          <SectionHeader number="10" title="完成一套可维护的支付测试桩" badge="从场景到交付" />
          <Card title="练习：控制支付依赖完成订单服务测试">
            <BulletList ordered items={["画出订单服务与库存、优惠、支付和数据库的依赖关系。", "说明本次验证目标，并选择哪些依赖替换、哪些保留真实。", "分别为成功、失败、超时、重复回调和畸形响应建立测试桩。", "让支付桩校验 order_id、amount 和 currency，而不是无条件返回成功。", "使用 Mock 确认同一订单只调用一次支付确认接口。", "使用 Playwright 路由拦截验证页面在支付超时后的提示和恢复。", "建立请求与响应契约，并设计桩版本过期时的失败机制。", "保留一组真实支付沙箱集成测试，说明它与桩测试分别保护什么。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <ChecklistCard title="替换边界正确" items={["验证目标明确", "真实组件没有误替换", "副作用得到隔离", "仍保留真实联调"]} />
            <ChecklistCard title="场景可以信任" items={["请求匹配严格", "响应符合契约", "异常可以重复", "状态和数据有断言"]} />
            <ChecklistCard title="长期可以维护" items={["桩有版本负责人", "契约变化会失败", "过期映射会清理", "失败证据可定位"]} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6">
            <p className="text-sm text-text-secondary">掌握测试替身后，继续用 Playwright 把真实主流程和可控异常组合成稳定的 Web E2E 回归。</p>
            <Link href="/knowledge/playwright-test-automation" className="inline-flex items-center gap-2 text-sm text-neon-cyan">继续学习 Playwright 自动化 <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function SectionHeader({ number, title, badge }: { number: string; title: string; badge: string }) {
  return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{number}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>;
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

function CodeBlock({ title, children }: { title: string; children: string }) {
  return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>;
}

function FlowFigure({ id, title, items }: { id: string; title: string; items: readonly (readonly [string, string])[] }) {
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby={id}><figcaption id={id} className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className={cn("grid gap-2 md:items-center", items.length === 4 ? "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]" : "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]")}>{items.map((item, index) => <div key={item[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="block text-sm text-text-primary">{item[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>;
}

function DependencyProblemFigure() {
  return <FlowFigure id="dependency-problem-title" title="订单服务依赖三个外部结果才能完成下单" items={[["用户提交", "商品与地址"], ["库存服务", "是否可以扣减"], ["优惠服务", "实付金额"], ["支付服务", "确认与回调"], ["订单结果", "状态与数据"]]} />;
}

function TestDoubleMapFigure() {
  const items = [["Stub", "控制返回"], ["Mock", "验证交互"], ["Fake", "简化实现"], ["Spy", "记录调用"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="double-map-title"><figcaption id="double-map-title" className="mb-5 text-sm font-bold text-text-primary">测试替身不是一种工具，而是四种不同职责</figcaption><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => <div key={item[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><strong className="my-2 block text-sm text-text-primary">{item[0]}</strong><p className="text-xs text-text-secondary">{item[1]}</p></div>)}</div></figure>;
}

function BoundaryDecisionFigure() {
  return <FlowFigure id="boundary-decision-title" title="先确定验证目标，再决定替换范围" items={[["验证目标", "这次要证明什么"], ["真实依赖", "是否可控且安全"], ["替换边界", "只替换非目标"], ["保留回归", "真实集成仍验证"]]} />;
}

function FunctionStubFigure() {
  return <FlowFigure id="function-stub-title" title="函数 Stub 把不可控调用替换为固定结果" items={[["订单逻辑", "调用优惠计算"], ["monkeypatch", "替换目标函数"], ["超时 Stub", "稳定抛出异常"], ["业务断言", "订单安全失败"]]} />;
}

function HttpStubFigure() {
  return <FlowFigure id="http-stub-title" title="HTTP 测试桩站在真实服务的网络位置" items={[["订单服务", "发送真实 HTTP"], ["请求匹配", "方法、路径、字段"], ["测试桩", "选择预设场景"], ["固定响应", "成功、错误、延迟"], ["订单断言", "结果和副作用"]]} />;
}

function BrowserRouteFigure() {
  return <FlowFigure id="browser-route-title" title="浏览器拦截只替换页面与接口之间的响应" items={[["页面操作", "用户提交订单"], ["route 拦截", "匹配请求"], ["构造响应", "库存不足"], ["页面处理", "提示与恢复"]]} />;
}

function FailureCatalogFigure() {
  const items = [["业务失败", "库存不足"], ["技术失败", "500 与断连"], ["时间问题", "延迟与超时"], ["数据问题", "缺字段和错类型"], ["时序问题", "重复与乱序"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="failure-catalog-title"><figcaption id="failure-catalog-title" className="mb-5 text-sm font-bold text-text-primary">异常场景从五个方向建立</figcaption><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{items.map((item) => <div key={item[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><PlugZap className="mb-3 h-4 w-4 text-neon-cyan" /><strong className="block text-sm text-text-primary">{item[0]}</strong><p className="mt-2 text-xs text-text-secondary">{item[1]}</p></div>)}</div></figure>;
}

function ContractLoopFigure() {
  return <FlowFigure id="contract-loop-title" title="契约让消费者、测试桩和真实提供方保持一致" items={[["消费者预期", "记录请求与响应"], ["测试桩", "按契约模拟"], ["提供方验证", "流水线执行契约"], ["变更反馈", "不兼容立即失败"]]} />;
}

function DoublePyramidFigure() {
  const layers = [["真实沙箱联调", "验证最终集成", "w-3/5"], ["E2E", "少量受控异常", "w-3/4"], ["服务测试", "HTTP Stub 与 Fake", "w-11/12"], ["单元测试", "Stub、Mock、Spy", "w-full"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="double-pyramid-title"><figcaption id="double-pyramid-title" className="mb-5 text-sm font-bold text-text-primary">越接近发布，越少依赖测试替身</figcaption><div className="mx-auto flex max-w-3xl flex-col items-center gap-2">{layers.map((layer, index) => <div key={layer[0]} className={cn("flex items-center justify-between rounded-lg border px-4 py-3", layer[2], index === 0 ? "border-neon-cyan/50 bg-neon-cyan/10" : "border-space-border bg-space-card/50")}><strong className="text-sm text-text-primary">{layer[0]}</strong><span className="text-xs text-text-secondary">{layer[1]}</span></div>)}</div></figure>;
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>;
}
