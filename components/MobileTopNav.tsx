"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/knowledge", label: "手册" },
  { href: "/about", label: "关于" },
  { href: "/experiments", label: "实验" },
];

export function MobileTopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1" aria-label="主导航">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-lg px-3 py-1 text-xs font-mono transition-colors ${
              isActive
                ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/25"
                : "text-text-secondary hover:text-neon-cyan"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

