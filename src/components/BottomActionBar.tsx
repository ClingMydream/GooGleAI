import React from 'react';
import { UserPlus, Share2, Check, Image as ImageIcon } from 'lucide-react';

interface BottomActionBarProps {
  isSaved: boolean;
  onSaveToContacts: () => void;
  onShareCard: () => void;
  onGeneratePoster: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  isSaved,
  onSaveToContacts,
  onShareCard,
  onGeneratePoster,
}) => {
  return (
    <div className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur-xl border-t border-black/[0.06] px-4 py-3 pb-6 transition-all shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* 1. 保存到通讯录 / 已保存至通讯录（更新） (对应 02/03 原型) */}
        <button
          onClick={onSaveToContacts}
          className={`flex-1 h-11.5 rounded-2xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shadow-xs cursor-pointer ${
            isSaved
              ? 'bg-[#1E3A8A] text-white hover:bg-[#172554]'
              : 'bg-[#0052D9] hover:bg-[#003fb3] text-white shadow-blue-500/20'
          }`}
          aria-label={isSaved ? '已保存至通讯录（更新）' : '保存到通讯录'}
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>已保存至通讯录（更新）</span>
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              <span>保存到通讯录</span>
            </>
          )}
        </button>

        {/* 2. 分享 */}
        <button
          onClick={onShareCard}
          className="h-11.5 px-4 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.98] text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
          aria-label="分享"
        >
          <Share2 className="w-3.5 h-3.5 text-neutral-600" />
          <span>分享</span>
        </button>

        {/* 3. 保存名片图片 */}
        <button
          onClick={onGeneratePoster}
          className="h-11.5 px-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.98] text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
          aria-label="保存名片图片"
        >
          <ImageIcon className="w-3.5 h-3.5 text-neutral-600" />
          <span>保存名片图片</span>
        </button>

      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-32 h-1 bg-neutral-300 rounded-full mx-auto mt-2" />
    </div>
  );
};
