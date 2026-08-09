import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© 2026 Sean Walter · Hangzhou · Calibration</p>
      <div className="site-footer__links">
        <Link href="/blog">文章</Link>
        <a href="https://github.com/Dream22180971" target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
        <a href="mailto:3310103904@qq.com">联系合作 ↗</a>
      </div>
    </footer>
  );
}
