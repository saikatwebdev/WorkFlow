import React from 'react';
import { MoreVertical, ArrowLeft } from 'lucide-react';

const ChatHeader = ({ contact, onBack, onMenuClick }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-1 mr-2 text-gray-500 hover:text-gray-700 md:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-900">{contact.name}</h3>
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
              contact.isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}></span>
            <span className="text-xs text-gray-500">
              {contact.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button 
          onClick={onMenuClick}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
