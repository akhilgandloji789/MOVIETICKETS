import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgColors = {
    success: 'bg-primary-container border-primary text-on-primary-container shadow-[0_0_20px_rgba(90,33,50,0.5)]',
    warning: 'bg-amber-950/90 border-amber-500 text-amber-200',
    info: 'bg-surface-container-high border-white/20 text-on-surface',
    error: 'bg-error-container border-error text-on-error-container'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-md font-body-md text-sm shadow-2xl transition-all ${bgColors[toast.type] || bgColors.info}`}>
        <span className="material-symbols-outlined text-xl">
          {toast.type === 'success' ? 'check_circle' : toast.type === 'warning' ? 'warning' : 'info'}
        </span>
        <span className="font-medium">{toast.message}</span>
      </div>
    </div>
  );
};
