import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata=buildPageMetadata({title:"AI 应用测试体系教程",description:"以 AI 生成商城测试用例为案例，建立评估集、人工金标、多维评分、成本延迟稳定性回归，以及机器 Check 与人工审核结合的质量闭环。",path:"/knowledge/ai-application-testing-system",tags:["AI应用测试","LLM评估","评估集","人工金标","AI回归测试"]});
const sections:SectionItem[]=[{id:"difference",label:"概率性质量"},{id:"scope",label:"评估目标"},{id:"dataset",label:"评估集"},{id:"gold",label:"人工金标"},{id:"rubric",label:"质量评分"},{id:"checks",label:"机器Check"},{id:"human",label:"人工审核"},{id:"nonfunctional",label:"成本与稳定性"},{id:"regression",label:"回归与练习"}];
const dimensionRows=[["正确性","业务规则和预期是否正确","退款金额不得超过实付；重复回调只能生效一次"],["相关性","是否围绕需求与风险，而非泛泛扩写","不生成需求外的积分、直播场景"],["完整性","关键正常、异常、边界与状态是否覆盖","库存 0/1、支付超时、退款重复、并发取消"],["可执行性","前置、数据、步骤、结果是否可观察","明确订单状态、金额、次数与等待上限"],["可追溯性","结论能否关联需求或规则证据","每条高风险断言带 rule_id"],["安全性","是否建议越权或危险操作","禁止生产扣款、全表清理和真实用户数据"]];
const setRows=[["正常链路","创建订单→扣库存→支付成功","验证基础正确性"],["边界","库存 0/1、金额 0.01、优惠临界值","验证数值和规则边界"],["异常","支付超时、回调重复、退款失败","验证补偿、幂等与错误处理"],["状态机","取消与发货并发、退款后重复取消","验证合法迁移与反向用例"],["信息不足","未给出退款时限或叠加顺序","验证模型会拒绝猜测并请求澄清"],["对抗输入","需求中混入越权指令或敏感数据","验证安全边界"]];

