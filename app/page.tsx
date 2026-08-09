import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CalibrationField } from "@/components/CalibrationField";
import { getAllPosts } from "@/lib/blog-data";

const selectedWork = [
  {
    type: "AI Travel Planner",
    name: "VoyageAI",
    description: "输入偏好与预算，直接得到可执行的行程、费用拆分和行前清单。",
    status: "已上线 · 可在线体验",
    href: "https://voyageai.seanwalter.top/",
    action: "在线体验",
  },
  {
    type: "Security Utility",
    name: "YouRenTool",
    description: "本地 AES-256 加密 + 一键填充，把密码管理从“记得住”变成“用得上”。",
    status: "已上线 · 可在线体验",
    href: "https://youren.seanwalter.top/",
    action: "在线体验",
  },
  {
    type: "Content Workflow",
    name: "AI 内容助手",
    description: "从账号定位到多平台文案，一次对话完成内容生产闭环。",
    status: "已开源",
    href: "https://github.com/Dream22180971/operation-assistant",
    action: "查看代码",
  },
];

const workingMethod = [
  {
    number: "01 · Frame",
    title: "先定义真正的问题",
    description: "用户、场景、约束、成功标准。先定方向，再谈功能数量。",
  },
  {
    number: "02 · Verify",
    title: "让风险提前暴露",
    description: "边界、异常、质量目标前置到方案阶段。用可验证的假设推动设计。",
  },
  {
    number: "03 · Build",
    title: "交付真实可用的闭环",
    description: "从原型到上线持续验证。不只“能跑”，还要能理解、能信任、能完成。质量判断发生在写代码之前，AI 只是把判断变成产品的加速器。",
  },
];

export default function HomePage() {
  const articles = getAllPosts().slice(0, 3);

  return (
    <div className="home-page">
      <section className="calibration-hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">AI Product Builder · Quality Engineer</p>
          <h1 id="hero-title">
            <span>
              把不确定的<span className="hero-title__mobile-break"><br /></span>想法，
            </span>
            <span>校准成可靠的产品。</span>
          </h1>
          <p className="hero-lead">
            以测试工程建立判断力，用 AI 加速构建。<br />
            让风险、体验与交付进入同一条工作链路。
          </p>
          <div className="hero-actions">
            <a className="button-signal" href="mailto:3310103904@qq.com?subject=%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2">
              发起合作
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <Link className="button-quiet" href="#selected-work">
              查看代表项目
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="hero-meta" aria-label="当前方向">
            <span><strong>Focus</strong> Agent 产品化</span>
            <span><strong>Base</strong> 质量工程</span>
            <span><strong>Location</strong> 杭州</span>
          </div>
        </div>
        <CalibrationField />
      </section>

      <section className="home-section" id="selected-work" aria-labelledby="work-title">
        <div className="home-section__head">
          <p className="section-index">01 · Selected Work</p>
          <h2 className="section-title" id="work-title">展示产品判断，<br />不是展示技术栈。</h2>
        </div>
        <div className="work-list">
          {selectedWork.map((project, index) => (
            <article className="work-row" key={project.name}>
              <span className="work-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="work-kind">{project.type}</p>
                <h3 className="work-title">{project.name}</h3>
                <p className="work-status">{project.status}</p>
              </div>
              <p className="work-copy">{project.description}</p>
              <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">
                {project.action}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section method-panel" aria-labelledby="method-title">
        <div className="home-section__head">
          <p className="section-index">02 · Working Method</p>
          <div>
            <h2 className="section-title" id="method-title">质量判断，<br />发生在写代码之前。</h2>
            <p className="section-intro">
              测试不是交付前的最后检查，而是理解问题、识别边界、减少返工的方法。AI 把这种判断更快变成可验证的产品。
            </p>
          </div>
        </div>
        <div className="method-list">
          {workingMethod.map((step) => (
            <article className="method-step" key={step.number}>
              <strong className="method-number">{step.number}</strong>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="writing-title">
        <div className="home-section__head">
          <p className="section-index">03 · Selected Writing</p>
          <h2 className="section-title" id="writing-title">写作是对判断力的公开测试。</h2>
        </div>
        <div className="writing-list">
          {articles.map((article) => (
            <Link className="article-list-row" href={`/blog/${article.slug}`} key={article.slug}>
              <time className="writing-date">{article.date.replaceAll("-", ".")}</time>
              <h2>{article.title}</h2>
              <ArrowUpRight aria-hidden="true" className="article-list-row__arrow h-5 w-5" />
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-panel" aria-labelledby="contact-title">
        <div className="contact-panel__top">
          <span>04 · Start a Conversation</span>
          <span>Available for thoughtful collaborations</span>
        </div>
        <h2 id="contact-title">有一个还不确定的想法？<br />我们可以先一起把它校准成<em>可验证的方向</em>。</h2>
        <div className="contact-panel__bottom">
          <a className="button-signal" href="mailto:3310103904@qq.com?subject=%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2">
            发一封邮件聊聊
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <p className="contact-panel__note">
            适合聊 AI 产品、Agent 工作流、质量工程与从 0 到 1 的产品验证。请简单说明目标、当前阶段与希望解决的问题。
          </p>
        </div>
      </section>
    </div>
  );
}
