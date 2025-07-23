import React from 'react';
import { Check, Bell, X } from 'lucide-react';

const ToastNotification = ({ showToast, toastMessage, toastType }) => {
  const getToastStyles = (type) => {
    switch (type) {
      case 'success': return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
      case 'info': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'error': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      default: return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white';
    }
  };

  return (
    <div className={`fixed top-6 right-6 z-50 transform transition-all duration-500 ${
      showToast ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'
    }`}>
      <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 border border-white/20 ${getToastStyles(toastType)}`}>
        {toastType === 'success' && <Check className="w-5 h-5" />}
        {toastType === 'info' && <Bell className="w-5 h-5" />}
        {toastType === 'error' && <X className="w-5 h-5" />}
        <span className="font-semibold">{toastMessage}</span>
      </div>
    </div>
  );
};

export default ToastNotification;