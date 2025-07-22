import React from 'react';
import { AlertCircle } from 'lucide-react';

const SignOutModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title || 'Sign Out Confirmation'}
          </h3>
          
          {/* Message */}
          <p className="text-gray-600 mb-6">
            {message || "Are you sure you want to sign out? You'll need to sign in again to access your dashboard."}
          </p>
          
          {/* Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;