import React from 'react';
import { Settings2, Smartphone, RefreshCw, Layers, CheckCircle2, Navigation, Users, ShieldCheck, Activity } from 'lucide-react';
import { CardData, EmployeePerson, AppScreen } from '../types/card';
import { SteadyAvatar } from './common/SteadyAvatar';

interface InspectorPanelProps {
  currentScreen: AppScreen;
  onNavigateScreen: (screen: AppScreen) => void;
  card: CardData;
  employees: EmployeePerson[];
  onToggleSaved: () => void;
  onToggleEmail: () => void;
  onToggleWechat: () => void;
  onToggleAttachments: () => void;
  onSwitchEmployee: (emp: EmployeePerson) => void;
  onOpenRadar: () => void;
  onReset: () => void;
  hasEmail: boolean;
  hasWechat: boolean;
  hasAttachments: boolean;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  currentScreen,
  onNavigateScreen,
  card,
  employees,
  onToggleSaved,
  onToggleEmail,
  onToggleWechat,
  onToggleAttachments,
  onSwitchEmployee,
  onOpenRadar,
  onReset,
  hasEmail,
  hasWechat,
  hasAttachments,
}) => {
  const screenNavButtons: { screen: AppScreen; label: string; group: string }[] = [
    { screen: '01_home', label: '01 首页 (广东京伦)', group: '前端展示' },
    { screen: '02_card', label: '02/03 名片页 (张三)', group: '前端展示' },
    { screen: '04_attachment_detail', label: '04 附件展示', group: '前端展示' },
    { screen: '05_personnel_list', label: '05 公司相关人员', group: '前端展示' },
    { screen: '06_business_detail', label: '06 业务介绍详情', group: '前端展示' },
    { screen: '07_config_menu', label: '07 信息配置总览', group: '管理配置' },
    { screen: '08_config_company', label: '08/09 公司信息配置', group: '管理配置' },
    { screen: '10_config_business_list', label: '10 企业介绍列表', group: '管理配置' },
    { screen: '11_config_add_business', label: '11 添加企业介绍', group: '管理配置' },
    { screen: '12_config_attachments', label: '12 个人名片附件', group: '管理配置' },
  ];

  return (
    <div className="w-full max-w-sm rounded-[28px] bg-white/90 backdrop-blur-2xl border border-black/[0.06] p-5.5 shadow-xl flex flex-col gap-4.5 text-neutral-800">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0052D9] flex items-center justify-center">
            <Settings2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              名片小程序原型导航台
            </h3>
            <p className="text-[11px] text-neutral-400">
              简约风格 · 蓝色主调 · 沉稳色块头像
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
          title="重置测试数据"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 1. 原型页面跳转直达 (Screens 01 ~ 12) */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
          <span>原型 12 页面直达导航</span>
          <span className="text-[#0052D9] text-[10px] lowercase font-normal">点击即时切换</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 no-scrollbar">
          {screenNavButtons.map((item) => (
            <button
              key={item.screen}
              onClick={() => onNavigateScreen(item.screen)}
              className={`py-2 px-2.5 rounded-xl text-[11px] font-semibold text-left truncate transition-all ${
                currentScreen === item.screen
                  ? 'bg-[#0052D9] text-white shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 沉稳色块人员切换 */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
          人员名片切换 (沉稳色块头像)
        </label>
        <div className="space-y-1.5">
          {employees.slice(0, 3).map((emp) => (
            <div
              key={emp.id}
              onClick={() => onSwitchEmployee(emp)}
              className={`p-2 rounded-xl flex items-center justify-between cursor-pointer border transition-all ${
                card.id === emp.id
                  ? 'bg-blue-50/80 border-[#0052D9]/40 text-[#0052D9]'
                  : 'bg-neutral-50 border-neutral-200/60 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <SteadyAvatar char={emp.avatarChar} bg={emp.avatarBg} size="sm" shape="circle" />
                <span className="text-xs font-bold">{emp.name}</span>
                <span className="text-[10px] text-neutral-400">{emp.title}</span>
              </div>
              {card.id === emp.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#0052D9]" />}
            </div>
          ))}
        </div>
      </div>

      {/* 3. 关系状态与空值隐藏检验 */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
          关键状态与空值规则验证
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* 保存状态切换 (对应 02/03 原型) */}
          <button
            onClick={onToggleSaved}
            className={`p-2 rounded-xl border text-center font-semibold transition-all ${
              card.isSaved
                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                : 'bg-neutral-50 text-neutral-700 border-neutral-200/70 hover:bg-neutral-100'
            }`}
          >
            {card.isSaved ? '已保存状态 (03)' : '未存状态 (02)'}
          </button>

          {/* 获客雷达 */}
          <button
            onClick={onOpenRadar}
            className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-[#0052D9] text-white font-semibold flex items-center justify-center gap-1 shadow-2xs hover:opacity-95 active:scale-98 transition-all"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>获客追踪雷达</span>
          </button>
        </div>

        {/* 字段隐藏开关 */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500 bg-neutral-50 p-2 rounded-xl border border-neutral-200/60">
          <span>空值自动隐藏:</span>
          <div className="flex items-center gap-2 font-medium">
            <button
              onClick={onToggleEmail}
              className={`hover:underline ${hasEmail ? 'text-neutral-700' : 'text-red-500 font-bold'}`}
            >
              {hasEmail ? '邮箱:有' : '邮箱:空'}
            </button>
            <span>·</span>
            <button
              onClick={onToggleWechat}
              className={`hover:underline ${hasWechat ? 'text-neutral-700' : 'text-red-500 font-bold'}`}
            >
              {hasWechat ? '微信:有' : '微信:空'}
            </button>
            <span>·</span>
            <button
              onClick={onToggleAttachments}
              className={`hover:underline ${hasAttachments ? 'text-neutral-700' : 'text-red-500 font-bold'}`}
            >
              {hasAttachments ? '附件:有' : '附件:空'}
            </button>
          </div>
        </div>
      </div>

      {/* 4. 项目打包与源码下载 */}
      <div className="pt-2 border-t border-neutral-100">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
          <span>项目打包导出</span>
          <span className="text-emerald-600 font-mono text-[10px]">ZIP 已就绪 · 3.2MB</span>
        </label>
        <a
          href="/business-card-miniprogram.zip"
          download="business-card-miniprogram.zip"
          className="w-full h-11 rounded-2xl bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>下载完整工程源码包 (.zip)</span>
        </a>
        <p className="text-[10px] text-neutral-400 text-center mt-1.5">
          解压后执行 npm install & npm run dev 即可启动
        </p>
      </div>

    </div>
  );
};
