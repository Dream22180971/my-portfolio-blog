import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, GitBranch } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "Python 与 pytest 测试开发教程",
  description: "围绕商城订单、库存、优惠、支付与退款，学习 Python 测试代码、pytest 用例、Fixture、参数化、Mock、日志报告与项目组织。",
  path: "/knowledge/python-pytest-testing",
  tags: ["Python", "pytest", "测试开发", "Fixture", "参数化"],
});

const sections: SectionItem[] = [
  { id: "start", label: "从场景到代码" }, { id: "python", label: "Python 基础" },
  { id: "first-test", label: "第一条用例" }, { id: "assertion", label: "断言与异常" },
  { id: "fixture", label: "Fixture" }, { id: "parameterize", label: "参数化" },
  { id: "data", label: "数据驱动" }, { id: "mock", label: "Mock" },
  { id: "diagnosis", label: "日志与报告" }, { id: "project", label: "工程与练习" },
];

const typeRows = [
  ["dict", "订单请求、接口响应", "order[\"status\"]"], ["list", "商品明细、优惠券集合", "items[0]"],
  ["Decimal", "金额计算", "Decimal(\"99.90\")"], ["dataclass", "结构固定的业务对象", "Order(id, amount)"],
];
const fixtureRows = [
  ["function", "每条用例", "独立订单、库存"], ["module", "当前文件", "只读商品目录"],
  ["session", "整次运行", "HTTP 客户端、报告配置"],
];
const caseRows = [
  ["当库存充足且优惠有效时，提交订单", "返回 200，响应体 businessCode=SUCCESS，实付金额正确"],
  ["当优惠券过期时，提交订单", "返回 200，响应体拒绝优惠且不创建订单"],
  ["当支付重复回调时，处理回调", "返回 200，响应体确认已处理，订单只变更一次"],
  ["当退款金额超过实付金额时，申请退款", "返回 200，响应体业务失败且不生成退款单"],
];

