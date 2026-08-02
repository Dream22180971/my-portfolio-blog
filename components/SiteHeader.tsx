"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/knowledge", label: "手册" },
  { href: "/about", label: "关于" },
  { href: "/experiments", label: "实验" },
];

function isCurrentPath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" target="_blank" rel="noopener noreferrer" className="site-wordmark" aria-label="Sean Walter 首页">
          <span className="site-wordmark__mark" aria-hidden="true">肖</span>
          <span>Sean Walter</span>
        </Link>

        <nav className="site-navigation" aria-label="主导航">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
              className={cn(isCurrentPath(pathname, item.href) && "is-active")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <a className="header-contact" href="mailto:3310103904@qq.com?subject=%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2" target="_blank" rel="noopener noreferrer">
            联系合作
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            className="site-menu-button"
            aria-label={isOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={isOpen}
            aria-controls="mobile-site-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-site-navigation"
        className={cn("site-navigation-mobile", isOpen && "is-open")}
        aria-label="移动端主导航"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
            className={cn(isCurrentPath(pathname, item.href) && "is-active")}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
