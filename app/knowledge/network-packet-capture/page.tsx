import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "抓包与网络请求分析实战教程",
  description: "围绕商城下单异常，学习浏览器 Network、HTTP 代理和网络抓包工具，掌握请求筛选、报文分析、耗时定位、移动端 HTTPS 抓包与证据整理。",
  path: "/knowledge/network-packet-capture",
  tags: ["抓包", "Network", "Charles", "Fiddler", "mitmproxy", "Wireshark", "接口分析"],
});

const sections: SectionItem[] = [
  { id: "start", label: "抓包解决什么" },
  { id: "tools", label: "选择工具" },
  { id: "message", label: "读懂报文" },
  { id: "devtools", label: "浏览器抓包" },
  { id: "filter", label: "筛选下单请求" },
  { id: "timing", label: "定位耗时" },
  { id: "replay", label: "复制与重放" },
  { id: "mobile", label: "移动端 HTTPS" },
  { id: "evidence", label: "证据与安全" },
  { id: "practice", label: "练习与检查" },
];

const toolRows: string[][] = [
  ["浏览器 DevTools / Network", "当前浏览器页面发出的 HTTP 请求", "Web 页面接口、资源、缓存和耗时", "最适合入门和前端问题定位"],
  ["Charles / Fiddler / mitmproxy", "经过代理的 HTTP 与 HTTPS 流量", "App、桌面客户端、多设备联调", "HTTPS 需要测试设备信任代理证书"],
  ["Wireshark", "网卡上的 TCP、UDP、DNS、TLS 等数据包", "连接、握手、丢包和协议级问题", "TLS 加密后通常看不到业务正文"],
  ["服务端日志与链路追踪", "服务内部处理和跨服务调用", "请求已进入后端后的根因定位", "需要 request_id 或 trace_id 串联"],
];

const messageRows: string[][] = [
  ["URL 与方法", "POST /api/orders", "是不是调用了正确接口和动作"],
  ["请求头", "Authorization、Content-Type、X-Request-ID", "身份、格式和链路标识是否正确"],
  ["请求体", "sku_id、quantity、coupon_id", "页面提交的数据是否完整准确"],
  ["状态码", "200", "HTTP 传输是否正常完成"],
  ["响应体", "code、message、order_id、amount", "业务是否成功，字段是否符合契约"],
  ["Timing", "等待 2.4 s、下载 8 ms", "时间花在连接、服务处理还是下载"],
];

const diagnosisRows: string[][] = [
  ["没有请求", "Network 中没有 /api/orders", "按钮事件、前端校验或脚本异常"],
  ["请求参数错误", "quantity=0 或 coupon_id 缺失", "页面组装参数或数据绑定"],
  ["401 / 403", "令牌失效或对象无权访问", "认证、权限或测试账号"],
  ["200 + 业务失败码", "HTTP 正常，code=OUT_OF_STOCK", "库存规则或页面业务提示"],
  ["500", "服务端内部错误", "结合 request_id 查询后端日志"],
  ["长时间 Pending", "Waiting 阶段明显过长", "服务处理、下游依赖或网关超时"],
];

const securityRows: string[][] = [
  ["Authorization / Cookie", "令牌、会话和用户身份", "截图和 HAR 分享前删除或打码"],
  ["姓名、手机号、地址", "个人隐私数据", "使用测试账号和虚构数据"],
  ["支付信息", "资金与账户风险", "只在支付沙箱和测试环境操作"],
  ["HTTPS 代理证书", "代理可以读取测试设备流量", "只安装在专用测试设备，结束后移除"],
  ["HAR / pcap 文件", "可能包含完整请求历史", "限定接收人和保存时间，不上传公共平台"],
];

