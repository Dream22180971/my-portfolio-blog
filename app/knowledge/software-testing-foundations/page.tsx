import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "软件测试基础教程",
  description: "从质量风险、测试流程和测试类型开始，通过商城下单案例学习用例设计、缺陷报告、回归测试与发布判断。",
  path: "/knowledge/software-testing-foundations",
  tags: ["软件测试", "测试基础", "测试流程", "测试用例", "缺陷管理"],
});

const sections: SectionItem[] = [
  { id: "start", label: "如何学习" },
  { id: "mindset", label: "测试是什么" },
  { id: "quality", label: "质量维度" },
  { id: "lifecycle", label: "测试流程" },
  { id: "types", label: "测试类型" },
  { id: "risk", label: "需求与风险" },
  { id: "cases", label: "用例设计" },
  { id: "execution", label: "执行测试" },
  { id: "defects", label: "缺陷与回归" },
  { id: "practice", label: "练习与检查" },
];

const qualityRows = [
  ["功能性", "功能是否做对", "价格、库存、优惠券和订单状态符合规则"],
  ["可靠性", "异常时是否稳定", "断网重试不会重复创建订单"],
  ["易用性", "用户是否容易完成", "错误提示明确，操作路径不绕"],
  ["性能", "高负载下是否可用", "活动高峰提交订单仍能及时响应"],
  ["兼容性", "不同环境是否一致", "不同浏览器和手机上都能正常下单"],
  ["安全性", "数据和权限是否可靠", "用户不能读取或修改他人订单"],
];

const caseRows = [
  ["P0", "当库存充足且地址有效时，订单创建成功", "生成一笔订单；金额、库存和状态正确"],
  ["P0", "当商品库存为 0 时，提交订单失败", "提示库存不足；不生成订单、不扣库存"],
  ["P0", "当用户连续点击两次提交时，仅创建一笔订单", "请求幂等；不会重复扣款或扣库存"],
  ["P1", "当优惠券刚好达到使用门槛时，优惠金额正确", "边界金额计算正确；订单实付一致"],
  ["P1", "当收货地址缺少手机号时，无法提交订单", "定位到错误字段；保留已填写内容"],
  ["P2", "当订单备注达到最大长度时，可以正常保存", "备注完整保存；页面不溢出"],
];

const defectRows = [
  ["标题", "当重复点击提交订单时，系统创建两笔订单", "一句话说明条件、动作和错误结果"],
  ["环境", "测试环境 / Chrome 128 / 测试账号 A", "让开发者知道问题在哪里发生"],
  ["前置条件", "商品库存 10，购物车内 1 件商品", "说明复现前系统应处于什么状态"],
  ["复现步骤", "进入确认页 → 连续点击提交两次", "步骤短、明确、可以重复执行"],
  ["实际结果", "生成两笔订单，库存减少 2", "记录观察到的事实，不写猜测"],
  ["预期结果", "仅生成一笔订单，库存减少 1", "对应需求规则或质量标准"],
  ["证据", "截图、录屏、请求日志、订单 ID", "帮助快速定位并确认修复"],
];

export default function SoftwareTestingFoundationsPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=foundations" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan">
        <ArrowLeft className="h-4 w-4" />返回测试基础模块
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索教程关键词...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Foundations / Tutorial 01</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">软件测试基础教程</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">从“我点了一遍没问题”走向“我能用证据说明风险是否可接受”。</p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>1 条完整下单流程</span><span>图解 + 实战 + 练习</span></div>
        </header>

        <section id="start" data-knowledge-section className="mb-14">
          <SectionHeader number="01" title="从商城下单开始学习测试" badge="零基础起点" />
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="先看懂"><p>先用“看要求、想意外、做验证”三个动作理解测试，不急着背术语。</p></Card>
            <Card title="放进业务"><p>接下来，你会通过商城下单流程理解每个测试概念，并看到它在真实业务中如何应用。</p></Card>
            <Card title="动手验证"><p>学完后，亲自整理风险、编写用例和缺陷报告，把理解变成可以执行的测试工作。</p></Card>
          </div>
          <Card title="案例：完成一次在线商城下单">
            <p>现在，你要测试一条完整的下单流程：用户选择商品，填写地址，使用优惠券并提交订单；系统校验库存、计算金额、创建订单并扣减库存。表面上只是点击一次“提交订单”，实际上需要同时保证业务规则、数据一致性、异常恢复和权限安全。</p>
          </Card>
        </section>

        <section id="mindset" data-knowledge-section className="mb-14">
          <SectionHeader number="02" title="软件测试到底是什么" badge="先看、再想、再验证" />
          <Card title="先记住一句话">
            <p>软件测试就是：先弄清楚功能正常时应该是什么样，再想想用户可能遇到哪些意外，最后亲自操作并检查结果是否正确。</p>
            <p className="mt-3">例如产品说“用户可以提交订单”。测试人员不会只成功下一单，还会继续确认：库存为 0 能不能提交？连续点两次会不会生成两单？优惠券过期后金额是否正确？</p>
          </Card>
          <TestingMindsetFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="普通用户通常这样用"><BulletList items={["选择一个有库存的商品。", "填写正确地址并提交订单。", "看到“下单成功”就结束操作。"]} /></Card>
            <Card title="测试人员会多想几步"><BulletList items={["正常操作时，页面和订单数据是否都正确。", "输入错误、库存不足或网络中断时会发生什么。", "重复操作后，订单、库存和金额有没有出错。", "把看到的结果记录下来，让别人可以再次确认。"]} /></Card>
          </div>
          <Callout>测试思维不是故意挑刺，而是在用户遇到问题之前，替用户多走几条容易出错的路。</Callout>
        </section>

        <section id="quality" data-knowledge-section className="mb-14">
          <SectionHeader number="03" title="质量不只是功能正确" badge="六个观察角度" />
          <p className="mb-5 text-sm leading-7 text-text-secondary">“可以下单”只说明主功能可能可用。真正的软件质量还需要从稳定性、体验、速度、环境和安全等角度观察。</p>
          <QualityDimensionsFigure />
          <TableCard title="用六个角度检查下单质量" headers={["维度", "要回答的问题", "下单时检查什么"]} rows={qualityRows} />
        </section>

        <section id="lifecycle" data-knowledge-section className="mb-14">
          <SectionHeader number="04" title="测试贯穿整个研发流程" badge="不是提测后才开始" />
          <TestingLifecycleFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="越早发现，修复成本越低"><BulletList items={["需求阶段发现规则冲突，只需要改文档。", "开发阶段发现设计缺口，需要调整代码。", "上线后发现资金或数据错误，还要补偿用户和数据。"]} /></Card>
            <Card title="每个阶段都有测试产出"><BulletList items={["需求：问题清单、验收标准、风险清单。", "设计：测试点、数据方案、环境依赖。", "执行：结果、缺陷、阻塞和剩余风险。", "发布：测试报告、回归结论、上线检查项。"]} /></Card>
          </div>
        </section>

        <section id="types" data-knowledge-section className="mb-14">
          <SectionHeader number="05" title="常见测试类型怎么区分" badge="按目标选择" />
          <TestLayersFigure />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="按测试层级"><BulletList items={["单元测试：验证函数或类，由开发快速反馈。", "接口测试：验证服务契约、业务规则和数据。", "系统测试：从用户视角验证完整产品。", "验收测试：确认系统是否满足业务交付目标。"]} /></Card>
            <Card title="按质量目标"><BulletList items={["功能测试：业务行为是否正确。", "性能测试：响应、吞吐和资源是否达标。", "安全测试：认证、授权和数据保护是否可靠。", "兼容性测试：不同设备、浏览器和系统是否一致。"]} /></Card>
          </div>
          <Callout>测试类型不是互相替代的工具。下单金额计算适合单元测试，创建订单规则适合接口测试，用户完整购买流程则需要系统测试。</Callout>
        </section>

        <section id="risk" data-knowledge-section className="mb-14">
          <SectionHeader number="06" title="从需求中识别风险" badge="先问清楚再测试" />
          <Card title="拿到需求先问四类问题">
            <BulletList ordered items={["用户是谁：游客、普通用户、会员和管理员的权限有什么不同？", "规则是什么：库存、价格、优惠券、状态流转如何计算？", "失败怎么办：断网、超时、重复请求和下游异常如何处理？", "数据去哪了：页面、接口、数据库、缓存和消息是否需要保持一致？"]} />
          </Card>
          <RiskMatrixFigure />
          <Card title="下单时优先检查这些风险"><BulletList items={["重复提交产生两笔订单或重复扣款。", "优惠计算错误导致用户少付或多付。", "库存扣减失败造成超卖。", "用户修改订单 ID 后访问他人订单。", "支付成功但订单状态没有更新。"]} /></Card>
        </section>

        <section id="cases" data-knowledge-section className="mb-14">
          <SectionHeader number="07" title="把风险变成可执行用例" badge="条件、动作、结果" />
          <Card title="一条好用例应让别人也能执行"><BulletList items={["标题使用“当……时，……”说明条件和预期行为。", "前置条件明确账号、数据和系统状态。", "步骤只写必要动作，不把多个验证目标塞进一条用例。", "预期结果同时检查页面、接口和关键数据变化。", "优先级由业务影响和发生可能性决定，不按固定比例凑数。"]} /></Card>
          <TableCard title="商城下单用例" headers={["优先级", "用例标题", "关键预期"]} rows={caseRows} />
          <Callout>先覆盖 P0 核心交易与资金数据，再覆盖 P1 主要规则和异常，最后考虑 P2 低频体验。优先级准确比用例数量漂亮更重要。</Callout>
        </section>

        <section id="execution" data-knowledge-section className="mb-14">
          <SectionHeader number="08" title="执行测试时记录什么" badge="让结果可追溯" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="执行前"><BulletList items={["确认版本、环境和本次变更范围。", "准备账号、商品、库存和优惠券数据。", "检查依赖服务是否可用。", "先跑冒烟测试，确认版本值得继续测试。"]} /></Card>
            <Card title="执行中"><BulletList items={["记录实际结果，而不是只标通过或失败。", "失败时保存时间、请求、日志和业务 ID。", "区分产品缺陷、环境问题和测试数据问题。", "新风险及时补充探索性测试。"]} /></Card>
          </div>
          <Card title="通过、失败、阻塞不是同一件事"><BulletList items={["通过：实际结果符合明确的预期。", "失败：实际结果与预期不一致，存在产品问题或需求冲突。", "阻塞：由于环境、权限或依赖不可用，当前无法完成验证。", "未执行：本轮范围、时间或条件不包含该用例。"]} /></Card>
        </section>

        <section id="defects" data-knowledge-section className="mb-14">
          <SectionHeader number="09" title="缺陷报告与回归测试" badge="把问题说清楚" />
          <TableCard title="一份可复现的缺陷报告" headers={["字段", "下单问题", "为什么要写"]} rows={defectRows} />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="修复后为什么还要回归"><BulletList items={["确认原缺陷在相同条件下已经消失。", "验证修复没有破坏相邻业务。", "覆盖同类输入和相反路径，防止只修一个样例。", "核心链路重新执行，确认版本仍可发布。"]} /></Card>
            <Card title="缺陷严重程度与优先级"><BulletList items={["严重程度描述对系统和用户造成的影响。", "修复优先级描述团队需要多快处理。", "严重但低频的问题也可能必须阻断发布。", "不要用情绪争论等级，要用影响范围和证据沟通。"]} /></Card>
          </div>
        </section>

        <section id="practice" data-knowledge-section className="mb-14">
          <SectionHeader number="10" title="完成一次真正的基础练习" badge="从阅读走向执行" />
          <Card title="练习：独立完成一次商城下单测试">
            <BulletList ordered items={["画出从选择商品到订单创建成功的完整流程。", "列出至少 8 个风险，覆盖规则、异常、权限和数据。", "按“当……时，……”格式编写 10 条用例。", "为每条用例设置优先级，并写出判断理由。", "假设出现“重复点击后生成两笔订单”，写一份完整缺陷报告。", "说明修复后需要回归哪些相邻功能。"]} />
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <ChecklistCard title="理解需求" items={["用户和目标明确", "规则和边界明确", "异常处理明确", "数据流向明确"]} />
            <ChecklistCard title="完成验证" items={["核心路径已覆盖", "高风险异常已覆盖", "结果有证据", "缺陷可复现"]} />
            <ChecklistCard title="支持发布" items={["修复已回归", "阻塞项已说明", "剩余风险已说明", "结论有范围限制"]} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6">
            <p className="text-sm text-text-secondary">完成这些输出后，你已经具备进入“测试用例设计实战教程”的基础。</p>
            <Link href="/knowledge/test-case-design" className="inline-flex items-center gap-2 text-sm text-neon-cyan">
              继续学习测试用例设计 <ArrowRight className="h-4 w-4" />
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

