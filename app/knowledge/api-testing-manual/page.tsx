import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "接口测试实战手册",
  description: "从接口理解、用例设计、鉴权与数据校验，到 Postman 自动化、pytest 框架与 CI 回归的接口测试实战手册。",
  path: "/knowledge/api-testing-manual",
  tags: ["接口测试", "Postman", "pytest", "API", "自动化测试"],
});

const sections: SectionItem[] = [
  { id: "overview", label: "从哪里开始" },
  { id: "contract", label: "读懂接口" },
  { id: "cases", label: "用例设计" },
  { id: "data", label: "数据与断言" },
  { id: "auth", label: "鉴权与安全" },
  { id: "postman", label: "Postman 实战" },
  { id: "pytest", label: "pytest 自动化" },
  { id: "ci", label: "回归与 CI" },
  { id: "troubleshoot", label: "问题定位" },
  { id: "checklist", label: "检查清单" },
];

const requestRows = [
  ["请求方法", "GET / POST / PUT / PATCH / DELETE", "决定接口动作，不是随便填"],
  ["请求路径", "/api/orders/{id}", "确认路径参数、版本号和网关前缀"],
  ["请求头", "Authorization、Content-Type、traceId", "鉴权、格式、链路定位都在这里"],
  ["请求体", "JSON / form-data / multipart", "字段类型、必填项、边界值的主战场"],
  ["响应", "HTTP 状态码 + 业务 code + data", "HTTP 200 不等于业务成功"],
];

const caseRows = [
  ["正常路径", "合法用户创建一笔订单", "返回成功、订单写入、金额正确"],
  ["必填校验", "缺少收货地址", "明确失败码和可读提示"],
  ["边界值", "数量为 0、1、最大值、超最大值", "不越界、不溢出、不产生脏数据"],
  ["类型异常", "数字字段传字符串、空数组、null", "服务稳定返回参数错误"],
  ["状态流转", "已取消订单再次支付", "状态机受控，不允许非法跳转"],
  ["重复请求", "同一支付回调连续发送两次", "幂等，不重复扣款或创建记录"],
  ["权限边界", "用户 A 查询用户 B 的订单", "拒绝访问，不能泄露数据"],
];

const statusRows = [
  ["200", "请求已被正确处理", "仍要检查业务 code 和关键字段"],
  ["400", "参数格式或业务前置条件错误", "错误字段和提示是否准确"],
  ["401 / 403", "未登录 / 无权限", "Token 失效、角色越权、资源越权"],
  ["404", "资源不存在", "不能把内部异常伪装成 404"],
  ["409", "状态冲突或重复操作", "重复提交、版本冲突、状态不允许"],
  ["429", "超过限流阈值", "限流提示、恢复时间、不会误伤正常请求"],
  ["5xx", "服务端异常", "记录 traceId，并检查不会暴露堆栈或密钥"],
];

