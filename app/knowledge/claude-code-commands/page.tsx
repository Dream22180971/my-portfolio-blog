import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";

export const metadata = buildPageMetadata({
  title: "Claude Code 命令手册 — 完整参考",
  description: "Claude Code 交互式斜杠命令、终端 CLI、CLI 参数、键盘快捷键、自定义扩展、新特性完整参考手册",
  path: "/knowledge/claude-code-commands",
  tags: ["Claude Code", "AI", "CLI", "开发工具", "Hooks", "Plugins", "Agents"],
});

const slashCommands = [
  // 项目管理
  ["/init", "初始化项目，生成 CLAUDE.md 记忆文件", "首次使用推荐执行"],
  ["/memory", "快速编辑 CLAUDE.md，补充或修改长期记忆", "追加编码规范、依赖说明等"],
  ["/add-dir <路径>", "添加额外目录作为工作区", "/add-dir ../shared-lib"],
  // 对话管理
  ["/clear", "清除当前会话对话历史，开启全新上下文", "适合重新开始复杂任务"],
  ["/compact [说明]", "压缩对话上下文，通过摘要节省 Token", '/compact "重点在数据库优化"'],
  ["/context", "展示上下文 Token 使用情况（已用/上限）", "帮助控制成本"],
  ["/resume", "切换到其他历史会话", "显示会话列表后选择 ID 恢复"],
  ["/rewind", "回退到之前的检查点", "适合实验性修改后恢复"],
  // 代码开发
  ["/review", "请求代码审查并提供优化建议", "审查当前未提交的改动"],
  ["/pr_comments", "查看 GitHub PR 中的评论", "需要 GitHub 集成"],
  ["/diff", "显示工作区相对于上次提交的差异", "快速查看未暂存改动"],
  // 系统配置
  ["/config", "查看或修改 Claude Code 配置", "主题、模型等偏好"],
  ["/model [模型名]", "会话中动态切换 AI 模型", "/model sonnet 或 /model opus"],
  ["/permissions", "查看或更新工具权限", "细粒度控制安全边界"],
  ["/status", "查看账户状态和系统信息", "诊断环境问题"],
  ["/cost", "显示 Token 使用量和预估费用", "实时监控支出"],
  ["/usage", "查看套餐使用量和速率限制", "API 速率参考"],
  ["/doctor", "对安装和环境进行诊断", "遇到异常时首选"],
  ["/login / /logout", "登录或登出 Anthropic 账户", "授权管理"],
  // 扩展能力
  ["/mcp", "管理 MCP 连接，接入外部数据源", "扩展能力"],
  ["/skill <名称>", "调用已注册的 Skill 技能", "/frontend-design、/webapp-testing"],
  ["/loop [间隔] <提示词>", "按间隔循环执行提示词", "/loop 5m /check-deploy"],
  ["/update-config", "配置 settings.json、hooks、权限、环境变量", "自动化行为设置"],
  ["/keybindings-help", "自定义键盘快捷键", "修改 ~/.claude/keybindings.json"],
  ["/fewer-permission-prompts", "自动白名单只读命令，减少权限弹窗", "提升操作流畅度"],
  // 输入与模式
  ["/terminal-setup", "配置终端多行输入", "启用 Shift+Enter"],
  ["/vim", "进入 Vim 编辑模式", "经典键位支持"],
  ["/plan", "进入计划模式，先生成计划再分步实施", "大型重构利器"],
  // 其他
  ["/help", "显示所有命令帮助", "/help shortcuts 看快捷键"],
  ["/bug <说明>", "向 Anthropic 报告 Bug", "帮助官方改进"],
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
  ["claude auth", "管理登录认证（登录/登出/查看状态）", "claude auth status"],
  ["claude config", "查看或修改全局配置项", "claude config set theme dark"],
  ["claude install", "安装 Claude Code 到系统 PATH", "claude install"],
  ["claude project", "管理项目级配置与记忆", "claude project init"],
  ["claude agents", "列出和管理已注册的 Agent", "claude agents list"],
  ["claude plugin", "管理插件的安装、更新和卸载", "claude plugin list"],
  ["claude setup-token", "配置 API Token 进行本地认证", "claude setup-token"],
];

const shortcuts = [
  ["Ctrl + C", "中断 Claude 当前的生成或任务"],
  ["Ctrl + D", "退出当前会话"],
  ["Ctrl + L", "清空当前终端屏幕"],
  ["Ctrl + R", "在会话历史中搜索之前输入的命令"],
  ["Escape", "中断生成 / 返回输入框 / 关闭弹窗"],
  ["Shift + Tab", "在普通模式、自动接受模式和计划模式间切换"],
  ["Shift + Enter", "实现多行输入，方便编写复杂提示词"],
];

