import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, GitBranch } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "数据质量六维度实战教程",
  description: "用完整性、准确性、一致性、唯一性、时效性、有效性六个维度定义数据质量，把维度落地为校验规则、监控与对账，建立可持续的数据质量保障。",
  path: "/knowledge/data-quality-engineering",
  tags: ["数据质量", "数据校验", "数据治理", "对账", "金融数据"],
});

const sections: SectionItem[] = [
  { id: "why", label: "为什么是工程问题" }, { id: "dimensions", label: "六维度" },
  { id: "rules", label: "落地为校验规则" }, { id: "sql-rules", label: "逐维度校验示例" },
  { id: "monitoring", label: "监控与对账" }, { id: "root-cause", label: "根因定位" },
  { id: "testing", label: "与测试体系衔接" }, { id: "ai-quality", label: "AI 数据质量" },
  { id: "practice", label: "练习与检查" },
];

const incidentRows = [
  ["记录缺失", "日终批次漏跑，持仓表缺估值日记录", "净值与风险指标缺失，客户资产查询无数据"],
  ["记录重复", "同一账户、证券在估值日被写入两次", "资产总额虚高，监管报送对账失败"],
  ["口径不一", "余额字段在持仓表与总账定义不同", "跨系统对账永远不平，难以定位"],
  ["延迟到达", "行情文件 T+1 才送达", "估值迟发，错过披露与结算时点"],
  ["脏数据混入", "证券代码不在证券字典中", "计算报错，报表出现幽灵持仓"],
];
const dimensionRows = [
  ["完整性", "该有的字段和记录不缺失", "必填字段空值扫描、表间记录数比对、外键关联检查", "持仓表 valuation_date 为空，估值少算一天"],
  ["准确性", "数据与真实业务结果一致", "抽样核对、与上游或对账单比对、公式复算", "实收金额与交易金额对不上，资金账不平"],
  ["一致性", "同一事实在不同表或系统中口径一致", "跨表 join 比对、口径字典核对", "日终余额与总账余额不一致，对账失败"],
  ["唯一性", "业务键在作用域内唯一", "主键与唯一约束、分组计数", "同一账户加证券加估值日出现两条持仓"],
  ["时效性", "数据在约定时间内可用", "批处理时延监控、最新数据新鲜度检查", "行情迟到，估值错过披露时点"],
  ["有效性", "取值符合枚举、范围与字典规则", "枚举校验、范围校验、字典关联校验", "证券代码不在字典中，状态出现非法值"],
];
const ruleRows = [
  ["对象", "规则作用在哪张表、哪个分区", "asset_position 近 7 天"],
  ["判定", "什么条件算通过", "空值计数等于 0"],
  ["阈值", "允许的最大偏差", "行数偏差小于 1%"],
  ["频率", "多久查一次", "批次后、小时级、实时"],
  ["处置", "失败后自动做什么", "告警、阻断发布、生成工单"],
];
const reconcileRows = [
  ["文件级", "行数、总金额、文件 MD5", "批次结束", "漏传、截断、整批重复"],
  ["表级", "主键唯一、空值率、外键缺失", "日终", "加工错误、连接丢失"],
  ["指标级", "净额、持仓市值、估值差额", "小时或日", "口径偏差、延迟累积"],
];
const rootCauseRows = [
  ["源头缺失", "上游系统未生成或生成不全", "核对源头表计数与上游版本号"],
  ["传输丢失", "文件迟到、行数变少、部分分区缺失", "检查传输日志、文件 MD5 与送达时间"],
  ["加工错误", "清洗、合并、汇总逻辑出错", "对照输入与输出，复算关键指标"],
  ["口径分歧", "字段定义不同导致两边对不平", "查阅口径字典，逐字段比对定义"],
];

