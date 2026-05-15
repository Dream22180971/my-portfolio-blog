import type { Metadata } from "next";
import { Rocket, Compass, BookOpen, BrainCircuit, Wand2, PenTool, Lightbulb, Globe, Music, Film, Camera, Code2, Coffee } from "lucide-react";
import { ContactBar } from "@/components/ContactBar";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildPageMetadata({
  title: "关于我",
  description: "AI Agent 开发者，从测试工程师转型。专注 RAG 知识库、AI Agent 产品化与自动化工作流。",
  path: "/about",
});

const timeline = [
  {
    year: "2026",
    title: "AI 独立开发者",
    desc: "转型探索中，RAG 知识库 + Coze Bot + AI Agent 项目落地，博客上线。",
    icon: "🤖",
  },
  {
    year: "2022-2026",
    title: "软件测试工程师",
    desc: "功能测试、接口测试、自动化测试、性能测试，从手工测试到搭建 CI/CD 持续集成流水线，把质量保障做进了全流程。",
    icon: "🧪",
  },
  {
    year: "2018-2022",
    title: "计算机科学与技术专业在读",
    desc: "数据结构、操作系统、计算机网络、计算机组成原理、数据库系统、软件工程，四年把计算机的里里外外摸了一遍。",
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
          软件测试工程师 → AI 独立开发者
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

        {/* 我是谁 */}
        <div className="pt-2">
          <div className="text-xs font-mono text-neon-cyan mb-2">我是谁</div>
          <p className="text-text-secondary leading-relaxed">
            肖恩沃尔特（seanwalter），一个从测试岗转型到 AI 方向的开发者，正在学习和拥抱AI，持续探索 AI Agent 产品化与自动化工作流。
          </p>
        </div>

        {/* 关于本站 */}
        <div className="pt-2">
          <div className="text-xs font-mono text-neon-purple mb-2">关于本站</div>
          <p className="text-text-secondary leading-relaxed">
            建立于 2026 年 5 月 1 日，是本人的博客技术站，免费托管于 Vercel，基于 Next.js 构建。持续记录与分享成长路上的点滴，欢迎收藏。
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
            AI 应用开发、AI 应用出海、AI 商业变现、AI 用户增长、AI 内容运营、AI 视频创作、AI 图文创作。
          </p>
        </div>

        <ContactBar email="3310103904@qq.com" wechat="drmr2022" />
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
            const colorClass = cn(
              item.color === "cyan" && "border-neon-cyan/20 bg-neon-cyan/10 text-neon-cyan",
              item.color === "purple" && "border-neon-purple/20 bg-neon-purple/10 text-neon-purple",
              item.color === "green" && "border-neon-green/20 bg-neon-green/10 text-neon-green"
            );

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
            const borderColor = cn(
              item.color === "cyan" && "border-l-neon-cyan",
              item.color === "purple" && "border-l-neon-purple",
              item.color === "green" && "border-l-neon-green"
            );
            const nameColor = cn(
              item.color === "cyan" && "text-neon-cyan",
              item.color === "purple" && "text-neon-purple",
              item.color === "green" && "text-neon-green"
            );

            return (
              <div
                key={item.name}
                className={cn("card-glow rounded-xl p-5 border-l-2 animate-slide-up", borderColor)}
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
          周末会去南京周边爬山，偶尔写写公众号，也会持续发一些 AI 学习笔记。平时喜欢看书，尤其关注哲学、心理学和那些能帮助人理解自我、理解选择与长期主义的内容。喜欢音乐，流行、摇滚、民谣都听。歌单很杂，人在歌里找自己。也爱拍照，不挑器材不修图。现在随手按下的，都是以后往回看的。翻书和按快门，是两件能让我慢下来的事。
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
          <span className="tag tag-cyan">
            <Camera className="mr-1 h-3 w-3" />
            摄影 / 记录
          </span>
          <span className="tag tag-green">
            <Coffee className="mr-1 h-3 w-3" />
            爬山 / 写作
          </span>
          <span className="tag tag-purple">
            <Music className="mr-1 h-3 w-3" />
            音乐 / 流行 / 民谣
          </span>
        </div>
      </section>

      {/* 名字的由来 */}
      <section className="card-glow rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <Film className="w-5 h-5 text-neon-purple" />
          名字的由来
        </h2>
        <blockquote className="border-l-2 border-neon-purple/40 pl-4 space-y-2">
          <p className="text-sm text-text-secondary italic leading-7">
            &ldquo;To see the world, things dangerous to come to, to see behind walls, draw closer,
            to find each other, and to feel. That is the purpose of life.&rdquo;
          </p>
          <p className="text-sm text-text-secondary leading-7">
            看见世界，冲破险境，看见彼此，靠近彼此，感受一切。这就是生活的意义。
          </p>
          <p className="text-xs text-text-muted">——《白日梦想家》The Secret Life of Walter Mitty</p>
        </blockquote>
        <p className="text-text-secondary leading-relaxed">
          这部电影是我网名的来源。<strong className="text-text-primary">Sean</strong> 是片中那个满世界拍照、拍完就消失的传奇摄影师；
          <strong className="text-text-primary">Walter</strong> 是那个坐在办公桌前做白日梦、最终真正走出去的普通人。
          一个是理想中的自己，一个是正在成为的自己。
        </p>
      </section>
    </div>
  );
}
