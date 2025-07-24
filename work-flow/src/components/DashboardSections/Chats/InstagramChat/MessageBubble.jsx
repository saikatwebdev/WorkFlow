import React from 'react';
import { Check, CheckCheck, Clock, MoreVertical } from 'lucide-react';

const MessageBubble = ({ message, isMe, isGroup, showTime = true, showStatus = true }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'sent':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`relative max-w-[75%]`}>
        <div 
          className={`relative px-4 py-2 rounded-2xl ${
            isMe 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none' 
              : 'bg-white border border-gray-200 rounded-bl-none'
          }`}
        >
          {!isMe && isGroup && (
            <div className="text-xs font-medium text-gray-700 mb-1">
              {message.senderName}
            </div>
          )}
          
          <div className="text-sm">
            {message.text}
          </div>
          
          <div className="flex items-center justify-end mt-1 space-x-1">
            {showTime && message.timestamp && (
              <span className={`text-xs ${isMe ? 'text-white/80' : 'text-gray-500'}`}>
                {formatTime(message.timestamp)}
              </span>
            )}
            
            {isMe && showStatus && message.status && (
              <span className="flex-shrink-0">
                {renderStatus(message.status)}
              </span>
            )}
          </div>
        </div>
        
        {/* Message options */}
        <button 
          className={`absolute -top-1.5 ${
            isMe ? '-left-8' : '-right-8'
          } p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity`}
          onClick={(e) => {
            e.stopPropagation();
            // Handle message options
          }}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MessageBubble;
