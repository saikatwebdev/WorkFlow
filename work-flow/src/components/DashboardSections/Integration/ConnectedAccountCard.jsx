import React from 'react';
import { X, Settings } from 'lucide-react';

const ConnectedAccountCard = ({ account, handleDisconnect }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{account.avatar}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{account.platform}</h3>
            <p className="text-sm text-gray-500">{account.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {account.connected ? (
            <>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Connected
              </span>
              <button 
                onClick={() => handleDisconnect(account.id)}
                className="text-red-400 hover:text-red-600 transition-colors"
                title="Disconnect"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccountCard;