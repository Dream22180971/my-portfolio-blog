import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, GitBranch } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "服务链路自动化测试实战教程",
  description: "从单接口测试升级为跨服务业务链路测试：链路建模、数据流转、状态验证、幂等与异常恢复，以及链路测试的自动化与报告。",
  path: "/knowledge/service-chain-testing",
  tags: ["服务链路", "接口测试", "微服务", "状态流转", "自动化测试"],
});

const sections: SectionItem[] = [
  { id: "why", label: "为什么测链路" }, { id: "modeling", label: "链路建模" },
  { id: "upgrade", label: "从单接口到链路" }, { id: "state", label: "状态与幂等" },
  { id: "recovery", label: "异常与补偿" }, { id: "automation", label: "自动化与报告" },
  { id: "interop", label: "与数据/OCR 测试衔接" }, { id: "practice", label: "练习与检查" },
];

const compareRows = [
  ["关注范围", "单个接口的入参与出参", "跨服务的调用、数据流转与状态"],
  ["能证明的结论", "这个服务在这个输入下行为正确", "整条业务链端到端打通且处处一致"],
  ["典型盲区", "不知道数据从哪来、往哪去", "一旦链断，立刻暴露影响面"],
  ["失败成本", "定位快，但可能掩盖串联问题", "定位稍慢，但暴露真实业务风险"],
  ["适用阶段", "每个服务自己的单元/接口测试", "回归、发布门禁、故障演练"],
];
const nodeRows = [
  ["upload", "合同上传", "文件存储 / 网关", "合同编号、文件地址、loanId", "上传完成"],
  ["ocr", "OCR 识别", "文档解析服务", "合同文本、版面坐标", "识别完成或失败"],
  ["extract", "字段抽取", "AI 抽取服务", "借款人、金额、期限、利率", "抽取完成或拒绝"],
  ["review", "审核决策", "风控规则 + 人工", "审核意见、通过或拒绝", "已通过 / 已拒绝"],
  ["store", "数据入库", "信贷核心", "贷款记录、授信额度", "已入库"],
  ["display", "结果展示", "客户端", "额度、进度、结果页", "已展示"],
];
const transitionRows = [
  ["UPLOADED", "OCR_PARSING", "合同上传成功，通知 OCR 启动"],
  ["OCR_PARSING", "EXTRACTED / OCR_FAILED", "识别完成后抽取字段，或识别失败"],
  ["EXTRACTED", "REVIEWING / REJECTED", "字段齐全进入审核，关键字段缺失则拒绝"],
  ["REVIEWING", "APPROVED / REJECTED", "规则或人工给出结论"],
  ["APPROVED", "STORED", "审批通过后写入信贷核心"],
  ["STORED", "DISPLAYED", "入库成功后对客展示"],
];
const failureRows = [
  ["OCR 识别超时", "OCR_RETRYING → EXTRACTED", "按退避策略重试，恢复后自动完成"],
  ["抽取字段缺失", "EXTRACTED → MANUAL_FILL", "降级为人工补录，补全后继续走审核"],
  ["审核服务不可用", "REVIEWING → 挂起重试", "请求排队，恢复后继续，不丢状态"],
  ["入库写库失败", "STORED → 回滚补偿", "补偿任务回滚抽取结果，回到 EXTRACTED 可重试"],
];
const viewRows = [
  ["服务链路测试", "编排视角", "整条业务链能否端到端打通、状态是否按预期流转", "链路编排、按节点断言、故障注入"],
  ["数据测试", "环节质量视角", "字段值、金额、口径是否准确一致", "数据比对、口径校验、样本对账"],
  ["OCR 文档智能测试", "环节质量视角", "合同/证件识别是否准确、字段抽取是否可靠", "样本集、准确率指标、阈值回归"],
];

export default function ServiceChainTestingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=test-development" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回测试开发工程模块</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索服务链路、状态流转、自动化测试关键词...">
      <header className="mb-10">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Test Development / Tutorial</div>
        <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">服务链路自动化测试实战教程</h1>
        <p className="mb-6 text-lg leading-8 text-text-secondary">从“单接口正确”升级到“整条业务链正确”：以金融贷款业务为贯穿案例，掌握链路建模、数据流转、状态验证、幂等与异常恢复，以及链路测试的自动化与报告。</p>
        <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>8 个章节</span><span>金融贷款业务案例</span><span>微服务链路测试</span></div>
      </header>

      <section id="why" data-knowledge-section className="mb-14">
        <SectionHeader number="01" title="为什么测服务链路而不是单接口" badge="整体正确" />
        <Card title="单接口测试只证明局部正确"><p>合同上传接口返回 200，不代表 OCR 能读到这份合同；OCR 识别成功，不代表抽取出的借款金额能写进信贷核心；审核通过了，不代表客户能在页面上看到贷款进度。每个服务“各自正确”时，链路上的数据丢失、状态漂移和顺序错乱仍然会发生——只有链路测试才能证明整条业务链真的通。</p></Card>
        <TableCard title="单接口测试 vs 链路测试" headers={["维度", "单接口测试", "链路测试"]} rows={compareRows} />
        <Callout>链路测试不是否定单接口测试，而是在它之上补上“串联视角”。发布门禁里先跑接口测试定位模块问题，再跑链路测试确认跨服务集成没有回归。</Callout>
      </section>

      <section id="modeling" data-knowledge-section className="mb-14">
        <SectionHeader number="02" title="先建模：节点、依赖、数据流与状态机" badge="建模先行" />
        <FlowFigure id="loan-chain" title="金融贷款业务链路的六个环节" items={[["合同上传", "网关接入"], ["OCR 识别", "文档解析"], ["字段抽取", "AI 服务"], ["审核决策", "风控规则"], ["数据入库", "信贷核心"], ["结果展示", "客户端"]]} />
        <Card title="每个节点都是一次可断言的状态变化"><p>建模时把链路拆成“输入 → 处理 → 输出 → 状态”，并标注每个节点依赖哪个服务、产生什么数据、失败时停在哪个状态。这张图既是测试设计蓝图，也是故障演练的故障注入清单。</p></Card>
        <TableCard title="贷款链路节点清单" headers={["节点", "职责", "依赖服务", "关键输出", "成功后状态"]} rows={nodeRows} />
        <CodeBlock title="状态机：合法迁移定义">{`# loan_status.py 状态常量与合法迁移表
UPLOADED = "UPLOADED"        # 合同已上传
OCR_PARSING = "OCR_PARSING"  # OCR 识别中
EXTRACTED = "EXTRACTED"      # 字段抽取完成
REVIEWING = "REVIEWING"      # 审核中
APPROVED = "APPROVED"        # 审核通过
STORED = "STORED"            # 已入库
DISPLAYED = "DISPLAYED"      # 已对客展示
REJECTED = "REJECTED"        # 审核拒绝

VALID_TRANSITIONS = {
    "UPLOADED": {"OCR_PARSING"},
    "OCR_PARSING": {"EXTRACTED", "OCR_FAILED"},
    "EXTRACTED": {"REVIEWING", "REJECTED"},
    "REVIEWING": {"APPROVED", "REJECTED"},
    "APPROVED": {"STORED"},
    "STORED": {"DISPLAYED"},
}`}</CodeBlock>
        <Callout>状态机是链路测试的“交通规则”。断言不再只写“返回 200”，而是写“从哪个状态迁到哪个状态”，非法迁移一出现就是必现缺陷。</Callout>
      </section>

      <section id="upgrade" data-knowledge-section className="mb-14">
        <SectionHeader number="03" title="从单接口升级到链路测试" badge="数据贯穿" />
        <FlowFigure id="upgrade-flow" title="三层升级路径" items={[["单接口用例", "验证单个服务"], ["上下文透传", "统一链路 ID"], ["链路断言", "跨节点校验"]]} />
        <Card title="测试数据要贯穿整条链"><p>单接口测试各用各的数据；链路测试必须让同一份数据流经所有环节。为每笔贷款生成全局唯一的 loanId，作为合同、OCR 结果、审核记录、入库记录的关联键；再透传 traceId，把一次请求的全部调用串成一条可检索的日志链。</p></Card>
        <CodeBlock title="chain_client.py 统一透传请求上下文">{`# 所有环节共用一个 loanId，traceId 贯穿日志
import uuid

def create_loan_id(contract_no):
    return "LOAN-" + contract_no + "-" + uuid.uuid4().hex[:8]

def build_headers(loan_id, trace_id=None):
    return {
        "X-Loan-Id": loan_id,
        "X-Trace-Id": trace_id or uuid.uuid4().hex,
    }

class ChainClient:
    def __init__(self, base_url, loan_id):
        self.base_url = base_url
        self.headers = build_headers(loan_id)

    def upload_contract(self, file_name):
        return self._post("/v1/contracts/upload", {"file": file_name})

    def ocr_result(self):
        return self._get("/v1/contracts/ocr")

    def approve(self):
        return self._post("/v1/loans/review", {"decision": "APPROVE"})

    def _post(self, path, body):
        return requests.post(self.base_url + path, json=body, headers=self.headers)`}</CodeBlock>
        <CodeBlock title="conftest.py 链路级 Fixture">{`import pytest

@pytest.fixture
def loan_flow(chain_client_factory):
    client = chain_client_factory(create_loan_id("2025-0001"))
    yield client
    client.archive_loan()  # 精确清理，避免污染下次运行

def test_上传后OCR能识别同一份合同(loan_flow):
    upload = loan_flow.upload_contract("sample_contract.pdf")
    assert upload.json()["loanId"] == loan_flow.headers["X-Loan-Id"]

    parsed = loan_flow.wait_status("EXTRACTED", timeout=30)
    assert parsed["borrowerName"]          # 借款人字段非空
    assert parsed["loanAmount"] > 0        # 金额为正数`}</CodeBlock>
        <Callout>链路测试的失败证据要有“案发现场”：loanId、traceId、当前状态、期望状态、关键响应体，缺一不可。否则报告里只有一个红灯，谁也查不动。</Callout>
      </section>

      <section id="state" data-knowledge-section className="mb-14">
        <SectionHeader number="04" title="链路状态与幂等验证" badge="合法迁移" />
        <TableCard title="贷款链路的合法状态迁移" headers={["当前状态", "下一状态", "触发条件"]} rows={transitionRows} />
        <CodeBlock title="断言状态按合法方向迁移">{`def test_状态只能按合法方向迁移(loan_flow):
    assert loan_flow.status() == "UPLOADED"

    loan_flow.start_ocr()
    assert loan_flow.status() == "OCR_PARSING"

    loan_flow.finish_extract()
    assert loan_flow.status() == "EXTRACTED"

    # 非法迁移：EXTRACTED 不允许直接跳到 STORED
    resp = loan_flow.force_store()
    assert resp.json()["businessCode"] == "ILLEGAL_TRANSITION"
    assert loan_flow.status() == "EXTRACTED"`}</CodeBlock>
        <CodeBlock title="重复提交与回调幂等">{`def test_重复上传同一合同只创建一个记录(loan_flow):
    first = loan_flow.upload_contract("sample_contract.pdf")
    second = loan_flow.upload_contract("sample_contract.pdf")
    assert first.status_code == 200
    assert second.status_code == 200
    assert second.json()["businessCode"] == "DUPLICATE_IGNORED"
    assert loan_flow.contract_count() == 1

def test_OCR回调重复到达只更新一次(loan_flow):
    loan_flow.start_ocr()
    payload = {"loanId": loan_flow.headers["X-Loan-Id"],
               "fields": {"borrowerName": "张三", "loanAmount": 100000}}
    for _ in range(3):
        loan_flow.callback_ocr(payload)
    result = loan_flow.ocr_result()
    assert result["version"] == 1          # 版本只递增一次`}</CodeBlock>
        <Card title="并发场景不能漏"><BulletList items={["同一合同并发提交两次上传，链路只生成一份记录。", "OCR 回调与审核请求并发到达，状态按串行化规则收敛。", "重复审核同一贷款，只产生一次审批结论。", "幂等键要覆盖业务主键与回调序号两层，避免张冠李戴。"]} /></Card>
      </section>

      <section id="recovery" data-knowledge-section className="mb-14">
        <SectionHeader number="05" title="异常、重试与补偿" badge="最终一致" />
        <FlowFigure id="recovery-flow" title="故障注入与恢复验证" items={[["发起请求", "正常输入"], ["注入故障", "超时/失败"], ["触发策略", "重试/降级/补偿"], ["验证收敛", "最终一致"]]} />
        <Card title="链路越长的系统，越要用故障证明自己会恢复"><p>单接口测试很难回答“OCR 挂了怎么办”。链路测试在特定节点注入超时、失败或服务不可用，然后断言链路进入预期的重试、降级或补偿状态，最终收敛到一致。这才是金融业务链路的可靠性证据。</p></Card>
        <TableCard title="故障场景与预期收敛" headers={["故障场景", "状态变化", "预期收敛"]} rows={failureRows} />
        <CodeBlock title="注入超时与验证重试">{`def test_OCR超时后按退避策略恢复(loan_flow):
    loan_flow.make_ocr_slow(delay=60)     # 注入 60 秒延迟
    loan_flow.start_ocr()

    assert loan_flow.wait_status("OCR_RETRYING", timeout=5)

    loan_flow.recover_ocr()               # 恢复服务
    assert loan_flow.wait_status("EXTRACTED", timeout=30)

def test_OCR降级为人工补录后仍能走到审核(loan_flow):
    loan_flow.degrade_ocr()               # 关闭自动抽取
    loan_flow.start_ocr()
    assert loan_flow.wait_status("MANUAL_FILL", timeout=10)

    loan_flow.fill_fields({"borrowerName": "张三", "loanAmount": 100000})
    assert loan_flow.wait_status("REVIEWING", timeout=10)`}</CodeBlock>
        <CodeBlock title="验证补偿与最终一致">{`def test_入库失败后补偿回滚至可重试状态(loan_flow):
    loan_flow.approve()
    loan_flow.make_store_fail(fail_once=True)

    resp = loan_flow.store()
    assert resp.json()["status"] == "STORE_FAILED"

    # 补偿任务回滚抽取结果，恢复 EXTRACTED 供再次审核
    loan_flow.run_compensation()
    assert loan_flow.wait_status("EXTRACTED", timeout=10)

    loan_flow.store()
    assert loan_flow.wait_status("STORED", timeout=10)
    assert loan_flow.status() == "STORED"`}</CodeBlock>
        <Callout>补偿验证的目标不是“永远不出错”，而是“出错了能自动收敛回一致状态”。断言里要同时写清最终状态与补偿执行记录，避免“结果看起来对了但补偿根本没跑”的假通过。</Callout>
      </section>

      <section id="automation" data-knowledge-section className="mb-14">
        <SectionHeader number="06" title="链路测试自动化与报告" badge="可重复执行" />
        <Card title="编排：把六个节点串成一条用例"><p>链路测试的本质是“编排 + 按节点断言”。把每个环节封装成动作，逐节点执行、逐节点断言，任一步失败立即停住并携带证据上报——而不是让整条用例摔成一团无头异常。</p></Card>
        <CodeBlock title="chain_runner.py 按节点编排">{`NODES = ["upload", "ocr", "extract", "review", "store", "display"]

class ChainFailed(Exception):
    def __init__(self, node, report):
        self.node = node
        self.report = report

def run_chain(loan_flow, plan):
    report = {}
    for node in NODES:
        try:
            result = plan[node](loan_flow)
            report[node] = {"status": "PASS", "detail": result}
        except AssertionError as exc:
            report[node] = {"status": "FAIL", "detail": str(exc)}
            raise ChainFailed(node, report)
    return report

def test_完整贷款链路_六节点全部通过(loan_flow):
    plan = {
        "upload": lambda f: f.assert_upload_ok(),
        "ocr": lambda f: f.assert_status("EXTRACTED", 30),
        "extract": lambda f: f.assert_fields_ok(),
        "review": lambda f: f.assert_approved(),
        "store": lambda f: f.assert_status("STORED", 10),
        "display": lambda f: f.assert_visible(),
    }
    report = run_chain(loan_flow, plan)
    assert all(item["status"] == "PASS" for item in report.values())`}</CodeBlock>
        <CodeBlock title="失败定位与报告输出">{`def run_suite(runner, cases):
    results = []
    for name, case in cases:
        try:
            case()
            results.append({"name": name, "result": "PASS"})
        except ChainFailed as failure:
            results.append({
                "name": name,
                "result": "FAIL",
                "node": failure.node,       # 失败直接定位到节点
                "evidence": failure.report, # 携带已通过节点的证据
            })
    return results

# 输出示例（JSON）
# [{"name": "贷款链路-六节点", "result": "FAIL",
#   "node": "store", "evidence": {...}}]`}</CodeBlock>
        <Card title="报告里至少要能回答三个问题"><BulletList items={["哪条链失败了？用例名、loanId、环境与版本。", "死在哪个节点？node 字段直接指向 upload/ocr/store。", "证据是什么？该节点的请求、响应、状态与期望值。"]} /></Card>
        <Callout>链路用例贵精不贵多。一条覆盖主路径，几条覆盖关键故障与幂等即可；把链路测试放进每晚回归与发布门禁，用通过率趋势监控跨服务集成的健康度。</Callout>
      </section>

      <section id="interop" data-knowledge-section className="mb-14">
        <SectionHeader number="07" title="与数据测试、OCR 文档智能测试的衔接" badge="分层配合" />
        <Card title="链路是“编排视角”，环节测试是“环节质量视角”"><p>链路测试回答“六个环节能不能串起来、状态对不对”；OCR 文档智能测试回答“合同上的字识别得准不准、字段抽取得稳不稳”；数据测试回答“入库后的金额、口径和样本对不对”。三者视角不同、手段不同，但共享同一套样本、同一批 loanId，才能组成完整的金融 AI 质量保障体系。</p></Card>
        <TableCard title="三种测试的定位与配合" headers={["测试类型", "视角", "回答的问题", "典型手段"]} rows={viewRows} />
        <Card title="组合回归的节奏"><BulletList items={["OCR 文档智能测试先跑：模型指标不过，不进链路。", "数据测试做对账：入库字段与抽取字段逐项比对。", "链路测试做验收：整条链端到端打通且状态合法。", "任一环节的样本更新，都要重新跑一遍整条链。"]} /></Card>
        <Callout>不要试图用链路测试代替 OCR 准确率评估——链条通过只能说明“数据流转顺畅”，识别精度仍然要靠样本集和指标回归来守住。</Callout>
      </section>

      <section id="practice" data-knowledge-section className="mb-14">
        <SectionHeader number="08" title="练习与检查" badge="实战收尾" />
        <Card title="练习：完成贷款业务链路测试包"><BulletList ordered items={["画出贷款链路的六个节点，标注每个节点的输入、输出与依赖服务。", "为每个节点写一条“当……时，……”的链路用例。", "实现统一请求上下文透传，验证所有请求携带同一个 loanId 与 traceId。", "构造重复上传同一合同，断言业务码为 DUPLICATE_IGNORED 且记录不增长。", "注入 OCR 超时，验证链路进入重试并最终完成抽取。", "模拟入库失败，执行补偿后验证状态回到 EXTRACTED 且可再次入库。", "把六节点编排成一条可重复运行的链路用例，并输出失败节点与证据。", "将链路测试与 OCR 文档智能测试、数据测试组合成一次完整回归，记录各层耗时与失败分布。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><ChecklistCard title="建模清楚" items={["节点与依赖已画出", "数据流标注输入输出", "状态机合法迁移明确", "关键字段口径统一"]} /><ChecklistCard title="链路可信" items={["数据贯穿同一 loanId", "状态按合法方向迁移", "重复与并发已验证幂等", "异常与补偿有注入用例"]} /><ChecklistCard title="工程可运行" items={["编排命令可重复执行", "失败能定位到节点", "报告含证据与耗时", "敏感信息不入日志"]} /></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">你已经能从“单接口正确”走到“整条业务链正确”。下一步把链路能力与 OCR 文档智能测试、数据测试组合成完整的金融 AI 质量保障体系。</p><Link href="/knowledge/tutorials?track=test-development" className="inline-flex items-center gap-2 text-sm text-neon-cyan">返回测试开发工程模块 <ArrowRight className="h-4 w-4" /></Link></div>
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
