import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleDot, FileCheck2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "测试用例设计实战教程",
  description: "围绕商城下单业务，学习提取测试点，使用等价类、边界值、判定表、状态迁移和场景法设计可执行测试用例。",
  path: "/knowledge/test-case-design",
  tags: ["测试用例", "等价类", "边界值", "判定表", "状态迁移", "测试设计"],
});

const sections: SectionItem[] = [
  { id: "start", label: "开始设计" },
  { id: "points", label: "提取测试点" },
  { id: "equivalence", label: "等价类" },
  { id: "boundary", label: "边界值" },
  { id: "decision", label: "判定表" },
  { id: "state", label: "状态迁移" },
  { id: "scenario", label: "场景与异常" },
  { id: "writing", label: "写成用例" },
  { id: "review", label: "优先级与覆盖" },
  { id: "practice", label: "练习与检查" },
];

const requirementRows: string[][] = [
  ["商品数量", "每次下单 1～5 件", "0、1、5、6 件时系统如何处理？"],
  ["库存", "库存不少于购买数量才可下单", "校验时库存变化怎么办？"],
  ["优惠券", "订单满 100 元减 20 元", "正好 100 元是否可以使用？"],
  ["收货地址", "姓名、手机号和详细地址必填", "格式错误后已填内容是否保留？"],
  ["重复提交", "同一次确认只能创建一笔订单", "连续点击和请求重试是否幂等？"],
];

const equivalenceRows: string[][] = [
  ["有效类", "1～5 件", "1、3、5", "选择 3 件作为普通有效数据"],
  ["无效类", "小于 1 件", "0、-1", "选择 0 验证最常见非法输入"],
  ["无效类", "大于 5 件", "6、20", "选择 6 验证刚刚超限"],
  ["无效类", "非整数", "1.5、文本、空值", "分别验证类型和必填校验"],
];

const boundaryRows: string[][] = [
  ["最小值附近", "0、1、2", "0 被拒绝；1、2 可以进入库存校验"],
  ["最大值附近", "4、5、6", "4、5 可以购买；6 被拒绝"],
  ["优惠门槛附近", "99.99、100.00、100.01", "门槛前不可用，达到门槛后可用"],
  ["库存临界点", "购买数 = 库存 - 1、库存、库存 + 1", "足量成功，超量失败且不扣库存"],
];

const decisionRows: string[][] = [
  ["库存足够", "是", "是", "否", "否"],
  ["地址有效", "是", "否", "是", "否"],
  ["创建订单", "是", "否", "否", "否"],
  ["提示地址错误", "否", "是", "否", "是"],
  ["提示库存不足", "否", "否", "是", "是"],
];

const finalCaseRows: string[][] = [
  ["P0", "当库存等于购买数量且地址有效时，订单创建成功", "库存 3；购买 3 件；地址有效", "只创建一笔订单，库存变为 0，金额正确"],
  ["P0", "当库存少于购买数量时，提交订单失败", "库存 2；购买 3 件", "提示库存不足，不创建订单、不扣库存"],
  ["P0", "当连续点击两次提交时，仅创建一笔订单", "库存充足；地址有效", "两个请求对应同一业务结果，只扣减一次库存"],
  ["P1", "当订单金额正好为 100 元时，满减券生效", "100 元订单；满 100 减 20 券", "实付 80 元，优惠明细正确"],
  ["P1", "当订单金额为 99.99 元时，满减券不可用", "99.99 元订单；满 100 减 20 券", "提示未达到门槛，实付金额不变"],
  ["P1", "当手机号少于 11 位时，订单无法提交", "手机号 10 位", "定位手机号错误，其他地址内容保留"],
  ["P1", "当创建订单接口超时后重试时，不会生成重复订单", "首次请求结果未知", "查询或重试后仍只有一笔订单"],
  ["P1", "当优惠券已过期时，订单按原价创建", "库存和地址有效；券已过期", "明确提示不可用，金额按原价计算"],
  ["P2", "当备注为空时，订单可以正常创建", "未填写备注", "订单成功，备注保存为空"],
  ["P2", "当备注达到最大长度时，内容完整保存", "备注达到允许上限", "不截断、不溢出，订单成功"],
];

