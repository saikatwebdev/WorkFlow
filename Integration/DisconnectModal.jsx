import React from 'react';
import { X } from 'lucide-react';

const DisconnectModal = ({ 
  showDisconnectModal, 
  setShowDisconnectModal, 
  disconnectAccount, 
  confirmDisconnect 
}) => {
  if (!showDisconnectModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 animate-in zoom-in-95">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Confirm Disconnect</h2>
          <button 
            onClick={() => setShowDisconnectModal(false)}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-8">
          <p className="text-slate-600 text-lg leading-relaxed">
            Are you sure you want to disconnect your <span className="font-semibold text-slate-900">{disconnectAccount?.platform}</span> account? 
            This will disable all related automations.
          </p>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            onClick={() => setShowDisconnectModal(false)}
            className="px-6 py-3 text-slate-600 hover:text-slate-800 font-medium transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={confirmDisconnect}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisconnectModal;