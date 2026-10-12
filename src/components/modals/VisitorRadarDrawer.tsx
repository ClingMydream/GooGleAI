import React from 'react';
import { Activity, UserPlus, Eye, FileText, Phone, MessageSquare, X, Users, ArrowUpRight } from 'lucide-react';
import { VisitorEvent } from '../../types/card';
import { SteadyAvatar } from '../common/SteadyAvatar';

interface VisitorRadarDrawerProps {
  isOpen: boolean;
  events: VisitorEvent[];
  viewCount: number;
  saveCount: number;
  onClose: () => void;
}

export const VisitorRadarDrawer: React.FC<VisitorRadarDrawerProps> = ({
  isOpen,
  events,
  viewCount,
  saveCount,
  onClose,
}) => {
  if (!isOpen) return null;

  const getActionBadge = (action: VisitorEvent['action']) => {
    switch (action) {
      case 'save_contact':
        return {
          icon: <UserPlus className="w-3.5 h-3.5 text-[#0052D9]" />,
          label: '存入通讯录',
          color: 'bg-blue-50 text-blue-700',
        };
      case 'download_attachment':
        return {
          icon: <FileText className="w-3.5 h-3.5 text-amber-600" />,
          label: '查阅资料',
          color: 'bg-amber-50 text-amber-700',
        };
      case 'copy_wechat':
        return {
          icon: <MessageSquare className="w-3.5 h-3.5 text-teal-600" />,
          label: '复制微信',
          color: 'bg-teal-50 text-teal-700',
        };
      case 'call':
        return {
          icon: <Phone className="w-3.5 h-3.5 text-emerald-600" />,
          label: '拨打电话',
          color: 'bg-emerald-50 text-emerald-700',
        };
      case 'view':
      default:
        return {
          icon: <Eye className="w-3.5 h-3.5 text-indigo-600" />,
          label: '深度浏览',
          color: 'bg-indigo-50 text-indigo-700',
        };
    }
  };

  const conversionRate = ((saveCount / viewCount) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md rounded-t-[28px] sm:rounded-[28px] bg-white p-6 shadow-2xl flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0052D9] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                获客雷达 · 谁看了我的名片
              </h3>
              <p className="text-[11px] text-neutral-400">
                实时访客足迹与商业意向洞察
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Funnel Metrics Strip */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
          <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
            <span className="text-[11px] text-neutral-400">总访问量</span>
            <div className="text-lg font-bold text-neutral-900 mt-0.5">
              {viewCount}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
            <span className="text-[11px] text-neutral-400">存入通讯录</span>
            <div className="text-lg font-bold text-[#0052D9] mt-0.5">
              {saveCount}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
            <span className="text-[11px] text-neutral-400">名片转化率</span>
            <div className="text-lg font-bold text-emerald-600 mt-0.5">
              {conversionRate}%
            </div>
          </div>
        </div>

        {/* Real-time Visitor Events Timeline */}
        <div className="text-xs font-semibold text-neutral-900 mb-2.5 flex items-center justify-between">
          <span>最近访客动态 ({events.length})</span>
          <span className="text-[11px] text-neutral-400 font-normal">实时记录</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {events.map((ev) => {
            const badge = getActionBadge(ev.action);
            return (
              <div
                key={ev.id}
                className="p-3 rounded-2xl bg-neutral-50/80 border border-neutral-100 flex items-center justify-between gap-3 hover:bg-neutral-100/70 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <SteadyAvatar
                    char={ev.avatarChar}
                    bg={ev.avatarBg}
                    size="sm"
                    shape="circle"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-neutral-900 text-xs">
                        {ev.visitorName}
                      </span>
                      <span className="text-[11px] text-neutral-400 truncate max-w-[130px]">
                        ({ev.visitorCompany})
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5 truncate">
                      {ev.target ? `对「${ev.target}」产生了互动` : '浏览了完整名片'}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${badge.color}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>
                  <div className="text-[10px] text-neutral-400 mt-1">
                    {ev.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-neutral-100">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs active:scale-[0.98] transition-all cursor-pointer"
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
};
