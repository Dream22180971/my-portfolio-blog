"use client";

import { useEffect } from "react";

export function MermaidRenderer() {
  useEffect(() => {
    let cancelled = false;
    let themeObserver: MutationObserver | null = null;
    let contentObserver: MutationObserver | null = null;
    let isRendering = false;
    let pendingForceRender = false;

    async function renderMermaid(force = false) {
      if (isRendering) {
        pendingForceRender = pendingForceRender || force;
        return;
      }

      isRendering = true;
      try {
        let shouldForce = force;
        do {
          pendingForceRender = false;
          await renderMermaidOnce(shouldForce);
          shouldForce = pendingForceRender;
        } while (pendingForceRender && !cancelled);
      } finally {
        isRendering = false;
      }
    }

    async function renderMermaidOnce(force = false) {
      const diagrams = Array.from(
        document.querySelectorAll<HTMLElement>(".prose-blog .blog-mermaid")
      );
      if (diagrams.length === 0) return;

      const { default: mermaid } = await import("mermaid");
      if (cancelled) return;

      const isLight = document.documentElement.dataset.theme === "light";
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: isLight ? "default" : "dark",
        themeVariables: {
          fontFamily:
            '"Microsoft YaHei", "PingFang SC", "Noto Sans SC", "Inter", sans-serif',
        },
      });

      for (const [index, diagram] of diagrams.entries()) {
        const source = diagram.dataset.mermaidSource ?? diagram.textContent ?? "";
        const id = `blog-mermaid-${index}-${Math.random().toString(36).slice(2)}`;

        if (force) {
          diagram.textContent = source;
        } else if (diagram.querySelector("svg")) {
          continue;
        }

        try {
          const { svg } = await mermaid.render(id, source);
          if (cancelled) return;
          diagram.innerHTML = svg;
          delete diagram.dataset.mermaidError;
        } catch {
          diagram.textContent = source;
          diagram.dataset.mermaidError = "true";
        }
      }
    }

    function resetDiagrams() {
      document
        .querySelectorAll<HTMLElement>(".prose-blog .blog-mermaid")
        .forEach((diagram) => {
          const source = diagram.dataset.mermaidSource ?? diagram.textContent ?? "";
          diagram.textContent = source;
          diagram.removeAttribute("data-processed");
        });
    }

    resetDiagrams();
    renderMermaid(true).catch(() => undefined);

    themeObserver = new MutationObserver(() => {
      resetDiagrams();
      renderMermaid(true).catch(() => undefined);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    contentObserver = new MutationObserver(() => {
      renderMermaid().catch(() => undefined);
    });
    contentObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelled = true;
      themeObserver?.disconnect();
      contentObserver?.disconnect();
    };
  }, []);

  return null;
}
