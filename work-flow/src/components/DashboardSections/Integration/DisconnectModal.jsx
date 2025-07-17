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
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Confirm Disconnect</h2>
          <button 
            onClick={() => setShowDisconnectModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Are you sure you want to disconnect your {disconnectAccount?.platform} account? 
            This will disable all related automations.
          </p>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={() => setShowDisconnectModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDisconnect}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisconnectModal;