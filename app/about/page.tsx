import { MapPin, Rocket, Compass, Coffee, Code2, MessageSquare, BookOpen, BrainCircuit, Wand2, PenTool, Lightbulb, Globe } from "lucide-react";

const timeline = [
  {
    year: "2026",
    title: "AI Agent 开发者",
    desc: "转型成功，RAG 知识库 + Coze Bot + AI Agent 项目落地，博客上线。",
    icon: "🤖",
  },
  {
    year: "2024",
    title: "自动化测试工程师",
    desc: "QA 岗位，Python automation、CI/CD、接口测试，顺便把 Python 练熟了。",
    icon: "🧪",
  },
  {
    year: "基石",
    title: "计算机科班出身",
    desc: "数据结构、算法、软件工程基础扎实（当年考试没挂科）。",
    icon: "📚",
  },
];

const skills = {
  "AI & LLM": [
    "LangChain",
    "LangGraph",
    "RAG 系统",
    "FAISS",
    "DashScope",
    "Coze 平台",
    "Prompt Engineering",
  ],
  "前端": ["Next.js", "React", "TypeScript", "Vue 3", "TailwindCSS"],
  "后端": ["Python", "FastAPI", "Node.js", "SQLite"],
  "工具": ["Git", "Docker", "GitHub Actions", "Vercel"],
};

const capabilityMatrix = [
  {
    icon: PenTool,
    title: "多平台内容写作",
    desc: "公众号 / 抖音 / 小红书三平台写作框架，掌握各平台算法逻辑和标题公式。",
    color: "cyan",
    tags: ["爆款标题", "算法适配", "种草写法"],
  },
  {
    icon: Wand2,
    title: "AI Skill 体系",
    desc: "自建 Skill 系统覆盖内容生产、设计原型、数据分析，把 AI 能力封装成可复用工具。",
    color: "purple",
    tags: ["Skill 设计", "工作流", "自动化"],
  },
  {
    icon: Lightbulb,
    title: "产品思维顾问",
    desc: "集成鱼皮产品心法 + 孙子兵法战略 + 鬼谷子说服力等决策框架，辅助产品和商业判断。",
    color: "green",
    tags: ["产品决策", "战略分析", "影响力"],
  },
  {
    icon: BrainCircuit,
    title: "古典智慧决策",
    desc: "道德经 / 王阳明心学 / 韩非子权力 / 庄子逍遥，用东方哲学解决现代问题。",
    color: "cyan",
    tags: ["认知升级", "领导力", "心性修炼"],
  },
  {
    icon: Code2,
    title: "HTML 原型与动画",
    desc: "花叔 Design 能力：高保真原型、交互动画、幻灯片、视频导出，一个 HTML 搞定。",
    color: "purple",
    tags: ["原型设计", "GSAP 动画", "MP4 导出"],
  },
  {
    icon: Globe,
    title: "数字产品变现",
    desc: "从选品到制作到上架到自动发货，跑通小红书引流 + 闲鱼成交的完整闭环。",
    color: "green",
    tags: ["闲鱼运营", "自动发货", "引流闭环"],
  },
];

