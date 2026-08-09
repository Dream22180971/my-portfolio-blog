import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "需求评审与测试方案设计教程",
  description: "以商城登录、下单、支付和退款为案例，学习需求评审、风险分析、范围划分、估算与准入准出设计。",
  path: "/knowledge/requirements-test-planning",
  tags: ["需求评审", "测试方案", "风险分析", "测试范围", "准入准出"],
});

const sections: SectionItem[] = [
  { id: "goal", label: "评审目标" }, { id: "read", label: "拆解需求" },
  { id: "questions", label: "发现漏洞" }, { id: "risk", label: "风险排序" },
  { id: "scope", label: "测试范围" }, { id: "strategy", label: "测试策略" },
  { id: "estimate", label: "资源估算" }, { id: "criteria", label: "准入准出" },
  { id: "practice", label: "练习与检查" },
];

const reviewRows = [
  ["登录", "登录态有效多久？支付前是否二次校验？", "过期、跨端登录、账号冻结"],
  ["下单", "价格与库存以页面还是服务端为准？", "改价、超卖、重复提交"],
  ["支付", "支付超时后订单是什么状态？", "重复扣款、回调乱序、金额不一致"],
  ["退款", "部分退款如何计算优惠和运费？", "超额退款、重复退款、状态回退"],
];

const scopeRows = [
  ["本次测试", "登录校验、创建订单、模拟支付、整单退款", "直接受需求影响的核心交易链路"],
  ["关联回归", "订单列表、库存、优惠券、支付记录", "共享数据或状态可能被改动"],
  ["本次不测", "真实银行卡扣款、生产短信、物流履约", "无授权或无可控环境，记录替代验证"],
];

