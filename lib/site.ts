import type { Metadata } from "next";

export const SITE_NAME = "seanwalter";
export const SITE_DISPLAY_NAME = "肖恩沃尔特";
export const SITE_URL = "https://seanwalter.top";
export const SITE_TITLE = `${SITE_NAME} | 软件测试、AI 测试与独立开发`;
export const SITE_DESCRIPTION =
  "肖恩沃尔特的中文技术博客与测试工程知识库，分享软件测试、自动化测试、AI 测试、RAG、Agent、MCP 与独立开发实践。";
export const SITE_LOCALE = "zh_CN";
export const SITE_LANGUAGE = "zh-CN";
export const SITE_AUTHOR = SITE_DISPLAY_NAME;
export const SITE_AUTHOR_URL = `${SITE_URL}/about`;
export const SITE_KEYWORDS = [
  "软件测试",
  "自动化测试",
  "AI 测试",
  "测试开发",
  "RAG",
  "AI Agent",
  "MCP",
  "质量工程",
] as const;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  imagePath?: string;
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
  imagePath = "/opengraph-image",
}: MetadataInput = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;
  const url = getCanonicalUrl(path);
  const imageUrl = getCanonicalUrl(imagePath);
  const keywords = tags?.length
    ? [...new Set([...tags, ...SITE_KEYWORDS.slice(0, 4)])]
    : [...SITE_KEYWORDS];

  return {
    title: fullTitle,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_AUTHOR, url: SITE_AUTHOR_URL }],
    creator: SITE_AUTHOR,
    publisher: SITE_AUTHOR,
    category: "technology",
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(tags ? { tags } : {}),
      ...(type === "article" ? { authors: [SITE_AUTHOR_URL] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE_AUTHOR,
      alternateName: [SITE_NAME, "Sean Walter", "肖恩"],
      url: SITE_AUTHOR_URL,
      jobTitle: "AI 独立开发者 / 软件测试工程师",
      description: SITE_DESCRIPTION,
      sameAs: ["https://github.com/Dream22180971"],
      knowsAbout: [...SITE_KEYWORDS, "LangChain", "LLM"],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      alternateName: "肖恩沃尔特的技术博客与测试知识库",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: SITE_LANGUAGE,
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
    },
  ],
};

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
