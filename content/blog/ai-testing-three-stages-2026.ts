import type { BlogPost } from "@/lib/blog-data";

const post = {
  slug: "ai-testing-three-stages-2026",
  title: "AI+测试的三个阶段：Prompt→Skill→Agent（2026版）",
  date: "2026-05-16",
  readTime: "18 分钟",
  excerpt: "企业AI测试已经从「写好提示词」演进到「让AI自主干活」。这篇文章拆解三个阶段的真实差异，以及2026年最成熟的落地方式。",
  tags: [
    "AI测试",
    "Agentic QA",
    "Playwright MCP",
    "Context Engineering",
    "智能体"
  ],
  content: `现在企业里真正开始落地的，已经不是单纯：

- "AI 写测试用例"
- "AI 生成 prompt（提示词，给 AI 的指令）"

而是：

## 从 Prompt Engineering（提示词工程）→ Context & Skill Engineering（上下文与技能工程）→ Agentic QA（智能体测试）的演进。

简单说：

| 阶段 | 核心能力 | 当前企业状态 |
|---|---|---|
| Prompt | 会提问 | 已普及 |
| Context & Skill | 可复用测试能力模块 | 正在规模化 |
| Agent（智能体） | 自主执行 QA（质量保证/测试）工作流 | 头部企业开始落地 |

---

## 一、现状：很多人还停在 Prompt 阶段

这是 2023~2024 年最常见的玩法。

例如：

\`\`\`txt
你是一个资深测试工程师，
请根据以下 PRD（产品需求文档）生成测试用例。
\`\`\`

或者：

\`\`\`txt
请生成边界测试场景
\`\`\`

这类东西的本质：

> AI 当"高级补全文档工具"。

---

### Prompt 的优点

确实有效：

- 提高写 case（测试用例）速度
- 补充边界条件
- 降低新人门槛
- 自动生成接口测试、SQL、Playwright（微软开源的浏览器自动化测试工具）脚本

很多公司已经日常使用。

---

### 但 Prompt 的问题非常明显

企业很快发现：

**1. 不稳定**

同一个 prompt，今天和明天结果不同。

**2. 不可维护**

Prompt 越来越长，最后几千字，没人维护得动。

**3. 无上下文**

AI 不知道真实业务、历史 bug（缺陷）、风险模块、用户行为、埋点数据。生成很多"正确但没价值"的测试。

---

所以企业开始往下一步走。

---

## 二、第一步升级：Context & Skill Engineering

行业里现在更常用的词是 **Context Engineering**（上下文工程）。"Skill"可以理解为 Context Engineering 在测试领域的具体实践——不只是给 AI 一堆信息，而是把**程序性知识**（怎么做、什么时候做、做错了怎么修）结构化地封装起来。

2026 年 3 月，MCP（Model Context Protocol，模型上下文协议）SDK（软件开发工具包）月下载量已达 **9700 万次**，Anthropic、OpenAI、Google、Microsoft、AWS 全部支持。这说明 Context Engineering 不是概念，是正在发生的基础设施升级。

---

### Skill 本质是什么

> 一个可复用的"测试专家能力模块"。

不是一句 prompt。而是 Prompt + 工具 + 上下文 + 规则 + Workflow（工作流）+ Memory（AI 的记忆能力）+ Best Practice（最佳实践）的组合。

---

### 举个真实例子

传统 Prompt：

\`\`\`txt
帮我测试登录功能
\`\`\`

---

Skill 化之后，变成一个 \`Login-Test-Skill\`，内部包含：

**登录测试知识库**：知道 OAuth（开放授权协议）、JWT（JSON Web Token，一种令牌格式）、SSO（单点登录）、Token Refresh（令牌刷新）、风控、MFA（多因素认证）。

**历史缺陷库**：知道这个系统以前出过 token 泄漏、多端登录冲突、验证码失效。

**自动工具链**：自动调用 Playwright、Postman（接口测试工具）、Charles（网络抓包工具）、JMeter（性能测试工具）。

**风险策略**：自动优先测高风险路径、高频用户路径、金流路径。

**输出标准化**：自动输出 Test Case（测试用例）、Bug Report（缺陷报告）、Trace（链路追踪）、Coverage（测试覆盖率）。

---

所以：

Skill 已经不是"问 AI"。

而是：

> 给 AI 一个专业角色系统。

---

## 三、第二步升级：Agentic QA

Skill 解决了"AI 有知识"的问题。

但还不够。

因为 Skill 还是需要人来触发——你说"测登录"，它才测登录。

Agent（智能体）的区别在于：

> **AI 自己判断该干什么，然后去干。**

---

### Agent 和 Prompt 最大区别

Prompt：

> AI 回答你。

Agent：

> AI 替你干活。

这是本质区别。

---

### 一个真正的 QA Agent 工作流

开发提交一个 PR（Pull Request，代码合并请求）。Agent 自动：

**1. 读取代码变更**——分析哪些模块变了、哪些接口变了、哪些组件影响最大。

**2. 分析历史风险**——从 Jira（项目管理工具）/ Bug 库学习哪些地方最容易炸。

**3. 自动生成测试策略**——不是只生成 case，而是确定回归范围、风险等级、测试优先级。

**4. 自动执行测试**——直接调 Playwright MCP、Browser MCP、Appium MCP（移动端测试工具）去操作真实浏览器。

**5. 自动分析失败原因**——发现 selector（选择器，用于定位页面元素）变了、DOM（文档对象模型，网页的结构化表示）结构改了、接口 schema（接口结构定义）变了，然后自动修复测试（Self-Healing Test，自愈测试）。

**6. 自动生成报告**——风险摘要、失败原因、建议修复、覆盖率变化。

---

## 四、Playwright MCP：2026 年最成熟的落地实例

上面讲的是框架，这里给一个**现在就能跑起来**的例子。

2026 年，微软官方发布了 **Playwright MCP Server**（\`@playwright/mcp\`），GitHub 星标 **31000+**，是目前最成熟的 AI 测试基础设施。

---

### 它为什么重要

传统 AI 测试靠截图识别页面，又慢又贵又不准。

Playwright MCP 换了个思路：

> 不看截图，看**无障碍树（Accessibility Tree）**。

无障碍树是浏览器提供的一种结构化数据，用标签和引用来描述页面上的每个元素。AI 拿到的是这样的数据：

\`\`\`txt
- heading "Checkout" [level=1]
- textbox "Email address" [ref=e5]
- textbox "Password" [ref=e6]
- button "Submit" [ref=e7]
- link "Forgot password?" [ref=e8]
\`\`\`

AI 用 \`ref=e7\` 直接定位 Submit 按钮。

好处：**快**（不用图像编解码）、**便宜**（不用视觉模型 API）、**稳**（引用不受视觉变化影响）。

---

### 内置三件套：Planner → Generator → Healer

Playwright Test 现在内置了三个 Agent，组成完整的 Agentic 测试流水线：

| Agent | 做什么 |
|---|---|
| **Planner（规划器）** | 探索应用，自动生成 Markdown 测试计划 |
| **Generator（生成器）** | 把计划转成可执行的 Playwright 测试文件 |
| **Healer（修复器）** | 测试失败时自动修复（locator/定位器更新、等待调整、数据修正） |

这不是实验功能，是微软打包进 Playwright Test 的正式能力。早期采用团队报告测试维护时间**减少 40%~60%**。

---

### 两分钟装好

\`\`\`bash
# VS Code（微软代码编辑器）
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'

# Claude Code（Anthropic 的 AI 编程工具）
claude mcp add playwright npx @playwright/mcp@latest

# Cursor（AI 代码编辑器）
npx @playwright/mcp@latest
\`\`\`

装完就能用自然语言驱动浏览器跑测试。

---

### npm（Node.js 包管理器）下载量说明一切

2025 年 4 月数据：

| 工具 | 月下载量 | 同比增长 |
|---|---|---|
| Playwright | 6740 万 | +216% |
| Cypress（前端测试工具） | 2600 万 | +11% |
| Selenium（老牌浏览器自动化工具） | 770 万 | 下降 |

Playwright 的 AI 集成层（MCP）是它爆发式增长的核心原因。

---

## 五、核心架构：Plan-Act-Verify 循环

现在企业 AI+测试的真正架构：

\`\`\`txt
LLM（大语言模型）
  ↓
Context & Skill Layer（上下文与技能层）
  ↓
Agent Orchestrator（智能体编排器，Plan → Act → Verify 循环）
  ↓
MCP Tool Layer（工具层）
  ↓
Testing Infrastructure（测试基础设施）
\`\`\`

关键在中间那层：**Plan-Act-Verify（规划-执行-验证）推理循环**。

Agent 不是一次性执行，而是：

1. **Plan（规划）**：规划该做什么
2. **Act（执行）**：执行操作
3. **Verify（验证）**：验证结果
4. 失败则 **Replan（重新规划）**

这个循环比简单的"LLM 调工具"要复杂得多，也是 Agentic QA 和普通 AI 辅助测试的核心区别。

---

## 六、企业落地方向：做哪些、做到哪了

### 1. AI 测试用例生成（最基础）

成熟度：★★★★★，已经普及。

### 2. AI 自动生成 Playwright/Appium 脚本

成熟度：★★★★☆，已经很好用。Playwright MCP 让这件事从"写脚本"变成了"说话就行"。

### 3. AI 自动分析 PR 风险

成熟度：★★★★☆，很多公司在接 GitHub（代码托管平台）/Cursor/Copilot（微软 AI 编程助手）。

### 4. Self-Healing Automation（自愈自动化）

成熟度：★★★☆☆，开始落地。Playwright 内置的 Healer Agent 是目前最成熟的实现。

### 5. Autonomous QA Agent（自主测试智能体）

成熟度：★★☆☆☆，头部公司探索。Shiplight AI 等平台已经提供 Agent-Native（智能体原生）的完整 QA 解决方案。

### 6. Multi-Agent QA（多智能体协同测试）

风险分析 Agent、Case 生成 Agent、执行 Agent、Bug 分析 Agent、Root Cause Agent（根因分析智能体）协同工作。论文和社区已经很多。

---

## 七、治理层：Agent 不是万能的

2026 年领先企业发现：

> 最难的不是"让 Agent 干活"，而是"让 Agent 可靠地干活"。

---

### 1. 不懂业务

很多 bug 是业务逻辑 bug。AI 很难理解风控、金流、商业规则、用户心理。

---

### 2. 不懂真正风险

演唱会抢票，真正危险的是超卖、黄牛、分布式锁、库存一致性。AI 很容易遗漏。

---

### 3. AI 非常容易"看起来正确"

TechRadar 专门提到：AI QA 最大问题是"不可预测"和"幻觉"（AI 胡说八道）。

---

### 4. 自动修复可能修错

Self-Healing 听起来很美，但：

- Agent 修了 locator（定位器），测试通过了——但测试覆盖的场景还对吗？
- Agent 跳过了一个失败的断言——是问题不存在了，还是 Agent 放弃了？

所以：

> **人-AI 协作边界**是 2026 年最核心的工程问题。

Agent 越自主，治理（Governance）越重要。谁来决定 Agent 的执行边界？出了问题谁负责？自动修复要不要人 review（审查）？这些问题比"怎么让 Agent 跑起来"更难。

---

## 八、测试工程师的能力转型

不是：

"会不会点页面"。

而是：

### AI QA Orchestration（AI 测试编排）

| 能力 | 未来价值 |
|---|---|
| Context Engineering（上下文工程） | 极高 |
| Workflow Design（工作流设计） | 极高 |
| Agent Design（智能体设计） | 极高 |
| MCP Tooling（工具集成） | 极高 |
| Risk Modeling（风险建模） | 极高 |
| Observability（可观测性，监控和追踪系统运行状态） | 极高 |
| Eval System（评估系统，衡量 AI 输出质量） | 极高 |
| Security Guardrail（安全护栏，防止 AI 做危险操作） | 极高 |
| Governance（治理） | 极高 |

本质：

> 从"执行测试"升级为"设计质量系统"。

---

## 写在最后

未来 2~3 年测试行业会出现两类人：

**传统点点点测试**——会被迅速压缩，因为 AI 已经能自动生成 case、自动回归、自动脚本、自动截图、自动 diff（对比差异）。

**AI-Native QA Engineer（AI 原生测试工程师）**——会非常值钱，因为他们能设计 Agent、设计 Workflow、设计 Context、设计 Eval、连接 MCP Toolchain（工具链）、设计治理框架。

这条路线（Prompt → Skill → Agent）仍然是 2026 年最实用的转型路径。但要保持领先，需要在 Agent 之上叠加**治理层**：哪些场景完全交给 Agent？哪些必须人 review？Agent 的执行边界怎么设？出了问题怎么追溯？

这些才是 2026 年下半年真正拉开差距的地方。

---

本文是"肖恩的博客"系列文章之一，首发于 seanwalter.top。作者是一名从软件测试转型AI领域的开发者，记录在转型过程中的真实思考。`,
} satisfies BlogPost;

export default post;
