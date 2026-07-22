import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toastMessage, toasts, removeToast } = useApp();

  const currentToast = toastMessage || (toasts && toasts.length > 0 ? toasts[0] : null);

  if (!currentToast) return null;

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 max-w-sm w-[90%] pointer-events-none">
      <div
        key={currentToast.id || Date.now()}
        className="pointer-events-auto bg-[#1C1B1B]/95 backdrop-blur-md border-2 border-[#BCFF4E] text-white rounded-2xl p-4 shadow-[0_0_25px_rgba(188,255,78,0.25)] flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-200"
      >
        <div className="flex items-center gap-3">
          {currentToast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          ) : currentToast.type === 'info' ? (
            <Info className="w-5 h-5 text-cyan-400 shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-[#BCFF4E] shrink-0" />
          )}
          <p className="text-xs font-geist font-bold text-white">{currentToast.message}</p>
        </div>
      </div>
    </div>
  );
};
