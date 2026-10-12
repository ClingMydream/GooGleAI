import React from 'react';
import { ChevronLeft, MoreHorizontal, CircleDot } from 'lucide-react';

interface WeChatNavbarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onShareClick?: () => void;
  onMenuClick?: () => void;
}

export const WeChatNavbar: React.FC<WeChatNavbarProps> = ({
  title,
  showBack = false,
  onBack,
  onShareClick,
  onMenuClick,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-xl border-b border-black/[0.04] transition-colors">
      {/* iOS Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[13px] font-semibold tracking-tight text-neutral-800">
        <span>12:00</span>
        <div className="flex items-center gap-1.5 text-neutral-800">
          {/* Signal */}
          <div className="flex items-end gap-0.5 h-2.5">
            <span className="w-0.5 h-1 bg-neutral-800 rounded-xs" />
            <span className="w-0.5 h-1.5 bg-neutral-800 rounded-xs" />
            <span className="w-0.5 h-2 bg-neutral-800 rounded-xs" />
            <span className="w-0.5 h-2.5 bg-neutral-800 rounded-xs" />
          </div>
          {/* 5G */}
          <span className="text-[10px] font-bold">5G</span>
          {/* Battery */}
          <div className="w-5 h-2.5 border border-neutral-800 rounded-sm p-0.5 flex items-center">
            <div className="w-full h-full bg-neutral-800 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* Mini Program Nav Row: Left Back/Spacer - Center Title - Right WeChat Capsule */}
      <div className="flex items-center justify-between px-3 h-11">
        {/* Left: Back Arrow or Empty Spacer */}
        <div className="w-14 flex items-center">
          {showBack ? (
            <button
              onClick={onBack}
              className="flex items-center text-neutral-800 hover:opacity-75 active:scale-95 transition-all p-1 -ml-1 rounded-full cursor-pointer"
              aria-label="返回"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-800 stroke-[2.2]" />
            </button>
          ) : (
            <span className="w-6" />
          )}
        </div>

        {/* Center: Title (e.g. 广东京伦 / 名片信息 / 公司相关人员 / 名片附件 / 信息配置) */}
        <h1 className="text-[15px] font-semibold text-neutral-900 tracking-tight select-none truncate text-center max-w-[190px]">
          {title}
        </h1>

        {/* Right: WeChat Capsule Pill [ ··· | ○ ] */}
        <div className="flex items-center h-7.5 px-2.5 rounded-full bg-white/90 border border-neutral-200/90 shadow-2xs backdrop-blur-md">
          <button
            onClick={onMenuClick}
            className="p-1 text-neutral-700 hover:text-neutral-900 active:scale-90 transition-transform cursor-pointer"
            aria-label="更多操作"
            title="更多功能与配置"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
          <span className="w-px h-3 bg-neutral-200 mx-1.5" />
          <button
            onClick={onShareClick}
            className="p-1 text-neutral-700 hover:text-neutral-900 active:scale-90 transition-transform cursor-pointer"
            aria-label="分享"
            title="分享名片"
          >
            <CircleDot className="w-3 h-3 text-neutral-800" />
          </button>
        </div>
      </div>
    </header>
  );
};