export default function ApiTestingManualPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge" target="_blank" rel="noopener noreferrer" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors">
        <ArrowLeft className="h-4 w-4" />返回手册列表
      </Link>
      <KnowledgeLayout sections={sections}>
        <header className="mb-10">
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">接口测试实战手册</h1>
          <p className="mb-6 text-lg text-text-secondary">从“接口能通”到“业务可信”的完整方法：读协议、设计场景、校验数据、自动化回归。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>Postman + pytest</span><span>适用于 Web / App / 微服务</span></div>
        </header>

        <section id="overview" data-knowledge-section className="mb-14">
          <SectionHeader icon="🎯" title="先建立正确认知" badge="接口测试不是点点点" />
          <Card title="接口测试到底测什么？">
            <p>接口测试不是“发一个请求，看到 200 就算通过”。它验证的是：客户端给出的输入，经过鉴权、业务规则、数据库和下游服务后，是否产生<strong>正确、稳定且可追溯</strong>的结果。</p>
            <BulletList items={["功能是否按契约工作：字段、状态码、业务规则。", "异常输入是否被安全处理：不崩溃、不写脏数据、不返回误导信息。", "数据是否一致：接口返回、数据库记录、缓存和消息事件是否对得上。", "权限是否可靠：用户只能操作自己应当操作的资源。", "回归是否可控：一次改动不会悄悄弄坏已有核心链路。"]} />
          </Card>
          <Card title="一个实用的起步顺序"><BulletList ordered items={["先圈出用户最在意的 3 条链路，例如登录、下单、支付。", "为每条链路写出成功、失败、边界、权限、重复五类用例。", "先手工跑通并沉淀请求，再做自动化。", "最后把最稳定、最常回归的接口接入 CI。"]} /></Card>
        </section>

        <section id="contract" data-knowledge-section className="mb-14"><SectionHeader icon="📄" title="读懂接口契约" badge="请求、响应、业务语义" />
          <TableCard title="拿到接口文档后，逐项确认" headers={["部分", "示例", "测试关注点"]} rows={requestRows} />
          <TableCard title="状态码不是装饰" headers={["状态", "含义", "测试重点"]} rows={statusRows} />
          <Card title="测试前一定要问的三个问题"><BulletList items={["成功到底意味着什么？例如“提交订单成功”是订单已创建，还是已经支付？", "失败后系统应处于什么状态？库存、余额、优惠券是否需要回滚？", "请求重试时会发生什么？网络抖动是线上常态，幂等不是可选项。"]} /></Card>
        </section>

        <section id="cases" data-knowledge-section className="mb-14"><SectionHeader icon="🧭" title="接口用例设计" badge="按风险设计，而非按字段堆数量" />
          <TableCard title="一条核心接口至少覆盖这些维度" headers={["维度", "示例", "期望"]} rows={caseRows} />
          <Card title="真实场景：创建订单"><BulletList items={["库存充足、优惠券有效：订单金额、库存扣减、优惠券状态都正确。", "库存不足：请求失败，订单不落库，库存不变。", "同一客户端超时后重试：只生成一笔订单，返回同一业务结果。", "价格在提交前发生变化：明确提示重新确认，而不是静默按旧价格成交。", "普通用户伪造商家订单 ID：不能读取或修改他人资源。"]} /></Card>
        </section>

        <section id="data" data-knowledge-section className="mb-14"><SectionHeader icon="🧪" title="测试数据与断言" badge="别只断言 HTTP 200" />
          <div className="grid gap-4 md:grid-cols-2"><Card title="好断言的四层"><BulletList items={["协议层：状态码、Content-Type、响应时间。", "结构层：字段是否存在、类型是否正确、列表是否符合分页约定。", "业务层：code、金额、状态、错误信息是否符合规则。", "数据层：必要时核对数据库、缓存或消息消费结果。"]} /></Card><Card title="数据管理原则"><BulletList items={["账号、商品、优惠券等测试数据独立且可重复使用。", "避免所有用例抢同一份库存或同一个用户。", "用例前置数据可创建，用例结束能清理或标记。", "敏感生产数据脱敏后再进入测试环境。"]} /></Card></div>
          <CodeBlock title="JavaScript - Postman 断言">{`pm.test("创建成功", () => {
  pm.response.to.have.status(200);
  const body = pm.response.json();
  pm.expect(body.code).to.eql(0);
  pm.expect(body.data.orderId).to.be.a("string");
  pm.expect(body.data.amount).to.eql(99.9);
});`}</CodeBlock>
        </section>

        <section id="auth" data-knowledge-section className="mb-14"><SectionHeader icon="🔐" title="鉴权与安全边界" badge="认证、授权、敏感信息" />
          <Card title="最容易漏掉的安全用例"><BulletList items={["Token 缺失、过期、篡改、使用错误用户的 Token。", "水平越权：修改 URL 或 body 中的资源 ID，访问其他用户资源。", "垂直越权：普通用户调用管理端接口或伪造角色字段。", "敏感字段：密码、手机号、身份证、Token 不应完整出现在响应和日志中。", "输入安全：SQL 注入、XSS 字符串、超长参数不会导致异常或信息泄露。"]} /></Card>
        </section>

        <section id="postman" data-knowledge-section className="mb-14"><SectionHeader icon="📮" title="Postman：先把手工测试变成可复用资产" badge="Collection / Environment" />
          <Card title="推荐的 Collection 结构"><BulletList ordered items={["按业务模块分文件夹：认证、用户、商品、订单、支付。", "把 baseUrl、用户名、密码、token 写进环境变量，不要硬编码。", "登录请求的 Tests 脚本把 token 保存为 collection variable。", "后续请求统一引用 {{token}}，并增加关键断言。", "用 Runner 跑完整链路，再用 Newman 接入 CI。"]} /></Card>
          <CodeBlock title="JavaScript - 登录后保存 Token">{`const body = pm.response.json();
pm.test("登录成功", () => pm.expect(body.code).to.eql(0));
pm.collectionVariables.set("token", body.data.accessToken);`}</CodeBlock>
        </section>

        <section id="pytest" data-knowledge-section className="mb-14"><SectionHeader icon="🐍" title="pytest：适合长期维护的接口自动化" badge="清晰、可组合、可报告" />
          <CodeBlock title="Python - 一条最小可维护用例">{`import requests

BASE_URL = "https://api.example.com"

def test_get_profile(auth_headers):
    response = requests.get(f"{BASE_URL}/api/profile", headers=auth_headers, timeout=10)
    body = response.json()

    assert response.status_code == 200
    assert body["code"] == 0
    assert body["data"]["id"]
    assert "password" not in body["data"]`}</CodeBlock>
          <Card title="框架别一上来就做复杂"><BulletList items={["conftest.py：放登录、数据库连接、公共 headers 等 fixture。", "clients/：按领域封装请求，测试只保留业务意图。", "tests/：按模块组织用例，并使用 marker 区分 smoke、regression。", "requirements：固定依赖版本；配置和密钥来自环境变量。", "报告：先保证失败信息清楚，再考虑 Allure 等可视化。"]} /></Card>
        </section>

        <section id="ci" data-knowledge-section className="mb-14"><SectionHeader icon="🔁" title="回归与 CI：让测试在变更时自动发生" badge="小而可靠" />
          <Card title="值得优先自动化的接口"><BulletList items={["登录、权限校验、订单创建、支付回调等核心路径。", "每次发布都要回归且规则稳定的接口。", "历史上出过事故、容易被改坏的接口。", "数据准备成本低、断言明确、执行快的接口。"]} /></Card>
          <Card title="不要自动化这些陷阱"><BulletList items={["接口还在频繁改，契约都没稳定，就先别把维护成本锁进 CI。", "依赖不可控的第三方真实支付、短信等服务，应使用沙箱或 Mock。", "把大量脆弱的 UI 前置操作塞进接口回归，会让失败原因难以判断。"]} /></Card>
        </section>

        <section id="troubleshoot" data-knowledge-section className="mb-14"><SectionHeader icon="🔎" title="失败时怎么定位" badge="先缩小范围，再找证据" />
          <Card title="排查顺序"><BulletList ordered items={["确认请求本身：URL、方法、headers、body、环境变量是否正确。", "看响应：HTTP 状态、业务 code、错误 message、traceId。", "对比同一请求在 Swagger、Postman、自动化脚本中的表现。", "查应用日志和链路追踪：问题发生在网关、服务、数据库还是下游。", "核对测试数据状态：库存、用户权限、优惠券、订单状态是否符合前置条件。", "最后才怀疑测试脚本；先证明服务实际做了什么。"]} /></Card>
        </section>

        <section id="checklist" data-knowledge-section className="mb-14"><SectionHeader icon="✅" title="接口测试检查清单" badge="提测前 / 回归前" />
          <div className="grid gap-4 md:grid-cols-3"><Card title="契约"><BulletList items={["接口文档与实现一致", "字段和默认值明确", "错误码有可读语义", "版本变更有兼容策略"]} /></Card><Card title="质量"><BulletList items={["正常、异常、边界已覆盖", "HTTP 与业务结果都断言", "数据可重复执行", "超时和重试有规则"]} /></Card><Card title="安全与交付"><BulletList items={["认证、授权用例已验证", "响应不泄露敏感信息", "核心接口进入回归", "失败可凭 traceId 定位"]} /></Card></div>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function SectionHeader({ icon, title, badge }: { icon: string; title: string; badge: string }) {
  return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 text-lg">{icon}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>;
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function BulletList({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={cn("mt-3 space-y-2 pl-5", ordered ? "list-decimal" : "list-disc")}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function TableCard({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-space-border/50 last:border-b-0">{row.map((cell) => <td key={cell} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function CodeBlock({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
