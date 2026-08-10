import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "大模型基础与测试思维教程",
  description: "从 Token、上下文、采样参数和模型组合边界出发，学习概率性 AI 系统的失败分类、测试预言、可复现实验和最小评估集。",
  path: "/knowledge/llm-foundations-testing",
  tags: ["大模型测试", "AI测试思维", "Token", "概率性系统", "评估集"],
});

const sections: SectionItem[] = [
  { id: "difference", label: "测试思维" },
  { id: "system", label: "系统组成" },
  { id: "tokens", label: "Token与上下文" },
  { id: "sampling", label: "采样与随机性" },
  { id: "failures", label: "失败分类" },
  { id: "oracle", label: "如何断言" },
  { id: "reproduce", label: "可复现实验" },
  { id: "starter", label: "最小评估集" },
  { id: "practice", label: "练习与检查" },
];

export default function LlmFoundationsTestingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回 AI 测试成长路线</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索 Token、上下文、采样、断言与评估集...">
      <Header />
      <S id="difference" n="01" t="AI 测试不是把 expected 写得更模糊" b="从单点断言到质量证据">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="确定性系统"><p>同一输入通常对应明确状态、字段或数据结果。失败时可以直接比较 actual 与 expected。</p></Card>
          <Card title="概率性 AI 系统"><p>措辞和步骤可能变化，但事实、业务约束、安全边界与任务目标仍必须稳定满足。</p></Card>
        </div>
        <Table title="仍然可以确定性断言的部分" headers={["对象", "可以硬断言", "需要质量评估"]} rows={[
          ["接口与工具", "Schema、权限、参数、状态和副作用", "工具选择是否合理"],
          ["RAG", "文档版本、租户过滤、引用 ID", "召回相关性与回答忠实度"],
          ["模型回答", "禁用内容、必需字段、事实约束", "完整性、表达质量与帮助程度"],
          ["运行过程", "超时、预算、重试和日志字段", "用户体验与人工接管时机"],
        ]} />
        <Callout>概率性不等于无法测试。正确做法是把硬约束、质量维度、风险样本和人工裁决拆开，而不是只问“回答看起来对不对”。</Callout>
      </S>

      <S id="system" n="02" t="先识别被测的是哪一层" b="模型只是系统的一部分">
        <Flow items={[["业务输入", "用户与场景"], ["上下文", "Prompt / RAG"], ["模型", "生成与推理"], ["工具", "查询与副作用"], ["业务结果", "回答、状态、审计"]]} />
        <Table title="一次失败可能来自不同组件" headers={["现象", "可能来源", "先看什么证据"]} rows={[
          ["回答引用旧政策", "索引未更新、版本过滤错误、模型未使用证据", "knowledge_version、召回结果、引用映射"],
          ["Agent 给出正确解释但创建错工单", "工具参数或身份绑定错误", "工具轨迹、actor、argument digest"],
          ["同一问题偶发编造数值", "上下文缺证据、采样波动或停止条件缺失", "输入证据、参数、重复运行分布"],
          ["升级模型后成本翻倍", "分词、输出长度、工具循环或重试变化", "Token、调用次数、模型与 Prompt 版本"],
        ]} />
      </S>

      <S id="tokens" n="03" t="Token 和上下文窗口决定模型实际看到了什么" b="不是字符数">
        <Card title="三个容易误判的事实"><List items={[
          "Token 是模型处理文本的单位，同样字数在不同模型和语言中消耗不同。",
          "上下文窗口包含系统规则、用户输入、历史消息、检索结果、工具结果和预留输出。",
          "超过预算时，系统可能截断、摘要或丢弃内容；测试必须知道优先保留了什么。",
        ]} /></Card>
        <Table title="上下文边界用例" headers={["当……时", "应该验证"]} rows={[
          ["当前规则与旧版本同时出现", "当前证据优先，历史材料只用于提示风险"],
          ["长对话需要压缩", "身份、已确认事实和审批状态不能被摘要改写"],
          ["检索结果超过预算", "按相关性和权限裁剪，不能静默丢掉关键证据"],
          ["输出接近长度上限", "结构完整或明确失败，半截结果不能进入正式资产"],
        ]} />
      </S>

      <S id="sampling" n="04" t="采样参数改变的是输出分布" b="一次通过不等于稳定">
        <Table title="常见参数与测试影响" headers={["因素", "影响", "测试方法"]} rows={[
          ["temperature", "输出探索程度和波动", "固定输入重复运行，比较关键约束满足率"],
          ["top_p", "候选 Token 的概率范围", "和 temperature 分开做对照，不同时乱调"],
          ["max output", "结构是否可能截断", "构造长输出，验证安全终止与恢复"],
          ["seed（若支持）", "提高实验复现能力", "记录 seed，但不把它当跨版本绝对复现承诺"],
          ["模型版本", "能力、分词、成本和安全策略变化", "任何版本变化都重跑锁定评估集"],
        ]} />
        <Code title="一次评估运行必须保存的版本">{`run_id: eval-20260810-014
model: provider/model@version
prompt: customer-assistant@1.4.0
knowledge: policy-index@2026-08-10
tools: after-sale-mcp@2.3.1
parameters: { temperature: 0.2, top_p: 0.9, max_output_tokens: 1600 }
dataset: after-sale-eval@v5`}</Code>
      </S>

      <S id="failures" n="05" t="先给失败分类，才能找到正确控制点" b="相同错答可能不同根因">
        <Table title="AI 系统失败地图" headers={["类别", "典型表现", "优先修复位置"]} rows={[
          ["输入失败", "文档漏页、需求冲突、上下文污染", "解析、证据优先级与停止条件"],
          ["检索失败", "漏召、噪声、旧版本、跨租户证据", "Chunk、索引、过滤与重排"],
          ["生成失败", "事实错误、遗漏、拒答错误、格式破坏", "模型、Prompt、输出契约与评估集"],
          ["工具失败", "选错工具、参数串用、重复副作用", "Schema、鉴权、幂等与审批"],
          ["安全失败", "提示注入、越权、泄漏和规则绕过", "确定性策略、沙箱和红队回归"],
          ["运行失败", "P95 变慢、Token 激增、队列失控", "限流、缓存、降级与可观测性"],
        ]} />
      </S>

      <S id="oracle" n="06" t="用四类测试预言判断输出" b="不要只依赖模型打分">
        <Table title="测试预言组合" headers={["预言", "适合判断", "示例"]} rows={[
          ["确定性规则", "Schema、枚举、金额、权限和禁用动作", "退款金额不得超过实付"],
          ["关键点金标", "必须覆盖和不可接受错误", "必须检查订单归属与重复回调"],
          ["关系/变形断言", "没有唯一措辞但关系应稳定", "只改变用户名不应改变政策结论"],
          ["人工 Rubric", "业务价值、完整性和解释质量", "两名审核者按统一维度独立裁决"],
        ]} />
        <Callout>LLM-as-a-Judge 可以承担规模化初筛，但评审模型、评分 Prompt 和样本也要版本化；资金、权限和隐私等高风险结论不能只由另一个模型放行。</Callout>
      </S>

      <S id="reproduce" n="07" t="把一次聊天变成可复现实验" b="输入、版本、轨迹都留证据">
        <Flow items={[["冻结输入", "样本与证据"], ["记录版本", "模型/Prompt/知识"], ["重复运行", "观察分布"], ["分类失败", "定位控制点"], ["发布或回退", "保留差异"]]} />
        <Card title="最小实验纪律"><List items={[
          "开发集用于调试，锁定回归集不得反复拿来调 Prompt。",
          "每次只改变一个主要因素，避免模型、Prompt、索引同时变化后无法归因。",
          "报告分桶结果与最差样本，不用平均分掩盖 P0 失败。",
          "保存原始输出、工具轨迹和机器检查；展示时再脱敏。",
          "无法复现的线上失败进入挑战集，并记录当时版本和环境。",
        ]} /></Card>
      </S>

      <S id="starter" n="08" t="先做 20 条最小评估集" b="小而能暴露风险">
        <Table title="售后助手起步分层" headers={["样本桶", "数量", "重点"]} rows={[
          ["正常任务", "4", "事实、步骤和完成条件"],
          ["信息缺失", "3", "询问澄清，不猜数值"],
          ["边界与冲突", "4", "状态、金额、来源冲突"],
          ["检索与版本", "3", "正确证据、引用和知识更新"],
          ["工具与权限", "3", "身份绑定、参数和审批"],
          ["安全与故障", "3", "注入、超时、限流和安全降级"],
        ]} />
        <Card title="完成标准"><p>每条样本都包含输入、初始状态、必须满足、禁止发生、证据版本和失败严重度。它不是完整评估体系，而是进入下一篇教程前可以亲手跑通的最小基线。</p></Card>
      </S>

      <S id="practice" n="09" t="建立自己的第一份 AI 测试基线" b="练习与检查">
        <Card title="练习"><List ordered items={[
          "画出一个 AI 功能从输入、上下文、模型、工具到业务结果的链路。",
          "列出其中仍可使用确定性断言的接口、权限、状态和副作用。",
          "准备 20 条分层样本，并为高风险样本写 must_cover 与 must_not。",
          "固定模型、Prompt、知识、工具和参数版本，重复运行并记录分布。",
          "把失败归入输入、检索、生成、工具、安全或运行层，再决定修复位置。",
        ]} /></Card>
        <Check items={["知道模型不是完整系统", "能区分硬断言和质量评估", "理解上下文截断风险", "不把一次输出当稳定结论", "失败有分类而非只记错答", "实验版本可追溯", "锁定集与开发集分开"]} />
        <Next />
      </S>
    </KnowledgeLayout>
  </div>;
}

