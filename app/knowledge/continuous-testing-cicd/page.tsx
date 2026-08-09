import Link from "next/link";
import { Activity, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "持续测试与 CI/CD 工程教程",
  description: "以商城交易系统为案例，把自动化测试接入 GitHub Actions，建立分层回归、PR 检查、失败归因、Flaky 治理、报告归档与通知。",
  path: "/knowledge/continuous-testing-cicd",
  tags: ["持续测试", "CI/CD", "GitHub Actions", "质量门禁", "Flaky Test"],
});

const sections: SectionItem[] = [
  { id: "start", label: "持续测试" }, { id: "layers", label: "测试分层" },
  { id: "workflow", label: "GitHub Actions" }, { id: "pr", label: "PR 检查" },
  { id: "environment", label: "环境与数据" }, { id: "failure", label: "失败归因" },
  { id: "flaky", label: "Flaky 治理" }, { id: "reports", label: "报告与通知" },
  { id: "release", label: "发布门禁" }, { id: "practice", label: "练习与检查" },
];

const layerRows = [
  ["提交前", "单元、静态检查", "秒～3 分钟", "金额、优惠、状态机"],
  ["PR", "冒烟 + 契约 + 核心接口", "5～15 分钟", "下单、锁库存、支付"],
  ["合并后", "主路径回归", "15～40 分钟", "优惠、取消、退款"],
  ["夜间/候选版", "全量 + 多环境专项", "按项目规模", "兼容、性能、长尾组合"],
];
const causeRows = [
  ["产品缺陷", "相同版本和数据可重复，结果违反业务规则", "阻断并关联缺陷"],
  ["测试缺陷", "定位、等待、断言或清理错误", "修复脚本后重跑受影响范围"],
  ["环境问题", "服务不可用、配置漂移、容量不足", "恢复环境并保留运行证据"],
  ["数据问题", "库存被占用、优惠过期、账号污染", "修复数据工厂与隔离"],
  ["不稳定测试", "相同提交多次运行结果不一致", "隔离、统计、限期治理"],
];
const gateRows = [
  ["PR 合并", "lint、类型、单元、冒烟", "任何必需检查失败"],
  ["测试环境部署", "迁移检查、健康检查", "版本或依赖不一致"],
  ["候选版", "P0/P1 回归、已知风险评审", "交易核心失败或证据缺失"],
  ["生产发布", "审批、灰度、监控、回滚", "不可观测或不可回退"],
];

export default function ContinuousTestingCicdPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=automation" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回自动化工程模块</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索持续测试与 CI/CD 关键词...">
      <header className="mb-10"><div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Automation / Tutorial 15</div><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">持续测试与 CI/CD 工程教程</h1><p className="mb-6 text-lg leading-8 text-text-secondary">让每次代码变化都尽早获得可信反馈，让失败能归因、报告能追溯、风险能阻断。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>商城发布流水线</span><span>GitHub Actions</span></div></header>

      <section id="start" data-knowledge-section className="mb-14">
        <SectionHeader number="01" title="把测试放进交付反馈环" badge="越早反馈越便宜" />
        <FlowFigure id="feedback-loop" title="一次订单服务变更的持续反馈" items={[["提交", "本地快速检查"], ["PR", "冒烟与契约"], ["合并", "核心回归"], ["发布", "门禁与灰度"], ["线上", "指标回流"]]} />
        <Card title="持续测试不是持续跑全量"><p>优惠金额函数改动后，先在分钟级验证单元与接口规则；进入候选版再验证订单、库存、支付、退款的完整链路。目标是用最小成本尽快暴露当前变更最可能引入的风险。</p></Card>
        <Callout>接口 HTTP 200 只表示请求被正常处理，流水线中的断言仍必须检查响应体业务码、订单状态、金额与副作用。</Callout>
      </section>

      <section id="layers" data-knowledge-section className="mb-14">
        <SectionHeader number="02" title="按风险、速度和触发时机分层" badge="冒烟 回归 全量" />
        <TableCard title="一套测试，不同反馈层" headers={["触发", "测试范围", "目标时长", "商城示例"]} rows={layerRows} />
        <CodeBlock title="pytest 与 Playwright 标签">{`# pytest.ini
[pytest]
markers =
    smoke: 核心交易冒烟
    regression: 主要业务回归

# 运行
python -m pytest -m smoke
python -m pytest -m "regression and not slow"
npx playwright test --grep @smoke`}</CodeBlock>
        <Callout>冒烟不是随机挑几条快用例。它必须证明版本可继续测试：商城可登录、商品可查、订单可创建、支付依赖可达，且关键响应体结果正确。</Callout>
      </section>

      <section id="workflow" data-knowledge-section className="mb-14">
        <SectionHeader number="03" title="用 GitHub Actions 建立可执行流水线" badge="配置可复现" />
        <CodeBlock title=".github/workflows/quality.yml">{`name: quality
on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - run: pip install -r requirements-test.txt
      - name: Run smoke and regression
        env:
          BASE_URL: \${{ secrets.TEST_BASE_URL }}
          TEST_TOKEN: \${{ secrets.TEST_TOKEN }}
        run: python -m pytest -m "smoke or regression" --junitxml=reports/junit.xml
      - name: Archive test evidence
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-report-\${{ github.run_id }}
          path: reports/
          retention-days: 14`}</CodeBlock>
        <Card title="配置原则"><BulletList items={["锁定运行时版本与依赖，避免本地和 CI 漂移。", "令牌只从仓库 Secret 注入，不写入代码和日志。", "设置超时，避免挂起任务长期占用资源。", "报告上传使用 if: always()，失败时也保留证据。"]} /></Card>
      </section>

      <section id="pr" data-knowledge-section className="mb-14">
        <SectionHeader number="04" title="让 PR 检查跟随变更风险" badge="合并前阻断" />
        <FlowFigure id="pr-flow" title="PR 从变化到结论" items={[["识别路径", "订单或优惠"], ["选择检查", "静态到E2E"], ["并行执行", "缩短等待"], ["汇总证据", "状态与报告"], ["允许或阻断", "规则一致"]]} />
        <CodeBlock title="按路径触发交易测试">{`on:
  pull_request:
    paths:
      - "services/order/**"
      - "services/inventory/**"
      - "services/payment/**"
      - "tests/**"
      - ".github/workflows/quality.yml"`}</CodeBlock>
        <Card title="Branch protection 应要求"><BulletList items={["必需检查名称固定且不能被跳过。", "新提交会使旧审批和旧结果失效。", "高风险交易改动至少由代码负责人复核。", "管理员绕过也应记录原因与审批人。"]} /></Card>
      </section>

      <section id="environment" data-knowledge-section className="mb-14">
        <SectionHeader number="05" title="让环境和测试数据可重复" badge="隔离并可清理" />
        <CodeBlock title="并行测试唯一标识">{`import os
from uuid import uuid4

RUN_ID = os.getenv("GITHUB_RUN_ID", "local")

def unique_key(prefix: str) -> str:
    return f"{prefix}-{RUN_ID}-{uuid4().hex[:8]}"

# 订单备注、优惠码和测试账号都带运行标识
coupon_code = unique_key("CI-COUPON")`}</CodeBlock>
        <div className="grid gap-4 md:grid-cols-2"><Card title="准备"><BulletList items={["通过受控测试接口创建商品、库存、优惠和账号。", "运行记录版本、配置摘要与依赖健康状态。", "并行任务使用独立租户或唯一标识。", "资金类动作只进入隔离沙箱。"]} /></Card><Card title="清理"><BulletList items={["按本次运行 ID 精确清理。", "清理失败写入报告，不做全库删除。", "需要审计的订单保留并标记过期。", "环境漂移时立即中止并标记为环境问题。"]} /></Card></div>
      </section>

      <section id="failure" data-knowledge-section className="mb-14">
        <SectionHeader number="06" title="先归因，再决定重跑或阻断" badge="失败不是一个红点" />
        <TableCard title="失败归因决策表" headers={["类别", "证据", "行动"]} rows={causeRows} />
        <CodeBlock title="为每次调用保留关联信息">{`response = order_client.create_order(payload)
logger.info(
    "create_order finished",
    extra={
        "run_id": run_id,
        "commit": commit_sha,
        "order_id": response.json().get("data", {}).get("orderId"),
        "business_code": response.json().get("businessCode"),
    },
)
assert response.status_code == 200
assert response.json()["businessCode"] == "SUCCESS"`}</CodeBlock>
        <Callout>重跑通过不等于首次失败消失。先保存原始日志、请求关联 ID、截图或 trace，再重跑确认是否不稳定。</Callout>
      </section>

      <section id="flaky" data-knowledge-section className="mb-14">
        <SectionHeader number="07" title="把 Flaky Test 当作工程缺陷治理" badge="统计 修复 退出" />
        <FlowFigure id="flaky-loop" title="不稳定用例治理闭环" items={[["识别", "同提交结果漂移"], ["隔离", "不掩盖主结果"], ["收集", "时间与证据"], ["修复", "等待数据环境"], ["退出隔离", "连续稳定"]]} />
        <Card title="治理规则"><BulletList ordered items={["用相同提交、环境和数据重复确认，不凭一次重跑下结论。", "为用例登记负责人、首次出现时间、失败率和业务风险。", "高风险冒烟用例即使 Flaky 也不能静默放行，应优先修复或替换。", "临时隔离必须设置期限；隔离套件仍定时运行并通知负责人。", "只有找到原因且达到约定的连续稳定次数后，才退出隔离。"]} /></Card>
        <CodeBlock title="有限重试并保留首次失败">{`# pytest.ini
[pytest]
addopts = --reruns 1 --reruns-delay 1

# Playwright
retries: process.env.CI ? 1 : 0,
trace: 'retain-on-failure'`}</CodeBlock>
      </section>

      <section id="reports" data-knowledge-section className="mb-14">
        <SectionHeader number="08" title="归档报告，并把通知发给能行动的人" badge="证据可追溯" />
        <Card title="报告至少包含"><BulletList items={["仓库、提交 SHA、分支、工作流与运行链接。", "环境、版本、数据批次和触发人。", "通过、失败、跳过、重试与 Flaky 数量。", "订单号、请求关联 ID、失败步骤和关键响应体。", "JUnit、HTML、截图、Trace 和服务日志。"]} /></Card>
        <CodeBlock title="失败后通知示意">{`- name: Notify failure
  if: failure()
  env:
    WEBHOOK_URL: \${{ secrets.QA_WEBHOOK_URL }}
  run: |
    python scripts/notify.py \
      --status failed \
      --run-url "\${{ github.server_url }}/\${{ github.repository }}/actions/runs/\${{ github.run_id }}" \
      --report "test-report-\${{ github.run_id }}"`}</CodeBlock>
        <Callout>通知应包含“谁需要做什么”和运行链接，不能只发送“测试失败”。Webhook、Token 和用户数据不得出现在报告正文。</Callout>
      </section>

      <section id="release" data-knowledge-section className="mb-14">
        <SectionHeader number="09" title="把流水线结果转换为发布门禁" badge="证据驱动放行" />
        <TableCard title="商城交付的关键门禁" headers={["阶段", "必需证据", "阻断条件"]} rows={gateRows} />
        <CodeBlock title="环境保护与人工审批">{`jobs:
  deploy-production:
    needs: [test]
    if: github.ref == 'refs/heads/main'
    environment: production
    runs-on: ubuntu-latest
    steps:
      - run: ./scripts/deploy.sh
      - run: ./scripts/verify-smoke.sh`}</CodeBlock>
        <Callout>生产 environment 应在仓库设置中配置审批人和保护规则。配置文件表达依赖关系，审批权限不能靠脚本里的注释代替。</Callout>
      </section>

      <section id="practice" data-knowledge-section className="mb-14">
        <SectionHeader number="10" title="完成一条可诊断的持续测试流水线" badge="练习与验收" />
        <Card title="练习：为商城交易服务建立 CI/CD"><BulletList ordered items={["把单元、冒烟、回归和全量测试按触发时机分层。", "创建 GitHub Actions 工作流，锁定 Python 版本并缓存依赖。", "在 PR 中并行执行静态检查、单元测试和交易冒烟。", "使用 Secret 注入测试地址和令牌。", "故意制造产品、脚本、环境、数据四类失败并完成归因。", "为一条偶发等待用例建立 Flaky 登记、隔离和退出标准。", "无论成功失败都归档 JUnit、HTML 与 trace，设置保留期限。", "发送包含负责人行动和运行链接的失败通知。", "配置候选版与生产门禁，演练一次阻断和一次回滚。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><ChecklistCard title="反馈够快" items={["分层有依据", "PR 时长受控", "任务可并行", "缓存不污染"]} /><ChecklistCard title="失败可信" items={["原始证据保留", "归因规则一致", "重试次数有限", "Flaky 有负责人"]} /><ChecklistCard title="发布可控" items={["门禁不可静默跳过", "报告可追溯", "通知可行动", "灰度回滚就绪"]} /></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">流水线已经能持续验证单个应用。下一步进入服务依赖、故障传播和分布式事务。</p><Link href="/knowledge/microservices-testing" className="inline-flex items-center gap-2 text-sm text-neon-cyan">继续学习微服务测试 <ArrowRight className="h-4 w-4" /></Link></div>
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
function FlowFigure({ id, title, items }: { id: string; title: string; items: readonly (readonly [string, string])[] }) { return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby={id}><figcaption id={id} className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">{items.map((item, index) => <div key={item[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="block text-sm text-text-primary">{item[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{item[1]}</span></div>{index < items.length - 1 && <Activity className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>; }
function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>; }
