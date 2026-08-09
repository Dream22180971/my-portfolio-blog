import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleAlert, GitBranch } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "接口自动化测试教程",
  description: "围绕商城下单 API，使用 pytest 与 requests 构建可维护的接口自动化测试项目，覆盖封装、数据、断言、幂等、一致性、报告和 CI。",
  path: "/knowledge/api-test-automation",
  tags: ["接口自动化", "pytest", "requests", "httpx", "幂等测试", "持续集成"],
});

const sections: SectionItem[] = [
  { id: "contract", label: "读懂接口" },
  { id: "project", label: "工程骨架" },
  { id: "client", label: "请求封装" },
  { id: "data", label: "测试数据" },
  { id: "assertions", label: "分层断言" },
  { id: "parameterize", label: "参数化" },
  { id: "security", label: "鉴权与幂等" },
  { id: "consistency", label: "数据核对" },
  { id: "fixtures", label: "Fixture 与报告" },
  { id: "ci", label: "CI 与诊断" },
];

const contractRows = [
  ["请求方法", "POST /api/orders", "创建资源使用 POST，不应被缓存为普通查询"],
  ["认证", "Authorization: Bearer <token>", "缺失、过期、伪造和越权令牌都要验证"],
  ["幂等", "Idempotency-Key", "相同业务请求重试时只能生成一笔订单"],
  ["请求体", "sku_id、quantity、address_id、coupon_id", "类型、必填、边界和对象归属都要覆盖"],
  ["成功响应", "200 + order_id + amount + status", "字段值还要与服务端真实数据一致"],
  ["失败响应", "4xx/5xx + code + message", "失败时不能留下订单、库存或优惠券脏数据"],
];

const dataRows = [
  ["用户", "普通会员 user_a", "拥有地址 address_a，不拥有 address_b"],
  ["商品", "sku_1001", "单价 50 元，库存 5 件，可正常销售"],
  ["优惠券", "coupon_20", "满 100 减 20，归属于 user_a，未过期"],
  ["清理策略", "按 case_id 查询并删除", "只清理本次测试创建的数据"],
];

const assertionRows = [
  ["协议层", "状态码、Content-Type、响应时间", "200；application/json；小于约定阈值"],
  ["结构层", "字段、类型、必填结构", "order_id 为非空字符串，amount 为数字"],
  ["业务层", "金额、状态、错误码", "100 - 20 = 80；状态为 PENDING_PAYMENT"],
  ["数据层", "订单、库存、优惠券", "一笔订单；库存减 2；优惠券被占用一次"],
  ["副作用层", "消息、日志、重复请求", "只发送一次订单创建事件，不重复扣库存"],
];

const caseRows = [
  ["P0", "当库存等于购买数量时，创建订单成功", "200；只生成一笔订单；库存变为 0"],
  ["P0", "当使用相同幂等键重复提交时，只生成一笔订单", "两次返回同一业务结果；只扣一次库存"],
  ["P0", "当使用其他用户的地址时，订单创建失败", "403 或明确业务错误；无数据写入"],
  ["P1", "当购买数量为 0 时，接口拒绝请求", "400；返回 quantity 错误；库存不变"],
  ["P1", "当订单金额正好为 100 元时，满减券生效", "实付 80 元；优惠券占用状态正确"],
  ["P1", "当令牌过期时，订单创建失败", "401；不创建订单；不暴露内部信息"],
];

const projectTree = `api-tests/
├─ pytest.ini                 # 标记、超时与报告配置
├─ requirements.txt           # pytest、requests 或 httpx
├─ clients/
│  ├─ base_client.py          # URL、请求、日志、超时
│  └─ order_client.py         # 下单接口动作
├─ data/
│  └─ order_cases.py          # 参数化数据
├─ helpers/
│  ├─ assertions.py           # 可读的业务断言
│  └─ db.py                   # 只读数据核对
├─ tests/
│  └─ test_create_order.py    # 用例只表达业务意图
└─ conftest.py                # fixture 与清理策略`;

const baseClientCode = `# clients/base_client.py
import requests

class BaseClient:
    def __init__(self, base_url: str, token: str):
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        })

    def request(self, method: str, path: str, **kwargs):
        # 所有请求必须有超时，避免 CI 一直等待
        kwargs.setdefault("timeout", 10)
        return self.session.request(
            method, f"{self.base_url}{path}", **kwargs
        )`;

