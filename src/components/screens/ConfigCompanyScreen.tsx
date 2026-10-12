import React, { useState } from 'react';
import { Upload, Check, Building2, Link2, Sparkles } from 'lucide-react';
import { CompanyEnterpriseInfo } from '../../types/card';

interface ConfigCompanyScreenProps {
  company: CompanyEnterpriseInfo;
  onSave: (updated: Partial<CompanyEnterpriseInfo>) => void;
  onToast: (msg: string) => void;
}

export const ConfigCompanyScreen: React.FC<ConfigCompanyScreenProps> = ({
  company,
  onSave,
  onToast,
}) => {
  const [fullName, setFullName] = useState(company.fullName);
  const [logo, setLogo] = useState(company.logo);
  const [moreInfoUrl, setMoreInfoUrl] = useState(company.moreInfoUrl || 'https://modao.cc/');

  const handleSave = () => {
    if (!fullName.trim()) {
      onToast('公司名称不能为空');
      return;
    }
    onSave({
      fullName,
      logo,
      moreInfoUrl,
    });
    onToast('公司基本信息已保存并生效！');
  };

  return (
    <div className="w-full pb-8 px-4 pt-3 space-y-4 animate-fade-in text-neutral-800">
      
      {/* Form Container */}
      <div className="rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-4.5">
        
        {/* 1. 公司名称 */}
        <div>
          <label className="text-xs font-bold text-neutral-800 block mb-1.5">
            公司名称
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="请输入公司全称"
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 focus:border-[#0052D9] focus:bg-white text-xs text-neutral-900 outline-none transition-all font-medium"
          />
        </div>

        {/* 2. 企业logo */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-neutral-800">
              企业logo
            </label>
            <span className="text-[10px] text-neutral-400">
              (建议文件不大于3M，规则正方形)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Logo Preview Square */}
            <div className="w-16 h-16 rounded-2xl bg-[#0052D9] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0 ring-1 ring-black/5">
              {logo}
            </div>

            <div className="flex-1 space-y-1.5">
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="LOGO 缩写/文字标识"
                className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200/80 focus:border-[#0052D9] text-xs text-neutral-800 outline-none"
              />
              <button
                type="button"
                onClick={() => onToast('已模拟调起相册/文件选择器更新Logo')}
                className="py-1 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-medium flex items-center gap-1 transition-colors"
              >
                <Upload className="w-3 h-3" />
                <span>更换Logo图片</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. 更多信息链接 */}
        <div>
          <label className="text-xs font-bold text-neutral-800 block mb-1.5">
            更多信息链接
          </label>
          <div className="relative">
            <input
              type="text"
              value={moreInfoUrl}
              onChange={(e) => setMoreInfoUrl(e.target.value)}
              placeholder="请输入外部官网或墨刀链接"
              className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 focus:border-[#0052D9] focus:bg-white text-xs text-neutral-900 outline-none transition-all font-mono"
            />
            <Link2 className="w-4 h-4 text-neutral-400 absolute left-2.5 top-3" />
          </div>
        </div>

      </div>

      {/* 底部保存修改按钮 (Screen 08/09 原型主色蓝) */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          className="w-full h-12 rounded-2xl bg-[#0052D9] hover:bg-[#003fb3] active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>保存修改</span>
        </button>
      </div>

    </div>
  );
};
