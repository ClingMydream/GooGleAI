import React, { useState } from 'react';
import { Building2, ChevronRight, Layers, Users, ExternalLink } from 'lucide-react';
import { CardData, EmployeePerson, BusinessModule } from '../../types/card';
import { SteadyAvatar } from '../common/SteadyAvatar';

interface HomeScreenProps {
  card: CardData;
  employees: EmployeePerson[];
  onSelectEmployee: (emp: EmployeePerson) => void;
  onViewAllPersonnel: () => void;
  onViewBusinessDetail: (module: BusinessModule) => void;
  onOpenCompanyDetails: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  card,
  employees,
  onSelectEmployee,
  onViewAllPersonnel,
  onViewBusinessDetail,
  onOpenCompanyDetails,
}) => {
  const [isBusinessExpanded, setIsBusinessExpanded] = useState(false);
  const { company, businessModules = [] } = card;

  const displayModules = isBusinessExpanded ? businessModules : businessModules.slice(0, 2);

  return (
    <div className="w-full pb-8 space-y-3.5 animate-fade-in text-neutral-800">
      
      {/* 1. 公司信息卡片 (Company Intro Hero Card) */}
      <div className="mx-4 mt-3 rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        {/* Company Header Row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-[#0052D9] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            {company.logo}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-bold text-neutral-900 tracking-tight truncate">
              {company.fullName}
            </h2>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              高新技术企业 · 信创全栈服务商
            </p>
          </div>
        </div>

        {/* Company Intro Text */}
        <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 mb-3.5">
          {company.aboutIntro}
        </p>

        {/* Company Showcase Image */}
        {company.aboutImage && (
          <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-100 mb-3">
            <img
              src={company.aboutImage}
              alt="公司展示环境"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold drop-shadow-xs">
              {company.aboutTitle}
            </div>
          </div>
        )}

        {/* 查看更多信息 Button */}
        <div className="text-center pt-1 border-t border-neutral-100">
          <button
            onClick={onOpenCompanyDetails}
            className="text-xs font-semibold text-[#0052D9] hover:text-[#003fb3] active:scale-95 transition-all inline-flex items-center gap-1 py-1 px-3 rounded-full hover:bg-blue-50/60"
          >
            <span>查看更多企业信息</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. 相关人员区块 (Relevant Personnel with Steady Color Block Avatars) */}
      <div className="mx-4 rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        {/* Section Header with "全部 >" */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#0052D9] flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              相关人员
            </h3>
          </div>
          <button
            onClick={onViewAllPersonnel}
            className="text-xs font-medium text-neutral-500 hover:text-[#0052D9] flex items-center gap-0.5 active:scale-95 transition-all"
          >
            <span>全部</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>

        {/* Horizontal Scroll of Employee Cards with Steady Color Block Avatars */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          {employees.map((emp) => (
            <div
              key={emp.id}
              onClick={() => onSelectEmployee(emp)}
              className="flex-1 min-w-[102px] max-w-[120px] p-3 rounded-2xl bg-neutral-50/80 border border-neutral-100 hover:border-blue-200 hover:bg-blue-50/30 flex flex-col items-center text-center cursor-pointer active:scale-95 transition-all group"
            >
              {/* Steady Color Block Avatar */}
              <div className="mb-2">
                <SteadyAvatar
                  char={emp.avatarChar}
                  bg={emp.avatarBg}
                  size="lg"
                  shape="circle"
                  className="group-hover:ring-2 group-hover:ring-[#0052D9]/30 transition-all"
                />
              </div>

              {/* Name */}
              <span className="text-xs font-bold text-neutral-900 truncate w-full">
                {emp.name}
              </span>

              {/* Title */}
              <span className="text-[11px] text-neutral-400 truncate w-full mt-0.5">
                {emp.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 业务介绍 (Business Showcase) */}
      <div className="mx-4 rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#0052D9] flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              业务介绍
            </h3>
          </div>
          <span className="text-[11px] text-neutral-400">核心业务板块</span>
        </div>

        {/* Business Modules Cards */}
        <div className="space-y-3">
          {displayModules.map((item) => (
            <div
              key={item.id}
              onClick={() => onViewBusinessDetail(item)}
              className="rounded-2xl overflow-hidden bg-neutral-50/80 border border-neutral-100 cursor-pointer hover:border-blue-200 hover:bg-neutral-50 transition-all group"
            >
              {item.bannerImage && (
                <div className="relative h-28 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.bannerImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3 text-white text-xs font-semibold">
                    {item.title}
                  </div>
                </div>
              )}

              <div className="p-3.5">
                <h4 className="text-xs font-bold text-neutral-900 group-hover:text-[#0052D9] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-600 leading-relaxed mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 查看更多信息 Button */}
        {businessModules.length > 2 && (
          <div className="text-center pt-3 mt-3 border-t border-neutral-100">
            <button
              onClick={() => setIsBusinessExpanded(!isBusinessExpanded)}
              className="text-xs font-semibold text-[#0052D9] hover:text-[#003fb3] active:scale-95 transition-all inline-flex items-center gap-1 py-1 px-3 rounded-full hover:bg-blue-50/60"
            >
              <span>{isBusinessExpanded ? '收起部分业务' : '查看更多业务介绍'}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isBusinessExpanded ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
