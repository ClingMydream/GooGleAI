import React from 'react';
import { Plus, Trash2, Edit3, ChevronRight, Layers } from 'lucide-react';
import { BusinessModule } from '../../types/card';

interface ConfigBusinessListScreenProps {
  modules: BusinessModule[];
  onAddNew: () => void;
  onEdit: (mod: BusinessModule) => void;
  onDelete: (id: string) => void;
}

export const ConfigBusinessListScreen: React.FC<ConfigBusinessListScreenProps> = ({
  modules,
  onAddNew,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full pb-8 px-4 pt-3 space-y-4 animate-fade-in text-neutral-800">
      
      <div className="flex items-center justify-between px-1 text-xs text-neutral-400">
        <span>企业业务及方案介绍列表</span>
        <span>共 {modules.length} 项</span>
      </div>

      {/* Modules List (Screen 10 in prototype) */}
      <div className="space-y-3">
        {modules.map((item) => (
          <div
            key={item.id}
            className="rounded-[22px] bg-white border border-black/[0.04] p-4 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] space-y-3"
          >
            {item.bannerImage && (
              <div className="h-24 w-full rounded-xl overflow-hidden bg-neutral-900">
                <img
                  src={item.bannerImage}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <h4 className="text-sm font-bold text-neutral-900">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[10px] text-neutral-400">
                {item.highlightMetric || '核心板块'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(item)}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
                  title="编辑"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                  title="删除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* + 添加企业介绍 按钮 (Screen 10 原型底栏) */}
      <div className="pt-2">
        <button
          onClick={onAddNew}
          className="w-full h-12 rounded-2xl bg-white border border-dashed border-[#0052D9] text-[#0052D9] hover:bg-blue-50/50 active:scale-[0.98] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ 添加企业介绍</span>
        </button>
      </div>

    </div>
  );
};
