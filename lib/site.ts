import type { Metadata } from "next";

export const SITE_NAME = "seanwalter";
export const SITE_URL = "https://seanwalter.top";
export const SITE_TITLE = `${SITE_NAME} | AI 独立开发者`;
export const SITE_DESCRIPTION =
  "AI 独立开发者，专注 RAG 知识库与智能体搭建。南京，备考 IELTS 6.5+。";
export const SITE_LOCALE = "zh_CN";
export const SITE_AUTHOR = "seanwalter";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

export function getCanonicalUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: MetadataInput = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;
  const url = getCanonicalUrl(path);

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: SITE_LOCALE,
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [`${SITE_URL}${path}/opengraph-image`],
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags ? { tags } : {}),
      ...(type === "article" ? { authors: [SITE_AUTHOR] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}${path}/opengraph-image`],
    },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "AI 独立开发者",
  description: SITE_DESCRIPTION,
  sameAs: ["https://github.com/Dream22180971"],
  knowsAbout: ["AI Agent", "RAG", "LangChain", "LLM", "自动化测试"],
};
