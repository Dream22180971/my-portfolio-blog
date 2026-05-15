import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import Link from "next/link";
import { MobileTopNav } from "@/components/MobileTopNav";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  buildPageMetadata,
  personJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  ...buildPageMetadata(),
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  other: {
    "google-site-verification": "9se3lC-jMLixEVV8hbGoFQGNloTL07v-tQGBZ3FYqvo",
    "msvalidate.01": "E5167EE042796C91514A8AEE884BD3B3",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F0E8" },
    { color: "#0a0e17" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (!t) t = 'dark';
                  document.documentElement.setAttribute('data-theme', t);
                } catch(e) {}
              })();
            `,
          }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} RSS`}
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
      </head>
      <body className="space-grid noise-overlay tech-orbs">
        <ThemeProvider>
        {/* 绉诲姩绔《閮ㄥ鑸?*/}
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-space-border bg-space-bg/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-mono text-sm text-neon-cyan">
              seanwalter
            </Link>
            <MobileTopNav />
          </div>
        </header>

        {/* 妗岄潰绔晶杈规爮 */}
        <Sidebar />

        {/* 涓诲唴瀹瑰尯 */}
        <main className="min-h-screen pt-16 md:ml-64 md:pt-0">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:px-8 md:py-12">
            {children}
          </div>
        </main>
        <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