const orderClientCode = `# clients/order_client.py
from .base_client import BaseClient

class OrderClient(BaseClient):
    def create_order(self, payload: dict, idempotency_key: str):
        return self.request(
            "POST",
            "/api/orders",
            json=payload,
            headers={"Idempotency-Key": idempotency_key},
        )

# 如果项目采用异步调用，可将 requests.Session 替换为
# httpx.AsyncClient，并使用 await client.post(...)。`;

const factoryCode = `# conftest.py 中的测试数据工厂
import uuid

def build_order_payload(**overrides):
    payload = {
        "sku_id": "sku_1001",
        "quantity": 2,
        "address_id": "address_a",
        "coupon_id": "coupon_20",
        "case_id": f"auto-{uuid.uuid4().hex[:10]}",
    }
    payload.update(overrides)
    return payload`;

const assertionCode = `def test_create_order(order_client, order_payload):
    response = order_client.create_order(
        order_payload, idempotency_key=order_payload["case_id"]
    )

    # 1. 协议层
    assert response.status_code == 200, response.text
    assert response.headers["Content-Type"].startswith("application/json")

    body = response.json()
    # 2. 结构层
    assert isinstance(body["order_id"], str)
    assert body["order_id"]

    # 3. 业务层
    assert body["status"] == "PENDING_PAYMENT"
    assert body["amount"] == 80

    # 数据层断言放在独立 helper 中，便于复用与诊断`;

const parametrizeCode = `import pytest

@pytest.mark.parametrize(
    "quantity, expected_status, expected_code",
    [
        (0, 400, "INVALID_QUANTITY"),
        (1, 200, None),
        (5, 200, None),
        (6, 400, "INVALID_QUANTITY"),
    ],
    ids=["below-min", "min", "max", "above-max"],
)
def test_order_quantity(
    order_client, build_payload, quantity,
    expected_status, expected_code,
):
    payload = build_payload(quantity=quantity)
    response = order_client.create_order(payload, payload["case_id"])
    assert response.status_code == expected_status
    if expected_code:
        assert response.json()["code"] == expected_code`;

const idempotencyCode = `def test_same_key_creates_only_one_order(
    order_client, build_payload, order_repository,
):
    payload = build_payload(quantity=2)
    key = payload["case_id"]

    first = order_client.create_order(payload, key)
    second = order_client.create_order(payload, key)

    assert first.status_code == 200
    assert second.status_code == 200
    assert second.json()["order_id"] == first.json()["order_id"]
    assert order_repository.count_by_case_id(key) == 1
    assert order_repository.stock_change(key) == -2`;

const databaseCode = `# helpers/db.py：测试账号只授予只读权限
class OrderRepository:
    def __init__(self, connection):
        self.connection = connection

    def find_by_id(self, order_id: str):
        with self.connection.cursor() as cursor:
            cursor.execute(
                """SELECT order_id, user_id, amount, status
                   FROM orders WHERE order_id = %s""",
                (order_id,),
            )
            return cursor.fetchone()

def assert_order_saved(repository, body, expected_user_id):
    row = repository.find_by_id(body["order_id"])
    assert row is not None
    assert row["user_id"] == expected_user_id
    assert row["amount"] == body["amount"]
    assert row["status"] == body["status"]`;

const fixtureCode = `# conftest.py
import pytest
from clients.order_client import OrderClient

@pytest.fixture(scope="session")
def order_client(settings, user_token):
    return OrderClient(settings.base_url, user_token)

@pytest.fixture
def build_payload(request):
    created_case_ids = []

    def _build(**overrides):
        payload = make_order_payload(**overrides)
        created_case_ids.append(payload["case_id"])
        return payload

    yield _build

    # 清理动作必须按 case_id 精确定位，不能全表清空
    cleanup_test_orders(created_case_ids)`;

const ciCode = `# .github/workflows/api-tests.yml（示意）
name: api-tests
on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: pytest -m smoke --junitxml=reports/junit.xml
        env:
          BASE_URL: \${{ secrets.TEST_BASE_URL }}
          TEST_TOKEN: \${{ secrets.TEST_TOKEN }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: api-test-report
          path: reports/`;

