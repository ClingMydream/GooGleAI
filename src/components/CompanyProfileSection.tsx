import React from 'react';
import { Building2, ChevronRight, Award, ShieldCheck, Globe, PhoneCall } from 'lucide-react';
import { CompanyEnterpriseInfo } from '../types/card';

interface CompanyProfileSectionProps {
  company: CompanyEnterpriseInfo;
  onOpenTenItems: () => void;
}

export const CompanyProfileSection: React.FC<CompanyProfileSectionProps> = ({
  company,
  onOpenTenItems,
}) => {
  return (
    <section className="w-full px-4 py-2">
      <div className="rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="text-[15px] font-bold text-neutral-900 tracking-tight">
              企业介绍
            </h3>
          </div>
          <span className="text-[11px] text-neutral-400 font-normal tracking-tight">
            以下内容由用户自行编辑上传
          </span>
        </div>

        {/* Company Identity Strip */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50/80 border border-neutral-100 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs">
            {company.logo}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-neutral-900 tracking-tight truncate">
              {company.fullName}
            </h4>
            <p className="text-[11px] text-neutral-400 mt-0.5 tracking-tight">
              华南政企高新技术数字化标杆企业
            </p>
          </div>
        </div>

        {/* About Us Media Hero Showcase */}
        {company.aboutImage && (
          <div className="relative rounded-2xl overflow-hidden mb-3.5 bg-neutral-100 border border-neutral-100/80">
            <div className="h-44 w-full overflow-hidden">
              <img
                src={company.aboutImage}
                alt="企业工作环境与展示"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-3.5 left-4 right-4 text-white">
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300">
                ABOUT US
              </span>
              <h5 className="text-sm font-bold mt-0.5 tracking-tight text-white drop-shadow-xs">
                {company.aboutTitle}
              </h5>
            </div>
          </div>
        )}

        {/* Company Introduction Prose */}
        <div className="text-xs text-neutral-600 leading-relaxed space-y-2 mb-4 px-1">
          <p>{company.aboutIntro}</p>
        </div>

        {/* Quick Enterprise Highlights */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-[11px]">
          <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-neutral-700 font-medium">国家高新技术企业</span>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-neutral-700 font-medium">CMMI 5级认证软件</span>
          </div>
        </div>

        {/* Action Link: "更多 10 项信息" (跳转查看工商与合规资料) */}
        <button
          onClick={onOpenTenItems}
          className="w-full py-2.5 px-4 rounded-xl bg-neutral-100/80 hover:bg-neutral-200/60 active:scale-[0.99] text-xs font-semibold text-neutral-800 flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>查看企业工商认证与资质 (更多 10 项信息)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>

      </div>
    </section>
  );
};
