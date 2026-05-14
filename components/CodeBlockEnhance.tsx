"use client";

import { useEffect, useRef } from "react";

export function CodeBlockEnhance() {
  const cleanupRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    const container = document.querySelector(".prose-blog");
    if (!container) return;

    function enhancePre(pre: HTMLPreElement) {
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "复制";
      btn.style.cssText =
        "position:absolute;top:8px;right:8px;padding:4px 10px;font-size:12px;border-radius:6px;border:1px solid rgba(0,212,255,0.2);background:rgba(0,0,0,0.5);color:#94a3b8;cursor:pointer;opacity:0;transition:opacity 0.2s;z-index:10;font-family:inherit;";

      pre.style.position = "relative";
      pre.appendChild(btn);

      const onEnter = () => (btn.style.opacity = "1");
      const onLeave = () => (btn.style.opacity = "0");
      pre.addEventListener("mouseenter", onEnter);
      pre.addEventListener("mouseleave", onLeave);

      const onClick = async () => {
        const code = pre.querySelector("code");
        if (!code) return;
        await navigator.clipboard.writeText(code.textContent || "");
        btn.textContent = "已复制";
        btn.style.color = "#00d4ff";
        setTimeout(() => {
          btn.textContent = "复制";
          btn.style.color = "#94a3b8";
        }, 1500);
      };
      btn.addEventListener("click", onClick);

      cleanupRef.current.push(() => {
        pre.removeEventListener("mouseenter", onEnter);
        pre.removeEventListener("mouseleave", onLeave);
        btn.removeEventListener("click", onClick);
        btn.remove();
      });
    }

    container.querySelectorAll("pre").forEach(enhancePre);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLPreElement) enhancePre(node);
          if (node instanceof HTMLElement) {
            node.querySelectorAll("pre").forEach(enhancePre);
          }
        }
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanupRef.current.forEach((fn) => fn());
      cleanupRef.current = [];
    };
  }, []);

  return null;
}
