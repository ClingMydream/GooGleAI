import React, { useState } from 'react';
import { Plus, Trash2, FileText, Check, Paperclip, Upload } from 'lucide-react';
import { AttachmentItem } from '../../types/card';

interface ConfigAttachmentsScreenProps {
  attachments: AttachmentItem[];
  onAddAttachment: (att: AttachmentItem) => void;
  onDeleteAttachment: (id: string) => void;
  onToast: (msg: string) => void;
}

export const ConfigAttachmentsScreen: React.FC<ConfigAttachmentsScreenProps> = ({
  attachments,
  onAddAttachment,
  onDeleteAttachment,
  onToast,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const handleCreate = () => {
    if (!title.trim()) {
      onToast('请输入附件文件标题');
      return;
    }
    const newAtt: AttachmentItem = {
      id: `att_${Date.now()}`,
      title,
      fileType: 'pdf',
      fileSize: '6.4 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      downloadUrl: '#',
      summary: summary || '企业官方上传资质与方案文档',
      previewPages: ['第 1 页：文档总览', '第 2 页：核心细则'],
    };
    onAddAttachment(newAtt);
    setTitle('');
    setSummary('');
    setShowAddForm(false);
    onToast('新名片附件已成功上传并生效！');
  };

  return (
    <div className="w-full pb-8 px-4 pt-3 space-y-4 animate-fade-in text-neutral-800">
      
      <div className="flex items-center justify-between px-1 text-xs text-neutral-400">
        <span>名片客户可在线查看的附件文件</span>
        <span>共 {attachments.length} 份</span>
      </div>

      {/* Attachments List */}
      <div className="space-y-2.5">
        {attachments.map((item) => (
          <div
            key={item.id}
            className="rounded-[22px] bg-white border border-black/[0.04] p-4 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052D9] flex flex-col items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
                <span className="text-[8px] font-bold uppercase">
                  {item.fileType}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-neutral-900 truncate">
                  {item.title}
                </h4>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  {item.fileSize} · {item.uploadDate}
                </p>
              </div>
            </div>

            <button
              onClick={() => onDeleteAttachment(item.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors shrink-0"
              title="删除附件"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Attachment Form Card */}
      {showAddForm ? (
        <div className="rounded-[24px] bg-white border border-black/[0.04] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-3.5">
          <h4 className="text-xs font-bold text-neutral-900">
            上传新名片资料文件
          </h4>

          <div>
            <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
              文件标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：2025京伦科技全系产品白皮书.pdf"
              className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200/80 focus:border-[#0052D9] text-xs text-neutral-900 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
              内容提要
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="一句话介绍文档核心价值"
              className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200/80 focus:border-[#0052D9] text-xs text-neutral-900 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCreate}
              className="flex-1 h-10 rounded-xl bg-[#0052D9] text-white text-xs font-semibold flex items-center justify-center gap-1 active:scale-98 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>确认添加</span>
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 h-10 rounded-xl bg-neutral-100 text-neutral-600 text-xs font-medium"
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full h-12 rounded-2xl bg-white border border-dashed border-[#0052D9] text-[#0052D9] hover:bg-blue-50/50 active:scale-[0.98] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ 上传个人名片附件 (PDF/文档)</span>
          </button>
        </div>
      )}

    </div>
  );
};