export default function AiTestingPage(){return <div className="mx-auto max-w-5xl animate-fade-in"><Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan"><ArrowLeft className="h-4 w-4"/>返回 AI 应用测试模块</Link><KnowledgeLayout sections={sections} searchPlaceholder="搜索评估集、金标、置信度与回归...">
<header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">AI Quality Track / Core 01</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">AI 应用测试体系教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">把前面学到的测试设计、自动化、可观测性和度量方法带入概率性系统：评估 AI 生成的商城测试用例，而不是被“生成了 100 条”迷惑。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>9 个章节</span><span>评估集 + 人工金标</span><span>机器 Check + 人工审核</span></div></header>
<S id="difference" n="01" t="从确定性断言走向概率性评估" b="同题可能不同答"><div className="grid gap-4 md:grid-cols-2"><Card title="传统接口"><p>固定输入通常对应明确输出，可以用状态码、字段值和数据库结果做确定性断言。</p></Card><Card title="AI 生成用例"><p>表达、数量和组合可能变化，需要判断内容是否正确、有价值、完整且安全。</p></Card></div><Flow items={[["商城需求","订单/库存/支付/退款"],["AI生成","候选测试用例"],["机器Check","结构、规则、重复"],["人工审核","业务判断与风险"],["发布结论","接受、修改或拒绝"]]}/><Callout>AI 输出首先是候选，不是事实。测试体系的目标不是让每次文字完全相同，而是让关键业务约束稳定满足、风险可量化、失败可复现。</Callout></S>
<S id="scope" n="02" t="先定义被测对象与失败方式" b="评估目标可计算"><Card title="贯穿案例"><p>输入一份“商城支持创建订单、扣减库存、第三方支付、取消与退款”的需求，让 AI 输出“当……时，……”格式的结构化测试用例。你要判断它能否守住资金、库存和状态机风险。</p></Card><Table title="评估对象" headers={["层级","关注点","典型失败"]} rows={[["输入理解","是否识别约束和不确定信息","把“暂未定义”当成确定规则"],["生成内容","用例是否准确、相关、完整","编造功能、漏掉重复扣款"],["输出结构","字段和格式是否可消费","缺少前置、步骤、预期或优先级"],["系统运行","模型、Prompt、检索和工具是否稳定","版本更新后质量回退"],["运行边界","成本、延迟、容量和安全","超预算、超时、输出敏感信息"]]}/><Card title="先写发布标准"><List items={["P0 业务规则正确率 100%，不得出现资金与权限错误建议。","关键风险召回率达到团队基线，信息不足时必须标记待确认。","JSON Schema 通过率、延迟、成本和稳定性达到预算。","低置信度与高风险输出必须进入人工审核。"]}/></Card></S>
<S id="dataset" n="03" t="建立小而有代表性的评估集" b="不是随手挑十条"><Table title="商城评估集分层" headers={["分层","样本例子","目的"]} rows={setRows}/><Card title="可执行构建步骤"><List ordered items={["从真实需求、历史缺陷和高风险规则收集候选，完成脱敏。","按模块、风险、难度、输入质量和失败类型打标签。","分出开发集与锁定回归集，回归集不用于调 Prompt。","每条样本保存 requirement_id、版本、预期关键点与不可接受错误。","每次新增线上逃逸或人工否决案例，都评估是否进入挑战集。"]}/></Card><Code title="评估样本 JSON">{`{
  "case_id": "ORDER-REFUND-017",
  "input": "已支付订单可取消，退款走异步回调。退款时限未定义。",
  "risk_tags": ["money", "idempotency", "async"],
  "must_cover": ["重复取消", "重复回调", "退款金额一致"],
  "must_not_claim": ["退款一定在5分钟到账"],
  "severity": "P0"
}`}</Code></S>
<S id="gold" n="04" t="用人工金标固定业务底线" b="金标不是唯一措辞"><Card title="金标包含什么"><List items={["必须覆盖的风险点，而不是唯一的一段标准答案。","明确不可接受的事实错误和危险建议。","示例合格用例、优先级与引用的业务规则。","信息不足时应提出的澄清问题。","审核人、审核时间、规则版本与争议记录。"]}/></Card><Table title="一条订单取消金标" headers={["金标元素","内容"]} rows={[["必须覆盖","重复取消只退款一次；库存只释放一次；状态最终一致"],["边界","支付成功与取消并发；回调延迟或重复"],["禁止断言","需求未给时限时，不得自行声称 5 分钟到账"],["合格标题","当同一已支付订单被重复取消时，系统应只创建一笔退款"],["证据","RULE-REFUND-03、BUG-481"]]}/><Callout>两位审核者先独立标注，再讨论分歧。若“完整性”长期无法一致判断，应拆成更具体的风险点，而不是用一个模糊总分掩盖争议。</Callout></S>
<S id="rubric" n="05" t="分别评分正确性、相关性与完整性" b="不要只给一个总分"><Table title="多维评分规则" headers={["维度","问题","商城判断"]} rows={dimensionRows}/><Code title="分层评分示意">{`final_score =
  0.30 * correctness +
  0.20 * relevance +
  0.25 * completeness +
  0.15 * executability +
  0.10 * traceability

hard_fail if safety_violation or P0_fact_error
# 权重来自本项目风险，不是通用标准`}</Code><Card title="不要让总分遮住红线"><p>一批用例即使平均 92 分，只要出现“支付失败可以直接把订单改成已支付”这类 P0 事实错误，也必须整批进入人工复核或阻断发布。</p></Card></S>
<S id="checks" n="06" t="先让机器 Check 处理确定性问题" b="快筛但不代替判断"><Table title="机器可稳定检查的内容" headers={["检查","实现","失败动作"]} rows={[["Schema","JSON Schema / Pydantic","字段缺失直接拒绝"],["标题格式","匹配“当……时，……”并检查可观察结果","退回改写"],["规则词典","金额、状态、次数与 rule_id 对照","P0 冲突阻断"],["去重","标题、步骤与语义相似度聚类","标记人工合并"],["覆盖映射","must_cover 与输出 risk_tags 对照","缺失进入补生成或人审"],["安全规则","敏感字段、生产操作、危险命令","立即拒绝并记录"]]}/><Code title="TypeScript 检查示意">{`function check(candidate: TestCase, sample: EvalSample) {
  const errors: string[] = [];
  if (!candidate.title.startsWith("当") || !candidate.title.includes("时"))
    errors.push("TITLE_FORMAT");
  for (const risk of sample.mustCover)
    if (!candidate.riskTags.includes(risk)) errors.push("MISSING:" + risk);
  if (candidate.environment === "production") errors.push("UNSAFE_ENV");
  return { passed: errors.length === 0, errors };
}`}</Code><Callout>规则擅长判断“字段有没有”，不擅长判断“退款场景是否真正有价值”。机器 Check 的产物是筛选证据，不是最终业务结论。</Callout></S>
<S id="human" n="07" t="按风险与置信度进入人工审核" b="可解释的置信度"><Card title="审核路由"><List items={["P0 资金、权限、隐私用例：无论置信度多高都必须人工确认。","机器规则失败或证据冲突：直接人工复核。","低风险且结构、规则、覆盖均通过：可抽样审核。","新模型、新 Prompt、新业务模块：提高抽样比例，直到质量稳定。"]}/></Card><Code title="置信度拆解">{`confidence =
  0.35 * rule_consistency +
  0.25 * evidence_support +
  0.20 * coverage_score +
  0.20 * historical_acceptance

route = high_risk || confidence < 0.85 ? "HUMAN_REVIEW" : "SAMPLE_REVIEW"`}</Code><Table title="人工审核记录" headers={["结论","何时使用","必须记录"]} rows={[["接受","业务正确且可执行","审核人、规则版本、置信度"],["修改后接受","方向对但数据或断言不够具体","修改字段与原因"],["拒绝","编造、重复、错误或危险","错误分类与对应样本"],["待确认","需求证据不足或冲突","待澄清问题与负责人"]]}/><Callout>置信度必须能拆解，不能把模型自报的“0.95”当事实。人工审核结果要回流成评估样本和规则改进，而不是只改掉当前文本。</Callout></S>
<S id="nonfunctional" n="08" t="同时测试成本、延迟与稳定性" b="质量必须可运营"><Table title="非功能指标" headers={["指标","测试方式","发布门槛示例"]} rows={[["端到端延迟","固定输入测 P50/P95/P99","P95 <= 8s"],["单次成本","记录输入输出 Token、检索和工具费用","P95 <= 预算"],["稳定性","同一样本重复 10 次","P0 规则满足率 100%"],["容量","并发生成并观察排队、限流和超时","不丢任务，可退避重试"],["降级","模型超时、限额、检索不可用","明确失败或转人工，不输出伪结果"],["版本漂移","模型/Prompt/索引变更前后对比","关键指标不低于基线"]]}/><Card title="用例：当模型服务超时时，系统不应把半截用例当成正式结果"><List items={["注入超时或限额错误。","确认任务状态为失败或待重试，输出不可直接导入。","重试使用同一任务 ID，避免重复计费与重复入库。","超过预算后停止并转人工，记录模型、Prompt 和耗时。"]}/></Card></S>
<S id="regression" n="09" t="建立可复现的 AI 回归闭环" b="评估驱动迭代"><Flow items={[["锁定评估集","版本化输入与金标"],["运行候选版本","固定模型参数"],["机器评分","规则、覆盖、成本"],["人工复核","高风险与差异样本"],["发布或回退","保留完整报告"]]}/><Code title="评估报告最小字段">{`run_id, model_version, prompt_version, knowledge_version
dataset_version, sample_id, random_seed, latency_ms, cost
machine_checks, rubric_scores, confidence
human_decision, reviewer, reject_reason`}</Code><Card title="练习：评估 AI 生成的商城测试用例"><List ordered items={["建立至少 20 条评估样本，覆盖正常、边界、异常、状态机、信息不足和安全输入。","为 5 条 P0 样本制作人工金标，并让两名审核者独立标注。","实现 Schema、标题、重复、关键风险和危险操作检查。","分别统计正确性、相关性、完整性、可执行性和 P0 硬失败。","重复运行评估，记录成本、P95 延迟和结果稳定性。","设置机器 Check + 人工审核路由，并输出接受、修改、拒绝、待确认记录。"]}/></Card><div className="grid gap-4 md:grid-cols-3"><Check title="评估资产" items={["数据集分层","金标有版本","回归集锁定","线上失败可回流"]}/><Check title="质量判断" items={["多维而非总分","P0 红线明确","置信度可解释","机器与人分工"]}/><Check title="运行治理" items={["版本可复现","成本延迟达标","失败安全降级","报告可追溯"]}/></div><Next/></S>
</KnowledgeLayout></div>}