function TableCard({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return <Card title={title}><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-b border-space-border/50 last:border-b-0">{row.map((cell) => <td key={cell} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>;
}

function TestingMindsetFigure() {
  const items = [
    ["01", "先看要求", "正常情况下应该怎样", "库存充足时，应该生成一笔订单"],
    ["02", "再想意外", "哪些情况容易出错", "库存为 0、重复点击、优惠券过期"],
    ["03", "动手确认", "实际结果到底怎样", "检查页面提示、订单、库存和金额"],
  ];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="mindset-figure-title"><figcaption id="mindset-figure-title" className="mb-5 text-sm font-bold text-text-primary">新手先记住三个动作：看要求、想意外、做验证</figcaption><div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">{items.map((item, index) => <div key={item[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4"><span className="font-mono text-[10px] text-neon-cyan">{item[0]}</span><h4 className="my-2 font-bold text-text-primary">{item[1]}</h4><p className="text-xs leading-6 text-text-secondary">{item[2]}</p><p className="mt-3 border-t border-space-border pt-3 text-xs leading-6 text-text-primary">下单示例：{item[3]}</p></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>;
}

function QualityDimensionsFigure() {
  const items = ["功能正确", "稳定可靠", "容易使用", "响应及时", "环境兼容", "权限安全"];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="quality-figure-title"><figcaption id="quality-figure-title" className="mb-5 text-sm font-bold text-text-primary">用户感知到的质量，是多个维度共同作用的结果</figcaption><div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-[var(--rule)] md:grid-cols-3">{items.map((item, index) => <div key={item} className="bg-space-card/50 p-4 text-center"><span className="mb-2 block font-mono text-[9px] text-neon-cyan">0{index + 1}</span><strong className="text-sm text-text-primary">{item}</strong></div>)}</div></figure>;
}

function TestingLifecycleFigure() {
  const items = [["需求", "问清规则"], ["设计", "识别风险"], ["开发", "提前验证"], ["提测", "执行测试"], ["修复", "回归影响"], ["发布", "说明风险"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="lifecycle-figure-title"><figcaption id="lifecycle-figure-title" className="mb-5 text-sm font-bold text-text-primary">一次迭代中的测试活动</figcaption><div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">{items.map((item, index) => <div key={item[0]} className="relative rounded-lg border border-space-border p-4"><span className="font-mono text-[9px] text-neon-cyan">0{index + 1}</span><h4 className="my-2 text-sm font-bold text-text-primary">{item[0]}</h4><p className="text-xs text-text-secondary">{item[1]}</p></div>)}</div></figure>;
}

function TestLayersFigure() {
  const layers = [["验收测试", "业务目标", "w-3/5"], ["系统测试", "完整流程", "w-4/5"], ["接口测试", "服务与数据", "w-11/12"], ["单元测试", "函数与规则", "w-full"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="layers-figure-title"><figcaption id="layers-figure-title" className="mb-5 text-sm font-bold text-text-primary">测试分层：越靠下反馈越快，越靠上越接近真实业务</figcaption><div className="mx-auto flex max-w-2xl flex-col items-center gap-2">{layers.map((layer, index) => <div key={layer[0]} className={cn("flex items-center justify-between rounded-md border px-4 py-3", layer[2], index === 0 ? "border-neon-cyan/60 bg-neon-cyan/10" : "border-space-border bg-space-card/50")}><strong className="text-sm text-text-primary">{layer[0]}</strong><span className="text-xs text-text-secondary">{layer[1]}</span></div>)}</div></figure>;
}

function RiskMatrixFigure() {
  const cells = [["中", "高", "高"], ["低", "中", "高"], ["低", "低", "中"]];
  return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby="risk-figure-title"><figcaption id="risk-figure-title" className="mb-5 text-sm font-bold text-text-primary">风险矩阵：影响越大、发生越容易，越需要优先测试</figcaption><div className="grid grid-cols-[auto_repeat(3,minmax(0,1fr))] gap-1 text-center text-xs"><div /><div className="p-2 text-text-secondary">低概率</div><div className="p-2 text-text-secondary">中概率</div><div className="p-2 text-text-secondary">高概率</div>{cells.map((row, rowIndex) => <div key={rowIndex} className="contents"><div className="flex items-center justify-end p-2 text-text-secondary">{["高影响", "中影响", "低影响"][rowIndex]}</div>{row.map((cell, cellIndex) => <div key={`${rowIndex}-${cellIndex}`} className={cn("rounded p-3 font-bold", cell === "高" ? "bg-red-500/15 text-red-300" : cell === "中" ? "bg-amber-500/15 text-amber-300" : "bg-emerald-500/10 text-emerald-300")}>{cell}</div>)}</div>)}</div></figure>;
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>;
}
