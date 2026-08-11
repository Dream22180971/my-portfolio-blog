import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata=buildPageMetadata({title:"RAG 知识库测试实战教程",description:"以企业售后知识助手为贯穿案例，实战评估 Recall@K、Precision@K、Chunk 策略、引用忠实度、数据污染、权限隔离与知识版本发布门。",path:"/knowledge/rag-knowledge-base-testing",tags:["RAG测试","检索评估","Recall@K","幻觉检测","知识库治理"]});
const sections:SectionItem[]=[{id:"case",label:"案例与链路"},{id:"dataset",label:"评估集"},{id:"retrieval",label:"召回与精确率"},{id:"chunk",label:"Chunk策略"},{id:"grounding",label:"幻觉与引用"},{id:"pollution",label:"数据污染"},{id:"permission",label:"权限与版本"},{id:"automation",label:"自动评估"},{id:"failure",label:"失败分类"},{id:"release",label:"发布门与练习"}];

export default function RagTestingPage(){return <div className="mx-auto max-w-5xl animate-fade-in"><Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan"><ArrowLeft className="h-4 w-4"/>返回 AI 测试工程师强化支线</Link><KnowledgeLayout sections={sections} searchPlaceholder="搜索 Recall@K、Chunk、引用忠实度与数据污染...">
<Header/>
<S id="case" n="01" t="先把 RAG 拆成可观测的质量链路" b="贯穿案例"><Card title="案例：企业售后知识助手"><p>助手只允许根据已发布的产品手册、退款规则和维修公告回答员工问题。问题“耳机在签收 8 天后出现质量问题，能否退款？”需要先检索到退款时限与质量问题例外条款，再给出带文档版本和段落引用的答复。</p></Card><Flow items={[["问题集","真实问法与权限"],["检索","候选 Chunk 与分数"],["重排","Top K 证据"],["生成","回答与引用"],["裁决","指标、人工复核、发布"]]}/><Table title="分层测试对象" headers={["层级","验证内容","典型失败"]} rows={[["数据层","来源、解析、切分、元数据","旧文档混入、表格解析丢行"],["检索层","候选召回、排序与过滤","正确证据未进 Top K"],["生成层","答案是否被证据支持","答案合理但引用不支持"],["治理层","权限、版本、审计与回退","跨租户召回、版本漂移不可追踪"]]}/><Callout>回答“看起来正确”不能证明 RAG 正确。必须同时保留 query、候选文档、排序分数、最终上下文、引用和知识版本，才能区分检索失败与生成失败。</Callout></S>
<S id="dataset" n="02" t="建立能算指标的检索评估集" b="先定义相关证据"><Table title="评估集分层" headers={["样本类型","例子","测试目的"]} rows={[["事实定位","退款期限是多少","验证单段精确检索"],["多跳组合","过保但在召回批次内如何处理","验证跨文档组合"],["同义改写","八天了能退耳机吗","验证口语与术语差异"],["不可回答","竞争对手保修政策是什么","验证拒答而非补全"],["冲突版本","旧规则 7 天、新规则 15 天","验证版本优先级"],["权限隔离","普通员工询问内部风控手册","验证检索前授权"]]}/><Card title="可执行构建步骤"><List ordered items={["从搜索日志、客服工单、规则文档和历史缺陷抽取问题，先脱敏。","为每题标注 relevant_doc_ids、relevant_chunk_ids、不可接受答案和权限角色。","由业务专家与测试人员双人标注；分歧进入裁决记录。","划分调优集、锁定回归集和挑战集，禁止用锁定集调 Chunk 或 Prompt。","保存 dataset_version、knowledge_version、标注人和生效日期。"]}/></Card><Code title="一条 RAG 金标样本">{`{
  "case_id": "REFUND-028",
  "query": "签收8天的耳机质量故障能退款吗？",
  "actor_role": "support_agent",
  "relevant_chunk_ids": ["refund-v3#quality-exception"],
  "must_cover": ["质量问题例外", "检测流程"],
  "must_not_claim": ["无条件立即退款"],
  "answerable": true,
  "knowledge_version": "2026-08-01"
}`}</Code></S>
<S id="retrieval" n="03" t="用 Recall@K 与 Precision@K 诊断检索" b="召回和噪声分开看"><Code title="单个问题的定义">{`Recall@K = Top K 中相关 Chunk 数 / 该问题全部相关 Chunk 数
Precision@K = Top K 中相关 Chunk 数 / K

# 例：金标有 2 个相关 Chunk，Top 5 找到其中 2 个
Recall@5 = 2 / 2 = 1.00
Precision@5 = 2 / 5 = 0.40`}</Code><Table title="指标解释" headers={["现象","可能原因","下一步"]} rows={[["Recall@K 低","同义词、切分或过滤遗漏","检查漏召证据与查询改写"],["Recall 高、Precision 低","Chunk 太碎、K 过大或语义相近噪声","调重排、元数据过滤与 K"],["离线指标高、回答仍错","生成未使用证据或引用映射错误","做忠实度与引用校验"],["总体高、关键场景低","平均数掩盖权限/版本/表格子类","按风险标签分桶"]]}/><Card title="统计口径"><List items={["同时报告 Macro 平均与各风险分层，不只给一个总体均值。","无相关证据的不可回答题不参与普通 Recall 分母，应单算正确拒答率和误召率。","相关性判断以金标证据为准；若相关证据不完备，先修评估集而不是追求虚高指标。","K 必须随报告展示，Recall@5 和 Recall@20 不可直接混为同一基线。"]}/></Card></S>
<S id="chunk" n="04" t="把 Chunk 策略当成可实验的配置" b="切分影响证据完整性"><Table title="Chunk 实验矩阵" headers={["策略","优点","主要风险","适用内容"]} rows={[["固定长度 + overlap","简单稳定、易批处理","标题与条款可能被切断","连续说明文本"],["按标题/段落切分","语义边界清楚","超长章节或短碎片","Markdown、制度手册"],["表格整块或行组","保留表头关系","块过大、字段噪声多","价格表、参数表"],["父子 Chunk","小块召回、父块补上下文","索引和引用映射更复杂","长文档与多层章节"],["语义切分","主题转折更自然","稳定性和成本需验证","混合叙述文档"]]}/><Card title="可重复的 A/B 步骤"><List ordered items={["固定同一评估集、Embedding、重排器和 K，只改变 Chunk 配置。","记录 size、overlap、separator、父子关系和解析器版本。","比较 Recall@K、Precision@K、引用完整率、延迟与索引成本。","抽查漏召题：证据是否被切断、标题是否丢失、表格是否失去表头。","只在关键风险不退化且成本可接受时升级索引版本。"]}/></Card><Callout>Overlap 不是越大越好。重复片段可能占满 Top K，让表面 Recall 不变却挤掉另一条必要证据；因此要同时看去重后的证据覆盖。</Callout></S>
<S id="grounding" n="05" t="分别检测幻觉、忠实度与引用正确性" b="答案和证据逐句对齐"><Table title="生成质量矩阵" headers={["指标","判定问题","失败例子"]} rows={[["答案正确性","结论是否符合金标业务规则","把质量问题例外说成无条件退款"],["Faithfulness/忠实度","每个可验证主张是否由上下文支持","上下文没有到账时限却声称 24 小时"],["引用正确率","引用段落是否真的支撑对应主张","引用售后地址来证明退款期限"],["引用完整率","关键主张是否都有证据","结论正确但质量例外无引用"],["正确拒答率","证据不足时是否停止并说明缺口","查不到仍凭常识回答"]]}/><Code title="逐句证据裁决 JSON">{`{
  "claim": "质量问题可在检测通过后进入退款流程",
  "citation": "refund-v3#quality-exception",
  "verdict": "SUPPORTED",
  "reason": "引用同时包含质量例外与检测前置条件",
  "review_required": false
}`}</Code><Card title="测试动作"><List items={["把回答拆成原子主张，逐条判定 SUPPORTED、CONTRADICTED 或 NOT_IN_CONTEXT。","引用 ID 必须能回到原文、页码或段落，不能只显示一个看似权威的文件名。","对 P0 规则使用确定性规则或人工金标复核，不把另一个模型的评分当最终真相。","证据冲突、缺失或低置信时，合格行为是明确不确定并转人工。"]}/></Card></S>
<S id="pollution" n="06" t="用数据污染测试保护知识入口" b="错误知识会稳定地产生错答"><Table title="污染类型与检测" headers={["污染类型","安全测试样本","应观察"]} rows={[["重复与近重复","同一公告多个副本","Top K 是否被单一来源占满"],["过期文档","保留已废止退款规则","是否按生效时间过滤"],["解析污染","表格错列、页眉混入正文","字段关系和引用定位是否失真"],["标签错误","内部文档标成公开","权限过滤是否在检索前生效"],["内容投毒","沙箱文档含 [UNTRUSTED_INSTRUCTION] 占位符","系统是否把文档仅视为数据"],["评估污染","锁定题答案进入提示词或索引","离线高分是否来自泄漏"]]}/><Card title="安全处理流程"><List ordered items={["所有导入源建立 allowlist、来源签名或审批记录，未知来源进入隔离区。","解析后做 Schema、重复、时间、权限标签与敏感信息扫描。","使用隔离索引运行回归，禁止直接覆盖线上索引。","对异常召回查看 source_id 与 ingestion_run_id，定位污染批次。","验证通过后原子切换索引别名；失败时回退到上一只读版本。"]}/></Card><Callout>本文只用无害占位符验证“文档中的指令不会控制系统”。不要把真实攻击载荷、客户数据或生产凭据放入测试集。</Callout></S>
<S id="permission" n="07" t="权限过滤与知识版本必须成为硬门禁" b="先授权再检索"><Table title="治理测试矩阵" headers={["维度","用例","发布要求"]} rows={[["横向隔离","租户 A 用户询问租户 B 已知术语","候选列表中也不得出现 B 的 Chunk"],["纵向权限","普通员工询问管理层制度","检索前过滤，拒答不泄露标题"],["文档生效期","新旧规则同时存在","只引用当前生效版本或明确冲突"],["删除传播","撤回文档后查询其独特短语","索引、缓存和引用页均不可命中"],["版本可复现","重放历史 run_id","能定位模型、Prompt、索引和数据集版本"],["回退","新索引关键指标退化","一键恢复上一已批准别名"]]}/><Code title="最小检索审计字段">{`request_id, actor_id_hash, tenant_id, role
query_hash, filter_expression, retrieved_chunk_ids
document_versions, index_version, embedding_version
prompt_version, model_version, decision, reviewer`}</Code><Callout>权限控制不能依赖“模型会拒答”。未经授权的内容不应进入候选集合和生成上下文；日志也应脱敏并按最小权限开放。</Callout></S>
<S id="automation" n="08" t="把评估做成可重放的流水线" b="先测检索再测回答"><Code title="评估伪代码">{`for sample in locked_dataset:
    result = rag.query(sample.query, role=sample.actor_role)
    recall = relevant(result.top_k, sample.gold) / len(sample.gold)
    precision = relevant(result.top_k, sample.gold) / result.k
    claims = split_into_atomic_claims(result.answer)
    faithfulness = judge_against_context(claims, result.context)
    assert_no_unauthorized_chunks(result.top_k, sample.actor_role)
    save(sample.id, recall, precision, faithfulness,
         result.latency_ms, result.versions)`}</Code><Table title="自动化测试矩阵" headers={["阶段","自动检查","人工抽查"]} rows={[["入库","Schema、重复、版本、权限标签","复杂表格与废止关系"],["检索","Recall@K、Precision@K、越权命中","相关性争议和多跳完整性"],["生成","引用存在、格式、禁答规则","主张忠实度与业务正确性"],["运行","P95、错误率、成本、缓存隔离","退化样本和用户影响"],["变更","候选与基线差量","P0 变化和阈值例外"]]}/></S>
<S id="failure" n="09" t="按根因分类失败并回流" b="不要只改 Prompt"><Table title="失败分类" headers={["代码","含义","主要负责人/动作"]} rows={[["DATA_PARSE","原文解析或元数据错误","数据工程：修解析器并重建索引"],["CHUNK_BOUNDARY","关键证据被切断","RAG 工程：调整切分实验"],["RETRIEVAL_MISS","相关证据未进入 Top K","检索：改查询、Embedding 或过滤"],["RANKING_NOISE","噪声挤占排序","重排：调模型、K 或去重"],["UNFAITHFUL","回答超出上下文","生成：收紧证据约束与拒答"],["CITATION_MISMATCH","引用与主张不对应","应用：修引用映射和逐句校验"],["ACCESS_BREACH","未授权内容进入候选","安全：立即阻断、审计与处置"],["VERSION_DRIFT","变更不可复现或指标退化","平台：锁版本并回退"]]}/><Card title="人工审核与回流"><List items={["P0 权限、隐私、资金规则和证据冲突必须人工裁决。","审核记录接受、修改、拒绝、待确认及 reason_code，不只保存最终答案。","稳定复现的失败加入挑战集；新业务规则先更新金标，再改系统。","若标注者长期分歧，修订相关性/忠实度口径，而不是平均掉争议。"]}/></Card></S>
<S id="release" n="10" t="设置分层发布门并完成实战" b="可发布、可回退、可审计"><Table title="发布门示例" headers={["门禁","示例阈值","阻断条件"]} rows={[["关键检索","P0 Recall@5 = 100%","任何 P0 漏召"],["检索噪声","总体 Precision@5 不低于已批准基线","显著退化且无收益"],["证据忠实度","P0 主张全部有支持引用","出现矛盾或无证据断言"],["拒答与权限","未授权召回为 0；不可回答题符合基线","候选泄露或伪造答案"],["性能","P95 延迟和单问成本在预算内","超预算且无安全降级"],["可回退","索引、Prompt、模型版本可定位","无法恢复上一版本"]]}/><Callout>表中阈值是售后案例的示例，不是通用行业标准。团队应结合风险、样本量、人工兜底能力和线上损失设定自己的基线。</Callout><Card title="练习：完成一次 Chunk 与检索版本发布"><List ordered items={["建立至少 30 条分层样本，包含多跳、不可回答、冲突版本与权限用例。","为每题标注相关 Chunk、关键主张、禁答项和角色。","对两种 Chunk 策略运行 Recall@5、Precision@5 和去重证据覆盖。","逐句评估引用忠实度，复核所有 P0 与差异样本。","注入无害的过期、重复、错标签与占位符污染，验证隔离和审计。","形成候选/基线差量报告，执行灰度、监控和回退演练。"]}/></Card><div className="grid gap-4 md:grid-cols-3"><Check title="评估资产" items={["金标可追溯","回归集锁定","指标分层","失败可回流"]}/><Check title="安全治理" items={["检索前授权","污染先隔离","日志已脱敏","P0 必须人审"]}/><Check title="发布交付" items={["版本可复现","门禁已审批","灰度可观测","回退已演练"]}/></div></S>
</KnowledgeLayout></div>}

