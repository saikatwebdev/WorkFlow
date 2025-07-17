import React from 'react';
import { Check, Bell, X } from 'lucide-react';

const ToastNotification = ({ showToast, toastMessage, toastType }) => {
  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      showToast ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
    }`}>
      <div className={`px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 ${
        toastType === 'success' ? 'bg-green-500 text-white' : 
        toastType === 'info' ? 'bg-blue-500 text-white' : 
        'bg-red-500 text-white'
      }`}>
        {toastType === 'success' && <Check className="w-5 h-5" />}
        {toastType === 'info' && <Bell className="w-5 h-5" />}
        {toastType === 'error' && <X className="w-5 h-5" />}
        <span className="font-medium">{toastMessage}</span>
      </div>
    </div>
  );
};

export default ToastNotification;