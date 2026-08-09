import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata=buildPageMetadata({title:"日志、监控与可观测性测试教程",description:"以商城订单、支付和退款故障为案例，验证日志、Metrics、Trace、告警、SLI/SLO/SLA与线上问题证据链。",path:"/knowledge/observability-testing",tags:["可观测性测试","日志","Metrics","Trace","SLO"]});
const sections:SectionItem[]=[{id:"why",label:"为何要测"},{id:"model",label:"三大支柱"},{id:"logs",label:"日志"},{id:"metrics",label:"Metrics"},{id:"traces",label:"Trace"},{id:"alerts",label:"告警"},{id:"slo",label:"SLI/SLO/SLA"},{id:"evidence",label:"证据链"},{id:"practice",label:"练习与清单"}];
const signalRows=[["日志 Logs","这一次请求发生了什么","orderNo、traceId、错误码、重试次数"],["指标 Metrics","问题影响有多大、持续多久","成功率、P99、消息积压、资源饱和度"],["链路 Trace","时间花在哪个服务、哪次调用失败","订单→库存→支付→消息的 Span"],["业务事件","技术异常是否改变业务结果","重复扣款、超卖、退款超时"]];

export default function ObservabilityPage(){return <div className="mx-auto max-w-5xl animate-fade-in"><Link href="/knowledge/tutorials?track=quality-architecture" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan"><ArrowLeft className="h-4 w-4"/>返回质量体系与测试架构模块</Link><KnowledgeLayout sections={sections} searchPlaceholder="搜索日志、指标、Trace 与 SLO...">
<header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Quality Architecture / Tutorial 21</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">日志、监控与可观测性测试教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">系统能够恢复还不够。你还需要验证团队能否及时发现、准确定位，并用同一条证据链解释用户的订单发生了什么。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>9 个章节</span><span>Logs + Metrics + Trace</span><span>告警 + SLO + 证据链</span></div></header>
<S id="why" n="01" t="把可观测性也当成产品来测试" b="看见不等于看懂"><Flow items={[["用户反馈","支付后订单未更新"],["指标发现","支付成功率下降"],["Trace定位","回调消费超时"],["日志确认","幂等更新失败"],["业务对账","扣款一次、订单待补偿"]]}/><Card title="测试目标"><List items={["异常发生后能在目标时间内被发现。","能从告警定位到服务、接口、版本和业务对象。","日志、指标与 Trace 表达同一事实，不相互矛盾。","敏感数据不进入日志，采样不会漏掉关键失败。","恢复后告警关闭，业务数据完成对账。"]}/></Card></S>
<S id="model" n="02" t="用四类信号回答不同问题" b="技术信号连接业务"><Table title="可观测信号分工" headers={["信号","回答的问题","商城关键字段"]} rows={signalRows}/><Callout>只有 CPU 和错误日志，无法证明用户有没有被重复扣款。技术指标必须与订单成功率、支付金额、库存差异等业务指标共同使用。</Callout></S>
<S id="logs" n="03" t="验证日志可搜索、可关联且不泄密" b="结构化日志"><Code title="推荐的结构化错误日志">{`{
  "level": "error",
  "event": "payment_callback_failed",
  "trace_id": "tr-82a1",
  "order_no": "TEST-20260809-001",
  "payment_no": "PAY-001",
  "error_code": "DB_TIMEOUT",
  "retry_count": 2,
  "duration_ms": 812
}`}</Code><Card title="用例：当支付回调写库超时时，日志应支持直接定位"><List ordered items={["用测试支付单触发一次可控写库超时。","按 orderNo 搜索，确认能找到失败事件和 traceId。","检查错误码、依赖、耗时、重试次数和版本字段。","确认没有密码、Token、完整卡号或个人敏感信息。","恢复后确认成功或补偿事件也被记录。"]}/></Card><Table title="日志反例" headers={["问题","后果","改进"]} rows={[["只写“处理失败”","无法定位对象与原因","结构化错误码 + 业务 ID"],["打印完整请求体","泄露隐私或密钥","字段白名单与脱敏"],["每次重试都打印大堆栈","噪声和成本失控","首次详情 + 聚合计数"],["各服务时间不一致","时间线无法拼接","统一时区与时钟同步"]]}/></S>
<S id="metrics" n="04" t="验证 Metrics 的定义与计算" b="数字必须可信"><Table title="商城核心指标" headers={["指标","计算口径","测试方法"]} rows={[["下单成功率","成功订单 / 有效下单请求","构造成功、业务拒绝、系统失败，核对分母"],["支付回调错误率","失败回调 / 全部回调","注入已知数量失败并核对标签"],["P99 延迟","99% 请求不超过的耗时","固定样本分布校验聚合结果"],["消息积压","生产位点 - 消费位点","暂停消费后应增长，恢复后应下降"],["库存差异数","缓存或订单占用与 DB 事实差异","制造测试差异并验证指标出现"]]}/><Card title="Metrics 测试步骤"><List ordered items={["先写指标名称、单位、标签、分子和分母。","用最小可计算样本产生确定结果。","核对采集、聚合、看板展示与时间窗口。","测试重启、跨实例和标签缺失场景。","限制高基数标签：orderNo 应留在日志或 Trace，不应直接成为 Metrics 标签。"]}/></Card></S>
<S id="traces" n="05" t="沿 Trace 找到慢点与断点" b="跨服务还原请求"><Flow items={[["POST /orders","root span"],["库存预占","inventory span"],["支付创建","payment span"],["事件发布","mq span"],["退款补偿","async linked span"]]}/><Card title="用例：当库存调用超时时，Trace 应显示完整因果关系"><List items={["入口 Span 带 traceId、版本和测试环境。","父子关系、服务名、操作名和耗时正确。","超时 Span 标记错误且记录标准化错误码。","重试是独立 Span，次数和退避可见。","异步消息传递 trace context，退款补偿可关联原订单。"]}/></Card><Callout>采样策略也要测试。P0 失败、慢请求和支付异常应强制保留；如果只做 1% 随机采样，最重要的低频事故可能恰好没有 Trace。</Callout></S>
<S id="alerts" n="06" t="让告警准确、及时并可行动" b="从触发到恢复"><Table title="告警测试矩阵" headers={["用例标题","期望"]} rows={[["当下单错误率连续 5 分钟超过 2% 时，应触发高优先级告警","阈值、持续窗口、通知对象和看板链接正确"],["当一分钟出现单个瞬时错误时，不应反复告警","去抖、聚合和静默策略生效"],["当支付出现重复扣款信号时，应立即告警","业务红线不等待普通窗口"],["当指标恢复并持续稳定时，告警应自动恢复","恢复通知包含持续时间与峰值"],["当值班人未确认时，应按升级策略通知下一负责人","升级链路可验证"]]}/><Card title="告警消息最少包含"><List items={["发生了什么、从何时开始、影响什么业务。","当前值、阈值、趋势和受影响版本。","关联看板、日志查询、Trace 示例和 Runbook。","告警级别、负责人、升级与恢复条件。"]}/></Card></S>
<S id="slo" n="07" t="用 SLI、SLO、SLA 统一质量语言" b="目标、承诺与误差预算"><div className="grid gap-4 md:grid-cols-3"><Card title="SLI"><p>实际测量指标，例如有效下单成功率、支付确认延迟。</p></Card><Card title="SLO"><p>内部目标，例如 30 天内 99.9% 有效下单成功。</p></Card><Card title="SLA"><p>对外承诺及违约责任，通常不等同于内部 SLO。</p></Card></div><Code title="可计算定义">{`good_events = valid_orders with result in {CREATED, BUSINESS_REJECTED}
valid_events = all orders - client_cancelled - load_test_traffic
availability_sli = good_events / valid_events
error_budget = 1 - 0.999`}</Code><Card title="用例：当错误预算快速燃烧时，应触发多窗口告警"><List items={["用受控流量制造短时高错误率和长时轻微错误率。","验证快窗口能发现事故，慢窗口能发现持续退化。","确认测试流量和用户主动取消不会污染 SLI。","检查预算耗尽时发布门禁是否按策略收紧。"]}/></Card></S>
<S id="evidence" n="08" t="构建线上问题证据链" b="从用户现象到业务结论"><Timeline/><Card title="失败报告模板"><Code title="incident evidence">{`用户现象: 10:02 支付成功但订单仍待支付
业务对象: order_no=... payment_no=...
指标: 10:01 起 callback_error_rate > 3%
Trace: payment callback -> order DB timeout 812ms
日志: DB_TIMEOUT, retry_count=3, compensation_id=...
数据结论: 渠道扣款 1 次；订单 10:08 补偿为 PAID
行动: 修复连接池配置；补充告警与回归用例`}</Code></Card><Callout>“服务抖了一下”不是证据。可复盘的结论必须说明时间、版本、影响、业务对象、技术原因、数据最终状态和采取的行动。</Callout></S>
<S id="practice" n="09" t="验证一次支付故障的可观测性" b="练习与检查清单"><Card title="练习"><List ordered items={["为下单、支付和退款各定义一个业务 SLI。","注入一次支付回调超时，验证日志字段、Metrics 数值和 Trace 父子关系。","验证告警触发、通知、升级和恢复全流程。","按 orderNo 串联页面时间、指标、日志、Trace 和数据库状态。","输出证据链报告，并提出一项监控或可测性改进。"]}/></Card><div className="grid gap-4 md:grid-cols-3"><Check title="信号可信" items={["口径可计算","日志已脱敏","Trace 可串联","业务指标齐全"]}/><Check title="告警可用" items={["阈值已验证","噪声受控","Runbook 可达","恢复可确认"]}/><Check title="结论可追溯" items={["版本环境明确","业务 ID 齐全","时间线一致","改进项有负责人"]}/></div><Next/></S>
</KnowledgeLayout></div>}

