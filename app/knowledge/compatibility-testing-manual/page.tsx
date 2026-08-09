import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "兼容性测试实战手册",
  description: "覆盖浏览器、操作系统、移动设备、分辨率、网络、语言数据与版本升级的兼容性测试实战手册。",
  path: "/knowledge/compatibility-testing-manual",
  tags: ["兼容性测试", "跨浏览器", "移动端测试", "响应式", "BrowserStack"],
});

const sections: SectionItem[] = [
  { id: "overview", label: "测试目标" }, { id: "matrix", label: "兼容矩阵" },
  { id: "browser", label: "浏览器" }, { id: "mobile", label: "移动设备" },
  { id: "viewport", label: "分辨率" }, { id: "network", label: "网络环境" },
  { id: "locale", label: "语言数据" }, { id: "upgrade", label: "版本升级" },
  { id: "tools", label: "工具流程" }, { id: "checklist", label: "检查清单" },
];

const dimensionRows = [
  ["浏览器", "Chrome、Edge、Safari、Firefox、微信内置浏览器", "布局、交互、API 支持"],
  ["操作系统", "Windows、macOS、iOS、Android", "字体、权限、文件与系统控件"],
  ["设备", "手机、平板、桌面、折叠屏", "触控、横竖屏、安全区"],
  ["屏幕", "小屏、主流屏、超宽屏、高 DPI", "换行、遮挡、缩放、清晰度"],
  ["网络", "Wi-Fi、4G、弱网、断网、切网", "超时、重试、重复提交"],
  ["语言数据", "中英文、长文本、Emoji、时区、旧数据", "溢出、乱码、日期金额"],
];

const matrixRows = [
  ["P0 核心组合", "主流浏览器最新版 + 主流手机系统", "登录、下单、支付等核心链路全量回归"],
  ["P1 常用组合", "次主流浏览器、上一主版本、常见平板", "核心流程、关键异常与主要页面"],
  ["P2 长尾组合", "低占比旧版本、特殊分辨率", "冒烟、静态页面与历史风险点"],
  ["不支持组合", "低于产品声明的系统或浏览器", "给出明确升级提示"],
];

const browserRows = [
  ["页面加载", "资源、字体、图标和脚本均成功", "白屏、404、CORS、模块加载失败"],
  ["表单控件", "输入、选择、日期、上传可用", "默认样式、键盘遮挡、格式差异"],
  ["CSS 布局", "Grid、Flex、sticky、动画正常", "错位、裁切、层级、滚动异常"],
  ["浏览器 API", "下载、剪贴板、摄像头按预期工作", "拒绝权限时有提示和降级"],
  ["历史导航", "刷新、前进、后退状态正确", "重复提交、数据丢失、空白页"],
];

const mobileRows = [
  ["触控", "点击、长按、滑动", "热区足够，不误触，不依赖 hover"],
  ["软键盘", "输入框聚焦与收起", "字段不被遮挡，按钮仍可操作"],
  ["横竖屏", "旋转设备和分屏", "内容重排，输入状态不丢失"],
  ["安全区域", "刘海屏、圆角屏、手势条", "导航和按钮不进入不可操作区域"],
  ["系统中断", "来电、锁屏、切后台", "会话、草稿和上传状态符合预期"],
  ["系统能力", "相机、相册、定位、通知", "授权与拒绝都有清晰路径"],
];

const viewportRows = [
  ["320–374px", "小屏手机", "标题、表格、按钮不横向溢出"],
  ["375–430px", "主流手机", "单列层级清晰，触控区域合理"],
  ["768–1024px", "平板与小窗口", "侧栏、弹窗和列数切换正确"],
  ["1280–1440px", "主流桌面", "页面密度、行宽与主操作区合理"],
  ["1920px 以上", "大屏与超宽屏", "内容不过度拉伸，留白受控"],
  ["125%–200%", "系统或浏览器缩放", "文字可读，操作不被裁切"],
];

