"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sdetTestingRoadmap } from "@/content/knowledge/tutorials";

export function SdetRoadmapView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const phase = sdetTestingRoadmap[activeIndex];
  const totalTutorials = sdetTestingRoadmap.reduce((sum, item) => sum + item.tutorials.length, 0);

  return (
    <section className="relative mb-8 overflow-hidden rounded-[20px] border border-[var(--rule)] bg-[var(--surface)] p-5 md:p-8" aria-labelledby="sdet-path-heading">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--signal-soft)] blur-3xl" />

      {/* 标题与统计 */}
      <div className="relative mb-8 border-b border-[var(--rule)] pb-8">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--signal)]">SDET Engineering / 5-Phase Pipeline</span>
        <h3 id="sdet-path-heading" className="mt-3 text-2xl font-bold leading-tight text-[var(--ink)] md:text-3xl">测试开发工程化路线</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">SDET 是 AI Quality 的工程底座：没有自动化执行、CI/CD 门禁、测试平台和数据治理能力，就无法建设可持续运行的 AI 评估与回归体系。每个 Phase 解决一个工程问题，点击步骤条切换查看各阶段。</p>
        <dl className="mt-6 grid w-full grid-cols-2 gap-2 text-center md:max-w-xs">
          <div className="rounded-xl border border-[var(--rule)] bg-[var(--canvas)] px-3 py-3"><dt className="text-[10px] text-[var(--muted)]">教程</dt><dd className="mt-1 font-mono text-lg text-[var(--signal)]">{totalTutorials}</dd></div>
          <div className="rounded-xl border border-[var(--rule)] bg-[var(--canvas)] px-3 py-3"><dt className="text-[10px] text-[var(--muted)]">阶段</dt><dd className="mt-1 font-mono text-lg text-[var(--signal)]">05</dd></div>
        </dl>
      </div>

      {/* 步骤条 */}
      <div className="relative mb-6 grid grid-cols-5 gap-2" role="tablist" aria-label="选择阶段">
        {sdetTestingRoadmap.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls="sdet-active-phase"
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 transition-colors ${
              index === activeIndex
                ? "border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal)]"
                : "border-[var(--rule)] bg-[var(--canvas)] text-[var(--muted)] hover:border-[var(--signal)]"
            }`}
          >
            <span className="font-mono text-sm font-bold">{item.number}</span>
            <span className={`hidden text-[10px] leading-tight md:block ${index === activeIndex ? "text-[var(--signal)]" : "text-[var(--muted)]"}`}>{item.title}</span>
          </button>
        ))}
      </div>

      {/* 当前阶段 */}
      <div id="sdet-active-phase" role="tabpanel" className="relative rounded-2xl border border-[var(--rule)] bg-[var(--canvas)]/70 p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--signal)] bg-[var(--signal-soft)] font-mono text-xl font-bold text-[var(--signal)]">{phase.number}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--signal)]">{phase.eyebrow}</span>
            </div>
            <h4 className="mt-3 text-lg font-bold leading-snug text-[var(--ink)]">{phase.title}</h4>
            <p className="mt-2 text-xs leading-6 text-[var(--muted)]">{phase.description}</p>
            <div className="mt-4 rounded-xl bg-[var(--signal-soft)] px-3 py-3 text-xs leading-6 text-[var(--muted)]"><strong className="mr-1 text-[var(--signal)]">完成后</strong>{phase.outcome}</div>
          </div>
          <ul className="space-y-2.5">
            {phase.tutorials.map((tutorial, index) => {
              const content = (
                <>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[var(--signal-soft)] font-mono text-[10px] text-[var(--signal)]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 truncate text-xs text-[var(--ink)]">{tutorial.title}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] ${tutorial.status === "published" ? "bg-[var(--signal-soft)] text-[var(--signal)]" : "bg-[var(--rule-soft)] text-[var(--muted)]"}`}>{tutorial.status === "published" ? "可学习" : "待办"}</span>
                </>
              );
              return tutorial.href ? (
                <li key={tutorial.slug}><Link href={tutorial.href} className="group flex items-center gap-3 rounded-lg border border-[var(--rule)] bg-[var(--canvas)] px-3 py-2.5 transition-colors hover:border-[var(--signal)]">{content}</Link></li>
              ) : (
                <li key={tutorial.slug} className="flex items-center gap-3 rounded-lg border border-[var(--rule)] bg-[var(--canvas)] px-3 py-2.5">{content}</li>
              );
            })}
          </ul>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[var(--rule)] pt-4">
          <button
            type="button"
            onClick={() => setActiveIndex((index) => index - 1)}
            disabled={activeIndex === 0}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] transition-colors hover:text-[var(--signal)] disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="h-3.5 w-3.5" />上一阶段
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">Phase {phase.number} / 05</span>
          <button
            type="button"
            onClick={() => setActiveIndex((index) => index + 1)}
            disabled={activeIndex === sdetTestingRoadmap.length - 1}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] transition-colors hover:text-[var(--signal)] disabled:pointer-events-none disabled:opacity-30"
          >
            下一阶段<ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
