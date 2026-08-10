import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";
import {
  aiTestingRoadmap,
  getAiTestingPhase,
  getTutorialTrack,
  tutorialTracks,
  tutorials,
  type Tutorial,
} from "@/content/knowledge/tutorials";

const ITEMS_PER_PAGE = 12;

export const metadata = buildPageMetadata({
  title: "系统教程",
  description: "按学习模块、关键词和页码浏览测试工程师系统教程",
  path: "/knowledge/tutorials",
});

type TutorialsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TutorialsPage({ searchParams }: TutorialsPageProps) {
  const params = await searchParams;
  const requestedTrack = getSingleParam(params.track);
  const activeTrack = requestedTrack && getTutorialTrack(requestedTrack) ? requestedTrack : "";
  const query = getSingleParam(params.q).trim();
  const requestedPage = Number.parseInt(getSingleParam(params.page), 10);

  const filteredTutorials = tutorials
    .filter((tutorial) => !activeTrack || tutorial.track === activeTrack)
    .filter((tutorial) => {
      if (!query) return true;
      const searchableText = `${tutorial.title} ${tutorial.subtitle} ${tutorial.description}`.toLowerCase();
      return searchableText.includes(query.toLowerCase());
    })
    .sort((a, b) => a.order - b.order);

  const totalPages = Math.max(1, Math.ceil(filteredTutorials.length / ITEMS_PER_PAGE));
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;
  const pageTutorials = filteredTutorials.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const selectedTrack = activeTrack ? getTutorialTrack(activeTrack) : undefined;
  const isAiRoadmapView = activeTrack === "ai-testing" && !query;

  return (
    <div className="editorial-page editorial-page--wide">
      <header className="page-heading-wrap knowledge-catalog-heading">
        <p className="page-kicker">Tutorial Library</p>
        <div>
          <h1 className="page-heading">系统教程</h1>
          <p className="page-copy">你可以按能力模块浏览教程，也可以通过关键词和页码快速找到想学的内容。</p>
          <Link href="/knowledge" className="text-link">
            <ArrowLeft className="h-4 w-4" />
            返回知识库
          </Link>
        </div>
      </header>

      <section className="tutorial-catalog" aria-labelledby="catalog-heading">
        <header className="tutorial-catalog__summary">
          <div>
            <span className="project-type">Index / {String(filteredTutorials.length).padStart(2, "0")}</span>
            <h2 id="catalog-heading">{selectedTrack?.title ?? "全部教程"}</h2>
            <p>{selectedTrack?.description ?? "选择适合你的能力模块，按照教程顺序逐步学习；如果目标是测试开发或 AI 测试岗位，还可以进入对应的强化支线。"}</p>
          </div>
          <dl>
            <div><dt>模块</dt><dd>{tutorialTracks.length}</dd></div>
            <div><dt>每页</dt><dd>{ITEMS_PER_PAGE}</dd></div>
            <div><dt>当前</dt><dd>{currentPage} / {totalPages}</dd></div>
          </dl>
        </header>

        <nav className="tutorial-catalog__tracks" aria-label="教程模块筛选">
          <Link href={buildTutorialsUrl({ q: query })} className={!activeTrack ? "is-active" : undefined}>全部</Link>
          {tutorialTracks.map((track) => (
            <Link
              key={track.slug}
              href={buildTutorialsUrl({ track: track.slug, q: query })}
              className={activeTrack === track.slug ? "is-active" : undefined}
            >
              {track.title}
            </Link>
          ))}
        </nav>

        <form className="tutorial-catalog__search" action="/knowledge/tutorials" method="get">
          {activeTrack && <input type="hidden" name="track" value={activeTrack} />}
          <Search className="h-4 w-4" aria-hidden="true" />
          <input id="tutorial-query" name="q" type="search" defaultValue={query} aria-label="搜索教程" placeholder="搜索教程标题、主题或能力关键词" />
          <button type="submit">搜索</button>
        </form>

        {isAiRoadmapView && (
          <section className="relative mb-8 overflow-hidden rounded-[28px] border border-[var(--rule)] bg-[var(--surface)] p-5 md:p-8" aria-labelledby="ai-path-heading">
            <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[var(--signal-soft)] blur-3xl" />
            <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 rounded-full bg-[var(--signal-soft)] blur-3xl" />
            <div className="relative mb-9 grid gap-6 border-b border-[var(--rule)] pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-3xl">
                <span className="project-type">AI Quality / 5-Phase Roadmap</span>
                <h3 id="ai-path-heading" className="mt-3 text-2xl font-bold leading-tight text-[var(--ink)] md:text-3xl">AI 测试工程师五阶段成长路线</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">从评估基础开始，依次掌握应用链路、智能体、生产可靠性和 AI 原生测试工程。每一阶段都有明确的学习结果，你可以按顺序完成，也可以从当前工作最需要的阶段开始。</p>
              </div>
              <dl className="grid grid-cols-2 gap-2 text-center">
                <div className="min-w-20 rounded-xl border border-[var(--rule)] bg-[var(--canvas)] px-3 py-3"><dt className="text-[10px] text-[var(--muted)]">教程</dt><dd className="mt-1 font-mono text-lg text-[var(--signal)]">11</dd></div>
                <div className="min-w-20 rounded-xl border border-[var(--rule)] bg-[var(--canvas)] px-3 py-3"><dt className="text-[10px] text-[var(--muted)]">阶段</dt><dd className="mt-1 font-mono text-lg text-[var(--signal)]">05</dd></div>
              </dl>
            </div>

            <div className="relative space-y-7">
              {aiTestingRoadmap.map((phase) => (
                <AiPhase key={phase.id} phase={phase} />
              ))}
            </div>
          </section>
        )}

        {!isAiRoadmapView && (pageTutorials.length > 0 ? (
          <div className="tutorial-catalog__list">
            {pageTutorials.map((tutorial, index) => (
              <TutorialCatalogItem
                key={tutorial.slug}
                tutorial={tutorial}
                number={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="tutorial-catalog__empty">
            <span className="project-type">No Results</span>
            <h3>暂时没有匹配的教程</h3>
            <p>可以更换关键词，或者返回全部教程继续浏览。</p>
            <Link href="/knowledge/tutorials" className="text-link">清除筛选</Link>
          </div>
        ))}

        {!isAiRoadmapView && <nav className="tutorial-catalog__pagination" aria-label="教程分页">
          {currentPage > 1 ? (
            <Link href={buildTutorialsUrl({ track: activeTrack, q: query, page: currentPage - 1 })}>
              <ArrowLeft className="h-4 w-4" /> 上一页
            </Link>
          ) : <span />}
          <span>Page {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</span>
          {currentPage < totalPages ? (
            <Link href={buildTutorialsUrl({ track: activeTrack, q: query, page: currentPage + 1 })}>
              下一页 <ArrowRight className="h-4 w-4" />
            </Link>
          ) : <span />}
        </nav>}
      </section>
    </div>
  );
}

function AiPhase({ phase }: { phase: (typeof aiTestingRoadmap)[number] }) {
  return (
    <article className="grid gap-5 rounded-2xl border border-[var(--rule)] bg-[var(--canvas)]/70 p-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8 lg:p-6">
      <div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--signal)]">Phase {phase.number} / {phase.eyebrow}</span>
        <h4 className="mt-2 text-lg font-bold text-[var(--ink)]">{phase.title}</h4>
        <p className="mt-2 text-xs leading-6 text-[var(--muted)]">{phase.description}</p>
        <div className="mt-4 rounded-xl bg-[var(--signal-soft)] px-3 py-3 text-xs leading-6 text-[var(--muted)]"><strong className="mr-1 text-[var(--signal)]">完成后</strong>{phase.outcome}</div>
      </div>
      <ol className="relative space-y-3 before:absolute before:bottom-5 before:left-[21px] before:top-5 before:w-px before:bg-[var(--rule)]">
        {phase.tutorials.map((tutorial, index) => {
          const item = <><span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--signal)] bg-[var(--canvas)] font-mono text-xs text-[var(--signal)]">{String(tutorial.phaseStep ?? index + 1).padStart(2, "0")}</span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><strong className="text-sm text-[var(--ink)]">{tutorial.title}</strong><span className="rounded-full bg-[var(--signal-soft)] px-2 py-0.5 text-[9px] text-[var(--signal)]">{tutorial.level}</span></span><span className="mt-1 block text-xs leading-6 text-[var(--muted)]">{tutorial.description}</span></span><ArrowRight className="hidden h-4 w-4 shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--signal)] sm:block" /></>;
          return tutorial.href ? <li key={tutorial.slug}><Link href={tutorial.href} className="group flex items-center gap-4 rounded-2xl border border-[var(--rule)] bg-[var(--canvas)] p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--signal)] hover:bg-[var(--surface-strong)]">{item}</Link></li> : <li key={tutorial.slug} className="flex items-center gap-4 rounded-2xl border border-[var(--rule)] bg-[var(--canvas)] p-4">{item}</li>;
        })}
      </ol>
    </article>
  );
}

function TutorialCatalogItem({ tutorial, number }: { tutorial: Tutorial; number: number }) {
  const track = getTutorialTrack(tutorial.track);
  const content = (
    <>
      <span className="project-type">Tutorial / {String(number).padStart(2, "0")}</span>
      <div>
        <div className="tutorial-catalog__item-meta">
          <span>{track?.title}</span>
          {tutorial.aiPhase && <span>{getAiTestingPhase(tutorial.aiPhase)?.title}</span>}
          <span>{tutorial.level}</span>
          <span>{tutorial.status === "published" ? "可学习" : "即将推出"}</span>
        </div>
        <h3>{tutorial.title}</h3>
        <span className="knowledge-row__subtitle">{tutorial.subtitle}</span>
      </div>
      <p>{tutorial.description}</p>
      <span className="text-link">
        {tutorial.status === "published" ? "开始学习" : "内容筹备中"}
        {tutorial.status === "published" && <ArrowUpRight className="h-4 w-4" />}
      </span>
    </>
  );

  if (tutorial.status === "published" && tutorial.href) {
    return <Link href={tutorial.href} className="tutorial-catalog__item">{content}</Link>;
  }

  return <article className="tutorial-catalog__item">{content}</article>;
}

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function buildTutorialsUrl({ track, q, page }: { track?: string; q?: string; page?: number }) {
  const params = new URLSearchParams();
  if (track) params.set("track", track);
  if (q) params.set("q", q);
  if (page && page > 1) params.set("page", String(page));
  const queryString = params.toString();
  return queryString ? `/knowledge/tutorials?${queryString}` : "/knowledge/tutorials";
}
