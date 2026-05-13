"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link2, Check, MessageCircle } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wechatCopied, setWechatCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${title} ${window.location.href}`);
    } catch {
      const input = document.createElement("input");
      input.value = `${title} ${window.location.href}`;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareWeibo() {
    const text = encodeURIComponent(`推荐一篇文章：${title}`);
    const link = encodeURIComponent(window.location.href);
    window.open(
      `https://service.weibo.com/share/share.php?title=${text}&url=${link}`,
      "_blank",
      "width=600,height=500"
    );
  }

  function shareTwitter() {
    const text = encodeURIComponent(title);
    const link = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${link}`,
      "_blank",
      "width=600,height=500"
    );
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => { setOpen(!open); setWechatCopied(false); }}
        className="inline-flex items-center gap-2 rounded-lg border border-space-border bg-space-card px-4 py-2 text-sm text-text-secondary hover:border-neon-cyan hover:text-neon-cyan transition-all"
      >
        <Share2 className="h-4 w-4" />
        分享
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-space-border bg-space-card p-2 shadow-2xl animate-fade-in">
          <button
            onClick={copyLink}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-space-border hover:text-neon-cyan transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Link2 className="h-4 w-4" />}
            {copied ? "已复制" : "复制链接"}
          </button>

          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(`${title} ${window.location.href}`);
              } catch {
                const input = document.createElement("input");
                input.value = `${title} ${window.location.href}`;
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
              }
              setWechatCopied(true);
              setTimeout(() => setWechatCopied(false), 2000);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-space-border hover:text-green-400 transition-colors"
          >
            {wechatCopied ? <Check className="h-4 w-4 text-green-400" /> : <MessageCircle className="h-4 w-4" />}
            {wechatCopied ? "已复制，去微信粘贴" : "微信分享"}
          </button>

          <button
            onClick={shareWeibo}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-space-border hover:text-orange-400 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM16.68 11.485c-.301-.09-.512-.15-.355-.543.342-.857.377-1.595.007-2.122-.693-.986-2.59-.935-4.764-.027 0 0-.681.338-.508-.243.329-1.14.28-2.104-.232-2.681-1.166-1.316-4.271.05-6.928 3.053C2.185 12.063 1.156 14.662 1.156 17c0 4.565 5.848 7.345 11.562 7.345 7.487 0 12.462-4.342 12.462-7.81 0-2.09-1.758-3.292-3.5-3.92l-4.94-1.13z" />
            </svg>
            微博
          </button>

          <button
            onClick={shareTwitter}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-space-border hover:text-blue-400 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X / Twitter
          </button>
        </div>
      )}
    </div>
  );
}