export default function RequirementsTestPlanningPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=foundations" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回测试成长路线</Link>
      <KnowledgeLayout sections={sections} searchPlaceholder="搜索需求评审关键词...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Main Track / Tutorial 04</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">需求评审与测试方案设计教程</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">在写用例之前先把规则问清、风险排好、范围定准，让测试投入集中在真正影响用户和资金的地方。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>9 个章节</span><span>商城交易案例</span><span>评审 + 方案 + 练习</span></div>
        </header>

        <section id="goal" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="需求评审不是找错字" badge="建立共同理解" />
          <Card title="你要让需求变得可实现、可验证、可验收"><p>产品提出“用户支付后可以退款”，还不能直接写用例。你需要继续确认谁能退、何时能退、退多少、失败后怎么办，以及订单、支付记录和库存如何变化。</p></Card>
          <FlowFigure id="review-goal" title="把一句需求推进到可测试状态" items={[["业务目标", "为什么要做"], ["明确规则", "谁在何时做什么"], ["异常约定", "失败与重试"], ["验收证据", "如何判断完成"]]} />
          <Callout>评审的产出不是“测试已知悉”，而是问题清单、确认后的验收标准、风险清单和待办责任人。</Callout>
        </section>

        <section id="read" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="用六个问题拆解 PRD" badge="从文字到业务模型" />
          <div className="grid gap-4 md:grid-cols-2"><Card title="先读主干"><BulletList items={["谁：游客、会员、客服或系统任务。", "做什么：登录、下单、支付或退款。", "为什么：用户目标与业务价值。"]} /></Card><Card title="再补边界"><BulletList items={["什么条件：库存、金额、时间和权限。", "结果去哪：页面、接口、数据库和消息。", "失败怎么办：提示、回滚、重试和补偿。"]} /></Card></div>
          <Card title="可执行步骤"><BulletList ordered items={["通读一遍，只标出角色、动作和结果。", "第二遍圈出金额、数量、时间、状态和权限词。", "画出登录→下单→支付→退款主流程。", "为每个节点补充失败、取消、超时和重复操作。", "把不能唯一判断结果的句子加入问题清单。"]} /></Card>
        </section>

        <section id="questions" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="用场景问题发现需求漏洞" badge="不要替需求做决定" />
          <TableCard title="商城评审问题示例" headers={["模块", "评审问题", "隐藏风险"]} rows={reviewRows} />
          <Card title="把模糊描述改成验收标准"><p>模糊：退款成功后更新订单。明确：当支付成功的订单发起整单退款且支付渠道受理时，退款单进入“处理中”；收到成功回调后，订单进入“已退款”，退款金额等于实付金额，库存按约定恢复。</p></Card>
          <Callout>没有被确认的规则写成“待确认”，不要凭经验补成产品决定。评审记录需要保留结论、负责人和截止时间。</Callout>
        </section>

        <section id="risk" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="先按风险决定测试顺序" badge="影响 × 可能性" />
          <RiskFigure />
          <Card title="商城风险排序"><BulletList items={["P0：重复支付或超额退款，直接造成资金损失。", "P0：支付成功但订单仍待支付，造成履约和投诉。", "P1：优惠券边界计算错误，影响部分订单金额。", "P1：登录过期后提交未给出可恢复提示。", "P2：退款列表文案换行，功能仍可完成。"]} /></Card>
          <Card title="风险驱动用例"><BulletList items={["当用户连续点击支付时，只生成一次有效支付并只扣款一次。", "当退款回调重复到达时，退款状态和金额只更新一次。", "当支付金额与订单应付金额不一致时，系统拒绝入账并告警。"]} /></Card>
        </section>

        <section id="scope" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="写清测试范围与不测范围" badge="边界可追溯" />
          <ScopeFigure />
          <TableCard title="本次退款需求的范围示例" headers={["范围", "内容", "理由"]} rows={scopeRows} />
          <Callout>“不测”不等于“不负责”。要写明原因、剩余风险、替代证据和由谁确认接受。</Callout>
        </section>

        <section id="strategy" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="把风险变成分层测试策略" badge="选对验证位置" />
          <FlowFigure id="strategy-flow" title="一条退款规则在不同层级的验证" items={[["单元", "金额计算"], ["接口", "权限与幂等"], ["集成", "支付回调与消息"], ["端到端", "用户完整退款"]]} />
          <div className="grid gap-4 md:grid-cols-2"><Card title="功能与数据"><BulletList items={["验证登录、下单、支付、退款主路径和异常路径。", "核对订单、支付单、退款单、库存和优惠券。", "覆盖重复请求、乱序回调与补偿任务。"]} /></Card><Card title="专项与环境"><BulletList items={["高风险接口补充性能和安全测试。", "Web 与 App 覆盖目标浏览器和系统版本。", "第三方支付使用沙箱或可控 Mock。"]} /></Card></div>
          <Card title="接口结果的统一判断"><p>下面的创建订单和退款申请示例统一使用 HTTP 200。HTTP 200 只表示请求已被服务正常处理；仍要检查业务码是否成功，以及订单、支付和退款状态是否符合规则。</p></Card>
        </section>

        <section id="estimate" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="估算时间、数据和依赖" badge="方案能够落地" />
          <Card title="按工作拆分估算"><BulletList ordered items={["列出评审、用例设计、数据准备、执行、缺陷回归和报告。", "按 P0/P1/P2 风险估算用例与轮次，不按页面数拍脑袋。", "标出支付沙箱、测试账号、Mock、日志权限等依赖。", "预留联调变化和高风险缺陷回归时间。", "若时间被压缩，明确减少哪些范围以及残余风险。"]} /></Card>
          <TableCard title="小型迭代资源表" headers={["工作", "输入", "输出"]} rows={[["评审与设计", "PRD、原型、接口草案", "问题清单、风险、用例"], ["环境与数据", "账号、商品、支付沙箱", "可重复执行的数据集"], ["执行与回归", "可测版本、日志权限", "结果、缺陷、回归证据"], ["发布判断", "修复状态、阻塞项", "结论与剩余风险"]]} />
        </section>

        <section id="criteria" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="用准入准出控制测试质量" badge="开始和结束都有条件" />
          <div className="grid gap-4 md:grid-cols-2"><ChecklistCard title="测试准入" items={["需求与验收标准已确认", "代码自测和冒烟通过", "环境及依赖可用", "测试数据与日志权限就绪"]} /><ChecklistCard title="测试准出" items={["P0 用例全部通过", "阻断缺陷已关闭并回归", "关联回归结果可追溯", "剩余风险已有负责人接受"]} /></div>
          <Callout>准出不是“没有 Bug”。它是基于明确范围、证据与剩余风险作出的发布判断。</Callout>
        </section>

        <section id="practice" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="完成一份退款测试方案" badge="从评审到决策" />
          <Card title="练习"><BulletList ordered items={["为“支付成功订单支持整单退款”列出 10 个评审问题。", "画出登录、下单、支付、退款的主流程和三条异常分支。", "列出 6 个风险并给出优先级与理由。", "分别写出本次测试、关联回归和不测范围。", "按单元、接口、集成和端到端设计测试策略。", "定义准入、准出和阻断发布条件。"]} /></Card>
          <div className="grid gap-4 md:grid-cols-3"><ChecklistCard title="需求可测" items={["角色清楚", "规则无歧义", "异常有约定", "验收有证据"]} /><ChecklistCard title="方案可执行" items={["范围明确", "风险已排序", "资源已确认", "依赖有负责人"]} /><ChecklistCard title="结论可决策" items={["准入准出明确", "阻断条件明确", "剩余风险明确", "记录可追溯"]} /></div>
          <NextLink text="下一篇将把评审中发现的问题转化为可复现、可跟踪、可复盘的缺陷。" href="/knowledge/defect-management-analysis" label="继续学习 Bug 管理与缺陷分析" />
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function SectionHeader({ number, title, badge }: { number: string; title: string; badge: string }) { return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{number}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function BulletList({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={cn("mt-3 space-y-2 pl-5", ordered ? "list-decimal" : "list-disc")}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function TableCard({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-b border-space-border/50 last:border-b-0">{row.map((cell, index) => <td key={`${cell}-${index}`} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function FlowFigure({ id, title, items }: { id: string; title: string; items: readonly (readonly [string, string])[] }) { return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby={id}><figcaption id={id} className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">{items.map((item, index) => <div key={item[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="block text-sm text-text-primary">{item[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>; }
function RiskFigure() { const items = [["高影响 × 高概率", "立即覆盖并设置阻断条件"], ["高影响 × 低概率", "验证容灾、监控和补偿"], ["低影响 × 高概率", "纳入主要回归"], ["低影响 × 低概率", "记录并按资源安排"]]; return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="risk-title"><figcaption id="risk-title" className="mb-5 text-sm font-bold text-text-primary">风险矩阵决定验证深度</figcaption><div className="grid gap-3 md:grid-cols-2">{items.map((item, index) => <div key={item[0]} className={cn("rounded-lg border p-4", index === 0 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-space-card/50")}><strong className="text-sm text-text-primary">{item[0]}</strong><p className="mt-2 text-xs text-text-secondary">{item[1]}</p></div>)}</div></figure>; }
function ScopeFigure() { return <FlowFigure id="scope-title" title="范围从变更向外扩散，但必须有边界" items={[["需求变更", "退款规则"], ["直接影响", "退款接口"], ["关联回归", "订单与支付"], ["明确不测", "真实资金渠道"]]} />; }
function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>; }
function NextLink({ text, href, label }: { text: string; href: string; label: string }) { return <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">{text}</p><Link href={href} className="inline-flex items-center gap-2 text-sm text-neon-cyan">{label}<ArrowRight className="h-4 w-4" /></Link></div>; }
