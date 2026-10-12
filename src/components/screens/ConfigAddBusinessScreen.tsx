import React, { useState } from 'react';
import { Plus, Check, Image as ImageIcon, Upload, FileText } from 'lucide-react';
import { BusinessModule } from '../../types/card';
import { ASSET_PATHS } from '../../data/mockCards';

interface ConfigAddBusinessScreenProps {
  initialData?: BusinessModule | null;
  onSave: (module: BusinessModule) => void;
  onToast: (msg: string) => void;
}

export const ConfigAddBusinessScreen: React.FC<ConfigAddBusinessScreenProps> = ({
  initialData,
  onSave,
  onToast,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [detailContent, setDetailContent] = useState(initialData?.detailContent || '');
  const [hasImage, setHasImage] = useState(Boolean(initialData?.bannerImage));

  const handleSave = () => {
    if (!title.trim()) {
      onToast('请输入企业介绍标题');
      return;
    }
    if (!description.trim()) {
      onToast('请输入企业介绍说明');
      return;
    }

    const newModule: BusinessModule = {
      id: initialData?.id || `bm_${Date.now()}`,
      title,
      description,
      detailContent: detailContent || description,
      iconName: 'LayoutGrid',
      bannerImage: hasImage ? ASSET_PATHS.solutionAi : undefined,
      tags: ['数智升级', '自主研发'],
      highlightMetric: '99.9% 稳定运行',
    };

    onSave(newModule);
    onToast(initialData ? '企业介绍已成功更新！' : '企业介绍已成功添加！');
  };

  return (
    <div className="w-full pb-8 px-4 pt-3 space-y-4 animate-fade-in text-neutral-800">
      
      {/* Form Container (Screen 11 in prototype) */}
      <div className="rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-4">
        
        {/* 1. 企业介绍标题 */}
        <div>
          <label className="text-xs font-bold text-neutral-800 block mb-1.5">
            企业介绍标题
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入标题"
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 focus:border-[#0052D9] focus:bg-white text-xs text-neutral-900 outline-none transition-all font-medium"
          />
        </div>

        {/* 2. 企业介绍说明 */}
        <div>
          <label className="text-xs font-bold text-neutral-800 block mb-1.5">
            企业介绍说明
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="请输入简介说明"
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 focus:border-[#0052D9] focus:bg-white text-xs text-neutral-900 outline-none transition-all resize-none"
          />
        </div>

        {/* 3. 企业介绍图片 */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-neutral-800">
              企业介绍图片
            </label>
            <span className="text-[10px] text-neutral-400">
              (建议文件不大于3M，建议750*400px)
            </span>
          </div>

          {hasImage ? (
            <div className="relative h-28 w-full rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src={ASSET_PATHS.solutionAi}
                alt="预览"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setHasImage(false)}
                className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/60 text-white text-[10px] backdrop-blur-md"
              >
                移除
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                setHasImage(true);
                onToast('已添加示例企业介绍高清图');
              }}
              className="h-24 w-full rounded-2xl border-2 border-dashed border-neutral-200 hover:border-[#0052D9] flex flex-col items-center justify-center text-neutral-400 hover:text-[#0052D9] cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 mb-1">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium">点击上传图片</span>
            </div>
          )}
        </div>

        {/* 4. 企业介绍内容 */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-neutral-800">
              企业介绍详细内容
            </label>
            <span className="text-[10px] text-neutral-400">
              (富文本/多图文)
            </span>
          </div>

          <textarea
            rows={4}
            value={detailContent}
            onChange={(e) => setDetailContent(e.target.value)}
            placeholder="请输入落地实践与更详细的技术介绍..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 focus:border-[#0052D9] focus:bg-white text-xs text-neutral-900 outline-none transition-all resize-none"
          />
        </div>

      </div>

      {/* 底部保存按钮 */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          className="w-full h-12 rounded-2xl bg-[#0052D9] hover:bg-[#003fb3] active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>保存企业介绍</span>
        </button>
      </div>

    </div>
  );
};
