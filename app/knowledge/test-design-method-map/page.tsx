import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  GitBranch,
  Lightbulb,
  Network,
  Route,
  ShieldCheck,
} from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "测试设计方法地图",
  description: "从业务问题出发，学习选择因果图、Pairwise、分类树、错误推测、探索性测试、属性测试和模型驱动测试。",
  path: "/knowledge/test-design-method-map",
  tags: ["测试设计", "因果图", "Pairwise", "分类树", "探索性测试", "属性测试", "模型驱动测试"],
});

const sections: SectionItem[] = [
  { id: "map", label: "先看地图" },
  { id: "choose", label: "选择方法" },
  { id: "causal", label: "因果图" },
  { id: "pairwise", label: "Pairwise" },
  { id: "tree", label: "分类树" },
  { id: "guessing", label: "错误推测" },
  { id: "exploratory", label: "探索性测试" },
  { id: "property", label: "属性与模型" },
  { id: "combine", label: "组合使用" },
  { id: "practice", label: "练习与检查" },
];

const methodChoiceRows: string[][] = [
  ["输入可以分组", "哪些值会触发相同处理？", "等价类", "商品数量、手机号格式"],
  ["规则有明确分界", "临界值前后是否变化？", "边界值", "购买上限、优惠门槛"],
  ["多个条件共同决定结果", "条件之间是否有依赖或互斥？", "因果图 → 判定表", "会员、金额和优惠券资格"],
  ["参数组合数量过多", "能否用较少组合覆盖参数交互？", "Pairwise / N-wise", "设备、支付方式、会员等级"],
  ["输入维度需要逐层拆分", "每个维度有哪些有效类别？", "分类树", "积分抵扣规则"],
  ["系统有历史缺陷或高风险经验", "哪里最可能再次出错？", "错误推测", "重复下单、金额精度"],
  ["需求不完整或需要边做边学", "执行中还能发现什么？", "探索性测试", "营销活动联调"],
  ["规则应对大量输入始终成立", "有哪些永远不能被破坏的约束？", "属性测试 / 模型驱动", "金额守恒、订单状态"],
];

const causalRows: string[][] = [
  ["C1", "用户是会员", "决定是否具备会员券资格"],
  ["C2", "订单金额 ≥ 100 元", "决定是否达到使用门槛"],
  ["C3", "优惠券有效", "决定优惠券当前是否可用"],
  ["E1", "优惠券抵扣 20 元", "C1 且 C2 且 C3 同时成立"],
  ["E2", "提示不可用并保持原价", "三个原因中至少一个不成立"],
];

const pairwiseRows: string[][] = [
  ["1", "PC", "微信", "普通会员", "不使用"],
  ["2", "PC", "支付宝", "银卡会员", "有效券"],
  ["3", "Android", "微信", "银卡会员", "不使用"],
  ["4", "Android", "支付宝", "普通会员", "过期券"],
  ["5", "iOS", "微信", "普通会员", "有效券"],
  ["6", "iOS", "支付宝", "银卡会员", "过期券"],
];

const classificationRows: string[][] = [
  ["会员身份", "普通会员、银卡会员", "每类至少选择一种身份"],
  ["积分余额", "0、1～999、≥1000", "覆盖不可用、部分抵扣和充足积分"],
  ["订单金额", "<100、100～499.99、≥500", "覆盖门槛和抵扣上限变化"],
  ["积分状态", "有效、冻结、过期", "覆盖可以使用和不能使用"],
  ["支付结果", "成功、失败、超时", "覆盖扣减、释放和结果未知"],
];

const defectRows: string[][] = [
  ["重复动作", "快速双击提交、超时后重试", "只生成一笔订单，只扣一次积分"],
  ["金额精度", "99.99 元、0.01 元抵扣、多优惠叠加", "分摊金额和实付金额不出现负数或尾差"],
  ["状态不同步", "支付成功但回调延迟", "订单与积分最终一致，可安全补偿"],
  ["并发变化", "提交前库存或积分被其他请求占用", "重新校验并给出明确结果"],
  ["权限绕过", "替换订单 ID 或用户 ID", "不能查看或操作他人的订单和积分"],
];

