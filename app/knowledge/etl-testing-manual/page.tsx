import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

type TableRow = readonly string[];

export const metadata = buildPageMetadata({
  title: "ETL 数据测试体系：从数据流转到数据质量保障",
  description: "面向测试工程师的数据测试手册，覆盖ETL链路、字段映射、转换规则、增量同步、对账、数据质量与金融AI案例。",
  path: "/knowledge/etl-testing-manual",
  tags: ["ETL测试", "数据质量", "数据仓库", "SQL", "金融数据测试"],
});

const sections: SectionItem[] = [
  { id: "overview", label: "数据链路" },
  { id: "etl", label: "ETL三阶段" },
  { id: "mapping", label: "字段映射" },
  { id: "validation", label: "核心校验" },
  { id: "transform", label: "转换规则" },
  { id: "incremental", label: "增量与幂等" },
  { id: "join", label: "关联与聚合" },
  { id: "quality", label: "数据质量" },
  { id: "workflow", label: "测试流程" },
  { id: "finance", label: "金融AI案例" },
  { id: "automation", label: "自动化" },
  { id: "checklist", label: "报告与清单" },
];

const layerRows: TableRow[] = [
  ["业务系统", "订单、客户、贷款、合同等原始业务数据", "源数据是否完整、时间和状态是否可信"],
  ["ODS 原始层", "按源结构落地，尽量保留原貌", "抽取数量、批次、重复、缺失、原始快照"],
  ["DWD 明细层", "清洗、标准化、补充业务维度", "字段映射、类型转换、空值和异常处理"],
  ["DWS 汇总层", "按主题聚合形成可复用指标", "口径、时间窗口、去重、关联和聚合结果"],
  ["ADS 应用层", "为报表、BI、风控或AI提供数据", "最终指标与业务规则、页面、接口是否一致"],
];

const stageRows: TableRow[] = [
  ["Extract 抽取", "从数据库、文件、接口或消息获取数据", "是否漏抽、重抽、错批次；时间范围和水位线是否正确"],
  ["Transform 转换", "清洗、计算、关联、去重、标准化", "业务规则、边界、空值、异常值和精度是否正确"],
  ["Load 加载", "把结果写入目标表或数据集市", "数量、字段、主键、分区、重复加载和失败恢复"],
];

const mappingRows: TableRow[] = [
  ["loan_order.customer_id", "原值传递", "dwd_loan.cust_id", "非空；必须存在于客户维表"],
  ["loan_order.loan_amount", "分转元，保留2位小数", "dwd_loan.asset_amount", "DECIMAL；金额不可为负"],
  ["loan_order.overdue_days", "> 90 标记为不良", "dwd_loan.asset_status", "边界90与91分别验证"],
  ["loan_order.created_at", "转换为业务时区日期", "dwd_loan.biz_date", "跨日、夏令时和空值规则明确"],
];

const coreRows: TableRow[] = [
  ["数量一致性", "源数据经过合法过滤后与目标数量相符", "count(*)、按批次/分区分组对账"],
  ["字段映射", "源字段正确写入目标字段", "逐字段抽样、全量差异查询"],
  ["转换逻辑", "业务计算和分类正确", "等价类、边界值、异常值"],
  ["唯一性", "主键或业务键没有重复", "count(*) 与 count(distinct key)"],
  ["完整性", "必填字段和关联数据齐全", "NULL率、孤儿记录、缺失维度"],
  ["聚合准确性", "总额、数量、比率与明细一致", "sum、count、group by、反向下钻"],
];

const transformRows: TableRow[] = [
  ["正常值", "贷款金额 500000，逾期 30 天", "金额正确，资产状态为正常"],
  ["边界值", "逾期 90 天、91 天", "90 天不误判；91 天按规则进入不良"],
  ["空值", "逾期天数为 NULL", "按约定置默认值、进入异常表或拒绝处理"],
  ["非法值", "金额为负数、日期格式错误", "不能静默写入正常目标表"],
  ["精度", "金额换算、利率和比例计算", "小数位、舍入方式与财务口径一致"],
  ["编码", "中英文、特殊字符、身份证号前导零", "不乱码、不截断、不丢前导零"],
];

