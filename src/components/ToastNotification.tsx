import React from 'react';
import { Check, Info } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-60 pointer-events-none transition-all duration-300">
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900/90 text-white text-xs font-medium shadow-xl backdrop-blur-xl border border-white/10 animate-fade-in">
        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
        <span>{message}</span>
      </div>
    </div>
  );
};