export default function NetworkPacketCapturePage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=business-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回业务与用例设计模块
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索抓包与请求分析关键词...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Business Testing / Tutorial 09</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">抓包与网络请求分析实战教程</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">从“页面下单失败”继续向下追踪，找到哪条请求、哪个字段或哪个耗时阶段真正出了问题。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>商城下单诊断</span><span>Network + HTTP 代理 + Wireshark</span></div>
        </header>

        <section id="start" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="页面现象只是起点，请求才是中间证据" badge="从现象走向链路" />
          <Card title="同一个“提交失败”，可能来自完全不同的位置">
            <p>用户点击“提交订单”后页面没有成功跳转，原因可能是按钮没有发出请求、请求参数错误、登录失效、库存不足、服务端报错或网络超时。只记录页面提示，研发仍然需要重新排查；抓到关键请求，才能缩小问题范围。</p>
          </Card>
          <OrderEvidenceFigure />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="先确认有没有发出"><p>没有订单请求时，优先检查页面校验、按钮事件和前端脚本。</p></Card>
            <Card title="再确认发了什么"><p>对照需求和接口契约检查方法、路径、请求头与请求体。</p></Card>
            <Card title="最后确认得到什么"><p>结合状态码、响应体、耗时和链路标识判断责任层。</p></Card>
          </div>
          <Callout>抓包不是为了收集越多流量越好，而是为当前问题找到一条可以复现、可以解释、可以继续追踪的请求证据。</Callout>
        </section>

        <section id="tools" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="根据问题层级选择抓包工具" badge="不要一上来就 Wireshark" />
          <ToolLayerFigure />
          <TableCard title="四类工具看到的内容不同" headers={["工具", "能看到什么", "适用场景", "使用提醒"]} rows={toolRows} />
          <Card title="快速选择"><BulletList items={["网页功能异常：先打开浏览器 Network。", "App 或桌面客户端接口：使用 Charles、Fiddler 或 mitmproxy。", "连接建立、DNS、TCP、TLS 或丢包问题：使用 Wireshark。", "请求已经进入服务端：使用 request_id 继续查日志和链路追踪。"]} /></Card>
        </section>

        <section id="message" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="先读懂一条完整的 HTTP 请求" badge="请求与响应成对看" />
          <HttpMessageFigure />
          <TableCard title="下单请求的六个观察位置" headers={["位置", "下单示例", "你要回答的问题"]} rows={messageRows} />
          <CodeBlock title="下单请求与响应示例">{`POST /api/orders HTTP/1.1
Authorization: Bearer ***
Content-Type: application/json
X-Request-ID: case-20260809-001

{"sku_id":"sku-1001","quantity":2,"coupon_id":"cp-20"}

HTTP/1.1 200 OK
Content-Type: application/json

{"code":"SUCCESS","order_id":"ord-9001","amount":80}`}</CodeBlock>
          <Callout>200 说明这次 HTTP 请求正常完成；业务是否成功，还要继续检查响应体中的 code、message 和业务数据。</Callout>
        </section>

        <section id="devtools" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="使用浏览器 Network 抓取下单请求" badge="先保留再复现" />
          <DevToolsStepsFigure />
          <Card title="一次可靠的浏览器抓包流程">
            <BulletList ordered items={["打开开发者工具并进入 Network。", "勾选 Preserve log，避免页面跳转后记录消失。", "点击清空，只保留本轮复现产生的请求。", "选择 Fetch/XHR，减少图片、字体和脚本干扰。", "在页面执行一次完整的提交订单操作。", "按路径、方法或业务关键字找到 /api/orders。", "依次检查 Headers、Payload、Response 和 Timing。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="需要保留日志"><p>登录跳转、支付跳转和页面刷新会清空默认记录，复现前开启 Preserve log。</p></Card>
            <Card title="需要禁用缓存"><p>排查资源或缓存问题时再勾选 Disable cache，并保持开发者工具开启。</p></Card>
          </div>
        </section>

        <section id="filter" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="从大量请求中筛出下单链路" badge="先缩小范围" />
          <FilterFunnelFigure />
          <Card title="下单页面常见的筛选顺序"><BulletList ordered items={["先选 Fetch/XHR，只看接口请求。", "输入 orders、checkout 或业务接口路径关键字。", "按 Method 检查 POST，按 Status 检查失败或异常响应。", "通过 Initiator 确认是哪段前端代码发起。", "使用 request_id、order_id 或 case_id 串联后续请求。"]} /></Card>
          <TableCard title="根据抓包结果判断下一步" headers={["抓包现象", "直接证据", "下一步定位"]} rows={diagnosisRows} />
        </section>

        <section id="timing" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="用 Timing 判断时间花在哪里" badge="慢不等于都是后端慢" />
          <TimingWaterfallFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="连接前阶段"><BulletList items={["Queueing 长：浏览器并发、优先级或连接池等待。", "DNS 长：域名解析或网络环境。", "Initial connection / SSL 长：TCP、TLS 或代理链路。"]} /></Card>
            <Card title="请求后阶段"><BulletList items={["Waiting 长：网关、服务处理或下游依赖。", "Content Download 长：响应体过大或带宽受限。", "多次重复请求：前端重试、用户连点或超时策略。"]} /></Card>
          </div>
          <Callout>浏览器 Timing 只能告诉你时间在哪个大阶段。Waiting 很长时，继续带着 request_id 查网关和服务端链路，不能只凭一张截图断定某个后端服务慢。</Callout>
        </section>

        <section id="replay" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="复制请求，稳定重放问题" badge="从页面操作变成可复现命令" />
          <ReplayFigure />
          <CodeBlock title="脱敏后的 cURL 重放示例">{`curl 'https://test.example.com/api/orders' \
  -X POST \
  -H 'Authorization: Bearer <test-token>' \
  -H 'Content-Type: application/json' \
  -H 'X-Request-ID: case-20260809-001' \
  --data '{"sku_id":"sku-1001","quantity":2,"coupon_id":"cp-20"}'`}</CodeBlock>
          <Card title="重放前必须确认"><BulletList items={["目标仍是测试环境，不是生产环境。", "令牌属于专用测试账号，分享前已经替换。", "订单创建、支付、短信等操作不会产生真实副作用。", "幂等键和测试数据允许重复执行。", "对比原请求与重放请求，避免浏览器自动补充的头部被遗漏。"]} /></Card>
        </section>

        <section id="mobile" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="通过 HTTP 代理抓取移动端 HTTPS" badge="只在专用测试环境" />
          <MobileProxyFigure />
          <Card title="移动端代理抓包步骤"><BulletList ordered items={["让手机和电脑进入可以互相访问的测试网络。", "在电脑启动 Charles、Fiddler 或 mitmproxy 并确认监听端口。", "在手机 Wi-Fi 中配置电脑 IP 和代理端口。", "仅在专用测试设备安装并信任代理证书。", "打开 App 复现下单，按域名和路径筛选请求。", "结束后关闭代理、移除证书并恢复网络设置。"]} /></Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="抓不到 HTTPS"><p>先检查设备是否信任测试证书、代理是否允许远程连接、App 是否启用了证书固定。</p></Card>
            <Card title="遇到证书固定"><p>不要尝试绕过生产安全保护。使用团队提供的测试包、调试开关或服务端日志完成验证。</p></Card>
          </div>
        </section>

        <section id="evidence" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="把抓包结果整理成安全的缺陷证据" badge="证据够用且不泄密" />
          <EvidenceChainFigure />
          <TableCard title="抓包文件中的敏感内容" headers={["内容", "风险", "处理方式"]} rows={securityRows} />
          <Card title="缺陷单建议保留"><BulletList items={["复现环境、账号类型和发生时间。", "请求方法、脱敏后的 URL 与关键参数。", "状态码、业务码、响应摘要和实际耗时。", "request_id、trace_id 或测试 case_id。", "期望结果、实际结果和最小复现步骤。", "必要时附脱敏 HAR，不要只贴一张看不清的截图。"]} /></Card>
        </section>

        <section id="practice" data-knowledge-section className="mb-14">
          <SectionHeader number="10" title="完成一次下单失败的抓包定位" badge="从现象到证据" />
          <Card title="练习：定位“提交订单后提示失败”">
            <BulletList ordered items={["清空 Network 并开启 Preserve log，复现一次失败。", "找到创建订单请求，记录方法、路径、耗时和 request_id。", "检查 quantity、coupon_id 和地址 ID 是否符合页面选择。", "判断是没有请求、HTTP 失败、业务失败还是响应超时。", "复制为 cURL，脱敏后在测试环境重放。", "根据响应和 Timing 选择前端、网关、服务端或数据层继续定位。", "编写一条标题为“当库存充足并提交订单时，系统返回成功订单”的正常用例。", "编写一条标题为“当登录令牌失效时，系统拒绝创建订单并提示重新登录”的异常用例。", "整理脱敏证据，确保其他人能够独立复现。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <ChecklistCard title="请求找得准" items={["本轮记录已清空", "过滤条件明确", "请求链路完整", "标识可以串联"]} />
            <ChecklistCard title="结论有证据" items={["参数已经核对", "响应已经解释", "Timing 已分析", "责任层未武断判断"]} />
            <ChecklistCard title="资料可安全分享" items={["令牌已经移除", "个人信息已脱敏", "只使用测试环境", "证书与代理已恢复"]} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6">
            <p className="text-sm text-text-secondary">能够从页面定位到请求后，继续使用 SQL 核对订单、库存和优惠券是否真正一致。</p>
            <Link href="/knowledge/sql-database-testing" className="inline-flex items-center gap-2 text-sm text-neon-cyan">继续学习 SQL 与数据库测试 <ArrowRight className="h-4 w-4" /></Link>
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

function OrderEvidenceFigure() {
  return <FlowFigure id="order-evidence-title" title="从页面现象沿着下单链路逐层确认" items={[["页面操作", "点击提交订单"], ["网络请求", "方法、参数、耗时"], ["接口响应", "状态码与业务码"], ["服务日志", "request_id 继续追踪"], ["数据结果", "订单与库存一致"]]} />;
}

function ToolLayerFigure() {
  const tools = [["页面层", "DevTools Network", "HTTP 请求与资源"], ["代理层", "Charles / Fiddler", "跨设备 HTTPS"], ["网络层", "Wireshark", "DNS、TCP 与 TLS"], ["服务层", "日志 / Trace", "内部调用与异常"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="tool-layer-title"><figcaption id="tool-layer-title" className="mb-5 text-sm font-bold text-text-primary">问题越向下，使用的证据越接近底层</figcaption><div className="grid gap-3 md:grid-cols-4">{tools.map((item, index) => <div key={item[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><strong className="my-2 block text-sm text-text-primary">{item[0]}</strong><p className="text-xs font-medium text-neon-cyan">{item[1]}</p><p className="mt-2 text-xs text-text-secondary">{item[2]}</p></div>)}</div></figure>;
}

function HttpMessageFigure() {
  return <FlowFigure id="http-message-title" title="一条业务请求由输入、传输结果和业务结果组成" items={[["Request", "方法、URL、头、正文"], ["HTTP Status", "本次传输结果"], ["Response", "业务码与业务数据"], ["Timing", "各阶段耗时"]]} />;
}

function DevToolsStepsFigure() {
  return <FlowFigure id="devtools-steps-title" title="浏览器抓包的关键顺序" items={[["打开 Network", "保留日志"], ["清空记录", "建立本轮基线"], ["复现一次", "避免混入旧请求"], ["筛选请求", "路径与类型"], ["分析证据", "参数、响应、耗时"]]} />;
}

function FilterFunnelFigure() {
  const items = [["全部流量", "HTML、JS、图片、接口"], ["Fetch / XHR", "只保留接口"], ["orders", "只保留下单链路"], ["request_id", "锁定一次复现"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="filter-funnel-title"><figcaption id="filter-funnel-title" className="mb-5 text-sm font-bold text-text-primary">逐层筛选，直到只剩当前问题的请求</figcaption><div className="mx-auto flex max-w-3xl flex-col items-center gap-2">{items.map((item, index) => <div key={item[0]} style={{ width: `${100 - index * 15}%` }} className={cn("rounded-lg border px-4 py-3 text-center", index === items.length - 1 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-space-card/50")}><strong className="text-sm text-text-primary">{item[0]}</strong><span className="ml-3 text-xs text-text-secondary">{item[1]}</span></div>)}</div></figure>;
}

function TimingWaterfallFigure() {
  const stages = [["Queueing", "等待发送", "w-[12%]"], ["DNS", "解析域名", "w-[10%]"], ["Connect / SSL", "建立安全连接", "w-[18%]"], ["Waiting", "服务处理", "w-[48%]"], ["Download", "下载响应", "w-[12%]"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="timing-title"><figcaption id="timing-title" className="mb-5 text-sm font-bold text-text-primary">下单请求耗时瀑布</figcaption><div className="flex min-w-[720px] overflow-x-auto rounded-lg border border-space-border">{stages.map((stage, index) => <div key={stage[0]} className={cn("min-w-[90px] border-r border-space-border p-4 last:border-r-0", stage[2], index === 3 ? "bg-neon-cyan/10" : "bg-space-card/50")}><strong className="block text-xs text-text-primary">{stage[0]}</strong><span className="mt-2 block text-[10px] text-text-secondary">{stage[1]}</span></div>)}</div></figure>;
}

function ReplayFigure() {
  return <FlowFigure id="replay-title" title="把浏览器中的请求变成可重复验证的最小步骤" items={[["原始请求", "确认现场证据"], ["复制 cURL", "保留方法与数据"], ["删除敏感信息", "替换令牌与隐私"], ["测试环境重放", "对比响应与耗时"]]} />;
}

function MobileProxyFigure() {
  return <FlowFigure id="mobile-proxy-title" title="移动端 HTTPS 流量通过测试代理转发" items={[["测试 App", "发起下单"], ["系统代理", "电脑 IP 与端口"], ["抓包工具", "解密测试流量"], ["测试服务", "返回业务响应"]]} />;
}

function EvidenceChainFigure() {
  return <FlowFigure id="evidence-chain-title" title="一条可定位的缺陷证据链" items={[["复现步骤", "何时做了什么"], ["请求摘要", "方法、参数、耗时"], ["响应摘要", "状态码与业务码"], ["链路标识", "request_id / trace_id"], ["实际影响", "页面与数据结果"]]} />;
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>;
}