function S({id,n,t,b,children}:{id:string;n:string;t:string;b:string;children:React.ReactNode}){return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>}
function Card({title,children}:{title?:string;children:React.ReactNode}){return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title&&<h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>}
function List({items,ordered=false}:{items:string[];ordered?:boolean}){const T=ordered?"ol":"ul";return <T className={`mt-3 space-y-2 pl-5 ${ordered?"list-decimal":"list-disc"}`}>{items.map(x=><li key={x}>{x}</li>)}</T>}
function Table({title,headers,rows}:{title:string;headers:string[];rows:string[][]}){return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map(x=><th key={x} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{x}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.join()} className="border-b border-space-border/50">{r.map((x,i)=><td key={x+i} className="px-4 py-2.5 text-xs leading-relaxed">{x}</td>)}</tr>)}</tbody></table></div></Card>}
function Code({title,children}:{title:string;children:string}){return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>}
function Callout({children}:{children:React.ReactNode}){return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>}
function Flow({items}:{items:string[][]}){return <Card title="从现象到结论的观察路径"><div className="grid gap-2 md:grid-cols-9 md:items-center">{items.map((x,i)=><div className="contents" key={x[0]}><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><b className="block text-xs text-text-primary">{x[0]}</b><span className="text-[11px]">{x[1]}</span></div>{i<4&&<ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block"/>}</div>)}</div></Card>}
function Timeline(){return <Card title="支付异常证据时间线"><div className="grid gap-3 md:grid-cols-4">{[["10:01","错误率告警"],["10:02","用户支付成功"],["10:02:01","订单写库超时"],["10:08","补偿完成"]].map(x=><div key={x[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><b className="text-neon-cyan">{x[0]}</b><p className="mt-2 text-xs">{x[1]}</p></div>)}</div></Card>}
function Check({title,items}:{title:string;items:string[]}){return <Card title={title}><ul className="space-y-3">{items.map(x=><li key={x} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 text-neon-cyan"/>{x}</li>)}</ul></Card>}
function Next(){return <div className="mt-8 flex justify-end border-y border-space-border py-6"><Link href="/knowledge/test-metrics-quality-review" className="inline-flex items-center gap-2 text-sm text-neon-cyan">下一篇：测试报告、效能度量与质量复盘教程<ArrowRight className="h-4 w-4"/></Link></div>}