const cliFlags = [
  ["--agent <name>", "指定使用的自定义 Agent", "claude --agent code-reviewer"],
  ["--bare", "最小化模式，禁用所有扩展和 hooks", "claude --bare"],
  ["--effort <level>", "设置推理努力程度: low / medium / high", "claude --effort high"],
  ["--fork-session", "分叉当前会话创建新分支", "claude --fork-session"],
  ["--json-schema <schema>", "定义输出的 JSON Schema 结构", 'claude -p --json-schema schema.json'],
  ["--max-budget-usd <amount>", "设置单次会话最大预算（美元）", "claude --max-budget-usd 5"],
  ["-w / --worktree", "在 Git worktree 隔离环境中工作", "claude -w"],
  ["--remote-control", "启用手机远程控制", "claude --remote-control"],
  ["--model <model>", "指定使用的 AI 模型", "claude --model opus"],
  ["--permission-mode <mode>", "设置权限模式: default / auto-accept", "claude --permission-mode auto-accept"],
  ["--system-prompt <prompt>", "追加自定义系统提示词", 'claude --system-prompt "你是测试专家"'],
  ["--append-system-prompt <prompt>", "在默认系统提示后追加内容", 'claude --append-system-prompt "遵循ESLint规范"'],
  ["--mcp-config <file>", "指定 MCP 服务器配置文件路径", "claude --mcp-config servers.json"],
  ["--resume <session-id>", "恢复指定会话（等同 -r）", "claude --resume abc123"],
  ["--output-format <format>", "输出格式: text / json / stream-json", "claude -p --output-format json"],
  ["--verbose", "输出详细调试日志", "claude --verbose"],
  ["--no-cache", "禁用提示词缓存", "claude --no-cache"],
  ["--debug", "开启调试模式，输出内部状态", "claude --debug"],
];

const sections: SectionItem[] = [
  { id: "sec-slash", label: "斜杠命令" },
  { id: "sec-cli", label: "CLI 命令" },
  { id: "sec-flags", label: "CLI 参数" },
  { id: "sec-shortcuts", label: "快捷键" },
  { id: "sec-custom", label: "自定义命令" },
  { id: "sec-features", label: "新特性" },
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
            <span>31 斜杠命令</span>
            <span>14 CLI 命令</span>
            <span>7 快捷键</span>
            <span>15+ CLI 参数</span>
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

        {/* ========== 3.5 CLI 参数 ========== */}
        <section id="sec-flags" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔧" color="blue" title="CLI 参数" badge="启动时传入" />
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-space-border">
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5 w-1/4">参数</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5">功能说明</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5 w-1/4">示例</th>
                  </tr>
                </thead>
                <tbody>
                  {cliFlags.map(([flag, desc, example], i) => (
                    <tr key={i} className="border-b border-space-border/50 last:border-b-0 hover:bg-neon-cyan/[0.02]">
                      <td className="px-4 py-2.5"><code className="text-xs">{flag}</code></td>
                      <td className="px-4 py-2.5 text-text-secondary text-xs">{desc}</td>
                      <td className="px-4 py-2.5"><code className="text-xs">{example}</code></td>
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

        {/* ========== 6. 新特性 ========== */}
        <section id="sec-features" data-knowledge-section className="mb-14">
          <SectionHeader icon="🚀" color="purple" title="新特性" badge="近期更新亮点" />
          <Card>
            <div className="space-y-5 text-sm">
              <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-4">
                <p className="text-neon-cyan font-semibold mb-1">🪝 Hooks</p>
                <p className="text-text-secondary">在工具调用前后自动执行自定义脚本，实现自动化流水线。配置在 <code>settings.json</code> 的 <code>hooks</code> 字段，支持 <code>PreToolUse</code>、<code>PostToolUse</code>、<code>Notification</code> 等事件。</p>
              </div>
              <div className="rounded-xl border border-neon-purple/20 bg-neon-purple/5 p-4">
                <p className="text-neon-purple font-semibold mb-1">🔌 Plugins</p>
                <p className="text-text-secondary">第三方插件生态，通过 <code>claude plugin install</code> 安装。插件可以注册自定义工具、MCP 服务器、Skills 等，扩展 Claude Code 能力边界。</p>
              </div>
              <div className="rounded-xl border border-neon-green/20 bg-neon-green/5 p-4">
                <p className="text-neon-green font-semibold mb-1">🤖 Agents</p>
                <p className="text-text-secondary">注册和管理自定义 Agent。通过 <code>claude agents</code> 管理，每个 Agent 有独立的系统提示词、工具权限和模型配置，可复用复杂工作流。</p>
              </div>
              <div className="rounded-xl border border-neon-yellow/20 bg-neon-yellow/5 p-4">
                <p className="text-neon-yellow font-semibold mb-1">📡 Remote Control</p>
                <p className="text-text-secondary">手机远程控制 Claude Code 会话。启动时加 <code>--remote-control</code> 参数，手机扫码即可远程查看进度、发送指令。</p>
              </div>
              <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-4">
                <p className="text-neon-cyan font-semibold mb-1">🌳 Worktrees</p>
                <p className="text-text-secondary">在隔离的 Git worktree 中工作，不影响主分支。使用 <code>-w</code> 或 <code>--worktree</code> 参数启动，完成后可选择保留或删除。</p>
              </div>
              <div className="rounded-xl border border-neon-purple/20 bg-neon-purple/5 p-4">
                <p className="text-neon-purple font-semibold mb-1">📊 Structured Output</p>
                <p className="text-text-secondary">通过 <code>--json-schema</code> 参数定义输出 JSON Schema，Claude 的回复会严格遵循指定结构，方便程序化解析。</p>
              </div>
              <div className="rounded-xl border border-neon-green/20 bg-neon-green/5 p-4">
                <p className="text-neon-green font-semibold mb-1">⚡ Streaming</p>
                <p className="text-text-secondary">使用 <code>-p</code> 非交互模式时，输出实时流式返回而非等全部生成完毕。适合管道集成和实时监控。</p>
              </div>
            </div>
          </Card>
        </section>

        {/* ========== 7. 实用贴士 ========== */}
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