const networkRows = [
  ["慢速网络", "高延迟、低带宽", "加载态清楚，不永久停留"],
  ["请求超时", "接口超过阈值", "可重试，错误可理解，不无限转圈"],
  ["瞬时断网", "提交时断开", "结果可确认，不重复下单或扣款"],
  ["Wi-Fi/蜂窝切换", "请求中切网", "连接恢复，幂等和会话正确"],
  ["资源部分失败", "图片或非核心资源失败", "核心功能可用，有合理占位"],
];

export default function CompatibilityTestingManualPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
    <Link href="/knowledge" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回知识库</Link>
    <KnowledgeLayout sections={sections}>
      <header className="mb-10"><h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">兼容性测试实战手册</h1><p className="mb-6 text-lg text-text-secondary">不是把所有设备都测一遍，而是用真实用户占比和业务风险，选出最值得验证的组合。</p><div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>10 个章节</span><span>Web + App</span><span>浏览器、设备、网络与数据</span></div></header>

      <section id="overview" data-knowledge-section className="mb-14"><Header icon="🧩" title="兼容性测试到底测什么" badge="同一个功能，在不同环境都能用" /><Card title="先说人话"><p>用户不会都用同一台电脑、同一个浏览器和同一条网络。兼容性测试要验证的是：环境发生变化后，核心业务仍能完成，页面仍能理解，异常仍能恢复。</p></Card><Table title="六个常见兼容维度" headers={["维度", "常见组合", "重点关注"]} rows={dimensionRows} /><Card title="兼容不等于完全一致"><List items={["核心功能、数据和业务结果必须一致。", "布局可以随屏幕合理重排，不要求像素完全相同。", "浏览器能力缺失时可以降级，但必须清楚告知用户。", "不支持的环境也要提供可理解的升级提示。"]} /></Card></section>

      <section id="matrix" data-knowledge-section className="mb-14"><Header icon="📋" title="先建立兼容性矩阵" badge="用户占比 × 业务风险 × 变更范围" /><Table title="兼容组合分层" headers={["层级", "典型范围", "测试深度"]} rows={matrixRows} /><Card title="矩阵从哪里来"><List items={["生产环境的浏览器、系统、设备和分辨率统计。", "目标用户画像与产品公开支持范围。", "历史兼容性缺陷和客服反馈。", "本次改动涉及的新 CSS、浏览器 API、权限或第三方 SDK。"]} /></Card><Card title="控制组合爆炸"><p>浏览器、版本、系统、设备相乘后会出现几百个组合。先覆盖 P0 核心组合，再按两两组合、历史缺陷和变更风险补充，不机械做全排列。</p></Card></section>

      <section id="browser" data-knowledge-section className="mb-14"><Header icon="🌐" title="桌面浏览器兼容性" badge="Chrome / Edge / Safari / Firefox" /><Table title="浏览器测试清单" headers={["模块", "要验证什么", "常见问题"]} rows={browserRows} /><Card title="特别容易漏"><List items={["Safari 的日期输入、下载、自动播放和部分 CSS 行为。", "Firefox 的字体、滚动条和表单默认样式。", "隐私模式、禁用第三方 Cookie 和内容拦截器。", "微信、企业微信内置浏览器的授权、分享与返回行为。"]} /></Card></section>

      <section id="mobile" data-knowledge-section className="mb-14"><Header icon="📱" title="移动端与设备兼容性" badge="真机优先验证高风险交互" /><Table title="移动端重点场景" headers={["场景", "测试动作", "通过标准"]} rows={mobileRows} /><Card title="模拟器和真机怎么分工"><List items={["模拟器快速覆盖系统版本、基础布局和常规流程。", "真机验证相机、定位、通知、支付、弱网、性能和系统中断。", "P0 链路至少在一台主流 iPhone 和一台主流 Android 真机完成。"]} /></Card></section>

      <section id="viewport" data-knowledge-section className="mb-14"><Header icon="📐" title="分辨率、缩放与响应式" badge="看得见，更要点得到" /><Table title="建议覆盖的宽度区间" headers={["宽度或缩放", "代表环境", "重点验证"]} rows={viewportRows} /><Card title="视觉检查不只看截图"><List items={["正文、表格、弹窗和提示不被裁切或遮挡。", "按钮、输入框和菜单在当前宽度下可以操作。", "固定定位元素不会挡住核心操作。", "键盘导航和 200% 缩放下仍能完成主流程。"]} /></Card></section>

      <section id="network" data-knowledge-section className="mb-14"><Header icon="📶" title="网络兼容与恢复能力" badge="网络差是用户日常" /><Table title="网络场景" headers={["环境", "模拟方式", "预期表现"]} rows={networkRows} /><Card title="交易类页面必须确认"><List items={["提交按钮防重复点击，服务端接口具备幂等性。", "超时后用户能确认最终结果，而不是盲目再提交。", "重试不会重复扣款、发券、创建订单或发送消息。"]} /></Card></section>

      <section id="locale" data-knowledge-section className="mb-14"><Header icon="🌏" title="语言、地区与数据兼容" badge="换一组数据，页面可能就坏了" /><div className="grid gap-4 md:grid-cols-2"><Card title="文本与字符"><List items={["中英文、长单词、Emoji、特殊符号和组合字符。", "姓名、地址、搜索和导出过程不乱码。", "长标题能换行或截断，并可查看完整内容。"]} /></Card><Card title="地区规则"><List items={["时区切换后日期边界、定时任务和记录时间正确。", "货币符号、小数位、千分位和负数格式正确。", "不同地区的日期、手机号和地址格式可输入。"]} /></Card></div><Card title="数据兼容"><List items={["旧数据缺少新字段时页面不会崩溃。", "null、空数组、超长列表和历史枚举值有合理展示。", "导入导出保持编码、换行和字段顺序兼容。"]} /></Card></section>

      <section id="upgrade" data-knowledge-section className="mb-14"><Header icon="⬆️" title="版本升级与向后兼容" badge="新版本不能把老用户留在原地" /><Card title="Web 与 API"><List items={["前端新版本访问旧接口有明确兼容窗口。", "接口新增字段不破坏旧客户端，删除或改名有版本策略。", "缓存旧结构、旧链接和旧书签仍能安全处理。"]} /></Card><Card title="App 升级"><List items={["覆盖升级安装、跨版本升级、覆盖安装和首次启动迁移。", "本地草稿、登录状态、下载文件和用户设置按约定保留。", "强制升级、可选升级、升级失败都有清晰路径。"]} /></Card></section>

      <section id="tools" data-knowledge-section className="mb-14"><Header icon="🧰" title="工具与执行流程" badge="自动化铺面，真机验证关键风险" /><div className="grid gap-4 md:grid-cols-2"><Card title="常用工具"><List items={["Chrome DevTools：设备模式、网络限速、媒体特性。", "Playwright：Chromium、Firefox、WebKit 跨浏览器回归。", "BrowserStack 或 Sauce Labs：云端真实浏览器与设备。", "Android Emulator、iOS Simulator 与关键真机。"]} /></Card><Card title="推荐流程"><List ordered items={["基于数据和风险确定支持范围与 P0 组合。", "自动化跑核心链路和响应式断点。", "真机检查触控、键盘、权限、切网和中断。", "缺陷记录完整环境并在同组合复现。", "修复后回归原组合，再抽查相邻组合。"]} /></Card></div></section>

      <section id="checklist" data-knowledge-section className="mb-14"><Header icon="✅" title="兼容性测试检查清单" badge="测试前 / 测试中 / 发布前" /><div className="grid gap-4 md:grid-cols-3"><Card title="测试前"><List items={["支持范围已确认", "矩阵有数据依据", "P0 组合已标记", "真机和账号已准备"]} /></Card><Card title="测试中"><List items={["核心流程跨浏览器通过", "主流手机真机验证", "弱网与切网已覆盖", "缺陷记录完整环境"]} /></Card><Card title="发布前"><List items={["P0/P1 问题已关闭", "不支持环境有升级提示", "升级与旧数据已验证", "自动化结果可追溯"]} /></Card></div></section>
    </KnowledgeLayout>
  </div>;
}

function Header({ icon, title, badge }: { icon: string; title: string; badge: string }) { return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 text-lg">{icon}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function List({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={cn("mt-3 space-y-2 pl-5", ordered ? "list-decimal" : "list-disc")}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-space-border/50 last:border-b-0">{row.map((cell) => <td key={cell} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
