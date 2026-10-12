import React from 'react';
import { Phone, Copy, Check, X } from 'lucide-react';
import { copyToClipboard } from '../../utils/vcard';

interface PhoneModalProps {
  isOpen: boolean;
  phone?: string;
  name: string;
  onClose: () => void;
  onCallLogged?: () => void;
  onToast: (msg: string) => void;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({
  isOpen,
  phone,
  name,
  onClose,
  onCallLogged,
  onToast,
}) => {
  if (!isOpen || !phone) return null;

  const cleanPhone = phone.replace(/\s+/g, '');

  const handleDial = () => {
    onCallLogged?.();
    window.location.href = `tel:${cleanPhone}`;
    onToast(`正在呼叫 ${name} (${phone})`);
    onClose();
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(cleanPhone);
    if (success) {
      onToast('手机号已复制到剪贴板');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-sm rounded-t-[28px] sm:rounded-[28px] bg-white p-5 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag Handle */}
        <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Phone className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 tracking-tight">
            联系 {name}
          </h3>
          <p className="text-xl font-bold text-blue-600 tracking-wider mt-1">
            {phone}
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            工作日 09:00 - 18:00
          </p>
        </div>

        <div className="space-y-2.5">
          {/* Dial Button */}
          <button
            onClick={handleDial}
            className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>立即呼叫</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full h-12 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.98] text-neutral-800 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Copy className="w-4 h-4 text-neutral-500" />
            <span>复制手机号码</span>
          </button>

          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-full h-11 rounded-2xl text-neutral-500 hover:text-neutral-900 text-sm font-medium transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};
