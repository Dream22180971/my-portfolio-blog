"use client";

import { useEffect } from "react";

export function CodeBlockEnhance() {
  useEffect(() => {
    const container = document.querySelector(".prose-blog");
    if (!container) return;

    const pres = container.querySelectorAll("pre");
    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "复制";
      btn.style.cssText =
        "position:absolute;top:8px;right:8px;padding:4px 10px;font-size:12px;border-radius:6px;border:1px solid rgba(0,212,255,0.2);background:rgba(0,0,0,0.5);color:#94a3b8;cursor:pointer;opacity:0;transition:opacity 0.2s;z-index:10;font-family:inherit;";

      pre.style.position = "relative";
      pre.appendChild(btn);

      pre.addEventListener("mouseenter", () => (btn.style.opacity = "1"));
      pre.addEventListener("mouseleave", () => (btn.style.opacity = "0"));

      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        if (!code) return;
        await navigator.clipboard.writeText(code.textContent || "");
        btn.textContent = "已复制";
        btn.style.color = "#00d4ff";
        setTimeout(() => {
          btn.textContent = "复制";
          btn.style.color = "#94a3b8";
        }, 1500);
      });
    });
  }, []);

  return null;
}
