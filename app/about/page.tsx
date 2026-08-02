import type { Metadata } from "next";
import { ContactBar } from "@/components/ContactBar";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "关于我",
  description: "AI Agent 开发者，从测试工程师转型。专注 RAG 知识库、AI Agent 产品化与自动化工作流。",
  path: "/about",
});

const timeline = [
  {
    year: "2026",
    title: "AI 独立开发者/交付测试工程师",
    desc: "探索将 AI Agent、智能化测试与自动化工作流融入交付项目，持续提升产品测试效率与交付质量。",
  },
  {
    year: "2022-2026",
    title: "软件测试工程师",
    desc: "功能测试、接口测试、自动化测试、性能测试，从手工测试到搭建 CI/CD 持续集成流水线，把质量保障做进了全流程。",
  },
  {
    year: "2018-2022",
    title: "计算机科学与技术专业在读",
    desc: "数据结构、操作系统、计算机网络、计算机组成原理、数据库系统、软件工程，四年把计算机的里里外外摸了一遍。",
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
    title: "多平台内容写作",
    desc: "公众号 / 抖音 / 小红书三平台写作框架，掌握各平台算法逻辑和标题公式。",
    tags: ["爆款标题", "算法适配", "种草写法"],
  },
  {
    title: "AI Skill 体系",
    desc: "自建 Skill 系统覆盖内容生产、设计原型、数据分析，把 AI 能力封装成可复用工具。",
    tags: ["Skill 设计", "工作流", "自动化"],
  },
  {
    title: "产品思维顾问",
    desc: "集成鱼皮产品心法 + 孙子兵法战略 + 鬼谷子说服力等决策框架，辅助产品和商业判断。",
    tags: ["产品决策", "战略分析", "影响力"],
  },
  {
    title: "古典智慧决策",
    desc: "道德经 / 王阳明心学 / 韩非子权力 / 庄子逍遥，用东方哲学解决现代问题。",
    tags: ["认知升级", "领导力", "心性修炼"],
  },
  {
    title: "HTML 原型与动画",
    desc: "花叔 Design 能力：高保真原型、交互动画、幻灯片、视频导出，一个 HTML 搞定。",
    tags: ["原型设计", "GSAP 动画", "MP4 导出"],
  },
];

const contentMatrix = [
  {
    name: "seanwalter",
    platform: "博客 + GitHub",
    desc: "AI Agent 开发者的技术阵地，项目复盘与深度文章",
  },
  {
    name: "白日梦想家",
    platform: "小红书 + 闲鱼",
    desc: "AI 工具测评 · 效率技巧 · 设计模板，数字产品变现",
  },
  {
    name: "肖恩的AI产品日记",
    platform: "抖音",
    desc: "AI 产品实操记录，爆款长文 2.3 万播放，真实踩坑分享",
  },
];