const propertyRows: string[][] = [
  ["金额守恒", "商品金额 - 优惠 - 积分抵扣 + 运费 = 应付金额", "随机生成金额、优惠和积分组合后仍成立"],
  ["不可为负", "优惠、积分和退款不能让应付金额小于 0", "大量极端组合下应付金额始终 ≥ 0"],
  ["幂等", "同一个业务请求重复执行，结果与执行一次相同", "重复提交不会增加订单数或重复扣积分"],
  ["状态合法", "订单只能沿允许的方向迁移", "已取消订单不能再支付，已完成订单不能回到待支付"],
  ["归属不变", "订单和积分只能被所属用户访问", "任意替换资源 ID 都不能越权"],
];

export default function TestDesignMethodMapPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/test-case-design" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回测试用例设计实战教程
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索测试设计方法...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Business Testing / Tutorial 03</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">测试设计方法地图</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">遇到不同的业务问题，选择合适的方法，把有限的测试时间用在真正有风险的地方。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>8 类设计方法</span><span>商城下单 + 会员积分实战</span></div>
        </header>

        <section id="map" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="先根据问题找方法" badge="不要从术语出发" />
          <Card title="你已经会写用例，现在要学会选方法">
            <p>在商城下单中，商品数量有边界，优惠券涉及条件组合，设备与支付方式会产生大量配置，订单又会不断改变状态。它们不是同一种问题，也不应该套用同一种方法。</p>
          </Card>
          <MethodMapFigure />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="先识别问题"><p>确认你面对的是输入、边界、组合、状态、历史缺陷，还是尚未完全看清的风险。</p></Card>
            <Card title="再选择方法"><p>选择最能暴露这类问题的方法，不需要为了“方法齐全”把每一种都用一遍。</p></Card>
            <Card title="最后检查覆盖"><p>确认关键规则、数据、组合和异常都能映射到可执行用例。</p></Card>
          </div>
          <Callout>方法不是用例模板。它帮助你思考“哪里可能出错”，最终仍要把结果写成明确的条件、操作和预期。</Callout>
        </section>

        <section id="choose" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="用四个问题完成第一次选择" badge="先判断问题类型" />
          <QuestionRouterFigure />
          <TableCard title="从商城问题找到合适的方法" headers={["你看到的问题", "先问什么", "优先方法", "下单示例"]} rows={methodChoiceRows} />
          <Card title="一次需求可以同时使用多种方法">
            <p>例如会员积分抵扣既有积分数量边界，也有会员等级、订单金额和积分状态的组合，还涉及支付失败后的积分退回。你可以先用分类树整理输入，再用边界值选择数据，最后用状态模型检查扣减与退回。</p>
          </Card>
          <Callout>如果一个方法无法回答当前风险，就换一种或组合使用。判断标准始终是：它是否帮助你发现遗漏并生成可验证的用例。</Callout>
        </section>

        <section id="causal" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="用因果图理清条件之间的关系" badge="适合复杂业务规则" />
          <Card title="会员券不是三个独立开关">
            <p>商城规定：只有会员、订单金额达到 100 元并且优惠券有效时，才能抵扣 20 元。三个原因共同决定一个结果，任何一个条件不满足，都不能优惠。</p>
          </Card>
          <CausalGraphFigure />
          <TableCard title="先写原因和结果，再转换为判定表" headers={["编号", "原因或结果", "业务含义"]} rows={causalRows} />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="因果图负责理清逻辑"><BulletList items={["与：多个条件必须同时成立。", "或：满足任意条件即可触发。", "非：某个条件不成立时触发。", "互斥：两个条件不能同时出现。", "依赖：一个条件成立前必须先满足另一个条件。"]} /></Card>
            <Card title="判定表负责落到用例"><BulletList items={["把原因放在条件行。", "把结果放在动作行。", "每一种有效组合形成一列规则。", "合并结果相同且风险一致的组合。", "为每列规则生成可执行用例。"]} /></Card>
          </div>
          <Callout>条件超过三四个时，不要直接穷举。先用因果关系排除不可能组合，再决定哪些组合必须进入判定表。</Callout>
        </section>

        <section id="pairwise" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="用 Pairwise 缩减参数组合" badge="组合多时先覆盖两两交互" />
          <p className="mb-5 text-sm leading-7 text-text-secondary">设备、支付方式、会员等级和优惠券状态全部组合会迅速膨胀。Pairwise 选择较少的用例，让任意两个参数值至少共同出现一次。</p>
          <PairwiseFigure />
          <TableCard title="一组示意性的两两组合" headers={["用例", "设备", "支付方式", "会员", "优惠券"]} rows={pairwiseRows} />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="适合使用"><BulletList items={["浏览器、设备和系统版本兼容。", "支付渠道、会员等级和营销配置。", "权限角色、资源类型和操作动作。", "参数之间主要是低阶交互。"]} /></Card>
            <Card title="不能只靠 Pairwise"><BulletList items={["资金、库存等核心组合要单独保留。", "三个条件共同触发的规则需要 3-wise 或判定表。", "业务禁止的组合要先加约束。", "边界、异常和状态问题仍需其他方法。"]} /></Card>
          </div>
          <Callout>Pairwise 的目标是减少重复，不是证明所有组合都安全。高风险组合即使已经被两两覆盖，也应该保留独立用例。</Callout>
        </section>

        <section id="tree" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="用分类树整理多维输入" badge="先分维度，再选组合" />
          <Card title="把会员积分抵扣拆成五个维度">
            <p>面对一长串规则时，可以把测试对象放在树根，把身份、积分、金额、积分状态和支付结果作为分类，再为每个分类列出互不重复的类别。</p>
          </Card>
          <ClassificationTreeFigure />
          <TableCard title="会员积分抵扣分类表" headers={["分类", "类别", "选择原则"]} rows={classificationRows} />
          <Card title="从树上组合一条用例">
            <p>当银卡会员拥有 1000 积分、订单金额为 500 元、积分有效且支付成功时，系统按抵扣上限扣减积分，订单金额和剩余积分正确。</p>
          </Card>
          <Callout>分类树帮你看见输入空间，但不要求每个叶子都与其他叶子全组合。优先组合存在业务关系、高风险或容易被忽略的类别。</Callout>
        </section>

        <section id="guessing" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="用错误推测补上经验中的风险" badge="从历史缺陷出发" />
          <DefectRadarFigure />
          <TableCard title="下单系统中值得主动猜测的错误" headers={["风险模式", "主动尝试", "重点检查"]} rows={defectRows} />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="经验从哪里来"><BulletList items={["同一模块的历史缺陷。", "线上故障和用户投诉。", "相似系统的常见问题。", "代码变更、架构边界和第三方依赖。", "开发与测试复盘中的薄弱环节。"]} /></Card>
            <Card title="怎样避免只靠感觉"><BulletList items={["为每个猜测写出风险来源。", "说明失败后会影响谁和哪些数据。", "转换成可以重复执行的用例。", "记录命中率并更新风险清单。", "不让经验替代基础规则覆盖。"]} /></Card>
          </div>
          <Callout>错误推测不是随便试。你要能说清楚：为什么怀疑这里、怎样触发、出现问题后用什么证据确认。</Callout>
        </section>

        <section id="exploratory" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="用探索性测试边执行边学习" badge="有目标地探索" />
          <Card title="营销活动联调时，需求不会告诉你所有风险">
            <p>当优惠券、积分、库存和支付服务首次组合上线时，可以围绕一个明确目标进行 45 分钟探索：尝试让订单金额、优惠状态和支付结果发生变化，观察系统是否保持一致。</p>
          </Card>
          <ExploratorySessionFigure />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="探索任务"><p>验证支付结果不确定时，订单、库存、优惠券和积分能否最终一致。</p></Card>
            <Card title="重点变化"><p>支付中断、重复回调、页面刷新、切换网络和再次提交。</p></Card>
            <Card title="带走证据"><p>时间线、订单号、请求日志、状态快照、发现的问题和后续用例。</p></Card>
          </div>
          <Card title="一份探索记录至少回答"><BulletList items={["本次探索目标和范围是什么。", "实际尝试了哪些操作和数据。", "发现了什么缺陷、疑问或新风险。", "哪些区域没有覆盖，为什么。", "哪些发现需要沉淀为回归用例。"]} /></Card>
          <Callout>探索性测试不是没有用例地随便点。它把学习、设计和执行放在同一个时间盒里，并用清晰的任务和证据控制范围。</Callout>
        </section>

        <section id="property" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="用属性和模型验证更大的输入空间" badge="检查始终成立的规则" />
          <p className="mb-5 text-sm leading-7 text-text-secondary">示例用例只能覆盖少量数据。面对金额计算和订单状态，可以先定义始终不能被破坏的规则，再由程序生成大量数据或操作序列进行验证。</p>
          <PropertyModelFigure />
          <TableCard title="商城下单中可以验证的属性" headers={["属性", "必须始终成立", "验证方式"]} rows={propertyRows} />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="属性测试"><p>适合金额公式、排序、转换、幂等和数据约束。重点不是某个固定输入的答案，而是大量合法输入都应满足同一条规则。</p></Card>
            <Card title="模型驱动测试"><p>适合订单、支付、退款等状态系统。先定义允许的状态和动作，再生成不同操作序列，检查系统是否偏离模型。</p></Card>
          </div>
          <Callout>属性和模型必须来自明确的业务约束。规则本身写错时，自动生成再多数据也只会更快地验证错误结论。</Callout>
        </section>

        <section id="combine" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="按风险组合方法，而不是选唯一答案" badge="一项需求多种视角" />
          <MethodRecipeFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="会员积分抵扣的组合方案"><BulletList ordered items={["用分类树整理会员、积分、金额、状态和支付结果。", "用等价类和边界值选择积分余额、订单金额与抵扣上限。", "用因果图和判定表覆盖资格、门槛与状态组合。", "用状态模型检查冻结、扣减、释放和退回。", "用错误推测补充重复请求、精度和并发风险。", "联调阶段用探索性测试发现未知问题。"]} /></Card>
            <Card title="停止增加用例前检查"><BulletList items={["每条业务规则都有对应验证。", "核心边界和高风险组合已经覆盖。", "失败后的数据变化和恢复已经覆盖。", "历史高频缺陷有回归用例。", "低风险重复组合已合理缩减。", "剩余风险已明确记录。"]} /></Card>
          </div>
          <Card title="方法选择没有固定顺序"><p>规则清晰时，可以先从分类树和判定表开始；线上问题较多时，可以先从历史缺陷和探索性测试开始。顺序可以变化，但最终要回到需求、风险、用例和证据之间的对应关系。</p></Card>
        </section>

        <section id="practice" data-knowledge-section className="mb-14">
          <SectionHeader number="10" title="完成一份可评审的方法地图" badge="把选择理由交付出来" />
          <Card title="练习：为会员积分抵扣设计测试">
            <BulletList ordered items={["整理会员身份、积分余额、订单金额、积分状态和支付结果五个输入维度。", "画出积分资格、抵扣门槛和支付结果之间的因果关系。", "为设备、支付方式和会员等级生成一组 Pairwise 组合。", "从历史缺陷中补充不少于 5 个错误推测用例。", "写一份 45 分钟探索任务，说明目标、变化方式和证据。", "定义金额守恒、幂等和状态合法三条属性。", "按“当……时，……”格式产出不少于 15 条用例。", "为每条用例标注方法来源、优先级和对应测试点。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <ChecklistCard title="问题已看清" items={["输入维度已拆分", "条件关系已说明", "状态变化已画出", "未知风险已记录"]} />
            <ChecklistCard title="方法有依据" items={["每种方法对应问题", "高风险组合单独保留", "约束与排除项明确", "没有为了数量套方法"]} />
            <ChecklistCard title="结果可评审" items={["用例可以直接执行", "测试点与用例对应", "优先级理由明确", "剩余风险已说明"]} />
          </div>
          <Card title="你最终应该交付">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric label="问题地图" value="问题类型 → 方法" />
              <Metric label="业务模型" value="分类 · 因果 · 状态" />
              <Metric label="测试用例" value="方法来源可追溯" />
              <Metric label="评审结论" value="覆盖与剩余风险" />
            </div>
          </Card>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6">
            <p className="text-sm text-text-secondary">掌握测试设计方法后，继续学习需求评审与测试方案，把风险识别转化为一次完整交付计划。</p>
            <Link href="/knowledge/requirements-test-planning" className="inline-flex items-center gap-2 text-sm text-neon-cyan">
              继续学习需求评审与测试方案 <ArrowRight className="h-4 w-4" />
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
  return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-b border-space-border/50 last:border-b-0">{row.map((cell, index) => <td key={`${cell}-${index}`} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="block text-xs text-text-secondary">{label}</span><strong className="mt-2 block text-sm text-text-primary">{value}</strong></div>;
}

function MethodMapFigure() {
  const groups = [
    ["输入与边界", "等价类 · 边界值", "值该怎么选"],
    ["规则与组合", "因果图 · Pairwise · 分类树", "条件如何搭配"],
    ["经验与未知", "错误推测 · 探索性测试", "还可能漏什么"],
    ["不变规则", "属性测试 · 模型驱动", "什么始终不能错"],
  ];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="method-map-title"><figcaption id="method-map-title" className="mb-5 text-sm font-bold text-text-primary">从业务问题进入测试设计方法地图</figcaption><div className="grid gap-3 md:grid-cols-2">{groups.map((group, index) => <div key={group[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><h4 className="my-2 font-bold text-text-primary">{group[0]}</h4><p className="text-xs text-text-secondary">{group[2]}</p><p className="mt-3 border-t border-space-border pt-3 text-xs font-medium text-text-primary">{group[1]}</p></div>)}</div></figure>;
}

function QuestionRouterFigure() {
  const questions = [["输入有范围？", "等价类 / 边界值"], ["条件会组合？", "因果图 / Pairwise"], ["输入维度很多？", "分类树"], ["风险仍不清楚？", "错误推测 / 探索"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="question-router-title"><figcaption id="question-router-title" className="mb-5 text-sm font-bold text-text-primary">四个问题把你带到合适的方法</figcaption><div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">{questions.map((question, index) => <div key={question[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><span className="block text-xs text-text-secondary">{question[0]}</span><strong className="mt-2 block text-sm text-text-primary">{question[1]}</strong></div>{index < questions.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>;
}

function CausalGraphFigure() {
  const causes = ["会员", "金额 ≥ 100", "优惠券有效"];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="causal-title"><figcaption id="causal-title" className="mb-5 text-sm font-bold text-text-primary">三个原因同时成立，才产生优惠结果</figcaption><div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center"><div className="grid gap-2 sm:grid-cols-3 md:grid-cols-1">{causes.map((cause) => <div key={cause} className="rounded-lg border border-space-border bg-space-card/50 p-3 text-center text-sm font-medium text-text-primary">{cause}</div>)}</div><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-neon-cyan/60 bg-neon-cyan/10 text-xs font-bold text-neon-cyan">AND</div><div className="rounded-lg border border-neon-cyan/60 bg-neon-cyan/10 p-5 text-center"><ShieldCheck className="mx-auto mb-3 h-5 w-5 text-neon-cyan" /><strong className="text-sm text-text-primary">抵扣 20 元</strong></div></div></figure>;
}

function PairwiseFigure() {
  const pairs = [["设备", "支付"], ["设备", "会员"], ["设备", "优惠券"], ["支付", "会员"], ["支付", "优惠券"], ["会员", "优惠券"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="pairwise-title"><figcaption id="pairwise-title" className="mb-5 text-sm font-bold text-text-primary">四个参数产生六种参数对，每一对中的取值都要相遇</figcaption><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{pairs.map((pair, index) => <div key={pair.join("-")} className="flex items-center justify-between rounded-lg border border-space-border bg-space-card/50 p-4"><span className="text-xs text-text-primary">{pair[0]}</span><Network className="h-4 w-4 text-neon-cyan" /><span className="text-xs text-text-primary">{pair[1]}</span><span className="font-mono text-[9px] text-text-secondary">0{index + 1}</span></div>)}</div></figure>;
}

function ClassificationTreeFigure() {
  const branches = [["会员", "普通 / 银卡"], ["积分", "0 / 部分 / 充足"], ["金额", "门槛前 / 门槛后"], ["状态", "有效 / 冻结 / 过期"], ["支付", "成功 / 失败 / 超时"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="classification-tree-title"><figcaption id="classification-tree-title" className="mb-5 text-sm font-bold text-text-primary">从“积分抵扣”向下拆出分类和类别</figcaption><div className="rounded-lg border border-neon-cyan/60 bg-neon-cyan/10 p-4 text-center text-sm font-bold text-text-primary">会员积分抵扣</div><div className="mx-auto h-5 w-px bg-space-border" /><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{branches.map((branch) => <div key={branch[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><GitBranch className="mx-auto mb-2 h-4 w-4 text-neon-cyan" /><strong className="block text-sm text-text-primary">{branch[0]}</strong><span className="mt-2 block text-xs leading-5 text-text-secondary">{branch[1]}</span></div>)}</div></figure>;
}

function DefectRadarFigure() {
  const risks = ["重复", "精度", "并发", "状态", "权限"];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="defect-radar-title"><figcaption id="defect-radar-title" className="mb-5 text-sm font-bold text-text-primary">把历史问题变成下一轮测试的风险雷达</figcaption><div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5 md:grid-cols-1">{risks.map((risk) => <div key={risk} className="rounded-lg border border-space-border bg-space-card/50 p-3 text-center text-xs text-text-primary">{risk}</div>)}</div><ArrowRight className="mx-auto hidden h-5 w-5 text-neon-cyan md:block" /><div className="rounded-xl border border-neon-cyan/50 bg-neon-cyan/5 p-6 text-center"><Lightbulb className="mx-auto mb-3 h-6 w-6 text-neon-cyan" /><strong className="text-sm text-text-primary">形成可重复执行的风险用例</strong><p className="mt-2 text-xs leading-5 text-text-secondary">记录来源、触发方式和验证证据</p></div></div></figure>;
}

function ExploratorySessionFigure() {
  const steps = [["任务", "支付异常时保持一致"], ["时间盒", "45 分钟"], ["探索", "变化数据与操作"], ["记录", "证据与新风险"], ["沉淀", "缺陷与回归用例"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="exploratory-title"><figcaption id="exploratory-title" className="mb-5 text-sm font-bold text-text-primary">一次探索会在学习、执行和记录之间循环</figcaption><div className="grid gap-2 md:grid-cols-5">{steps.map((step, index) => <div key={step[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><Compass className="mb-3 h-4 w-4 text-neon-cyan" /><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><strong className="my-2 block text-sm text-text-primary">{step[0]}</strong><p className="text-xs leading-5 text-text-secondary">{step[1]}</p></div>)}</div></figure>;
}

function PropertyModelFigure() {
  const states = ["待支付", "已支付", "已完成"];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="property-model-title"><figcaption id="property-model-title" className="mb-5 text-sm font-bold text-text-primary">属性检查数据规则，模型检查操作路径</figcaption><div className="grid gap-4 md:grid-cols-2"><div className="rounded-lg border border-space-border bg-space-card/50 p-5"><span className="text-[10px] text-neon-cyan">PROPERTY</span><h4 className="my-3 font-bold text-text-primary">金额始终守恒</h4><p className="font-mono text-xs leading-6 text-text-secondary">商品金额 - 优惠 - 积分 + 运费 = 应付金额</p></div><div className="rounded-lg border border-space-border bg-space-card/50 p-5"><span className="text-[10px] text-neon-cyan">MODEL</span><div className="mt-3 flex flex-wrap items-center gap-2">{states.map((state, index) => <div key={state} className="contents"><span className="rounded-md border border-neon-cyan/40 bg-neon-cyan/5 px-3 py-2 text-xs font-medium text-text-primary">{state}</span>{index < states.length - 1 && <ArrowRight className="h-3 w-3 text-neon-cyan" />}</div>)}</div><p className="mt-3 text-xs text-text-secondary">取消分支只能从待支付进入</p></div></div></figure>;
}

function MethodRecipeFigure() {
  const steps = [["看问题", "输入 · 组合 · 状态"], ["选方法", "分类 · 因果 · 探索"], ["产用例", "条件 · 动作 · 预期"], ["查覆盖", "规则 · 风险 · 证据"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="method-recipe-title"><figcaption id="method-recipe-title" className="mb-5 text-sm font-bold text-text-primary">一条可重复使用的测试设计路径</figcaption><div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">{steps.map((step, index) => <div key={step[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4"><Route className="mb-3 h-4 w-4 text-neon-cyan" /><strong className="block text-sm text-text-primary">{step[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{step[1]}</span></div>{index < steps.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>;
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>;
}
