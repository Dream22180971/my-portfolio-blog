import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ArticleImageEnhance } from "@/components/ArticleImageEnhance";
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
                var root = document.documentElement;

                try {
                  var t = localStorage.getItem('theme');
                  if (!t) t = 'dark';
                  root.setAttribute('data-theme', t);
                } catch(e) {
                  root.setAttribute('data-theme', 'dark');
                }

                if (window.__seanwalterThemeToggleReady) return;
                window.__seanwalterThemeToggleReady = true;

                function syncThemeToggle(theme) {
                  var isLight = theme === 'light';
                  var toggles = document.querySelectorAll('[data-theme-toggle]');

                  toggles.forEach(function(toggle) {
                    toggle.setAttribute('aria-label', isLight ? '切换到暗色主题' : '切换到亮色主题');
                    var label = toggle.querySelector('span');
                    if (label) label.textContent = isLight ? '暗色模式' : '亮色模式';
                  });
                }

                document.addEventListener('click', function(event) {
                  var target = event.target;
                  if (!target || !target.closest) return;

                  var toggle = target.closest('[data-theme-toggle]');
                  if (!toggle) return;

                  var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
                  root.setAttribute('data-theme', next);
                  syncThemeToggle(next);

                  try {
                    localStorage.setItem('theme', next);
                  } catch(e) {}

                  window.dispatchEvent(new Event('seanwalter-theme-change'));
                });
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
          <ArticleImageEnhance />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
