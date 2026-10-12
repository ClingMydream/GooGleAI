import React from 'react';
import { MessageSquare, Copy, Check, QrCode, X, Download } from 'lucide-react';
import { copyToClipboard } from '../../utils/vcard';

interface WeChatModalProps {
  isOpen: boolean;
  wechatId?: string;
  name: string;
  companyName: string;
  onClose: () => void;
  onCopyLogged?: () => void;
  onToast: (msg: string) => void;
}

export const WeChatModal: React.FC<WeChatModalProps> = ({
  isOpen,
  wechatId,
  name,
  companyName,
  onClose,
  onCopyLogged,
  onToast,
}) => {
  if (!isOpen || !wechatId) return null;

  const handleCopy = async () => {
    onCopyLogged?.();
    const success = await copyToClipboard(wechatId);
    if (success) {
      onToast('微信号已复制，可前往微信添加好友');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-sm rounded-t-[28px] sm:rounded-[28px] bg-white p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">
              添加 {name} 微信
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* WeChat Account Box */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 mb-5">
          <div className="text-[11px] text-neutral-400 mb-1">名片主人微信号</div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-neutral-900 tracking-tight select-all">
              {wechatId}
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>复制微信号</span>
            </button>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="rounded-2xl border border-neutral-100 p-4 bg-white text-center shadow-xs mb-5">
          <div className="w-44 h-44 mx-auto p-3 bg-white rounded-xl shadow-xs border border-neutral-100 flex flex-col items-center justify-center relative">
            {/* Elegant SVG WeChat QR Code representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-900">
              <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="4" />
              <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
              <rect x="9" y="9" width="12" height="12" fill="currentColor" rx="1" />

              <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="4" />
              <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
              <rect x="79" y="9" width="12" height="12" fill="currentColor" rx="1" />

              <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="4" />
              <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
              <rect x="9" y="79" width="12" height="12" fill="currentColor" rx="1" />

              {/* Data matrix dots */}
              <circle cx="45" cy="15" r="3" fill="currentColor" />
              <circle cx="55" cy="22" r="3" fill="currentColor" />
              <circle cx="40" cy="40" r="3" fill="currentColor" />
              <circle cx="60" cy="40" r="3" fill="currentColor" />
              <circle cx="50" cy="50" r="4" fill="currentColor" />
              <circle cx="20" cy="50" r="3" fill="currentColor" />
              <circle cx="80" cy="50" r="3" fill="currentColor" />
              <circle cx="45" cy="65" r="3" fill="currentColor" />
              <circle cx="65" cy="65" r="3" fill="currentColor" />
              <circle cx="50" cy="80" r="3.5" fill="currentColor" />
              <circle cx="80" cy="80" r="3" fill="currentColor" />
              <circle cx="20" cy="80" r="3" fill="currentColor" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-teal-600 font-bold text-[10px]">
                JL
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-500 mt-3 font-medium">
            长按图片识别二维码，或保存后在微信扫一扫
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            {companyName} · 官方商务名片
          </p>
        </div>

        {/* Guided Actions */}
        <div className="space-y-2">
          <button
            onClick={handleCopy}
            className="w-full h-11 rounded-2xl bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>复制并在微信中粘贴搜索</span>
          </button>
          <button
            onClick={onClose}
            className="w-full h-10 rounded-2xl text-neutral-500 hover:text-neutral-800 text-xs font-medium"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
