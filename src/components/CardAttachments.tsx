import React from 'react';
import { FileText, ChevronRight, Paperclip } from 'lucide-react';
import { AttachmentItem } from '../types/card';

interface CardAttachmentsProps {
  attachments?: AttachmentItem[];
  onPreview: (item: AttachmentItem) => void;
  onForward?: (item: AttachmentItem) => void;
}

export const CardAttachments: React.FC<CardAttachmentsProps> = ({
  attachments,
  onPreview,
  onForward,
}) => {
  // 无附件时整块隐藏
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-4 py-2">
      <div className="rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#0052D9] flex items-center justify-center">
              <Paperclip className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              名片附件
            </h3>
          </div>
          <span className="text-[11px] text-neutral-400">
            支持在线预览与查阅
          </span>
        </div>

        {/* Attachment Item Cards matching prototype 02/03 */}
        <div className="space-y-3">
          {attachments.map((item) => (
            <div
              key={item.id}
              onClick={() => onPreview(item)}
              className="group rounded-2xl overflow-hidden bg-neutral-50/80 border border-neutral-100 hover:border-blue-200 hover:bg-neutral-50 transition-all cursor-pointer p-3.5"
            >
              <div className="flex items-start gap-3">
                {/* File Thumbnail Squircle */}
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100/80 text-[#0052D9] flex flex-col items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                  <span className="text-[8px] font-bold uppercase tracking-wider text-[#0052D9]">
                    {item.fileType.toUpperCase()}
                  </span>
                </div>

                {/* File Title and Summary Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-neutral-900 line-clamp-1 group-hover:text-[#0052D9] transition-colors">
                      {item.title}
                    </h4>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#0052D9] transition-colors shrink-0" />
                  </div>
                  
                  <p className="text-[11px] text-neutral-500 leading-relaxed mt-1 line-clamp-2">
                    {item.summary || item.content || '点击查看附件详细内容与多页预览'}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-2">
                    <span>{item.fileSize}</span>
                    <span>·</span>
                    <span>{item.uploadDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
