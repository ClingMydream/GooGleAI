import React from 'react';
import { Layers, CheckCircle2, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { BusinessModule } from '../../types/card';

interface BusinessDetailScreenProps {
  module: BusinessModule;
  onConsult: () => void;
  onShare: () => void;
}

export const BusinessDetailScreen: React.FC<BusinessDetailScreenProps> = ({
  module,
  onConsult,
  onShare,
}) => {
  return (
    <div className="w-full pb-8 px-4 pt-3 space-y-4 animate-fade-in text-neutral-800">
      
      {/* Visual Header */}
      {module.bannerImage && (
        <div className="relative h-48 w-full rounded-[24px] overflow-hidden bg-neutral-900 shadow-md">
          <img
            src={module.bannerImage}
            alt={module.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300">
              CORE BUSINESS
            </span>
            <h2 className="text-base font-bold mt-1 text-white">
              {module.title}
            </h2>
          </div>
        </div>
      )}

      {/* Content Card */}
      <div className="rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-4">
        {!module.bannerImage && (
          <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
            {module.title}
          </h2>
        )}

        {/* Highlight Metric */}
        {module.highlightMetric && (
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100/80 flex items-center justify-between text-xs">
            <span className="text-[#0052D9] font-medium">核心能力指标</span>
            <span className="text-blue-900 font-bold">{module.highlightMetric}</span>
          </div>
        )}

        {/* Detailed Prose Content */}
        <div>
          <h3 className="text-xs font-bold text-neutral-900 mb-2">业务背景与方案概述</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {module.description}
          </p>
        </div>

        {module.detailContent && (
          <div>
            <h3 className="text-xs font-bold text-neutral-900 mb-2">落地实践与技术优势</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {module.detailContent}
            </p>
          </div>
        )}

        {/* Tags */}
        {module.tags && module.tags.length > 0 && (
          <div className="pt-2 border-t border-neutral-100">
            <h4 className="text-[11px] text-neutral-400 mb-2">技术及应用标签</h4>
            <div className="flex flex-wrap gap-1.5">
              {module.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full bg-neutral-100 text-[11px] font-medium text-neutral-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Strip */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onShare}
          className="h-11 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.98] text-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>分享此业务</span>
        </button>

        <button
          onClick={onConsult}
          className="h-11 rounded-2xl bg-[#0052D9] hover:bg-[#003fb3] active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
        >
          <span>立即咨询该业务</span>
        </button>
      </div>

    </div>
  );
};
