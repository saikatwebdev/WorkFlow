import React from 'react';
import { X, Instagram, Facebook, MessageCircle } from 'lucide-react';

const ConnectAccountModal = ({ showConnectModal, setShowConnectModal, connectAccount }) => {
  const availableAccounts = [
    { id: 'instagram', platform: 'Instagram', username: '@yourhandle', avatar: '📸', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: Instagram },
    { id: 'facebook', platform: 'Facebook', username: 'Your Page', avatar: '📘', color: 'bg-blue-600', icon: Facebook },
    { id: 'messenger', platform: 'Messenger', username: 'Your Business', avatar: '💬', color: 'bg-blue-500', icon: MessageCircle }
  ];

  if (!showConnectModal) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Connect Account</h2>
          <button 
            onClick={() => setShowConnectModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3">
          {availableAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => connectAccount(account)}
              className="w-full p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 flex items-center space-x-3"
            >
              <div className={`w-10 h-10 rounded-lg ${account.color} flex items-center justify-center`}>
                <account.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">{account.platform}</div>
                <div className="text-sm text-gray-500">{account.username}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectAccountModal;