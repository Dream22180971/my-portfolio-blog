import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "软件测试术语表",
  description: "按需求、设计、执行、缺陷、自动化、发布、可靠性与 AI 测试流程整理的软件测试中英文术语表。",
  path: "/knowledge/software-testing-glossary",
  tags: ["软件测试术语", "测试流程", "QA", "测试基础", "测试工程师"],
});

type GlossaryTerm = {
  name: string;
  english: string;
  definition: string;
  usage: string;
  distinction?: string;
};

type GlossaryGroup = {
  id: string;
  number: string;
  title: string;
  description: string;
  terms: readonly GlossaryTerm[];
  related?: { label: string; href: string };
};

const sections: SectionItem[] = [
  { id: "guide", label: "使用方法" },
  { id: "planning", label: "需求与计划" },
  { id: "design", label: "设计与用例" },
  { id: "levels", label: "层级与类型" },
  { id: "execution", label: "执行与回归" },
  { id: "defects", label: "缺陷管理" },
  { id: "automation", label: "自动化工程" },
  { id: "release", label: "度量与发布" },
  { id: "reliability", label: "性能与可靠性" },
  { id: "ai-quality", label: "AI 测试" },
];

const groups: readonly GlossaryGroup[] = [
  {
    id: "planning",
    number: "01",
    title: "需求、质量与测试计划",
    description: "回答为什么测、依据什么测、测到什么程度，以及由谁对质量结果负责。",
    related: { label: "需求评审与测试方案设计教程", href: "/knowledge/requirements-test-planning" },
    terms: [
      {
        name: "质量保证",
        english: "Quality Assurance, QA",
        definition: "通过流程、规范、评审、培训和持续改进来预防质量问题的一组系统性活动。",
        usage: "讨论团队如何减少缺陷产生、如何建立质量机制时使用。",
        distinction: "QA 不等于执行测试；测试是 QA 体系中的一种验证活动。",
      },
      {
        name: "质量控制",
        english: "Quality Control, QC",
        definition: "通过检查、评审、测试和度量识别产品是否达到既定质量标准。",
        usage: "判断当前交付物是否合格、是否需要返工时使用。",
        distinction: "QA 更偏预防和过程，QC 更偏发现问题和检查结果。",
      },
      {
        name: "验证与确认",
        english: "Verification & Validation, V&V",
        definition: "Verification 检查产物是否按规范正确实现；Validation 确认最终产品是否真正满足用户需要。",
        usage: "评审设计、检查实现以及组织业务验收时使用。",
        distinction: "常用记法：Verification 是“做得对不对”，Validation 是“做的是不是对的东西”。",
      },
      {
        name: "测试依据",
        english: "Test Basis",
        definition: "设计测试和判断结果时依赖的资料，如需求、验收标准、接口契约、设计文档、法规和历史缺陷。",
        usage: "说明预期结果从哪里来，或判断一个现象是否属于缺陷时使用。",
        distinction: "没有测试依据时应先澄清规则，不能把个人偏好直接当作预期。",
      },
      {
        name: "验收标准",
        english: "Acceptance Criteria, AC",
        definition: "需求可以被业务接受所必须满足的、可验证的具体条件。",
        usage: "拆解用户故事、设计验收测试和判断需求是否完成时使用。",
        distinction: "验收标准描述可观察结果，不应只写“功能正常”或“体验良好”。",
      },
      {
        name: "测试范围",
        english: "Test Scope",
        definition: "本轮明确要验证与不验证的功能、接口、平台、数据、质量属性和版本边界。",
        usage: "测试计划、变更评估和发布结论中使用。",
        distinction: "未纳入范围不代表没有风险，仍要在结论中说明未覆盖项。",
      },
      {
        name: "风险驱动测试",
        english: "Risk-based Testing, RBT",
        definition: "依据失败概率与业务影响安排测试优先级、深度和资源。",
        usage: "时间有限、范围很大或核心链路风险明显时使用。",
        distinction: "它不是只测高风险项，而是让有限资源优先降低最大风险。",
      },
      {
        name: "测试策略",
        english: "Test Strategy",
        definition: "描述测试目标、分层方法、重点风险、环境、自动化、质量门禁和责任分工的总体方案。",
        usage: "项目或产品级别确定“怎么测”时使用。",
        distinction: "策略偏长期方法与原则；测试计划偏某次版本的人员、范围和排期。",
      },
      {
        name: "测试计划",
        english: "Test Plan",
        definition: "面向具体项目或版本的执行安排，包含范围、任务、资源、环境、进度、风险和交付物。",
        usage: "版本启动、排期协调和测试跟踪时使用。",
        distinction: "计划会随版本变化，不能只复制模板而不更新真实依赖和风险。",
      },
      {
        name: "准入与准出标准",
        english: "Entry & Exit Criteria",
        definition: "开始某阶段前必须具备的条件，以及结束该阶段或允许发布前必须满足的条件。",
        usage: "提测、系统测试、验收和上线门禁中使用。",
        distinction: "准入解决“是否值得开始测”，准出解决“是否可以结束或发布”。",
      },
      {
        name: "需求追踪矩阵",
        english: "Requirements Traceability Matrix, RTM",
        definition: "建立需求、风险、测试用例、执行结果和缺陷之间的双向关联。",
        usage: "检查遗漏、评估变更影响和证明覆盖范围时使用。",
        distinction: "RTM 证明的是关联和覆盖，不直接证明测试质量足够。",
      },
    ],
  },
  {
    id: "design",
    number: "02",
    title: "测试设计与测试资产",
    description: "把需求和风险转化为可以准备、执行、复现和维护的测试内容。",
    related: { label: "测试用例设计实战教程", href: "/knowledge/test-case-design" },
    terms: [
      {
        name: "测试点",
        english: "Test Point / Test Condition",
        definition: "从需求和风险中提取的一个待验证条件或质量关注点。",
        usage: "列测试范围、评审覆盖是否完整时使用。",
        distinction: "测试点说明“要验证什么”，还不是一条带步骤和预期的完整用例。",
      },
      {
        name: "测试场景",
        english: "Test Scenario",
        definition: "围绕一个用户目标、业务流程或风险组织的一组测试条件。",
        usage: "从业务视角梳理端到端流程和异常分支时使用。",
        distinction: "场景粒度通常大于用例；一个支付场景可以拆成多条具体用例。",
      },
      {
        name: "测试用例",
        english: "Test Case",
        definition: "包含前置条件、输入或步骤、预期结果和必要数据的一项可执行验证。",
        usage: "需要稳定执行、评审、复用和追踪结果时使用。",
        distinction: "好用例只有一个清晰验证目标，且别人按它也能得到可判断结果。",
      },
      {
        name: "前置条件",
        english: "Precondition",
        definition: "执行用例前必须成立的账号、权限、数据、环境和系统状态。",
        usage: "保证用例可复现、避免把准备动作混进验证步骤时使用。",
        distinction: "前置条件不满足导致的是阻塞或无效执行，不应直接判定产品失败。",
      },
      {
        name: "测试数据",
        english: "Test Data",
        definition: "用于触发条件并判断结果的输入、账号、业务对象、基准数据和关联标识。",
        usage: "造数、隔离、清理、脱敏和数据驱动测试时使用。",
        distinction: "测试数据是用例的一部分，需要版本、来源和清理方式，而不是临时随便找一条。",
      },
      {
        name: "预期结果与实际结果",
        english: "Expected Result & Actual Result",
        definition: "预期结果是依据规则应出现的可观察行为；实际结果是执行中真实看到并记录的行为。",
        usage: "判断通过、失败以及编写缺陷报告时使用。",
        distinction: "预期要可验证，实际要忠于证据，二者都不要混入原因猜测。",
      },
      {
        name: "正向与负向测试",
        english: "Positive & Negative Testing",
        definition: "正向测试验证合法输入和主流程；负向测试验证非法、缺失、越界或冲突条件被安全处理。",
        usage: "设计正常路径与异常路径覆盖时使用。",
        distinction: "负向测试不是故意输入乱码，而是验证系统约束和失败处理是否正确。",
      },
      {
        name: "等价类",
        english: "Equivalence Partitioning, EP",
        definition: "把预期行为相同的输入划分为一类，从每类选代表值减少重复测试。",
        usage: "输入范围大但规则可以分区时使用。",
        distinction: "分区依据是系统行为，不是把数值平均切成几段。",
      },
      {
        name: "边界值",
        english: "Boundary Value Analysis, BVA",
        definition: "重点验证有效区间边缘及其相邻值，因为比较、长度和范围错误常发生在边界。",
        usage: "金额、数量、日期、长度、分页和并发阈值测试时使用。",
        distinction: "通常检查边界值、边界内最近值和边界外最近值，而不只测最大最小。",
      },
      {
        name: "判定表",
        english: "Decision Table",
        definition: "用条件组合与对应动作表达多规则决策，系统检查组合是否遗漏或冲突。",
        usage: "优惠、权限、费率和审批等多条件规则时使用。",
        distinction: "判定表适合组合规则；有明确先后状态的流程更适合状态迁移。",
      },
      {
        name: "状态迁移测试",
        english: "State Transition Testing",
        definition: "验证对象在事件触发下能否从当前状态合法进入下一状态，并拒绝非法跳转。",
        usage: "订单、支付、退款、工单和审批流测试时使用。",
        distinction: "不仅检查状态值，还要验证触发条件、副作用、重复事件和回滚。",
      },
      {
        name: "探索性测试",
        english: "Exploratory Testing",
        definition: "测试人员在执行中同步学习、设计和验证，并根据新证据调整下一步。",
        usage: "需求不完整、风险未知、版本变化快或需要发现意外问题时使用。",
        distinction: "探索性测试不是随便点；应有测试章程、时间盒、笔记和证据。",
      },
      {
        name: "测试预言机",
        english: "Test Oracle",
        definition: "用于判断结果正确与否的可信依据或机制，如规则、参考实现、对账数据和不变量。",
        usage: "预期难以直接写死、结果复杂或输出具有概率性时使用。",
        distinction: "断言是检查动作，Oracle 是断言背后的正确性依据。",
      },
    ],
  },
  {
    id: "levels",
    number: "03",
    title: "测试层级与测试类型",
    description: "同一个风险可以从不同层级验证；层级越高越接近真实业务，定位和维护成本通常也越高。",
    terms: [
      {
        name: "单元测试",
        english: "Unit Testing",
        definition: "隔离验证函数、方法或类等最小代码单元的行为。",
        usage: "快速验证算法、分支、边界和异常处理时使用。",
        distinction: "单元测试反馈快，但不能替代真实服务协作和用户流程验证。",
      },
      {
        name: "集成测试",
        english: "Integration Testing",
        definition: "验证多个模块、服务、数据库或外部依赖组合后的接口与协作。",
        usage: "检查契约、数据传递、事务和依赖失败时使用。",
        distinction: "关注组件之间是否协作正确，而不只是某个函数自身。",
      },
      {
        name: "契约测试",
        english: "Contract Testing",
        definition: "验证服务提供方与消费方对请求、响应、事件结构和兼容规则的共同约定。",
        usage: "微服务或第三方接口独立发布时提前发现不兼容变更。",
        distinction: "契约测试验证接口约定，不等于验证完整业务流程。",
      },
      {
        name: "接口测试",
        english: "API Testing",
        definition: "直接调用接口验证协议、参数、业务规则、权限、响应和数据副作用。",
        usage: "绕过 UI 快速覆盖核心业务规则和异常分支时使用。",
        distinction: "HTTP 200 只代表请求被处理，还要检查业务码、数据和副作用。",
      },
      {
        name: "系统测试",
        english: "System Testing",
        definition: "在接近完整产品的环境中验证系统是否满足功能与非功能要求。",
        usage: "版本级验证完整产品能力时使用。",
        distinction: "系统测试边界通常覆盖整个被测系统，但未必包含所有外部系统的真实链路。",
      },
      {
        name: "端到端测试",
        english: "End-to-End Testing, E2E",
        definition: "从用户入口贯穿前端、接口、数据和关键依赖，验证完整业务结果。",
        usage: "保障登录、下单、支付等少量核心旅程时使用。",
        distinction: "E2E 价值高但运行慢且易受环境影响，不应承载全部组合覆盖。",
      },
      {
        name: "用户验收测试",
        english: "User Acceptance Testing, UAT",
        definition: "由业务代表或最终用户确认系统能否支持真实业务目标和交付条件。",
        usage: "发布或项目验收前验证业务适用性时使用。",
        distinction: "UAT 不是测试团队替业务再跑一次功能回归。",
      },
      {
        name: "功能与非功能测试",
        english: "Functional & Non-functional Testing",
        definition: "功能测试关注系统做什么；非功能测试关注性能、安全、可用性、兼容性和可靠性等做得怎么样。",
        usage: "划分质量目标和测试专项时使用。",
        distinction: "非功能要求也必须可量化或可观察，不能只写“要快、要安全”。",
      },
      {
        name: "黑盒、白盒与灰盒测试",
        english: "Black-box, White-box & Grey-box Testing",
        definition: "分别基于外部行为、内部结构，或结合部分实现知识来设计与执行测试。",
        usage: "说明测试信息来源和覆盖方法时使用。",
        distinction: "它们描述视角，不代表具体测试层级，也不存在绝对优劣。",
      },
      {
        name: "兼容性测试",
        english: "Compatibility Testing",
        definition: "验证不同浏览器、系统、设备、分辨率、网络、语言和版本组合下行为是否符合支持范围。",
        usage: "存在多终端、多版本或升级兼容要求时使用。",
        distinction: "先按用户占比和风险建立矩阵，不机械执行所有组合。",
      },
      {
        name: "可访问性测试",
        english: "Accessibility Testing, a11y",
        definition: "验证残障用户能否借助键盘、屏幕阅读器、缩放和对比度完成核心任务。",
        usage: "公共服务、国际产品和需要满足 WCAG 的页面中使用。",
        distinction: "自动扫描只能发现部分问题，仍需真实键盘和辅助技术验证。",
      },
    ],
  },
  {
    id: "execution",
    number: "04",
    title: "测试执行、冒烟与回归",
    description: "描述一个版本是否值得继续测试、某条用例结果如何，以及修复后应该验证到多大范围。",
    related: { label: "软件测试基础教程", href: "/knowledge/software-testing-foundations" },
    terms: [
      {
        name: "构建与部署",
        english: "Build & Deployment",
        definition: "Build 是由代码和依赖生成的可交付版本；Deployment 是把该版本安装或发布到某个环境。",
        usage: "确认被测版本、环境变更和结果可追溯性时使用。",
        distinction: "同一构建可以部署到多个环境；部署成功也不代表业务功能正确。",
      },
      {
        name: "测试环境",
        english: "Test Environment",
        definition: "执行测试所需的应用版本、配置、依赖服务、账号、数据、设备和网络组合。",
        usage: "复现问题、解释结果差异和安排测试前置时使用。",
        distinction: "只记录“测试环境”不够，应能定位版本、配置和关键依赖状态。",
      },
      {
        name: "冒烟测试",
        english: "Smoke Testing",
        definition: "用少量高优先级用例快速确认构建可启动、核心链路可用，值得进入更深测试。",
        usage: "新版本部署后、完整回归前使用。",
        distinction: "冒烟回答“版本能不能测”，不是完整功能验证。",
      },
      {
        name: "健全性测试",
        english: "Sanity Testing",
        definition: "针对小范围修改快速检查变更本身及紧邻功能是否基本合理。",
        usage: "小修复或局部变更后决定是否继续做更广回归时使用。",
        distinction: "冒烟关注整个构建最核心能力，Sanity 更聚焦本次局部变化。",
      },
      {
        name: "确认测试",
        english: "Confirmation Testing / Retesting",
        definition: "在修复版本中按原触发条件重新执行，确认某个具体缺陷已经消失。",
        usage: "缺陷修复后第一次验证时使用。",
        distinction: "Retest 验证原缺陷；Regression 检查修复是否影响其他功能。",
      },
      {
        name: "回归测试",
        english: "Regression Testing",
        definition: "在变更后重新验证原功能、关联功能和核心链路，发现意外副作用。",
        usage: "代码、配置、依赖、数据结构或基础设施变化后使用。",
        distinction: "回归范围应由改动影响面和风险决定，不等于每次把所有用例全跑一遍。",
      },
      {
        name: "通过、失败、阻塞与未执行",
        english: "Pass, Fail, Blocked & Not Run",
        definition: "分别表示符合预期、不符合预期、因前置问题无法验证，以及本轮尚未执行或不在执行范围。",
        usage: "记录用例执行状态和统计结果时使用。",
        distinction: "Blocked 不能算 Fail，Not Run 也不能隐藏在通过率之外。",
      },
      {
        name: "测试轮次",
        english: "Test Cycle / Test Run",
        definition: "在确定版本、环境、范围和时间窗口下组织的一次测试执行集合。",
        usage: "区分首轮、修复轮、回归轮并汇总结果时使用。",
        distinction: "每轮必须绑定明确构建，跨版本混合统计会让结论失真。",
      },
      {
        name: "不稳定测试",
        english: "Flaky Test",
        definition: "被测代码未变化时，同一测试在相同条件下仍会随机通过或失败。",
        usage: "自动化结果重复波动、影响 CI 信任度时使用。",
        distinction: "先区分产品真实间歇性故障、环境波动和测试脚本缺陷，不能一律重跑掩盖。",
      },
      {
        name: "假阳性与假阴性",
        english: "False Positive & False Negative",
        definition: "假阳性是系统正确却被测试判为失败；假阴性是系统有问题却被测试判为通过。",
        usage: "评估检测规则、自动化断言和 AI 评分器可靠性时使用。",
        distinction: "假阴性通常更隐蔽，因为结果表面上是绿色。",
      },
    ],
  },
  {
    id: "defects",
    number: "05",
    title: "缺陷、故障与问题闭环",
    description: "把观察到的失败变成可复现、可分级、可修复、可回归并可预防的问题记录。",
    related: { label: "Bug 管理与缺陷分析教程", href: "/knowledge/defect-management-analysis" },
    terms: [
      {
        name: "错误、缺陷与失效",
        english: "Error, Defect & Failure",
        definition: "Error 是人的错误行为；Defect 是产物中的问题；Failure 是系统运行时表现出的错误行为。",
        usage: "区分原因、代码问题和用户可见现象时使用。",
        distinction: "用户看到的是 Failure，根因可能是代码缺陷、配置、数据或操作错误。",
      },
      {
        name: "缺陷与事件",
        english: "Bug / Defect & Incident",
        definition: "缺陷是产品偏离预期的问题；Incident 是线上已发生并影响服务或用户的异常事件。",
        usage: "区分研发问题管理和线上应急响应时使用。",
        distinction: "一次 Incident 可能由多个缺陷和运维条件共同造成。",
      },
      {
        name: "严重程度",
        english: "Severity",
        definition: "描述缺陷对用户、数据、资金、安全和系统造成的影响程度。",
        usage: "评估问题有多严重、是否阻断发布时使用。",
        distinction: "严重程度看影响，不由修复排期或提出者职位决定。",
      },
      {
        name: "修复优先级",
        english: "Priority",
        definition: "描述缺陷需要多快、以什么顺序处理，综合影响、频率、发布时间和修复成本。",
        usage: "版本排期和缺陷分诊时使用。",
        distinction: "Severity 与 Priority 相关但不相同；严重低频问题也可能 P0。",
      },
      {
        name: "可复现性与复现率",
        english: "Reproducibility & Reproduction Rate",
        definition: "可复现性说明能否在明确条件下重现问题；复现率表示多次尝试中出现问题的比例。",
        usage: "间歇性问题、并发问题和环境相关问题调查时使用。",
        distinction: "无法稳定复现不等于问题不存在，应继续记录时间、标识和环境差异。",
      },
      {
        name: "临时规避方案",
        english: "Workaround",
        definition: "在根因尚未修复时，用另一条操作或配置路径暂时降低影响。",
        usage: "线上应急、延期缺陷和已知问题说明中使用。",
        distinction: "Workaround 不是修复，必须记录限制、风险和失效条件。",
      },
      {
        name: "重复、按设计与拒绝",
        english: "Duplicate, By Design & Rejected",
        definition: "分别表示已有同一根问题、行为符合已确认规则，或报告不成立或信息不足。",
        usage: "缺陷分诊和关闭原因中使用。",
        distinction: "关闭时要关联依据或原缺陷，不能只改状态不给理由。",
      },
      {
        name: "延期与重新打开",
        english: "Deferred & Reopened",
        definition: "Deferred 表示确认存在但延后处理；Reopened 表示修复验证失败或问题再次出现。",
        usage: "跨版本管理缺陷风险时使用。",
        distinction: "延期需要风险接受人、目标版本和临时措施；重开需要新的失败证据。",
      },
      {
        name: "根因分析",
        english: "Root Cause Analysis, RCA",
        definition: "基于证据识别问题发生和未被提前发现的技术、流程与组织原因。",
        usage: "重大缺陷、线上事件和重复问题复盘时使用。",
        distinction: "RCA 不是追责，也不能把未确认的猜测写成根因。",
      },
      {
        name: "五问法",
        english: "Five Whys",
        definition: "连续追问“为什么”以从表面现象深入到可改进的系统原因。",
        usage: "辅助 RCA 和制定预防措施时使用。",
        distinction: "不要求机械问满五次；结论必须有证据且能导出可验证行动。",
      },
      {
        name: "缺陷逃逸",
        english: "Defect Escape / Defect Leakage",
        definition: "缺陷未在预期测试阶段发现，而流入后续阶段、验收或生产环境。",
        usage: "评估测试有效性和复盘遗漏原因时使用。",
        distinction: "缺陷逃逸率不能单独衡量团队质量，还要结合变更规模、风险和发现渠道。",
      },
    ],
  },
  {
    id: "automation",
    number: "06",
    title: "自动化测试与持续测试工程",
    description: "说明自动化代码如何组织、隔离依赖、判断结果并进入持续交付流水线。",
    related: { label: "持续测试与 CI/CD 工程教程", href: "/knowledge/continuous-testing-cicd" },
    terms: [
      {
        name: "测试套件",
        english: "Test Suite",
        definition: "围绕功能、层级、风险或执行目的组织的一组测试用例或自动化脚本。",
        usage: "划分冒烟、核心回归、全量回归和专项测试时使用。",
        distinction: "Suite 应有明确选择规则和维护责任，而不是脚本数量的简单集合。",
      },
      {
        name: "测试金字塔",
        english: "Test Pyramid",
        definition: "用大量快速底层测试、适量集成测试和少量关键 E2E 测试平衡反馈速度与信心。",
        usage: "规划自动化层级和投入比例时使用。",
        distinction: "它是设计原则，不是要求每个项目遵守固定百分比。",
      },
      {
        name: "测试框架与测试工具箱",
        english: "Test Framework & Test Harness",
        definition: "Framework 提供编写和运行测试的规则与能力；Harness 还包括驱动、数据、桩、环境和报告等执行基础设施。",
        usage: "设计自动化项目结构和公共能力时使用。",
        distinction: "安装 pytest 或 Playwright 只是使用框架，不等于已经建好工程体系。",
      },
      {
        name: "夹具",
        english: "Fixture",
        definition: "为测试准备并回收稳定前置条件的机制，如账号、数据、连接、浏览器上下文和临时资源。",
        usage: "减少重复准备代码并保证测试隔离时使用。",
        distinction: "Fixture 应控制生命周期，避免共享可变状态导致用例互相污染。",
      },
      {
        name: "Mock、Stub、Fake 与 Spy",
        english: "Test Doubles",
        definition: "Mock 验证交互预期；Stub 返回预设结果；Fake 是可工作的简化实现；Spy 记录真实调用信息。",
        usage: "隔离不稳定、昂贵、未完成或不可控的外部依赖时使用。",
        distinction: "测试替身验证的是本系统行为，不能证明真实第三方服务一定兼容。",
      },
      {
        name: "断言",
        english: "Assertion",
        definition: "把实际结果与明确条件比较，并在不满足时让测试失败。",
        usage: "自动化判断页面、响应、数据和副作用时使用。",
        distinction: "不要只断言状态码或元素存在，应覆盖业务结果与关键不变量。",
      },
      {
        name: "参数化与数据驱动",
        english: "Parameterized & Data-driven Testing",
        definition: "用一套测试逻辑执行多组输入和预期；数据驱动进一步把测试数据与脚本逻辑分离。",
        usage: "规则相同但输入组合很多时使用。",
        distinction: "参数越多组合越容易爆炸，需要用等价类、边界和风险筛选。",
      },
      {
        name: "幂等性",
        english: "Idempotency",
        definition: "同一操作重复执行一次或多次，系统最终业务效果保持一致。",
        usage: "支付、下单、消息消费、重试和自动化清理时使用。",
        distinction: "HTTP 方法语义幂等不自动保证业务实现真的幂等，仍需验证数据副作用。",
      },
      {
        name: "持续集成与持续交付",
        english: "Continuous Integration & Continuous Delivery, CI/CD",
        definition: "CI 频繁合并并自动构建验证；CD 让通过验证的版本始终具备可发布能力或自动部署。",
        usage: "把测试接入代码提交、合并和发布流程时使用。",
        distinction: "流水线变绿只证明已配置检查通过，不等于所有质量风险都被覆盖。",
      },
      {
        name: "左移与右移",
        english: "Shift Left & Shift Right",
        definition: "左移是在更早阶段预防和发现问题；右移是通过生产监控、灰度、实验和真实反馈验证质量。",
        usage: "设计贯穿研发全生命周期的质量活动时使用。",
        distinction: "右移不是把未完成的测试推到线上，线上验证仍需隔离和回退。",
      },
      {
        name: "持续测试",
        english: "Continuous Testing",
        definition: "在交付流水线各阶段持续执行合适层级的自动和人工检查，及时反馈业务风险。",
        usage: "建立 PR、构建、环境、回归和发布门禁时使用。",
        distinction: "持续测试不等于每次运行全部测试，而是分层选择最有价值的检查。",
      },
    ],
  },
  {
    id: "release",
    number: "07",
    title: "覆盖、质量度量与发布判断",
    description: "把测试结果转化为有范围、有风险边界、能支持发布决策的质量证据。",
    related: { label: "测试策略与质量门禁教程", href: "/knowledge/test-strategy-quality-gates" },
    terms: [
      {
        name: "测试覆盖率",
        english: "Test Coverage",
        definition: "测试触达需求、风险、业务路径、数据组合、平台或代码结构的程度。",
        usage: "发现覆盖空白和解释测试范围时使用。",
        distinction: "覆盖率高只代表被触达，不代表断言有效或风险已经充分降低。",
      },
      {
        name: "代码覆盖率",
        english: "Code Coverage",
        definition: "测试执行期间被运行到的语句、分支、函数或条件占比。",
        usage: "发现单元测试未触达的实现路径时使用。",
        distinction: "100% 代码覆盖仍可能遗漏错误预期、数据组合和业务风险。",
      },
      {
        name: "通过率",
        english: "Pass Rate",
        definition: "已执行且通过的用例占指定统计口径内用例的比例。",
        usage: "观察某轮执行结果和趋势时使用。",
        distinction: "必须同时展示失败、阻塞、未执行和高风险用例，不能只看一个百分比。",
      },
      {
        name: "缺陷密度",
        english: "Defect Density",
        definition: "单位代码量、功能点、需求或模块中发现的缺陷数量。",
        usage: "比较相似模块的质量趋势和识别高风险区域时使用。",
        distinction: "跨团队直接比较容易失真，因为规模、复杂度和缺陷记录规则不同。",
      },
      {
        name: "缺陷去除效率",
        english: "Defect Removal Efficiency, DRE",
        definition: "发布前发现的缺陷占发布前与发布后发现缺陷总数的比例。",
        usage: "回顾测试阶段拦截缺陷的能力时使用。",
        distinction: "需要一致的统计窗口和缺陷口径，否则趋势不可比。",
      },
      {
        name: "质量门禁",
        english: "Quality Gate",
        definition: "进入下一阶段或发布前必须满足的自动或人工检查条件。",
        usage: "PR、构建、回归、安全和上线审批中使用。",
        distinction: "门禁应绑定风险和例外流程，不能为了绿色而降低阈值或忽略失败。",
      },
      {
        name: "发布与暂缓发布",
        english: "Go / No-Go Decision",
        definition: "基于业务价值、测试证据、剩余风险、监控与回退能力做出的发布决策。",
        usage: "上线评审和发布窗口前使用。",
        distinction: "测试人员提供风险结论；最终业务风险接受通常需要明确的决策人。",
      },
      {
        name: "测试签署",
        english: "Test Sign-off",
        definition: "正式记录已测范围、结果、已知问题、未覆盖项和剩余风险的测试结论。",
        usage: "版本交付、验收或上线前形成可追溯记录时使用。",
        distinction: "Sign-off 不是承诺没有缺陷，而是说明在什么条件下得出什么结论。",
      },
      {
        name: "剩余风险",
        english: "Residual Risk",
        definition: "完成计划内控制和测试后仍然存在、尚未消除或未验证的风险。",
        usage: "测试报告、例外放行和风险接受中使用。",
        distinction: "必须说明影响、触发条件、监控和应对措施，不能只写“风险可控”。",
      },
      {
        name: "基线与基准测试",
        english: "Baseline & Benchmark",
        definition: "Baseline 是当前系统可重复比较的起点；Benchmark 是按统一方法比较方案、版本或行业参考的测量过程。",
        usage: "性能、质量指标和版本趋势比较时使用。",
        distinction: "基线强调自己的参照点，Benchmark 强调可比条件下的测量与比较。",
      },
      {
        name: "回滚、灰度与功能开关",
        english: "Rollback, Canary Release & Feature Flag",
        definition: "分别用于恢复上一稳定版本、小流量逐步放量，以及不重新部署就控制功能启停。",
        usage: "降低发布失败影响并验证线上表现时使用。",
        distinction: "三者是不同控制手段，都需要预先测试数据兼容、监控和恢复路径。",
      },
    ],
  },
  {
    id: "reliability",
    number: "08",
    title: "性能、稳定性与分布式可靠性",
    description: "用可量化目标和故障模型描述系统是否够快、够稳，以及失败后能否恢复。",
    related: { label: "性能压测与性能分析实战手册", href: "/knowledge/performance-testing-analysis" },
    terms: [
      {
        name: "负载、压力、峰值与耐久测试",
        english: "Load, Stress, Spike & Soak Testing",
        definition: "分别验证预期负载、超出容量、突发流量和长时间运行下的系统表现。",
        usage: "性能容量、稳定性和资源泄漏验证时使用。",
        distinction: "四者目标和流量模型不同，不能把一次高并发请求统称为压力测试。",
      },
      {
        name: "吞吐量与响应时间",
        english: "Throughput & Response Time",
        definition: "吞吐量描述单位时间完成的请求或事务数；响应时间描述单次请求从发出到完成的耗时。",
        usage: "衡量性能容量和用户等待时使用。",
        distinction: "只看平均响应时间会掩盖长尾，应同时关注 P95、P99 和错误率。",
      },
      {
        name: "服务等级指标、目标与协议",
        english: "SLI, SLO & SLA",
        definition: "SLI 是实际测量指标，SLO 是内部目标，SLA 是对客户承诺及可能的违约责任。",
        usage: "定义可用性、延迟和错误率目标时使用。",
        distinction: "先有可测 SLI，才能制定 SLO；SLA 通常比内部 SLO 更保守。",
      },
      {
        name: "恢复时间与恢复点目标",
        english: "RTO & RPO",
        definition: "RTO 是故障后允许多长时间恢复服务；RPO 是最多允许丢失多长时间范围的数据。",
        usage: "容灾、备份恢复和业务连续性设计时使用。",
        distinction: "RTO 关注停多久，RPO 关注丢多少数据，两者都必须通过演练验证。",
      },
      {
        name: "可靠性与韧性",
        english: "Reliability & Resilience",
        definition: "可靠性强调在规定条件和时间内持续正确工作；韧性强调发生故障后仍能降级、恢复和适应。",
        usage: "稳定性目标、故障演练和架构评审时使用。",
        distinction: "高可靠系统也可能遇到故障，韧性决定故障时是否失控。",
      },
      {
        name: "超时、重试与熔断",
        english: "Timeout, Retry & Circuit Breaker",
        definition: "超时限制等待时间，重试处理暂时性失败，熔断在持续失败时停止调用以保护系统。",
        usage: "外部依赖、微服务和异步任务故障测试时使用。",
        distinction: "无上限重试会放大故障；应结合退避、抖动、幂等和恢复条件验证。",
      },
      {
        name: "最终一致性",
        english: "Eventual Consistency",
        definition: "分布式系统允许短时间数据不一致，但在没有新更新后最终收敛到一致状态。",
        usage: "缓存、消息队列、搜索索引和异步数据链路测试时使用。",
        distinction: "最终一致不等于无限等待，必须定义可接受窗口、补偿和对账机制。",
      },
      {
        name: "可观测性",
        english: "Observability",
        definition: "通过系统外部输出推断内部状态并定位未知问题的能力。",
        usage: "复杂系统故障定位、线上监控和测试证据链建设时使用。",
        distinction: "监控回答已知指标是否异常；可观测性还支持探索未知原因。",
      },
      {
        name: "日志、指标与链路追踪",
        english: "Logs, Metrics & Traces",
        definition: "日志记录离散事件，指标聚合数值趋势，Trace 串联一次请求跨服务的完整路径。",
        usage: "定位失败发生在哪一层、何时开始及影响多大时使用。",
        distinction: "三者通过 request_id、trace_id 和时间关联后，才形成可用证据链。",
      },
    ],
  },
  {
    id: "ai-quality",
    number: "09",
    title: "AI 系统测试与评估",
    description: "传统测试术语继续适用，但概率输出还需要数据集、评分器、人工复核和安全评估。",
    related: { label: "AI 测试工程师强化支线", href: "/knowledge/tutorials?track=ai-testing" },
    terms: [
      {
        name: "评估集与金标集",
        english: "Evaluation Set & Golden Dataset",
        definition: "评估集用于稳定比较模型或系统表现；金标集包含经审核的期望答案、证据、标签或评分标准。",
        usage: "AI 功能回归、模型比较和发布门禁时使用。",
        distinction: "金标不一定只有唯一答案，但必须记录标注规则、版本和分歧处理。",
      },
      {
        name: "评分器与模型裁判",
        english: "Scorer / Evaluator & LLM-as-a-Judge",
        definition: "评分器按规则计算质量；模型裁判使用另一个模型依据 Rubric 评价输出。",
        usage: "无法只靠精确匹配判断生成内容时使用。",
        distinction: "模型裁判也会偏差和漂移，需要人工校准、盲测和一致性监控。",
      },
      {
        name: "人工复核",
        english: "Human Review / Human-in-the-Loop, HITL",
        definition: "由具备业务判断能力的人审核高风险、低置信或机器无法可靠判定的结果。",
        usage: "金融、医疗、内容安全和 Agent 高影响操作中使用。",
        distinction: "人工复核必须有明确触发条件、证据和责任，不是所有样本都人工兜底。",
      },
      {
        name: "幻觉",
        english: "Hallucination",
        definition: "模型生成看似合理但缺乏依据、与事实冲突或凭空补全的内容。",
        usage: "问答、摘要、抽取和 RAG 结果测试时使用。",
        distinction: "回答不完整、格式错误和检索不到资料不一定都是幻觉，应按链路分层归因。",
      },
      {
        name: "忠实度与有依据性",
        english: "Faithfulness & Groundedness",
        definition: "衡量回答是否得到给定上下文或可信来源支持，并且没有超出证据。",
        usage: "RAG、摘要和带引用答案评估时使用。",
        distinction: "有依据不等于答案完整或真正满足用户问题，还需评估相关性与覆盖度。",
      },
      {
        name: "检索召回率与精确率",
        english: "Retrieval Recall & Precision",
        definition: "Recall 关注相关证据是否被找全；Precision 关注返回证据中有多少真正相关。",
        usage: "RAG 检索层和 Top-K 调优时使用。",
        distinction: "只优化 Recall 可能引入大量噪声，只优化 Precision 可能漏掉关键证据。",
      },
      {
        name: "非确定性",
        english: "Non-determinism",
        definition: "相同输入在模型采样、并发、工具或外部环境影响下可能得到不同输出或轨迹。",
        usage: "设计重复评估、统计阈值和回归策略时使用。",
        distinction: "不能只跑一次就下结论，应记录模型、Prompt、参数、上下文和运行次数。",
      },
      {
        name: "模型与数据漂移",
        english: "Model Drift & Data Drift",
        definition: "模型行为或真实输入分布随时间变化，导致原有评估结果和阈值逐渐失效。",
        usage: "线上质量监控、模型升级和知识库变化后使用。",
        distinction: "漂移不一定来自模型本身，还可能来自 Prompt、检索索引、工具或用户分布变化。",
      },
      {
        name: "提示词注入",
        english: "Prompt Injection",
        definition: "攻击者通过输入、网页、文件或工具结果诱导模型忽略原目标、泄露信息或执行未授权动作。",
        usage: "RAG、浏览器 Agent、MCP 和外部内容处理测试时使用。",
        distinction: "仅靠 System Prompt 无法彻底防御，还要有权限、隔离、审批和输出验证。",
      },
      {
        name: "Agent 轨迹与工具调用",
        english: "Agent Trajectory & Tool Call",
        definition: "Trajectory 是 Agent 从观察、推理、选择工具到完成任务的步骤序列；Tool Call 是其中结构化调用外部能力的动作。",
        usage: "验证 Agent 是否选对工具、参数、顺序、权限和终止条件时使用。",
        distinction: "最终答案正确不代表轨迹安全，仍要检查越权调用和不可逆副作用。",
      },
      {
        name: "红队测试",
        english: "Red Teaming",
        definition: "以对抗者视角系统寻找模型、应用、权限和业务流程的可滥用途径。",
        usage: "AI 安全评估、上线前挑战测试和重大变更后回归时使用。",
        distinction: "红队不只测试敏感词绕过，还要覆盖数据泄露、越权、工具滥用和业务规则攻击。",
      },
    ],
  },
];

