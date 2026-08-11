import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "测试工程师需要的机器学习与统计基础教程",
  description: "以智能客服工单分类与回答评估为案例，掌握混淆矩阵、Precision/Recall/F1、准确率陷阱、类别不平衡、置信区间、抽样、A/B 显著性、标注者一致性与 LLM Grader 偏差，把 AI 质量判断建立在可计算的证据上。",
  path: "/knowledge/ml-statistics-for-test-engineers",
  tags: ["机器学习", "统计", "混淆矩阵", "Precision", "Recall", "F1", "评估指标", "Cohen's Kappa"],
});

const sections: SectionItem[] = [
  { id: "case", label: "案例与目标" },
  { id: "problem-types", label: "分类回归聚类" },
  { id: "confusion", label: "混淆矩阵" },
  { id: "prf", label: "PRF 选择" },
  { id: "accuracy-trap", label: "准确率陷阱" },
  { id: "distribution", label: "均值与分布" },
  { id: "sampling", label: "样本与抽样" },
  { id: "ab-test", label: "A/B 与显著性" },
  { id: "agreement", label: "标注一致性" },
  { id: "grader-bias", label: "Grader 偏差" },
  { id: "version-compare", label: "版本对比上线" },
  { id: "practice", label: "练习与检查" },
];

export default function MlStatisticsForTestEngineersPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge/tutorials?track=ai-testing" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回 AI 测试成长路线</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索混淆矩阵、PRF、置信区间、抽样、Kappa、Grader 偏差...">
      <Header />
      <S id="case" n="01" t="先把「懂概念」升级成「能科学评估」" b="智能客服贯穿案例">
        <Card title="案例：智能客服工单分类与回答评估"><p>系统做两件事：把工单自动分类到退款、物流、账号或咨询，并生成回复客户的回答。你负责回答「新版模型能不能上线」——业务方甩给你一句话：准确率 95%，应该没问题吧？</p></Card>
        <Flow items={[["原始工单", "文本与字段"], ["分类模型", "退款/物流/账号/咨询"], ["回答模型", "生成回复"], ["人工复核", "抽样与仲裁"], ["上线决策", "灰度或回退"]]} />
        <Callout>准确率 95% 本身不能回答任何问题。这篇教程的任务，是让你能说出「用什么样本、按什么指标、在多大置信下、由谁复核」，并最终产出一份可决策的版本对比报告。</Callout>
        <Table title="学完后的六份产出" headers={["产出", "对应章节"]} rows={[
          ["分层评估样本（含分布说明）", "样本量与抽样"],
          ["一张混淆矩阵", "混淆矩阵"],
          ["一套 Precision / Recall / F1 指标", "PRF 选择"],
          ["一份人工标注一致性报告", "标注者一致性"],
          ["一份模型 A/B 版本对比报告", "A/B 与显著性"],
          ["一个上线、灰度或回退结论", "版本对比与上线"]]
        } />
      </S>

      <S id="problem-types" n="02" t="先分清问题类型，再选评估指标" b="分类 / 回归 / 聚类">
        <Table title="三类问题的区别" headers={["类型", "输出", "智能客服例子", "评估指标"]} rows={[
          ["分类", "离散类别", "工单分到退款/物流/账号/咨询", "混淆矩阵、Precision、Recall、F1"],
          ["回归", "连续数值", "预测退款金额、回答延迟、等待时长", "MAE、RMSE、P95"],
          ["聚类", "无标签分组", "把相似问题聚成主题，发现新客诉模式", "轮廓系数、ARI、纯度"],
        ]} />
        <Card title="对测试工程师的意义"><List items={[
          "指标不能跨问题类型混用：给分类模型看 RMSE，给回归模型看 F1，都是错位的。",
          "分类是最常见也最好解释的，这篇教程以它为主；回归至少要知道用 MAE/RMSE 而不是准确率。",
          "聚类用于探索，不直接回答「对不对」，而是回答「分组是否稳定、是否可解释」。",
        ]} /></Card>
        <Callout>拿到一个 AI 需求，第一步是问「它是分类、回归还是聚类」。这个问题决定了后面所有指标和断言怎么写。</Callout>
      </S>

      <S id="confusion" n="03" t="用混淆矩阵同时看错判和漏判" b="把准确率拆开">
        <Card title="二分类混淆矩阵（以「退款工单」为正类）"><p>分类器每一条预测都会落入四个格子：真正例 TP、假正例 FP（误报）、假负例 FN（漏报）、真负例 TN。只看准确率，这四个格子的差异会被总数抹平。</p></Card>
        <Table title="100 条工单的预测结果" headers={["", "预测：退款", "预测：非退款"]} rows={[
          ["实际：退款", "TP = 30", "FN = 5（漏报：该退的没退）"],
          ["实际：非退款", "FP = 3（误报：不该退的退了）", "TN = 62"],
        ]} />
        <Card title="怎么读这张表"><List items={[
          "漏报（FN=5）：真实退款工单被分到其他类，客户反复追问，体验最差。",
          "误报（FP=3）：非退款工单被当成退款，可能触发错误处理流程。",
          "准确率 = (30+62)/100 = 92%，看不出这两类错误的代价差异。",
        ]} /></Card>
        <Card title="多分类怎么办"><p>工单有四个类别时，逐类做 one-vs-rest：把「退款」当正类、其余三类当负类，得到退款类的混淆矩阵；其他类别同理。每一类单独看，而不是只看总准确率。</p></Card>
      </S>

      <S id="prf" n="04" t="Precision、Recall、F1 按业务代价选择" b="不是越高越好">
        <Card title="两个指标的定义"><p>Precision = TP / (TP + FP)：预测为退款的人里，有多少真退。Recall = TP / (TP + FN)：真实退款里，有多少被找出来。F1 是两者的调和平均，用于给一个综合分。</p></Card>
        <Table title="智能客服里的取舍" headers={["场景", "优先指标", "为什么"]} rows={[
          ["自动退款", "Precision", "误报直接造成资金损失，宁可漏给人工"],
          ["高危工单识别", "Recall", "漏报导致事故升级，宁可多召回让人工筛"],
          ["通用报告", "F1", "没有明确倾向时给一个平衡数"],
          ["路由到人工", "Recall", "错误路由可接受，漏路由不可接受"],
        ]} />
        <Code title="用 sklearn 算三件套">{`from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

y_true = [1, 1, 0, 1, 0, 0, 1, 1, 0, 0]   # 1=退款工单
y_pred = [1, 0, 0, 1, 0, 1, 1, 1, 0, 0]

tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
print("TP", tp, "FP", fp, "FN", fn, "TN", tn)
print("Precision", round(precision_score(y_true, y_pred), 3))
print("Recall", round(recall_score(y_true, y_pred), 3))
print("F1", round(f1_score(y_true, y_pred), 3))`}</Code>
        <Callout>报告必须写清「按哪个类别、以什么为正类、阈值是多少」。同样的模型，阈值一改，Precision 和 Recall 会此消彼长，F1 也会跟着变。</Callout>
      </S>

      <S id="accuracy-trap" n="05" t="准确率 95% 也可能毫无意义" b="类别不平衡与阈值">
        <Card title="为什么 95% 是陷阱"><p>如果 99% 的工单都是「咨询」，模型把一切都判成「咨询」，准确率就是 99%。它什么都没学会，但数字很好看。类别越不平衡，准确率越会骗人。</p></Card>
        <Table title="应对类别不平衡" headers={["手段", "做法", "注意"]} rows={[
          ["换指标", "用每类 Precision/Recall/F1 和混淆矩阵", "不要只看总体准确率"],
          ["按类别加权", "F1 macro / weighted 反映小类别", "macro 平均每类权重，weighted 按样本数"],
          ["调阈值", "对少数类降低判定阈值提高 Recall", "阈值改变要重新评估误报成本"],
          ["补样本", "扩充少数类样本，必要时做类内分层", "不能凭空造数据掩盖分布"],
        ]} />
        <Code title="观察阈值影响">{`from sklearn.metrics import precision_recall_curve

# 模型输出每个样本属于"退款"的概率，而不是直接给类别
proba = model.predict_proba(X)[:, 1]
precision, recall, thresholds = precision_recall_curve(y_true, proba)

# 找 Recall >= 0.95 的最高 Precision 阈值
for p, r, t in zip(precision, recall, thresholds):
    if r >= 0.95:
        print("阈值", round(t, 3), "Precision", round(p, 3), "Recall", round(r, 3))`}</Code>
        <Callout>报告指标时必须同时报告类别分布。没有分布背景的准确率，不具备任何决策价值。</Callout>
      </S>

      <S id="distribution" n="06" t="均值、P95、方差和置信区间分开看" b="平均数会骗人">
        <Card title="回答延迟的三种读法"><p>均值回答延迟 1.2 秒听起来不错；但如果 5% 的请求要 8 秒，长尾客户体验已经崩了。均值被少数慢请求拉高或掩盖，P95 专门盯长尾，方差描述波动大小。</p></Card>
        <Table title="四个统计量各回答什么问题" headers={["统计量", "回答", "在客服评估里的用法"]} rows={[
          ["均值", "整体水平", "平均回答延迟、平均评分"],
          ["P95 / P99", "长尾与最差体验", "5% 最慢请求多慢、99% 请求是否达标"],
          ["方差/标准差", "波动是否稳定", "同一输入多次生成的评分漂移"],
          ["置信区间", "样本估计的可信范围", "评估集 200 条算出的 F1，真实值可能在哪个区间"],
        ]} />
        <Code title="用 numpy 计算分布">{`import numpy as np

delays = [0.8, 1.1, 1.0, 1.3, 0.9, 1.2, 9.5, 1.0, 1.1, 0.7, 8.2, 1.2]
arr = np.array(delays)
print("mean", round(arr.mean(), 2))      # 被长尾拉高的均值
print("p50 ", round(np.percentile(arr, 50), 2))
print("p95 ", round(np.percentile(arr, 95), 2))
print("std ", round(arr.std(), 2))`}</Code>
        <Card title="置信区间怎么理解"><p>评估集只有 200 条时，F1=0.87 的 95% 置信区间可能宽达 ±0.05；样本量到 2000 条才会明显收窄。报告指标时附带区间，才能避免「0.87 比 0.85 高所以更好」这种误判。</p></Card>
      </S>

      <S id="sampling" n="07" t="评估样本要能代表真实分布" b="样本量与分层抽样">
        <Card title="为什么不能随手抽 50 条"><p>样本量太小，指标波动大、置信区间宽，任何「提升」都可能只是抽样噪声。而随机抽样只保证总体随机，不保证覆盖每个类别和风险桶——高风险的退款工单可能一条都没抽到。</p></Card>
        <Table title="分层抽样维度（智能客服）" headers={["分层维度", "原因", "建议"]} rows={[
          ["工单类别", "退款/物流/账号/咨询比例差异大", "每类至少 20～30 条，小类刻意多抽"],
          ["难度", "简单问题掩盖复杂问题", "难样本单独一桶，指标分别计算"],
          ["来源渠道", "App、网页、电话的话术和噪声不同", "按渠道比例抽样，或至少记录渠道"],
          ["语言与方言", "不同语言回答质量差异明显", "覆盖主要语言，单独看指标"],
        ]} />
        <Card title="样本量经验"><List items={[
          "做整体评估：200～500 条起步，能覆盖主要类别和常见失败。",
          "比较两个模型版本：按预期差异大小确定样本量，差异越小需要的样本越多。",
          "每类小样本（&lt;30）的指标要标注「不稳定」，不参与上线对比。",
        ]} /></Card>
        <Callout>评估集本身也是要版本化的测试资产：样本、标签、模型、Prompt 和阈值一起冻结，才谈得上「可回归、可对比」。</Callout>
      </S>

      <S id="ab-test" n="08" t="A/B 对比要区分真差异和噪声" b="显著性判断">
        <Card title="场景：新旧模型对比"><p>新模型在 300 条评估集上 F1=0.91，旧模型 F1=0.89。能不能说新模型更好？不能——如果样本是同一批、评估方式相同，2 个点的差距可能来自少量样本波动，需要看它是否显著。</p></Card>
        <Table title="判断差异是否可信" headers={["检查", "做法", "结论可信的条件"]} rows={[
          ["同一评估集", "新旧模型跑完全相同样本", "样本、标签、版本一致"],
          ["置信区间", "分别算 F1 的 95% 区间", "区间不重叠，或差异大于合并误差"],
          ["逐条对比", "配对查看哪些样本变了", "差异集中在可解释的样本上"],
          ["稳定性", "多次重复运行看波动", "波动远小于两个版本的差距"],
        ]} />
        <Card title="显著性检验怎么用"><p>连续指标（延迟、评分）可用配对 t 检验；分类正确与否可用 McNemar 检验比较两个模型在同一批样本上的差异。测试工程师至少要能读懂 p 值：p &lt; 0.05 意味着「纯靠偶然得到这个差异的概率小于 5%」，但不能把 p 值当唯一依据——样本是不是有代表性、差异在业务上有没有意义，同样重要。</p></Card>
        <Callout>写对比结论的固定句式：在 X 条分层样本、同一评估流程下，新模型 F1 比旧模型高 Δ（95% CI: a~b），其中提升主要来自哪几类样本；先灰度到 5% 流量观察线上表现，再决定全量。</Callout>
      </S>

      <S id="agreement" n="09" t="人工金标也要证明自己可靠" b="标注者一致性与 Kappa">
        <Card title="问题：金标本身可能不一致"><p>两位标注者对同一条回答，一个判「合格」一个判「不合格」。如果标注员之间都吵不清楚，拿什么当 Ground Truth 去评估模型？</p></Card>
        <Code title="Cohen's Kappa 手工计算">{`# 两位标注者对 100 条样本的分类结果
# observed agreement = 实际一致的比例
agreed = 82
total = 100
p_observed = agreed / total

# expected agreement = 偶然也会一致的比例（按双方各标签比例推算）
# 假设：A 判"合格"70 条、B 判"合格"76 条
pA = 70 / 100
pB = 76 / 100
p_expected = pA * pB + (1 - pA) * (1 - pB)

kappa = (p_observed - p_expected) / (1 - p_expected)
print("observed", p_observed, "expected", round(p_expected, 3))
print("kappa", round(kappa, 3))`}</Code>
        <Table title="Kappa 怎么解读" headers={["区间", "含义", "处理"]} rows={[
          ["< 0.2", "一致性差", "标注规范有问题，先修规范再标"],
          ["0.2 ~ 0.4", "一般", "对分歧样本逐条讨论，明确边界"],
          ["0.4 ~ 0.6", "中等", "可接受，但高风险桶要双人复核"],
          ["0.6 ~ 0.8", "好", "常规评估可用，分歧走仲裁"],
          ["> 0.8", "很好", "金标可信，进入自动化回归"],
        ]} />
        <Card title="落地流程"><List items={[
          "双人独立标注同一批样本，不互相看结果。",
          "计算 Kappa，分歧样本进入仲裁或标注规范修订。",
          "规范修订后重新标注分歧子集，确认 Kappa 提升。",
          "把标注规范、Kappa 值和仲裁记录随评估集一起版本化。",
        ]} /></Card>
      </S>

      <S id="grader-bias" n="10" t="LLM Grader 也有系统性偏差" b="机器评审的陷阱">
        <Card title="Grader 是什么"><p>用另一个模型（LLM-as-a-Judge）给回答打分，是规模化评估的常用手段。但它不是中立仪器，会有一致的、可复现的偏差——这正是测试要抓的。</p></Card>
        <Table title="三类常见 Grader 偏差" headers={["偏差", "表现", "缓解手段"]} rows={[
          ["位置偏差", "列表里靠前的答案更容易得高分", "随机打乱候选顺序，多次取平均"],
          ["长度偏差", "写得更长的答案得分更高", "限制输出长度，或按长度分层统计"],
          ["自我偏好", "评审模型与自己同源的答案更宽容", "换一家评审模型交叉验证，关键样本人工复核"],
        ]} />
        <Card title="验证 Grader 是否可信"><List items={[
          "抽取 50 条，让 Grader 和人工各自打分，计算一致性（Kappa）。",
          "Grader 与人工一致性低的维度，不能自动放行，必须抽样人工复核。",
          "评审模型、评分 Prompt、打分维度都要版本化，和被测模型一样管理。",
          "资金、权限、隐私相关结论不做 Grader 自动放行。",
        ]} /></Card>
        <Callout>Grader 偏差不解决，后面所有指标都是「评审模型的偏好」而不是「回答质量」。先把 Grader 校准好，再谈规模化评估。</Callout>
      </S>

      <S id="version-compare" n="11" t="模型版本对比要能给出上线结论" b="灰度、全量或回退">
        <Flow items={[["冻结评估集", "样本与版本"], ["双跑打分", "新旧模型"], ["分层看差异", "指标与最差样本"], ["人工复核", "高风险桶"], ["决策", "上线/灰度/回退"]]} />
        <Table title="版本对比报告模板" headers={["区块", "内容", "决策依据"]} rows={[
          ["评估设置", "评估集版本、样本量、分层、阈值、Grader", "设置不同则不可比"],
          ["总体指标", "新旧模型各指标与置信区间", "差异是否超过区间误差"],
          ["按风险桶", "退款、高危、多语言等子集指标", "高风险桶不能回退"],
          ["最差样本", "新模型明显变差的样本清单", "失败模式是否可解释、可拦截"],
          ["成本与延迟", "Token、P95 延迟、调用次数", "质量提升是否值得成本增加"],
        ]} />
        <Card title="三种结论的写法"><List items={[
          "上线：指标提升且置信区间不重叠，高风险桶无回退，人工复核通过。",
          "灰度：总体有提升但部分桶存疑，先 5% 流量观察线上告警与客诉。",
          "回退：关键桶明显变差或无法解释，保留旧版本并记录回退触发条件。",
        ]} /></Card>
        <Callout>上线结论不是「新模型更好」，而是一份可复现的证据包：什么样本、什么指标、什么版本、谁复核、观察多久、什么条件下回退。</Callout>
      </S>

      <S id="practice" n="12" t="完成一套完整的评估闭环" b="练习与检查">
        <Card title="练习：给智能客服做一个版本评估"><List ordered items={[
          "从真实工单中按类别和难度分层抽取 100 条，记录每桶样本数。",
          "双人独立标注 30 条，计算 Cohen's Kappa，低于 0.6 先修订规范。",
          "在新旧模型上分别跑同一批样本，画混淆矩阵并计算每类 PRF。",
          "报告均值、P95、置信区间，检查差异是否超过区间误差。",
          "用 LLM Grader 打分后，与人工对比一致性；发现偏差则调整评审方式。",
          "输出版本对比报告，给出上线、灰度或回退结论。",
        ]} /></Card>
        <Check items={["能区分分类、回归、聚类及各自指标", "会画并解读混淆矩阵", "知道按业务代价选择 Precision/Recall/F1", "能解释准确率为什么会被不平衡欺骗", "报告指标时附带分布、P95 与置信区间", "会用分层抽样构建评估样本", "不把单次差异当结论，会做显著性判断", "会计算并解读 Cohen's Kappa", "知道 LLM Grader 的三类偏差及缓解", "能给出一份可决策的上线/灰度/回退结论"]} />
      </S>
    </KnowledgeLayout>
  </div>;
}

function Header() { return <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Phase 01 / AI Quality Foundation 02</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">测试工程师需要的机器学习与统计基础教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">不从公式背诵开始，而是围绕智能客服工单分类与回答评估，学会用样本、指标、置信区间和一致性证据回答同一个问题：这个模型到底能不能上线。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>12 个章节</span><span>混淆矩阵 + PRF</span><span>统计证据与上线决策</span></div></header>; }
function S({ id, n, t, b, children }: { id: string; n: string; t: string; b: string; children: React.ReactNode }) { return <section id={id} data-knowledge-section className="mb-14"><div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{n}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{t}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">{b}</span></div></div>{children}</section>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={`mt-3 space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join()} className="border-b border-space-border/50">{row.map((cell, index) => <td key={cell + index} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function Code({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-xs text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px]"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Flow({ items }: { items: string[][] }) { return <Card title="版本评估决策链"><div className="grid gap-2 md:grid-cols-11 md:items-center">{items.map((item, index) => <div className="contents" key={item[0]}><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><b className="block text-xs text-text-primary">{item[0]}</b><span className="text-[11px]">{item[1]}</span></div>{index < items.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></Card>; }
function Check({ items }: { items: string[] }) { return <Card title="完成检查">{items.map((item) => <div key={item} className="mb-2 flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />{item}</div>)}</Card>; }
