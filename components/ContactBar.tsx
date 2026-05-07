"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { GithubIcon, MailIcon, WechatIcon } from "./SocialIcons";

function CopyTooltip({ wechatId }: { wechatId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <span className="relative group">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
      >
        <WechatIcon className="w-4 h-4" />
微信
      </button>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-space-card px-2 py-1 text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-space-border">
        {copied ? "已复制" : `微信: ${wechatId}`}
      </span>
    </span>
  );
}

export function ContactBar({ email, wechat }: { email: string; wechat: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-text-secondary">
      <span className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-neon-cyan" />
        南京
      </span>
      <a
        href="https://github.com/Dream22180971"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
        title="Dream22180971"
      >
        <GithubIcon className="w-4 h-4" />
        GitHub
      </a>
      <span className="relative group">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
        >
          <MailIcon className="w-4 h-4" />
邮箱
        </a>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-space-card px-2 py-1 text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-space-border">
          {email}
        </span>
      </span>
      <CopyTooltip wechatId={wechat} />
    </div>
  );
}