const incrementalRows: TableRow[] = [
  ["首次全量", "目标为空，执行完整批次", "所有合法历史数据只加载一次"],
  ["正常增量", "新增、更新、删除各准备一条", "只处理水位线后的变化"],
  ["重复跑批", "同一批次再次执行", "结果不重复，控制总额不变化"],
  ["中途失败重跑", "加载50%后模拟失败", "从断点恢复或安全重跑，不漏不重"],
  ["迟到数据", "昨天业务日期的数据今天才到", "按规则回补正确分区并更新汇总"],
  ["乱序更新", "旧版本晚于新版本到达", "不会用旧状态覆盖新状态"],
];

const qualityRows: TableRow[] = [
  ["完整性", "必填字段不缺失、数据批次齐全", "NULL率、应到/实到批次数"],
  ["唯一性", "业务主键不重复", "重复键数量"],
  ["准确性", "值符合真实业务事实", "金标样本正确率、对账差异"],
  ["一致性", "不同层、不同系统表达同一事实", "跨表、跨系统差异率"],
  ["及时性", "数据在SLA内可用", "延迟、跑批完成时间"],
  ["有效性", "格式、范围、枚举符合规则", "非法值率、异常表数量"],
];

const reportRows: TableRow[] = [
  ["批次信息", "任务名、批次号、业务日期、代码与规则版本"],
  ["对账结果", "源数量、过滤数量、目标数量、差异数量与控制总额"],
  ["质量结果", "完整性、唯一性、准确性、一致性、及时性指标"],
  ["异常明细", "业务键、源值、目标值、规则、错误类型与关联日志"],
  ["测试结论", "通过、不通过、有条件通过及风险说明"],
  ["可追溯证据", "SQL、数据快照、任务日志、血缘、截图和复测结果"],
];

