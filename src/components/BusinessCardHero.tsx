import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Check, Building2, UserCheck } from 'lucide-react';
import { CardData } from '../types/card';
import { SteadyAvatar } from './common/SteadyAvatar';

interface BusinessCardHeroProps {
  card: CardData;
  onCallClick?: () => void;
  onEmailClick?: () => void;
  onAddressClick?: () => void;
  onCopyWechat?: () => void;
}

export const BusinessCardHero: React.FC<BusinessCardHeroProps> = ({
  card,
  onCallClick,
  onEmailClick,
  onAddressClick,
  onCopyWechat,
}) => {
  const { contacts, isSaved } = card;

  return (
    <div className="w-full px-4 pt-3 pb-1">
      {/* Outer Card with Apple-style rounded squircle, multi-layer shadow and minimalist blue accents */}
      <div className="relative overflow-hidden rounded-[26px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] transition-all">
        
        {/* Top Company Logo & Name Header */}
        <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-neutral-100">
          <div className="w-6 h-6 rounded-lg bg-[#0052D9] text-white flex items-center justify-center font-bold text-[10px] shadow-2xs">
            {card.company.logo}
          </div>
          <span className="text-xs font-semibold text-neutral-800 tracking-tight truncate">
            {card.company.fullName}
          </span>
        </div>

        {/* Employee Avatar & Basic Information Row */}
        <div className="flex items-center gap-4 mb-4">
          {/* Steady Color Block Avatar (沉稳色块头像) */}
          <SteadyAvatar
            char={card.avatarChar}
            bg={card.avatarBg}
            size="xl"
            shape="circle"
            className="ring-2 ring-black/[0.04] shadow-sm"
          />

          {/* Name & Title */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                {card.name}
              </h2>
              {/* Relationship Status Pill */}
              {isSaved && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-blue-50 text-[#0052D9] text-[10px] font-semibold border border-blue-100">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  <span>已保存</span>
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-neutral-500 mt-1">
              {card.title} {card.department ? `· ${card.department}` : ''}
            </p>
          </div>
        </div>

        {/* Contact Info Rows (手机号、微信号、邮箱、地址) */}
        <div className="space-y-2 text-xs text-neutral-600 bg-neutral-50/70 rounded-2xl p-3.5 border border-neutral-100/80">
          {/* 手机号 */}
          {contacts.phone && (
            <div
              onClick={onCallClick}
              className="flex items-center justify-between cursor-pointer hover:text-[#0052D9] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 font-medium w-12">手机号：</span>
                <span className="font-semibold text-neutral-800">{contacts.phone}</span>
              </div>
              <span className="text-[11px] text-[#0052D9] font-medium">拨打</span>
            </div>
          )}

          {/* 微信号 */}
          {contacts.wechatId && (
            <div
              onClick={onCopyWechat}
              className="flex items-center justify-between cursor-pointer hover:text-[#0052D9] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 font-medium w-12">微信号：</span>
                <span className="text-neutral-700">{contacts.wechatId}</span>
              </div>
              <span className="text-[11px] text-[#0052D9] font-medium">复制</span>
            </div>
          )}

          {/* 邮箱 */}
          {contacts.email && (
            <div
              onClick={onEmailClick}
              className="flex items-center justify-between cursor-pointer hover:text-[#0052D9] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 font-medium w-12">邮　箱：</span>
                <span className="text-neutral-700 truncate max-w-[190px]">{contacts.email}</span>
              </div>
              <span className="text-[11px] text-[#0052D9] font-medium">写信</span>
            </div>
          )}

          {/* 地址 */}
          {contacts.address && (
            <div
              onClick={onAddressClick}
              className="flex items-start justify-between cursor-pointer hover:text-[#0052D9] transition-colors"
            >
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 font-medium w-12 shrink-0">地　址：</span>
                <span className="text-neutral-700 leading-relaxed text-[11px] line-clamp-2">
                  {contacts.address}
                </span>
              </div>
              <span className="text-[11px] text-[#0052D9] font-medium shrink-0 ml-1">导航</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
