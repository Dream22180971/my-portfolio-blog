import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, GitBranch } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "测试开发编程基础教程",
  description: "从测试工程师的视角学习测试开发需要的编程能力：数据处理、HTTP 请求、数据库操作、日志与异常，并把它们串成可运行的测试脚本。",
  path: "/knowledge/test-development-programming",
  tags: ["测试开发", "Python", "编程基础", "接口测试", "数据驱动"],
});

const sections: SectionItem[] = [
  { id: "why", label: "为什么需要编程" }, { id: "difference", label: "测试代码 vs 业务代码" },
  { id: "data", label: "数据与文件处理" }, { id: "http", label: "HTTP 请求与响应" },
  { id: "database", label: "数据库操作" }, { id: "logging", label: "日志与异常" },
  { id: "tool", label: "串成一个小工具" }, { id: "practice", label: "练习与检查" },
];

const roleRows = [
  ["发现问题", "执行用例，记录缺陷", "执行用例，记录缺陷"],
  ["定位原因", "把现象写进 Bug 单", "判断是数据、接口还是环境问题"],
  ["设计验证", "等待修复后手工重测", "把场景翻译成可重复执行的验证逻辑"],
  ["执行回归", "手工重跑，依赖人的记忆", "脚本自动执行，一键回归"],
  ["持续反馈", "Bug 单闭环", "日志 + 报告，失败可定位"],
];
const diffRows = [
  ["关注点", "功能、性能、稳定性", "可读性、可维护性、可扩展性、可复用性"],
  ["主要读者", "开发者和编译器", "测试工程师自己和团队"],
  ["运行频率", "部署后长期运行", "每次回归都运行，一次编写多次执行"],
  ["失败含义", "系统出了 Bug", "业务与预期不一致，要能快速定位"],
  ["演进方式", "随功能迭代修改", "随用例集沉淀，持续扩充"],
];
const httpRows = [
  ["HTTP 状态码", "网络与服务器处理结果", "200 / 500"],
  ["业务 code", "业务规则是否通过", "SUCCESS / ORDER_CLOSED"],
  ["响应体 data", "真正的业务数据", "orderId、payAmount、status"],
];

export default function TestDevelopmentProgrammingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=test-development" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回测试开发学习路线</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索测试开发编程关键词...">
      <header className="mb-10">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Test Development / Tutorial 01</div>
        <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">测试开发编程基础教程</h1>
        <p className="mb-6 text-lg leading-8 text-text-secondary">从测试工程师的视角出发，掌握把业务规则写成可运行脚本的编程能力：数据处理、HTTP 请求、数据库校验、日志留痕，最终串成一个订单服务回归脚本。</p>
        <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>8 个章节</span><span>贯穿案例：订单服务回归</span><span>Python + requests + SQL</span></div>
      </header>

      <section id="why" data-knowledge-section className="mb-14">
        <SectionHeader number="01" title="为什么测试工程师需要编程能力" badge="从点到线" />
        <FlowFigure id="td-loop" title="测试开发的工作闭环" items={[["发现问题", "用例执行或线上反馈"], ["设计验证", "把场景翻译成逻辑"], ["编码", "脚本与数据"], ["自动执行", "一键回归"], ["持续反馈", "日志与报告"]]} />
        <TableCard title="普通测试与测试开发的区别" headers={["环节", "普通测试", "测试开发"]} rows={roleRows} />
        <Card title="回到贯穿案例：订单服务回归"><p>接口越来越多，每次发版都要手工点一遍“下单、查询、取消”。订单服务回归脚本把这件事变成：<strong>自动读取一批订单数据 → 调用下单接口 → 校验响应 → 核对数据库 → 输出报告</strong>。人只负责看结论，机器负责重复劳动。</p></Card>
        <Callout>会写代码不是目的，把一条业务规则变成“今天能跑、下个月还能跑、失败了能定位”的自动回归，才是测试开发要解决的工程问题。</Callout>
      </section>

      <section id="difference" data-knowledge-section className="mb-14">
        <SectionHeader number="02" title="测试代码与业务代码的区别" badge="读者不同" />
        <TableCard title="业务代码与测试代码的关注点" headers={["维度", "业务代码", "测试代码"]} rows={diffRows} />
        <Card title="为什么测试代码最看重可读性"><p>业务代码要扛住高并发，测试代码要扛住“三个月后还有人维护”。下一轮回归跑你的脚本的，可能是另一位测试同事：他不需要知道你调了什么框架，但他必须能一眼看出——<strong>数据从哪来、接口调哪个、断言断什么、失败看哪里</strong>。</p></Card>
        <Callout>业务代码追求“把功能做对”，测试代码追求“把验证说清楚”。同样一段逻辑，写在测试里要优先让下一步骤的人三分钟读懂。</Callout>
      </section>

      <section id="data" data-knowledge-section className="mb-14">
        <SectionHeader number="03" title="数据与文件处理：测试数据的来源" badge="JSON / CSV / Excel" />
        <CodeBlock title="test_data/orders.json">{`[
  {
    "orderId": "SO-20240301-001",
    "skuId": "SKU-1001",
    "quantity": 2,
    "expectedStatus": "PENDING_PAYMENT",
    "payAmount": "199.80"
  },
  {
    "orderId": "SO-20240301-002",
    "skuId": "SKU-1002",
    "quantity": 1,
    "expectedStatus": "PAID",
    "payAmount": "59.90"
  }
]`}</CodeBlock>
        <CodeBlock title="读取与断言">{`import json
import csv

def load_orders_from_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def load_orders_from_csv(path):
    with open(path, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def assert_order_status(order, expected_status):
    assert order["status"] == expected_status, (
        "订单 %s 状态异常: 期望 %s, 实际 %s"
        % (order["orderId"], expected_status, order["status"])
    )`}</CodeBlock>
        <Card title="测试数据的三条纪律"><BulletList items={["数据独立成文件，不写死在断言里。", "金额用字符串或 Decimal 存储，避免浮点误差。", "每条数据都要能说清它验证什么：正常、边界还是异常。"]} /></Card>
        <Callout>Excel 场景用 pandas 一行读取：pandas.read_excel(path, dtype=str) 再转成字典列表。注意把金额读成字符串而不是浮点数，否则 199.80 会变成 199.8。</Callout>
      </section>

      <section id="http" data-knowledge-section className="mb-14">
        <SectionHeader number="04" title="HTTP 请求与响应：与接口对话" badge="requests" />
        <CodeBlock title="封装下单请求">{`import requests

BASE_URL = "https://api.example.com"
TOKEN = "test-token-xxx"

def create_order(payload):
    response = requests.post(
        BASE_URL + "/orders",
        json=payload,
        headers={
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json",
        },
        timeout=10,
    )
    return response

def assert_business_success(response):
    assert response.status_code == 200, "HTTP 状态异常: %s" % response.status_code
    body = response.json()
    assert body["code"] == "SUCCESS", "业务码异常: %s" % body
    assert body["data"]["orderId"], "响应缺少订单号"`}</CodeBlock>
        <TableCard title="三层检查，缺一不可" headers={["检查项", "含义", "例子"]} rows={httpRows} />
        <Callout>HTTP 200 只说明“服务器处理了这个请求”，不代表下单成功。断言必须分层：先看 HTTP 状态，再看业务 code，最后取 data 里的业务字段。</Callout>
      </section>

      <section id="database" data-knowledge-section className="mb-14">
        <SectionHeader number="05" title="数据库操作：用另一只眼看订单" badge="交叉校验" />
        <CodeBlock title="查询订单表">{`import sqlite3

DB_PATH = "orders.db"

def fetch_order(order_id):
    conn = sqlite3.connect(DB_PATH)
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT order_id, status, pay_amount FROM orders WHERE order_id = ?",
            (order_id,),
        )
        row = cur.fetchone()
        if row is None:
            return None
        return {"orderId": row[0], "status": row[1], "payAmount": str(row[2])}
    finally:
        conn.close()`}</CodeBlock>
        <CodeBlock title="接口返回与数据库交叉校验">{`def cross_check(api_order, db_order):
    assert db_order is not None, "订单未写入数据库: %s" % api_order["orderId"]
    assert db_order["status"] == api_order["status"], (
        "状态不一致: 接口 %s vs 数据库 %s"
        % (api_order["status"], db_order["status"])
    )
    assert db_order["payAmount"] == api_order["payAmount"], (
        "金额不一致: 接口 %s vs 数据库 %s"
        % (api_order["payAmount"], db_order["payAmount"])
    )`}</CodeBlock>
        <Card title="为什么要交叉校验"><p>接口层的返回是系统自己“说”的，数据库落库才是业务真正发生的证据。接口说下单成功、数据库却没有订单——这种问题只测接口永远发现不了，交叉校验能把它抓出来。</p></Card>
        <Callout>测试环境连库只做只读查询；如果确实要写数据，优先在事务里回滚。参数化 SQL 一律用占位符 ?，永远不要字符串拼接，防止注入也避免引号转义。</Callout>
      </section>

      <section id="logging" data-knowledge-section className="mb-14">
        <SectionHeader number="06" title="日志与异常：失败时要能三分钟定位" badge="留痕" />
        <CodeBlock title="统一日志配置">{`import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)

logger = logging.getLogger("order-regression")

def log_api_call(action, payload, response):
    logger.info(
        "action=%s payload=%s status=%s code=%s",
        action,
        payload,
        response.status_code,
        response.json().get("code"),
    )`}</CodeBlock>
        <CodeBlock title="异常上下文要带订单号">{`import requests

try:
    response = create_order(payload)
    assert_business_success(response)
except AssertionError:
    logger.error(
        "订单 %s 断言失败, 响应体=%s",
        payload.get("orderId"),
        response.text,
    )
    raise
except requests.RequestException as exc:
    logger.error("订单 %s 请求异常: %s", payload.get("orderId"), exc)
    raise`}</CodeBlock>
        <Card title="一次失败至少留下这些"><BulletList items={["用例名与测试数据编号。", "订单号、商品号等业务主键。", "请求方法、URL 与请求体。", "HTTP 状态、业务 code 与响应体。", "发生时间与环境标识；token 和密码绝不进日志。"]} /></Card>
        <Callout>日志不是写给别人看的装饰，是失败时唯一的“事故现场”。先设计好“失败时能看到什么”，再写断言，比事后补日志高效得多。</Callout>
      </section>

      <section id="tool" data-knowledge-section className="mb-14">
        <SectionHeader number="07" title="串成一个小工具：订单服务回归脚本" badge="可运行" />
        <FlowFigure id="tool-flow" title="一条回归数据从文件到报告" items={[["读取数据", "orders.json"], ["调接口", "POST /orders"], ["校验响应", "HTTP + code"], ["核对数据库", "交叉校验"], ["输出报告", "PASS / FAIL"]]} />
        <CodeBlock title="order_regression.py">{`import json
import logging
import sqlite3

import requests

BASE_URL = "https://api.example.com"
TOKEN = "test-token-xxx"
DB_PATH = "orders.db"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("order-regression")

def load_orders(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def create_order(payload):
    return requests.post(
        BASE_URL + "/orders",
        json=payload,
        headers={
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json",
        },
        timeout=10,
    )

def fetch_order(order_id):
    conn = sqlite3.connect(DB_PATH)
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT status, pay_amount FROM orders WHERE order_id = ?",
            (order_id,),
        )
        row = cur.fetchone()
        return {"status": row[0], "payAmount": str(row[1])} if row else None
    finally:
        conn.close()

def verify_order(payload, response):
    assert response.status_code == 200, "HTTP 状态: %s" % response.status_code
    body = response.json()
    assert body["code"] == "SUCCESS", "业务码异常: %s" % body
    order_id = body["data"]["orderId"]

    db_order = fetch_order(order_id)
    assert db_order is not None, "订单未写入数据库: %s" % order_id
    assert db_order["status"] == body["data"]["status"], (
        "状态不一致: 接口 %s vs 数据库 %s"
        % (body["data"]["status"], db_order["status"])
    )
    return order_id

def run_regression(path):
    total = 0
    passed = 0
    for payload in load_orders(path):
        total += 1
        try:
            response = create_order(payload)
            order_id = verify_order(payload, response)
            logger.info("PASS order_id=%s", order_id)
            passed += 1
        except Exception:
            logger.exception("FAIL payload=%s", payload)
    logger.info("报告: 共 %s 条, 通过 %s 条", total, passed)

if __name__ == "__main__":
    run_regression("test_data/orders.json")`}</CodeBlock>
        <Card title="运行步骤"><BulletList ordered items={["安装依赖：pip install requests。", "准备 test_data/orders.json，放 3 到 5 条订单数据。", "执行 python order_regression.py。", "观察日志中的 PASS / FAIL 与最终统计。", "故意把一条数据的状态改错，确认失败信息能定位到具体订单。"]} /></Card>
        <Callout>这就是“发现一条 Bug”到“持续回归”的最小闭环：读数据、调接口、做断言、留证据。脚本先跑通，后面可以换 pytest、加参数化、接 CI——骨架不变。</Callout>
      </section>

      <section id="practice" data-knowledge-section className="mb-14">
        <SectionHeader number="08" title="练习与检查" badge="动手" />
        <Card title="练习：完成订单服务回归脚本"><BulletList ordered items={["准备 5 条订单测试数据（含 1 条异常状态），存成 JSON。", "写函数读取数据并逐条断言期望状态。", "用 requests 封装下单接口，正确处理 token。", "把 HTTP 状态、业务 code、响应体 data 分开断言。", "查询数据库，校验接口返回与落库数据一致。", "每条用例的前后打印请求摘要与响应摘要。", "故意制造一条失败，确认日志能定位到具体订单号。", "把以上整理成 order_regression.py 一个脚本并跑通。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><ChecklistCard title="数据可靠" items={["测试数据独立成文件", "金额用字符串存储", "正常与异常数据并存", "每条数据说明验证意图"]} /><ChecklistCard title="校验可信" items={["HTTP 状态与业务 code 分开断言", "接口结果与数据库交叉校验", "失败信息包含订单号", "断言失败信息可读"]} /><ChecklistCard title="工程可用" items={["脚本可重复运行", "日志可追溯定位", "token 不进日志", "报告统计通过率"]} /></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">你已经能把一条业务规则写成可运行的回归脚本。下一步把脚本升级成真正的自动化测试工程。</p><Link href="/knowledge/tutorials?track=test-development" className="inline-flex items-center gap-2 text-sm text-neon-cyan">回到测试开发学习路线 <ArrowRight className="h-4 w-4" /></Link></div>
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
