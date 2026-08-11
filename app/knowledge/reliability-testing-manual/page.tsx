import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "可靠性测试实战手册",
  description: "覆盖可靠性指标、长时间稳定性、故障注入与容错、恢复能力、优雅降级与数据可靠性的可靠性测试实战手册。",
  path: "/knowledge/reliability-testing-manual",
  tags: ["可靠性测试", "稳定性", "故障注入", "容错", "恢复", "SLO"],
});

const sections: SectionItem[] = [
  { id: "overview", label: "可靠性是什么" }, { id: "metrics", label: "指标定义" },
  { id: "stability", label: "长时间稳定性" }, { id: "fault", label: "故障注入" },
  { id: "recovery", label: "恢复能力" }, { id: "graceful", label: "优雅降级" },
  { id: "data", label: "数据可靠性" }, { id: "design", label: "方案设计" },
  { id: "report", label: "报告与缺陷" }, { id: "checklist", label: "检查清单" },
];

const vsRows = [
  ["功能测试", "功能是否符合需求", "单个功能是否正确", "需求全覆盖、用例可复现"],
  ["性能测试", "给定负载下是否达标", "P95 延迟、吞吐量、资源占用", "并发、峰值、容量测试"],
  ["可靠性测试", "异常与时间考验下能否持续可用", "可用性、MTBF、MTTR、错误率", "长时间运行、故障注入、恢复演练"],
];

const metricRows = [
  ["可用性", "可用时间 / 总时间 × 100%", "99.99%(全年停机 ≤ 52.6 分钟)"],
  ["MTBF 平均无故障时间", "总运行时间 / 故障次数", "支付核心链路 ≥ 30 天"],
  ["MTTR 平均恢复时间", "累计恢复时间 / 故障次数", "核心服务 ≤ 5 分钟"],
  ["故障率", "故障次数 / 总请求量", "每百万请求 < 1 次"],
  ["P95 延迟", "95% 请求的响应时间", "支付下单接口 < 500ms"],
  ["错误率", "失败请求 / 总请求数", "< 0.1%(不含业务主动拒绝)"],
];

const stabilityRows = [
  ["7×24 小时", "支付核心链路 + 真实流量回放", "跨日切换、账务日切、持续可用"],
  ["72 小时", "交易、账务、清结算批量任务", "定时任务漂移、内存与连接泄漏"],
  ["48 小时", "新上线模块与高风险组件", "资源回收、日志增长、缓存命中率"],
];

const faultRows = [
  ["实例宕机", "kill 进程 / 停止容器", "流量自动切走，请求有重试", "可用性不受影响，无 5xx 堆积"],
  ["网络延迟", "注入 500ms 延迟", "超时重试生效，不无限等待", "P95 延迟可控，无雪崩"],
  ["网络丢包", "注入 5%-10% 丢包", "重试幂等，账务不重复", "最终一致达成，无资损"],
  ["磁盘写满", "填充至 95%", "监控告警，拒绝新增写请求", "不崩溃，清理后恢复"],
  ["CPU 打满", "压满至 100%", "降级开关生效", "核心读接口仍可用"],
  ["第三方失败", "模拟支付渠道超时", "熔断打开，走备选渠道", "默认降级行为正确"],
  ["主从切换", "kill 主库 / 触发选举", "自动切换，连接重连", "切换期无数据丢失"],
];

const recoveryRows = [
  ["进程重启", "kill 后自动拉起", "< 30 秒", "流量逐步恢复，无重复支付"],
  ["容器重启", "删除 Pod 重新调度", "< 2 分钟", "本地缓存重建，幂等键不丢"],
  ["主从切换", "数据库主从切换演练", "< 60 秒", "事务不丢，账务对平"],
  ["备份恢复", "全量备份 + binlog 回放", "RPO ≤ 5 分钟，RTO ≤ 1 小时", "恢复后数据一致，对账通过"],
  ["消息重放", "重复消费 MQ 消息", "消费端幂等", "不产生重复扣款或漏单"],
];

const gracefulRows = [
  ["限流", "QPS 超阈值或排队超时", "拒绝非核心请求，返回可理解提示", "流量回落后自动或半自动放开"],
  ["熔断", "错误率 > 50% 或超时比例过高", "快速失败，走备选渠道或缓存", "熔断窗口后试探放量"],
  ["降级", "依赖不可用或资源紧张", "关闭非核心功能，保障下单支付", "依赖恢复后逐步恢复功能"],
  ["兜底页面", "核心接口大面积不可用", "展示故障说明与联系方式", "人工确认后恢复"],
];

const dataRows = [
  ["持久化", "崩溃重启后数据不丢失", "预写日志 + 定期刷盘", "重启后数据完整可读"],
  ["幂等", "同一请求重复提交只生效一次", "订单号 / 幂等键去重", "无重复扣款、无重复发券"],
  ["重复消息", "MQ 重复投递", "消费端幂等 + 去重表", "重复消费无副作用"],
  ["对账", "内部账务与渠道流水核对", "T+1 自动对账 + 异常人工", "差异有告警和补偿任务"],
  ["最终一致性", "异步链路短暂不一致", "状态机 + 补偿任务", "最终收敛，可见窗口有说明"],
];