export default function EtlTestingManualPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge" target="_blank" rel="noopener noreferrer" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回知识库
      </Link>

      <KnowledgeLayout sections={sections}>
        <header className="mb-10">
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">ETL 数据测试体系：从数据流转到数据质量保障</h1>
          <p className="mb-6 text-lg text-text-secondary">从源系统一路追到报表、BI与AI应用，证明每一次抽取、转换、加载和汇总都没有让业务事实走样。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>12 个章节</span><span>SQL + 数据仓库</span><span>金融 / BI / AI 数据链路</span></div>
        </header>

        <section id="overview" data-knowledge-section className="mb-14">
          <Header icon="🧭" title="为什么需要 ETL 测试" badge="页面正确，不代表数据可信" />
          <Card title="用户看到一行数据，背后可能经过五层加工"><p>业务数据通常要经过源数据库、抽取任务、清洗转换、数据仓库、接口与缓存，最后才出现在页面、报表或AI应用中。任何一层出错，都可能让最后的数字看起来合理、实际上却是错的。</p></Card>
          <Flow items={["业务系统", "ODS 原始数据层", "DWD 明细数据层", "DWS 汇总数据层", "ADS 应用数据层", "报表 / BI / AI应用"]} />
          <Table title="各层职责与测试重点" headers={["层级", "主要职责", "测试关注"]} rows={layerRows} />
          <Card title="ETL 测试的目标"><List items={["数据没有无故丢失、重复或被错误过滤。", "字段、类型、金额精度和业务状态转换正确。", "明细、汇总、接口与页面使用同一指标口径。", "跑批失败、重复执行和迟到数据都能被安全处理。", "异常可追溯到具体批次、规则、业务键和数据层。"]} /></Card>
        </section>

        <section id="etl" data-knowledge-section className="mb-14">
          <Header icon="🔄" title="ETL 三个阶段" badge="Extract / Transform / Load" />
          <Table title="每个阶段分别测什么" headers={["阶段", "作用", "测试重点"]} rows={stageRows} />
          <div className="grid gap-4 md:grid-cols-3"><Card title="抽取"><p>验证“该来的都来了，而且只来一次”。重点关注时间窗口、水位线、连接失败和断点恢复。</p></Card><Card title="转换"><p>验证“业务规则没有把数据加工错”。重点关注边界、空值、精度、关联和异常分流。</p></Card><Card title="加载"><p>验证“正确结果落到正确位置”。重点关注主键、分区、提交事务和重复跑批。</p></Card></div>
        </section>

        <section id="mapping" data-knowledge-section className="mb-14">
          <Header icon="🗺️" title="先建立字段 Mapping" badge="没有映射表，就没有可执行测试" />
          <Table title="字段映射表示例" headers={["源字段", "转换规则", "目标字段", "质量规则"]} rows={mappingRows} />
          <Card title="Mapping 表至少包含"><List items={["源系统、源表、源字段与数据类型。", "过滤条件、转换公式、字典映射和默认值。", "目标表、目标字段、主键、分区和精度。", "空值、异常值、重复值与无关联数据的处理方式。", "规则负责人、需求版本和生效日期。"]} /></Card>
        </section>

        <section id="validation" data-knowledge-section className="mb-14">
          <Header icon="🔍" title="ETL 六类核心校验" badge="数量只是第一步" />
          <Table title="核心验证矩阵" headers={["检查项", "验证目标", "常用方法"]} rows={coreRows} />
          <Code title="SQL / 对账基础">{`-- 按业务日期核对源数据量
select count(*)
from loan_info
where created_at >= '2026-08-09 00:00:00'
  and created_at <  '2026-08-10 00:00:00';

-- 核对目标批次数量、唯一键和金额控制总额
select
  count(*) as row_count,
  count(distinct loan_id) as unique_count,
  sum(asset_amount) as control_amount
from dwd_loan
where biz_date = '2026-08-09';`}</Code>
          <Card title="数量不一致时不要直接判Bug"><p>源表100000条、目标表99998条，只能证明存在2条差异。还要结合合法过滤、去重、异常分流和软删除规则，定位是抽取失败、转换过滤还是加载失败。</p></Card>
        </section>

        <section id="transform" data-knowledge-section className="mb-14">
          <Header icon="🧪" title="数据转换逻辑测试" badge="ETL 测试的核心" />
          <Table title="转换规则用例设计" headers={["类型", "测试数据", "预期"]} rows={transformRows} />
          <Card title="不良资产规则示例"><p className="mb-3">规则：逾期天数大于90天时，资产状态标记为 BAD。</p><Code title="SQL / 差异检查">{`select loan_id, overdue_days, asset_status
from dwd_loan
where (overdue_days > 90 and asset_status <> 'BAD')
   or (overdue_days <= 90 and asset_status = 'BAD');`}</Code></Card>
          <Card title="测试原则"><List items={["从业务规则反推输入，不只抽查生产数据。", "每个比较符号都测试边界两侧和边界本身。", "金额、利率和比例明确精度与舍入方式。", "异常数据必须有去向：拒绝、默认、隔离或告警，不能静默消失。"]} /></Card>
        </section>

        <section id="incremental" data-knowledge-section className="mb-14">
          <Header icon="♻️" title="增量同步、幂等与重跑" badge="生产事故高发区" />
          <Table title="增量任务必须覆盖的场景" headers={["场景", "执行方式", "核心断言"]} rows={incrementalRows} />
          <Card title="水位线测试"><List items={["起始时间是否包含边界，结束时间是否排除下一批次。", "时间字段使用创建时间、更新时间还是业务日期。", "时区转换、跨日、月末和节假日跑批是否正确。", "水位线推进必须与任务提交成功保持一致。"]} /></Card>
          <Card title="幂等的判断标准"><p>同一批次执行一次和执行多次，最终业务结果必须相同。不能只看任务返回成功，还要核对行数、唯一键、金额总额、版本号和下游汇总是否保持不变。</p></Card>
        </section>

        <section id="join" data-knowledge-section className="mb-14">
          <Header icon="🧩" title="关联、聚合与指标口径" badge="数字对上，还要口径对上" />
          <div className="grid gap-4 md:grid-cols-2"><Card title="关联测试"><List items={["inner join 是否错误丢弃无匹配数据。", "left join 是否因一对多关系放大数据量。", "维表缺失时使用默认值、异常表还是拒绝加载。", "历史维度是否按业务时间匹配正确版本。"]} /></Card><Card title="聚合测试"><List items={["sum、count、distinct、平均值的分母和去重口径。", "自然日、账务日、滚动窗口和累计值的时间范围。", "明细向上汇总与指标向下钻取结果一致。", "空集合、负数冲正和撤销记录处理正确。"]} /></Card></div>
          <Code title="SQL / 孤儿记录与关联放大">{`-- 目标事实表中找不到客户维度的记录
select f.loan_id, f.cust_id
from dwd_loan f
left join dim_customer d on f.cust_id = d.cust_id
where d.cust_id is null;

-- 检查关联后业务键是否被意外放大
select loan_id, count(*) as joined_rows
from dws_customer_loan
group by loan_id
having count(*) > 1;`}</Code>
        </section>

        <section id="quality" data-knowledge-section className="mb-14">
          <Header icon="📊" title="把ETL校验升级为数据质量体系" badge="从一次测试变成持续监控" />
          <Table title="六个数据质量维度" headers={["维度", "含义", "参考指标"]} rows={qualityRows} />
          <Card title="质量阈值要分层"><List items={["P0：资金、余额、贷款本金等控制总额必须零差异。", "P1：关键字段完整率、唯一率必须达到明确阈值。", "P2：非关键描述字段允许少量异常，但要进入趋势监控。", "任何阈值都要有业务负责人和处置动作，不能只展示红绿灯。"]} /></Card>
          <Card title="数据血缘"><p>当ADS报表数字错误时，必须能反查到DWS聚合、DWD明细、ODS原始记录和源系统。测试报告应记录表级、字段级血缘以及对应规则版本，避免只知道“数字错了”，不知道从哪一层开始查。</p></Card>
        </section>

        <section id="workflow" data-knowledge-section className="mb-14">
          <Header icon="🛠️" title="ETL 测试流程" badge="先理解链路，再写SQL" />
          <div className="grid gap-4 md:grid-cols-2"><Card title="1. 梳理链路"><List items={["确认数据源、加工层、目标表和最终消费方。", "画出数据流转图，标注任务依赖与事实来源。", "明确全量、增量、实时或批处理方式。"]} /></Card><Card title="2. 分析规则"><List items={["建立字段Mapping与指标口径表。", "确认过滤、去重、关联、聚合和异常处理。", "标记资金、权限、合规等高风险字段。"]} /></Card><Card title="3. 设计数据"><List items={["正常、边界、异常、重复、迟到和乱序数据。", "为每条数据分配可追踪业务键与批次号。", "记录期望落层和最终指标。"]} /></Card><Card title="4. 执行与复测"><List items={["任务前记录源数据快照和控制总额。", "任务后逐层核对数量、字段、规则和汇总。", "修复后使用同一批数据重跑并验证幂等。"]} /></Card></div>
        </section>

        <section id="finance" data-knowledge-section className="mb-14">
          <Header icon="🏦" title="金融AI交付案例：不良资产数据链" badge="OCR + ETL + 业务规则" />
          <Flow items={["银行贷款数据", "合同 / OCR识别", "结构化字段", "资产明细表", "风险聚合", "清收策略 / AI分析页面"]} />
          <Card title="贯穿验证"><List items={["OCR准确性：合同金额、客户、日期和编号与原件一致。", "结构化入库：类型、精度、必填字段和重复合同处理正确。", "风险规则：逾期天数、贷款余额和担保信息计算正确。", "控制总额：源贷款余额、DWD资产余额、报表总额零差异。", "页面与AI：展示指标来自正确版本的数据，AI引用的资产事实可追溯。"]} /></Card>
          <Card title="高风险场景"><List items={["OCR把500000识别为50000，格式合法但金额错误。", "同一合同重复上传，导致资产金额重复累计。", "迟到的还款数据没有回补，风险等级长期偏高。", "旧维度数据覆盖新客户状态，导致清收策略错误。", "AI分析使用过期ADS快照，却没有展示数据时间。"]} /></Card>
          <p className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-4 text-sm leading-7 text-text-secondary">这类测试本质上是 <strong className="text-text-primary">AI数据质量测试 + ETL测试 + 业务规则测试</strong>。模型输出是否可信，首先取决于进入模型的数据是否可信。</p>
        </section>

        <section id="automation" data-knowledge-section className="mb-14">
          <Header icon="🤖" title="ETL 测试自动化" badge="规则配置化，差异可追踪" />
          <Code title="建议目录结构">{`etl-tests/
  mappings/        # 字段映射与规则配置
  queries/         # 源、目标、差异SQL
  fixtures/        # 正常、边界、异常测试数据
  checks/          # 数量、唯一性、完整性、控制总额
  runners/         # 批次执行与任务状态轮询
  reports/         # 差异明细和质量报告`}</Code>
          <Card title="适合自动化的检查"><List items={["按批次核对源、过滤、目标数量。", "唯一键、必填字段、枚举和数值范围。", "金额、数量和余额控制总额。", "Mapping规则和差异SQL回归。", "重复跑批、断点重跑和迟到数据回补。", "质量阈值越界时阻断或告警。"]} /></Card>
          <Card title="自动化边界"><p>脚本擅长发现差异，不擅长决定差异是否符合业务。指标口径变化、监管规则和异常数据处置仍需要产品、数据开发与测试共同确认。</p></Card>
        </section>

        <section id="checklist" data-knowledge-section className="mb-14">
          <Header icon="✅" title="报告模板与检查清单" badge="让每次跑批都有证据" />
          <Table title="ETL 测试报告" headers={["项目", "记录内容"]} rows={reportRows} />
          <div className="grid gap-4 md:grid-cols-3"><Card title="测试前"><List items={["数据链路与事实来源明确", "Mapping和口径已评审", "批次、水位线与SLA明确", "测试数据可追踪"]} /></Card><Card title="测试中"><List items={["逐层记录数量和控制总额", "转换边界与异常分流已验证", "增量、重跑、迟到数据已覆盖", "差异保留业务键和日志"]} /></Card><Card title="测试后"><List items={["目标与消费端结果一致", "质量阈值全部达标", "失败数据可重放和复测", "高风险规则进入持续监控"]} /></Card></div>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function Header({ icon, title, badge }: { icon: string; title: string; badge: string }) {
  return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 text-lg">{icon}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>;
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>;
}

function List({ items }: { items: readonly string[] }) {
  return <ul className="mt-3 list-disc space-y-2 pl-5">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Table({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly TableRow[] }) {
  return <Card title={title}><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-space-border/50 last:border-b-0">{row.map((cell) => <td key={cell} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>;
}

function Code({ title, children }: { title: string; children: string }) {
  return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>;
}

function Flow({ items }: { items: readonly string[] }) {
  return <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-space-border bg-space-card/30 p-4">{items.map((item, index) => <div key={item} className="contents"><span className="rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 px-3 py-2 text-xs font-medium text-text-primary">{item}</span>{index < items.length - 1 && <span className="text-neon-cyan">→</span>}</div>)}</div>;
}