function Header() { return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Phase 01 / AI Quality Foundation 01</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">大模型基础与测试思维教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">不从模型术语背诵开始，而是先学会辨认系统边界、稳定约束和失败证据，把概率输出变成可以评估、复现和回归的质量对象。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>9 个章节</span><span>概率输出 + 硬约束</span><span>最小评估集</span></div></header>; }
function S({ id, n, t, b, children }: { id: string; n: string; t: string; b: string; children: React.ReactNode }) { return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={`mt-3 space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join()} className="border-b border-space-border/50">{row.map((cell, index) => <td key={cell + index} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function Code({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Flow({ items }: { items: string[][] }) { return <Card title="AI 系统质量链"><div className="grid gap-2 md:grid-cols-9 md:items-center">{items.map((item, index) => <div className="contents" key={item[0]}><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><b className="block text-xs text-text-primary">{item[0]}</b><span className="text-[11px]">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></Card>; }
function Check({ items }: { items: string[] }) { return <Card title="完成检查">{items.map((item) => <div key={item} className="mb-2 flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />{item}</div>)}</Card>; }
function Next() { return <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">下一步：把评估集、人工金标、机器检查和版本回归组成完整体系。</p><Link href="/knowledge/ai-application-testing-system" className="inline-flex items-center gap-2 text-sm text-neon-cyan">AI 应用测试体系教程<ArrowRight className="h-4 w-4" /></Link></div>; }
