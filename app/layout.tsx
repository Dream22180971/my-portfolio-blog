import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
    { media: "(prefers-color-scheme: light)", color: "#edf1ee" },
    { color: "#0b0d0e" },
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
      <body className="site-body">
        <ThemeProvider>
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