const confusionRows = [
  ["QA / QC / Testing", "过程预防 / 结果检查 / 具体验证活动"],
  ["Verification / Validation", "按规范实现正确 / 满足真实用户需要"],
  ["测试点 / 场景 / 用例", "一个检查条件 / 一段业务目标 / 一项可执行验证"],
  ["Smoke / Sanity", "确认整个构建能继续测 / 快速检查局部改动是否合理"],
  ["Retest / Regression", "确认原缺陷已修复 / 检查变更没有破坏关联功能"],
  ["Severity / Priority", "影响有多大 / 需要多快处理"],
  ["Coverage / Pass Rate", "测到了哪些范围 / 已执行用例中多少通过"],
  ["Error / Defect / Failure", "人的错误 / 产物中的问题 / 运行时表现出的异常"],
];

export default function SoftwareTestingGlossaryPage() {
  const termCount = groups.reduce((count, group) => count + group.terms.length, 0);

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link
        href="/knowledge/tutorials?track=foundations"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        返回测试基础模块
      </Link>

      <KnowledgeLayout sections={sections} searchPlaceholder="搜索中文、英文缩写或使用场景，例如 Smoke、P0、回归...">
        <header className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Foundations / Reference</div>
          <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">软件测试术语表</h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">
            不要求一次背完。遇到陌生词时，先查它解决什么问题、在什么场景使用，再看它和相邻概念有什么区别。
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <span>{termCount} 组核心术语</span>
            <span>{groups.length} 个流程分类</span>
            <span>中英文 + 使用场景 + 易混辨析</span>
          </div>
        </header>

        <section id="guide" data-knowledge-section className="mb-14">
          <SectionHeader number="00" title="怎样使用这份术语表" badge="先理解，再记忆" />
          <div className="grid gap-4 md:grid-cols-3">
            <GuideCard title="先按流程定位" text="需求阶段先查测试依据与策略，执行阶段查冒烟和回归，发布阶段再看门禁与剩余风险。" />
            <GuideCard title="再看使用场景" text="术语定义回答“是什么”，使用场景回答“什么时候说这个词才准确”。" />
            <GuideCard title="最后做易混辨析" text="面试和协作中最容易出错的不是没听过，而是把相邻概念当成同一件事。" />
          </div>
          <div className="card-glow mt-5 overflow-hidden rounded-xl">
            <div className="border-b border-space-border px-5 py-4">
              <h2 className="font-bold text-text-primary">八组最常混淆的概念</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-space-border bg-neon-cyan/5">
                    <th className="px-5 py-3 text-left font-semibold text-text-primary">概念</th>
                    <th className="px-5 py-3 text-left font-semibold text-text-primary">一句话区分</th>
                  </tr>
                </thead>
                <tbody>
                  {confusionRows.map(([terms, distinction]) => (
                    <tr key={terms} className="border-b border-space-border/50 last:border-b-0">
                      <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-neon-cyan">{terms}</td>
                      <td className="px-5 py-3 text-xs leading-6 text-text-secondary">{distinction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {groups.map((group) => (
          <GlossarySection key={group.id} group={group} />
        ))}

        <section className="mb-14 border-y border-space-border py-7">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 className="mb-2 font-bold text-text-primary">下一步：把术语放回真实测试流程</h2>
              <p className="text-sm leading-7 text-text-secondary">术语表用于查阅，基础教程用于建立完整认知；两者搭配学习，不需要脱离场景死记。</p>
            </div>
            <Link href="/knowledge/software-testing-foundations" className="inline-flex items-center gap-2 text-sm text-neon-cyan">
              学习软件测试基础教程 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function GlossarySection({ group }: { group: GlossaryGroup }) {
  return (
    <section id={group.id} data-knowledge-section className="mb-14">
      <SectionHeader number={group.number} title={group.title} badge={`${group.terms.length} 组术语`} />
      <p className="mb-5 text-sm leading-7 text-text-secondary">{group.description}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {group.terms.map((term) => (
          <article key={term.name} data-knowledge-section className="card-glow rounded-xl p-5">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <h3 className="font-bold text-text-primary">{term.name}</h3>
              <code className="rounded bg-neon-cyan/10 px-2 py-1 text-[10px] text-neon-cyan">{term.english}</code>
            </div>
            <p className="text-sm leading-7 text-text-secondary">{term.definition}</p>
            <dl className="mt-4 space-y-3 border-t border-space-border pt-4 text-xs leading-6">
              <div>
                <dt className="font-semibold text-text-primary">什么时候使用</dt>
                <dd className="text-text-secondary">{term.usage}</dd>
              </div>
              {term.distinction && (
                <div>
                  <dt className="font-semibold text-text-primary">容易混淆</dt>
                  <dd className="text-text-secondary">{term.distinction}</dd>
                </div>
              )}
            </dl>
          </article>
        ))}
      </div>
      {group.related && (
        <div className="mt-5 flex items-center justify-between gap-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4">
          <span className="flex items-center gap-2 text-xs text-text-secondary"><BookOpenCheck className="h-4 w-4 text-neon-cyan" />需要系统学习这个阶段</span>
          <Link href={group.related.href} className="inline-flex items-center gap-2 text-sm text-neon-cyan">
            {group.related.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}

function SectionHeader({ number, title, badge }: { number: string; title: string; badge: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{number}</div>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        <span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span>
      </div>
    </div>
  );
}

function GuideCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="card-glow rounded-xl p-5">
      <h3 className="mb-3 font-bold text-text-primary">{title}</h3>
      <p className="text-sm leading-7 text-text-secondary">{text}</p>
    </div>
  );
}
