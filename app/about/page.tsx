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

const coreAbilities = [
  {
    title: "质量工程判断力",
    desc: "从测试视角识别边界、风险与成功标准，把质量判断前置到产品方案。",
  },
  {
    title: "AI Agent / RAG 落地",
    desc: "将检索、工作流与模型能力组织成能被真实用户使用和验证的产品路径。",
  },
  {
    title: "从 0 到 1 的产品验证",
    desc: "用原型、反馈与迭代，把还不确定的想法收敛成下一步可执行的方向。",
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
            软件测试工程师 → AI 独立开发者。我用测试工程建立判断力，也用 AI 把不确定的想法校准成可靠的产品。
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
              <p>肖恩沃尔特（seanwalter），从测试工程走向 AI 产品化的开发者，关注产品是否真正可用、可信、值得继续迭代。</p>
            </div>
          </article>
          <article className="about-columns__item">
            <span className="about-columns__label">02 / Focus</span>
            <div>
              <h3>当前方向</h3>
              <p>聚焦<strong>RAG 知识库</strong>和<strong>AI Agent 产品化</strong>：把模型能力、业务流程与质量判断连接起来，做出能持续验证的工具与服务。</p>
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
        <h2 className="about-section-heading">核心能力</h2>
        <div className="about-skill-grid">
          {coreAbilities.map((ability) => (
            <article key={ability.title} className="about-skill-grid__item">
              <h3>{ability.title}</h3>
              <p>{ability.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-heading">内容与版权声明</h2>
        <p className="about-copy">
          本站所有内容仅代表作者个人观点，与作者供职的公司、客户或其他关联机构无关。文章的转载、改编与授权规则以各文章末尾的版权说明为准。
        </p>
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