export default function AboutPage() {
  return (
    <div className="editorial-page editorial-page--wide">
      <header className="about-hero">
        <div>
          <p className="page-kicker">About / Sean Walter</p>
          <h1 className="about-name">肖恩沃尔特</h1>
          <p className="about-handle">SEAN WALTER · DREAM22180971 · HANGZHOU</p>
        </div>
        <div>
          <p className="about-intro">
            软件测试工程师 → AI 独立开发者。肖恩沃尔特（seanwalter），一个从测试岗转型到 AI 方向的开发者，正在学习和拥抱 AI，持续探索 AI Agent 产品化与自动化工作流。
          </p>
          <div className="about-contact">
            <ContactBar email="3310103904@qq.com" wechat="drmr2022" />
          </div>
        </div>
      </header>

      <section className="about-section">
        <h2 className="about-section-heading">现在，正在校准什么</h2>
        <div className="about-columns">
          <article className="about-columns__item">
            <span className="about-columns__label">01 / Identity</span>
            <div>
              <h3>我是谁</h3>
              <p>肖恩沃尔特（seanwalter），一个从测试岗转型到 AI 方向的开发者，正在学习和拥抱 AI，持续探索 AI Agent 产品化与自动化工作流。</p>
            </div>
          </article>
          <article className="about-columns__item">
            <span className="about-columns__label">02 / Site</span>
            <div>
              <h3>关于本站</h3>
              <p>建立于 2026 年 5 月 1 日，是本人的博客技术站，免费托管于 Vercel，基于 Next.js 构建。持续记录与分享成长路上的点滴，欢迎收藏。</p>
            </div>
          </article>
          <article className="about-columns__item">
            <span className="about-columns__label">03 / Focus</span>
            <div>
              <h3>当前方向</h3>
              <p><strong>RAG 知识库</strong>和<strong>AI Agent 搭建</strong>。已有的项目：VoyageAI（旅行规划）、RAG Knowledge Base Demo、Coze 电商智能客服。「运营 AI 内容助手」已上线，支持小红书/抖音/公众号多平台内容生成。</p>
            </div>
          </article>
          <article className="about-columns__item">
            <span className="about-columns__label">04 / Explore</span>
            <div>
              <h3>正在探索</h3>
              <p>AI 应用开发、AI 应用出海、AI 商业变现、AI 用户增长、AI 内容运营、AI 视频创作、AI 图文创作。</p>
            </div>
          </article>
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-heading">经历</h2>
        <div className="timeline-list">
          {timeline.map((item) => (
            <article key={item.year} className="timeline-item">
              <span className="timeline-item__year">{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-heading">技能</h2>
        <div className="about-skill-grid">
          {Object.entries(skills).map(([category, items]) => (
            <article key={category} className="about-skill-grid__item">
              <h3>{category}</h3>
              <p>{items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-heading">能力矩阵</h2>
        <p className="about-copy">除了写代码，我还构建了一套 Skill + Agent 能力体系，覆盖内容生产、产品设计、决策辅助和商业变现。</p>
        <div className="about-columns">
          {capabilityMatrix.map((item, index) => (
            <article key={item.title} className="about-columns__item">
              <span className="about-columns__label">Capability / {String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="about-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-heading">内容矩阵</h2>
        <p className="about-copy">不同平台、不同名字、不同定位——多线作战，每条线都在跑。</p>
        <div className="about-columns">
          {contentMatrix.map((item) => (
            <article key={item.name} className="about-columns__item">
              <span className="about-columns__label">{item.platform}</span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-heading">工作之外</h2>
        <p className="about-copy">
          喜欢音乐，也喜欢去演唱会听现场。短短三个小时，沉浸在人群、旋律与氛围里，也在一首首熟悉的歌中回望青春。喜欢爬山徒步，周末常往山里跑，让身体在行走中重新找回节奏。旅行时习惯用镜头记录沿途风景，在陌生的城市与山海之间，暂时忘记日常里的身份，只专注于眼前的光影与当下的美好。也喜欢读哲学与心理学，在关于自我、选择与关系的思考中，理解自己，也寻找自己。
        </p>
        <div className="about-tags">
          {['音乐 / 演唱会', '爬山 / 徒步', '旅行 / 摄影', '哲学 / 心理学', '阅读 / 寻找自我'].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-heading">名字的由来</h2>
        <blockquote className="about-quote">
          <p>&ldquo;To see the world, things dangerous to come to, to see behind walls, draw closer, to find each other, and to feel. That is the purpose of life.&rdquo;</p>
          <p>看见世界，冲破险境，看见彼此，靠近彼此，感受一切。这就是生活的意义。</p>
          <cite>——《白日梦想家》The Secret Life of Walter Mitty</cite>
        </blockquote>
        <p className="about-copy">
          这部电影是我网名的来源。<strong>Sean</strong> 是片中那个满世界拍照、拍完就消失的传奇摄影师；<strong>Walter</strong> 是那个坐在办公桌前做白日梦、最终真正走出去的普通人。一个是理想中的自己，一个是正在成为的自己。
        </p>
      </section>
    </div>
  );
}
