import React from 'react';
import { ChevronRight, Building, FileText, Paperclip, ShieldCheck } from 'lucide-react';

interface ConfigMenuScreenProps {
  onNavigate: (target: 'company' | 'business' | 'attachments') => void;
}

export const ConfigMenuScreen: React.FC<ConfigMenuScreenProps> = ({ onNavigate }) => {
  const menuItems = [
    {
      id: 'company',
      title: '公司基本信息',
      desc: '配置公司全称、企业Logo与外部跳转链接',
      icon: <Building className="w-5 h-5 text-[#0052D9]" />,
      action: () => onNavigate('company'),
    },
    {
      id: 'business',
      title: '企业介绍',
      desc: '维护核心业务板块、宣传图文与方案白皮书',
      icon: <FileText className="w-5 h-5 text-indigo-600" />,
      action: () => onNavigate('business'),
    },
    {
      id: 'attachments',
      title: '个人名片附件',
      desc: '上传与管理供客户下载预览的企业PDF资料',
      icon: <Paperclip className="w-5 h-5 text-teal-600" />,
      action: () => onNavigate('attachments'),
    },
  ];

  return (
    <div className="w-full pb-8 px-4 pt-3 space-y-4 animate-fade-in text-neutral-800">
      <div className="px-1 text-xs text-neutral-400">
        信息配置管理后台 · 实时生效
      </div>

      <div className="rounded-[24px] bg-white border border-black/[0.04] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] divide-y divide-neutral-100">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={item.action}
            className="p-4 flex items-center justify-between hover:bg-neutral-50 active:bg-neutral-100/60 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:text-[#0052D9] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0052D9] transition-colors" />
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-[#0052D9] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          此处配置由企业管理员统一维护。修改后名片详情页与各端访客将同步实时更新。
        </p>
      </div>
    </div>
  );
};