export default function PythonPytestTestingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=automation" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回自动化工程模块</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索 Python 与 pytest 关键词...">
      <header className="mb-10">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Automation / Tutorial 11</div>
        <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">Python 与 pytest 测试开发教程</h1>
        <p className="mb-6 text-lg leading-8 text-text-secondary">从“会执行测试步骤”走到“能把业务规则写成可重复、可维护、可诊断的测试代码”。</p>
        <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>商城交易案例</span><span>Python + pytest</span></div>
      </header>

      <section id="start" data-knowledge-section className="mb-14">
        <SectionHeader number="01" title="先把测试场景翻译成代码结构" badge="业务先于语法" />
        <FlowFigure id="learning-flow" title="一条测试从需求到证据" items={[["业务规则", "库存与优惠"], ["测试数据", "输入与前置"], ["执行动作", "下单或退款"], ["分层断言", "响应与状态"], ["失败证据", "日志和报告"]]} />
        <Card title="商城下单业务链"><p>用户购买商品时，系统先校验库存和优惠，再创建订单并发起支付；支付成功后扣减库存，取消或售后时进入退款。你会把这条链拆成小函数、小对象和独立用例。</p></Card>
        <Callout>HTTP 状态码只说明请求处理结果。下面的成功示例统一使用 200，但业务成功与否仍要检查响应体中的业务码、状态和金额。</Callout>
      </section>

      <section id="python" data-knowledge-section className="mb-14">
        <SectionHeader number="02" title="掌握写测试真正需要的 Python" badge="最小必要集" />
        <TableCard title="业务数据与 Python 类型" headers={["类型", "商城用途", "示例"]} rows={typeRows} />
        <CodeBlock title="order.py">{`from dataclasses import dataclass
from decimal import Decimal

@dataclass(frozen=True)
class Order:
    order_id: str
    status: str
    paid_amount: Decimal

def payable_amount(price: Decimal, quantity: int, discount: Decimal) -> Decimal:
    if quantity <= 0:
        raise ValueError("quantity must be positive")
    return max(price * quantity - discount, Decimal("0.00"))`}</CodeBlock>
        <Card title="学习顺序"><BulletList items={["先会变量、集合、条件、循环和函数。", "再用类型标注表达输入输出，用 dataclass 表达订单。", "金额必须使用 Decimal，避免浮点误差。", "异常只表示调用不能正常继续，不要拿字符串代替业务状态。"]} /></Card>
      </section>

      <section id="first-test" data-knowledge-section className="mb-14">
        <SectionHeader number="03" title="写出第一条可执行 pytest 用例" badge="Arrange Act Assert" />
        <FlowFigure id="aaa-flow" title="用例保持一个清晰因果" items={[["Arrange", "准备价格和优惠"], ["Act", "计算实付"], ["Assert", "检查业务结果"]]} />
        <CodeBlock title="test_order.py">{`from decimal import Decimal
from order import payable_amount

def test_当库存充足且优惠有效时_实付金额正确():
    price = Decimal("100.00")
    quantity = 2
    discount = Decimal("20.00")

    actual = payable_amount(price, quantity, discount)

    assert actual == Decimal("180.00")`}</CodeBlock>
        <CodeBlock title="运行命令">{`python -m venv .venv
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
python -m pip install pytest
python -m pytest -q`}</CodeBlock>
      </section>

      <section id="assertion" data-knowledge-section className="mb-14">
        <SectionHeader number="04" title="断言业务结果，也验证异常边界" badge="失败要可读" />
        <TableCard title="商城场景的可验证结果" headers={["场景", "预期"]} rows={caseRows} />
        <CodeBlock title="响应体与异常断言">{`import pytest

def test_当下单成功时_检查响应体而不只看HTTP状态(order_client):
    response = order_client.create({"skuId": "SKU-1", "quantity": 1})
    assert response.status_code == 200
    body = response.json()
    assert body["businessCode"] == "SUCCESS"
    assert body["data"]["status"] == "PENDING_PAYMENT"

def test_当购买数量为零时_拒绝计算():
    with pytest.raises(ValueError, match="quantity must be positive"):
        payable_amount(Decimal("10.00"), 0, Decimal("0.00"))`}</CodeBlock>
      </section>

      <section id="fixture" data-knowledge-section className="mb-14">
        <SectionHeader number="05" title="用 Fixture 管理前置、清理和依赖" badge="资源有生命周期" />
        <TableCard title="Fixture 作用域选择" headers={["scope", "复用范围", "适合内容"]} rows={fixtureRows} />
        <CodeBlock title="conftest.py">{`import pytest

@pytest.fixture
def available_sku(inventory_api):
    sku_id = inventory_api.create_sku(stock=10)
    yield sku_id
    inventory_api.archive_sku(sku_id)

@pytest.fixture
def paid_order(order_api, available_sku):
    order = order_api.create_and_pay(available_sku)
    yield order
    order_api.cancel_if_possible(order["orderId"])`}</CodeBlock>
        <Callout>Fixture 提供状态，不替用例隐藏业务动作。测试退款可以依赖“已支付订单”，但“申请退款”仍应清楚写在测试正文中。</Callout>
      </section>

      <section id="parameterize" data-knowledge-section className="mb-14">
        <SectionHeader number="06" title="用参数化覆盖边界，不复制用例" badge="一个规则一组数据" />
        <CodeBlock title="优惠边界参数化">{`import pytest
from decimal import Decimal

@pytest.mark.parametrize(
    ("total", "coupon", "expected"),
    [
        ("99.99", "20.00", "99.99"),
        ("100.00", "20.00", "80.00"),
        ("100.01", "20.00", "80.01"),
    ],
    ids=["below-threshold", "at-threshold", "above-threshold"],
)
def test_当订单金额接近门槛时_优惠计算正确(total, coupon, expected):
    actual = apply_coupon(Decimal(total), Decimal("100.00"), Decimal(coupon))
    assert actual == Decimal(expected)`}</CodeBlock>
        <Card title="参数化检查"><BulletList items={["每一组数据都验证同一条规则。", "ids 能直接说明失败边界。", "不要把完全不同的业务流程塞进一个巨型参数表。", "0、1、门槛前后、最大值和非法值都要有依据。"]} /></Card>
      </section>

      <section id="data" data-knowledge-section className="mb-14">
        <SectionHeader number="07" title="把数据驱动和数据工厂分开" badge="默认有效，按需覆盖" />
        <CodeBlock title="factories.py">{`from copy import deepcopy

DEFAULT_ORDER = {
    "skuId": "SKU-1",
    "quantity": 1,
    "couponCode": None,
    "addressId": "ADDR-1",
}

def order_payload(**overrides):
    payload = deepcopy(DEFAULT_ORDER)
    payload.update(overrides)
    return payload

def test_当库存不足时_响应体返回明确原因(order_client):
    response = order_client.create(order_payload(quantity=999))
    assert response.status_code == 200
    assert response.json()["businessCode"] == "OUT_OF_STOCK"`}</CodeBlock>
        <Callout>外部 JSON/CSV 适合大量稳定数据；业务组合更适合工厂函数。数据来源不应把断言、流程和清理逻辑藏起来。</Callout>
      </section>

      <section id="mock" data-knowledge-section className="mb-14">
        <SectionHeader number="08" title="用 Mock 控制边界，不伪造整个世界" badge="只替换外部依赖" />
        <FlowFigure id="mock-boundary" title="退款服务的可控单元边界" items={[["测试", "发起退款"], ["退款规则", "真实执行"], ["支付网关", "Mock 返回"], ["断言", "金额与调用"]]} />
        <CodeBlock title="支付网关 Mock">{`def test_当支付网关退款成功时_订单进入退款中(mocker):
    gateway = mocker.Mock()
    gateway.refund.return_value = {"success": True, "refundId": "R-1"}
    service = RefundService(gateway)

    result = service.apply(order_id="O-1", amount="80.00")

    assert result.status == "REFUNDING"
    gateway.refund.assert_called_once_with("O-1", "80.00")`}</CodeBlock>
        <Callout>Mock 证明的是“你的代码怎样处理约定响应”，不能证明真实支付服务一定符合约定。下一阶段仍需要契约测试和真实联调。</Callout>
      </section>

      <section id="diagnosis" data-knowledge-section className="mb-14">
        <SectionHeader number="09" title="让日志、失败信息和报告形成证据链" badge="先能定位再谈重试" />
        <CodeBlock title="pytest.ini">{`[pytest]
addopts = -ra --strict-markers
log_cli = true
log_cli_level = INFO
markers =
    smoke: 核心交易冒烟
    regression: 完整业务回归`}</CodeBlock>
        <CodeBlock title="运行与报告">{`python -m pytest -m smoke -q
python -m pytest --junitxml=reports/junit.xml
python -m pytest --html=reports/report.html --self-contained-html`}</CodeBlock>
        <Card title="失败时至少留下"><BulletList items={["用例名和参数 ID。", "环境、版本和执行时间。", "订单号、商品号、支付号或退款号。", "响应状态、业务码和必要响应体。", "调用栈与清理结果；日志中不得输出令牌或支付敏感信息。"]} /></Card>
      </section>

      <section id="project" data-knowledge-section className="mb-14">
        <SectionHeader number="10" title="组织项目并完成一次小型测试开发" badge="可维护交付" />
        <CodeBlock title="推荐目录">{`tests/
  unit/                  # 金额和状态规则
  api/                   # 订单、库存、支付、退款接口
  conftest.py            # 共享 Fixture
clients/                 # HTTP 与业务客户端
factories/               # 测试数据工厂
pytest.ini
requirements-test.txt`}</CodeBlock>
        <Card title="练习：完成商城交易测试包"><BulletList ordered items={["为金额计算写正常、边界和异常测试。", "用 Fixture 创建库存商品和已支付订单，并保证精确清理。", "用参数化覆盖优惠门槛前、门槛值和门槛后。", "Mock 支付超时，验证订单不会被错误标记为已支付。", "调用下单接口时检查 HTTP 200 和响应体业务结果。", "为重复支付回调和超额退款各写一条“当……时，……”用例。", "输出 JUnit 报告并故意制造失败，确认订单号和参数可定位。", "按 unit、api、smoke 标记运行，记录每层耗时。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><ChecklistCard title="代码清楚" items={["函数职责单一", "金额使用 Decimal", "类型表达业务", "异常边界明确"]} /><ChecklistCard title="用例可信" items={["名称描述因果", "数据互相隔离", "断言业务结果", "Mock 边界明确"]} /><ChecklistCard title="工程可运行" items={["目录职责清楚", "命令可重复", "报告可追溯", "敏感信息不入日志"]} /></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">你已经能用 pytest 表达业务规则。下一步把这些能力扩展到可维护的接口自动化工程。</p><Link href="/knowledge/api-test-automation" className="inline-flex items-center gap-2 text-sm text-neon-cyan">继续学习接口自动化测试 <ArrowRight className="h-4 w-4" /></Link></div>
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
function FlowFigure({ id, title, items }: { id: string; title: string; items: readonly (readonly [string, string])[] }) { return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby={id}><figcaption id={id} className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className={cn("grid gap-2 md:items-center", items.length === 3 ? "md:grid-cols-[1fr_auto_1fr_auto_1fr]" : "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]")}>{items.map((item, index) => <div key={item[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="block text-sm text-text-primary">{item[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{item[1]}</span></div>{index < items.length - 1 && <GitBranch className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>; }
function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>; }
