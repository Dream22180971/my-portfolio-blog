import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata=buildPageMetadata({title:"测试 Skill 与知识资产封装教程",description:"把检查清单、SQL、评分规则和团队经验封装成可复用 Skill，覆盖目录结构、Schema、版本回归、执行边界，以及何时需要接入 MCP 工具。",path:"/knowledge/testing-skills-design",tags:["测试Skill","MCP","测试资产","AI辅助测试","质量工程"]});
const sections:SectionItem[]=[{id:"concept",label:"Skill是什么"},{id:"assets",label:"三类资产"},{id:"anatomy",label:"组成结构"},{id:"contracts",label:"目录与Schema"},{id:"pipeline",label:"能力组合"},{id:"mcp",label:"MCP工具"},{id:"design",label:"五步设计"},{id:"boundaries",label:"执行边界"},{id:"evaluation",label:"质量验证"},{id:"evolution",label:"版本演进"},{id:"practice",label:"练习清单"}];

export default function SkillsPage(){return <div className="mx-auto max-w-5xl animate-fade-in"><Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan"><ArrowLeft className="h-4 w-4"/>返回 AI 测试工程师强化支线</Link><KnowledgeLayout sections={sections} searchPlaceholder="搜索 Skill、风险库、缺陷模式与验证...">
<Header/>
<S id="concept" n="01" t="Skill 是一项边界清楚的可执行能力" b="不是万能 Prompt"><Table title="三种资产的分工" headers={["载体","擅长","不足"]} rows={[["规范文档","解释原则和背景","不同人理解可能不同"],["自动化脚本","执行确定性检查","只能覆盖已编码规则"],["测试 Skill","让 AI 按固定步骤组合规范、材料和脚本","必须测试触发、边界与输出"]]}/><Callout>一项 Skill 应能用一句话说明职责。例如“从当前版本需求中提取带来源的规则与待确认项”，而不是“完成全部测试工作”。</Callout></S>
<S id="assets" n="02" t="先把检查清单、SQL 和评分规则变成结构化资产" b="三类资产三种边界"><Table title="三类核心资产如何封装" headers={["资产","适合形态","输入/输出","关键边界"]} rows={[["检查清单","YAML/JSON 规则 + 只读校验脚本","输入模块/证据；输出 pass、fail、unknown","unknown 不得自动当 pass；业务判断转人工"],["SQL","参数化 .sql + 参数 Schema + 只读执行器","输入环境、命名参数；输出列 Schema 与行数","禁止字符串拼接、写语句、生产默认连接和无限结果集"],["评分规则","版本化 rubric.yaml + 评分器","输入候选产物和证据；输出分项分数、理由、证据 ID","分数只做筛选信号，关键错误一票否决且由人裁决"]]}/><Table title="还适合封装的资产" headers={["资产","可执行内容"]} rows={[["通用测试点","表单、列表、权限、状态和重复提交检查"],["风险规则","触发条件、失败方式、优先级和建议方法"],["缺陷模式","症状、易发场景与回归检查点"],["输出规范","标题、字段、来源和版本格式"],["领域口径","字段含义、业务状态和不可接受错误"]]}/><Callout>检查清单适合解释“应该查什么”，SQL 适合取得可复核事实，评分规则适合统一初筛。三者都不能替代需求裁决、生产变更和发布放行。</Callout></S>
<S id="anatomy" n="03" t="一个完整 Skill 至少有六部分" b="触发到验收"><Table title="Skill 结构" headers={["部分","要写清楚"]} rows={[["名称与描述","何时触发、完成什么"],["输入","必需材料、优先级和读取顺序"],["步骤","必须按什么顺序执行"],["输出","字段、文件、命名和交接对象"],["边界","哪些不做、何时暂停、谁来接管"],["验收","用什么样本和指标判断完成"]]}/><Card title="强规则比形容词有效"><p>把“认真分析需求”改成“按章节提取包含必须、不得、仅限、上限的规则并保留原文位置”；把“不要编造”改成“未定义数值进入待确认，输出中不得出现具体值”。</p></Card></S>
<S id="contracts" n="04" t="目录结构与 Schema 是可组合能力的接口" b="先定契约再写提示词"><Code title="skills/test-case-review/">{`SKILL.md                 # 触发条件、流程、边界、人工接管点
assets/
  checklist.yaml         # 规则 ID、严重度、检查方式
  score-rubric.yaml      # 分项权重与一票否决项
sql/
  orphan-cases.sql       # 只读参数化查询
schemas/
  input.schema.json
  finding.schema.json
scripts/
  validate_assets.py     # Schema 与引用完整性
evals/
  cases.jsonl            # 正常、缺失、冲突、攻击样本
CHANGELOG.md`}</Code><Code title="schemas/finding.schema.json">{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["rule_id", "status", "evidence_ids", "message"],
  "properties": {
    "rule_id": { "type": "string", "pattern": "^TCR-[0-9]{3}$" },
    "status": { "enum": ["pass", "fail", "unknown", "needs_human_review"] },
    "evidence_ids": { "type": "array", "items": { "type": "string" } },
    "message": { "type": "string", "maxLength": 500 },
    "score": { "type": "number", "minimum": 0, "maximum": 100 }
  },
  "additionalProperties": false
}`}</Code><Card title="资产引用规则"><List items={["SKILL.md 只描述流程和路由，不复制 checklist、SQL 或评分表正文。","规则使用稳定 ID；报告引用规则版本与证据 ID。","SQL 只接受命名参数，返回列也通过 Schema 校验。","评分表写明权重、一票否决项和不可评分条件。","所有路径相对 Skill 根目录解析，禁止跳出目录读取任意文件。"]}/></Card></S>
<S id="pipeline" n="05" t="用单一职责的 Skill 组合流程" b="产物就是接口"><Flow items={[["需求拆解","规则与待确认"],["缺陷提炼","模式与回归点"],["源码扫描","实现风险"],["用例生成","候选用例"],["用例评审","修订与结论"],["沉淀总结","资产回填"]]}/><Card title="组合原则"><List items={["上游输出字段固定，下游可以直接读取。","同一条规则只在权威资产中维护，不在多个 Skill 复制。","主流程负责汇总与裁决，分析 Skill 不替人决定业务口径。","任一 Skill 失败时保留输入、版本和错误原因。"]}/></Card></S>
<S id="mcp" n="06" t="只有需要运行时能力时才升级为 MCP 工具" b="Skill 负责流程，MCP 负责调用"><Table title="Skill 与 MCP 的选择" headers={["需求","使用 Skill","增加 MCP 工具"]} rows={[["读取规则、模板和示例","是","否"],["离线校验 JSON/Markdown","优先使用 Skill 自带脚本","脚本需跨团队集中托管时再考虑"],["查询测试数据库","Skill 定义何时查、怎样解释","MCP 实现只读连接、参数校验与行数限制"],["调用测试平台","Skill 定义选择与审批流程","MCP 暴露 list/run/read_report 等窄接口"],["修改正式资产或触发高副作用动作","Skill 必须写人工门","MCP 服务端再次要求授权与审计"]]}/><Code title="MCP 工具输入示例">{`{
  "name": "query_orphan_test_cases",
  "inputSchema": {
    "type": "object",
    "required": ["project_id", "version"],
    "properties": {
      "project_id": { "type": "string", "pattern": "^[a-z0-9-]+$" },
      "version": { "type": "string", "maxLength": 40 },
      "limit": { "type": "integer", "minimum": 1, "maximum": 200 }
    },
    "additionalProperties": false
  }
}`}</Code><Callout>MCP 服务端不能信任来自模型的参数。它必须独立执行身份校验、环境白名单、SQL 模板选择、超时、最大行数、敏感列脱敏和审计记录。</Callout></S>
<S id="design" n="07" t="用五步把经验变成 Skill" b="痛点到回放"><Table title="五步法" headers={["步骤","动作","完成标准"]} rows={[["找痛点","选择重复、耗时且结果不稳定的环节","真实发生过多次"],["定边界","写清做什么与不做什么","职责一句话说清"],["立规则","把口头经验改成必须、禁止、按顺序","规则可逐条检查"],["定产出","固定结构和交接方式","下游无需重新解释"],["验效果","用历史样本回放并和专家结果比较","正常、边界、歧义样本通过"]]}/></S>
<S id="boundaries" n="08" t="把人工接管点和安全边界写进 Skill" b="不确定时暂停"><Table title="停止条件" headers={["触发","动作"]} rows={[["需求规则互相冲突","输出待确认项，不继续定稿"],["输入缺少权威来源","说明缺什么，不用历史材料代替"],["出现未定义数值或状态","删除具体断言并请求确认"],["涉及真实敏感数据","停止处理或先完成脱敏"],["可能产生外部副作用","请求明确授权，不自动执行"],["SQL 不是白名单 SELECT 模板","拒绝执行；禁止拼接模型生成的语句"],["MCP 参数越界、环境不明或结果过大","服务端拒绝并记录审计事件"]]}/><Table title="纵深防护" headers={["层","必须落实"]} rows={[["Skill 指令","声明允许/禁止动作、证据顺序和人工门"],["Schema","拒绝多余字段、非法枚举、超长参数和路径穿越"],["MCP 服务端","最小权限身份、环境白名单、超时、限流和结果脱敏"],["数据层","只读账号、参数化 SQL、事务与查询审计"],["人工层","生产查询、写操作、删除、发布与正式资产更新逐次批准"]]}/><Callout>Skill 的价值不只是告诉 AI 做什么，也包括告诉它什么时候不应该继续。真正的权限控制必须在工具和数据层执行，不能只依赖 Prompt。</Callout></S>
<S id="evaluation" n="09" t="像测试产品一样测试 Skill 与 MCP" b="输入、输出与防编造"><Table title="验证矩阵" headers={["维度","样本","指标"]} rows={[["触发准确","同义触发词与无关任务","命中与误触发"],["输入边界","材料缺失、格式错误、规则冲突","拒绝和待确认是否正确"],["输出稳定","同一输入重复执行","结构一致、关键规则召回"],["资产正确","检查清单、SQL、评分表的金标样本","规则命中、SQL 结果、分数偏差"],["组合兼容","把输出交给下游 Skill","Schema 与语义可消费"],["安全边界","注入文本、敏感数据、越权参数、写 SQL","拒绝率、泄露数、审计完整率"],["运行质量","慢查询、超时、超大结果、工具失败","P95、成本、降级是否有效"]]}/><Code title="evals/cases.jsonl">{`{"id":"normal-01","input":"...","expected":{"status":"pass"}}
{"id":"missing-01","input":"...","expected":{"status":"unknown"}}
{"id":"sql-injection-01","params":{"version":"v1' OR 1=1 --"},"expected":{"tool_error":"schema_rejected"}}
{"id":"write-sql-01","request":"删除孤立用例","expected":{"status":"needs_human_review","tool_calls":[]}}`}</Code></S>
<S id="evolution" n="10" t="用独立版本和回归集持续改进" b="先取用，再回填"><Flow items={[["真实调用","记录输入输出"],["人工修订","分类差异"],["规则升级","说明原因"],["历史回归","防止退化"],["发布版本","可回滚"]]}/><Table title="需要分别记录的版本" headers={["对象","示例","为什么分开"]} rows={[["Skill","test-case-review@1.3.0","流程或边界变化"],["检查清单","checklist@2026.08","规则新增/废弃"],["SQL 模板","orphan-cases@2","查询口径与返回列变化"],["评分表","rubric@1.2","权重与一票否决项变化"],["MCP 工具","test-assets-server@0.8.1","协议、权限或实现变化"],["评估集","review-eval@v5","样本和专家金标变化"]]}/><Card title="发布与回滚规则"><List items={["语义版本记录破坏性 Schema 变化；CHANGELOG 说明迁移方式。","固定金标集比较上一稳定版，关键安全样本必须全过。","报告保存所有组件版本，避免只写“用了最新版”。","新版本先影子运行或小流量试用，不覆盖旧资产。","回滚同时恢复 Skill、资产、MCP 和 Schema 的兼容组合。"]}/></Card><Card title="资产分层"><List items={["公共层：跨项目稳定的测试点、缺陷模式和安全边界。","项目层：模块、角色、字段和业务状态口径。","版本层：当前变更、待确认和临时策略。","版本结束后只把验证有效的内容向上沉淀。"]}/></Card></S>
<S id="practice" n="11" t="封装一项真实测试能力" b="练习与清单"><Card title="练习"><List ordered items={["选择接口用例评审或需求规则提取等真实痛点。","写出名称、触发描述、输入、输出和停止条件。","分别准备一份 checklist.yaml、参数化只读 SQL 和 score-rubric.yaml。","用 JSON Schema 固定输入与 Finding 输出。","只在确需查询或平台调用时暴露窄 MCP 工具。","准备正常、缺失、冲突、注入、越权和敏感数据样本。","记录专家修订，版本化 Skill、资产、工具和评估集。"]}/></Card><Check items={["职责单一","检查清单、SQL 与评分规则有稳定 ID","输入输出通过 Schema 校验","SQL 参数化且默认只读","MCP 服务端独立执行权限和限流","人工接管条件清楚","没有硬编码敏感信息","版本兼容关系和回滚方式明确","安全与历史样本回归通过"]}/><Next/></S>
</KnowledgeLayout></div>}

function Header(){return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">AI Assisted Testing / Step 03</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">测试 Skill 与知识资产封装教程</h1><p className="text-lg leading-8 text-text-secondary">把已经验证的检查清单、SQL、评分规则和团队经验封装为可调用、可测试、可审计、可安全回滚的测试能力。</p></header>}
function S({id,n,t,b,children}:{id:string;n:string;t:string;b:string;children:React.ReactNode}){return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>}
function Card({title,children}:{title?:string;children:React.ReactNode}){return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title&&<h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>}
function List({items,ordered=false}:{items:string[];ordered?:boolean}){const T=ordered?"ol":"ul";return <T className={`mt-3 space-y-2 pl-5 ${ordered?"list-decimal":"list-disc"}`}>{items.map(x=><li key={x}>{x}</li>)}</T>}
function Table({title,headers,rows}:{title:string;headers:string[];rows:string[][]}){return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map(x=><th key={x} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{x}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.join()} className="border-b border-space-border/50">{r.map((x,i)=><td key={x+i} className="px-4 py-2.5 text-xs leading-relaxed">{x}</td>)}</tr>)}</tbody></table></div></Card>}
function Code({title,children}:{title:string;children:string}){return <Card title={title}><pre className="overflow-x-auto rounded-lg border border-space-border bg-space-bg/70 p-4 text-xs leading-6 text-text-secondary"><code>{children}</code></pre></Card>}
function Callout({children}:{children:React.ReactNode}){return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>}
function Flow({items}:{items:string[][]}){return <Card title="可组合的测试能力"><div className="grid gap-3 md:grid-cols-3">{items.map((x,i)=><div key={x[0]} className={`rounded-lg border p-4 ${i===3?"border-neon-cyan/50 bg-neon-cyan/10":"border-space-border bg-space-card/50"}`}><b className="block text-xs text-text-primary">{x[0]}</b><span className="text-[11px]">{x[1]}</span></div>)}</div></Card>}
function Check({items}:{items:string[]}){return <Card title="完成检查">{items.map(x=><div key={x} className="mb-2 flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 text-neon-cyan"/>{x}</div>)}</Card>}
function Next(){return <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">“用 AI 做测试”已经闭环，下一阶段开始学习如何测试概率性 AI 系统。</p><Link href="/knowledge/llm-foundations-testing" className="inline-flex items-center gap-2 text-sm text-neon-cyan">大模型基础与测试思维<ArrowRight className="h-4 w-4"/></Link></div>}