export default function ApiTestAutomationPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=automation" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回自动化工程模块
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索接口自动化关键词...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Automation / Tutorial 12</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">接口自动化测试教程</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">从一条商城下单请求开始，搭建能读懂、能定位、能持续运行的接口自动化测试。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>9 组图解与表格</span><span>pytest + requests / httpx</span></div>
        </header>

        <section id="contract" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="先把下单接口读成一份测试契约" badge="请求只是起点" />
          <Card title="你要自动验证的业务">
            <p>用户携带登录令牌，提交商品、数量、地址和优惠券。系统需要校验用户身份与对象归属，计算金额，创建一笔待支付订单并扣减库存；网络重试不能生成重复订单。</p>
          </Card>
          <RequestJourneyFigure />
          <TableCard title="把接口文档转换成可检查的契约" headers={["部分", "下单接口约定", "需要验证什么"]} rows={contractRows} />
          <Callout>下单接口返回 200，说明请求处理成功。但测试不能只看状态码，还要继续核对订单金额、库存扣减、用户权限以及重复提交是否只生成一笔订单。</Callout>
        </section>

        <section id="project" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="先搭好能长期维护的工程骨架" badge="按职责分层" />
          <ArchitectureFigure />
          <CodeBlock title="推荐项目结构" code={projectTree} />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="测试文件负责什么"><BulletList items={["表达业务条件、操作和预期。", "组合 fixture 与参数数据。", "不直接拼接 URL 或编写数据库连接。"]} /></Card>
            <Card title="公共模块负责什么"><BulletList items={["Client 统一请求和超时。", "Helper 统一断言与数据查询。", "Fixture 准备账号、数据并在结束后清理。"]} /></Card>
          </div>
          <Callout>目录不是越多越专业。只有出现真实复用需求时才拆模块，但 URL、认证、超时和日志从第一天就应该集中管理。</Callout>
        </section>

        <section id="client" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="封装请求，让用例只表达业务" badge="隐藏技术噪声" />
          <ClientLayersFigure />
          <CodeBlock title="统一基础请求" code={baseClientCode} />
          <CodeBlock title="把下单动作封装成业务方法" code={orderClientCode} />
          <Card title="requests 还是 httpx">
            <p>同步项目可以先使用 requests，API 简单、资料丰富；需要验证异步接口、并发请求或 ASGI 应用时，可以使用 httpx。无论选择哪个库，测试用例都不应该依赖它们的底层细节。</p>
          </Card>
        </section>

        <section id="data" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="让每条用例拥有可识别的测试数据" badge="可创建也可清理" />
          <DataLifecycleFigure />
          <TableCard title="一组可执行的下单基线数据" headers={["对象", "测试数据", "用途"]} rows={dataRows} />
          <CodeBlock title="使用工厂生成默认有效请求" code={factoryCode} />
          <Callout>不要让所有用例共用一张随时可能被修改的优惠券。每条用例都要能识别自己创建的数据，并明确哪些数据可以清理、哪些只能读取。</Callout>
        </section>

        <section id="assertions" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="用分层断言判断订单是否真的正确" badge="从响应追到副作用" />
          <AssertionLayersFigure />
          <TableCard title="下单成功后逐层检查" headers={["层级", "检查对象", "下单示例"]} rows={assertionRows} />
          <CodeBlock title="一条下单用例的分层断言" code={assertionCode} />
          <Callout>断言失败时要让人一眼看出“期望什么、实际是什么、是哪一层失败”。不要把整段响应与巨大 JSON 快照一次性比较。</Callout>
        </section>

        <section id="parameterize" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="用参数化覆盖边界，不复制测试代码" badge="数据变化，逻辑不变" />
          <ParameterMatrixFigure />
          <CodeBlock title="商品数量边界参数化" code={parametrizeCode} />
          <Card title="参数化前先问一句">
            <p>这些数据是否执行同一个业务动作并验证同一种规则？如果前置条件、流程和预期结构差异很大，就应该拆成独立用例，而不是塞进一张难以阅读的大表。</p>
          </Card>
        </section>

        <section id="security" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="重点验证鉴权、越权和重复提交" badge="交易链路的 P0 风险" />
          <AuthIdempotencyFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="鉴权与授权"><BulletList items={["没有令牌、令牌过期和签名错误时拒绝请求。", "user_a 不能使用 user_b 的地址、优惠券或订单。", "错误响应不能泄露内部堆栈、密钥或其他用户信息。"]} /></Card>
            <Card title="幂等与重试"><BulletList items={["相同幂等键和相同请求只能产生一个业务结果。", "相同幂等键但请求内容不同应明确拒绝。", "首次请求超时后重试，不重复扣库存或占券。"]} /></Card>
          </div>
          <CodeBlock title="同时检查响应与真实写入次数" code={idempotencyCode} />
        </section>

        <section id="consistency" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="从接口响应追到真实业务数据" badge="核对最终事实" />
          <ConsistencyFigure />
          <CodeBlock title="使用参数化 SQL 做只读核对" code={databaseCode} />
          <Card title="不能直连数据库时怎么办">
            <p>优先调用只读查询接口、后台管理查询或事件检索接口核对结果。测试目标仍然是确认订单、库存和优惠券状态一致，而不是为了使用 SQL 强行获得生产数据库权限。</p>
          </Card>
          <Callout>数据库断言要查询稳定的业务字段，不要依赖自增主键顺序、更新时间精度或内部临时字段。涉及异步消息时，应在明确超时时间内轮询最终状态。</Callout>
        </section>

        <section id="fixtures" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="用 Fixture 管理环境，用报告保留证据" badge="准备与清理由框架接管" />
          <FixtureScopeFigure />
          <CodeBlock title="按作用域准备客户端和用例数据" code={fixtureCode} />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Fixture 使用原则"><BulletList items={["session 级保存稳定的客户端和配置。", "function 级隔离会被修改的订单数据。", "yield 后执行精确清理，即使用例失败也不跳过。", "用例不应依赖执行顺序。"]} /></Card>
            <Card title="报告至少保留"><BulletList items={["用例名、参数和运行环境。", "失败断言、响应摘要和业务 ID。", "开始时间、耗时和重试次数。", "敏感令牌、手机号等信息必须脱敏。"]} /></Card>
          </div>
        </section>

        <section id="ci" data-knowledge-section className="mb-14">
          <SectionHeader number="10" title="接入 CI，并让失败能够快速定位" badge="自动运行不是终点" />
          <CiPipelineFigure />
          <CodeBlock title="在拉取请求中运行冒烟接口测试" code={ciCode} />
          <TableCard title="看到失败时按证据判断" headers={["现象", "先检查", "可能归类"]} rows={[
            ["连接失败或 502", "环境健康、DNS、网关和依赖服务", "环境或部署问题"],
            ["401 集中出现", "令牌有效期、时钟、密钥和账号状态", "配置或鉴权变更"],
            ["状态码正确但金额错误", "请求数据、规则版本和金额明细", "业务缺陷"],
            ["偶发重复订单", "幂等键、重试日志和写入次数", "并发或幂等缺陷"],
            ["只有一条数据失败", "数据归属、库存和历史残留", "测试数据问题"],
          ]} />
          <TableCard title="可以直接运行的核心下单用例" headers={["优先级", "用例标题", "关键预期"]} rows={caseRows} />
          <Card title="练习：把教程代码变成一个可运行项目">
            <BulletList ordered items={["根据真实下单接口补全 BaseClient 和 OrderClient。", "准备一个普通用户、两个不同归属的地址和一张满减券。", "实现成功、边界、越权、过期令牌和幂等重试用例。", "为成功与失败场景增加订单和库存数据核对。", "生成 JUnit 或 Allure 报告，并确认敏感字段已经脱敏。", "配置 smoke 与 regression 标记，让拉取请求只运行 P0 冒烟集。", "故意改错一条金额断言，根据报告在 5 分钟内定位失败层级。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <ChecklistCard title="工程可维护" items={["请求集中封装", "数据可以识别和清理", "用例互不依赖", "配置不写死在代码中"]} />
            <ChecklistCard title="结果可信" items={["协议和结构已检查", "业务规则已检查", "关键数据已核对", "失败副作用已检查"]} />
            <ChecklistCard title="流水线可用" items={["冒烟集足够快", "失败证据完整", "机密信息已脱敏", "不稳定用例有责任人"]} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6">
            <p className="text-sm text-text-secondary">当接口用例可以稳定运行后，继续学习 Mock 与测试桩，控制暂时不可用或难以稳定复现的外部依赖。</p>
            <Link href="/knowledge/mock-test-doubles" className="inline-flex items-center gap-2 text-sm text-neon-cyan">
              继续学习 Mock 与测试桩 <ArrowRight className="h-4 w-4" />
            </Link>
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

function CodeBlock({ title, code }: { title: string; code: string }) {
  return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-neon-cyan/5 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/90">{code}</code></pre></div>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>;
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>;
}

function RequestJourneyFigure() {
  const nodes = [["01", "测试用例", "准备用户与订单数据"], ["02", "下单 API", "认证并执行业务规则"], ["03", "数据与事件", "订单、库存、优惠券"], ["04", "分层断言", "确认结果和副作用"]];
  return <FlowFigure title="一条自动化用例要验证完整的下单链路" items={nodes} />;
}

function ArchitectureFigure() {
  const layers = [["tests", "业务条件与预期", "用例层"], ["clients", "请求动作与协议细节", "接口层"], ["helpers", "断言、查询和等待", "支撑层"], ["fixtures", "环境、账号与数据", "资源层"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="architecture-title"><figcaption id="architecture-title" className="mb-5 text-sm font-bold text-text-primary">工程分层：变化被隔离，用例保持可读</figcaption><div className="grid gap-3 md:grid-cols-4">{layers.map(([name, desc, label], index) => <div key={name} className="rounded-lg border border-space-border bg-neon-cyan/5 p-4"><span className="font-mono text-[9px] text-neon-cyan">0{index + 1} / {label}</span><h4 className="my-2 font-mono text-sm font-bold text-text-primary">{name}</h4><p className="text-xs leading-6 text-text-secondary">{desc}</p></div>)}</div></figure>;
}

function ClientLayersFigure() {
  const items = [["用例", "create_order(payload)"], ["业务 Client", "路径、方法、幂等键"], ["基础 Client", "域名、认证、超时、日志"], ["HTTP 库", "requests / httpx"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="client-layers-title"><figcaption id="client-layers-title" className="mb-5 text-sm font-bold text-text-primary">调用链：越靠上越接近业务语言</figcaption><div className="mx-auto flex max-w-3xl flex-col gap-2">{items.map(([name, desc], index) => <div key={name} className={cn("flex items-center justify-between rounded-lg border px-4 py-3", index === 0 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-neon-cyan/[0.03]")}><strong className="text-sm text-text-primary">{name}</strong><span className="font-mono text-xs text-text-secondary">{desc}</span></div>)}</div></figure>;
}

function DataLifecycleFigure() {
  const items = [["准备", "创建专属用户与商品"], ["标记", "写入唯一 case_id"], ["执行", "发起下单与异常请求"], ["核对", "查询订单和库存"], ["清理", "只删除本轮数据"]];
  return <FlowFigure title="测试数据的一生必须闭环" items={items.map(([title, desc], index) => [`0${index + 1}`, title, desc])} />;
}

function AssertionLayersFigure() {
  const layers = [["副作用层", "消息是否只发一次"], ["数据层", "订单、库存、优惠券"], ["业务层", "金额、状态、错误码"], ["结构层", "字段存在且类型正确"], ["协议层", "状态码、响应头、耗时"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="assertion-title"><figcaption id="assertion-title" className="mb-5 text-sm font-bold text-text-primary">断言金字塔：从快速响应检查走向真实业务结果</figcaption><div className="mx-auto flex max-w-3xl flex-col items-center gap-2">{layers.map(([name, desc], index) => <div key={name} style={{ width: `${60 + index * 10}%` }} className={cn("flex min-w-[250px] items-center justify-between rounded-md border px-4 py-3", index === 2 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-neon-cyan/[0.03]")}><strong className="text-sm text-text-primary">{name}</strong><span className="text-xs text-text-secondary">{desc}</span></div>)}</div></figure>;
}

function ParameterMatrixFigure() {
  const values = [["0", "拒绝", "最小值前"], ["1", "成功", "最小值"], ["3", "成功", "有效类代表"], ["5", "成功", "最大值"], ["6", "拒绝", "最大值后"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="parameter-title"><figcaption id="parameter-title" className="mb-5 text-sm font-bold text-text-primary">同一段测试逻辑，替换数据覆盖数量边界</figcaption><div className="grid gap-2 sm:grid-cols-5">{values.map(([value, result, note], index) => <div key={value} className={cn("rounded-lg border p-4 text-center", index === 1 || index === 3 ? "border-neon-cyan bg-neon-cyan/10" : "border-space-border bg-neon-cyan/[0.03]")}><strong className="block font-mono text-lg text-text-primary">{value}</strong><span className="my-2 block text-xs font-medium text-neon-cyan">{result}</span><span className="text-[10px] text-text-secondary">{note}</span></div>)}</div></figure>;
}

function AuthIdempotencyFigure() {
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="auth-title"><figcaption id="auth-title" className="mb-5 text-sm font-bold text-text-primary">同一笔下单请求要经过身份、权限和幂等三道门</figcaption><div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]"><Gate icon={<CheckCircle2 className="h-5 w-5" />} title="身份认证" text="令牌是否真实有效" /><ArrowRight className="mx-auto hidden h-4 w-4 self-center text-neon-cyan md:block" /><Gate icon={<CircleAlert className="h-5 w-5" />} title="对象授权" text="地址与优惠券是否属于当前用户" /><ArrowRight className="mx-auto hidden h-4 w-4 self-center text-neon-cyan md:block" /><Gate icon={<GitBranch className="h-5 w-5" />} title="幂等控制" text="重试是否复用同一业务结果" /></div></figure>;
}

function ConsistencyFigure() {
  const items = [["接口响应", "order_id · 80 元"], ["订单表", "一笔待支付订单"], ["库存记录", "5 → 3"], ["优惠券", "可用 → 已占用"], ["订单事件", "只发送一次"]];
  return <FlowFigure title="响应、数据库和异步事件必须讲述同一个结果" items={items.map(([title, desc], index) => [`0${index + 1}`, title, desc])} />;
}

function FixtureScopeFigure() {
  const scopes = [["session", "配置、客户端", "整次测试会话复用"], ["module", "模块专属账号", "同一文件复用"], ["function", "订单、优惠券状态", "每条用例重新准备"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="fixture-title"><figcaption id="fixture-title" className="mb-5 text-sm font-bold text-text-primary">Fixture 作用域由数据是否会变化决定</figcaption><div className="grid gap-3 md:grid-cols-3">{scopes.map(([scope, data, desc], index) => <div key={scope} className={cn("rounded-lg border p-4", index === 2 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-neon-cyan/[0.03]")}><span className="font-mono text-[10px] text-neon-cyan">@pytest.fixture(scope=&quot;{scope}&quot;)</span><h4 className="my-2 text-sm font-bold text-text-primary">{data}</h4><p className="text-xs text-text-secondary">{desc}</p></div>)}</div></figure>;
}

function CiPipelineFigure() {
  const items = [["代码提交", "触发拉取请求"], ["环境检查", "确认 API 可用"], ["冒烟测试", "运行 P0 用例"], ["报告归档", "始终保存证据"], ["发布门禁", "失败则阻断"]];
  return <FlowFigure title="CI 中的接口测试需要快速、可重复、能诊断" items={items.map(([title, desc], index) => [`0${index + 1}`, title, desc])} />;
}

function FlowFigure({ title, items }: { title: string; items: string[][] }) {
  return <figure className="card-glow mb-4 rounded-xl p-5"><figcaption className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className="grid gap-3 md:grid-flow-col md:auto-cols-fr md:items-center">{items.map((item, index) => <div key={item.join("-")} className="contents"><div className="rounded-lg border border-space-border bg-neon-cyan/[0.03] p-4"><span className="font-mono text-[9px] text-neon-cyan">{item[0]}</span><h4 className="my-2 text-sm font-bold text-text-primary">{item[1]}</h4><p className="text-xs leading-6 text-text-secondary">{item[2]}</p></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>;
}

function Gate({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="rounded-lg border border-space-border bg-neon-cyan/[0.03] p-4"><div className="text-neon-cyan">{icon}</div><h4 className="my-2 text-sm font-bold text-text-primary">{title}</h4><p className="text-xs leading-6 text-text-secondary">{text}</p></div>;
}
