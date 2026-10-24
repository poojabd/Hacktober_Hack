import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="bg-zinc-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-zinc-800 flex items-center gap-2.5 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
