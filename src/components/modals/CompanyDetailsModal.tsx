import React from 'react';
import { Building2, X, Copy, ExternalLink, ShieldCheck, Check, Phone } from 'lucide-react';
import { CompanyEnterpriseInfo } from '../../types/card';
import { copyToClipboard } from '../../utils/vcard';

interface CompanyDetailsModalProps {
  isOpen: boolean;
  company: CompanyEnterpriseInfo;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
  isOpen,
  company,
  onClose,
  onToast,
}) => {
  if (!isOpen) return null;

  const { tenItems } = company;

  const handleCopy = async (label: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      onToast(`已复制${label}`);
    }
  };

  const infoRows = [
    { label: '统一社会信用代码', value: tenItems.creditCode, copyable: true },
    { label: '法定代表人', value: tenItems.legalPerson },
    { label: '注册资本', value: tenItems.registeredCapital },
    { label: '成立日期', value: tenItems.establishedDate },
    { label: '行业分类', value: tenItems.industry },
    { label: '企业类型', value: tenItems.enterpriseType },
    { label: '经营状态', value: tenItems.operatingStatus, highlight: true },
    { label: '官方网址', value: tenItems.officialWebsite, isUrl: true },
    { label: '全国服务热线', value: tenItems.hotline, isPhone: true },
    { label: '法定经营范围', value: tenItems.businessScope, fullWidth: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] bg-white p-6 shadow-2xl flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
              {company.logo}
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                {company.fullName}
              </h3>
              <p className="text-xs text-neutral-400">
                国家企业信用信息公示系统核准公开资料
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 10 Items List View with Apple Settings Grouping */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
          <div className="rounded-2xl bg-neutral-50 border border-neutral-100 divide-y divide-neutral-100 overflow-hidden">
            {infoRows.map((row, idx) => (
              <div
                key={idx}
                className={`p-3.5 flex ${
                  row.fullWidth ? 'flex-col gap-1.5' : 'items-center justify-between'
                }`}
              >
                <span className="text-neutral-400 font-medium whitespace-nowrap">
                  {idx + 1}. {row.label}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-semibold text-right ${
                      row.highlight
                        ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]'
                        : 'text-neutral-800'
                    }`}
                  >
                    {row.value}
                  </span>

                  {row.copyable && (
                    <button
                      onClick={() => handleCopy(row.label, row.value)}
                      className="p-1 rounded-md hover:bg-neutral-200 text-neutral-500 transition-colors"
                      title="复制"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {row.isUrl && (
                    <a
                      href={row.value}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded-md hover:bg-neutral-200 text-blue-600 transition-colors"
                      title="访问官网"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {row.isPhone && (
                    <a
                      href={`tel:${row.value.split('/')[0].trim()}`}
                      className="p-1 rounded-md hover:bg-neutral-200 text-emerald-600 transition-colors"
                      title="拨打热线"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-[11px] text-blue-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>上述十项企业公示信息均通过数字可信存证与市场监督权威校验。</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-neutral-100 text-center">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-2xl bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white font-semibold text-xs transition-all"
          >
            关闭企业信息
          </button>
        </div>
      </div>
    </div>
  );
};