const designSteps = [
  "基于风险与变更选场景：核心链路、高风险组件、历史故障点优先。",
  "确定时长与负载模型：结合业务峰谷与真实流量回放，避免空转。",
  "定义监控指标与基线：可用性、错误率、资源水位、依赖健康度。",
  "设定通过标准：指标阈值 + 故障注入后的恢复要求逐项写明。",
  "明确停止条件：致命缺陷、资损风险、长时间无法恢复时立即叫停。",
  "规划回归：修复缺陷后重跑故障场景，并与基线对比。",
];

const reportRows = [
  ["指标趋势", "可用性、错误率、资源水位随时间曲线", "与基线和 SLO 逐项对比"],
  ["证据链", "告警、日志、监控图、操作记录", "每个缺陷可复现、可追溯"],
  ["根因归类-资源", "内存、CPU、磁盘、连接数", "OOM、磁盘满、连接耗尽"],
  ["根因归类-代码", "泄漏、竞态、重试风暴、死循环", "内存泄漏、锁等待、重试放大"],
  ["根因归类-依赖", "第三方、中间件、网络", "上游超时、主从切换、配额耗尽"],
  ["根因归类-数据", "脏数据、重复消息、分库分表", "幂等缺失、数据漂移、切分不均"],
  ["验收结论", "按 SLO 与通过标准逐项验收", "通过 / 有条件通过 / 不通过"],
];

export default function ReliabilityTestingManualPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回知识库</Link>
    <KnowledgeLayout sections={sections}>
      <header className="mb-10"><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">可靠性测试实战手册</h1><p className="mb-6 text-lg text-text-secondary">以「支付订单系统」为贯穿案例，讲清楚怎么测稳定性、怎么注入故障、怎么验证恢复，让每一次发布都更接近 99.99%。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>支付订单系统</span><span>稳定性 · 容错 · 恢复 · 数据</span></div></header>

      <section id="overview" data-knowledge-section className="mb-14"><Header icon="🎯" title="可靠性测试到底测什么" badge="功能测试问对不对，可靠性测试问久不久" /><Card title="先说人话"><p>功能测试关心「功能是否按要求实现」，可靠性测试关心「系统在异常、压力和时间考验下是否还能持续正确地提供服务」。对支付系统来说，一次扣款重复、一次重启丢账，比界面丑一百倍都严重。</p></Card><Table title="与功能、性能测试的区别" headers={["测试类型", "核心问题", "关键指标", "典型手段"]} rows={vsRows} /><Card title="可靠性不等于性能"><List items={["性能好只说明负载下响应快，不代表断电重启后数据不丢。", "可靠性是时间维度的属性：短期全对，长期可能因泄漏而崩。", "性能测试压力大、时间短；可靠性测试压力常态、时间长、伴随故障。", "高可用是设计出来的，也是长期演练验证出来的。"]} /></Card></section>

      <section id="metrics" data-knowledge-section className="mb-14"><Header icon="📊" title="可靠性指标定义" badge="没有指标，可靠性只是一句口号" /><Table title="核心指标与金融系统参考阈值" headers={["指标", "公式 / 含义", "参考阈值"]} rows={metricRows} /><Callout title="SLO 与 SLA 的关系"><p>SLO 是团队自己对可靠性定下的内部目标（如可用性 99.99%），SLA 是对客户承诺并可能赔偿的外部协议。SLA 必须比 SLO 更宽松，留出告警和修复的缓冲；可靠性测试验证的正是 SLO 是否成立，而不是让系统恰好贴着 SLA 红线运行。</p></Callout></section>

      <section id="stability" data-knowledge-section className="mb-14"><Header icon="⏳" title="长时间稳定性测试" badge="跑得久，才知道会不会悄悄变坏" /><Card title="重点盯四类缓慢恶化"><List items={["内存与连接泄漏：堆、线程、连接池、文件句柄逐小时增长。", "日志与磁盘增长：日志轮转失效或过期数据不清理会拖垮磁盘。", "定时任务漂移：任务越跑越慢、越跑越乱，触发点不断后移。", "资源回收失效：缓存、临时文件、线程池队列只进不出。"]} /></Card><Table title="时长与场景怎么选" headers={["时长", "覆盖场景", "重点观察"]} rows={stabilityRows} /><CodeBlock title="python · 简单内存监控">{`import psutil
import time

def watch(pid, interval=60):
    proc = psutil.Process(pid)
    baseline = proc.memory_info().rss
    while True:
        mem = proc.memory_info().rss
        grow = (mem - baseline) / baseline
        if grow > 0.5:
            print("内存疑似泄漏，较基线涨幅", round(grow * 100), "%")
        time.sleep(interval)

watch(1234)`}</CodeBlock></section>

      <section id="fault" data-knowledge-section className="mb-14"><Header icon="💥" title="故障注入与容错" badge="故障一定会来，先替它排好演练" /><Table title="典型故障场景" headers={["故障", "注入方式", "预期表现", "通过标准"]} rows={faultRows} /><Card title="注入纪律"><List items={["先生产后测试：每次只注入一个故障，观察完整影响面再注入下一个。", "全程可回滚：混沌工具要支持秒级撤销，避免演练变真事故。", "结合真实架构：在容器、K8s、网关各层分别演练，而不只在应用层。", "每次注入都要留证据：时间线、指标曲线、日志与告警一一对应。"]} /></Card></section>

      <section id="recovery" data-knowledge-section className="mb-14"><Header icon="🛟" title="恢复能力验证" badge="故障不可怕，恢复慢才可怕" /><Table title="常见恢复场景" headers={["恢复场景", "演练动作", "恢复目标", "完整性校验"]} rows={recoveryRows} /><Card title="恢复验证两个要点"><List items={["时间要量：RTO/RPO 是硬指标，切换、重启、恢复都要计时并留趋势。", "数据要对平：恢复完成后必须跑对账，账平才算真正恢复。"]} /></Card></section>

      <section id="graceful" data-knowledge-section className="mb-14"><Header icon="🧭" title="优雅降级" badge="扛不住时，也要把用户护住" /><Table title="降级手段" headers={["手段", "触发条件", "降级行为", "恢复方式"]} rows={gracefulRows} /><Card title="验证降级时的支付语义"><List items={["降级不能破坏幂等：限流放行的请求依旧按原订单号去重。", "兜底页面要让用户知道钱的状态：支付中、成功、失败都要可查。", "熔断后要有恢复路径：半开试探、限流放量，而不是一键全开。"]} /></Card></section>

      <section id="data" data-knowledge-section className="mb-14"><Header icon="🗄️" title="数据可靠性" badge="钱的事，一分都不能错" /><Table title="数据可靠性验证点" headers={["验证点", "风险场景", "实现依赖", "通过标准"]} rows={dataRows} /><Card title="与数据质量测试的衔接"><List items={["数据质量测试管「数据本身对不对」：字段、格式、关联、完整性约束。", "数据可靠性测试管「故障下数据会不会丢、会不会错」：断电、重启、重复投递。", "先过数据质量，再做可靠性：脏数据场景会放大故障注入时的异常表现。", "对账脚本既是质量检查，也是可靠性验证，建议两者复用同一套规则。"]} /></Card></section>

      <section id="design" data-knowledge-section className="mb-14"><Header icon="📐" title="可靠性测试方案设计" badge="先写方案，再动故障" /><Card title="方案六步"><List ordered items={designSteps} /></Card><Card title="方案里必须写清的五个要素"><List items={["场景选取：为什么选这个场景，对应什么业务风险。", "测试时长：短跑和长跑分别覆盖什么。", "监控指标：每个指标的数据来源与采集频率。", "通过标准：数字说话，不能写「基本正常」。", "停止条件：什么情况下立刻终止并上报，避免演练扩大化。"]} /></Card></section>

      <section id="report" data-knowledge-section className="mb-14"><Header icon="📄" title="报告与缺陷管理" badge="可靠性报告要让验收方一眼看明白" /><Table title="报告结构" headers={["板块", "内容", "验收口径"]} rows={reportRows} /><Card title="缺陷怎么归类"><List items={["资源类：泄漏、耗尽，通常伴随内存、连接数曲线单调上涨。", "代码类：竞态、重试风暴、死循环，通常在某次注入后被放大。", "依赖类：第三方超时、中间件切换，通常表现为上游症状。", "数据类：幂等缺失、脏数据，通常在对账和重放时暴露。"]} /></Card></section>

      <section id="checklist" data-knowledge-section className="mb-14"><Header icon="✅" title="可靠性测试检查清单" badge="设计前 / 测试中 / 发布前" /><div className="grid gap-4 md:grid-cols-3"><Card title="设计前"><List items={["业务风险与核心链路已确认", "SLO 与通过标准已定义", "监控告警就绪并有基线", "故障注入工具与权限已准备", "生产演练有审批和回滚预案"]} /></Card><Card title="测试中"><List items={["长时间运行内存连接无增长", "故障注入后按预期降级恢复", "重启切换后数据完整性已验证", "幂等与对账验证通过", "每个故障都有完整证据链", "达到停止条件立即终止上报"]} /></Card><Card title="发布前"><List items={["P0/P1 可靠性缺陷已关闭", "恢复演练 RTO/RPO 达标", "降级与兜底文案已上线", "SLO 达成情况有数据支撑", "监控告警阈值与责任人已确认"]} /></Card></div></section>
    </KnowledgeLayout>
  </div>;
}

function Header({ icon, title, badge }: { icon: string; title: string; badge: string }) { return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 text-lg">{icon}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={cn("mt-3 space-y-2 pl-5", ordered ? "list-decimal" : "list-disc")}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-space-border/50 last:border-b-0">{row.map((cell) => <td key={cell} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function CodeBlock({ title, children }: { title: string; children: string }) {
  return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>;
}
function Callout({ title, children }: { title: string; children: React.ReactNode }) { return <div className="mb-4 rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 p-4 text-sm leading-7 text-text-secondary">{title && <div className="mb-1 font-bold text-neon-cyan">{title}</div>}{children}</div>; }
