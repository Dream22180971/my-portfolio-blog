import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, FileSearch } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "Playwright 自动化测试教程",
  description: "围绕商城下单流程，学习 Playwright 项目结构、稳定定位、页面对象、测试数据、等待断言、失败诊断和持续集成。",
  path: "/knowledge/playwright-test-automation",
  tags: ["Playwright", "Web 自动化", "E2E 测试", "页面对象", "持续集成"],
});

const sections: SectionItem[] = [
  { id: "start", label: "自动化目标" },
  { id: "project", label: "项目结构" },
  { id: "locator", label: "稳定定位" },
  { id: "pom", label: "页面对象" },
  { id: "data", label: "测试数据" },
  { id: "assertion", label: "等待与断言" },
  { id: "network", label: "接口协同" },
  { id: "fixture", label: "登录与隔离" },
  { id: "debug", label: "失败诊断" },
  { id: "ci", label: "CI 与练习" },
];

const locatorRows: string[][] = [
  ["优先", "getByRole / getByLabel", "按钮、输入框和对话框", "接近用户和无障碍语义，页面改版后更稳定"],
  ["其次", "getByText / getByPlaceholder", "稳定且唯一的业务文案", "可读性好，但需要确认多语言和文案变化"],
  ["约定", "getByTestId", "没有稳定语义的复杂组件", "需要团队维护测试标识"],
  ["谨慎", "CSS / XPath", "无法增加语义或测试标识的旧页面", "容易依赖 DOM 层级和样式类"],
];

const assertionRows: string[][] = [
  ["页面", "成功提示、按钮状态、订单号", "用户是否看到正确结果"],
  ["接口", "响应状态、业务码、关键字段", "请求是否按契约完成"],
  ["业务", "金额、优惠、库存和订单状态", "核心规则是否正确"],
  ["数据", "订单只创建一次，库存只扣减一次", "跨层结果是否保持一致"],
];

const ciRows: string[][] = [
  ["提交前", "冒烟用例", "1～3 分钟", "核心页面可以打开，主流程没有立即阻塞"],
  ["合并请求", "核心回归", "5～15 分钟", "P0/P1 场景、接口依赖和主要浏览器通过"],
  ["定时任务", "完整回归", "按项目规模", "更广的浏览器、数据组合和低频场景"],
];

export default function PlaywrightTestAutomationPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=automation" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回自动化工程模块
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索 Playwright 实战关键词...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Automation / Tutorial 14</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">Playwright 自动化测试教程</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">把“浏览器能自动点击”升级为“核心业务可以稳定、独立、可诊断地持续回归”。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>商城下单 E2E</span><span>TypeScript + CI</span></div>
        </header>

        <section id="start" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="先确定哪些下单流程值得自动化" badge="风险优先" />
          <Card title="你要守住的核心流程">
            <p>用户登录商城，选择商品，填写地址，使用优惠券并提交订单。自动化测试需要确认页面操作成功、订单金额正确、订单只创建一次，而且失败时能留下足够证据。</p>
          </Card>
          <AutomationScopeFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="适合优先自动化"><BulletList items={["每天或每次发布都要执行的主流程。", "金额、库存、订单状态等高风险规则。", "步骤稳定、结果可以明确判断的场景。", "人工执行耗时且容易遗漏的重复回归。"]} /></Card>
            <Card title="暂时不要急着自动化"><BulletList items={["需求仍在频繁变化的临时页面。", "只执行一次且没有长期回归价值的场景。", "结果依赖主观视觉判断、尚无明确标准的功能。", "无法准备独立数据、执行后会污染生产的操作。"]} /></Card>
          </div>
          <Callout>自动化不是把所有人工用例翻译成脚本。先覆盖高风险、重复执行且结果稳定的场景，脚本才会持续产生价值。</Callout>
        </section>

        <section id="project" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="搭建一套能长期维护的项目结构" badge="职责分开" />
          <ProjectStructureFigure />
          <CodeBlock title="项目目录">{`tests/
  checkout.spec.ts       # 用例只表达业务场景
pages/
  checkout.page.ts       # 页面元素和操作
fixtures/
  authenticated.ts       # 登录状态与公共上下文
data/
  checkout.ts            # 商品、地址和优惠券数据
playwright.config.ts     # 浏览器、报告与失败证据`}</CodeBlock>
          <Card title="先写最小可运行用例">
            <CodeBlock title="tests/checkout.spec.ts">{`import { test, expect } from '@playwright/test';

test('当库存充足且地址有效时，订单创建成功', async ({ page }) => {
  await page.goto('/checkout');
  await page.getByLabel('购买数量').fill('1');
  await page.getByRole('button', { name: '提交订单' }).click();

  await expect(page.getByText('下单成功')).toBeVisible();
  await expect(page.getByTestId('order-id')).not.toBeEmpty();
});`}</CodeBlock>
          </Card>
        </section>

        <section id="locator" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="用用户看得懂的方式定位元素" badge="稳定优先" />
          <LocatorPriorityFigure />
          <TableCard title="定位方式的选择顺序" headers={["级别", "推荐方式", "适用位置", "判断依据"]} rows={locatorRows} />
          <CodeBlock title="稳定定位示例">{`await page.getByRole('button', { name: '提交订单' }).click();
await page.getByLabel('手机号').fill('13800138000');
await page.getByTestId('coupon-card').filter({ hasText: '满100减20' }).click();`}</CodeBlock>
          <Callout>不要用 <code>{".form > div:nth-child(3) button"}</code> 记录页面结构。优先描述“用户要操作什么”，页面小幅改版后脚本才不容易失效。</Callout>
        </section>

        <section id="pom" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="用页面对象封装操作，不隐藏业务判断" badge="页面与用例分层" />
          <PageObjectFigure />
          <CodeBlock title="pages/checkout.page.ts">{`import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/checkout');
  }

  async fillAddress(phone: string) {
    await this.page.getByLabel('手机号').fill(phone);
  }

  async submit() {
    await this.page.getByRole('button', { name: '提交订单' }).click();
  }

  async expectSuccess() {
    await expect(this.page.getByText('下单成功')).toBeVisible();
  }
}`}</CodeBlock>
          <Callout>页面对象负责“在哪里操作、怎样操作”；测试用例负责“为什么这样操作、应该得到什么业务结果”。不要把所有断言都塞进一个万能方法。</Callout>
        </section>

        <section id="data" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="让每条用例拥有独立测试数据" badge="可重复执行" />
          <TestDataLifecycleFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="执行前准备"><BulletList items={["通过测试接口创建商品、库存和优惠券。", "使用唯一业务标识，避免并行用例相互覆盖。", "只准备当前用例真正需要的数据。", "不要依赖上一条用例执行成功。"]} /></Card>
            <Card title="执行后处理"><BulletList items={["记录订单 ID，便于失败时定位。", "测试环境允许时清理临时数据。", "无法删除的业务数据使用专用租户或日期前缀隔离。", "禁止在生产环境运行创建、支付或删除类自动化。"]} /></Card>
          </div>
          <CodeBlock title="使用唯一数据">{`const runId = Date.now() + '-' + testInfo.workerIndex;
const addressName = 'E2E-' + runId;

await request.post('/test-support/addresses', {
  data: { name: addressName, phone: '13800138000' }
});`}</CodeBlock>
        </section>

        <section id="assertion" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="等待业务结果，而不是等待固定秒数" badge="自动重试断言" />
          <WaitingFigure />
          <CodeBlock title="等待与断言">{`// 不推荐：页面快慢变化后容易偶发失败
await page.waitForTimeout(3000);

// 推荐：等待真正的业务结果出现
await expect(page.getByText('下单成功')).toBeVisible();
await expect(page.getByTestId('order-status')).toHaveText('待支付');
await expect.poll(async () => getOrder(orderId)).toMatchObject({ status: 'PENDING_PAYMENT' });`}</CodeBlock>
          <TableCard title="一条下单用例需要检查的结果" headers={["层级", "检查内容", "回答的问题"]} rows={assertionRows} />
        </section>

        <section id="network" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="让页面操作和接口结果互相印证" badge="UI 不等于全部" />
          <UiApiFigure />
          <CodeBlock title="监听创建订单响应">{`const createOrderResponse = page.waitForResponse((response) =>
  response.url().includes('/api/orders') && response.request().method() === 'POST'
);

await checkout.submit();
const response = await createOrderResponse;
const body = await response.json();

expect(response.status()).toBe(200);
expect(body.orderId).toBeTruthy();
await expect(page.getByTestId('order-id')).toHaveText(body.orderId);`}</CodeBlock>
          <Card title="什么时候拦截接口"><BulletList items={["第三方服务不稳定且不是本次验证目标。", "需要稳定复现超时、500 或特殊响应。", "需要验证前端在异常响应下的提示与恢复。", "不能用 Mock 代替所有真实集成回归。"]} /></Card>
        </section>

        <section id="fixture" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="复用登录状态，同时保持用例隔离" badge="Fixture" />
          <FixtureFigure />
          <CodeBlock title="复用已登录上下文">{`import { test as base } from '@playwright/test';

export const test = base.extend({
  storageState: 'playwright/.auth/user.json',
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: '我的订单' })).toBeVisible();
});`}</CodeBlock>
          <Callout>可以复用登录状态，但不要让不同用例共享购物车、订单或可变库存。身份可以复用，业务数据应尽量独立。</Callout>
        </section>

        <section id="debug" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="让失败结果能够快速定位" badge="证据链" />
          <FailureEvidenceFigure />
          <CodeBlock title="playwright.config.ts">{`import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['html', { open: 'never' }]],
  retries: process.env.CI ? 2 : 0,
});`}</CodeBlock>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="先判断失败属于哪一类"><BulletList items={["产品缺陷：实际业务结果与预期不一致。", "脚本缺陷：定位、等待或数据准备不正确。", "环境问题：服务、网络或依赖不可用。", "偶发问题：需要用 trace 和日志找到真实触发条件。"]} /></Card>
            <Card title="重试不能掩盖问题"><BulletList items={["重试通过仍要记录首次失败原因。", "持续偶发的用例需要修复，而不是无限增加重试。", "报告中保留 trace、截图、视频、请求和业务 ID。", "只有确认环境抖动时才把用例标记为不稳定。"]} /></Card>
          </div>
        </section>

        <section id="ci" data-knowledge-section className="mb-14">
          <SectionHeader number="10" title="把稳定用例放进持续集成" badge="分层回归" />
          <TableCard title="按反馈速度组织自动化任务" headers={["触发时机", "执行范围", "目标时长", "通过标准"]} rows={ciRows} />
          <CodeBlock title="CI 命令">{`npx playwright test --project=chromium --grep @smoke
npx playwright test --project=chromium
npx playwright show-report`}</CodeBlock>
          <Card title="练习：完成下单 E2E 项目">
            <BulletList ordered items={["选择 3 条 P0 下单用例，说明为什么值得自动化。", "创建 CheckoutPage，只封装页面元素和重复操作。", "通过接口准备独立商品、库存、地址和优惠券。", "用语义定位完成下单，不使用依赖层级的 XPath。", "同时断言页面结果、创建订单响应和关键业务数据。", "复现接口超时，验证用户可以安全重试且不会重复下单。", "开启 trace、截图和 HTML 报告，故意制造失败并完成一次定位。", "把冒烟用例接入 CI，并设置明确的运行环境和失败退出条件。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <ChecklistCard title="脚本稳定" items={["定位语义清楚", "没有固定等待", "数据彼此隔离", "重复执行结果一致"]} />
            <ChecklistCard title="结果可信" items={["关键业务有断言", "接口与页面一致", "失败保留证据", "重试不掩盖缺陷"]} />
            <ChecklistCard title="可以持续运行" items={["用例按标签分层", "环境参数外置", "CI 失败会阻断", "报告可以追溯"]} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6">
            <p className="text-sm text-text-secondary">完成页面自动化后，继续把冒烟、回归、报告和失败治理接入持续测试流水线。</p>
            <Link href="/knowledge/continuous-testing-cicd" className="inline-flex items-center gap-2 text-sm text-neon-cyan">继续学习持续测试与 CI/CD <ArrowRight className="h-4 w-4" /></Link>
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

function AutomationScopeFigure() {
  return <FlowFigure id="automation-scope-title" title="从业务风险到可持续回归" items={[["选择场景", "高风险且重复"], ["准备数据", "独立且可恢复"], ["执行浏览器", "模拟真实用户"], ["检查结果", "页面、接口和数据"], ["保留证据", "报告与 trace"]]} />;
}

function ProjectStructureFigure() {
  return <FlowFigure id="project-structure-title" title="每一层只承担一种职责" items={[["测试用例", "表达业务场景"], ["页面对象", "封装页面操作"], ["Fixture", "提供身份与上下文"], ["数据层", "准备和清理数据"]]} />;
}

function LocatorPriorityFigure() {
  const levels = [["01", "角色与标签", "最接近用户语义"], ["02", "稳定业务文案", "确认唯一且不易变化"], ["03", "测试标识", "复杂组件的团队约定"], ["04", "CSS / XPath", "旧系统最后选择"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="locator-priority-title"><figcaption id="locator-priority-title" className="mb-5 text-sm font-bold text-text-primary">从上到下选择定位方式</figcaption><div className="grid gap-2 md:grid-cols-4">{levels.map((level) => <div key={level[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="font-mono text-[9px] text-neon-cyan">{level[0]}</span><strong className="my-2 block text-sm text-text-primary">{level[1]}</strong><p className="text-xs text-text-secondary">{level[2]}</p></div>)}</div></figure>;
}

function PageObjectFigure() {
  return <FlowFigure id="page-object-title" title="业务用例调用页面能力，页面对象不决定业务是否通过" items={[["用例", "条件与预期"], ["页面对象", "定位与操作"], ["浏览器页面", "真实交互"], ["断言", "业务结果"]]} />;
}

function TestDataLifecycleFigure() {
  return <FlowFigure id="test-data-title" title="每条用例拥有完整的数据生命周期" items={[["生成标识", "避免名称冲突"], ["准备数据", "接口快速创建"], ["执行用例", "独立完成场景"], ["记录结果", "保存业务 ID"], ["清理隔离", "恢复测试环境"]]} />;
}

function WaitingFigure() {
  return <FlowFigure id="waiting-title" title="等待真正的业务条件成立" items={[["触发操作", "提交订单"], ["等待响应", "创建接口完成"], ["等待页面", "成功状态出现"], ["轮询业务", "订单状态落稳"]]} />;
}

function UiApiFigure() {
  return <FlowFigure id="ui-api-title" title="一次 E2E 验证连接三个观察面" items={[["页面操作", "用户提交订单"], ["接口响应", "获得订单 ID"], ["页面结果", "展示相同订单"], ["业务数据", "金额与库存正确"]]} />;
}

function FixtureFigure() {
  return <FlowFigure id="fixture-title" title="共享稳定上下文，隔离可变业务数据" items={[["登录状态", "可复用"], ["浏览器上下文", "每条用例独立"], ["订单数据", "每条用例新建"], ["执行结束", "保存或清理"]]} />;
}

function FailureEvidenceFigure() {
  const items = [["Trace", "操作、DOM 与网络"], ["截图", "失败瞬间页面"], ["视频", "完整操作过程"], ["请求日志", "接口输入与响应"], ["业务 ID", "追踪后端数据"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="failure-evidence-title"><figcaption id="failure-evidence-title" className="mb-5 text-sm font-bold text-text-primary">失败报告至少留下五类证据</figcaption><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{items.map((item) => <div key={item[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><FileSearch className="mb-3 h-4 w-4 text-neon-cyan" /><strong className="block text-sm text-text-primary">{item[0]}</strong><p className="mt-2 text-xs leading-5 text-text-secondary">{item[1]}</p></div>)}</div></figure>;
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>;
}