export default function TestCaseDesignPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=business-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回业务与用例设计模块
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索用例设计方法...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Business Testing / Tutorial 02</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">测试用例设计实战教程</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">不要从“我要写多少条用例”开始，而要先回答“这个业务可能在哪里出错”。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>5 种设计方法</span><span>10 条完整下单用例</span></div>
        </header>

        <section id="start" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="先看懂这次要测试的下单规则" badge="需求不是用例" />
          <Card title="你要测试的业务">
            <p>用户购买 1～5 件商品，填写收货地址，可以使用“满 100 元减 20 元”优惠券，然后提交订单。系统只有在库存足够、地址有效时才能创建订单，同一次提交不能产生重复订单。</p>
          </Card>
          <RequirementFlowFigure />
          <TableCard title="把一句需求拆成可以追问的规则" headers={["对象", "已知规则", "还要问清楚"]} rows={requirementRows} />
          <Callout>需求里写出的通常只是正常路径。真正影响用例质量的，往往是没有写清楚的边界、组合、异常和状态变化。</Callout>
        </section>

        <section id="points" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="从业务流程中提取测试点" badge="先覆盖风险" />
          <p className="mb-5 text-sm leading-7 text-text-secondary">先沿着用户操作向后追踪：页面收到了什么输入，系统执行了哪些规则，哪些数据发生了变化，失败后又要恢复什么。</p>
          <TestPointMapFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="从输入找测试点"><BulletList items={["商品数量是否合法。", "地址必填项和格式是否正确。", "优惠券状态和使用门槛是否满足。", "重复点击是否被识别为同一次提交。"]} /></Card>
            <Card title="从结果找测试点"><BulletList items={["页面提示和订单金额是否正确。", "订单是否只创建一次。", "库存是否按购买数量扣减。", "失败时订单、库存和优惠券是否保持原状。"]} /></Card>
          </div>
          <Callout>测试点说明“要验证什么”，测试用例说明“在什么条件下、怎么操作、应该看到什么”。先列测试点，再写用例，覆盖会更稳定。</Callout>
        </section>

        <section id="equivalence" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="用等价类减少重复测试" badge="同类选代表" />
          <Card title="什么时候使用等价类">
            <p>当一组输入会触发相同的处理规则时，不需要把每个值都测一遍。可以把它们分成有效类和无效类，再从每一类选择有代表性的数据。</p>
          </Card>
          <EquivalenceFigure />
          <TableCard title="为商品数量划分等价类" headers={["类别", "范围", "候选数据", "选择方式"]} rows={equivalenceRows} />
          <Callout>等价类不是随便挑一个正常值和一个异常值。先确认系统的处理规则是否相同；处理规则不同，就应该拆成不同类别。</Callout>
        </section>

        <section id="boundary" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="用边界值盯住最容易出错的位置" badge="边界前后都要测" />
          <p className="mb-5 text-sm leading-7 text-text-secondary">程序常在“大于还是大于等于”“从 0 还是从 1 开始”这些位置出错。找到规则的分界线，再检查边界值本身和它前后的值。</p>
          <BoundaryFigure />
          <TableCard title="下单业务中的边界数据" headers={["边界", "测试数据", "预期判断"]} rows={boundaryRows} />
          <Callout>如果只能保留少量用例，优先保留边界值，而不是在同一个有效区间里重复选择多个普通值。</Callout>
        </section>

        <section id="decision" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="用判定表覆盖规则组合" badge="条件组合不遗漏" />
          <Card title="库存和地址会共同决定下单结果">
            <p>只看单个条件，很容易漏掉“库存不足并且地址也错误”这样的组合。判定表把条件写在上半部分，把每种组合对应的动作写在下半部分。</p>
          </Card>
          <DecisionTableFigure />
          <TableCard title="库存与地址判定表" headers={["条件或动作", "规则 1", "规则 2", "规则 3", "规则 4"]} rows={decisionRows} />
          <Callout>条件越多，组合数量增长越快。先删除业务上不可能出现的组合，再合并处理结果完全相同且风险一致的组合。</Callout>
        </section>

        <section id="state" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="用状态迁移检查订单流转" badge="不仅看当前结果" />
          <p className="mb-5 text-sm leading-7 text-text-secondary">订单不是一个静止的数据记录。创建、支付、取消和完成都会改变状态，而且不是任意两个状态之间都能直接跳转。</p>
          <OrderStateFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="合法迁移"><BulletList items={["待支付 → 已支付：支付成功。", "待支付 → 已取消：用户主动取消或超时关闭。", "已支付 → 已完成：履约完成并确认收货。"]} /></Card>
            <Card title="非法迁移"><BulletList items={["已取消订单不能再次支付。", "已完成订单不能回到待支付。", "同一支付通知重复到达不能重复改变状态。"]} /></Card>
          </div>
          <Callout>状态用例要同时验证三个部分：能否执行操作、状态是否正确变化、重复或非法操作是否被拒绝。</Callout>
        </section>

        <section id="scenario" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="把正常流程和异常流程连起来" badge="按真实路径执行" />
          <ScenarioFigure />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="基本流"><p>选择商品 → 填写地址 → 使用优惠券 → 提交订单 → 创建成功。</p></Card>
            <Card title="备选流"><p>不使用优惠券、修改购买数量、切换地址后仍能正确提交。</p></Card>
            <Card title="异常流"><p>库存不足、优惠券失效、接口超时或重复提交时，系统安全失败并给出下一步。</p></Card>
          </div>
          <Card title="异常之后还要继续检查"><BulletList items={["用户能否修改数据后重新提交。", "请求超时后再次提交会不会产生重复订单。", "失败操作有没有错误扣减库存或占用优惠券。", "页面提示是否告诉用户问题和处理方式。"]} /></Card>
        </section>

        <section id="writing" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="把测试点写成别人能执行的用例" badge="条件、动作、结果" />
          <CaseAnatomyFigure />
          <Card title="用例标题统一使用“当……时，……”">
            <p>“当”后面写清触发条件，“时”后面写操作或系统应该表现出的结果。例如：当库存少于购买数量时，提交订单失败。</p>
          </Card>
          <TableCard title="一组可以直接执行的商城下单用例" headers={["优先级", "用例标题", "前置条件", "关键预期"]} rows={finalCaseRows} />
          <Callout>一条用例只验证一个主要目标。预期结果不要只写“提示正确”，要写出页面、接口和关键数据应该发生或不应该发生的变化。</Callout>
        </section>

        <section id="review" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="检查优先级、覆盖和可执行性" badge="写完不是结束" />
          <PriorityCoverageFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="优先级是否准确"><BulletList items={["P0：交易中断、资金错误、重复订单和核心数据损坏。", "P1：主要业务规则、常见异常和重要边界。", "P2：低频输入、非核心体验和弱影响场景。", "不要为了满足固定比例而调整真实风险等级。"]} /></Card>
            <Card title="是否覆盖所有测试点"><BulletList items={["每条需求规则至少有一条对应验证。", "有效、无效和边界数据都有覆盖。", "关键条件组合没有遗漏。", "合法与非法状态迁移都有覆盖。", "异常后数据一致性和恢复路径已检查。"]} /></Card>
          </div>
          <Card title="这组 10 条用例的分布"><div className="grid gap-3 sm:grid-cols-3"><Metric label="P0 核心风险" value="3 条 / 30%" /><Metric label="P1 主要规则" value="5 条 / 50%" /><Metric label="P2 低频体验" value="2 条 / 20%" /></div><p className="mt-4 text-xs leading-6">比例用于观察用例结构，不是必须达到的配额。业务风险变化后，用例比例也应该跟着变化。</p></Card>
          <ReviewPipelineFigure />
        </section>

        <section id="practice" data-knowledge-section className="mb-14">
          <SectionHeader number="10" title="独立完成一轮用例设计" badge="交付可执行结果" />
          <Card title="练习：新增“会员积分抵扣”规则">
            <BulletList ordered items={["补充规则：100 积分抵扣 1 元，每单最多抵扣订单金额的 20%。", "列出需要向产品确认的问题和可能的业务风险。", "分别使用等价类、边界值和判定表提取测试数据。", "补充积分冻结、扣减、退回涉及的状态变化。", "按“当……时，……”格式编写不少于 12 条用例。", "标记优先级，并说明每条 P0 用例阻断发布的理由。", "建立测试点与用例的对应关系，确认没有遗漏。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <ChecklistCard title="需求已拆清" items={["对象和规则明确", "边界和异常明确", "状态变化明确", "数据影响明确"]} />
            <ChecklistCard title="方法选得对" items={["输入用等价类", "数值用边界值", "组合用判定表", "流转用状态迁移"]} />
            <ChecklistCard title="用例可交付" items={["标题通俗可执行", "前置数据明确", "预期结果可验证", "优先级有依据"]} />
          </div>
          <Card title="下一步：测试设计方法地图">
            <p>掌握常见业务用例设计后，你可以继续把更多方法放进同一张地图，根据问题类型选择工具，而不是机械套用固定模板。</p>
            <div className="my-4 grid gap-3 sm:grid-cols-3">
              <Metric label="核心方法" value="等价类 · 边界值 · 判定表" />
              <Metric label="复杂组合" value="因果图 · Pairwise · 分类树" />
              <Metric label="动态发现" value="错误推测 · 探索性测试" />
            </div>
            <Link href="/knowledge/test-design-method-map" className="inline-flex items-center gap-2 text-sm text-neon-cyan">
              开始学习测试设计方法地图 <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6">
            <p className="text-sm text-text-secondary">掌握基础方法后，继续使用测试设计方法地图，根据不同业务风险选择更合适的设计技术。</p>
            <Link href="/knowledge/test-design-method-map" className="inline-flex items-center gap-2 text-sm text-neon-cyan">
              继续学习测试设计方法地图 <ArrowRight className="h-4 w-4" />
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
  return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-b border-space-border/50 last:border-b-0">{row.map((cell, index) => <td key={`${cell}-${index}`} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="block text-xs text-text-secondary">{label}</span><strong className="mt-2 block text-base text-text-primary">{value}</strong></div>;
}

function RequirementFlowFigure() {
  const steps = [["01", "选择商品"], ["02", "填写地址"], ["03", "使用优惠券"], ["04", "提交订单"], ["05", "校验并创建"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="requirement-flow-title"><figcaption id="requirement-flow-title" className="mb-5 text-sm font-bold text-text-primary">一次下单会连续经过五个业务节点</figcaption><div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">{steps.map((step, index) => <div key={step[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><span className="font-mono text-[9px] text-neon-cyan">{step[0]}</span><strong className="mt-2 block text-sm text-text-primary">{step[1]}</strong></div>{index < steps.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>;
}

function TestPointMapFigure() {
  const groups = [["输入", "数量、地址、优惠券"], ["规则", "库存、金额、资格"], ["数据", "订单、库存、券状态"], ["异常", "超时、重试、重复提交"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="point-map-title"><figcaption id="point-map-title" className="mb-5 text-sm font-bold text-text-primary">围绕一次提交，从四个方向提取测试点</figcaption><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{groups.map((group, index) => <div key={group[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><h4 className="my-2 font-bold text-text-primary">{group[0]}</h4><p className="text-xs leading-6 text-text-secondary">{group[1]}</p></div>)}</div></figure>;
}

function EquivalenceFigure() {
  const groups = [["无效", "≤ 0"], ["有效", "1～5"], ["无效", "≥ 6"], ["无效", "非整数"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="equivalence-title"><figcaption id="equivalence-title" className="mb-5 text-sm font-bold text-text-primary">商品数量被分成四类，每一类选择代表数据</figcaption><div className="grid gap-2 sm:grid-cols-4">{groups.map((group, index) => <div key={`${group[0]}-${group[1]}`} className={cn("rounded-lg border p-4 text-center", index === 1 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-space-card/50")}><strong className="block text-sm text-text-primary">{group[0]}</strong><span className="mt-2 block font-mono text-xs text-text-secondary">{group[1]}</span></div>)}</div></figure>;
}

function BoundaryFigure() {
  const values = ["0", "1", "2", "4", "5", "6"];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="boundary-title"><figcaption id="boundary-title" className="mb-5 text-sm font-bold text-text-primary">购买数量允许 1～5 件，重点检查两个边界的前后</figcaption><div className="relative mx-auto max-w-3xl px-4 py-8"><div className="absolute left-6 right-6 top-1/2 h-px bg-space-border" /><div className="relative grid grid-cols-6 gap-2">{values.map((value) => <div key={value} className={cn("mx-auto flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold", value === "1" || value === "5" ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan" : "border-space-border bg-[var(--surface-strong)] text-text-primary")}>{value}</div>)}</div><div className="mt-4 grid grid-cols-3 text-center text-xs text-text-secondary"><span>最小值附近</span><span>有效区间</span><span>最大值附近</span></div></div></figure>;
}

function DecisionTableFigure() {
  const steps = [["列条件", "库存、地址"], ["列组合", "是 / 否"], ["写动作", "创建或提示"], ["生成用例", "每列一条"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="decision-figure-title"><figcaption id="decision-figure-title" className="mb-5 text-sm font-bold text-text-primary">从业务条件到判定表用例</figcaption><div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">{steps.map((step, index) => <div key={step[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4"><strong className="block text-sm text-text-primary">{step[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{step[1]}</span></div>{index < steps.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>;
}

function OrderStateFigure() {
  const states = [["待支付", "创建订单"], ["已支付", "支付成功"], ["已完成", "确认收货"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="state-title"><figcaption id="state-title" className="mb-5 text-sm font-bold text-text-primary">订单主状态与取消分支</figcaption><div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">{states.map((state, index) => <div key={state[0]} className="contents"><div className="rounded-lg border border-neon-cyan/40 bg-neon-cyan/5 p-4 text-center"><strong className="text-sm text-text-primary">{state[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{state[1]}</span></div>{index < states.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div><div className="mx-auto mt-4 max-w-xs rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="text-sm text-text-primary">已取消</strong><span className="mt-2 block text-xs text-text-secondary">待支付状态下取消或超时关闭</span></div></figure>;
}

function ScenarioFigure() {
  const paths = [["基本流", "成功创建订单", "border-neon-cyan/50"], ["备选流", "修改后继续提交", "border-space-border"], ["异常流", "安全失败并恢复", "border-space-border"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="scenario-title"><figcaption id="scenario-title" className="mb-5 text-sm font-bold text-text-primary">同一个提交动作，会走向三类业务路径</figcaption><div className="grid gap-3 md:grid-cols-3">{paths.map((path) => <div key={path[0]} className={cn("rounded-lg border bg-space-card/50 p-4", path[2])}><CircleDot className="mb-3 h-4 w-4 text-neon-cyan" /><strong className="text-sm text-text-primary">{path[0]}</strong><p className="mt-2 text-xs text-text-secondary">{path[1]}</p></div>)}</div></figure>;
}

function CaseAnatomyFigure() {
  const parts = [["条件", "库存少于购买数量"], ["动作", "提交订单"], ["结果", "失败且不扣库存"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="case-anatomy-title"><figcaption id="case-anatomy-title" className="mb-5 text-sm font-bold text-text-primary">一条用例标题先把条件、动作和结果说清楚</figcaption><div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">{parts.map((part, index) => <div key={part[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="text-[10px] text-neon-cyan">{part[0]}</span><strong className="mt-2 block text-sm text-text-primary">{part[1]}</strong></div>{index < parts.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>;
}

function PriorityCoverageFigure() {
  const levels = [["P0", "核心交易与资金数据", "立即阻断发布"], ["P1", "主要规则与常见异常", "本轮应完成"], ["P2", "低频体验与弱影响场景", "结合时间安排"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="priority-title"><figcaption id="priority-title" className="mb-5 text-sm font-bold text-text-primary">优先级来自风险，不来自用例编号</figcaption><div className="grid gap-3 md:grid-cols-3">{levels.map((level) => <div key={level[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="font-mono text-xs text-neon-cyan">{level[0]}</span><strong className="my-2 block text-sm text-text-primary">{level[1]}</strong><p className="text-xs text-text-secondary">{level[2]}</p></div>)}</div></figure>;
}

function ReviewPipelineFigure() {
  const checks = [["规则", "都映射到用例"], ["数据", "有效、无效、边界"], ["组合", "关键条件不遗漏"], ["状态", "合法与非法流转"], ["表达", "别人可以直接执行"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="review-title"><figcaption id="review-title" className="mb-5 text-sm font-bold text-text-primary">提交评审前，按五道检查逐项过滤</figcaption><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{checks.map((check, index) => <div key={check[0]} className="rounded-lg border border-space-border bg-space-card/50 p-4"><FileCheck2 className="mb-3 h-4 w-4 text-neon-cyan" /><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><strong className="my-2 block text-sm text-text-primary">{check[0]}</strong><p className="text-xs leading-5 text-text-secondary">{check[1]}</p></div>)}</div></figure>;
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>;
}