export default function DataQualityEngineeringPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=data-systems" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回数据系统模块</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索数据质量、校验、对账关键词...">
      <header className="mb-10">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Data Systems / Tutorial</div>
        <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">数据质量六维度实战教程</h1>
        <p className="mb-6 text-lg leading-8 text-text-secondary">把数据质量当作工程问题：用六个维度定义质量，把维度落地为校验规则、监控与对账，让每一次数据异常都可复现、可定位、可闭环。</p>
        <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>9 个章节</span><span>金融资产数据案例</span><span>六维度 + 校验规则</span></div>
      </header>

      <section id="why" data-knowledge-section className="mb-14">
        <SectionHeader number="01" title="为什么数据质量是工程问题" badge="问题先于工具" />
        <Card title="贯穿案例：金融资产数据保障"><p>一条资产数据会这样流转：交易 → 清算 → 持仓与估值 → 报表与风控。估值晚一天、持仓多一笔、余额口径不一致，都会顺着链条传导到净值、对账和监管报送。本教程所有规则都围绕这套数据展开。</p></Card>
        <Callout>临时写 SQL 查一查为什么不够：每次判断标准不统一、检查结果不沉淀、没有告警和责任人、下次同样的错误还会发生。数据质量问题的特征是“重复发生”，所以要把它当作工程问题。</Callout>
        <TableCard title="数据质量事故的表现与影响" headers={["事故表现", "典型场景", "影响"]} rows={incidentRows} />
      </section>

      <section id="dimensions" data-knowledge-section className="mb-14">
        <SectionHeader number="02" title="数据质量的六个维度" badge="检查的视角" />
        <Card title="维度是视角，不是分类"><p>同一条数据可能同时违反多个维度：一次对账失败，往往既是“一致性”问题也是“准确性”问题。按维度组织检查规则，是为了让规则可复用、责任可到人、问题可归类。</p></Card>
        <TableCard title="六维度定义与金融案例" headers={["维度", "定义", "检查方式", "金融案例"]} rows={dimensionRows} />
        <Callout>六维度不要割裂使用。落地时先问“这条数据最怕哪种坏法”，再选主导维度写规则；定位问题时再回到全维度去排查。</Callout>
      </section>

      <section id="rules" data-knowledge-section className="mb-14">
        <SectionHeader number="03" title="把维度落地为校验规则" badge="维度到规则到断言" />
        <Card title="固定链路：维度 → 规则 → SQL/断言"><p>一个可落地的规则，要把“感觉哪里不对”翻译成“查什么、怎么判、谁处置”。维度决定看什么，规则描述判定，SQL 或断言是执行载体。</p></Card>
        <CodeBlock title="规则描述模板">{`规则编号: DQ-CHECK-003
维度: 完整性
对象: asset_position 持仓表, 近 7 天分区
判定: valuation_date 空值计数为 0
阈值: 0
频率: 每个交易日 02:00 批次结束后
处置: 失败则告警并挂起当日估值发布
责任人: 数据应用组`}</CodeBlock>
        <TableCard title="一条规则的必备要素" headers={["要素", "要回答的问题", "示例"]} rows={ruleRows} />
        <Callout>规则的数量要克制。每新增一条规则，都要能回答：它抓到过什么真实问题？如果只是“听起来合理”，就先不要写。</Callout>
      </section>

      <section id="sql-rules" data-knowledge-section className="mb-14">
        <SectionHeader number="04" title="逐维度校验的 SQL 示例" badge="SQL 即检查" />
        <CodeBlock title="完整性与唯一性">{`-- 完整性: 持仓表估值日为空
SELECT COUNT(*) AS null_count
FROM asset_position
WHERE valuation_date IS NULL;

-- 唯一性: 同一账户、证券、估值日重复
SELECT account_id, security_code, valuation_date, COUNT(*) AS cnt
FROM asset_position
GROUP BY account_id, security_code, valuation_date
HAVING COUNT(*) > 1;`}</CodeBlock>
        <CodeBlock title="准确性与一致性">{`-- 准确性: 持仓数量或冻结数量为负
SELECT COUNT(*) AS negative_count
FROM asset_position
WHERE quantity < 0 OR frozen_quantity < 0;

-- 一致性: 持仓市值与总账余额按日核对
SELECT p.account_id, p.valuation_date
FROM asset_position p
JOIN account_balance b
  ON b.account_id = p.account_id
 AND b.biz_date = p.valuation_date
WHERE ABS(p.market_value - b.balance_amount) > 0.01;`}</CodeBlock>
        <CodeBlock title="时效性与有效性">{`-- 时效性: 最近 7 天估值数据是否到齐
SELECT MAX(valuation_date) AS latest_valuation_date
FROM asset_position
WHERE valuation_date >= CURRENT_DATE - INTERVAL 7 DAY;

-- 有效性: 证券代码不在证券字典中
SELECT DISTINCT p.security_code
FROM asset_position p
LEFT JOIN security_dict d
  ON d.security_code = p.security_code
WHERE d.security_code IS NULL;`}</CodeBlock>
        <Callout>SQL 是“探测器”，不是“修复器”。规则的价值是把异常暴露出来并留下证据；修复永远要回到上游源头，而不是在检查层打补丁。</Callout>
      </section>

      <section id="monitoring" data-knowledge-section className="mb-14">
        <SectionHeader number="05" title="数据质量监控与对账" badge="闭环监控" />
        <FlowFigure id="dq-monitoring-flow" title="质量监控闭环" items={[["定义规则", "阈值与频率"], ["调度巡检", "批次内与批次后"], ["指标看板", "行数、金额、空值率"], ["分级告警", "提示或阻断发布"], ["工单处置", "修复与复盘"]]} />
        <Card title="对账的本质"><p>对账是“用另一份可信来源交叉验证”。批次跑完不等于数据正确，还要拿上游文件、总账或清算结果来核对。</p></Card>
        <CodeBlock title="批次对账伪代码">{`上游文件 rows 与下游表记录 rows 对账:
1) 行数: 上游计数 == 下游计数
2) 金额: SUM(amount) 偏差 <= 0.01
3) 键集: 双方业务键集合相等, 差集即异常
4) 抽样: 对相同键的行做字段拼接并 md5, 两侧一致
全部通过 -> 批次标记 SUCCESS
任一失败 -> 进入对账异常队列并告警`}</CodeBlock>
        <TableCard title="对账的三个级别" headers={["级别", "比较内容", "频率", "能发现的问题"]} rows={reconcileRows} />
        <Card title="看板至少盯住四个数字"><BulletList items={["行数趋势：突然变多或变少都可能是漏传或重复。", "关键金额：净额、持仓市值，偏差即告警。", "空值率：必填字段空值占比的基线变化。", "数据新鲜度：最新估值日距今天数，超过阈值说明延迟。"]} /></Card>
      </section>

      <section id="root-cause" data-knowledge-section className="mb-14">
        <SectionHeader number="06" title="数据质量问题的根因定位" badge="按层定位" />
        <TableCard title="四类根因与定位手段" headers={["根因", "常见表现", "定位手段"]} rows={rootCauseRows} />
        <FlowFigure id="dq-layer-flow" title="数据链路分层" items={[["源头", "数据产生"], ["传输", "文件与消息到达"], ["加工", "清洗与汇总"], ["落地", "表与指标"], ["消费", "报表与模型"]]} />
        <Callout>定位顺序永远从下往上：先确认数据到底有没有进来，再怀疑加工逻辑，最后才是口径分歧。跳过前面直接改 SQL，往往是白忙一场。</Callout>
      </section>

      <section id="testing" data-knowledge-section className="mb-14">
        <SectionHeader number="07" title="与测试体系的衔接" badge="测试视角" />
        <Card title="线上体检 + 出厂检验"><p>监控和校验规则是“线上体检”，自动化测试是“出厂检验”。测试保证这次改动不破坏输入输出关系，监控保证线上每天都在正确数据上运行，两者互补。</p></Card>
        <CodeBlock title="数据管道测试伪代码">{`def test_日终持仓加工_正确汇总在途与冻结():
    input_trades = 样例交易流水(成交 2 笔, 冻结 1 笔)
    output = run_position_pipeline(input_trades)
    assert output.quantity == 2
    assert output.frozen_quantity == 1
    assert output.total_amount == Decimal("9999.99")`}</CodeBlock>
        <CodeBlock title="数据一致性测试伪代码">{`def test_持仓表与总账余额_同一估值日口径一致():
    positions = query("SELECT * FROM asset_position WHERE valuation_date = TODAY")
    balances = query("SELECT * FROM account_balance WHERE biz_date = TODAY")
    for pos in positions:
        bal = balances[pos.account_id]
        assert abs(pos.market_value - bal.balance_amount) <= 0.01`}</CodeBlock>
        <Callout>一致性测试要写清三件事：比什么、和谁比、允许多少偏差。含糊的断言等于没测。</Callout>
      </section>

      <section id="ai-quality" data-knowledge-section className="mb-14">
        <SectionHeader number="08" title="AI 数据质量：模型可信的前提是数据可信" badge="GIGO" />
        <Card title="从数据到模型"><p>训练数据、线上特征、推理输入，任何一端被脏数据污染，模型表现都会失真。金融场景里，模型判断直接对应资金与风险，数据可信是不可妥协的前提。</p></Card>
        <Card title="三条底线"><BulletList items={["训练与推理使用同一套字段口径。", "线上特征必须能回溯到原始数据。", "分布漂移要有告警与重训机制。"]} /></Card>
        <CodeBlock title="特征漂移检查">{`-- 近 7 天交易金额分布
SELECT AVG(amount) AS avg_amount,
       STDDEV(amount) AS std_amount,
       COUNT(*) AS cnt
FROM asset_trade
WHERE trade_time >= NOW() - INTERVAL 7 DAY;
-- 与训练分布比较, 偏差超过阈值触发漂移告警`}</CodeBlock>
      </section>

      <section id="practice" data-knowledge-section className="mb-14">
        <SectionHeader number="09" title="练习与检查" badge="综合练习" />
        <Card title="练习：为金融资产数据建立质量基线"><BulletList ordered items={["挑选一张核心表（如 asset_position），列出全部字段与业务含义。", "为六个维度各写出一条可执行的校验规则。", "为准确性规则找到可信的上游对账来源。", "为每条规则定义阈值、频率与责任人。", "用异常样例验证规则会报警，用干净样例验证规则通过。", "模拟一次上游漏传，观察监控与对账如何发现。", "记录一次真实数据问题的根因定位过程，归类到四类根因之一。", "为一条数据管道补充输入样例与期望输出的测试。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><ChecklistCard title="规则可落地" items={["六维度各有一条规则", "阈值、频率、责任人明确", "规则有异常样例验证", "误报能及时收敛调整"]} /><ChecklistCard title="监控看得见" items={["看板含行数、金额、空值率", "对账失败能定位到层级", "告警有分级与接收人", "历史趋势可回溯"]} /><ChecklistCard title="质量有闭环" items={["问题有根因记录", "规则随真实问题补强", "口径变化有文档", "数据管道有回归测试"]} /></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">你已经能把数据质量当作工程问题来管理。下一步，把这些校验规则接入 CI，让质量检查成为数据发布的一部分。</p><Link href="/knowledge/tutorials?track=data-systems" className="inline-flex items-center gap-2 text-sm text-neon-cyan">回到数据系统模块 <ArrowRight className="h-4 w-4" /></Link></div>
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
