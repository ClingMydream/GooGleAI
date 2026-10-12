import React, { useState } from 'react';
import { LayoutGrid, Cpu, HardDrive, Video, ChevronDown, ChevronUp, Sparkles, Layers } from 'lucide-react';
import { BusinessModule } from '../types/card';

interface BusinessShowcaseProps {
  modules?: BusinessModule[];
}

export const BusinessShowcase: React.FC<BusinessShowcaseProps> = ({ modules }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // 规则：空值隐藏
  if (!modules || modules.length === 0) {
    return null;
  }

  // 默认收起显示前2项，展开显示全部
  const visibleModules = isExpanded ? modules : modules.slice(0, 2);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-600" />;
      case 'HardDrive':
        return <HardDrive className="w-5 h-5 text-cyan-600" />;
      case 'Video':
        return <Video className="w-5 h-5 text-rose-600" />;
      case 'LayoutGrid':
      default:
        return <LayoutGrid className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section className="w-full px-4 py-2">
      <div className="rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-neutral-900 tracking-tight">
                核心业务板块
              </h3>
            </div>
          </div>
          {/* 右上角标注「内容由用户编辑」 */}
          <span className="text-[11px] text-neutral-400 font-normal tracking-tight">
            内容由用户编辑
          </span>
        </div>

        {/* Business Modules Grid / List */}
        <div className="space-y-3">
          {visibleModules.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-neutral-50/80 border border-neutral-100 transition-all hover:border-neutral-200/80 hover:bg-neutral-50"
            >
              {/* Optional High-Tech Visual Banner */}
              {item.bannerImage && (
                <div className="relative h-28 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.bannerImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold tracking-tight">
                      {item.title}
                    </span>
                    {item.highlightMetric && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                        {item.highlightMetric}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Module Text Content */}
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200/60 shadow-2xs flex items-center justify-center shrink-0">
                    {getModuleIcon(item.iconName)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 tracking-tight">
                      {item.title}
                    </h4>
                    {item.highlightMetric && !item.bannerImage && (
                      <span className="text-[11px] text-blue-600 font-medium">
                        {item.highlightMetric}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed mt-2 tracking-tight">
                  {item.description}
                </p>

                {/* Sub Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-3 text-[11px] text-neutral-500">
                    {item.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span>
                        {idx < item.tags!.length - 1 && (
                          <span className="text-neutral-300">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 查看全部 / 收起全部 Toggle Button */}
        {modules.length > 2 && (
          <div className="mt-3.5 pt-2 border-t border-neutral-100 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:scale-95 transition-all"
            >
              <span>{isExpanded ? '收起部分业务' : `查看全部 (${modules.length})`}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-neutral-500" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
