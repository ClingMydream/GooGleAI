import React, { useState } from 'react';
import { FileText, Share2, Download, X, ChevronLeft, ChevronRight, Eye, CheckCircle2 } from 'lucide-react';
import { AttachmentItem } from '../../types/card';

interface AttachmentPreviewModalProps {
  isOpen: boolean;
  attachment: AttachmentItem | null;
  onClose: () => void;
  onForward: (item: AttachmentItem) => void;
  onDownloadLogged?: () => void;
  onToast: (msg: string) => void;
}

export const AttachmentPreviewModal: React.FC<AttachmentPreviewModalProps> = ({
  isOpen,
  attachment,
  onClose,
  onForward,
  onDownloadLogged,
  onToast,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  if (!isOpen || !attachment) return null;

  const pages = attachment.previewPages || [
    '第 1 页：文档概览与引言',
    '第 2 页：核心方案与技术规格',
    '第 3 页：落地案例与附录说明',
  ];

  const handleDownload = () => {
    onDownloadLogged?.();
    onToast(`已开始下载: ${attachment.title}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-lg rounded-[28px] bg-white shadow-2xl flex flex-col overflow-hidden max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Apple Style Top Navigation Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-neutral-900 truncate">
                {attachment.title}
              </h3>
              <p className="text-[11px] text-neutral-400">
                {attachment.fileSize} · PDF 文档
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Document Content Viewport */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#F2F2F7]">
          {/* Simulated High-Res Apple Document Viewer Page */}
          <div className="rounded-2xl bg-white shadow-md border border-black/[0.04] p-6 min-h-[280px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-neutral-100 mb-4">
                <span className="font-medium text-neutral-800">
                  {pages[currentPage]}
                </span>
                <span>
                  {currentPage + 1} / {pages.length}
                </span>
              </div>

              <div className="space-y-3 py-2">
                <div className="h-4 bg-neutral-100 rounded-md w-3/4" />
                <div className="h-3 bg-neutral-100 rounded-md w-full" />
                <div className="h-3 bg-neutral-100 rounded-md w-5/6" />
                
                {attachment.summary && (
                  <div className="my-4 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100/80 text-xs text-neutral-700 leading-relaxed">
                    <p className="font-semibold text-blue-900 mb-1">
                      本页核心摘要：
                    </p>
                    <p>{attachment.summary}</p>
                  </div>
                )}

                <div className="h-3 bg-neutral-100 rounded-md w-full" />
                <div className="h-3 bg-neutral-100 rounded-md w-2/3" />
              </div>
            </div>

            {/* Document Watermark Seal */}
            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>官方原版资料认证</span>
              </span>
              <span>京伦信息版权所有</span>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-full bg-white text-neutral-700 disabled:opacity-40 shadow-xs border border-neutral-200/60 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-neutral-600">
              第 {currentPage + 1} 页 / 共 {pages.length} 页
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
              disabled={currentPage === pages.length - 1}
              className="p-2 rounded-full bg-white text-neutral-700 disabled:opacity-40 shadow-xs border border-neutral-200/60 active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-neutral-100 flex items-center gap-2.5">
          <button
            onClick={() => {
              onForward(attachment);
              onClose();
            }}
            className="flex-1 h-11 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.98] text-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-neutral-600" />
            <span>转发给微信好友</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>保存文档</span>
          </button>
        </div>

      </div>
    </div>
  );
};
