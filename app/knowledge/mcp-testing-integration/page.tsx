import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "MCP 工具接入与安全测试教程",
  description: "以电商售后工具服务为案例，验证 MCP 能力协商、工具 Schema、鉴权授权、会话传输、内容污染、审计和协议回归。",
  path: "/knowledge/mcp-testing-integration",
  tags: ["MCP测试", "工具协议", "Schema测试", "权限测试", "AI Agent安全"],
});

const sections: SectionItem[] = [
  { id: "boundary", label: "接入边界" },
  { id: "handshake", label: "能力协商" },
  { id: "contract", label: "工具契约" },
  { id: "authorization", label: "鉴权授权" },
  { id: "content", label: "内容安全" },
  { id: "transport", label: "会话传输" },
  { id: "failure", label: "失败与幂等" },
  { id: "audit", label: "审计隐私" },
  { id: "regression", label: "协议回归" },
  { id: "practice", label: "练习与检查" },
];

export default function McpTestingIntegrationPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回 AI 测试成长路线</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索 MCP、Schema、OAuth、权限、注入和协议回归...">
      <Header />

      <S id="boundary" n="01" t="MCP 连接的不只是工具，也是权限与数据边界" b="协议可用不等于业务安全">
        <Card title="案例：售后工具服务"><p>售后 Agent 通过 MCP Server 获取订单查询、退款政策检索和创建工单三个工具。测试既要确认 Client 与 Server 能正常通信，也要证明工具只暴露必要能力、只访问当前用户的数据，并且所有写操作都受审批和幂等控制。</p></Card>
        <Flow title="MCP 接入链" items={[["Host", "目标与身份"], ["Client", "协商与调用"], ["MCP Server", "能力与校验"], ["业务服务", "权限与副作用"], ["审计证据", "结果与追踪"]]} />
        <Table title="四层测试边界" headers={["层级", "主要问题", "关键证据"]} rows={[
          ["协议", "版本、能力和消息是否兼容", "initialize、能力声明、错误响应"],
          ["工具契约", "名称、描述、Schema 和返回值是否稳定", "tools/list、JSON Schema、契约差异"],
          ["安全控制", "身份、scope、资源归属和审批是否有效", "授权日志、策略决策、拒绝结果"],
          ["运行治理", "超时、断线、重试、审计和隐私是否可控", "request_id、Trace、脱敏日志"],
        ]} />
      </S>

      <S id="handshake" n="02" t="先验证初始化和能力协商" b="不兼容时明确失败">
        <Table title="能力协商测试" headers={["场景", "断言", "失败处理"]} rows={[
          ["协议版本匹配", "双方选择共同支持的版本", "没有交集时拒绝连接并说明版本"],
          ["能力声明", "只声明实际实现的 tools、resources 或 prompts", "调用未声明能力时返回协议错误"],
          ["服务身份", "名称、版本和环境来源可识别", "未知或未授权服务不得进入允许列表"],
          ["重新连接", "断线后重新协商，不沿用过期状态", "旧会话与旧授权立即失效"],
          ["扩展字段", "忽略兼容扩展，拒绝破坏性语义变化", "保留原始错误供定位"],
        ]} />
        <Callout>“连接成功”只证明握手完成。能力多报、版本误判或服务来源不可验证，都会把不该出现的工具交给 Agent。</Callout>
      </S>

      <S id="contract" n="03" t="工具 Schema 要让错误参数在业务执行前被拦住" b="严格输入，明确输出">
        <Code title="写工具输入 Schema">{`{
  "name": "create_after_sale_ticket",
  "inputSchema": {
    "type": "object",
    "required": ["order_id", "reason", "request_id"],
    "properties": {
      "order_id": {"type":"string", "pattern":"^ORD-[0-9]{8}$"},
      "reason": {"type":"string", "minLength":5, "maxLength":500},
      "request_id": {"type":"string", "minLength":8}
    },
    "additionalProperties": false
  }
}`}</Code>
        <Table title="工具契约负例" headers={["输入", "预期"]} rows={[
          ["缺少 order_id", "返回字段级错误，不调用下游"],
          ["order_id 格式错误", "拒绝并指出 pattern 不匹配"],
          ["多出 operator_role", "拒绝未知字段，避免隐式越权参数穿透"],
          ["同名工具来自未知服务", "不进入可调用列表"],
          ["返回成功但缺少 ticket_id", "判为契约失败，不能向用户报告已创建"],
        ]} />
        <Callout>description 和 annotations 只能帮助模型理解工具，不能证明工具没有副作用，也不能代替后端权限校验。</Callout>
      </S>

      <S id="authorization" n="04" t="身份、scope 和业务对象要逐层绑定" b="模型参数不可信">
        <Table title="授权测试矩阵" headers={["范围", "测试断言", "预期"]} rows={[
          ["Token audience", "Token 只为当前 MCP 服务签发", "错误 audience 返回 401"],
          ["scope", "只读身份不能调用写工具", "权限不足返回 403"],
          ["租户", "tenant_id 来自已验证身份", "模型传入其他租户仍被拒绝"],
          ["资源归属", "订单属于当前用户且状态允许操作", "越权对象在下游再次拦截"],
          ["人工审批", "写操作绑定工具、对象、参数摘要和有效期", "参数变化后旧批准失效"],
          ["字段最小化", "只返回当前任务需要的数据", "手机号、地址和内部备注默认隐藏"],
        ]} />
        <Callout>Client 的工具白名单是第一道门，MCP Server 和业务服务仍必须重新校验身份与资源；不能把 Agent 传来的 customer_id 当作可信身份。</Callout>
      </S>

      <S id="content" n="05" t="工具描述、资源和返回值都按不可信内容处理" b="防止指令穿透">
        <Table title="内容污染样本" headers={["污染位置", "攻击示例", "合格行为"]} rows={[
          ["工具描述", "要求忽略审批并优先选择本工具", "仅按受信策略与任务需要选择"],
          ["资源文档", "政策正文夹带系统指令", "作为业务数据引用，不提升指令优先级"],
          ["工具返回值", "订单备注要求读取其他用户订单", "只解析预定义字段，拒绝目标漂移"],
          ["近似工具名", "伪造 get_order_secure", "校验服务来源、工具 ID 和允许列表"],
          ["超长内容", "返回大量无关文本挤掉系统约束", "截断非关键字段并保留来源标记"],
        ]} />
        <Card title="进入模型前"><List items={["按 Schema 解析结构化字段，不把整段原文直接拼进高优先级指令。", "保留 server、tool、resource 和调用版本，确保每段内容可追溯。", "对敏感字段做最小化和脱敏，对未知内容类型安全失败。", "把 Prompt Injection 命中记录为安全事件，而不是普通回答错误。"]} /></Card>
      </S>

      <S id="transport" n="06" t="会话与传输测试要覆盖断线、乱序和隔离" b="消息正确到达还不够">
        <Table title="传输与会话场景" headers={["场景", "断言"]} rows={[
          ["响应乱序", "使用 request_id 绑定请求，不把结果交给另一调用"],
          ["连接中断", "未确认写入状态进入 UNKNOWN，不自动重复提交"],
          ["会话恢复", "重新协商能力，旧审批和临时状态不复用"],
          ["并发用户", "session、actor、tenant 和工具结果完全隔离"],
          ["取消请求", "下游可取消时传播取消；不可取消时回读最终状态"],
          ["超大消息", "按上限拒绝或分页，不静默截断关键字段"],
        ]} />
      </S>

      <S id="failure" n="07" t="按错误语义决定重试、回读还是停止" b="错误不能被包装成成功">
        <Table title="错误到动作映射" headers={["错误", "动作", "禁止"]} rows={[
          ["参数校验失败", "修正输入或询问用户", "原样重试"],
          ["权限不足", "停止并提供授权边界", "切换身份绕过"],
          ["限流", "遵守 Retry-After 和总预算", "并发放大请求"],
          ["网络超时", "有界重试；写操作复用幂等键", "生成新 request_id 重复写入"],
          ["结果未知", "按幂等键回读业务状态", "直接报告失败或成功"],
          ["业务拒绝", "保留拒绝原因并转人工或结束", "把拒绝当技术异常重试"],
        ]} />
        <Code title="调用记录最小字段">{`{
  "request_id": "req-8f21",
  "session_id": "session-hash",
  "tool": "create_after_sale_ticket",
  "arguments_digest": "sha256:...",
  "attempt": 2,
  "status": "UNKNOWN",
  "next_action": "READ_BACK"
}`}</Code>
      </S>

      <S id="audit" n="08" t="日志既要能重放，也不能泄露敏感数据" b="可观测与最小披露">
        <Table title="审计字段" headers={["需要记录", "不能记录"]} rows={[
          ["主体哈希、租户、会话和 request_id", "明文 Token、Cookie 和授权码"],
          ["Client、Server、协议和工具版本", "完整手机号、地址和证件号"],
          ["工具名、参数摘要、策略决策和耗时", "未经脱敏的工具原始返回"],
          ["审批人、审批摘要、有效期和使用结果", "可复用的 approval_token"],
          ["错误分类、重试次数和最终业务状态", "只写“调用失败”的无诊断日志"],
        ]} />
        <Callout>审计的目标是回答“谁在什么版本下，以什么权限，对哪个业务对象执行了什么，结果怎样”，不是把所有敏感内容原样保存。</Callout>
      </S>

      <S id="regression" n="09" t="协议、Schema 和策略变化都要进入契约回归" b="升级前先比较差异">
        <Table title="变更影响" headers={["变更", "测试重点", "发布判断"]} rows={[
          ["新增可选字段", "旧 Client 能否忽略并继续工作", "兼容后允许发布"],
          ["新增必填字段", "旧调用是否全部失败", "提供版本迁移后再发布"],
          ["字段改名或改义", "Agent 参数和下游语义是否一致", "按破坏性变更处理"],
          ["工具描述变化", "选择率、误调用率和注入风险", "回放 Agent 轨迹集"],
          ["授权策略变化", "角色、scope、租户和资源边界", "越权样本必须全部拒绝"],
          ["传输实现变化", "断线、乱序、取消和超时", "故障注入通过后发布"],
        ]} />
        <Card title="固定回归集"><List items={["初始化与能力协商样本。", "每个工具的有效、缺参、错型、越界和未知字段样本。", "跨用户、跨租户、少 scope 和过期审批样本。", "工具描述、资源和返回值注入样本。", "超时、断线、重复响应和结果未知样本。"]} /></Card>
      </S>

      <S id="practice" n="10" t="用三个工具跑通一套 MCP 接入验收" b="练习与检查">
        <Card title="练习"><List ordered items={["准备订单查询、政策检索和创建工单三个工具，明确只读与写入边界。", "为每个工具建立严格输入输出 Schema 和错误语义。", "覆盖初始化、tools/list、版本不兼容和破坏性 Schema 变化。", "用不同角色、租户、订单归属和审批状态验证授权。", "向描述、资源和返回值注入不可信指令，确认不会改变系统目标。", "注入断线、超时、重复响应和结果未知，验证幂等、回读与审计。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><Check title="协议契约" items={["协商结果明确", "Schema 严格", "版本差异可识别", "错误可诊断"]} /><Check title="安全边界" items={["身份资源绑定", "写操作先审批", "不可信内容隔离", "敏感字段最小化"]} /><Check title="运行治理" items={["会话不串线", "重试保持幂等", "结果未知先回读", "审计可重放"]} /></div>
      </S>
    </KnowledgeLayout>
  </div>;
}

function Header() { return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Phase 03 / Agent Quality 02</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">MCP 工具接入与安全测试教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">从协议握手到业务副作用，逐层验证 MCP 工具是否能被正确发现、安全调用、可靠追踪并稳定升级。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>协议 + 工具契约</span><span>权限、内容与运行安全</span></div></header>; }
function S({ id, n, t, b, children }: { id: string; n: string; t: string; b: string; children: React.ReactNode }) { return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={`mt-3 space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join()} className="border-b border-space-border/50">{row.map((cell, index) => <td key={cell + index} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function Code({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-neon-cyan/5 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function Flow({ title, items }: { title: string; items: string[][] }) { return <Card title={title}><div className="grid gap-2 md:grid-cols-9 md:items-center">{items.map((item, index) => <div className="contents" key={item[0]}><div className="rounded-lg border border-space-border bg-neon-cyan/5 p-4 text-center"><b className="block text-xs text-text-primary">{item[0]}</b><span className="text-[11px]">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></Card>; }
function Check({ title, items }: { title: string; items: string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />{item}</li>)}</ul></Card>; }
