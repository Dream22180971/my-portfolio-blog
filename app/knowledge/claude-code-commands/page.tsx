import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";

export const metadata = buildPageMetadata({
  title: "Claude Code 命令手册 — 完整参考",
  description: "Claude Code 交互式斜杠命令、终端 CLI、键盘快捷键、自定义扩展完整参考手册",
  path: "/knowledge/claude-code-commands",
  tags: ["Claude Code", "AI", "CLI", "开发工具"],
});

const slashCommands = [
  ["/init", "初始化项目，生成 CLAUDE.md 记忆文件，存储项目规范与技术栈", "首次使用推荐执行，AI 将记住项目上下文"],
  ["/memory", "快速编辑 CLAUDE.md，补充或修改长期记忆", "适合追加编码规范、依赖说明等"],
  ["/add-dir <路径>", "添加额外目录作为工作区，扩大 Claude 可访问范围", "/add-dir ../shared-lib"],
  ["/clear", "清除当前会话对话历史，开启全新上下文", "适合重新开始复杂任务"],
  ["/compact [说明]", "压缩对话上下文，通过生成摘要节省 Token", '/compact "重点在数据库优化"'],
  ["/context", "展示上下文 Token 使用情况（已用/上限）", "帮助控制成本"],
  ["/resume", "切换到其他历史会话，继续之前的工作", "显示会话列表后选择 ID 恢复"],
  ["/rewind", "回退到之前的检查点，撤销一系列操作", "适合实验性修改后恢复"],
  ["/review", "请求代码审查，分析代码并提供优化建议", "审查当前未提交的改动"],
  ["/pr_comments", "查看 GitHub Pull Request 中的评论", "需要 GitHub 集成配置"],
  ["/diff", "显示工作区相对于上次提交的差异", "快速查看未暂存改动"],
  ["/config", "查看或修改 Claude Code 配置（主题、模型等）", "交互式修改偏好"],
  ["/model [模型名]", "会话中动态切换 AI 模型", "/model sonnet 或 /model opus"],
  ["/permissions", "查看或更新 Claude 可使用的工具权限", "细粒度控制安全边界"],
  ["/status", "查看账户状态、系统信息和连接情况", "诊断环境问题"],
  ["/cost", "显示当前会话 Token 使用量和预估费用", "实时监控支出"],
  ["/usage", "查看套餐使用量和速率限制状态", "API 速率参考"],
  ["/doctor", "对 Claude Code 安装和环境进行诊断", "遇到异常时首选"],
  ["/login / /logout", "登录或登出 Anthropic 账户", "用于授权管理"],
  ["/mcp", "管理 MCP 连接，接入外部数据源", "扩展能力"],
  ["/terminal-setup", "配置终端，方便使用 Shift+Enter 多行输入", "提升输入体验"],
  ["/vim", "进入 Vim 编辑模式", "经典键位支持"],
  ["/help", "显示所有命令帮助", "/help shortcuts 看快捷键"],
  ["/bug <说明>", "向 Anthropic 报告 Bug", "帮助官方改进"],
  ["/plan", "进入计划模式，先生成计划再分步实施", "大型重构利器"],
  ["/exit", "退出当前会话（也可用 Ctrl+D）", ""],
];

const cliCommands = [
  ["claude", "在当前目录启动交互式会话", "claude"],
  ["claude -c / --continue", "继续最近一次的会话", "claude -c"],
  ["claude -r <session-id>", "恢复指定 ID 的历史会话", "claude -r abc123def"],
  ['claude -p "查询内容"', "非交互模式执行一次查询后退出", 'claude -p "解释这个函数"'],
  ['claude "提示词"', "携带初始提示启动交互式会话", 'claude "修复登录页样式"'],
  ['cat file | claude -p "..."', "通过管道传递文件内容作为上下文", 'cat app.js | claude -p "审查这个文件"'],
  ["claude update", "将 Claude Code 更新到最新版本", "claude update"],
];

const shortcuts = [
  ["Ctrl + C", "中断 Claude 当前的生成或任务"],
  ["Ctrl + D", "退出当前会话"],
  ["Ctrl + L", "清空当前终端屏幕"],
  ["Ctrl + R", "在会话历史中搜索之前输入的命令"],
  ["Shift + Tab", "在普通模式、自动接受模式和计划模式间切换"],
  ["Shift + Enter", "实现多行输入，方便编写复杂提示词"],
];

const sections: SectionItem[] = [
  { id: "sec-slash", label: "斜杠命令" },
  { id: "sec-cli", label: "CLI 命令" },
  { id: "sec-shortcuts", label: "快捷键" },
  { id: "sec-custom", label: "自定义命令" },
  { id: "sec-tips", label: "实用贴士" },
];

export default function ClaudeCodeCommandsPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link
        href="/knowledge"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回手册列表
      </Link>

      <KnowledgeLayout sections={sections}>
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            Claude Code 命令手册
          </h1>
          <p className="text-text-secondary text-lg mb-6">
            交互式斜杠命令 · 终端 CLI · 快捷键 · 自定义扩展 — 完整参考手册
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <span>26 斜杠命令</span>
            <span>7 CLI 命令</span>
            <span>6 快捷键</span>
            <span>自定义扩展</span>
          </div>
        </div>

        {/* ========== 1. 斜杠命令 ========== */}
        <section id="sec-slash" data-knowledge-section className="mb-14">
          <SectionHeader icon="⚡" color="cyan" title="斜杠命令" badge="会话内使用 / + 命令" />
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-space-border">
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5 w-1/5">命令</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5">功能说明</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5 w-1/4">示例 / 备注</th>
                  </tr>
                </thead>
                <tbody>
                  {slashCommands.map(([cmd, desc, example], i) => (
                    <tr key={i} className="border-b border-space-border/50 last:border-b-0 hover:bg-neon-cyan/[0.02]">
                      <td className="px-4 py-2.5"><code className="text-xs">{cmd}</code></td>
                      <td className="px-4 py-2.5 text-text-secondary text-xs">{desc}</td>
                      <td className="px-4 py-2.5 text-text-secondary text-xs">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* ========== 2. 终端 CLI 命令 ========== */}
        <section id="sec-cli" data-knowledge-section className="mb-14">
          <SectionHeader icon="🖥" color="blue" title="终端 CLI 命令" badge="在 shell 中执行" />
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-space-border">
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5 w-1/4">命令</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5">功能说明</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5 w-1/4">示例</th>
                  </tr>
                </thead>
                <tbody>
                  {cliCommands.map(([cmd, desc, example], i) => (
                    <tr key={i} className="border-b border-space-border/50 last:border-b-0 hover:bg-neon-cyan/[0.02]">
                      <td className="px-4 py-2.5"><code className="text-xs">{cmd}</code></td>
                      <td className="px-4 py-2.5 text-text-secondary text-xs">{desc}</td>
                      <td className="px-4 py-2.5"><code className="text-xs">{example}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* ========== 3. 键盘快捷键 ========== */}
        <section id="sec-shortcuts" data-knowledge-section className="mb-14">
          <SectionHeader icon="⌨" color="purple" title="键盘快捷键" badge="提升操作效率" />
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-space-border">
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5 w-1/3">快捷键</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5">功能说明</th>
                  </tr>
                </thead>
                <tbody>
                  {shortcuts.map(([key, desc], i) => (
                    <tr key={i} className="border-b border-space-border/50 last:border-b-0 hover:bg-neon-cyan/[0.02]">
                      <td className="px-4 py-2.5"><code className="text-xs">{key}</code></td>
                      <td className="px-4 py-2.5 text-text-secondary text-xs">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* ========== 4. 自定义命令 ========== */}
        <section id="sec-custom" data-knowledge-section className="mb-14">
          <SectionHeader icon="🛠" color="orange" title="自定义命令" badge="打造专属快捷指令" />
          <Card>
            <p className="text-text-secondary text-sm mb-4">
              在 <code>.claude/commands/</code> 目录下创建 Markdown (<code>.md</code>) 文件，文件名即为命令名。
              例如创建 <code>test.md</code> → 会话中输入 <code>/test</code> 即可调用。
            </p>
            <div className="rounded-xl border border-neon-yellow/20 bg-neon-yellow/5 p-4 mb-4 text-sm">
              <p className="text-text-primary mb-1"><strong>参数传递</strong>：在命令文件中使用 <code>$ARGUMENTS</code> 占位符接收附加参数。</p>
              <p className="text-text-secondary"><strong>作用范围</strong>：项目级 <code>项目根目录/.claude/commands/</code> · 用户级 <code>~/.claude/commands/</code>（全局可用）</p>
            </div>
            <CodeBlock title=".claude/commands/review.md">
{`请对以下代码进行严格审查，重点关注性能和安全：
$ARGUMENTS
完成后给出重构建议。`}
            </CodeBlock>
            <p className="text-text-secondary text-xs mt-3">
              之后使用 <code>/review src/util.js</code> 即可自动填充参数。
            </p>
          </Card>
        </section>

        {/* ========== 5. 实用贴士 ========== */}
        <section id="sec-tips" data-knowledge-section className="mb-14">
          <SectionHeader icon="💡" color="green" title="实用贴士" />
          <Card>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-2"><span className="text-neon-cyan flex-shrink-0">📌</span> <code>/help</code> 永远是最快的求助入口，支持查看快捷键与可用模型。</li>
              <li className="flex gap-2"><span className="text-neon-green flex-shrink-0">⚙️</span> 计划模式 <code>/plan</code> 处理复杂任务时能大幅提升成功率，建议多步骤重构前开启。</li>
              <li className="flex gap-2"><span className="text-neon-yellow flex-shrink-0">💰</span> 使用 <code>/cost</code> 和 <code>/context</code> 监控 token 消耗，避免意外超额。</li>
              <li className="flex gap-2"><span className="text-neon-purple flex-shrink-0">🧠</span> <code>/init</code> 与 <code>/memory</code> 让 AI 长期记住项目规范，越用越懂你的代码库。</li>
              <li className="flex gap-2"><span className="text-neon-cyan flex-shrink-0">🔄</span> <code>/compact</code> 可以在对话过长时压缩上下文，保留核心信息继续对话，节省费用。</li>
              <li className="flex gap-2"><span className="text-neon-green flex-shrink-0">⌨️</span> 搭配 <code>/terminal-setup</code> 启用 Shift+Enter 多行输入，体验更流畅。</li>
            </ul>
          </Card>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

/* ========== Shared Components ========== */

function SectionHeader({ icon, color, title, badge }: { icon: string; color: string; title: string; badge?: string }) {
  const colorMap: Record<string, string> = {
    cyan: "bg-neon-cyan/10",
    blue: "bg-neon-cyan/10",
    purple: "bg-neon-purple/10",
    orange: "bg-[rgba(255,171,64,0.12)]",
    green: "bg-neon-green/10",
  };
  return (
    <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-space-border">
      <div className={`w-10 h-10 rounded-xl ${colorMap[color] || colorMap.cyan} flex items-center justify-center text-lg flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan font-medium">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="card-glow rounded-xl p-5">
      {children}
    </div>
  );
}

function CodeBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-space-border bg-black/30">
      <div className="px-4 py-2 border-b border-space-border bg-space-card/50">
        <span className="text-[11px] text-text-secondary uppercase tracking-wider">{title}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        <code className="text-neon-cyan/80">{children}</code>
      </pre>
    </div>
  );
}
