import React, { useRef, useState } from 'react';
import { Download, Share2, X, Check, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { CardData } from '../../types/card';
import { SteadyAvatar } from '../common/SteadyAvatar';

interface PosterModalProps {
  isOpen: boolean;
  card: CardData;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({
  isOpen,
  card,
  onClose,
  onToast,
}) => {
  const [isDeniedAuth, setIsDeniedAuth] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleSaveToAlbum = () => {
    if (isDeniedAuth) {
      onToast('保存失败：未授权手机相册写入权限，请在系统设置中允许');
      return;
    }
    onToast(`名片图片海报已成功保存至手机相册！`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-sm rounded-[32px] bg-white p-5 shadow-2xl flex flex-col max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0052D9]" />
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              名片图片生成
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Poster Canvas Preview with Apple Minimalist Blue Aesthetic */}
        <div
          ref={posterRef}
          className="relative rounded-[24px] overflow-hidden bg-neutral-900 text-white shadow-xl border border-neutral-800 p-5 mb-4"
        >
          {/* Subtle Ambient Blue Gradient Background */}
          <div className="absolute inset-0 bg-radial-[at_top_right] from-blue-900/60 via-neutral-900 to-black pointer-events-none" />

          {/* Top Company Header */}
          <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#0052D9] text-white flex items-center justify-center font-bold text-[10px]">
                {card.company.logo}
              </div>
              <span className="text-xs font-semibold text-neutral-200 tracking-tight">
                {card.company.fullName}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400">
              官方商务名片
            </span>
          </div>

          {/* Card Owner Profile with Steady Color Block Avatar */}
          <div className="relative z-10 flex items-start gap-3.5 mb-4">
            <SteadyAvatar
              char={card.avatarChar}
              bg={card.avatarBg}
              size="lg"
              shape="circle"
              className="ring-2 ring-white/20 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {card.name}
                </h4>
                <span className="text-xs font-semibold text-neutral-300">
                  {card.title}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {card.department}
              </p>
              <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-medium border border-blue-400/30">
                <ShieldCheck className="w-3 h-3" />
                <span>实名在职认证</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="relative z-10 p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-[11px] text-neutral-300 mb-4">
            {card.contacts.phone && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">手机号</span>
                <span className="font-mono text-white">{card.contacts.phone}</span>
              </div>
            )}
            {card.contacts.wechatId && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">微信号</span>
                <span className="text-neutral-200">{card.contacts.wechatId}</span>
              </div>
            )}
            {card.contacts.email && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">邮　箱</span>
                <span className="text-neutral-200 truncate ml-2 max-w-[170px]">{card.contacts.email}</span>
              </div>
            )}
            {card.contacts.address && (
              <div className="flex items-start justify-between">
                <span className="text-neutral-400 shrink-0">地　址</span>
                <span className="text-right text-neutral-300 text-[10px] truncate ml-2">{card.contacts.address}</span>
              </div>
            )}
          </div>

          {/* Poster Bottom Strip: Micro Program QR Code (小程序二维码扫描) */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
            <div>
              <p className="text-xs font-bold text-white">微信扫一扫</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">
                直达名片 / 一键存通讯录
              </p>
            </div>

            {/* WeChat Mini Program Sunburst Code (小程序码) */}
            <div className="w-13 h-13 rounded-full bg-white p-1 flex items-center justify-center shadow-md relative shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-900">
                {[...Array(12)].map((_, i) => (
                  <circle
                    key={i}
                    cx={50 + 36 * Math.cos((i * Math.PI) / 6)}
                    cy={50 + 36 * Math.sin((i * Math.PI) / 6)}
                    r="4.5"
                    fill="currentColor"
                  />
                ))}
                <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="6" />
                <circle cx="50" cy="50" r="14" fill="#0052D9" />
              </svg>
              <span className="absolute text-[8px] font-bold text-white">JL</span>
            </div>
          </div>
        </div>

        {/* Permission Denied Simulation Note */}
        {isDeniedAuth && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-700 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>未授权相册权限：如需保存图片，请开启手机相册读取权限。</span>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={handleSaveToAlbum}
            className="w-full h-11 rounded-2xl bg-[#0052D9] hover:bg-[#003fb3] active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>保存图片到手机相册</span>
          </button>

          <div className="flex items-center justify-between px-1 pt-1">
            <button
              onClick={() => setIsDeniedAuth(!isDeniedAuth)}
              className="text-[10px] text-neutral-400 hover:text-neutral-600 underline"
            >
              {isDeniedAuth ? '模拟已授权相册' : '测试相册未授权异常场景'}
            </button>

            <button
              onClick={onClose}
              className="text-xs text-neutral-500 hover:text-neutral-800 font-medium cursor-pointer"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