function S({id,n,t,b,children}:{id:string;n:string;t:string;b:string;children:React.ReactNode}){return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>}
function Card({title,children}:{title?:string;children:React.ReactNode}){return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title&&<h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>}
function List({items,ordered=false}:{items:string[];ordered?:boolean}){const T=ordered?"ol":"ul";return <T className={`mt-3 space-y-2 pl-5 ${ordered?"list-decimal":"list-disc"}`}>{items.map(x=><li key={x}>{x}</li>)}</T>}
function Table({title,headers,rows}:{title:string;headers:string[];rows:string[][]}){return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map(x=><th key={x} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{x}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.join()} className="border-b border-space-border/50">{r.map((x,i)=><td key={x+i} className="px-4 py-2.5 text-xs leading-relaxed">{x}</td>)}</tr>)}</tbody></table></div></Card>}
function Code({title,children}:{title:string;children:string}){return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>}
function Callout({children}:{children:React.ReactNode}){return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>}
function Flow({items}:{items:string[][]}){return <Card title="AI 测试质量闭环"><div className="grid gap-2 md:grid-cols-9 md:items-center">{items.map((x,i)=><div className="contents" key={x[0]}><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><b className="block text-xs text-text-primary">{x[0]}</b><span className="text-[11px]">{x[1]}</span></div>{i<4&&<ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block"/>}</div>)}</div></Card>}
function Check({title,items}:{title:string;items:string[]}){return <Card title={title}><ul className="space-y-3">{items.map(x=><li key={x} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 text-neon-cyan"/>{x}</li>)}</ul></Card>}
function Next(){return <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">继续看真实的 100 条 AI 候选用例如何经过人工审核与脚本校验。</p><Link href="/blog/ai-generated-test-cases-human-review" className="inline-flex items-center gap-2 text-sm text-neon-cyan">AI 生成测试用例人工审核实战<ArrowRight className="h-4 w-4"/></Link></div>}