function Header(){return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Phase 02 / AI Application Quality 01</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">RAG 知识库测试实战教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">从“回答像不像”走向可量化、可复现的检索与生成评估：让每条答案都能追到正确、当前且有权限的证据。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>Recall@K + Precision@K</span><span>污染、权限与版本门禁</span></div></header>}
function S({id,n,t,b,children}:{id:string;n:string;t:string;b:string;children:React.ReactNode}){return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>}
function Card({title,children}:{title?:string;children:React.ReactNode}){return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title&&<h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>}
function List({items,ordered=false}:{items:string[];ordered?:boolean}){const T=ordered?"ol":"ul";return <T className={`mt-3 space-y-2 pl-5 ${ordered?"list-decimal":"list-disc"}`}>{items.map(x=><li key={x}>{x}</li>)}</T>}
function Table({title,headers,rows}:{title:string;headers:string[];rows:string[][]}){return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map(x=><th key={x} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{x}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.join()} className="border-b border-space-border/50">{r.map((x,i)=><td key={x+i} className="px-4 py-2.5 text-xs leading-relaxed">{x}</td>)}</tr>)}</tbody></table></div></Card>}
function Code({title,children}:{title:string;children:string}){return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>}
function Callout({children}:{children:React.ReactNode}){return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>}
function Flow({items}:{items:string[][]}){return <Card title="RAG 测试闭环"><div className="grid gap-2 md:grid-cols-9 md:items-center">{items.map((x,i)=><div className="contents" key={x[0]}><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><b className="block text-xs text-text-primary">{x[0]}</b><span className="text-[11px]">{x[1]}</span></div>{i<4&&<ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block"/>}</div>)}</div></Card>}
function Check({title,items}:{title:string;items:string[]}){return <Card title={title}><ul className="space-y-3">{items.map(x=><li key={x} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 text-neon-cyan"/>{x}</li>)}</ul></Card>}
