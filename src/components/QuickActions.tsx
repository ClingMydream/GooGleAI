import React from 'react';
import { Phone, Mail, Navigation, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { CardData } from '../types/card';

interface QuickActionsProps {
  card: CardData;
  onCall: () => void;
  onEmail: () => void;
  onVisitMap: () => void;
  onAddWeChat: () => void;
  onGeneratePoster: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  card,
  onCall,
  onEmail,
  onVisitMap,
  onAddWeChat,
  onGeneratePoster,
}) => {
  const hasPhone = Boolean(card.contacts.phone);
  const hasEmail = Boolean(card.contacts.email);
  const hasAddress = Boolean(card.contacts.address);
  const hasWechat = Boolean(card.contacts.wechatId);

  return (
    <div className="w-full px-4 py-1.5">
      {/* Apple-style Frosted Action Container with Corporate Blue Accents */}
      <div className="rounded-[22px] bg-white border border-black/[0.04] p-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-5 gap-1 items-start">
          
          {/* 1. 拨打电话 */}
          <button
            onClick={hasPhone ? onCall : undefined}
            disabled={!hasPhone}
            className={`group flex flex-col items-center text-center transition-all ${
              hasPhone
                ? 'active:scale-92 cursor-pointer'
                : 'opacity-35 cursor-not-allowed'
            }`}
            aria-label="拨打电话"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50/80 text-[#0052D9] flex items-center justify-center group-hover:bg-blue-100/80 transition-colors shadow-2xs">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-neutral-700 mt-1.5 tracking-tight">
              拨打电话
            </span>
          </button>

          {/* 2. 发邮件 */}
          <button
            onClick={hasEmail ? onEmail : undefined}
            disabled={!hasEmail}
            className={`group flex flex-col items-center text-center transition-all ${
              hasEmail
                ? 'active:scale-92 cursor-pointer'
                : 'opacity-35 cursor-not-allowed'
            }`}
            aria-label="发邮件"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50/80 text-[#0052D9] flex items-center justify-center group-hover:bg-blue-100/80 transition-colors shadow-2xs">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-neutral-700 mt-1.5 tracking-tight">
              发邮件
            </span>
          </button>

          {/* 3. 去拜访 */}
          <button
            onClick={hasAddress ? onVisitMap : undefined}
            disabled={!hasAddress}
            className={`group flex flex-col items-center text-center transition-all ${
              hasAddress
                ? 'active:scale-92 cursor-pointer'
                : 'opacity-35 cursor-not-allowed'
            }`}
            aria-label="去拜访"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50/80 text-[#0052D9] flex items-center justify-center group-hover:bg-blue-100/80 transition-colors shadow-2xs">
              <Navigation className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-neutral-700 mt-1.5 tracking-tight">
              去拜访
            </span>
          </button>

          {/* 4. 复制微信号 (未配置时隐藏) */}
          {hasWechat ? (
            <button
              onClick={onAddWeChat}
              className="group flex flex-col items-center text-center active:scale-92 cursor-pointer transition-all"
              aria-label="复制微信号"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-50/80 text-[#0052D9] flex items-center justify-center group-hover:bg-blue-100/80 transition-colors shadow-2xs">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium text-neutral-700 mt-1.5 tracking-tight">
                复制微信号
              </span>
            </button>
          ) : (
            <div className="hidden" />
          )}

          {/* 5. 保存名片图片 */}
          <button
            onClick={onGeneratePoster}
            className="group flex flex-col items-center text-center active:scale-92 cursor-pointer transition-all"
            aria-label="保存名片图片"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50/80 text-[#0052D9] flex items-center justify-center group-hover:bg-blue-100/80 transition-colors shadow-2xs">
              <ImageIcon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-neutral-700 mt-1.5 tracking-tight">
              保存名片图片
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
