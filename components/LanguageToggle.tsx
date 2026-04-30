"use client";

import { useLanguage } from "./LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-2 py-1 text-xs font-mono rounded border border-space-border text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
      title={language === "zh" ? "Switch to English" : "切换到中文"}
    >
      {language === "zh" ? "EN" : "中"}
    </button>
  );
}