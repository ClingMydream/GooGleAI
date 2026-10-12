import React from 'react';
import { Share2, Copy, MessageSquare, QrCode, X } from 'lucide-react';
import { CardData } from '../../types/card';
import { copyToClipboard } from '../../utils/vcard';
import { SteadyAvatar } from '../common/SteadyAvatar';

interface ShareModalProps {
  isOpen: boolean;
  card: CardData;
  onClose: () => void;
  onOpenPoster: () => void;
  onShareLogged?: () => void;
  onToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  card,
  onClose,
  onOpenPoster,
  onShareLogged,
  onToast,
}) => {
  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = async () => {
    onShareLogged?.();
    const ok = await copyToClipboard(currentUrl);
    if (ok) {
      onToast('名片链接已复制，可粘贴发送至微信');
      onClose();
    }
  };

  const handleSendWeChat = () => {
    onShareLogged?.();
    onToast(`已模拟将「${card.name}的名片」转发至微信好友会话`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-sm rounded-t-[28px] sm:rounded-[28px] bg-white p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0052D9] flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">
              转发与共享名片
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* WeChat Mini Program Share Message Bubble Card */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 mb-5">
          <div className="text-[10px] text-neutral-400 mb-1.5 flex items-center justify-between">
            <span>微信分享卡片预览</span>
            <span className="text-[#0052D9] font-medium">企业小程序卡片</span>
          </div>

          <div className="p-3 rounded-xl bg-white shadow-2xs border border-neutral-100 flex items-center gap-3">
            <SteadyAvatar
              char={card.avatarChar}
              bg={card.avatarBg}
              size="md"
              shape="circle"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-neutral-900 truncate">
                {card.name} · {card.title} 的商务名片
              </h4>
              <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                {card.company.fullName}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[9px] text-[#0052D9] font-medium">
                <span>点开直达名片详情</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action List */}
        <div className="space-y-2.5">
          <button
            onClick={handleSendWeChat}
            className="w-full h-12 rounded-2xl bg-[#0052D9] hover:bg-[#003fb3] active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>转发给微信好友 / 群聊</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full h-11 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.98] text-neutral-800 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-neutral-500" />
            <span>复制名片专属链接</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenPoster();
            }}
            className="w-full h-11 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.98] text-neutral-800 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-neutral-500" />
            <span>生成名片图片 (带小程序码)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
