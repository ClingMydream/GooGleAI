import React, { useState } from 'react';
import { FileText, Download, Share2, CheckCircle2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { AttachmentItem } from '../../types/card';

interface AttachmentDetailScreenProps {
  attachment: AttachmentItem;
  onForward: (item: AttachmentItem) => void;
  onDownload: (item: AttachmentItem) => void;
}

export const AttachmentDetailScreen: React.FC<AttachmentDetailScreenProps> = ({
  attachment,
  onForward,
  onDownload,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = attachment.previewPages || [
    '第 1 页：文档概览与企业资质介绍',
    '第 2 页：核心方案架构与技术规格',
    '第 3 页：落地案例与附录清单说明',
  ];

  return (
    <div className="w-full pb-8 px-4 pt-3 space-y-4 animate-fade-in text-neutral-800">
      
      {/* 附件标题展示 Header Card */}
      <div className="rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052D9] flex flex-col items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
            <span className="text-[8px] font-bold uppercase tracking-wider">
              {attachment.fileType.toUpperCase()}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-neutral-900 leading-snug">
              {attachment.title}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1.5">
              <span>大小：{attachment.fileSize}</span>
              <span>·</span>
              <span>上传时间：{attachment.uploadDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 附件内容展示 (Document Preview Viewer) */}
      <div className="rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-neutral-100 mb-4">
          <span className="font-semibold text-neutral-700">
            {pages[currentPage]}
          </span>
          <span>
            {currentPage + 1} / {pages.length}
          </span>
        </div>

        {/* Document Simulation Page */}
        <div className="rounded-2xl bg-neutral-50/70 border border-neutral-100 p-5 min-h-[220px] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-4 bg-neutral-200/70 rounded-md w-3/4" />
            <div className="h-3 bg-neutral-200/50 rounded-md w-full" />
            <div className="h-3 bg-neutral-200/50 rounded-md w-5/6" />

            {attachment.summary && (
              <div className="my-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-neutral-700 leading-relaxed">
                <span className="font-semibold text-[#0052D9] block mb-1">
                  核心内容提要：
                </span>
                <p>{attachment.summary}</p>
              </div>
            )}

            <div className="h-3 bg-neutral-200/50 rounded-md w-full" />
            <div className="h-3 bg-neutral-200/40 rounded-md w-2/3" />
          </div>

          <div className="pt-4 border-t border-neutral-200/50 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>官方原版资料认证</span>
            </span>
            <span>广东京伦信息科技</span>
          </div>
        </div>

        {/* Page Switcher */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-full bg-neutral-100 text-neutral-700 disabled:opacity-30 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-neutral-600">
            第 {currentPage + 1} 页
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
            disabled={currentPage === pages.length - 1}
            className="p-2 rounded-full bg-neutral-100 text-neutral-700 disabled:opacity-30 active:scale-95 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onForward(attachment)}
          className="h-11 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.98] text-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>转发附件</span>
        </button>

        <button
          onClick={() => onDownload(attachment)}
          className="h-11 rounded-2xl bg-[#0052D9] hover:bg-[#003fb3] active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>保存至本地</span>
        </button>
      </div>

    </div>
  );
};
