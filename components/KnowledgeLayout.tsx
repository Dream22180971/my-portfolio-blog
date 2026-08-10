"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const defaultSections = [
  { id: "sec-env", label: "环境准备" },
  { id: "sec-dev", label: "设备管理" },
  { id: "sec-app", label: "应用管理" },
  { id: "sec-file", label: "文件传输" },
  { id: "sec-shell", label: "Shell 命令" },
  { id: "sec-screen", label: "截图录屏" },
  { id: "sec-log", label: "日志调试" },
  { id: "sec-port", label: "端口转发" },
  { id: "sec-pm", label: "包管理" },
  { id: "sec-am", label: "活动管理" },
  { id: "sec-info", label: "设备信息" },
  { id: "sec-auto", label: "自动化辅助" },
  { id: "sec-wireless", label: "无线调试" },
  { id: "sec-scenario", label: "场景速查" },
  { id: "sec-tips", label: "技巧速查" },
  { id: "sec-issues", label: "问题排查" },
];

export type SectionItem = { id: string; label: string };

export function KnowledgeLayout({
  children,
  sections = defaultSections,
  searchPlaceholder = "搜索命令关键词...",
}: {
  children: ReactNode;
  sections?: SectionItem[];
  searchPlaceholder?: string;
}) {
  const [activeSection, setActiveSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navRef = useRef<HTMLDivElement>(null);

  // Section observer for active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Scroll active nav item into view
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !activeSection) return;
    const btn = nav.querySelector<HTMLElement>(`[data-section="${activeSection}"]`);
    if (btn) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const left = nav.scrollLeft + btnRect.left - navRect.left - (nav.clientWidth - btnRect.width) / 2;
      nav.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeSection]);

  // Code copy on click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName !== "CODE") return;
      // Don't copy if it's inside a pre (those have their own copy button)
      if (target.closest("pre")) return;
      const text = target.textContent;
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        showToast("已复制");
      });
    }

    function handlePreClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" && target.classList.contains("copy-btn")) return;
      const pre = target.closest("pre");
      if (!pre) return;
      const code = pre.querySelector("code");
      if (!code) return;
      navigator.clipboard.writeText(code.textContent || "").then(() => {
        const btn = pre.querySelector(".copy-btn");
        if (btn) {
          btn.textContent = "已复制";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "复制";
            btn.classList.remove("copied");
          }, 1500);
        }
      });
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("click", handlePreClick);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("click", handlePreClick);
    };
  }, []);

  // Search filtering
  useEffect(() => {
    const q = searchQuery.toLowerCase().trim();
    const sections = document.querySelectorAll("[data-knowledge-section]");
    sections.forEach((sec) => {
      if (!q) {
        (sec as HTMLElement).style.display = "";
        return;
      }
      const text = sec.textContent?.toLowerCase() || "";
      (sec as HTMLElement).style.display = text.includes(q) ? "" : "none";
    });
  }, [searchQuery]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Search */}
      <div className="knowledge-tools">
        <label className="knowledge-search-field">
          <span>Search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </label>
      </div>

      {/* Section Nav */}
      <div
        ref={navRef}
        className="knowledge-section-nav scrollbar-none"
      >
        <div>
          {sections.map(({ id, label }) => (
            <button
              type="button"
              key={id}
              data-section={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "knowledge-section-nav__item",
                activeSection === id
                  ? "is-active"
                  : undefined
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="prose-knowledge">{children}</div>
    </>
  );
}

function showToast(msg: string) {
  const existing = document.querySelector(".knowledge-toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "knowledge-toast";
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(10px);
    background:#00d4ff;color:#0a0e17;padding:8px 20px;border-radius:8px;font-size:13px;
    font-weight:600;z-index:9999;opacity:0;transition:all 0.3s;font-family:inherit;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 1200);
}