const contentMatrix = [
  {
    name: "seanwalter",
    platform: "博客 + GitHub",
    desc: "AI Agent 开发者的技术阵地，项目复盘与深度文章",
    color: "cyan",
  },
  {
    name: "白日梦想家",
    platform: "小红书 + 闲鱼",
    desc: "AI 工具测评 · 效率技巧 · 设计模板，数字产品变现",
    color: "purple",
  },
  {
    name: "肖恩的AI产品日记",
    platform: "抖音",
    desc: "AI 产品实操记录，爆款长文 2.3 万播放，真实踩坑分享",
    color: "green",
  },
  {
    name: "晚年暖心话",
    platform: "微信公众号",
    desc: "中老年情感赛道探索，15 篇系列文章，内容方法论实验",
    color: "cyan",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">关于我</h1>
        <p className="text-text-secondary">
          自动化测试工程师 → AI Agent 开发者
        </p>
      </div>

      {/* 你是谁 */}
      <section className="card-glow rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-2xl font-bold text-white">
            肖
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">seanwalter</h2>
            <p className="text-sm text-text-secondary">Dream22180971 @ GitHub</p>
          </div>
        </div>

        {/* 新增：你是谁 */}
        <div className="pt-2">
          <div className="text-xs font-mono text-neon-cyan mb-2">我是谁</div>
          <p className="text-text-secondary leading-relaxed">
            一个从测试岗转型到 AI 方向的开发者，正在备考雅思（IELTS 6.5）。
            写代码不是为了炫技，是为了解决问题。
          </p>
        </div>

        {/* 你在做什么方向 */}
        <div className="pt-2">
          <div className="text-xs font-mono text-neon-purple mb-2 flex items-center gap-2">
            <Rocket className="w-3 h-3" /> 当前方向
          </div>
          <p className="text-text-secondary leading-relaxed">
            <strong>RAG 知识库</strong>和<strong>AI Agent 搭建</strong>。已有的项目：
            VoyageAI（旅行规划）、RAG Knowledge Base Demo、Coze 电商智能客服。
            「运营 AI 内容助手」已上线，支持小红书/抖音/公众号多平台内容生成。
          </p>
        </div>

        {/* 你在探索什么 */}
        <div className="pt-2">
          <div className="text-xs font-mono text-neon-green mb-2 flex items-center gap-2">
            <Compass className="w-3 h-3" /> 正在探索
          </div>
          <p className="text-text-secondary leading-relaxed">
            LangGraph 多智能体协作、Graphify 代码结构图谱、企业级 RAG 落地最佳实践、
            怎么把大模型变成「真有用」而不是「听起来很酷」。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-text-secondary">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neon-cyan" />
            南京
          </span>
          <a
            href="https://github.com/Dream22180971"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
          >
            <Code2 className="w-4 h-4" />
            GitHub
          </a>
          <a href="mailto:3310103904@qq.com" className="flex items-center gap-2 hover:text-neon-cyan transition-colors">
            <MessageSquare className="w-4 h-4" />
            3310103904@qq.com
          </a>
          <span className="flex items-center gap-2">
            <Coffee className="w-4 h-4" />
            微信: drmr2022
          </span>
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">经历</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-space-border" />
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-10 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="absolute left-2 w-4 h-4 rounded-full bg-space-card border-2 border-neon-cyan" />
                <div className="card-glow rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-mono text-neon-cyan">{item.year}</span>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">技能</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(skills).map(([category, items], i) => (
            <div
              key={category}
              className={`card-glow rounded-xl p-5 animate-slide-up stagger-${Math.min(i + 1, 5)}`}
            >
              <h3 className="font-mono text-sm text-neon-cyan mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="tag tag-cyan">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 能力矩阵 */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">能力矩阵</h2>
          <p className="mt-2 text-sm text-text-secondary">
            除了写代码，我还构建了一套 Skill + Agent 能力体系，覆盖内容生产、产品设计、决策辅助和商业变现。
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilityMatrix.map((item, i) => {
            const Icon = item.icon;
            const colorClass =
              item.color === "cyan"
                ? "border-neon-cyan/20 bg-neon-cyan/10 text-neon-cyan"
                : item.color === "purple"
                ? "border-neon-purple/20 bg-neon-purple/10 text-neon-purple"
                : "border-neon-green/20 bg-neon-green/10 text-neon-green";

            return (
              <div
                key={item.title}
                className="card-glow rounded-xl p-5 animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className={`rounded-xl border p-2.5 ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
                </div>
                <p className="text-xs leading-6 text-text-secondary mb-3">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag tag-cyan text-[10px] py-0.5 px-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 内容矩阵 */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">内容矩阵</h2>
          <p className="mt-2 text-sm text-text-secondary">
            不同平台、不同名字、不同定位——多线作战，每条线都在跑。
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {contentMatrix.map((item, i) => {
            const borderColor =
              item.color === "cyan"
                ? "border-l-neon-cyan"
                : item.color === "purple"
                ? "border-l-neon-purple"
                : "border-l-neon-green";
            const nameColor =
              item.color === "cyan"
                ? "text-neon-cyan"
                : item.color === "purple"
                ? "text-neon-purple"
                : "text-neon-green";

            return (
              <div
                key={item.name}
                className={`card-glow rounded-xl p-5 border-l-2 ${borderColor} animate-slide-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-semibold ${nameColor}`}>{item.name}</span>
                </div>
                <div className="text-xs font-mono text-text-muted mb-2">{item.platform}</div>
                <p className="text-xs leading-6 text-text-secondary">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 一点点人感 */}
      <section className="card-glow rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">工作之外</h2>
        <p className="text-text-secondary leading-relaxed">
          周末会去南京周边爬山，偶尔写写公众号，也会持续发一些 AI 学习笔记。平时喜欢看书，尤其关注哲学、心理学和那些能帮助人理解自我、
          理解选择与长期主义的内容。雅思备考中，目标是 6.5，每天背单词、练口语，也把阅读当成让自己慢下来的一种方式。
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="tag tag-cyan">
            <BookOpen className="mr-1 h-3 w-3" />
            喜欢看书
          </span>
          <span className="tag tag-purple">
            <BrainCircuit className="mr-1 h-3 w-3" />
            哲学 / 心理学
          </span>
          <span className="tag tag-green">
            <Coffee className="mr-1 h-3 w-3" />
            爬山 / 写作 / 备考
          </span>
        </div>
      </section>
    </div>
  );
}
