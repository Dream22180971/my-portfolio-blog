"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback: string) => string;
}

// 默认值，用于 SSR/静态生成
const defaultContext: LanguageContextType = {
  language: "zh",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (_k: string, fb: string) => fb,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const toggleLanguage = () => {
    const newLang = language === "zh" ? "en" : "zh";
    setLanguage(newLang);
  };

  const translations: Record<string, Record<string, string>> = {
    status: { zh: "开放求职", en: "Open to Work" },
    hero_title: { zh: "把 AI 想法", en: "Turning AI Ideas" },
    hero_title2: { zh: "变成可用的产品", en: "into Usable Products" },
    now_building: { zh: "正在构建", en: "Building Now" },
    projects: { zh: "精选项目", en: "Featured Projects" },
    view_all: { zh: "查看全部项目 →", en: "View All Projects →" },
    about_me: { zh: "关于我", en: "About Me" },
    about_desc: { zh: "自动化测试工程师，备考雅思，转型 AI 应用开发方向。热衷于用 RAG、Agent、低代码等技术解决实际问题。", en: "Test engineer pivoting to AI app development. Passionate about RAG, Agents, and low-code solutions." },
    more: { zh: "了解更多 →", en: "Learn More →" },
    contact_hint: { zh: "欢迎 AI 产品合作 / 独立开发项目交流", en: "Open for AI product collaborations" },
    email_me: { zh: "写邮件", en: "Email Me" },
  };

  const t = (key: string, fallback: string) => {
    return translations[key]?.[language] ?? fallback;
  };

  // 静态生成期间返回默认值，避免 SSR 错误
  if (!mounted) {
    return (
      <LanguageContext.Provider value={defaultContext}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  // 不再抛出错误，返回默认值（SSR/静态生成时使用）
  return useContext(LanguageContext);
}