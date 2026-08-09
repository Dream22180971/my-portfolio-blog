import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";
import { getTutorialTrack, tutorialTracks, tutorials, type Tutorial } from "@/content/knowledge/tutorials";

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

  return (
    <div className="editorial-page editorial-page--wide">
      <header className="page-heading-wrap knowledge-catalog-heading">
        <p className="page-kicker">Tutorial Library</p>
        <div>
          <h1 className="page-heading">系统教程</h1>
          <p className="page-copy">教程按能力模块长期维护。首页负责导航，这里负责检索、筛选和分页，不让内容规模影响浏览效率。</p>
          <Link href="/knowledge" target="_blank" rel="noopener noreferrer" className="text-link">
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
            <p>{selectedTrack?.description ?? "从六个能力模块中查找教程，每次只呈现当前筛选结果的一页内容。"}</p>
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

        {pageTutorials.length > 0 ? (
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
        )}

        <nav className="tutorial-catalog__pagination" aria-label="教程分页">
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
        </nav>
      </section>
    </div>
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
          <span>{tutorial.level}</span>
          <span>{tutorial.status === "published" ? "已发布" : "建设中"}</span>
        </div>
        <h3>{tutorial.title}</h3>
        <span className="knowledge-row__subtitle">{tutorial.subtitle}</span>
      </div>
      <p>{tutorial.description}</p>
      <span className="text-link">
        {tutorial.status === "published" ? "开始学习" : "已列入计划"}
        {tutorial.status === "published" && <ArrowUpRight className="h-4 w-4" />}
      </span>
    </>
  );

  if (tutorial.status === "published" && tutorial.href) {
    return <Link href={tutorial.href} target="_blank" rel="noopener noreferrer" className="tutorial-catalog__item">{content}</Link>;
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
